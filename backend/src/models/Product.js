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
    productQuality: {
      type: String,
      default: "Standard",
    },
    unitOfMeasure: {
      type: String,
      default: "Piece",
    },
    hsnCode: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    costPrice: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    currency: {
      type: String,
      default: "INR",
    },
    stockQuantity: {
      type: String,
      default: 0,
    },
    warehouse: {
      type: String,
      trim: true,
    },
    supplier: {
      type: String,
      trim: true,
    },
    productImage: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
