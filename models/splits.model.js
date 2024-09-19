import mongoose from "mongoose";
const { Schema } = mongoose;

const splitsSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    oldFv: { type: Number, required: true },
    newFv: { type: Number, required: true },
    splitDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Splits = mongoose.model("Splits", splitsSchema);

export  {Splits};
