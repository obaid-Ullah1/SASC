import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus } from 'lucide-react';

const DoseAddForm = ({ isOpen, onClose, onAdd }) => {
  const initialState = {
    rule: '',
    vialDilution: '',
    ratioEscalation: '',
    doseMl: '',
    finalDoseMl: '',
    escalationMethod: 'Multiply (x)',
    volEscalation: '',
    displayOrder: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialState);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData(initialState);
  };

  return (
    // 1. THE BREAKOUT WRAPPER: This forces the form completely out of the grid and covers the whole screen.
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* 2. THE FORM CONTAINER: Fixed max-width so it looks great on desktop, and max-height so it doesn't overflow the screen */}
      <div className="w-full max-w-4xl flex flex-col max-h-[90vh] bg-white border border-sky-200 rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden relative">
        
        {/* HEADER: Pinned to the top */}
        <div className="shrink-0 z-10 bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 sm:p-2 rounded-lg shadow-sm flex items-center justify-center border border-sky-100 shrink-0">
              <Plus size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold text-sky-900 text-[14px] sm:text-[15px] tracking-wide uppercase leading-tight">
                Add New Row
              </h3>
              <span className="text-[11px] sm:text-[12px] text-sky-600 font-medium italic">Enter details for the new dose schedule</span>
            </div>
          </div>
          
          <button 
            type="button" 
            onClick={onClose} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm shrink-0"
            title="Close Form"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* FORM: The middle content area scrolls safely */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 flex flex-col gap-5 sm:gap-6 bg-white">
          
          {/* ROW 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Rule<span className="text-rose-500">*</span></label>
              <select 
                name="rule" value={formData.rule} onChange={handleChange} required
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 bg-white shadow-sm"
              >
                <option value="">Select Rule</option>
                <option value="SAER-1">SAER-1</option>
                <option value="SAER-2">SAER-2</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Vial Dilution<span className="text-rose-500">*</span></label>
              <input 
                type="text" name="vialDilution" value={formData.vialDilution} onChange={handleChange} required
                placeholder="e.g. 1:10,000"
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 placeholder:italic placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Ratio Escalation<span className="text-rose-500">*</span></label>
              <input 
                type="text" name="ratioEscalation" value={formData.ratioEscalation} onChange={handleChange} required
                placeholder="1"
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 placeholder:italic placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Dose (mL)<span className="text-rose-500">*</span></label>
              <input 
                type="text" name="doseMl" value={formData.doseMl} onChange={handleChange} required
                placeholder="0.05"
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 placeholder:italic placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Final Dose (mL)<span className="text-rose-500">*</span></label>
              <input 
                type="text" name="finalDoseMl" value={formData.finalDoseMl} onChange={handleChange} required
                placeholder="0.40 or 0.50"
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 placeholder:italic placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Escalation Method<span className="text-rose-500">*</span></label>
              <select 
                name="escalationMethod" value={formData.escalationMethod} onChange={handleChange} required
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 bg-white shadow-sm"
              >
                <option value="Multiply (x)">Multiply (x)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Vol Escalation <span className="text-rose-500">*</span></label>
              <input 
                type="text" name="volEscalation" value={formData.volEscalation} onChange={handleChange} required
                placeholder="2.0 (multiplier)"
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 placeholder:italic placeholder:text-slate-400 shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Display Order<span className="text-rose-500">*</span></label>
              <input 
                type="text" name="displayOrder" value={formData.displayOrder} onChange={handleChange} required
                placeholder="37"
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 sm:text-right shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1">
              <label className="text-[12px] sm:text-[13px] font-bold text-slate-700">Notes</label>
              <input 
                type="text" name="notes" value={formData.notes} onChange={handleChange}
                placeholder="Max dose for this vial, etc."
                className="h-[40px] border border-slate-300 rounded-md px-3 text-[13px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 placeholder:italic placeholder:text-slate-400 shadow-sm"
              />
            </div>
          </div>

          {/* BUTTONS: Sitting comfortably inside the scroll area so they are never lost */}
          <div className="mt-4 pt-5 border-t border-slate-200 flex flex-col sm:flex-row justify-end items-center gap-3">
            <button 
              type="button" 
              onClick={handleReset}
              className="w-full sm:w-auto justify-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 px-8 h-[42px] rounded-md flex items-center gap-2 text-[14px] font-bold shadow-sm transition-all shrink-0"
            >
              <RotateCcw size={16} strokeWidth={2.5} /> Reset Form
            </button>

            <button 
              type="submit" 
              className="w-full sm:w-auto justify-center bg-[#00A3FF] hover:bg-[#008CE6] text-white px-8 h-[42px] rounded-md flex items-center gap-2 text-[14px] font-bold shadow-md transition-all active:scale-95 shrink-0"
            >
              <Save size={16} strokeWidth={2.5} /> Save Details
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default DoseAddForm;