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
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* 1. LIGHT BLUE FORM HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <Plus size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              Add New Row
            </h3>
            <span className="text-[10px] text-sky-600 font-medium italic">Enter details for the new dose schedule</span>
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

      {/* FORM FIELDS */}
      <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 bg-white/50">
        
        {/* ROW 1 */}
        <div className="grid grid-cols-6 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Rule<span className="text-rose-500">*</span></label>
            <select 
              name="rule" value={formData.rule} onChange={handleChange} required
              className="h-[36px] border border-slate-300 rounded-md px-2 text-[12px] text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 bg-white"
            >
              <option value="">Select Rule</option>
              <option value="SAER-1">SAER-1</option>
              <option value="SAER-2">SAER-2</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Vial Dilution<span className="text-rose-500">*</span></label>
            <input 
              type="text" name="vialDilution" value={formData.vialDilution} onChange={handleChange} required
              placeholder="e.g. 1:10,000"
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 placeholder:italic placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Ratio Escalation<span className="text-rose-500">*</span></label>
            <input 
              type="text" name="ratioEscalation" value={formData.ratioEscalation} onChange={handleChange} required
              placeholder="1"
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 placeholder:italic placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Dose (mL)<span className="text-rose-500">*</span></label>
            <input 
              type="text" name="doseMl" value={formData.doseMl} onChange={handleChange} required
              placeholder="0.05"
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 placeholder:italic placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Final Dose (mL)<span className="text-rose-500">*</span></label>
            <input 
              type="text" name="finalDoseMl" value={formData.finalDoseMl} onChange={handleChange} required
              placeholder="0.40 or 0.50"
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 placeholder:italic placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Escalation Method<span className="text-rose-500">*</span></label>
            <select 
              name="escalationMethod" value={formData.escalationMethod} onChange={handleChange} required
              className="h-[36px] border border-slate-300 rounded-md px-2 text-[12px] text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 bg-white"
            >
              <option value="Multiply (x)">Multiply (x)</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Vol Escalation <span className="text-rose-500">*</span></label>
            <input 
              type="text" name="volEscalation" value={formData.volEscalation} onChange={handleChange} required
              placeholder="2.0 (multiplier)"
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 placeholder:italic placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Display Order<span className="text-rose-500">*</span></label>
            <input 
              type="text" name="displayOrder" value={formData.displayOrder} onChange={handleChange} required
              placeholder="37"
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 text-right"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700">Notes</label>
            <input 
              type="text" name="notes" value={formData.notes} onChange={handleChange}
              placeholder="Max dose for this vial, etc."
              className="h-[36px] border border-slate-300 rounded-md px-3 text-[12px] outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 placeholder:italic placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* ROW 3: BUTTONS */}
        <div className="flex items-center gap-3 pt-2">
          <button 
            type="submit" 
            className="bg-[#00A3FF] hover:bg-[#008CE6] text-white px-6 h-[38px] rounded-md flex items-center gap-2 text-[13px] font-bold shadow-md transition-all active:scale-95"
          >
            <Save size={15} strokeWidth={2.5} /> Save Details
          </button>
          
          <button 
            type="button" 
            onClick={handleReset}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 px-6 h-[38px] rounded-md flex items-center gap-2 text-[13px] font-bold shadow-sm transition-all"
          >
            <RotateCcw size={15} strokeWidth={2.5} /> Reset Form
          </button>
        </div>

      </form>
    </div>
  );
};

export default DoseAddForm;