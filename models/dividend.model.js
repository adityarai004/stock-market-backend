import mongoose from "mongoose";
const { Schema } = mongoose;

const dividendSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    dividentType: { type: String, required: true },
    announcementDate: { type: Date, required: true },
    recordDate: { type: Date, required: true },
    exDividend: { type: Date },
    previousClose: { type: Number, required: true },
    dividenPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Dividend = mongoose.model("Dividend", dividendSchema);

export { Dividend};
