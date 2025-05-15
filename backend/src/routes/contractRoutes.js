const express = require("express");
const {
  createContract,
  getContracts,
} = require("../controllers/contractController");
const router = express.Router();
router.post("/", createContract);
router.get("/", getContracts);
module.exports = router;
