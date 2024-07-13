import express from "express";
import mongoose from "mongoose";
import Task from "./src/models/taskSchema.js";
import cors from "cors";
import History from "./src/models/deletedTask.js";
import dotenv from "dotenv";
import user from "./src/models/user.js";
import AssinedTask from "./src/models/assinedTask.js";
import userRouter from "./src/routes/user.js";
import taskRouter from "./src/routes/task.js";
import connectMongoDb from "./src/config/connection.js";

dotenv.config();
// console.log(`Your port is ${process.env.PORTS}`);

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// routers

app.use("/user", userRouter);
app.use("/tasks", taskRouter);

// ====================================================

app.post("/assinedtask/create", async (req, res) => {
  const {
    title,
    content,
    tagTitle,
    tagBg,
    tagtext,
    taghero,
    status,
    dateOfCompilation,
    assinedBy,
    assinedTo,
    assiendDate,
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
    !assinedBy ||
    !assinedTo ||
    !assiendDate
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const exist = await user.findOne({ email: assinedTo });
    const userBy = await user.findOne({ _id: assinedBy });
    console.log("exist", exist);
    if (!exist) {
      return res.json({ success: false, message: "mail id does not exist" });
    }
    if (!userBy) {
      return res.json({ success: false, message: "userBy does not exist" });
    }

    const NewAssignTask = new Task({
      title,
      content,
      tagTitle,
      tagBg,
      tagtext,
      taghero,
      status,
      dateOfCompilation,
      assinedBy,
      assinedByName: `${userBy?.firstName} ${userBy?.lastName}`,
      assinedTo,
      assiendName: `${exist?.firstName} ${exist?.lastName}`,
      assiendUserId: exist?._id,
      assiendDate,
    });

    await NewAssignTask.save();
    return res.status(201).json({
      success: true,
      message: `New Task Assined to `,
      tasks: NewAssignTask,
    });
  } catch (error) {
    console.error("Error saving task:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/assinedtask/get/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId) {
      // const fetchUser = await AssinedTask.find({ assinedBy });
      const fetchUser = await Task.find({ assinedBy: userId });
      // console.log("assinedtask/get", fetchUser);
      if (!fetchUser) {
        return res.status(400).json({
          success: false,
          message: "user id not found to fetch assining tasks",
        });
      }
      return res.status(201).json({
        success: true,
        message: `New Task Assined to `,
        tasks: fetchUser,
      });
    }
  } catch (error) {
    console.error("Error saving task:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// app.post("/fetchAssignedTasks", async (req, res) => {
//   const { email } = req.body;
//   console.log("fetchAssignedTasks", email);
//   try {
//     if (email) {
//       const findData = await AssinedTask.findOne({
//         email: email,
//       });

//       console.log("fetchAssignedTasks", findData);
//       if (findData.length === 0) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Data not found" });
//       }
//       return res.json({
//         success: true,
//         message: "Data found",
//         tasks: findData,
//       });
//     }
//   } catch (error) {
//     console.error("Error fetching assigned tasks:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error" });
//   }
// });

const PORT = process.env.PORT || 8000;
connectMongoDb(process.env.MONGO_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
