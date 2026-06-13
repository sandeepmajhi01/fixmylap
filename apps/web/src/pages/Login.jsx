import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { loginUser, resetPassword } from "../utils/db";
import { KeyRound, Mail, AlertTriangle, CheckCircle } from "lucide-react";

function Login() {
  const { setCurrentUser } = useApp();
  const navigate = useNavigate();

  // Mode: "login" or "forgot"
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await loginUser(formData.email, formData.password);
      setCurrentUser(user);
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword(formData.email, formData.password);
      setSuccessMsg("Password reset successfully. You can now log in.");
      setFormData({ email: "", password: "", confirmPassword: "" });
      setMode("login");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="bg-[#050505] text-white min-h-[80vh] flex items-center justify-center py-12 px-6">
      <div className="bg-[#0c0c0c] border border-gray-900 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">
        
        {/* Brand header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-wider">
            FIXMY<span className="text-primary">LAP</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
            {mode === "login" ? "Customer & Admin Portal" : "Reset Password"}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="bg-[#241515] border border-red-500/20 p-3 rounded-lg flex items-center gap-2 text-xs text-red-400 mb-6">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="bg-[#152415] border border-primary/20 p-3 rounded-lg flex items-center gap-2 text-xs text-primary mb-6">
            <CheckCircle size={16} className="shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form rendering */}
        {mode === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
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

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMsg("");
                    setMode("forgot");
                  }}
                  className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider"
                >
                  Forgot Password?
                </button>
              </div>
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
              Sign In
            </button>
            
            <p className="text-center text-xs text-gray-500 pt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-bold">
                Register Here
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Registered Email Address
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

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                New Password
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
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <KeyRound size={14} />
                </span>
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-[#050505] border border-gray-800 text-white pl-10 pr-4 py-3 text-xs font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none rounded-lg"
                  placeholder="Re-enter new password"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMsg("");
                  setMode("login");
                }}
                className="flex-1 bg-[#181818] border border-gray-800 text-gray-300 py-3.5 text-xs font-black tracking-wider rounded-xl uppercase transition hover:bg-gray-800"
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="flex-1 bg-primary text-black py-3.5 text-xs font-black tracking-wider rounded-xl uppercase transition hover:brightness-110"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}

        {/* Back helper info */}
        <div className="mt-8 pt-4 border-t border-gray-900 text-[10px] text-gray-500 leading-relaxed text-center">
          For admin access use: <span className="text-gray-400 font-bold">fixmylapquick@gmail.com</span> / <span className="text-gray-400 font-bold">admin</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
