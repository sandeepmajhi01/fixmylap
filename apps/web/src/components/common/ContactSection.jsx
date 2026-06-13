import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { submitContactMessage } from "../../utils/db";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    try {
      // 1. Submit to local API database
      await submitContactMessage(formData);

      // 2. Submit to Web3Forms if access key is configured
      const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (web3Key) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `New FixMyLap Contact Form Submission from ${formData.name}`,
          }),
        });
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      alert("Failed to submit message: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#0a0a0a] border-t border-gray-900">
      
      {/* 3 Contact Cards */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex items-center gap-4 bg-[#0e0e0e] border border-gray-900 p-6 rounded-xl">
          <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20">
            <MapPin size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Shop Location</p>
            <p className="text-sm text-white font-semibold mt-0.5">Shop No 2 No 262, Mauli Krupa Building, Near Laxmi Chowk, Beside Hotel Sahyadri, Hinjewadi, Pune-411057, Maharashtra</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#0e0e0e] border border-gray-900 p-6 rounded-xl">
          <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20">
            <Mail size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Us</p>
            <p className="text-sm text-white font-semibold mt-0.5">fixmylapquick@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#0e0e0e] border border-gray-900 p-6 rounded-xl">
          <div className="bg-primary/10 text-primary p-4 rounded-xl border border-primary/20">
            <Phone size={22} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Support Line</p>
            <p className="text-sm text-white font-semibold mt-0.5">9822186822 / 9822736390</p>
          </div>
        </div>

      </div>

      {/* Contact Form & Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-900">
        
        {/* Form */}
        <div className="bg-[#111] p-12 lg:p-16 border-r border-gray-900/60">
          <span className="text-primary font-bold text-xs uppercase tracking-widest">Send Message</span>
          <h2 className="text-3xl font-black text-white uppercase mt-1 mb-8">
            CONTACT FORM
          </h2>

          {submitted ? (
            <div className="bg-[#152415]/30 border border-[#25B425]/20 p-6 rounded-xl flex items-center gap-3 text-sm text-gray-300">
              <Check size={20} className="text-primary shrink-0" />
              <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0e0e0e] border border-gray-800 text-white p-4 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg transition"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0e0e0e] border border-gray-800 text-white p-4 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg transition"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Message / Comments
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#0e0e0e] border border-gray-800 text-white p-4 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg transition"
                  placeholder="Describe your device problem or inquiry details..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-primary text-black px-8 py-3.5 text-xs font-black tracking-wider rounded-xl transition hover:brightness-110 active:scale-95 uppercase disabled:opacity-50"
              >
                <Send size={14} />
                <span>{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Static Tech Map Container */}
        <div className="h-[400px] md:h-auto min-h-[350px] relative overflow-hidden bg-black flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
            alt="Stylized tech background map placeholder"
            className="w-full h-full object-cover opacity-20 filter contrast-125 grayscale"
          />
          {/* Overlay Map card */}
          <div className="absolute bg-[#111111]/90 backdrop-blur border border-white/10 p-6 rounded-xl max-w-sm mx-4 text-center">
            <MapPin size={32} className="text-primary mx-auto mb-3" />
            <h4 className="text-sm font-black text-white uppercase tracking-wider">FIXMYLAP STORE</h4>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Shop No 2 No 262, Mauli Krupa Building, Near Laxmi Chowk, Beside Hotel Sahyadri, Hinjewadi, Pune-411057, Maharashtra
            </p>
            <div className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
              OPEN: MON-SAT: 9AM - 8PM
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
