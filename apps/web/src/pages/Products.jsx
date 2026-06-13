import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Search, Cpu, HardDrive, Filter } from "lucide-react";

function Products() {
  const { products } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const brands = ["All", ...new Set(products.map((p) => p.brand))];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = selectedBrand === "All" || prod.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="bg-[#050505] text-white min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Store Inventory</span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-1 uppercase tracking-tight">
            Refurbished Laptops Catalog
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-xl">
            Browse our full stock of enterprise laptops. Standard 90-day warranty, pre-loaded OS, and certified testing report included.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0d0d0d] border border-gray-900 p-5 rounded-xl mb-8">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050505] border border-gray-800 text-white pl-10 pr-4 py-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg transition"
              placeholder="Search laptops by model, CPU, specs..."
            />
          </div>

          {/* Brand pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
            <span className="text-xs text-gray-500 font-bold flex items-center gap-1.5 mr-2">
              <Filter size={14} className="text-primary" />
              <span>Brand:</span>
            </span>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition ${
                  selectedBrand === brand
                    ? "bg-primary text-black font-black"
                    : "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#0d0d0d] border border-gray-900 rounded-xl">
            <p className="text-gray-500 text-sm">No laptops match your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedBrand("All");
              }}
              className="text-xs text-primary font-bold mt-4 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0e0e0e] border border-gray-900 rounded-xl overflow-hidden hover:border-primary/30 group transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="h-48 overflow-hidden bg-black relative">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-black text-[9px] font-black tracking-wider px-2 py-1 uppercase rounded">
                    {prod.brand}
                  </div>
                  {prod.usageCondition && (
                    <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur border border-white/10 text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                      {prod.usageCondition.split(" (")[0]}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-primary transition-colors leading-snug">
                      {prod.title}
                    </h3>
                    
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Specs Preview */}
                    <div className="grid grid-cols-2 gap-3 py-4 my-4 border-y border-gray-900 text-[11px] text-gray-500 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Cpu size={14} className="text-primary" />
                        <span className="truncate">{prod.specifications.processor.split(" (")[0]}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <HardDrive size={14} className="text-primary" />
                        <span className="truncate">{prod.specifications.ram} / {prod.specifications.storage}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-black text-white">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </span>
                    <Link
                      to={`/product/${prod.id}`}
                      className="bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black px-4 py-2 text-xs font-bold tracking-wider rounded-lg transition uppercase"
                    >
                      View Specs
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;