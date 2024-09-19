import { Bonus } from "../models/bonus.model.js";

const createBonus = async (req, res) => {
  try {
    const { companyName, bonusRatio, announcementDate, recordDate, exBonus } =
      req.body;

    // Validate required fields
    if (!companyName || !bonusRatio || !announcementDate || !recordDate) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create new Bonus document
    const newBonus = new Bonus({
      companyName,
      bonusRatio,
      announcementDate,
      recordDate,
      exBonus,
    });

    // Save to database
    await newBonus
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Bonus Added Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const getAllBonuses = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.body;
    const totalResults = await Bonus.countDocuments();

    await Bonus.find()
      .limit(perPage)
      .select({
        _id: 1,
        companyName: 1,
      })
      .skip(perPage * (page - 1))
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Bonuses Retrieved Successfully",
          data: data,
          total: totalResults,
          currentPage: page,
          totalPages: Math.ceil(totalResults / perPage),
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message,
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const getOneBonus = async (req, res) => {
  try {
    const { id } = req.params;

    const bonus = await Bonus.findById(id);

    if (!bonus) {
      return res
        .status(404)
        .json({ success: false, message: "Bonus Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "Bonus Fetched Successfully",
      data: bonus,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const updateBonus = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedBonus = await Bonus.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBonus) {
      return res
        .status(400)
        .json({ success: false, message: "Bonus not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bonus Updated Successfully",
      data: updatedBonus,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
const deleteBonus = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await Bonus.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Bonus Deleted Successfully" });
    }

    res.status(400).json({ success: false, message: "Document not found" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export { createBonus, getAllBonuses, getOneBonus, updateBonus, deleteBonus };
