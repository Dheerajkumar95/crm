import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  businessName: String,
  title: String,
  firstName: String,
  lastName: String,
  mobile: String,
  email: String,
  connectionType: String,
  website: String,
  industrySegment: String,
  country: String,
  state: String,
  city: String,
});

module.exports = mongoose.model("Company", companySchema);
