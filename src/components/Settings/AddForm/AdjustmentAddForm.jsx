import React, { useState, useEffect } from 'react';
import { X, Plus, RotateCcw, FileText } from 'lucide-react';

const AdjustmentAddForm = ({ isOpen, onClose, onAdd, nextSortOrder }) => {
  const initialState = {
    type: '',
    plan: '',
    sortOrder: nextSortOrder || ''
  };

  const [formData, setFormData] = useState(initialState);

  // Keep sort order updated if parent changes it
  useEffect(() => {
    setFormData(prev => ({ ...prev, sortOrder: nextSortOrder }));
  }, [nextSortOrder]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({ ...initialState, sortOrder: nextSortOrder });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ ...initialState, sortOrder: nextSortOrder + 1 });
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* 1. LIGHT BLUE FORM HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <Plus size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              Add Adjustment Dose Plan
            </h3>
          </div>
        </div>
        
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
          title="Close Form"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* 2. FORM BODY (Inline Layout matching your design) */}
      <form onSubmit={handleSubmit} className="p-5 bg-white/50">
        <div className="flex items-end gap-4">
          
          {/* TYPE FIELD */}
          <div className="flex flex-col gap-1.5 w-[180px] shrink-0">
            <label className="text-[12px] font-bold text-slate-700">Type <span className="text-rose-500">*</span></label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleChange} 
              required
              className="h-[38px] border-2 border-slate-200 rounded-lg px-2 text-[13px] font-medium text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 bg-white transition-all"
            >
              <option value="" disabled>Select</option>
              <option value="Allergy">Allergy</option>
              <option value="Bio">Bio</option>
            </select>
          </div>

          {/* DOSE PLAN FIELD (With Blue Icon Block) */}
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="text-[12px] font-bold text-slate-700">Adjustment Dose Plan <span className="text-rose-500">*</span></label>
            <div className="flex h-[38px] rounded-lg overflow-hidden border-2 border-slate-200 focus-within:border-[#00A3FF] focus-within:ring-4 focus-within:ring-[#00A3FF]/10 transition-all bg-white">
              <div className="bg-[#00A3FF] w-[40px] flex items-center justify-center shrink-0">
                <FileText size={16} className="text-white" />
              </div>
              <input 
                type="text" 
                name="plan" 
                value={formData.plan} 
                onChange={handleChange} 
                required
                placeholder="e.g. Continue same dose, Reduce by 1 step..."
                className="flex-1 px-3 text-[13px] font-medium text-slate-700 outline-none placeholder:italic placeholder:text-slate-400 placeholder:font-normal"
              />
            </div>
          </div>

          {/* SORT ORDER FIELD */}
          <div className="flex flex-col gap-1.5 w-[140px] shrink-0">
            <div className="flex items-center gap-2">
              <label className="text-[12px] font-bold text-slate-700">Sort Order</label>
              <span className="bg-slate-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Auto</span>
            </div>
            <input 
              type="number" 
              name="sortOrder" 
              value={formData.sortOrder} 
              onChange={handleChange} 
              required
              className="h-[38px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-medium text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2 shrink-0">
            <button 
              type="submit" 
              className="bg-[#00A3FF] hover:bg-[#008CE6] text-white px-8 h-[38px] rounded-lg text-[13px] font-bold shadow-md transition-all active:scale-95 flex items-center justify-center"
            >
              Add
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-600 px-5 h-[38px] rounded-lg text-[13px] font-bold transition-all flex items-center justify-center"
            >
              Reset
            </button>
          </div>

        </div>
      </form>

    </div>
  );
};

export default AdjustmentAddForm;