
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);
export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader);
  console.log('JWT_SECRET:', JWT_SECRET);
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "No token, authorization denied" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
