import React, { useState, useEffect } from "react";
import Sidebar from "../navigation/Sidebar";
import { LogOut, UserCircle, Palette, Check, Menu, Lock, Info } from "lucide-react";
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

  // States for the two different drawers
  const [showMyNotes, setShowMyNotes] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Responsive sidebar handling
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

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden relative">
      
      {/* 1. INSTRUCTIONS DRAWER (Left Side) */}
      <GlobalNotesDrawer 
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        side="left"
        themeGradient="linear-gradient(to right, #1e293b, #0f172a)" 
      />

      {/* 2. PERSONAL NOTES DRAWER (Right Side Only) */}
      <GlobalNotesDrawer 
        isOpen={showMyNotes}
        onClose={() => setShowMyNotes(false)}
        side="right"
        themeGradient="linear-gradient(to right, #10b981, #059669)" 
      />

      {/* 3. SIDEBAR */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          bg-white shadow-[0_0_40px_rgba(0,0,0,0.08)]
          transition-all duration-500 ease-in-out
          ${isSidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-0 lg:translate-x-0"}
        `}
      >
        <div className="h-full overflow-hidden">
          <Sidebar
            activeColor={themeColor}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </aside>

      {/* 4. MOBILE OVERLAY */}
      <div
        onClick={toggleSidebar}
        className={`
          fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40
          transition-opacity duration-500
          ${isSidebarOpen ? "opacity-100 visible lg:hidden" : "opacity-0 invisible"}
        `}
      />

      {/* 5. MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* NAVBAR */}
        <header
          className={`h-16 ${themeColor} flex items-center justify-between px-4 lg:px-8 text-white shadow-lg z-30 transition-all duration-300`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90"
            >
              <Menu size={22} />
            </button>

            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tighter uppercase italic leading-none">
                SAASC<span className="text-white/60 font-light text-sm ml-1">ERP</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            
            {/* --- INSTRUCTIONS BUTTON --- */}
            <button 
              onClick={() => setShowInstructions(true)}
              className="relative flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/40 border border-blue-200/30 backdrop-blur-md text-white rounded-xl shadow-sm transition-all active:scale-95 group"
            >
              <Info size={16} className="text-blue-100 group-hover:rotate-12 transition-transform" />
              <span className="text-[12px] font-bold tracking-wide hidden lg:block">Instructions</span>
            </button>

            {/* --- MY NOTES BUTTON --- */}
            <button 
              onClick={() => setShowMyNotes(true)}
              className="relative flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-200/30 backdrop-blur-md text-white rounded-xl shadow-sm transition-all active:scale-95 group"
            >
              <Lock size={16} className="text-emerald-100 group-hover:-rotate-12 transition-transform" />
              <span className="text-[12px] font-bold tracking-wide hidden lg:block">My Notes</span>
            </button>

            <div className="h-6 w-[1px] bg-white/20 mx-2" />

            {/* THEME SELECTOR */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-colors"
              >
                <Palette size={20} />
              </button>

              {showThemeMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50">
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
                        <div className={`w-6 h-6 rounded-full ${option.bg} border-2 border-white shadow-sm`}></div>
                        <span className="text-sm font-semibold text-slate-700">{option.name}</span>
                      </div>
                      {themeColor === option.bg && <Check size={16} className={option.text} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* USER PROFILE & LOGOUT */}
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
                <UserCircle size={20} />
              </div>
              <button className="p-2 hover:bg-red-500 rounded-xl transition-all group">
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 min-h-0 overflow-hidden p-6">
          <div className="h-full w-full bg-white/40 rounded-[2rem] border border-white shadow-inner">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;