import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowLeft, Check } from "lucide-react";

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currentUser, submitInquiry } = useApp();
  
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    mobile: currentUser?.mobile || "",
  });

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
        <Link to="/products" className="text-primary hover:underline mt-4 text-xs font-bold uppercase tracking-wider">
          Back to Laptops Catalog
        </Link>
      </div>
    );
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!buyerInfo.name || !buyerInfo.email || !buyerInfo.mobile) return;

    submitInquiry({
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      buyerName: buyerInfo.name,
      buyerEmail: buyerInfo.email,
      buyerMobile: buyerInfo.mobile,
    });

    setShowInquiryModal(false);
    navigate("/order-success");
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen py-12">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Back navigation */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors uppercase tracking-widest mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Catalog</span>
        </Link>

        {/* Large Layout Card */}
        <div className="bg-[#0c0c0c] border border-gray-900 rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image */}
          <div className="bg-black flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-900">
            <div className="relative w-full h-[320px] md:h-[400px]">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-contain filter brightness-95"
              />
              <span className="absolute top-2 left-2 bg-primary text-black text-[9px] font-black tracking-widest px-2.5 py-1 uppercase rounded">
                {product.brand}
              </span>
            </div>
          </div>

          {/* Right: Specs & Action */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Product Title */}
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Certified Refurbished</span>
                <h1 className="text-2xl md:text-3xl font-black text-white mt-1 leading-snug">
                  {product.title}
                </h1>
              </div>

              {/* Price & Usage Tag */}
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="text-2xl md:text-3xl font-black text-white">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-gray-400 font-medium bg-white/5 border border-white/10 px-3 py-1 rounded">
                  All Inclusive Price
                </span>
              </div>

              {/* Condition / Used tag */}
              <div className="bg-[#152415]/10 border border-[#25B425]/20 p-4 rounded-lg space-y-1">
                <p className="text-[9px] font-black text-primary uppercase tracking-widest">Usage Condition details</p>
                <p className="text-xs text-gray-300 font-medium">
                  {product.usageCondition}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Checklist details */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 py-2 border-t border-gray-900">
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>90-Day Repair Warranty</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Genuine Chargers Included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>100% Quality Checked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check size={14} className="text-primary shrink-0" />
                  <span>Free Cleanroom Setup</span>
                </div>
              </div>

            </div>

            {/* Buy Action */}
            <div className="pt-8 border-t border-gray-900 mt-8">
              <button
                onClick={() => {
                  // Pre-fill user data again just in case they logged in recently
                  if (currentUser) {
                    setBuyerInfo({
                      name: currentUser.name,
                      email: currentUser.email,
                      mobile: currentUser.mobile || "",
                    });
                  }
                  setShowInquiryModal(true);
                }}
                className="w-full bg-primary text-black py-4 font-black text-xs tracking-widest rounded-xl transition hover:brightness-110 active:scale-95 uppercase"
              >
                Buy Now / Inquire Interest
              </button>
            </div>

          </div>
        </div>

        {/* Specifications Details Section */}
        <div className="mt-12 bg-[#0c0c0c] border border-gray-900 rounded-xl p-8 lg:p-10">
          <h2 className="text-lg font-black text-white uppercase tracking-wider mb-6 pb-2 border-b border-gray-900">
            TECHNICAL SPECIFICATIONS
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs font-semibold">
            <div className="flex justify-between py-2.5 border-b border-gray-900/60">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Processor (CPU)</span>
              <span className="text-white text-right font-medium">{product.specifications.processor}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-900/60">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Memory (RAM)</span>
              <span className="text-white text-right font-medium">{product.specifications.ram}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-900/60">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Storage</span>
              <span className="text-white text-right font-medium">{product.specifications.storage}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-900/60">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Graphics (GPU)</span>
              <span className="text-white text-right font-medium">{product.specifications.graphics}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-900/60">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Display Screen</span>
              <span className="text-white text-right font-medium">{product.specifications.screenSize}</span>
            </div>
            <div className="flex justify-between py-2.5 border-b border-gray-900/60">
              <span className="text-gray-500 uppercase tracking-wider text-[10px]">Operating System</span>
              <span className="text-white text-right font-medium">{product.specifications.os}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0c0c0c] border border-gray-900 p-8 rounded-2xl w-full max-w-md animate-fade-in relative">
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">
              Interested in Buying?
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Please provide your contact details. The store owner will reach out to you within 2-3 hours to arrange delivery/pickup.
            </p>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={buyerInfo.name}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
                  className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={buyerInfo.email}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                  className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={buyerInfo.mobile}
                  onChange={(e) => setBuyerInfo({ ...buyerInfo, mobile: e.target.value })}
                  className="w-full bg-[#050505] border border-gray-800 text-white p-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                  placeholder="10-digit mobile number"
                />
              </div>

              {/* Product preview line */}
              <div className="bg-[#111111] p-3.5 border border-gray-950 rounded-lg text-[11px] text-gray-400 mt-2">
                <span className="font-bold text-white block">Inquiry Item:</span>
                <span>{product.title} - ₹{product.price.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInquiryModal(false)}
                  className="flex-1 bg-[#181818] border border-gray-800 text-gray-300 py-3 text-xs font-black tracking-wider rounded-xl uppercase transition hover:bg-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-black py-3 text-xs font-black tracking-wider rounded-xl uppercase transition hover:brightness-110"
                >
                  Confirm Buy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;