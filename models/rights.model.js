import mongoose from "mongoose";
const { Schema } = mongoose;

const rightsSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    rightRatio: { type: String, required: true },
    faceValue: { type: Number, required: true },
    premium: { type: Number },
    announcementDate: { type: String, required: true },
    recordDate: { type: String, required: true },
    exRights: { type: String },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Rights = mongoose.model("Rights", rightsSchema);

export { Rights };
