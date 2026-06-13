import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { LayoutDashboard, Store, LogOut, Lock } from "lucide-react";

function DashboardLayout() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  // Route protection
  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="bg-[#050505] text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-[#0c0c0c] border border-gray-900 p-8 rounded-2xl max-w-sm space-y-4">
          <Lock size={48} className="text-red-500 mx-auto" />
          <h1 className="text-lg font-black uppercase tracking-wider">Access Denied</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            You must be logged in as an administrator to view the dashboard panel. Redirecting to login page shortly...
          </p>
          <Link
            to="/login"
            className="inline-block text-xs font-bold text-primary hover:underline uppercase"
          >
            Go to Login Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen flex flex-col md:flex-row">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-gray-900 flex flex-col justify-between shrink-0">
        <div>
          {/* Header title */}
          <div className="p-6 border-b border-gray-900 flex items-center justify-between">
            <Link to="/" className="text-lg font-black tracking-wider text-white">
              <span>FIXMY</span>
              <span className="text-primary">LAP</span>
            </Link>
            <span className="text-[8px] bg-primary/20 text-primary border border-primary/20 font-black px-1.5 py-0.5 uppercase tracking-wider rounded">
              ADMIN
            </span>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-xs font-bold tracking-wider text-white bg-white/5 border border-white/10 rounded-lg uppercase transition-all"
            >
              <LayoutDashboard size={16} className="text-primary" />
              <span>Control Panel</span>
            </Link>

            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-xs font-bold tracking-wider text-gray-400 hover:text-white hover:bg-white/5 rounded-lg uppercase transition-all"
            >
              <Store size={16} className="text-primary" />
              <span>Visit Shop</span>
            </Link>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-gray-900 space-y-4">
          <div className="px-4">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Logged in as:</p>
            <p className="text-xs text-gray-300 font-semibold truncate mt-0.5">{currentUser.name}</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wider text-[#ff4d4d] hover:bg-[#ff4d4d]/5 border border-[#ff4d4d]/10 hover:border-[#ff4d4d]/20 rounded-lg uppercase transition-all"
          >
            <LogOut size={16} />
            <span>Logout Panel</span>
          </button>
        </div>

      </aside>

      {/* Main workspace */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;