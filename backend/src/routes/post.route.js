import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  getAllPosts,
  getSinglePost,
  handleDeleteUploadedImage,
  handleImageUpload,
  handlePostLike,
  handlePostThread,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.route("/image-upload").post(upload.single("photo"), handleImageUpload);
router.route("/image-delete").post(handleDeleteUploadedImage);
router.route("/thread").post(verifyToken, handlePostThread);
router.route("/all").get(verifyToken, getAllPosts);
router.route("/like").post(verifyToken, handlePostLike);
router.route("/post/:postId").get(verifyToken, getSinglePost);

export default router;
