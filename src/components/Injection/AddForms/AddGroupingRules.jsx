import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save, Edit } from 'lucide-react';

const AddGroupingRules = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    recipe: '',
    rule: '',
    upperLimit: '',
    groupLabel: ''
  });

  // Sync form with editData when the edit button is clicked or form opens
  useEffect(() => {
    if (editData) {
      setFormData({
        recipe: editData.recipe || '',
        rule: editData.rule || '',
        upperLimit: editData.upperLimit || '',
        groupLabel: editData.groupLabel || ''
      });
    } else {
      // Clear form when switching to "Add" mode
      setFormData({ recipe: '', rule: '', upperLimit: '', groupLabel: '' });
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rule || !formData.groupLabel) return;

    // Send the compiled formData back to the handleFormSubmit in Table component
    onAdd(formData);
    
    // Reset local state
    setFormData({ recipe: '', rule: '', upperLimit: '', groupLabel: '' });
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg m-4 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden shrink-0">
      
      {/* HEADER: Dynamic colors based on mode */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editData ? (
              <Edit size={16} className="text-amber-500" strokeWidth={2.5} />
            ) : (
              <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            )}
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            {editData ? 'Update Grouping Rule' : 'Add New Grouping Rule'}
          </h3>
        </div>
        
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="p-5 bg-white/50">
        <div className="flex flex-wrap lg:flex-nowrap items-end gap-4">
          
          <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Recipe</label>
            <select 
              name="recipe"
              value={formData.recipe}
              onChange={handleChange}
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white"
            >
              <option value="">-- Select Recipe --</option>
              <option value="Recipe 1">Recipe 1</option>
              <option value="Recipe 2">Recipe 2</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Rule Name</label>
            <select 
              name="rule"
              value={formData.rule}
              onChange={handleChange}
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white"
            >
              <option value="">-- Select Rule Name --</option>
              <option value="Rule 1/25">Rule 1/25</option>
              <option value="Rule 2/50">Rule 2/50</option>
            </select>
          </div>

          <div className="w-full lg:w-32 flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Upper %</label>
            <input
              type="number"
              name="upperLimit"
              value={formData.upperLimit}
              onChange={handleChange}
              placeholder="0"
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
            />
          </div>

          <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Group Label</label>
            <input
              type="text"
              name="groupLabel"
              value={formData.groupLabel}
              onChange={handleChange}
              placeholder="e.g. Suggested Inj 1"
              className="w-full h-[40px] border-2 border-slate-200 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all italic placeholder:text-slate-300"
            />
          </div>

          {/* DYNAMIC ACTION BUTTON: Amber for Update, Blue for Save */}
          <button
            type="submit"
            className={`${editData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00A3FF] hover:bg-[#008CE6]'} text-white h-[40px] w-40 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0`}
          >
            <Save size={14} strokeWidth={3} /> {editData ? 'Update Rule' : 'Save Rule'}
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddGroupingRules;