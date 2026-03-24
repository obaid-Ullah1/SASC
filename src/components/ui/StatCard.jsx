import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, gradient }) => {
  return (
    // REDUCED: py-10 to py-6
    <div className="relative group overflow-hidden bg-white rounded-3xl px-8 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 flex flex-col justify-between h-full">
      
      {/* 1. Large Decorative Background Blur */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-10 blur-3xl group-hover:opacity-45 transition-opacity duration-500 ${gradient}`}></div>
      
      <div className="relative z-10">
        {/* 2. Top Section: Icon & Badge - REDUCED: mb-8 to mb-4 */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-4 rounded-2xl text-white shadow-xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${gradient}`}>
            <Icon size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* 3. Middle Section: Values */}
        <div className="text-left space-y-1">
          <h3 className="text-slate-400 font-bold text-xs uppercase tracking-[0.15em] mb-1">{title}</h3>
          <p className="text-slate-900 text-4xl font-black tracking-tight group-hover:text-blue-600 transition-colors duration-300">
            {value}
          </p>
        </div>
      </div>

      {/* 4. Bottom Section: Visual Detail - REDUCED: mt-10 to mt-6 */}
      <div className="mt-6 relative z-10">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Current Capacity</span>
          <span className="text-xs font-black text-slate-700">74%</span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out group-hover:w-full ${gradient}`}
            style={{ width: '74%' }}
          ></div>
        </div>
        
        {/* REDUCED: mt-4 to mt-2 */}
        <p className="text-[10px] text-slate-400 mt-2 italic font-medium">
          * Updated 5 minutes ago
        </p>
      </div>
    </div>
  );
};

export default StatCard;