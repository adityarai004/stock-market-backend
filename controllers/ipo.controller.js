import { IPO } from "../models/ipo.model.js";

const createIpo = async (req, res) => {
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
      nseCode,
      bseCode,
      news,
      retailLotShares,
      retailLotAmount,
      shniLotShares,
      shniLotAmount,
      bhniLotShares,
      bhniLotAmount,
      retailApplication,
      listingPrice,
      parentCompany,
      parentCompanyCode,
      listedOn,
      estRetailProfit,
      estHniProfit,
      premiumOrDiscount,
      refundDate
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

    const newIPO = new IPO({
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
      nseCode,
      bseCode,
      news,
      retailLotShares,
      retailLotAmount,
      shniLotShares,
      shniLotAmount,
      bhniLotShares,
      bhniLotAmount,
      retailApplication,
      listingPrice,
      parentCompany,
      parentCompanyCode,
      listedOn,
      estRetailProfit,
      estHniProfit,
      premiumOrDiscount,
      refundDate
    });

    await newIPO
      .save()
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "IPO Added Successfully",
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

const getAllIpo = async (req, res) => {
  try {
    const { page = 1, perPage = 10, listed = false } = req.query;
    console.log("page ", page, "perPage ", perPage, "live ", listed);
    const totalResults = await IPO.countDocuments();
    await IPO.find({ isListed: listed })
      .select({
        name: 1,
        _id: 1,
        lotSize: 1,
        offerDate: 1,
        isLive: 1,
        expectedPrem: 1,
        subscriptions: 1,
        nseCode: 1,
        bseCode: 1,
        news: 1,
        listingPrice: 1,
        offerPrice: 1,   
        listingDate: 1,
        premiumOrDiscount: 1,
        refundDate: 1     
      })
      // .limit(perPage)
      // .skip(perPage * (page - 1))
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Fetched Successfully",
          data: {
            ipos: data,
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

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    const ipo = await IPO.findById(id);

    if (!ipo) {
      return res.status(404).json({ success: false, message: "IPO Not Found" });
    }
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      data: ipo,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const updateIpo = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedIPO = await IPO.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedIPO) {
      return res.status(400).json({ success: false, message: "IPO not found" });
    }

    res.status(200).json({ success: true, message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
};

const deleteIpo = async (req, res) => {
  const { id } = req.params;
  console.log("Delete ID ", id);
  try {
    const deleteCount = await IPO.deleteOne({ _id: id });
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

export { createIpo, getAllIpo, updateIpo, deleteIpo, getOne };
