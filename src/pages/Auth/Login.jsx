import React, { useState } from 'react';
import { Mail, Lock, EyeOff, Eye, ShieldCheck, ArrowRight, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Theme State: defaults to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess(); // Triggers instantly
  };

  return (
    // Outer Background with smooth transition between Dark Slate and Light Gray
    <div className={`relative flex min-h-screen w-full items-center justify-center p-4 font-sans overflow-hidden transition-colors duration-700 ${
      isDarkMode 
        ? "bg-[#1A2936] selection:bg-[#00A3FF]/30 selection:text-white" 
        : "bg-[#F8FAFC] selection:bg-[#00A3FF]/20 selection:text-[#00A3FF]"
    }`}>
      
      {/* ========================================== */}
      {/* ANIMATED AMBIENT BACKGROUND ORBS           */}
      {/* ========================================== */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-[10%] -left-[5%] h-[600px] w-[600px] rounded-full pointer-events-none transition-all duration-700 ${
          isDarkMode ? "bg-[#00A3FF]/20 blur-[130px]" : "bg-[#00A3FF]/15 blur-[120px]"
        }`}
      />
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute -bottom-[10%] -right-[5%] h-[500px] w-[500px] rounded-full pointer-events-none transition-all duration-700 ${
          isDarkMode ? "bg-[#01CBFF]/15 blur-[120px]" : "bg-blue-300/15 blur-[100px]"
        }`}
      />

      {/* ========================================== */}
      {/* MAIN CONTAINER                             */}
      {/* ========================================== */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 flex w-full max-w-[900px] min-h-[520px] flex-col md:flex-row overflow-hidden rounded-3xl bg-white transition-all duration-700 ${
          isDarkMode 
            ? "shadow-[0_25px_70px_rgba(0,0,0,0.4)] ring-1 ring-white/10" 
            : "shadow-[0_20px_60px_-15px_rgba(0,163,255,0.2)] ring-1 ring-slate-100"
        }`}
      >
        
        {/* ========================================== */}
        {/* LEFT SIDE: Brand Panel (Dynamic)           */}
        {/* ========================================== */}
        <div className={`relative flex w-full md:w-[45%] flex-col justify-between p-12 overflow-hidden transition-colors duration-700 ${
          isDarkMode ? "bg-[#00A3FF]" : "bg-[#E6F4FF]"
        }`}>
          
          <div className={`absolute -top-24 -left-24 rotate-12 pointer-events-none transition-colors duration-700 ${
            isDarkMode ? "text-white/10" : "text-[#00A3FF]/5"
          }`}>
            <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z" />
            </svg>
          </div>

          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition-colors duration-700 ${
                isDarkMode ? "bg-white text-[#00A3FF]" : "bg-[#00A3FF] text-white"
              }`}>
                <ShieldCheck size={22} strokeWidth={2} />
              </div>
              <h1 className={`text-xl font-black tracking-tight transition-colors duration-700 ${
                isDarkMode ? "text-white" : "text-[#0B1B3D]"
              }`}>
                Sierra Allergy
              </h1>
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <h2 className={`text-2xl font-semibold leading-tight mb-4 transition-colors duration-700 ${
                isDarkMode ? "text-white" : "text-[#0B1B3D]"
              }`}>
                Asthma & Sinus Center <br/>
                <span className={isDarkMode ? "text-white/80" : "text-[#00A3FF]"}>Portal</span>
              </h2>
              <p className={`text-sm font-medium leading-relaxed transition-colors duration-700 ${
                isDarkMode ? "text-blue-100" : "text-slate-500"
              }`}>
                HIPAA-compliant secure access for authorized medical personnel and staff.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 mt-12">
             <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 border backdrop-blur-sm transition-colors duration-700 ${
               isDarkMode ? "bg-black/10 border-white/20" : "bg-[#00A3FF]/10 border-[#00A3FF]/20"
             }`}>
                <div className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-pulse" />
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-700 ${
                  isDarkMode ? "text-white" : "text-[#00A3FF]"
                }`}>System Active</span>
             </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* RIGHT SIDE: Login Form (Stays White)       */}
        {/* ========================================== */}
        <div className="relative flex w-full md:w-[55%] flex-col justify-center p-10 lg:p-14 bg-white">
          
          {/* ========================================== */}
          {/* THEME TOGGLE BUTTON (Moved Inside & Faded) */}
          {/* ========================================== */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="absolute top-6 right-6 p-2.5 rounded-full text-slate-600 bg-transparent opacity-200 hover:opacity-200 hover:text-[#00A3FF] hover:bg-slate-200 transition-all duration-300 active:scale-95 z-50"
            aria-label="Toggle Theme"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="mb-8 mt-2">
            <h2 className="text-2xl font-bold text-[#0B1B3D]">Sign In</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Please enter your credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500 ml-1">Email Address</label>
              <div className="relative flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-[#00A3FF] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#00A3FF]/15">
                <Mail size={18} className="absolute left-4 text-slate-400" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@sierraallergy.com"
                  className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wide text-slate-500 ml-1">Password</label>
              <div className="relative flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-[#00A3FF] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#00A3FF]/15">
                <Lock size={18} className="absolute left-4 text-slate-400" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent py-3.5 pl-11 pr-12 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 transition-colors hover:text-[#00A3FF]"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="flex w-full justify-end">
              <button type="button" className="text-xs font-semibold text-[#00A3FF] hover:underline underline-offset-2">
                Forgot Password?
              </button>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A3FF] py-3.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(0,163,255,0.25)] transition-all hover:bg-[#008DE6]"
            >
              <span className="flex items-center gap-2">
                Access Portal
                <ArrowRight size={16} />
              </span>
            </motion.button>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default Login;