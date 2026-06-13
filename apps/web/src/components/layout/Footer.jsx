import { Link } from "react-router-dom";
import { ShieldCheck, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0c0c0c] border-t border-gray-900 text-gray-400 text-sm">
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand & Desc */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center text-xl font-black tracking-wider text-white">
            <span>FIXMY</span>
            <span className="text-primary">LAP</span>
          </Link>
          <p className="text-xs leading-relaxed text-gray-500 max-w-xs">
            India's trusted refurbished laptop store and certified hardware repair center. Quality checked, expert technicians, and 90-day warranty.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold">
            <ShieldCheck size={16} className="text-primary" />
            <span>100% Genuine Components Guarantee</span>
          </div>
        </div>

        {/* Col 2: Services Quick Links */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Our Services</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="hover:text-primary transition-colors cursor-pointer">MacBook & PC Logic Board Repair</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Laptop Screen Replacement</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Battery & Charging Port Service</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Data Backup & Recovery</span></li>
            <li><span className="hover:text-primary transition-colors cursor-pointer">Virus & Malware Remediation</span></li>
          </ul>
        </div>

        {/* Col 3: Quick Navigation */}
        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/products" className="hover:text-primary transition-colors">Refurbished Laptop Catalog</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Customer Portal / Admin</Link></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Diagnostic Services</a></li>
            <li><a href="#testimonials" className="hover:text-primary transition-colors">Client Testimonials</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Get a Free Estimate</a></li>
          </ul>
        </div>

        {/* Col 4: Contact Details */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Local Shop Contact</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span>
                Shop No 2 No 262, Mauli Krupa Building, Near Laxmi Chowk <br />
                Hinjewadi, Pune-411057, Maharashtra
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-primary shrink-0" />
              <span>9822186822 / 9822736390</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-primary shrink-0" />
              <span>fixmylapquick@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-[#050505] py-6 border-t border-gray-900/60">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FixMyLap Store. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-white transition-colors cursor-pointer">Warranty Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}