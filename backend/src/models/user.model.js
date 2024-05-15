import mongoose, { model } from "mongoose";
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
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

export default mongoose.model("User", userSchema);
