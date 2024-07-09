import mongoose from "mongoose";

const AssinedTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tagTitle: {
      type: String,
    },
    tagBg: {
      type: String,
    },
    tagtext: {
      type: String,
    },
    taghero: {
      type: String,
    },
    status: {
      type: String,
      default: "New Task",
    },
    dateOfCompilation: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: String,
      required: true,
    },
    assinedTo: {
      type: String,
      required: true,
    },
    assiendName: {
      type: String,
    },
    assiendUserId: {
      type: String,
    },
    assiendDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AssinedTask = mongoose.model("AssinedTask", AssinedTaskSchema); // Using singular name for model
export default AssinedTask;
