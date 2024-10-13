import mongoose from "mongoose";
const { Schema } = mongoose;

// IPO Schema
const ipoSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    imageUrl: {type: String, required: true},
    offerDate: { type: String, required: true },
    offerPrice: { type: String, required: true },
    lotSize: { type: Number, required: true },
    subscriptions: { type: String },
    expectedPrem: { type: String },
    openDate: { type: String, required: true },
    closeDate: { type: String, required: true },
    allotmentDate: { type: String },
    listingDate: { type: String },
    faceValue: { type: Number, required: true },
    issueSize: { type: String },
    marketLot: { type: Number },
    listingAt: { type: String, required: true, trim: true },
    isLive: { type: Boolean, default: false },
    isListed: { type: Boolean, default: false },
    nseCode: { type: String },
    bseCode: { type: String },
    news: { type: String },
    retailLotShares: { type: String },
    retailLotAmount: { type: String },
    shniLotShares: { type: String },
    shniLotAmount: { type: String },
    bhniLotShares: { type: String },
    bhniLotAmount: { type: String },
    retailApplication: { type: String },
    listingPrice: { type: Number },
    parentCompany: { type: String },
    parentCompanyCode: { type: String },
    estRetailProfit: { type: Number },
    estHniProfit: { type: Number },
    premiumOrDiscount: { type: String },
    refundDate: { type: String },
    listingPercent: { type: String },

    // Newly added fields
    detailQibTimes: { type: String },
    detailQibAmount: { type: String },
    detailHniTimes: { type: String },
    detailHniAmount: { type: String },
    detailHniAbove10Times: { type: String },
    detailHniAbove10Amount: { type: String },
    detailHniBelow10Times: { type: String },
    detailHniBelow10Amount: { type: String },
    detailRetailTimes: { type: String },
    detailRetailAmount: { type: String },
    detailTotalTimes: { type: String },
    detailTotalAmount: { type: String },

    // Newly requested fields
    bidQibOffered: { type: String },
    bidQibApplied: { type: String },
    bidQibTimes: { type: String },
    bidHniOffered: { type: String },
    bidHniApplied: { type: String },
    bidHniTimes: { type: String },
    bidRetailOffered: { type: String },
    bidRetailApplied: { type: String },
    bidRetailTimes: { type: String },
    bidTotalOffered: { type: String },
    bidTotalApplied: { type: String },
    bidTotalTimes: { type: String },

    totalRetailApplication: { type: String },
    chanceToGet: { type: String },
    chanceToGetTotal: { type: String },
    minimumAmt: {type: String},
    retailPortion: {type: String}
  },
  { timestamps: true }
);

const IPO = mongoose.model("IPO", ipoSchema);
const SME = mongoose.model("SME", ipoSchema);

export { IPO, SME };
