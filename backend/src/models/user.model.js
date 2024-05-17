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
    link: {
      type: String,
      default:
        "https://instagram.fcgh33-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fcgh33-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=TokSSzUDPVcQ7kNvgEIP3mV&edm=AJXOVykBAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AYAr0sbpiCj2dBA0DMJfhZKxVmD8ctEd5JHkuZuQdzW-VA&oe=664B5ACF&_nc_sid=07c3e7",
    },
    publicId: { type: String },
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
