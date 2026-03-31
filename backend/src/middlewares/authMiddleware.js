import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = (roles = []) => async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) return res.status(401).json({ msg: "User not found" });

  if (roles.length && !roles.includes(user.role)) {
    return res.status(403).json({ msg: "Forbidden" });
  }

  req.user = user;
  next();
};