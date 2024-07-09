import React from "react";
import Task from "../../models/taskSchema.js";

const DeleteHandler = async (req, res) => {
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
};

export default DeleteHandler;
