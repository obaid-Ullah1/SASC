import React, { useState, useEffect } from 'react';
import { X, RefreshCw, PlusCircle, Save, ChevronDown } from 'lucide-react';

const AddProcessStatusForm = ({ onCancel, onSave, initialData }) => {
  // --- 1. STATE FOR FORM FIELDS ---
  const [formData, setFormData] = useState({
    process: '',
    statusName: '',
    color: '',
    isActive: true
  });

  // --- 2. EFFECT FOR EDITING MODE ---
  useEffect(() => {
    if (initialData) {
      setFormData({
        process: initialData.process || '',
        statusName: initialData.statusName || '',
        color: initialData.color || '',
        isActive: initialData.isActive ?? true
      });
    } else {
      setFormData({ process: '', statusName: '', color: '', isActive: true });
    }
  }, [initialData]);

  // --- 3. SUBMIT HANDLER ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.process || !formData.statusName || !formData.color) return;
    
    onSave(formData);
  };

  // ===== Blueprint Theme Classes =====
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white appearance-none cursor-pointer placeholder:text-slate-400 font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        {/* ===== Blueprint Header ===== */}
        <div className={`${initialData ? 'bg-amber-500' : 'bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff]'} px-5 py-2.5 flex items-center justify-between border-b border-sky-200 transition-colors duration-300`}>
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <RefreshCw size={16} className={initialData ? "text-amber-500" : "text-[#00A3FF]"} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className={`${initialData ? 'text-white' : 'text-sky-900'} font-bold text-[13px] tracking-wide uppercase leading-tight`}>
                {initialData ? 'Edit Process Status Mapping' : 'Add Process Status Mapping'}
              </h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className={`${initialData ? 'text-white/80 hover:text-white border-white/20' : 'text-rose-500 border-rose-200 hover:bg-rose-500 hover:text-white'} bg-white/10 border rounded-md p-1.5 transition-all shadow-sm cursor-pointer`}
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* ===== Form Body ===== */}
        <form onSubmit={handleSubmit} className="p-6 bg-white/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            
            {/* Process Select */}
            <div className="flex-1">
              <label className={labelClasses}>Process <span className="text-red-500">*</span></label>
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

            {/* Status Select */}
            <div className="flex-1">
              <label className={labelClasses}>Status <span className="text-red-500">*</span></label>
              <div className="relative">
                <select 
                  value={formData.statusName}
                  onChange={(e) => setFormData({ ...formData, statusName: e.target.value })}
                  className={inputClasses}
                  required
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Missed">Missed</option>
                  <option value="In Progress">In Progress</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-400" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Color Select */}
            <div className="flex-1">
              <label className={labelClasses}>Display Color <span className="text-red-500">*</span></label>
              <div className="relative">
                <select 
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className={inputClasses}
                  required
                >
                  <option value="" disabled>Select Color</option>
                  <option value="#2BFA06">Green</option>
                  <option value="#FFFF00">Yellow</option>
                  <option value="#FF0000">Red</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <div 
                    className="w-3 h-3 rounded-full mr-6 border border-slate-300" 
                    style={{ backgroundColor: formData.color || 'transparent' }} 
                  />
                  <ChevronDown size={16} className="text-slate-400" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Simple Active Checkbox */}
            <div className="flex flex-col gap-1.5">
               <label className={labelClasses}>Active</label>
               <div className="h-[42px] flex items-center ml-2">
                 <input 
                    type="checkbox" 
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 accent-[#00A3FF] cursor-pointer transition-transform active:scale-90"
                 />
               </div>
            </div>
          </div>

          {/* ===== Action Buttons ===== */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-slate-100">
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
                initialData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00A3FF] hover:bg-[#008CE6]'
              } text-white px-8 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer`}
            >
              {initialData ? <Save size={16} strokeWidth={2.5} /> : <PlusCircle size={16} strokeWidth={2.5} />}
              {initialData ? 'Update Mapping' : 'Save Mapping'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProcessStatusForm;