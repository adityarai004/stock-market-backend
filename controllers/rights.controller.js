import { Rights } from "../models/rights.js";

const createRights = async (req, res) => {
  try {
    const {
      name,
      rightRatio,
      faceValue,
      premium,
      announcementDate,
      recordDate,
      exRights,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !rightRatio ||
      !faceValue ||
      !announcementDate ||
      !recordDate
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create new Rights document
    const newRights = new Rights({
      name,
      rightRatio,
      faceValue,
      premium,
      announcementDate,
      recordDate,
      exRights,
    });

    // Save to database
    await newRights
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Rights Offering Added Successfully",
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

const getAllRights = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.body;
    const totalResults = await Rights.countDocuments();

    await Rights.find()
      .limit(perPage)
      .select({
        _id: 1,
        name: 1
      })
      .skip(perPage * (page - 1))
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Rights Offerings Retrieved Successfully",
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

const getOneRight = async (req, res) => {
  try {
    const { id } = req.params;

    const totalResults = await Rights.countDocuments();
    const right = await Rights.findById(id);

    if (!right) {
      return res.status(404).json({ success: false, message: "Right Not Found" });
    }
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      data: right,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const updateRights = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedRights = await Rights.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRights) {
      return res
        .status(400)
        .json({ success: false, message: "Rights Offering not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Updated Successfully",
        data: updatedRights,
      });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const deleteRights = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await Rights.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfully" });
    }

    res.status(400).json({ success: false, message: "Document not found" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export {createRights, getAllRights, updateRights, deleteRights, getOneRight};