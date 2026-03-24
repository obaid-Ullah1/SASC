import React, { useState } from 'react';
import { X, Tag, PlusCircle } from 'lucide-react';

const AddStatusForm = ({ onCancel, activeColor, onSave }) => {
  const [statusName, setStatusName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statusName.trim()) return;
    
    // Call the parent's save logic
    onSave(statusName);
    
    // Optional: Reset input local state
    setStatusName("");
  };

  // Standardized Blueprint Classes
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white placeholder:text-slate-400 placeholder:font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        {/* ===== Blueprint Header ===== */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Tag size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
                Add New Status
              </h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* ===== Form Body ===== */}
        <form onSubmit={handleSubmit} className="p-6 bg-white/50">
          <div className="flex flex-row items-end justify-between gap-10">
            
            {/* Left Side: Status Name Field */}
            <div className="flex-1 max-w-md">
              <label className={labelClasses}>
                Status Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
                placeholder="e.g., Pending, Approved, In Progress..."
                className={inputClasses}
                required
              />
            </div>

            {/* Right Side: Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="h-[42px] px-6 border-2 border-slate-200 text-slate-500 font-bold rounded-lg hover:bg-slate-50 transition-all text-[12px] uppercase tracking-wide"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-[#00A3FF] hover:bg-[#008CE6] text-white px-8 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusCircle size={16} strokeWidth={2.5} />
                Save Status
              </button>
            </div>

          </div>
          
          <p className="text-[10px] text-slate-400 mt-2 ml-1 italic font-medium">
            Note: This status will become available across the operational workflow.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddStatusForm;