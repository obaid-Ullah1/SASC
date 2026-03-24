import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save, FileText, Edit } from 'lucide-react';

const AddRuleName = ({ isOpen, onClose, onAdd, editData }) => {
  const [ruleName, setRuleName] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Sync form with editData when editing
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setRuleName(editData.ruleName || '');
        setIsActive(editData.status === 'Active');
      } else {
        // Reset to default for Add Mode
        setRuleName('');
        setIsActive(true);
      }
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ruleName.trim()) return;

    // Pass data back to parent
    onAdd({ ruleName, status: isActive ? 'Active' : 'Inactive' });
  };

  return (
    // CONTAINER: Sky blue theme with professional shadow and animation
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg m-4 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden shrink-0">
      
      {/* HEADER: Sky Blue Gradient */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editData ? (
              <Edit size={16} className="text-amber-500" strokeWidth={2.5} />
            ) : (
              <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            )}
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            {editData ? 'Update Rule Name Record' : 'Create New Grouping Rule Name'}
          </h3>
        </div>
        
        {/* Professional Close Button */}
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
          
          {/* Rule Name Input */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-1.5">
            <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Rule Name</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="e.g. Standard Injection Rule..."
                className="w-full h-[40px] border-2 border-slate-200 rounded-lg pl-10 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all"
                autoFocus
              />
            </div>
          </div>

          {/* STATUS TOGGLE: More professional than a checkbox */}
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`h-[40px] px-5 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 border-2 ${
              isActive 
                ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {isActive ? 'Active' : 'Inactive'}
          </button>

          {/* SAVE BUTTON: Dynamic styling based on Add vs Edit */}
          <button
            type="submit"
            className={`h-[40px] w-40 rounded-lg text-[12px] font-black uppercase tracking-wider text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 ${
              editData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00A3FF] hover:bg-[#008CE6]'
            }`}
          >
            <Save size={14} strokeWidth={3} /> 
            {editData ? 'Update Rule' : 'Save Rule'}
          </button>

        </div>
      </form>
    </div>
  );
};

export default AddRuleName;