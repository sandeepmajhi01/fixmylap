import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccess() {
  return (
    <div className="bg-[#050505] text-white min-h-[70vh] flex items-center justify-center py-12 px-6">
      <div className="bg-[#0c0c0c] border border-gray-900 p-8 md:p-12 rounded-2xl w-full max-w-md text-center space-y-6">
        <CheckCircle size={64} className="text-primary mx-auto" />
        
        <div>
          <h1 className="text-xl md:text-2xl font-black uppercase tracking-wider text-white">
            Thank You for Your Interest!
          </h1>
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            The shopkeeper will contact you soon on your mobile number or email address to finalize purchase details and delivery.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/products"
            className="inline-block bg-primary text-black px-6 py-3 text-xs font-black tracking-widest uppercase rounded-xl transition hover:brightness-110 active:scale-95"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;