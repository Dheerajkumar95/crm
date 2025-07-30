const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");
const { createCompany } = require("../controllers/companyController");

// Add company route
router.post("/", createCompany);

// ✅ Search companies for business lookup
router.get("/search", async (req, res) => {
  const search = req.query.search;

  try {
    const companies = await Lead.find({
      businessName: { $regex: search, $options: "i" },
    })
      .limit(5)
      .select(
        "businessName address1 address2 city state country website gstin code designation"
      );

    const mapped = companies.map((c) => ({
      name: c.businessName,
      address1: c.address1,
      address2: c.address2,
      city: c.city,
      state: c.state,
      country: c.country,
      website: c.website,
      gstin: c.gstin,
      code: c.code,
      designation: c.designation,
    }));

    res.json(mapped);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
});

module.exports = router;
