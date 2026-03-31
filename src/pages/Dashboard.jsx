import React, { useState, useEffect } from 'react';
import { ClipboardList, Users, ListTodo, Syringe, Calendar, Search, Activity } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

// --- UPGRADED TYPEWRITER COMPONENT ---
const Typewriter = ({ text, speed = 40, delay = 0, hideCursorOnComplete = false }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        setCompleted(true);
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, started]);

  return (
    <span>
      {displayedText}
      {!(completed && hideCursorOnComplete) && (
        <span className="animate-pulse ml-0.5 font-light text-white/80">|</span>
      )}
    </span>
  );
};

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const cardsData = [
    { icon: ClipboardList, title: "Active Treatment", value: "3,239", gradient: "bg-gradient-to-br from-blue-500 to-cyan-500" },
    { icon: Users, title: "Total Patient", value: "9,396", gradient: "bg-gradient-to-br from-indigo-500 to-purple-500" },
    { icon: ListTodo, title: "Pending Injection", value: "1,240", gradient: "bg-gradient-to-br from-pink-500 to-rose-500" },
    { icon: ClipboardList, title: "Completed Skin Test", value: "2,150", gradient: "bg-gradient-to-br from-amber-500 to-orange-500" },
    { icon: ClipboardList, title: "Biologicals in Stock", value: "854", gradient: "bg-gradient-to-br from-emerald-500 to-teal-500" },
    { icon: Calendar, title: "Appointments", value: "128", gradient: "bg-gradient-to-br from-violet-600 to-purple-600" }
  ];

  return (
    // FIX: Removed 'justify-center' from here so it aligns properly to the top!
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-[#F8FAFC] min-h-screen font-sans antialiased overflow-x-hidden flex flex-col">
      
      {/* --- Top Header Section --- */}
      <div className={`flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3 sm:gap-4 mb-4 sm:mb-5 transition-all duration-1000 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-[28px] font-black text-slate-900 flex items-center gap-2 sm:gap-3 tracking-tight leading-none">
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-xl text-blue-700">
              <Syringe className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
            </div>
            Injection Module
          </h1>
          <p className="text-slate-500 mt-1.5 text-xs sm:text-sm font-medium flex items-center gap-2">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             System online • Welcome back, Admin.
          </p>
        </div>

        <div className="relative group w-full md:w-auto">
           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={16} />
           <input 
             type="text" 
             placeholder="Search patient, vial, or code..." 
             className="pl-10 pr-4 py-2 w-full md:w-72 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-xs sm:text-sm font-medium text-slate-700 placeholder:text-slate-400" 
           />
           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="hidden sm:inline-block border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-50">⌘K</kbd>
           </div>
        </div>
      </div>

      {/* --- Modern Medical Gradient Banner --- */}
      <div className={`relative w-full bg-gradient-to-r from-[#1565C0] via-[#1E88E5] to-[#00ACC1] p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-5 sm:mb-6 shadow-[0_8px_30px_rgba(30,136,229,0.2)] overflow-hidden transition-all duration-1000 delay-100 transform ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
        
        <div className="absolute right-0 top-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full -mr-10 -mt-10 sm:-mr-20 sm:-mt-20 blur-2xl sm:blur-3xl"></div>
        <div className="absolute left-1/3 top-0 w-32 h-32 bg-[#00E676]/20 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="z-10 bg-white/10 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20 shrink-0 shadow-inner flex items-center justify-center">
           <Syringe className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md" strokeWidth={1.5} />
        </div>
        
        <div className="z-10 w-full">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] sm:text-[10px] font-bold mb-2 tracking-wide uppercase shadow-sm">
             <Activity size={10} className="text-cyan-200" /> Real-time Clinic Data
          </div>
          
          <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-extrabold leading-tight tracking-wide drop-shadow-sm min-h-[24px] sm:min-h-[28px] mb-1">
            {isMounted && (
              <Typewriter 
                text="Allergy & Immunotherapy Dashboard" 
                delay={500} 
                speed={35} 
                hideCursorOnComplete={true} 
              />
            )}
          </h2>
          
          <p className="text-blue-50 text-xs sm:text-sm font-medium max-w-3xl opacity-90 leading-relaxed min-h-[36px] sm:min-h-[20px]">
            {isMounted && (
              <Typewriter 
                text="Comprehensive overview of patient treatments, biological inventories, and clinical schedules." 
                delay={1750} 
                speed={20}   
                hideCursorOnComplete={true} 
              />
            )}
          </p>
        </div>
      </div>

      {/* --- Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
        {cardsData.map((card, index) => (
          <div 
            key={index}
            className={`transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            style={{ transitionDelay: `${800 + (index * 150)}ms` }}
          >
            <StatCard 
              icon={card.icon} 
              title={card.title} 
              value={card.value} 
              gradient={card.gradient} 
            />
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Dashboard;