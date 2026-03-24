import React, { useState } from 'react';
import { X, Plus, Database } from 'lucide-react';

const BaseTypeForm = ({ onClose, onAdd }) => {
  const [baseName, setBaseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baseName.trim()) return;

    onAdd({
      id: Date.now(),
      name: baseName
    });
    
    setBaseName('');
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-lg mb-8 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-400">
      
      {/* Header Section: Light Blue Banner with Mapping Module branding */}
      <div className="bg-[#E0F2FE] px-6 py-3 flex justify-between items-center border-b border-blue-100">
        <div className="flex items-center gap-3">
          {/* Icon Box with shadow matching the design system */}
          <div className="bg-[#0ea5e9] p-1.5 rounded-lg shadow-blue-200 shadow-lg">
            <Database size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#0369a1] font-bold text-[14px] leading-tight tracking-tight">
              Add Base Type
            </h3>
            <span className="text-[10px] text-[#38bdf8] font-black uppercase tracking-widest">
              Mapping Module
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          type="button"
          className="bg-[#ef4444] hover:bg-red-600 text-white rounded-md p-1 transition-all shadow-md active:scale-90"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* Form Section: Single Input Layout based on Base Type structure */}
      <form onSubmit={handleSubmit} className="p-6 flex items-end gap-6 bg-white">
        
        <div className="flex flex-col gap-2 flex-1 max-w-md">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            Base Name
          </label>
          <input
            type="text"
            required
            placeholder="Enter Base Type..."
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder:text-slate-400 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-slate-50/30 focus:bg-white"
          />
        </div>

        {/* Action Button: Consistent Blue Design */}
        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#0086D1] text-white font-black py-2.5 px-10 rounded-xl text-[13px] transition-all flex items-center justify-center gap-2 h-[42px] shadow-lg shadow-blue-100 active:scale-95 border-b-2 border-blue-600/20 uppercase tracking-wide"
        >
          <Plus size={16} strokeWidth={3} />
          Add Record
        </button>
      </form>
    </div>
  );
};

export default BaseTypeForm;