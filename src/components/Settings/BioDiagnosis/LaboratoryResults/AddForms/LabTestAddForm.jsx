import React, { useState, useEffect } from 'react';
import { X, TestTube2, Save } from 'lucide-react';

const LabTestAddForm = ({ isOpen, onClose, onSave, editingData }) => {
  const defaultFormState = {
    category: '',
    code: '',
    name: '',
    unit: ''
  };

  const [formData, setFormData] = useState(defaultFormState);

  // Your exact dropdown categories
  const categories = [
    'CBC',
    'CMP',
    'Immunoglobulin',
    'Inflammatory',
    'LFT',
    'Renal'
  ];

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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.code.trim() || !formData.name.trim()) {
      alert("Please fill in the Category, Code, and Name fields.");
      return;
    }
    onSave(formData);
    setFormData(defaultFormState);
  };

  // RESTORED: Your exact premium theme classes!
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white";
  const labelClasses = "text-[12px] font-bold text-sky-900 mb-1.5 uppercase tracking-wide block";

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* RESTORED: Premium Header */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editingData 
              ? <Save size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> 
              : <TestTube2 size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            }
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              {editingData ? 'Update Lab Test' : 'Add New Lab Test'}
            </h3>
          </div>
        </div>
        
        <button type="button" onClick={onClose} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm">
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 bg-white/50">
        
        {/* Horizontal Layout for Inputs */}
        <div className="flex flex-wrap lg:flex-nowrap items-end gap-4">
          
          {/* Category Dropdown */}
          <div className="flex-1 min-w-[150px]">
            <label className={labelClasses}>Category</label>
            <select 
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`${inputClasses} cursor-pointer appearance-none bg-no-repeat bg-[position:calc(100%-12px)_center]`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")` }}
            >
              <option value="" disabled>Select</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Code */}
          <div className="flex-1 min-w-[120px]">
            <label className={labelClasses}>Code</label>
            <input 
              type="text" 
              name="code"
              placeholder="e.g. ALT"
              value={formData.code}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Name */}
          <div className="flex-[2] min-w-[200px]">
            <label className={labelClasses}>Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="e.g. Alanine Aminotransferase"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          {/* Unit */}
          <div className="flex-1 min-w-[100px]">
            <label className={labelClasses}>Unit</label>
            <input 
              type="text" 
              name="unit"
              placeholder="e.g. U/L"
              value={formData.unit}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

        </div>

        {/* RESTORED: Premium Submit Button */}
        <div className="flex justify-end mt-2">
          <button type="submit" className="bg-[#00A3FF] hover:bg-[#008CE6] text-white px-12 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95">
            {editingData ? 'Save Changes' : 'Add To List'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default LabTestAddForm;