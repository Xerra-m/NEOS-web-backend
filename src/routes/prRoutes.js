import express from "express";
import { getTask } from "../controllers/prControllers.js";

const router = express.Router();

router.get("/", getTask);

export default router;
