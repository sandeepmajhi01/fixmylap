import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { registerUser } from "../utils/db";
import { User, Mail, Phone, KeyRound, AlertTriangle } from "lucide-react";

function Register() {
  const { setCurrentUser } = useApp();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await registerUser({
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      });
      setCurrentUser(user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="bg-[#050505] text-white min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="bg-[#0c0c0c] border border-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wider">
            CREATE ACCOUNT
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
            FixMyLap Customer Portal
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-[#241515] border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-xs text-red-400 mb-6">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <User size={14} />
              </span>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#050505] border border-gray-800 text-white pl-10 pr-4 py-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Mail size={14} />
              </span>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#050505] border border-gray-800 text-white pl-10 pr-4 py-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Mobile Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <Phone size={14} />
              </span>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full bg-[#050505] border border-gray-800 text-white pl-10 pr-4 py-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <KeyRound size={14} />
              </span>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#050505] border border-gray-800 text-white pl-10 pr-4 py-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-black py-3.5 font-black text-xs tracking-wider rounded-xl transition hover:brightness-110 active:scale-95 uppercase mt-2"
          >
            Create Account
          </button>
          
          <p className="text-center text-xs text-gray-500 pt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-bold">
              Sign In Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;