import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: `Halo ${req.user.username}, ini data lu!` });
});

export default router;
