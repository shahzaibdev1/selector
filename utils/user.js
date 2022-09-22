import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "./config.js";
import bcrypt from "bcryptjs";

export const generateToken = (user, role) => {
  return jwt.sign({ userId: user?._id, role }, PRIVATE_KEY, {
    expiresIn: "24h",
    algorithm: "HS512",
  });
};

export const verifyPass = async (user, password) => {
  // verify password
  const isMatch = await bcrypt.compare(password, user?.password);
  return isMatch;
};

const checkAuth = (auth) => {
  let token = auth?.split("Bearer ")[1];

  try {
    if (token) {
      const user = jwt.verify(token, PRIVATE_KEY);
      if (user) return user;
      else throw new Error("Invalid/Expired token");
    } else throw new Error("Authorization header must be provided");
  } catch (error) {
    throw new Error(error);
  }
};
