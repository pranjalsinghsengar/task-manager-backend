import express from "express";
import mongoose from "mongoose";
import Task from "./models/taskSchema.js";
import cors from "cors";
import History from "./models/deletedTask.js";
import dotenv from "dotenv";

dotenv.config();
console.log(`Your port is ${process.env.PORTS}`);

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

const MONGO_URL = process.env.MONGO_URL;
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.post("/create", async (req, res) => {
  const {
    title,
    content,
    tagTitle,
    tagBg,
    tagtext,
    taghero,
    status,
    dateOfCompilation,
  } = req.body;

  if (
    !title ||
    !content ||
    !tagTitle ||
    !tagBg ||
    !tagtext ||
    !taghero ||
    !status ||
    !dateOfCompilation
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  // Create New Task
  const newTask = new Task({
    title,
    content,
    tagTitle,
    tagBg,
    tagtext,
    taghero,
    status,
    dateOfCompilation,
  });

  try {
    await newTask.save();
    console.log("posted", newTask);
    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      tasks: newTask,
    });
  } catch (error) {
    console.error("Error saving task:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("get", tasks);
    res.json({ success: true, tasks });
  } catch (error) {
    console.log("fetching data", error);
  }
});

app.post("/update", async (req, res) => {
  const { _id, newStatus } = req.body;
  try {
    const findId = await Task.findOne({ _id });
    console.log("findID", _id, newStatus, findId);
    const updatedTask = await Task.findOneAndUpdate(
      { _id },
      { status: newStatus },
      { new: true } // Return the updated document
    );

    // If task is not found, handle the case (optional based on your app logic)
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    console.log("Updated Task:", updatedTask);

    res.json({ success: true, updatedTask });
  } catch (error) {
    console.log("status update error", error);
  }
});

app.post("/delete", async (req, res) => {
  const { _id } = req.body;
  try {
    const findTask = Task.findOne({ _id });
    if (findTask) {
      // History
      const history = new History({ findTask });
      await history.save();
      if (history) {
        await Task.deleteOne({ _id });
        res.json({ success: true, message: "deleted", deletedId: _id });
      }
    }
  } catch (error) {
    console.log("error in delete", error);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
