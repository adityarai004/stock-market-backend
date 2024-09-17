import { Splits } from "../models/splits.js";

const createSplit = async (req, res) => {
  try {
    const { companyName, oldFv, newFv, splitDate } = req.body;

    // Validate required fields
    if (!companyName || !oldFv || !newFv || !splitDate) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create new Split document
    const newSplit = new Splits({
      companyName,
      oldFv,
      newFv,
      splitDate,
    });

    // Save to database
    await newSplit
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Stock Split Added Successfully",
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

const getAllSplits = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.body;
    const totalResults = await Splits.countDocuments();

    await Splits.find()
      .limit(perPage)
      .select({
        _id: 1,
        companyName: 1,
        oldFv: 1,
        newFv: 1,
      })
      .skip(perPage * (page - 1))
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Stock Splits Retrieved Successfully",
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

const getOneSplit = async (req, res) => {
  try {
    const { id } = req.params;

    const split = await Splits.findById(id);

    if (!split) {
      return res
        .status(404)
        .json({ success: false, message: "Stock Split Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "Stock Split Fetched Successfully",
      data: split,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const updateSplit = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedSplit = await Splits.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSplit) {
      return res
        .status(400)
        .json({ success: false, message: "Stock Split not found" });
    }

    res.status(200).json({
      success: true,
      message: "Stock Split Updated Successfully",
      data: updatedSplit,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const deleteSplit = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await Splits.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Stock Split Deleted Successfully" });
    }

    res.status(400).json({ success: false, message: "Document not found" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};
export { createSplit, getAllSplits, getOneSplit, updateSplit, deleteSplit };
