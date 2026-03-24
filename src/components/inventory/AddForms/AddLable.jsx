import React, { useState } from 'react';
import { X, ClipboardCheck } from 'lucide-react';

const AddLable = ({ onClose, onAdd }) => {
  const [label, setLabel] = useState('');
  const [sortOrder, setSortOrder] = useState('15');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;

    onAdd({
      name: label,
      sortOrder: parseInt(sortOrder),
      active: isActive
    });
    setLabel('');
  };

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden mb-6 animate-in fade-in slide-in-from-top-1 duration-300">
      
      {/* Compact Header Section */}
      <div className="flex justify-between items-center px-5 py-3 bg-[#E6F6FF] border-b border-[#D1E9FF]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#00A3FF] rounded-md shadow-md shadow-blue-100 text-white">
            <ClipboardCheck size={16} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-[13px] font-black text-[#004A7C] uppercase tracking-tight leading-none">
              Add Assessment Label
            </h3>
            <p className="text-[9px] text-[#00A3FF] font-bold uppercase tracking-widest mt-0.5 opacity-80">
              Mapping Module
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1 bg-[#FF4D4D] hover:bg-[#FF3333] text-white rounded transition-colors"
        >
          <X size={14} strokeWidth={4} />
        </button>
      </div>

      {/* Sleek Form Body */}
      <form onSubmit={handleSubmit} className="px-6 py-5 flex items-end gap-5 bg-white flex-wrap">
        <div className="flex-[2] min-w-[180px]">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">
            Assessment Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter Name..."
            className="w-full px-4 py-2 bg-slate-50 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/10 focus:border-[#00A3FF] transition-all text-[13px] font-medium text-slate-600 placeholder:text-slate-400 italic"
          />
        </div>
        <div className="w-24">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">
            Sort Order
          </label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/10 focus:border-[#00A3FF] transition-all text-slate-700 font-bold text-[13px] text-center"
          />
        </div>

        {/* Compact Switch Section */}
        <div className="flex items-center gap-2 mb-1.5">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${
              isActive ? 'bg-[#007bff]' : 'bg-[#dc3545]'
            }`}
          >
            <span
              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-[12px] font-bold text-slate-600">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#008be6] text-white px-6 py-2 rounded-lg font-black text-[11px] uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center gap-2 h-[38px] hover:translate-y-[-1px] active:scale-[0.98]"
        >
          <span className="text-base font-light">+</span>
          <span>Add Record</span>
        </button>
      </form>
    </div>
  );
};

export default AddLable;