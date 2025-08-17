const express = require("express");
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);
router.get("/:id", getContactById);
router.put("/:id", updateContact);

module.exports = router;
