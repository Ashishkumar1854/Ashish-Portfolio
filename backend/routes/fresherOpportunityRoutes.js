// import express from "express";
// import {
//   createOpportunity,
//   getOpportunities,
//   deleteOpportunity,
// } from "../controllers/fresherOpportunityController.js";

// const router = express.Router();

// router.post("/", createOpportunity);
// router.get("/", getOpportunities);
// router.delete("/:id", deleteOpportunity);

// export default router;

//05/09

const express = require("express");
const router = express.Router();

const {
  createOpportunity,
  getOpportunities,
  deleteOpportunity,
} = require("../controllers/fresherOpportunityController");

const { protect, adminAuth } = require("../middleware/authMiddleware");

// Public: view opportunities
router.get("/", getOpportunities);

// Admin: add/delete
router.post("/", protect, adminAuth, createOpportunity);
router.delete("/:id", protect, adminAuth, deleteOpportunity);

module.exports = router;
