
import Task from "../../models/taskSchema.js";

const ReadHandler = async (req, res) => {
  const { userId } = req.params;
  console.log("userId:", userId);

  try {
    if (userId) {
      const tasks = await Task.find({ userId });
      const assinedTask = await Task.find({ assiendUserId: userId });
      console.log("Fetched tasks:", tasks);

      const allTasks = [...tasks, ...assinedTask];

      if (allTasks.length > 0) {
        res.json({ success: true, tasks: allTasks });
      } else {
        res
          .status(400)
          .json({ success: false, message: "userId parameter is missing." });
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
