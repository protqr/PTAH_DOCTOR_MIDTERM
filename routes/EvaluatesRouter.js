import express from "express";
import { getEvaluatesByUserIdAndDate } from "../controllers/EvaluatesController.js";


const router = express.Router();

router.route("/:id").get(getEvaluatesByUserIdAndDate).post(getEvaluatesByUserIdAndDate);

export default router;
