import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    tenantId: email // simple tenant
  });

  res.json({ token: generateToken(user._id) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({
  token: generateToken(user._id),
  role: user.role
});
};

export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const updateUserRole = async (req, res) => {
  const { userId, role } = req.body;

  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ msg: "User not found" });

  user.role = role;
  await user.save();

  res.json({ msg: "Role updated" });
};