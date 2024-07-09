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
    tagColor: {
      Bg: {
        type: String,
      },
      text: {
        type: String,
      },
      hero: {
        type: String,
      },
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

const History = mongoose.model("history", TaskSchema);
export default History;
