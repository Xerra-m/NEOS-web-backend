// dependency
import express from "express";

// import controllers
import { register, login } from "../controllers/authController.js";

// import middlewares
import {
  validateRegister,
  authLimiter,
  registerLimiter,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// register
router.post("/register", registerLimiter, validateRegister, register);

// login
router.post("/login", authLimiter, login);

export default router;
