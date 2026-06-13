

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (anchorId) => {
    setIsOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${anchorId}`);
    }
  };

  const navLinks = [
    { name: "Home", type: "route", path: "/" },
    { name: "Services", type: "anchor", anchor: "services" },
    { name: "Laptops Catalog", type: "route", path: "/products" },
    { name: "Testimonials", type: "anchor", anchor: "testimonials" },
    { name: "Blog", type: "anchor", anchor: "blog" },
    { name: "Contact Us", type: "anchor", anchor: "contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#050505]/90 backdrop-blur-md text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-black tracking-wider">
          <span className="text-white">FIXMY</span>
          <span className="text-primary">LAP</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 text-sm font-semibold md:flex">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              {link.type === "route" ? (
                <Link
                  to={link.path}
                  className="transition hover:text-primary"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  onClick={() => handleNavClick(link.anchor)}
                  className="cursor-pointer transition hover:text-primary bg-transparent border-none p-0 font-semibold"
                >
                  {link.name}
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA / Auth actions */}
        <div className="hidden items-center gap-4 md:flex">
          {currentUser ? (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gray-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                <User size={14} className="text-primary" />
                <span>{currentUser.name}</span>
              </span>
              {currentUser.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1 bg-white/10 border border-white/20 text-white px-4 py-2 text-xs font-bold tracking-wider hover:bg-white/20 transition-all rounded-lg uppercase"
                >
                  <LayoutDashboard size={14} />
                  <span>Admin Panel</span>
                </Link>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-1.5 text-[#ff4d4d] border border-[#ff4d4d]/20 bg-[#ff4d4d]/5 hover:bg-[#ff4d4d]/10 px-3 py-2 text-xs font-bold tracking-wider transition-all rounded-lg uppercase"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-black px-5 py-2.5 text-xs font-black tracking-wider transition hover:brightness-110 active:scale-95 rounded-lg uppercase"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-primary md:hidden"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-800 bg-[#050505] md:hidden animate-fade-in">
          <ul className="flex flex-col px-6 py-4 text-sm font-semibold divide-y divide-gray-900">
            {navLinks.map((link, idx) => (
              <li key={idx} className="py-2.5">
                {link.type === "route" ? (
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block transition hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNavClick(link.anchor)}
                    className="block w-full text-left cursor-pointer transition hover:text-primary bg-transparent border-none p-0 font-semibold"
                  >
                    {link.name}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="px-6 pb-5 pt-2 border-t border-gray-900">
            {currentUser ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 py-1.5">
                  <User size={14} className="text-primary" />
                  <span>Logged in as: {currentUser.name}</span>
                </div>
                {currentUser.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 bg-white/10 border border-white/20 text-white py-3 text-xs font-bold tracking-wider rounded-lg uppercase"
                  >
                    <LayoutDashboard size={14} />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                    navigate("/");
                  }}
                  className="flex items-center justify-center gap-1.5 text-[#ff4d4d] border border-[#ff4d4d]/20 bg-[#ff4d4d]/5 py-3 text-xs font-bold tracking-wider rounded-lg uppercase"
                >
                  <LogOut size={13} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-primary py-3.5 text-center text-black font-black text-xs tracking-wider rounded-lg uppercase"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}