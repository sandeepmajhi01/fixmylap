import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  buyerName: {
    type: String,
    required: true,
  },
  buyerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  buyerMobile: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Contacted"],
    default: "Pending",
  },
}, {
  timestamps: true,
});

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
