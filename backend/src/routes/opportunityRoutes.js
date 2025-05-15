const express = require("express");
const {
  createOpportunity,
  getOpportunities,
} = require("../controllers/opportunityController");
const router = express.Router();
router.post("/", createOpportunity);
router.get("/", getOpportunities);
module.exports = router;
