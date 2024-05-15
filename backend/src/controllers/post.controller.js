import {
  deleteImageCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ObjectId } from "mongodb";

import Post from "../models/post.model.js";

export const handleImageUpload = async (req, res) => {
  console.log("End Point hit");
  try {
    const response = await uploadOnCloudinary(req.file.path);
    console.log(response);
    res.status(200).json({
      success: true,
      data: {
        imageUrl: response.url,
        publicId: response.public_id,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const handleDeleteUploadedImage = async (req, res) => {
  const { publicId } = req.body;

  try {
    await deleteImageCloudinary(publicId);
    res.status(200).json({
      success: true,
      message: "Image deleted",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const handlePostThread = async (req, res) => {
  const { thread } = req.body;
  const { _id } = req.user;
  console.log(req.body);

  try {
    const post1 = thread[0];
    const otherPosts = thread.slice(1);
    const post1Res = await Post.create({
      user: _id,
      postType: post1.type,
      content: {
        text: post1.text,
        images: post1.images.map((img) => img.imageUrl),
        poll: {
          options: post1.pollDetails.options,
        },
      },
    });
    if (otherPosts.length > 0) {
      const posts = otherPosts.map((post) => {
        return {
          user: _id,
          postType: post.type,
          content: {
            text: post.text,
            images: post.images.map((img) => img.imageUrl),
            poll: {
              options: post.pollDetails.options,
            },
          },
        };
      });
      let insertedPosts = await Post.insertMany(posts);
      const insertedPostIds = insertedPosts.map((post) => post._id);
      const mainPost = await Post.findById(post1Res._id);
      mainPost.comments.push(...insertedPostIds);
      await mainPost.save();
    }
    console.log(post1Res);
    res.end("success");
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $match: {
          postType: "Main",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          user: 0,
          "userDetails.password": 0,
          "userDetails.fullName": 0,
          "userDetails.email": 0,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "All threads fetched successfull",
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const handlePostLike = async (req, res) => {
  const { _id } = req.user;
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId);
    const isLikePresent = post.likes.some((id) => id.equals(_id));

    if (isLikePresent) {
      post.likes = post.likes.filter((id) => !id.equals(_id));
    } else {
      post.likes.push(_id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "Liked or Unliked",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const getSinglePost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(postId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          user: 0,
          "userDetails.password": 0,
          "userDetails.fullName": 0,
          "userDetails.email": 0,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: post?.[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};
