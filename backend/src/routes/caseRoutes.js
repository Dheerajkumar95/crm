const express = require("express");
const { createCase, getCases } = require("../controllers/caseController");
const router = express.Router();
router.post("/", createCase);
router.get("/", getCases);
module.exports = router;
