import { SME } from "../models/ipo.js";

const createSME = async (req, res) => {
  try {
    const {
      name,
      offerDate,
      offerPrice,
      lotSize,
      subscriptions,
      expectedPrem,
      openDate,
      closeDate,
      allotmentDate,
      listingDate,
      faceValue,
      issuePrice,
      issueSize,
      marketLot,
      listingAt,
      retailPartition,
      isLive,
      isListed,
    } = req.body;

    if (
      !name ||
      !offerDate ||
      !offerPrice ||
      !lotSize ||
      !openDate ||
      !closeDate ||
      !faceValue ||
      !issuePrice ||
      !listingAt
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newSME = new SME({
      name,
      offerDate,
      offerPrice,
      lotSize,
      subscriptions,
      expectedPrem,
      openDate,
      closeDate,
      allotmentDate,
      listingDate,
      faceValue,
      issuePrice,
      issueSize,
      marketLot,
      listingAt,
      retailPartition,
      isLive,
      isListed,
    });

    await newSME
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "SME Added Successfully",
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

const getAllSME = async (req, res) => {
  try {
    const { page = 1, perPage = 10 } = req.body;

    const totalResults = await SME.countDocuments();
    await SME.find()
      .select({
        name: 1,
        _id: 1,
        lotSize: 1,
        offerDate: 1,
        isListed: 1,
        isLive: 1,
        issuePrice: 1,
      })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Fetched Successfully",
          data: {
            SMEs: data,
            total: totalResults,
            currentPage: page,
            totalPages: Math.ceil(totalResults / perPage),
          },
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

const getSMEById = async (req, res) => {
  try {
    const { id } = req.params;

    const SME = await SME.findById(id);

    if (!SME) {
      return res.status(404).json({ success: false, message: "SME Not Found" });
    }
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      data: SME,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const updateSME = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedSME = await SME.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSME) {
      return res.status(400).json({ success: false, message: "SME not found" });
    }

    res.status(200).json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const deleteSME = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteCount = await SME.deleteOne({ _id: id });
    if (deleteCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Deleted Successfully" });
    }

    res.status(400).json({ success: false, message: "Document not available" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

export { createSME, getAllSME, updateSME, deleteSME, getSMEById };
