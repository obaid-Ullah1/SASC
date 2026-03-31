import React from 'react';

const StatCard = ({ icon: Icon, title, value, gradient }) => {
  return (
    // ULTRA-COMPACT FIX: Reduced py-6 to py-4, reduced px-8 to px-5
    <div className="relative group overflow-hidden bg-white rounded-2xl px-4 sm:px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-700 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 flex flex-col justify-between h-full z-10 hover:z-20 border-b-4 hover:border-b-transparent">
      
      <div className={`absolute -right-10 -top-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-40 group-hover:scale-[2.5] transition-all duration-700 ease-out ${gradient} pointer-events-none`}></div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:translate-x-[200%] transition-transform duration-[1500ms] ease-in-out z-20 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          {/* ULTRA-COMPACT FIX: Reduced icon padding from p-4 to p-2.5 */}
          <div className={`p-2.5 sm:p-3 rounded-xl text-white shadow-md transform transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:rotate-3 ${gradient}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
          </div>
        </div>

        <div className="text-left space-y-0.5">
          <h3 className="text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.15em] transition-colors duration-500 group-hover:text-slate-500">
            {title}
          </h3>
          {/* ULTRA-COMPACT FIX: Reduced font size from 4xl to 2xl/3xl */}
          <p className="text-slate-900 text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-500 group-hover:text-blue-700 leading-none">
            {value}
          </p>
        </div>
      </div>

      {/* ULTRA-COMPACT FIX: Reduced top margin from mt-6 to mt-3 */}
      <div className="mt-3 relative z-10">
        <div className="flex justify-between items-end mb-1 sm:mb-1.5 transition-transform duration-500 group-hover:-translate-y-0.5">
          <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase">Current Capacity</span>
          <span className="text-[10px] sm:text-[11px] font-black text-slate-700">74%</span>
        </div>
        
        <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full overflow-hidden shadow-inner">
          <div className={`h-full rounded-full transition-all duration-1000 ease-out w-0 group-hover:w-[74%] ${gradient}`}></div>
        </div>
        
        <p className="text-[8px] sm:text-[9px] text-slate-400 mt-1 sm:mt-1.5 italic font-medium transition-opacity duration-500 opacity-70 group-hover:opacity-100 leading-none">
          * Updated 5 mins ago
        </p>
      </div>
      
    </div>
  );
};

export default StatCard;