import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", validateToken, currentUser);

export default router;
