import mongoose from "mongoose";
const { Schema } = mongoose;

const rightsSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rightRatio: { type: String, required: true },
    faceValue: { type: Number, required: true },
    premium: { type: Number },
    announcementDate: { type: Date, required: true },
    recordDate: { type: Date, required: true },
    exRights: { type: Date },
  },
  { timestamps: true }
);

const Rights = mongoose.model("Rights", rightsSchema);

export { Rights };
