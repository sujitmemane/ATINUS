import mongoose, { Schema } from "mongoose";

const postContentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  images: [String],
  poll: {
    options: [String],
    votes: [
      {
        option: String,
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
});

const postSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postType: {
      type: String,
      enum : ["Main","Comment"],
      required:true,
    },
    content: postContentSchema,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reposts: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
