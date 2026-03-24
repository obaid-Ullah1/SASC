import React, { useState } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';

const AddGroups = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    category: '',
    groupName: '',
    description: '',
    requiredAllergens: '',
    isActive: true
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.groupName.trim()) return; // Simple validation
    
    onAdd(formData);
    
    // Reset form
    setFormData({
      category: '',
      groupName: '',
      description: '',
      requiredAllergens: '',
      isActive: true
    });
  };

  return (
    // EXACT TEMPLATE CONTAINER: Thick border, sky color, shadow, slide-in
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg m-4 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden shrink-0">
      
      {/* HEADER: Sky Blue Gradient */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            Create New Group
          </h3>
        </div>
        
        {/* Hover Red Close Button */}
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY: white/50 bg */}
      <form onSubmit={handleSubmit} className="p-5 bg-white/50">
        <div className="flex flex-wrap lg:flex-nowrap items-end gap-5">
          
          {/* Test Category */}
          <div className="w-full lg:w-auto flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Test Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full lg:w-[160px] h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white"
            >
              <option value="">-- Select --</option>
              <option value="Allergy">Allergy</option>
              <option value="Chemical">Chemical</option>
            </select>
          </div>

          {/* Group Name */}
          <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Group Name</label>
            <input
              type="text"
              name="groupName"
              placeholder="Enter Group Name"
              value={formData.groupName}
              onChange={handleChange}
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
            />
          </div>

          {/* Description */}
          <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
            />
          </div>

          {/* Required Allergens */}
          <div className="flex-1 min-w-[120px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Req Allergens</label>
            <input
              type="number"
              name="requiredAllergens"
              placeholder="Count"
              value={formData.requiredAllergens}
              onChange={handleChange}
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
            />
          </div>

          {/* RED/GREEN DYNAMIC TOGGLE FOR STATUS */}
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
            className={`h-[40px] px-4 rounded-lg text-[12px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 ${
              formData.isActive 
                ? 'bg-emerald-50 text-emerald-600 border-2 border-emerald-200 hover:bg-emerald-100' 
                : 'bg-rose-50 text-rose-600 border-2 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${formData.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {formData.isActive ? 'Active' : 'Inactive'}
          </button>

          {/* EXACT SAVE BUTTON: Thick blue, fixed width, uppercase */}
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

export default AddGroups;