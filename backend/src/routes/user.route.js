import express from "express";
import {
  handleUserLogin,
  handleUserRegisteration,
  handleUserValidation,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/validate", handleUserValidation);
router.post("/register", handleUserRegisteration);
router.post("/login", handleUserLogin);

export default router;
