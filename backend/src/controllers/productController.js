import Product from "../models/Product.js";

export const generateProductId = async () => {
  const prefix = "P";
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yy = String(now.getFullYear()).slice(-2);
  const dateStr = `${dd}${mm}${yy}`; // e.g., 220825

  let randomStr;
  let productId;
  let exists = true;

  while (exists) {
    randomStr = String(Math.floor(100 + Math.random() * 900));
    productId = `${prefix}-${dateStr}-${randomStr}`;
    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct) {
      exists = false;
    }
  }

  return productId;
};

export const addProduct = async (req, res) => {
  try {
    const productId = await generateProductId();
    const newProduct = new Product({ ...req.body, productId });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const category = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.find({ category });
    if (products.length === 0) {
      return res.status(200).json([]);
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Updatestatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { status: status ? "Active" : "Inactive" },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
