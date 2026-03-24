import React, { useState, useEffect } from 'react';
import { X, Plus, Database, RefreshCw } from 'lucide-react';

const BaseTypeForm = ({ onClose, onAdd, initialData }) => {
  const [baseName, setBaseName] = useState('');

  // ✅ LOGIC: Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setBaseName(initialData.name || '');
    } else {
      setBaseName(''); // Clear for fresh add
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baseName.trim()) return;

    // Passing name back to parent persistence logic
    onAdd({ name: baseName.trim() });
    
    setBaseName('');
    onClose(); 
  };

  return (
    <div className="w-full bg-white border-2 border-slate-300 rounded-xl shadow-lg mb-8 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-400">
      
      {/* Header Section: Professional Blue Banner */}
      <div className="bg-[#E0F2FE] px-6 py-3 flex justify-between items-center border-b-2 border-slate-300">
        <div className="flex items-center gap-3">
          <div className="bg-[#0ea5e9] p-1.5 rounded-lg shadow-blue-200 shadow-lg">
            {/* ✅ LOGIC: Dynamic Icon */}
            {initialData ? <RefreshCw size={18} className="text-white" /> : <Database size={18} className="text-white" />}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#0369a1] font-bold text-[14px] leading-tight tracking-tight uppercase">
              {initialData ? 'Update Base Type' : 'Add Base Type'}
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

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="p-6 flex items-end gap-6 bg-white">
        
        <div className="flex flex-col gap-2 flex-1 max-w-md">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-1.5 ml-1">
            Base Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Recipe Based or Custom Based"
            value={baseName}
            onChange={(e) => setBaseName(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 placeholder:text-slate-400 placeholder:italic focus:outline-none focus:border-[#00A3FF] transition-all bg-slate-50/30 focus:bg-white"
            autoFocus
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#0086D1] text-white font-black py-2.5 px-10 rounded-xl text-[12px] transition-all flex items-center justify-center gap-2 h-[42px] shadow-lg shadow-blue-100 active:scale-95 uppercase tracking-widest"
        >
          {initialData ? <RefreshCw size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
          {initialData ? 'Update Record' : 'Add Record'}
        </button>
      </form>
    </div>
  );
};

export default BaseTypeForm;