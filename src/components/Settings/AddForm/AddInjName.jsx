import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save, Tag, Code, Pencil } from 'lucide-react';

const AddInjName = ({ isOpen, onClose, onAdd, onUpdate, editingItem }) => {
  const [formData, setFormData] = useState({
    typeName: '',
    code: '',
    isCat: true
  });

  const isEditing = !!editingItem;

  // Sync form state when editingItem changes or form opens
  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setFormData({
          typeName: editingItem.typeName || '',
          code: editingItem.code || '',
          isCat: editingItem.isCat ?? true
        });
      } else {
        // Reset for a fresh Add
        setFormData({ typeName: '', code: '', isCat: true });
      }
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.typeName.trim() && formData.code.trim()) {
      if (isEditing) {
        onUpdate(formData);
      } else {
        onAdd(formData);
      }
    }
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {isEditing ? (
              <Pencil size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            ) : (
              <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            )}
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            {isEditing ? 'Update Injection Type' : 'Create New Injection Type'}
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
        <div className="flex flex-wrap md:flex-nowrap items-end gap-6">
          
          {/* Type Name Input */}
          <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Type Name</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={formData.typeName}
                onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                placeholder="Enter Injection Type..."
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-10 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
              />
            </div>
          </div>

          {/* Code Input */}
          <div className="w-full md:w-40 flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">code</label>
            <div className="relative">
              <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="Enter Ref Code..."
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-10 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all uppercase"
              />
            </div>
          </div>

          {/* IsCat Toggle */}
          <div className="flex items-center h-[40px] px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.isCat}
                onChange={(e) => setFormData({ ...formData, isCat: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-[#00A3FF] focus:ring-[#00A3FF]"
              />
              <span className="text-[12px] font-black text-slate-600 group-hover:text-[#00A3FF] transition-colors uppercase tracking-tight">ISCAT</span>
            </label>
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            className="bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[40px] w-40 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0"
          >
            <Save size={14} strokeWidth={3} /> {isEditing ? 'Update Type' : 'Save Type'}
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddInjName;