import express from "express";
import OpportunityProduct from "../models/OpportunityProduct.js";
import Product from "../models/Product.js";

const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { productId, quantity, startDate, deliveryDate } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (["Standard", "Bundle/Kit"].includes(product.productQuality)) {
      if (!quantity || quantity > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          error: `Only ${product.stockQuantity} units available in stock`,
        });
      }
      product.stockQuantity -= quantity;
      await product.save();
    }

    const opportunityProductData = {
      ...req.body,
      quantity: ["Standard", "Bundle/Kit"].includes(product.productQuality)
        ? req.body.quantity
        : undefined,
      startDate: ["Service", "Subscription", "Configurable"].includes(
        product.productQuality
      )
        ? req.body.startDate
        : undefined,
      deliveryDate: ["Service", "Subscription", "Configurable"].includes(
        product.productQuality
      )
        ? req.body.deliveryDate
        : undefined,
      productQuality: req.body.productQuality,
      startDate: req.body.startDate,
      deliveryDate: req.body.deliveryDate,
    };

    const newProduct = new OpportunityProduct(opportunityProductData);
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
      remainingStock: product.stockQuantity,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
});

router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const { sellingPrice, startDate, deliveryDate } = req.body;

  try {
    const product = await OpportunityProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (sellingPrice !== undefined) product.sellingPrice = sellingPrice;
    if (startDate) product.startDate = new Date(startDate);
    if (deliveryDate) product.deliveryDate = new Date(deliveryDate);

    await product.save();
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product", error });
  }
});
router.get("/:opportunityId", async (req, res) => {
  try {
    const products = await OpportunityProduct.find({
      opportunityId: req.params.opportunityId,
    }).populate({
      path: "productId",
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

export default router;
