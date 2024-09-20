import mongoose from "mongoose";
const { Schema } = mongoose;

const bonusSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    bonusRatio: { type: String, required: true },
    announcementDate: { type: String, required: true },
    recordDate: { type: String, required: true },
    exBonus: { type: String },
  },
  { timestamps: true }
);

const Bonus = mongoose.model("Bonus", bonusSchema);

export { Bonus };
