import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  Calendar, 
  LogOut, 
  ShieldCheck, 
  LayoutDashboard,
  Menu,
  X,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth, logout } from "../firebase";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Recruiting", path: "/recruiting", icon: UserPlus },
    { name: "Onboarding", path: "/onboarding", icon: ClipboardCheck },
    { name: "Employees", path: "/employees", icon: Users },
    { name: "Patients", path: "/patients", icon: Heart },
    { name: "Compliance", path: "/compliance", icon: ShieldCheck },
    { name: "Offboarding", path: "/offboarding", icon: LogOut },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:w-20"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-100">
            <div className={cn("flex items-center space-x-2 transition-opacity", !isSidebarOpen && "lg:opacity-0")}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                <img 
                  src="/nursingcarelogo.png" 
                  alt="NursingCare.pk Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-xl tracking-tight text-neutral-900">
                NursingCare.pk
              </span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-md hover:bg-neutral-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg transition-colors group",
                    isActive 
                      ? "bg-indigo-50 text-indigo-700" 
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  )}
                >
                  <item.icon size={20} className={cn("min-w-[20px]", isActive ? "text-indigo-600" : "text-neutral-400 group-hover:text-neutral-600")} />
                  <span className={cn("ml-3 font-medium transition-opacity duration-300", !isSidebarOpen && "lg:hidden")}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-neutral-100">
            <div className="flex items-center justify-between group">
              <div className="flex items-center p-2 rounded-lg hover:bg-neutral-100 cursor-pointer flex-1 min-w-0">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-neutral-200" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
                    {user?.displayName?.split(" ").map(n => n[0]).join("") || "U"}
                  </div>
                )}
                <div className={cn("ml-3 transition-opacity duration-300 truncate", !isSidebarOpen && "lg:hidden")}>
                  <p className="text-sm font-semibold truncate">{user?.displayName || "User"}</p>
                  <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className={cn("p-2 text-neutral-400 hover:text-rose-600 transition-colors", !isSidebarOpen && "lg:hidden")}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-md hover:bg-neutral-100"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
              <span>Status:</span>
              <span className="text-emerald-500 flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live</span>
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
