import express from "express";
import CreateHandler from "../controllers/tasks/createHandler.js";
import ReadHandler from "../controllers/tasks/readHandler.js";
import DeleteHandler from "../controllers/tasks/deleteHandler.js";
import UpdateHandler from "../controllers/tasks/updateHandler.js";

const router = express.Router();

router.post("/create", CreateHandler);
router.post("/update", UpdateHandler);
router.post("/read/:userId", ReadHandler);
router.post("/delete/:_id", DeleteHandler);

export default router;
