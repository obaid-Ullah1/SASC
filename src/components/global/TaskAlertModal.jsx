import React from "react";
import { X, AlertCircle, ShieldAlert, ArrowRight } from "lucide-react";

const TaskAlertModal = ({ isOpen, onClose, title, message }) => {
  // If this is false, the component won't even render in the DOM
  if (!isOpen) return null;

  return (
    /* We use z-[9999] to ensure it is ABOVE everything else */
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto outline-none">
      
      {/* 1. Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* 2. Modal Card */}
      <div className="relative bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden border border-white animate-in zoom-in-95 duration-300">
        
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-8 text-white">
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-2">
              <div className="bg-white/20 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-2">
                <AlertCircle size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Protocol Update</span>
              </div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-tight text-white">
                {title}
              </h3>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 bg-black/10 hover:bg-black/20 rounded-2xl transition-all text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-8 bg-[#FCFDFF]">
          <div className="bg-orange-50 border border-orange-100 p-6 rounded-[2rem] mb-6">
            <p className="text-sm font-bold text-slate-700 leading-relaxed italic text-center">
              "{message}"
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full group flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200"
          >
            Confirm Acknowledgment
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskAlertModal;