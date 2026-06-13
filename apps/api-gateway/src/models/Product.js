import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  usageCondition: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  specifications: {
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    graphics: { type: String, required: true },
    screenSize: { type: String, required: true },
    os: { type: String, required: true },
  },
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
