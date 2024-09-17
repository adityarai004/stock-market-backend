import mongoose from "mongoose";
const { Schema } = mongoose;

// IPO Schema
const ipoSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    offerDate: { type: Date, required: true },
    offerPrice: { type: Number, required: true },
    lotSize: { type: Number, required: true },
    subscriptions: { type: Number },
    expectedPrem: { type: Number },
    openDate: { type: Date, required: true },
    closeDate: { type: Date, required: true },
    allotmentDate: { type: Date },
    listingDate: { type: Date },
    faceValue: { type: Number, required: true },
    issuePrice: { type: Number, required: true },
    issueSize: { type: Number },
    marketLot: { type: Number },
    listingAt: { type: String, required: true, trim: true },
    retailPartition: { type: Number },
    isLive: { type: Boolean, default: false },
    isListed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const IPO = mongoose.model("IPO", ipoSchema);
const SME = mongoose.model("SME", ipoSchema);

export { IPO, SME };
