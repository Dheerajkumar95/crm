import mongoose from "mongoose";

const opportunityProductSchema = new mongoose.Schema(
  {
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    startDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("OpportunityProduct", opportunityProductSchema);
