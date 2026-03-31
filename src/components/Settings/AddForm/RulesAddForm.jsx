import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save } from 'lucide-react';

const RulesAddForm = ({ isOpen, onClose, onAdd, initialValue = '', isEditing = false }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  // Sync input value when initialValue changes (for editing)
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue(''); 
    }
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden">
      
      {/* HEADER: Adjusted padding and text size for mobile */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-4 sm:px-5 py-2.5 flex items-center justify-between border-b border-sky-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100 shrink-0">
            {isEditing ? <Save size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> : <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />}
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold text-sky-900 text-[12px] sm:text-[13px] tracking-wide uppercase leading-tight">
              {isEditing ? 'Update Rule Name' : 'Create New Rule'}
            </h3>
          </div>
        </div>
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm shrink-0"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY: Added flex-col for mobile stacking, flex-row for desktop */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 bg-white/50">
        <input
          type="text"
          placeholder="e.g. SAER-X"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          className="w-full sm:flex-1 h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[14px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
        />
        <button 
          type="submit" 
          className="w-full sm:w-auto bg-[#00A3FF] hover:bg-[#008CE6] text-white px-8 sm:px-12 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 shrink-0"
        >
          {isEditing ? 'Save Changes' : 'Add To List'}
        </button>
      </form>
      
    </div>
  );
};

export default RulesAddForm;