import React, { useState } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';

const AddScaleForm = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    grade: '',
    whealMin: '',
    whealMax: '',
    flareMin: '',
    flareMax: '',
    result: '',
    description: '',
    isActive: true,
    isDefault: false
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.grade.trim()) return; // Simple validation
    
    onAdd(formData);
    
    // Reset form
    setFormData({
      grade: '',
      whealMin: '',
      whealMax: '',
      flareMin: '',
      flareMax: '',
      result: '',
      description: '',
      isActive: true,
      isDefault: false
    });
  };

  return (
    // OUTER CONTAINER: Sky color theme, shadow, and slide-in animation
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg m-4 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden shrink-0">
      
      {/* HEADER: Sky Blue Gradient matched to your template */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            Create New Scale Entry
          </h3>
        </div>
        
        {/* Rose colored close button with hover effect */}
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY: White/50 semi-transparent background */}
      <form onSubmit={handleSubmit} className="p-5 bg-white/50">
        {/* Top Row: Numeric Inputs & Grade */}
        <div className="flex flex-wrap items-end gap-4 mb-5">
          <div className="w-24 flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Grade</label>
            <input type="text" name="grade" placeholder="0" value={formData.grade} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>
          
          <div className="flex-1 min-w-[100px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Wheal Min</label>
            <input type="number" name="whealMin" placeholder="Min" value={formData.whealMin} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>

          <div className="flex-1 min-w-[100px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Wheal Max</label>
            <input type="number" name="whealMax" placeholder="Max" value={formData.whealMax} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>

          <div className="flex-1 min-w-[100px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Flare Min</label>
            <input type="number" name="flareMin" placeholder="Min" value={formData.flareMin} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>

          <div className="flex-1 min-w-[100px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Flare Max</label>
            <input type="number" name="flareMax" placeholder="Max" value={formData.flareMax} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>

          <div className="w-24 flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Result</label>
            <input type="text" name="result" placeholder="0" value={formData.result} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>
        </div>

        {/* Bottom Row: Description, Toggles, and Save */}
        <div className="flex flex-wrap items-end gap-5">
          <div className="flex-1 min-w-[300px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Description</label>
            <input type="text" name="description" placeholder="Enter scale description..." value={formData.description} onChange={handleChange} className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all" />
          </div>

          {/* Status Toggle (Emerald/Rose) */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
            className={`h-[40px] px-4 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 ${
              formData.isActive 
                ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-100' 
                : 'bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${formData.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {formData.isActive ? 'Active' : 'Inactive'}
          </button>

          {/* Default Toggle (Sky Blue) */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
            className={`h-[40px] px-4 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 border-2 ${
              formData.isDefault 
                ? 'bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100' 
                : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {formData.isDefault ? 'Is Default' : 'Set Default'}
          </button>

          {/* SAVE BUTTON matched to template */}
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[40px] w-32 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <Save size={14} strokeWidth={3} /> Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScaleForm;