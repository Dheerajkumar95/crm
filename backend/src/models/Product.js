import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productDescription: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    hsnCode: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    currency: { type: String, default: "INR" },
    productQuality: {
      type: String,
      enum: [
        "Standard",
        "Service",
        "Subscription",
        "Bundle/Kit",
        "Configurable",
      ],
      required: true,
    },
    unitOfMeasure: { type: String },
    stockQuantity: { type: Number },
    warehouse: { type: String },
    supplier: { type: String },
    serviceDuration: { type: String },
    serviceProvider: { type: String },
    subscriptionPeriod: { type: String },
    renewalPrice: { type: Number },
    bundleItems: { type: String },
    configOptions: { type: String },

    productImage: { type: String },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
