import React from "react";
import Task from "../../models/taskSchema.js";

const CreateHandler = async (req, res) => {
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
};

export default CreateHandler;
