import jwt from "jsonwebtoken";
export const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};
