import React from "react";
import Task from "../../models/taskSchema.js";

const ReadHandler = async (req, res) => {
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
};

export default ReadHandler;
