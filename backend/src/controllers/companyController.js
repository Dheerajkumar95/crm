const Company = require("../models/Company");

const createCompany = async (req, res) => {
  try {
    const {
      businessName,
      title,
      firstName,
      lastName,
      mobile,
      email,
      connectionType,
      website,
      industrySegment,
      country,
      state,
      city,
    } = req.body;

    // Server-side required field validation
    if (
      !businessName ||
      !title ||
      !firstName ||
      !lastName ||
      !mobile ||
      !email ||
      !connectionType ||
      !website ||
      !industrySegment ||
      !country ||
      !state ||
      !city
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json({ message: "Company saved successfully!" });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createCompany };
