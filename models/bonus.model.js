import mongoose from "mongoose";
const { Schema } = mongoose;

const bonusSchema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    bonusRatio: { type: String, required: true },
    announcementDate: { type: Date, required: true },
    recordDate: { type: Date, required: true },
    exBonus: { type: Date },
  },
  { timestamps: true }
);

const Bonus = mongoose.model("Bonus", bonusSchema);

export { Bonus };
