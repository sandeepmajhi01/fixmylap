import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

// Get All Inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    const mapped = inquiries.map(i => ({
      id: i._id,
      productId: i.productId,
      productTitle: i.productTitle,
      price: i.price,
      buyerName: i.buyerName,
      buyerEmail: i.buyerEmail,
      buyerMobile: i.buyerMobile,
      status: i.status,
      date: i.createdAt
    }));

    res.json(mapped);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create Inquiry
router.post("/", async (req, res) => {
  const { productId, productTitle, price, buyerName, buyerEmail, buyerMobile } = req.body;
  if (!productId || !productTitle || !price || !buyerName || !buyerEmail || !buyerMobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const inquiry = await Inquiry.create({
      productId,
      productTitle,
      price,
      buyerName,
      buyerEmail,
      buyerMobile
    });

    const response = {
      id: inquiry._id,
      productId: inquiry.productId,
      productTitle: inquiry.productTitle,
      price: inquiry.price,
      buyerName: inquiry.buyerName,
      buyerEmail: inquiry.buyerEmail,
      buyerMobile: inquiry.buyerMobile,
      status: inquiry.status,
      date: inquiry.createdAt
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Inquiry Status (Mark Contacted)
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    inquiry.status = status;
    await inquiry.save();
    
    res.json({
      id: inquiry._id,
      status: inquiry.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Inquiry
router.delete("/:id", async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
