import mongoose from "mongoose";
const { Schema } = mongoose;

const dividendSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    dividendType: { type: String, required: true },
    announcementDate: { type: String, required: true },
    recordDate: { type: String, required: true },
    exDividend: { type: String },
    previousClose: { type: Number, required: true },
    dividendPrice: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Dividend = mongoose.model("Dividend", dividendSchema);

export { Dividend};
