import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTED useNavigate
import Sidebar from "../navigation/Sidebar";
import { LogOut, UserCircle, Palette, Check, Menu, Lock, Info, X } from "lucide-react";
import GlobalNotesDrawer from "../global/GlobalNotesDrawer";

const MainLayout = ({
  children,
  activeTab,
  setActiveTab,
  themeColor,
  setThemeColor,
  themeOptions,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const [showMyNotes, setShowMyNotes] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const navigate = useNavigate(); // ✅ INITIALIZED navigate

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // ✅ ADDED LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the auth token
    navigate("/login"); // Navigate to login page
    window.location.reload(); // Force reload to ensure App.jsx state resets completely
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
      
      {/* DRAWERS */}
      <GlobalNotesDrawer 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        side="left"
        themeGradient="linear-gradient(to right, #1e293b, #0f172a)" 
      />
      <GlobalNotesDrawer 
        isOpen={showMyNotes}
        onClose={() => setShowMyNotes(false)}
        side="right"
        themeGradient="linear-gradient(to right, #10b981, #059669)" 
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)]
          transition-all duration-500 ease-in-out
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-0 lg:translate-x-0"}
        `}
      >
        <div className="h-full overflow-hidden">
          <Sidebar activeColor={themeColor} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${isSidebarOpen ? "opacity-100 visible lg:hidden" : "opacity-0 invisible"}`}
      />

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* NAVBAR (HEADER) */}
        <header
          className={`h-16 ${themeColor} flex items-center justify-between px-4 lg:px-8 text-white shadow-lg z-30 transition-all duration-300 shrink-0`}
        >
          <div className="flex items-center gap-1 sm:gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90 shrink-0"
            >
              <Menu size={22} />
            </button>

            <div className="flex flex-col select-none">
              <span className="font-black text-sm sm:text-base md:text-lg tracking-tighter uppercase italic leading-none">
                SAASC<span className="text-white/60 font-light text-[10px] sm:text-xs ml-0.5">ERP</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <button 
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 p-2 md:px-3 md:py-1.5 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-200/30 backdrop-blur-md text-white rounded-lg sm:rounded-xl transition-all active:scale-95 group"
            >
              <Info size={18} className="text-blue-100 group-hover:rotate-12 transition-transform" />
              <span className="text-[11px] font-bold tracking-wide hidden lg:block">Instructions</span>
            </button>

            <button 
              onClick={() => setShowMyNotes(true)}
              className="flex items-center gap-2 p-2 md:px-3 md:py-1.5 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-200/30 backdrop-blur-md text-white rounded-lg sm:rounded-xl transition-all active:scale-95 group"
            >
              <Lock size={18} className="text-emerald-100 group-hover:-rotate-12 transition-transform" />
              <span className="text-[11px] font-bold tracking-wide hidden lg:block">My Notes</span>
            </button>

            <div className="h-6 w-[1px] bg-white/20 mx-0.5" />

            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg sm:rounded-xl border border-white/20 transition-colors"
              >
                <Palette size={18} />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-3 w-44 sm:w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
                  {themeOptions.map((option) => (
                    <button
                      key={option.bg}
                      onClick={() => {
                        setThemeColor(option.bg);
                        setShowThemeMenu(false);
                      }}
                      className={`flex items-center justify-between w-full p-2 rounded-xl ${option.hover}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full ${option.bg} border-2 border-white shadow-sm`}></div>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700">{option.name}</span>
                      </div>
                      {themeColor === option.bg && <Check size={14} className={option.text} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1 sm:gap-3 pl-1 sm:pl-4 border-l border-white/20">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40 shrink-0">
                <UserCircle size={20} />
              </div>
              
              {/* ✅ ADDED onClick={handleLogout} HERE */}
              <button onClick={handleLogout} className="p-2 hover:bg-red-500 rounded-lg sm:rounded-xl transition-all group shrink-0">
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* MAIN PAGE AREA */}
        {/* p-3 sm:p-4 md:p-6 creates the gap around the content */}
        <main className="flex-1 min-h-0 overflow-hidden p-3 sm:p-4 md:p-6">
          {/* - Removed rounded-2xl
              - Removed bg-white/40 (changed to solid white or transparent as needed)
              - Removed border border-white
              - Added rounded-none or rounded-md for a professional square look
          */}
          <div className="h-full w-full bg-white shadow-sm overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;