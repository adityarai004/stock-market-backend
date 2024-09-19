import { Dividend } from "../models/dividend.model.js";

const createDividend = async (req, res) => {
  try {
    const {
      companyName,
      dividentType,
      announcementDate,
      recordDate,
      exDividend,
      previousClose,
      dividenPrice,
    } = req.body;

    // Validate required fields
    if (
      !companyName ||
      !dividentType ||
      !announcementDate ||
      !recordDate ||
      !previousClose ||
      !dividenPrice
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create new Dividend document
    const newDividend = new Dividend({
      companyName,
      dividentType,
      announcementDate,
      recordDate,
      exDividend,
      previousClose,
      dividenPrice,
    });

    // Save to database
    await newDividend
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Dividend Added Successfully",
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

const getAllDividends = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.body;
    const totalResults = await Dividend.countDocuments();

    await Dividend.find()
      .limit(perPage)
      .select({
        _id: 1,
        companyName: 1,
        dividentType: 1,
      })
      .skip(perPage * (page - 1))
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Dividends Retrieved Successfully",
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

const getOneDividend = async (req, res) => {
  try {
    const { id } = req.params;

    const dividend = await Dividend.findById(id);

    if (!dividend) {
      return res
        .status(404)
        .json({ success: false, message: "Dividend Not Found" });
    }

    res.status(200).send({
      success: true,
      message: "Dividend Fetched Successfully",
      data: dividend,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const updateDividend = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedDividend = await Dividend.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedDividend) {
      return res
        .status(400)
        .json({ success: false, message: "Dividend not found" });
    }

    res.status(200).json({
      success: true,
      message: "Dividend Updated Successfully",
      data: updatedDividend,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const deleteDividend = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteResult = await Dividend.deleteOne({ _id: id });

    if (deleteResult.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Dividend Deleted Successfully" });
    }

    res.status(400).json({ success: false, message: "Document not found" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export {
  createDividend,
  getAllDividends,
  getOneDividend,
  updateDividend,
  deleteDividend,
};
