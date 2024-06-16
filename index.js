import express from "express";
import mongoose from "mongoose";
import Task from "./models/taskSchema.js";
import cors from "cors";
import History from "./models/deletedTask.js";
import dotenv from "dotenv";
import user from "./models/user.js";

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
    userId,
  } = req.body;

  if (
    !title ||
    !content ||
    !tagTitle ||
    !tagBg ||
    !tagtext ||
    !taghero ||
    !status ||
    !dateOfCompilation ||
    !userId
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
    userId,
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
app.post("/", async (req, res) => {
  const { userId } = req.body;
  console.log("userId:", userId);

  try {
    if (userId) {
      const tasks = await Task.find({ userId });
      console.log("Fetched tasks:", tasks);

      if (tasks.length > 0) {
        res.json({ success: true, tasks });
      } else {
        res.json({ success: false, message: "No tasks found for the user." });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "userId parameter is missing." });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
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
// ====================================================

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        user: existingUser,
      });
    }
    const newUser = new user({ firstName, lastName, email, password });
    if (newUser) {
      const savedUser = await newUser.save();
      res.status(201).json({ success: true, user: savedUser });
    }
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      success: false,
      message: "Error in signup",
      error: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await user.findOne({ email, password });

    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "check email and password it might be wrong",
      });
    }
    res.status(200).json({ success: true, findUser });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
