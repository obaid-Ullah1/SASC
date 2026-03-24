import React, { useState, useEffect } from 'react';
import { X, Palette, PlusCircle, Save } from 'lucide-react';

const AddColorForm = ({ onCancel, onSave, initialData }) => {
  // --- 1. STATE FOR FORM FIELDS (Logic preserved) ---
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    font: ''
  });

  // --- 2. EFFECT FOR EDITING MODE (Logic preserved) ---
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        code: initialData.code || '',
        font: initialData.font || ''
      });
    } else {
      setFormData({ name: '', code: '', font: '' });
    }
  }, [initialData]);

  // --- 3. SUBMIT HANDLER (Logic preserved) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.code.trim() || !formData.font.trim()) return;
    
    // Pass data back to StatusPage
    onSave(formData);
  };

  // ===== Updated Blueprint Theme Classes =====
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white placeholder:text-slate-400 placeholder:font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        {/* ===== Blueprint Header ===== */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Palette size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
                {initialData ? 'Edit Color' : 'Add New Color'}
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

        {/* ===== Form Body ===== */}
        <form onSubmit={handleSubmit} className="p-6 bg-white/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Color Name Input */}
            <div>
              <label className={labelClasses}>
                Color Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Sky Blue"
                className={inputClasses}
                required
              />
            </div>

            {/* Color Code Input */}
            <div>
              <label className={labelClasses}>
                Color Code (Hex) <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="#FFFFFF"
                  className={inputClasses}
                  required
                />
                <div 
                  className="w-[42px] h-[42px] rounded-lg border-2 border-slate-200 shrink-0 shadow-inner transition-colors duration-300" 
                  style={{ backgroundColor: formData.code || '#f3f4f6' }}
                />
              </div>
            </div>

            {/* Font Code Input */}
            <div>
              <label className={labelClasses}>
                Font Code (Hex) <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={formData.font}
                onChange={(e) => setFormData({ ...formData, font: e.target.value })}
                placeholder="#000000"
                className={inputClasses}
                required
              />
            </div>
          </div>

          {/* ===== Action Buttons (Separated by border-t) ===== */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-5 border-t border-slate-100">
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
              {initialData ? 'Update Color' : 'Save Color'}
            </button>
          </div>
          
          <p className="text-[10px] text-slate-400 mt-2 ml-1 italic font-medium">
            Note: Ensure hex codes include the '#' symbol for correct rendering in the grid.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddColorForm;