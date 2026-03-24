import React, { useState } from 'react';
import { 
  Settings, 
  Calendar, 
  Clock, 
  History, 
  Save, 
  CheckCircle2,
  Info,
  ShieldCheck,
  Zap
} from 'lucide-react';

const AppointmentRules = () => {
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [dayBased, setDayBased] = useState(true);
  const [frequencyBased, setFrequencyBased] = useState(false);
  const [runTime, setRunTime] = useState("02:00 PM");
  const [notes, setNotes] = useState("Standard system automation for clinic hours.");

  return (
    <div className="w-full min-h-screen bg-[#F4F7FA] p-4 md:p-8 font-sans overflow-y-auto animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden transform transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        
        {/* MEDICAL HEADER - Animated Gradient */}
        <div className="bg-gradient-to-r from-[#1D68F1] via-[#3A7FFF] to-[#1D68F1] bg-[length:200%_auto] animate-[gradient_8s_ease_infinite] px-6 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-4 transition-transform duration-300 hover:scale-105">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md animate-pulse">
              <Settings size={24} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight">Appointment Generation Rules</h1>
              <p className="text-[11px] text-blue-100/80 font-medium tracking-wide">Automated Clinical Scheduling Engine</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 shadow-lg border ${
            autoSchedule 
              ? 'bg-[#2B9E64] border-emerald-400 text-white scale-110' 
              : 'bg-slate-200 border-slate-300 text-slate-500 opacity-80'
          }`}>
            <ShieldCheck size={12} className={autoSchedule ? "animate-bounce" : ""} />
            {autoSchedule ? 'SYSTEM ACTIVE' : 'SYSTEM PAUSED'}
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-10 md:space-y-12">
          
          {/* SECTION: SYSTEM STATUS - Interactive Hover Effect */}
          <section className="relative group overflow-hidden rounded-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-blue-50/30 border border-blue-100/50 transition-all duration-300 group-hover:bg-blue-50/60">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className={`p-3 rounded-full transition-all duration-500 ${autoSchedule ? 'bg-blue-100 text-blue-600 rotate-[360deg]' : 'bg-slate-100 text-slate-400'}`}>
                   <Zap size={20} className={autoSchedule ? "animate-pulse" : ""} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">System Status</h3>
                  <p className="text-xs text-slate-500">Enable or disable all automated scheduling logic.</p>
                </div>
              </div>
              <div 
                className="group flex items-center gap-3 cursor-pointer select-none active:scale-90 transition-transform" 
                onClick={() => setAutoSchedule(!autoSchedule)}
              >
                <div className={`w-14 h-7 flex items-center rounded-full px-1 transition-all duration-500 ease-in-out ${autoSchedule ? 'bg-[#1D68F1] shadow-[0_0_15px_rgba(29,104,241,0.4)]' : 'bg-slate-300'}`}>
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${autoSchedule ? 'translate-x-7' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: SCHEDULING STRATEGY */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Scheduling Rules</h2>
              <div className="h-[1px] flex-1 bg-slate-100 animate-[width_1.5s_ease-in-out]"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Day-Based Card */}
              <div 
                onClick={() => setDayBased(!dayBased)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  dayBased 
                  ? 'border-blue-500 bg-blue-50/20 shadow-xl scale-[1.02] z-10' 
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl transition-all duration-500 ${dayBased ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>
                    <Calendar size={20} />
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${dayBased ? 'bg-blue-500 border-blue-500 rotate-0' : 'border-slate-200 rotate-90 opacity-0'}`}>
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Day-Based Scheduling</h4>
                <p className="text-[11px] leading-relaxed text-slate-500">Generate slots based on fixed weekday availability (e.g. Every Monday).</p>
              </div>

              {/* Frequency-Based Card */}
              <div 
                onClick={() => setFrequencyBased(!frequencyBased)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                  frequencyBased 
                  ? 'border-emerald-500 bg-emerald-50/20 shadow-xl scale-[1.02] z-10' 
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:scale-[1.01]'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl transition-all duration-500 ${frequencyBased ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-slate-100 text-slate-400'}`}>
                    <History size={20} />
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${frequencyBased ? 'bg-emerald-500 border-emerald-500 rotate-0' : 'border-slate-200 rotate-90 opacity-0'}`}>
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Frequency-Based Scheduling</h4>
                <p className="text-[11px] leading-relaxed text-slate-500">Create Appointments using intervals frequency (e.g. Every 15 minutes).</p>
              </div>
            </div>
          </section>

          {/* TWO COLUMN BOTTOM SECTION - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {/* SCHEDULER TIME */}
            <section className="bg-slate-50/80 p-6 rounded-2xl border border-slate-100 space-y-4 transition-all duration-300 hover:bg-white hover:shadow-md">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider">
                <Clock size={16} className="animate-spin-slow" />
                Scheduler Running Time
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  value={runTime}
                  onChange={(e) => setRunTime(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-500 transition-colors" size={16} />
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                * System triggers auto-generation engine daily at this timestamp.
              </p>
            </section>

            {/* ADMIN NOTES */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                <Info size={16} />
                Admin Notes
              </div>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-[120px] bg-white border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none shadow-sm hover:shadow-md"
                placeholder="Log internal updates here..."
              />
            </section>
          </div>

          {/* FOOTER ACTION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2">
               <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <p className="text-[11px] text-slate-400 font-medium italic text-center sm:text-left">
                 Last successful sync: Today at 02:00 PM
               </p>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#1D68F1] hover:bg-[#1656cc] text-white px-10 py-3 rounded-xl font-bold text-sm transition-all shadow-[0_10px_25px_-5px_rgba(29,104,241,0.4)] hover:shadow-blue-600/40 active:scale-95 group">
              <Save size={18} className="transition-transform group-hover:rotate-12" />
              Save Configuration
            </button>
          </div>

        </div>
      </div>

      {/* Tailwind CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AppointmentRules;