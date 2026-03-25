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

// ✅ Added Success Popup Import
import SuccessPopup from '../../components/global/SuccessPopup';

const AppointmentRules = () => {
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [dayBased, setDayBased] = useState(true);
  const [frequencyBased, setFrequencyBased] = useState(false);
  const [runTime, setRunTime] = useState("02:00 PM");
  const [notes, setNotes] = useState("Standard system automation for clinic hours.");

  // ✅ Added Popup State
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Added Save Handler
  const handleSave = () => {
    // Perform your logic here
    setShowSuccess(true);
  };

  // Official Theme Input Classes
  const inputClasses = "w-full bg-white border-2 border-slate-200 rounded-lg text-[13px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 font-medium";

  return (
    <div className="w-full min-h-screen bg-[#F3F4F6] p-4 md:p-8 font-sans overflow-y-auto animate-in fade-in duration-500">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden transform transition-all duration-500">
        
        {/* OFFICIAL HEADER - Custom Gradient & Branding */}
        <div className="bg-gradient-to-r from-[#00A3FF] via-[#008bdb] to-[#00A3FF] bg-[length:200%_auto] animate-[gradient_8s_ease_infinite] px-6 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          <div className="flex items-center gap-4 transition-transform duration-300">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md shadow-inner">
              <Settings size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-[16px] font-black tracking-tight uppercase">Appointment Generation Rules</h1>
              <p className="text-[11px] text-blue-50/90 font-bold tracking-wider">Automated Clinical Scheduling Engine</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all duration-500 shadow-md border-2 ${
            autoSchedule 
              ? 'bg-[#10b981] border-[#10b981] text-white scale-105' 
              : 'bg-slate-100 border-slate-200 text-slate-500'
          }`}>
            <ShieldCheck size={14} className={autoSchedule ? "animate-pulse" : ""} strokeWidth={3} />
            {autoSchedule ? 'SYSTEM ACTIVE' : 'SYSTEM PAUSED'}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8 md:space-y-10">
          
          {/* SECTION: SYSTEM STATUS */}
          <section className="relative group overflow-hidden rounded-2xl">
            <div className={`flex flex-col sm:flex-row items-center justify-between p-6 transition-all duration-300 border-2 rounded-2xl ${
              autoSchedule ? 'bg-[#00A3FF]/5 border-[#00A3FF]/20' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className={`p-3 rounded-xl transition-all duration-500 shadow-sm ${autoSchedule ? 'bg-[#00A3FF] text-white rotate-[360deg]' : 'bg-slate-200 text-slate-400'}`}>
                   <Zap size={20} className={autoSchedule ? "animate-pulse" : ""} />
                </div>
                <div>
                  <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-tight">System Status</h3>
                  <p className="text-[12px] font-medium text-slate-500 mt-0.5">Enable or disable all automated scheduling logic globally.</p>
                </div>
              </div>
              
              {/* Custom Animated Toggle */}
              <div 
                className="group flex items-center gap-3 cursor-pointer select-none active:scale-95 transition-transform" 
                onClick={() => setAutoSchedule(!autoSchedule)}
              >
                <div className={`w-14 h-7 flex items-center rounded-full px-1 transition-all duration-500 ease-in-out border-2 ${
                  autoSchedule ? 'bg-[#00A3FF] border-[#00A3FF] shadow-[0_0_15px_rgba(0,163,255,0.4)]' : 'bg-slate-200 border-slate-300'
                }`}>
                  <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${autoSchedule ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: SCHEDULING STRATEGY */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Scheduling Rules</h2>
              <div className="h-[2px] flex-1 bg-slate-100 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Day-Based Card */}
              <div 
                onClick={() => setDayBased(!dayBased)}
                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  dayBased 
                  ? 'border-[#00A3FF] bg-[#00A3FF]/5 shadow-lg scale-[1.02] z-10' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg transition-all duration-300 ${dayBased ? 'bg-[#00A3FF] text-white shadow-md shadow-[#00A3FF]/30' : 'bg-slate-100 text-slate-400'}`}>
                    <Calendar size={18} strokeWidth={2.5} />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${dayBased ? 'bg-[#00A3FF] border-[#00A3FF]' : 'border-slate-300 opacity-50'}`}>
                    <CheckCircle2 size={12} className="text-white" strokeWidth={4} />
                  </div>
                </div>
                <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight mb-1.5">Day-Based Scheduling</h4>
                <p className="text-[12px] font-medium leading-relaxed text-slate-500">Generate slots based on fixed weekday availability (e.g. Every Monday).</p>
              </div>

              {/* Frequency-Based Card */}
              <div 
                onClick={() => setFrequencyBased(!frequencyBased)}
                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  frequencyBased 
                  ? 'border-[#10b981] bg-[#10b981]/5 shadow-lg scale-[1.02] z-10' 
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2.5 rounded-lg transition-all duration-300 ${frequencyBased ? 'bg-[#10b981] text-white shadow-md shadow-[#10b981]/30' : 'bg-slate-100 text-slate-400'}`}>
                    <History size={18} strokeWidth={2.5} />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${frequencyBased ? 'bg-[#10b981] border-[#10b981]' : 'border-slate-300 opacity-50'}`}>
                    <CheckCircle2 size={12} className="text-white" strokeWidth={4} />
                  </div>
                </div>
                <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight mb-1.5">Frequency-Based</h4>
                <p className="text-[12px] font-medium leading-relaxed text-slate-500">Create Appointments using intervals frequency (e.g. Every 15 minutes).</p>
              </div>
            </div>
          </section>

          {/* TWO COLUMN BOTTOM SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            
            {/* SCHEDULER TIME */}
            <section className="bg-slate-50/50 p-6 rounded-2xl border-2 border-slate-100 space-y-3 transition-all hover:bg-white hover:shadow-sm">
              <div className="flex items-center gap-2 text-[#00A3FF] font-black text-[11px] uppercase tracking-widest mb-1">
                <Clock size={14} className="animate-spin-slow" />
                Scheduler Running Time
              </div>
              <div className="relative group">
                <input 
                  type="text" 
                  value={runTime}
                  onChange={(e) => setRunTime(e.target.value)}
                  className={`${inputClasses} h-[38px] px-3`}
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] transition-colors" size={16} />
              </div>
              <p className="text-[11px] text-slate-400 font-medium italic pt-1">
                * System triggers auto-generation engine daily at this timestamp.
              </p>
            </section>

            {/* ADMIN NOTES */}
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-slate-500 font-black text-[11px] uppercase tracking-widest mb-1">
                <Info size={14} />
                Admin Notes
              </div>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${inputClasses} h-[100px] p-3 resize-none`}
                placeholder="Log internal updates here..."
              />
            </section>
          </div>

          {/* FOOTER ACTION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t-2 border-slate-100 mt-2">
            <div className="flex items-center gap-2.5">
               <span className="flex h-2.5 w-2.5 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]"></span>
               <p className="text-[12px] text-slate-500 font-bold">
                 Last successful sync: <span className="text-slate-800">Today at 02:00 PM</span>
               </p>
            </div>
            
            {/* Official Animated Save Button - Added onClick */}
            <button 
              onClick={handleSave}
              className="w-full sm:w-auto h-[38px] px-8 bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[13px] font-bold rounded-lg transition-all shadow-[0_4px_10px_rgba(0,163,255,0.2)] hover:shadow-[0_6px_15px_rgba(0,163,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
            >
              <Save size={16} strokeWidth={2.5} />
              SAVE CONFIGURATION
            </button>
          </div>

        </div>
      </div>

      {/* ✅ Success Popup Component Integration */}
      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message="System configuration has been successfully updated." 
      />

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