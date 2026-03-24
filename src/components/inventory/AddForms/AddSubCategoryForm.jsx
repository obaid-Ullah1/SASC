import React, { useState } from 'react';
import { X, GitBranch, ListFilter, ChevronDown } from 'lucide-react';

const AddSubCategoryForm = ({ onAdd, onClose }) => {
  // Hardcoded category list as per your requirement
  const CATEGORY_OPTIONS = [
    "Allergen",
    "Glycerine",
    "Bio Logical",
    "Preservative",
    "Diluent",
    "Injections",
    "Chemicals"
  ];

  const [formData, setFormData] = useState({
    parentCategory: "",
    subCategoryName: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentCategory || !formData.subCategoryName.trim()) return;
    
    onAdd(formData);
    setFormData({ parentCategory: "", subCategoryName: "" });
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-[#00A3FF]/20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      
      {/* Header - Same High Visibility Style */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00A3FF] rounded-lg shadow-lg shadow-[#00A3FF]/30">
            <GitBranch size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
              Add Sub Category
            </h3>
            <p className="text-[11px] text-[#00A3FF] font-semibold uppercase tracking-wider">
              Mapping Module
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1.5 bg-[#ef4444] text-white rounded-md hover:bg-red-600 transition-all shadow-md active:scale-90"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-b from-white to-slate-50/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          
          {/* Category Dropdown (Selection Only) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 ml-1">
              <ListFilter size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">
                Select Category
              </label>
            </div>
            <div className="relative">
              <select
                required
                value={formData.parentCategory}
                onChange={(e) => setFormData({...formData, parentCategory: e.target.value})}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 cursor-pointer appearance-none font-medium"
              >
                <option value="" disabled>-- Choose Category --</option>
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* Sub Category Name Input */}
          <div className="space-y-2.5">
            <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest ml-1">
              Sub Category Name
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                required
                value={formData.subCategoryName}
                onChange={(e) => setFormData({...formData, subCategoryName: e.target.value})}
                placeholder="Enter Name..."
                className="flex-1 px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
              />
              
              <button
                type="submit"
                className="px-10 py-3 bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[14px] font-bold rounded-xl transition-all shadow-[0_8px_20px_rgba(0,163,255,0.3)] hover:shadow-[0_12px_25px_rgba(0,163,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 shrink-0"
              >
                Add Record
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddSubCategoryForm;