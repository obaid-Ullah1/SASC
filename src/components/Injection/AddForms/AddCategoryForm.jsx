import React, { useState } from 'react';
import { X, PlusCircle, Save, Tag } from 'lucide-react';

const AddCategoryForm = ({ isOpen, onClose, onAdd }) => {
  const [categoryName, setCategoryName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return; 
    
    onAdd({ name: categoryName });
    setCategoryName('');
  };

  return (
    // Applied the exact outer container styles (thicker border, shadow, animation)
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* HEADER: Light sky gradient */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            Create New Category
          </h3>
        </div>
        
        {/* Exact Close Button logic */}
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY: Added the white/50 bg */}
      <form onSubmit={handleSubmit} className="p-5 bg-white/50">
        <div className="flex flex-wrap md:flex-nowrap items-end gap-6">
          
          {/* Category Input Area */}
          <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
            {/* Exact Label Styling */}
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Category Name</label>
            
            {/* Input with Icon and Thick Borders */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Enter Test Category..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-10 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* EXACT SAVE BUTTON styling (Blue, fixed width, uppercase) */}
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[40px] w-40 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <Save size={14} strokeWidth={3} /> Save
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;