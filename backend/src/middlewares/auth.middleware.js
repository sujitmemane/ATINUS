import User from "../models/user.model.js";

import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    console.log(token);

    if (!token) {
      return res.status(400).json({
        message: "Unautorized Request",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken._id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
