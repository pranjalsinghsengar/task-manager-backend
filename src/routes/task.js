import express from "express";
import CreateHandler from "../controllers/tasks/createHandler.js";
import ReadHandler from "../controllers/tasks/readHandler.js";

const router = express.Router();

router.post("/create", CreateHandler);
router.post("/update", CreateHandler);
router.post("/read", ReadHandler);
router.post("/delete", CreateHandler);

export default router;
