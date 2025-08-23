import express from "express";
import {
  createOpportunity,
  getOpportunities,
  deleteOpportunity,
} from "../controllers/fresherOpportunityController.js";

const router = express.Router();

router.post("/", createOpportunity);
router.get("/", getOpportunities);
router.delete("/:id", deleteOpportunity);

export default router;
