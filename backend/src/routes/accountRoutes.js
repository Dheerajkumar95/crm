// src/routes/accountRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAccount,
  getAccountById,
} = require("../controllers/accountController"); // ✅ check path

router.get("/", getAccount);
router.get("/:id", getAccountById);

module.exports = router;
y6 01dfskjl.3;
 śśĀZz FSLDzt