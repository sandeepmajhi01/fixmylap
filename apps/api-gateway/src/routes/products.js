import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    
    // Map _id to id for frontend consistency
    const mapped = products.map(p => ({
      id: p._id,
      title: p.title,
      brand: p.brand,
      price: p.price,
      usageCondition: p.usageCondition,
      description: p.description,
      imageUrl: p.imageUrl,
      specifications: p.specifications
    }));

    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Product
router.post("/", async (req, res) => {
  const { title, brand, price, usageCondition, description, imageUrl, specifications } = req.body;
  if (!title || !brand || !price || !usageCondition || !description || !imageUrl || !specifications) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const product = await Product.create({
      title,
      brand,
      price,
      usageCondition,
      description,
      imageUrl,
      specifications
    });

    const response = {
      id: product._id,
      title: product.title,
      brand: product.brand,
      price: product.price,
      usageCondition: product.usageCondition,
      description: product.description,
      imageUrl: product.imageUrl,
      specifications: product.specifications
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
