import React, { useState, useEffect } from 'react';
import { ClipboardList, Users, ListTodo, Syringe, Calendar, Search, Activity } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

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
    // RESPONSIVE SCROLL FIX: 
    // Changed 'min-h-screen' to 'h-screen overflow-y-auto pb-10 custom-scrollbar'. 
    // This forces a scrollbar to appear ONLY when the screen is too short vertically.
    <div className="px-4 sm:px-6 lg:px-8 py-3 lg:py-4 bg-[#F8FAFC] h-screen overflow-y-auto pb-12 custom-scrollbar font-sans antialiased overflow-x-hidden flex flex-col">
      
      {/* --- Top Header Section --- */}
      <div className={`flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3 mb-3 transition-all duration-1000 transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} shrink-0`}>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 tracking-tight leading-none">
            <div className="bg-blue-100 p-1.5 rounded-xl text-blue-700 shrink-0">
              <Syringe className="w-5 h-5" strokeWidth={2.5} />
            </div>
            Injection Module
          </h1>
          <p className="text-slate-500 mt-1.5 text-xs font-medium flex items-center gap-2">
             <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
             </span>
             System online • Welcome back, Admin.
          </p>
        </div>

        <div className="relative group w-full md:w-auto shrink-0">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={14} />
           <input 
             type="text" 
             placeholder="Search patient or code..." 
             className="pl-8 pr-3 py-1.5 w-full md:w-64 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-xs font-medium text-slate-700 placeholder:text-slate-400" 
           />
        </div>
      </div>

      {/* --- Modern Medical Gradient Banner --- */}
      <div className={`relative w-full bg-gradient-to-r from-[#1565C0] via-[#1E88E5] to-[#00ACC1] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 shadow-[0_8px_30px_rgba(30,136,229,0.2)] overflow-hidden transition-all duration-1000 delay-100 transform ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'} shrink-0`}>
        
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute left-1/3 top-0 w-24 h-24 bg-[#00E676]/20 rounded-full blur-2xl mix-blend-overlay"></div>
        
        <div className="z-10 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shrink-0 shadow-inner flex items-center justify-center">
           <Syringe className="w-6 h-6 text-white drop-shadow-md" strokeWidth={1.5} />
        </div>
        
        <div className="z-10 w-full">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-bold mb-1.5 tracking-wide uppercase shadow-sm">
             <Activity size={10} className="text-cyan-200" /> Real-time Clinic Data
          </div>
          
          <h2 className="text-white text-lg sm:text-xl font-extrabold leading-tight tracking-wide drop-shadow-sm min-h-[20px] mb-0.5">
            {isMounted && <Typewriter text="Allergy & Immunotherapy Dashboard" delay={500} speed={35} hideCursorOnComplete={true} />}
          </h2>
          
          <p className="text-blue-50 text-xs font-medium max-w-2xl opacity-90 leading-snug min-h-[16px]">
            {isMounted && <Typewriter text="Comprehensive overview of patient treatments, biological inventories, and clinical schedules." delay={1750} speed={20} hideCursorOnComplete={true} />}
          </p>
        </div>
      </div>

      {/* --- Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 shrink-0">
        {cardsData.map((card, index) => (
          <div 
            key={index}
            className={`transition-all duration-700 ease-out transform ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
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

      {/* Custom Styles for a beautiful, subtle scrollbar instead of the ugly Windows default */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
      
    </div>
  );
};

export default Dashboard;