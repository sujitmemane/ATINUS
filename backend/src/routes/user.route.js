import express from "express";
import {
  getUserInformation,
  handleUserLogin,
  handleUserRegisteration,
  handleUserUpdate,
  handleUserValidation,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/validate", handleUserValidation);
router.post("/register", handleUserRegisteration);
router.post("/login", handleUserLogin);
router.get("/:username", getUserInformation);
router.post("/update", verifyToken, handleUserUpdate);

export default router;
