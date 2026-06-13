import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Products functions
export const getProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products", { cause: error });
  }
};

export const addProduct = async (product) => {
  try {
    const res = await api.post("/products", product);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add product", { cause: error });
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete product", { cause: error });
  }
};

// Users & Auth functions
export const registerUser = async (user) => {
  try {
    const res = await api.post("/auth/register", user);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed", { cause: error });
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed", { cause: error });
  }
};

export const resetPassword = async (email, password) => {
  try {
    const res = await api.post("/auth/reset-password", { email, password });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed", { cause: error });
  }
};

// Inquiries functions
export const getInquiries = async () => {
  try {
    const res = await api.get("/inquiries");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch inquiries", { cause: error });
  }
};

export const addInquiry = async (inquiry) => {
  try {
    const res = await api.post("/inquiries", inquiry);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit inquiry", { cause: error });
  }
};

export const deleteInquiry = async (id) => {
  try {
    const res = await api.delete(`/inquiries/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete inquiry", { cause: error });
  }
};

export const updateInquiryStatus = async (id, status) => {
  try {
    const res = await api.patch(`/inquiries/${id}`, { status });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update inquiry status", { cause: error });
  }
};

// Contacts functions
export const getContactMessages = async () => {
  try {
    const res = await api.get("/contacts");
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch contact messages", { cause: error });
  }
};

export const submitContactMessage = async (contactMessage) => {
  try {
    const res = await api.post("/contacts", contactMessage);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to submit contact message", { cause: error });
  }
};

export const deleteContactMessage = async (id) => {
  try {
    const res = await api.delete(`/contacts/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete contact message", { cause: error });
  }
};
