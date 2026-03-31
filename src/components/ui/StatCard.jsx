import React from 'react';

const StatCard = ({ icon: Icon, title, value, gradient }) => {
  return (
    // 1. ORGANIC LEVITATION: Slower duration (700ms) with a custom smooth shadow
    <div className="relative group overflow-hidden bg-white rounded-2xl sm:rounded-3xl px-5 sm:px-6 lg:px-8 py-5 sm:py-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-700 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 flex flex-col justify-between h-full z-10 hover:z-20 border-b-4 hover:border-b-transparent">
      
      {/* 2. CINEMATIC LIGHT REVEAL: Orb scales up to 2.5x size and brightens on hover to illuminate the card */}
      <div className={`absolute -right-10 -top-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full opacity-10 blur-2xl sm:blur-3xl group-hover:opacity-40 group-hover:scale-[2.5] transition-all duration-700 ease-out ${gradient} pointer-events-none`}></div>
      
      {/* 3. SHIMMER SWEEP: A glass-like light beam that sweeps across the card on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-[200%] transition-transform duration-[1500ms] ease-in-out z-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          
          {/* ICON ANIMATION: Floats up slightly and tilts while casting a deeper shadow */}
          <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white shadow-md transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:rotate-3 ${gradient}`}>
            <Icon className="w-5 h-5 sm:w-7 sm:h-7" strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-left space-y-1">
          <h3 className="text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-1 transition-colors duration-500 group-hover:text-slate-500">
            {title}
          </h3>
          {/* VALUE ANIMATION: Subtle color shift to match the premium theme */}
          <p className="text-slate-900 text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-500 group-hover:text-blue-700">
            {value}
          </p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 relative z-10">
        <div className="flex justify-between items-end mb-1.5 sm:mb-2 transition-transform duration-500 group-hover:-translate-y-0.5">
          <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase">Current Capacity</span>
          <span className="text-[11px] sm:text-xs font-black text-slate-700">74%</span>
        </div>
        
        {/* PROGRESS BAR ANIMATION: Fills up smoothly when the card is hovered */}
        <div className="w-full bg-slate-100 h-1.5 sm:h-2 rounded-full overflow-hidden shadow-inner">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out w-0 group-hover:w-[74%] ${gradient}`}
          ></div>
        </div>
        
        <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1.5 sm:mt-2 italic font-medium transition-opacity duration-500 opacity-70 group-hover:opacity-100">
          * Updated 5 minutes ago
        </p>
      </div>
      
    </div>
  );
};

export default StatCard;