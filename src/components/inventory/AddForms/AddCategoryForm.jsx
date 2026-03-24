import React, { useState, useEffect } from 'react';
import { X, PlusCircle, LayoutGrid, RefreshCw } from 'lucide-react';

const AddCategoryForm = ({ onAdd, onClose, initialData }) => {
  const [categoryName, setCategoryName] = useState("");

  // ✅ LOGIC: Detect if we are in Edit Mode and populate the field
  useEffect(() => {
    if (initialData) {
      setCategoryName(initialData.name || "");
    } else {
      setCategoryName(""); // Clear for new entries
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    // Passing name back - parent (Category.jsx) handles whether to update or create based on editingItem state
    onAdd({ name: categoryName.trim() });
    
    setCategoryName("");
    onClose(); 
  };

  return (
    <div className="mb-6 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-[#00A3FF]/20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00A3FF] rounded-lg shadow-lg shadow-[#00A3FF]/30">
            {initialData ? <RefreshCw size={18} className="text-white" /> : <PlusCircle size={18} className="text-white" />}
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
              {initialData ? 'Update Category' : 'Add New Category'}
            </h3>
            <p className="text-[11px] text-[#00A3FF] font-semibold uppercase tracking-wider">
              {initialData ? 'Modification Module' : 'Entry Module'}
            </p>
          </div>
        </div>
        
        {/* Red Close Button */}
        <button 
          type="button"
          onClick={onClose}
          className="p-1.5 bg-[#ef4444] text-white rounded-md hover:bg-red-600 transition-all shadow-md active:scale-90"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-b from-white to-slate-50/30">
        <div className="flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1 w-full space-y-2.5">
            <div className="flex items-center gap-2">
              <LayoutGrid size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">
                Category Name
              </label>
            </div>
            
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g. Injections or Chemicals"
              className="w-full px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full md:w-auto px-12 py-3 bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[14px] font-bold rounded-xl transition-all shadow-[0_8px_20px_rgba(0,163,255,0.3)] hover:shadow-[0_12px_25px_rgba(0,163,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
          >
            {initialData ? 'Update Record' : 'Add Record'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;