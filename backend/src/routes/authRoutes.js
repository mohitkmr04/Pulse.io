import express from "express";
import { login, register } from "../controllers/authController.js";
import { getUsers, updateUserRole } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { validateRegister, validateLogin } from "../validators/userValidator.js";

const router = express.Router();

router.post("/register",validate(validateRegister), register);
router.post("/login",validate(validateLogin), login);

router.get("/users", protect(["admin"]), getUsers);
router.put("/role", protect(["admin"]), updateUserRole);

export default router;