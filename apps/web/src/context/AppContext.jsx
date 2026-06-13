/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";
import {
  getProducts,
  getInquiries,
  addProduct,
  deleteProduct,
  addInquiry,
  deleteInquiry,
  updateInquiryStatus,
  getContactMessages,
  deleteContactMessage
} from "../utils/db";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("fixmylap_current_user");
    return stored ? JSON.parse(stored) : null;
  });
  
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial data from backend API
  const refreshProducts = async () => {
    try {
      const prods = await getProducts();
      setProducts(prods);
    } catch (err) {
      console.error("Failed to refresh products:", err.message);
    }
  };

  const refreshInquiries = async () => {
    try {
      const inqs = await getInquiries();
      setInquiries(inqs);
    } catch (err) {
      console.error("Failed to refresh inquiries:", err.message);
    }
  };

  const refreshContactMessages = async () => {
    try {
      const msgs = await getContactMessages();
      setContactMessages(msgs);
    } catch (err) {
      console.error("Failed to refresh contact messages:", err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const prods = await getProducts();
        setProducts(prods);
        
        // Only fetch admin collections if logged in as admin
        if (currentUser?.role === "admin") {
          const inqs = await getInquiries();
          setInquiries(inqs);
          const msgs = await getContactMessages();
          setContactMessages(msgs);
        }
      } catch (err) {
        console.error("Failed to fetch initial data:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentUser]);

  // Sync user state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("fixmylap_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("fixmylap_current_user");
    }
  }, [currentUser]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    setInquiries([]);
    setContactMessages([]);
  };

  const addNewProduct = async (productData) => {
    const newProd = await addProduct(productData);
    await refreshProducts();
    return newProd;
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    await refreshProducts();
  };

  const submitInquiry = async (inquiryData) => {
    const newInq = await addInquiry(inquiryData);
    await refreshInquiries();
    return newInq;
  };

  const removeInquiry = async (id) => {
    await deleteInquiry(id);
    await refreshInquiries();
  };

  const changeInquiryStatus = async (id, status) => {
    await updateInquiryStatus(id, status);
    await refreshInquiries();
  };

  const removeContactMessageItem = async (id) => {
    await deleteContactMessage(id);
    await refreshContactMessages();
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser: login,
        logout,
        products,
        inquiries,
        contactMessages,
        loading,
        addNewProduct,
        removeProduct,
        submitInquiry,
        removeInquiry,
        changeInquiryStatus,
        removeContactMessage: removeContactMessageItem,
        refreshProducts,
        refreshInquiries,
        refreshContactMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
export default AppContext;
