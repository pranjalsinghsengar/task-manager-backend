import Task from "../../models/taskSchema.js";

const CreateHandler = async (req, res) => {
  try {
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

    console.log(
      title,
      content,
      tagTitle,
      tagBg,
      tagtext,
      taghero,
      status,
      dateOfCompilation,
      userId
    );

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
        .status(404)
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

    await newTask.save();
    console.log("posted", newTask);
    return res.status(200).json({
      success: true,
      message: "Task created successfully",
      tasks: newTask,
    });
  } catch (error) {
    console.error("Error saving task:", error);
    return res
      .status(404)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export default CreateHandler;
