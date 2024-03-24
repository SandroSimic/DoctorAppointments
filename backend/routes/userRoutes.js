import express from "express";
import {
  getMe,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(protect, logout);
router.route("/me").get(protect, getMe);
router.route("/update").patch(protect, updateProfile);

export default router;
