import express from "express";
import {
  getMyInformation,
  getUserInformation,
  handleAvatarUpload,
  handleRemoveAvatar,
  handleUserLogin,
  handleUserRegisteration,
  handleUserUpdate,
  handleUserValidation,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();
router.post("/validate", handleUserValidation);
router.post("/register", handleUserRegisteration);
router.post("/login", handleUserLogin);

router.post("/update", verifyToken, handleUserUpdate);
router.get("/my", verifyToken, getMyInformation);
router
  .route("/avatar")
  .post(upload.single("avatar"), verifyToken, handleAvatarUpload)
  .delete(verifyToken, handleRemoveAvatar);

router.get("/:username", getUserInformation);

export default router;
