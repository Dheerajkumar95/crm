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
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    currency: {
      type: String,
      default: "INR",
    },
    stockQuantity: {
      type: Number,
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
