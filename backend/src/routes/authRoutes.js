import express from "express";
import { login, register } from "../controllers/authController.js";
import { getUsers, updateUserRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", protect(["admin"]), getUsers);
router.put("/role", protect(["admin"]), updateUserRole);

export default router;