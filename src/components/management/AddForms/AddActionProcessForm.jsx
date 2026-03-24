import React, { useState, useEffect } from 'react';
import { X, Workflow, PlusCircle, Save, ChevronDown } from 'lucide-react';

const AddActionProcessForm = ({ onCancel, onSave, initialData }) => {
  // --- 1. STATE FOR FORM FIELDS (Logic preserved) ---
  const [formData, setFormData] = useState({
    process: '',
    action: ''
  });

  // --- 2. EFFECT FOR EDITING MODE (Logic preserved) ---
  useEffect(() => {
    if (initialData) {
      setFormData({
        process: initialData.process || '',
        action: initialData.action || ''
      });
    } else {
      setFormData({ process: '', action: '' });
    }
  }, [initialData]);

  // --- 3. SUBMIT HANDLER (Logic preserved) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.process || !formData.action) return;
    
    onSave(formData);
  };

  // ===== Blueprint Theme Classes =====
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white appearance-none cursor-pointer placeholder:text-slate-400 font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        {/* ===== Blueprint Header ===== */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Workflow 
                size={16} 
                className={initialData ? "text-amber-500" : "text-[#00A3FF]"} 
                strokeWidth={2.5} 
              />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
                {initialData ? 'Edit Action-Process Mapping' : 'Add Action-Process Mapping'}
              </h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm cursor-pointer"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* ===== Form Body (Logic & Field Sizes Preserved) ===== */}
        <form onSubmit={handleSubmit} className="p-6 bg-white/50">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 w-full">
            
            {/* Input Selection Group - Kept at full scale */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              
              {/* Process Select */}
              <div className="w-full">
                <label className={labelClasses}>
                  Process <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.process}
                    onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                    className={inputClasses}
                    required
                  >
                    <option value="" disabled>Select Process</option>
                    <option value="Injection Container">Injection Container</option>
                    <option value="Inventory">Inventory</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-slate-400" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

              {/* Action Select */}
              <div className="w-full">
                <label className={labelClasses}>
                  Action <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={formData.action}
                    onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                    className={inputClasses}
                    required
                  >
                    <option value="" disabled>Select Action</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Missed">Missed</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-slate-400" strokeWidth={2.5} />
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons (Far Right) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onCancel}
                className="h-[42px] px-6 border-2 border-slate-200 text-slate-500 font-bold rounded-lg hover:bg-slate-50 transition-all text-[12px] uppercase tracking-wide cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`${
                  initialData 
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' 
                    : 'bg-[#00A3FF] hover:bg-[#008CE6] shadow-blue-100'
                } text-white px-10 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[140px] cursor-pointer`}
              >
                {initialData ? <Save size={16} strokeWidth={2.5} /> : <PlusCircle size={16} strokeWidth={2.5} />}
                {initialData ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-400 mt-4 ml-1 italic font-medium">
            Note: This mapping defines the automation workflow between selected operational processes and system actions.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddActionProcessForm;