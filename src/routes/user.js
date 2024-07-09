import express from "express";
import LoginHandler from "../controllers/auth/loginHandler.js";
import SigninHandler from "../controllers/auth/signupHandler.js";

const router = express.Router();

router.post("/login", LoginHandler);
router.post("/signup", SigninHandler);


export default router;
