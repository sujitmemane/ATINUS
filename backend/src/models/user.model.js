import mongoose, { model, Schema } from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unqiue: true,
  },
  email: {
    type: String,
    unqiue: true,
  },
  phoneNumber: {
    type: String,
    unqiue: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  link: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDobAZZfMUIx0nRIyNYYDx2eqFm55FJCdOjvLkMG8SZA&s",
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  isPrivate: {
    type: Boolean,
    default: false,
  },
  oneWord: {
    type: String,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

export default mongoose.model("User", userSchema);
