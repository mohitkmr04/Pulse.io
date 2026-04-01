import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required ❌"
      });
    }

    // ✅ Check if user already exists (better UX)
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email ❌"
      });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // ✅ Create user
    const user = await User.create({
      name,
      email,
      password: hashed,
      tenantId: email
    });

    // ✅ Send response
    res.json({
      message: "User registered successfully ✅",
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);

    // ✅ Handle duplicate key error (extra safety)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email already registered ❌"
      });
    }

    res.status(500).json({
      message: "Server error ❌"
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required ❌"
      });
    }

    // ✅ Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not registered ❌"
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password ❌"
      });
    }

    // ✅ Success response
    res.json({
      message: "Login successful ✅",
      token: generateToken(user._id),
      role: user.role,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error ❌"
    });
  }
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