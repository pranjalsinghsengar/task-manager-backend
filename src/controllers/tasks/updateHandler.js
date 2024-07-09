import Task from "../../models/taskSchema.js";

const UpdateHandler = async (req, res) => {
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
};
export default UpdateHandler;
