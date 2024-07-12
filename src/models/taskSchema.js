import mongoose, { Schema } from "mongoose";

const TaskSchema = new mongoose.Schema(
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
      default: null,
    },
    assinedBy: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    assinedTo: {
      type: String,
      default: null,
    },
    assiendUserId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    assiendName: {
      type: String,
      default: null,
    },
    assiendDate: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema); // Using singular name for model
export default Task;
