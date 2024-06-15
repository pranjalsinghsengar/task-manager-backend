import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
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
    },
    dateOfCompilation: {
      type: String,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", TaskSchema);
export default Task;
