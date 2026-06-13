import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { ArrowRight, Cpu, HardDrive } from "lucide-react";

export default function FeaturedProducts() {
  const { products } = useApp();

  // Show first 3 products as featured
  const featured = products.slice(0, 3);

  return (
    <section className="py-20 bg-[#050505] border-t border-gray-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="text-center md:text-left">
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Store Inventory Preview</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-1.5 uppercase">
              Featured Laptops for Sale
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-xl">
              Certified refurbished hardware, rigorously stress-tested with full specifications and warranty documentation.
            </p>
          </div>
          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 mt-6 md:mt-0 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-3 text-xs font-black tracking-wider rounded-xl transition uppercase"
          >
            <span>View More Products</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Laptop Grid */}
        {featured.length === 0 ? (
          <div className="text-center py-12 bg-[#0c0c0c] border border-gray-950 rounded-2xl">
            <p className="text-gray-500 text-sm">No products in catalog yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((prod) => (
              <div
                key={prod.id}
                className="bg-[#0e0e0e] border border-gray-900 rounded-xl overflow-hidden hover:border-primary/30 group transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image */}
                <div className="h-56 overflow-hidden bg-black relative">
                  <img
                    src={prod.imageUrl}
                    alt={prod.title}
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-black text-[9px] font-black tracking-wider px-2 py-1 uppercase rounded">
                    {prod.brand}
                  </div>
                  {prod.usageCondition && (
                    <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur border border-white/10 text-white text-[10px] font-semibold px-2.5 py-1 rounded">
                      {prod.usageCondition.split(" (")[0]} {/* Show short condition */}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-primary transition-colors leading-snug">
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
    </section>
  );
}
