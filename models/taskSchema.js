import mongoose from "mongoose";

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
      default: "pending",
    },
    dateOfCompilation: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema); // Using singular name for model
export default Task;
