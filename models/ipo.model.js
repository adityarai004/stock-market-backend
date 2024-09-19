import mongoose from "mongoose";
const { Schema } = mongoose;
mongoose.set('debug', true);

// IPO Schema
const ipoSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
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
    issuePrice: { type: String, required: true },
    issueSize: { type: String },
    marketLot: { type: Number },
    listingAt: { type: String, required: true, trim: true },
    retailPartition: { type: Number },
    isLive: { type: Boolean, default: false },
    isListed: { type: Boolean, default: false },
    nseCode: { type: String, required: false },
    bseCode: { type: String, required: false },
    news: { type: String, required: false },
    retailLotShares: { type: String, required: false },
    retailLotAmount: { type: String, required: false },
    shniLotShares: { type: String, required: false },
    shniLotAmount: { type: String, required: false },
    bhniLotShares: { type: String, required: false },
    bhniLotAmount: { type: String, required: false },
    retailPortion: { type: String, required: false },
    retailApplication: { type: String, required: false },
    shniApplication: { type: String, required: false },
    bhniApplication: { type: String, required: false },
    listingPrice: { type: Number, required: false },
    parentCompany: { type: String, required: false },
    parentCompanyCode: { type: String, required: false },
    lotShares: { type: Number, required: false },
    lotAmount: { type: Number, required: false },
    qib: { type: String, required : false },
    listedOn: {type: String, required: false}
  },
  { timestamps: true }
);

const IPO = mongoose.model("IPO", ipoSchema);
const SME = mongoose.model("SME", ipoSchema);

export { IPO, SME };
