import React, { useState, useEffect } from 'react';
import { X, Plus, Save, Tag, Syringe, Layers, Pencil } from 'lucide-react';

const AddInjectionName = ({ isOpen, onClose, onAdd, onUpdate, editingItem }) => {
  const [formData, setFormData] = useState({
    type: 'Standard',
    injName: '',
    compName: 'SA',
    isActive: true
  });

  // Sync form data when editingItem changes
  useEffect(() => {
    if (editingItem) {
      setFormData({
        type: editingItem.allergen, // Grid uses 'allergen', form uses 'type'
        injName: editingItem.injName,
        compName: editingItem.compName,
        isActive: editingItem.isActive
      });
    } else {
      // Reset if not editing
      setFormData({ type: 'Standard', injName: '', compName: 'SA', isActive: true });
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.injName.trim()) {
      if (editingItem) {
        // Pass updated data back
        onUpdate({
          ...editingItem,
          allergen: formData.type,
          injName: formData.injName,
          compName: formData.compName,
          isActive: formData.isActive
        });
      } else {
        onAdd(formData);
      }
    }
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-4 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editingItem ? <Pencil size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> : <Plus size={16} className="text-[#00A3FF]" strokeWidth={3} />}
          </div>
          <h3 className="font-bold text-sky-900 text-[14px] tracking-wide leading-tight">
            {editingItem ? 'Update Injection Name' : 'Add Inj Name'}
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1">Type</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-9 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all appearance-none bg-white"
              >
                <option value="Standard">Standard</option>
                <option value="Custom">Custom</option>
                <option value="Priority">Priority</option>
                <option value="Mix">Mix</option>
                <option value="Average">Average</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1">Injection Name:</label>
            <div className="relative">
              <Syringe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                required
                value={formData.injName}
                onChange={(e) => setFormData({ ...formData, injName: e.target.value })}
                placeholder="Enter Injection Name"
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-9 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all placeholder:italic placeholder:font-normal"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-slate-700 ml-1">Comp</label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <select
                value={formData.compName}
                onChange={(e) => setFormData({ ...formData, compName: e.target.value })}
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-9 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all appearance-none bg-white"
              >
                <option value="SA">SA</option>
                <option value="SB">SB</option>
                <option value="SC">SC</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-3 flex items-center justify-between h-[40px] pl-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-[#00A3FF] focus:ring-[#00A3FF]"
              />
              <span className="text-[12px] font-bold text-slate-700 group-hover:text-[#00A3FF] transition-colors">Active</span>
            </label>

            <button
              type="submit"
              className="bg-[#007BFF] hover:bg-[#0056b3] text-white h-[40px] w-28 rounded-md text-[13px] font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
            >
              {editingItem ? <><Save size={16} /> Update</> : <><Plus size={16} strokeWidth={3} /> Add</>}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddInjectionName;