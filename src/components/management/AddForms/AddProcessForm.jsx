import React, { useState, useEffect } from 'react';
import { X, List, PlusCircle, ChevronDown, Save } from 'lucide-react';

const AddProcessForm = ({ onCancel, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    process: '',
    code: '',
    color: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        process: initialData.process || '',
        code: initialData.code || '',
        color: initialData.color || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.process.trim() || !formData.code.trim()) return;
    
    // Call the parent handler
    onSave(formData);
  };

  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white placeholder:text-slate-400 font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm border border-sky-100">
              <List size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase">
              {initialData ? 'Edit Process' : 'Add New Process'}
            </h3>
          </div>
          <button type="button" onClick={onCancel} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm">
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 bg-white/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClasses}>Process Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.process}
                onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                placeholder="e.g., Injection Container"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Code <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., INJ"
                className={inputClasses}
                required
              />
            </div>

            <div>
              <label className={labelClasses}>Color <span className="text-red-500">*</span></label>
              <div className="relative">
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                  required
                >
                  <option value="" disabled>Select Color</option>
                  <option value="#2BFA06">Green (#2BFA06)</option>
                  <option value="#FF0000">Red (#FF0000)</option>
                  <option value="#1D68F1">Blue (#1D68F1)</option>
                </select>
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <ChevronDown size={16} className="text-slate-400" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
            <button type="button" onClick={onCancel} className="h-[42px] px-6 border-2 border-slate-200 text-slate-500 font-bold rounded-lg hover:bg-slate-50 transition-all text-[12px] uppercase">
              Cancel
            </button>
            <button
              type="submit"
              className={`${initialData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00A3FF] hover:bg-[#008CE6]'} text-white px-8 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2`}
            >
              {initialData ? <Save size={16} /> : <PlusCircle size={16} strokeWidth={2.5} />}
              {initialData ? 'Update Process' : 'Save Process'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProcessForm;