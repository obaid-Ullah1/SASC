import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';

export const SharedAddForm = ({ isOpen, onClose, onSave, editingData, entityName }) => {
  const defaultFormState = {
    name: '',
    isDefault: false
  };

  const [formData, setFormData] = useState(defaultFormState);

  // Sync form data when editingData changes
  useEffect(() => {
    if (editingData) {
      setFormData(editingData);
    } else {
      setFormData(defaultFormState);
    }
  }, [editingData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert(`Please enter a ${entityName}.`);
      return;
    }
    onSave(formData);
    setFormData(defaultFormState);
  };

  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white";
  const labelClasses = "text-[12px] font-bold text-sky-900 mb-1.5 uppercase tracking-wide block";

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editingData 
              ? <Save size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> 
              : <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            }
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              {/* DYNAMIC TITLE */}
              {editingData ? `Update ${entityName}` : `Add New ${entityName}`}
            </h3>
          </div>
        </div>
        
        <button type="button" onClick={onClose} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm">
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 bg-white/50">
        <div className="flex flex-wrap items-end gap-4">
          
          <div className="flex flex-col flex-[2] min-w-[250px]">
            {/* DYNAMIC LABEL */}
            <label className={labelClasses}>{entityName}</label>
            <input 
              type="text" 
              name="name"
              placeholder={`Enter ${entityName}`} // DYNAMIC PLACEHOLDER
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div className="flex items-center gap-2 h-[42px] px-2 mb-[2px]">
            <input 
              type="checkbox" 
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-5 h-5 text-[#00A3FF] border-2 border-slate-300 rounded focus:ring-4 focus:ring-[#00A3FF]/10 transition-all cursor-pointer"
            />
            <label htmlFor="isDefault" className="text-[13px] font-bold text-sky-900 cursor-pointer uppercase tracking-wide">
              Default
            </label>
          </div>

        </div>

        <div className="flex justify-end mt-2">
          <button type="submit" className="bg-[#00A3FF] hover:bg-[#008CE6] text-white px-12 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95">
            {editingData ? 'Save Changes' : 'Add To List'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default SharedAddForm;