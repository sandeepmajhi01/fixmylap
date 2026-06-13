import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, Trash2, Check, User, Mail, Phone, Calendar, Laptop, ShoppingBag } from "lucide-react";

const IMAGE_PRESETS = [
  { name: "Lenovo ThinkPad", url: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80" },
  { name: "Apple MacBook", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80" },
  { name: "Dell Latitude", url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80" },
  { name: "HP EliteBook", url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80" },
  { name: "Custom URL", url: "" },
];

function Dashboard() {
  const {
    products,
    inquiries,
    contactMessages,
    addNewProduct,
    removeProduct,
    removeInquiry,
    changeInquiryStatus,
    removeContactMessage
  } = useApp();
  
  // Tab states: "products" or "inquiries"
  const [activeTab, setActiveTab] = useState("products");
  
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    brand: "",
    price: "",
    usageCondition: "",
    description: "",
    imageUrl: IMAGE_PRESETS[0].url,
    specifications: {
      processor: "",
      ram: "",
      storage: "",
      graphics: "",
      screenSize: "",
      os: "",
    },
  });

  const [formSuccess, setFormSuccess] = useState(false);

  const handlePresetSelect = (url) => {
    setNewProduct({ ...newProduct, imageUrl: url });
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.brand || !newProduct.price) return;

    addNewProduct({
      ...newProduct,
      price: Number(newProduct.price),
    });

    setFormSuccess(true);
    setNewProduct({
      title: "",
      brand: "",
      price: "",
      usageCondition: "",
      description: "",
      imageUrl: IMAGE_PRESETS[0].url,
      specifications: {
        processor: "",
        ram: "",
        storage: "",
        graphics: "",
        screenSize: "",
        os: "",
      },
    });

    setTimeout(() => {
      setFormSuccess(false);
      setShowAddForm(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      
      {/* Dashboard Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white">FixMyLap Control Panel</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Store inventory &amp; buyer records database</p>
        </div>
        
        {/* Tab Buttons */}
        <div className="flex bg-[#0c0c0c] border border-gray-900 p-1.5 rounded-xl text-xs font-bold uppercase tracking-widest">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition ${
              activeTab === "products"
                ? "bg-primary text-black font-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Laptop size={14} />
            <span>Manage Products ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition ${
              activeTab === "inquiries"
                ? "bg-primary text-black font-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <ShoppingBag size={14} />
            <span>Buyer Inquiries ({inquiries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition ${
              activeTab === "contacts"
                ? "bg-primary text-black font-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Mail size={14} />
            <span>Contact Messages ({contactMessages.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Products Manager */}
      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-black uppercase tracking-wider text-white">Laptops Catalog Manager</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-primary text-black px-4 py-2.5 text-xs font-black tracking-wider rounded-xl transition hover:brightness-110 flex items-center gap-2 uppercase"
            >
              <Plus size={16} />
              <span>{showAddForm ? "Close Form" : "Add Product"}</span>
            </button>
          </div>

          {/* Add Product Form */}
          {showAddForm && (
            <div className="bg-[#0c0c0c] border border-gray-900 p-6 md:p-8 rounded-xl animate-fade-in">
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-6 border-b border-gray-900 pb-2">
                Register New Laptop Item
              </h3>

              {formSuccess ? (
                <div className="bg-[#152415]/30 border border-[#25B425]/20 p-6 rounded-xl flex items-center gap-3 text-sm text-gray-300">
                  <Check size={20} className="text-primary shrink-0" />
                  <span>Laptop added to store catalog successfully! Updating view...</span>
                </div>
              ) : (
                <form onSubmit={handleProductSubmit} className="space-y-6">
                  {/* Basic details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Title / Model</label>
                      <input
                        type="text"
                        required
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                        placeholder="e.g. Lenovo ThinkPad T490"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Brand</label>
                      <input
                        type="text"
                        required
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                        className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                        placeholder="e.g. Lenovo, Dell, Apple"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Price (INR)</label>
                      <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                        placeholder="e.g. 24999"
                      />
                    </div>
                  </div>

                  {/* Usage & description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Usage Condition (Condition details)</label>
                      <input
                        type="text"
                        required
                        value={newProduct.usageCondition}
                        onChange={(e) => setNewProduct({ ...newProduct, usageCondition: e.target.value })}
                        className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                        placeholder="e.g. 1 Year Used (Grade A - Battery health 90%)"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                      <input
                        type="text"
                        required
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                        placeholder="Brief marketing info..."
                      />
                    </div>
                  </div>

                  {/* Specifications */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Device Technical Specifications</h4>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">CPU Processor</label>
                        <input
                          type="text"
                          required
                          value={newProduct.specifications.processor}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            specifications: { ...newProduct.specifications, processor: e.target.value }
                          })}
                          className="w-full bg-[#050505] border border-gray-800 text-white p-2.5 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                          placeholder="i5-8350U"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">RAM Memory</label>
                        <input
                          type="text"
                          required
                          value={newProduct.specifications.ram}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            specifications: { ...newProduct.specifications, ram: e.target.value }
                          })}
                          className="w-full bg-[#050505] border border-gray-800 text-white p-2.5 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                          placeholder="16GB DDR4"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Storage SSD/HDD</label>
                        <input
                          type="text"
                          required
                          value={newProduct.specifications.storage}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            specifications: { ...newProduct.specifications, storage: e.target.value }
                          })}
                          className="w-full bg-[#050505] border border-gray-800 text-white p-2.5 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                          placeholder="512GB SSD"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Graphics GPU</label>
                        <input
                          type="text"
                          required
                          value={newProduct.specifications.graphics}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            specifications: { ...newProduct.specifications, graphics: e.target.value }
                          })}
                          className="w-full bg-[#050505] border border-gray-800 text-white p-2.5 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                          placeholder="Intel UHD 620"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Screen Size</label>
                        <input
                          type="text"
                          required
                          value={newProduct.specifications.screenSize}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            specifications: { ...newProduct.specifications, screenSize: e.target.value }
                          })}
                          className="w-full bg-[#050505] border border-gray-800 text-white p-2.5 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                          placeholder='14" FHD IPS'
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">OS System</label>
                        <input
                          type="text"
                          required
                          value={newProduct.specifications.os}
                          onChange={(e) => setNewProduct({
                            ...newProduct,
                            specifications: { ...newProduct.specifications, os: e.target.value }
                          })}
                          className="w-full bg-[#050505] border border-gray-800 text-white p-2.5 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                          placeholder="Windows 11 Pro"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image presets */}
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">Product Image Url Preset / Custom</label>
                    <div className="flex flex-wrap gap-2">
                      {IMAGE_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => handlePresetSelect(preset.url)}
                          className={`px-3 py-2 text-[10px] font-bold rounded-lg border transition ${
                            newProduct.imageUrl === preset.url
                              ? "bg-primary/10 border-primary text-primary"
                              : "bg-[#050505] border-gray-800 text-gray-400 hover:text-white"
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                    <input
                      type="text"
                      required
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-0 outline-none rounded-lg"
                      placeholder="Enter custom image URL..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-black py-4 font-black text-xs tracking-wider rounded-xl transition hover:brightness-110 uppercase"
                  >
                    Register Product
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Products Table */}
          <div className="bg-[#0c0c0c] border border-gray-900 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-400 font-semibold border-collapse">
                <thead className="bg-[#050505] text-[10px] text-gray-500 uppercase tracking-wider border-b border-gray-900">
                  <tr>
                    <th className="p-4 pl-6">Device</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Specs Preview</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 pr-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/5 transition">
                      <td className="p-4 pl-6 flex items-center gap-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          className="h-10 w-12 object-cover rounded bg-black border border-gray-800"
                        />
                        <span className="text-white font-bold">{prod.title}</span>
                      </td>
                      <td className="p-4 text-gray-300 font-bold">{prod.brand}</td>
                      <td className="p-4 text-[10px] space-y-0.5">
                        <p className="text-gray-300">{prod.specifications.processor.split(" (")[0]}</p>
                        <p className="text-gray-500">{prod.specifications.ram} / {prod.specifications.storage}</p>
                      </td>
                      <td className="p-4 max-w-xs truncate text-[11px] font-medium text-gray-400">
                        {prod.usageCondition}
                      </td>
                      <td className="p-4 text-white font-black text-sm">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 pr-6 text-center">
                        <button
                          onClick={() => removeProduct(prod.id)}
                          className="text-[#ff4d4d] hover:bg-[#ff4d4d]/10 border border-[#ff4d4d]/20 p-2 rounded-lg transition"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inquiries Manager */}
      {activeTab === "inquiries" && (
        <div className="space-y-6">
          <h2 className="text-base font-black uppercase tracking-wider text-white">Customer Interest Records</h2>

          {inquiries.length === 0 ? (
            <div className="text-center py-20 bg-[#0c0c0c] border border-gray-900 rounded-xl">
              <p className="text-gray-500 text-sm">No buyer inquiries registered yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-[#0c0c0c] border border-gray-900 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-6 items-center"
                >
                  {/* Left: Product Info */}
                  <div>
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Interested Item</span>
                    <h3 className="text-sm font-black text-white mt-0.5 leading-snug">{inq.productTitle}</h3>
                    <p className="text-xs text-gray-500 font-bold mt-1">₹{inq.price.toLocaleString("en-IN")}</p>
                  </div>

                  {/* Middle: Buyer Details */}
                  <div className="space-y-1 md:col-span-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                      <User size={14} className="text-primary shrink-0" />
                      <span>{inq.buyerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Mail size={14} className="text-primary shrink-0" />
                      <span>{inq.buyerEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Phone size={14} className="text-primary shrink-0" />
                      <a href={`tel:${inq.buyerMobile}`} className="hover:text-primary hover:underline font-bold text-gray-300">
                        {inq.buyerMobile}
                      </a>
                    </div>
                  </div>

                  {/* Right: Date, Status, Action */}
                  <div className="flex flex-col md:items-end gap-3 justify-between h-full">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                      <Calendar size={12} />
                      <span>{new Date(inq.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {inq.status === "Pending" ? (
                        <button
                          onClick={() => changeInquiryStatus(inq.id, "Contacted")}
                          className="flex items-center gap-1.5 bg-[#152415] border border-[#25B425]/30 text-primary hover:bg-[#25B425] hover:text-black px-3.5 py-2 text-[10px] font-black tracking-wider rounded-lg uppercase transition-all"
                        >
                          <Check size={12} />
                          <span>Mark Contacted</span>
                        </button>
                      ) : (
                        <span className="flex items-center gap-1.5 bg-[#152415] border border-[#25B425]/30 text-primary px-3.5 py-2 text-[10px] font-black tracking-wider rounded-lg uppercase">
                          <Check size={12} />
                          <span>Contacted</span>
                        </span>
                      )}

                      <button
                        onClick={() => removeInquiry(inq.id)}
                        className="text-[#ff4d4d] border border-[#ff4d4d]/20 hover:bg-[#ff4d4d]/10 p-2 rounded-lg transition"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Contact Messages Manager */}
      {activeTab === "contacts" && (
        <div className="space-y-6">
          <h2 className="text-base font-black uppercase tracking-wider text-white">Contact Form Messages Inbox</h2>

          {contactMessages.length === 0 ? (
            <div className="text-center py-20 bg-[#0c0c0c] border border-gray-900 rounded-xl animate-fade-in">
              <p className="text-gray-500 text-sm">No contact messages received yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 animate-fade-in">
              {contactMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-[#0c0c0c] border border-gray-900 p-6 rounded-xl flex flex-col md:flex-row justify-between gap-6"
                >
                  <div className="space-y-2 flex-grow">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold text-white bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <User size={13} className="text-primary" />
                        {msg.name}
                      </span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        <Mail size={13} className="text-primary" />
                        {msg.email}
                      </a>
                    </div>
                    <p className="text-xs text-gray-300 bg-[#070707] border border-gray-950 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-end justify-between md:justify-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold">
                      <Calendar size={12} />
                      <span>{new Date(msg.date).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => removeContactMessage(msg.id)}
                      className="text-[#ff4d4d] border border-[#ff4d4d]/20 hover:bg-[#ff4d4d]/10 p-2 rounded-lg transition"
                      title="Delete Message"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;