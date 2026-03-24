import React, { useState } from 'react';
import { X, Link2 } from 'lucide-react';

const MapAssessment = ({ onClose, onAdd }) => {
  const [assessment, setAssessment] = useState('');
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ assessment, type, active: isActive });
  };

  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] shadow-sm overflow-hidden mb-6 animate-in fade-in slide-in-from-top-1 duration-300">
      
      {/* Precision Header */}
      <div className="flex justify-between items-center px-5 py-2.5 bg-[#E6F6FF] border-b border-[#D1E9FF]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#00A3FF] rounded-md shadow-md shadow-blue-100 text-white">
            <Link2 size={14} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-[12px] font-black text-[#004A7C] uppercase tracking-tight leading-none">
              Map Assessment
            </h3>
            <p className="text-[9px] text-[#00A3FF] font-bold uppercase tracking-widest mt-0.5 opacity-80">
              Mapping Module
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1 bg-[#FF4D4D] hover:bg-[#FF3333] text-white rounded transition-colors shadow-sm"
        >
          <X size={12} strokeWidth={4} />
        </button>
      </div>

      {/* Professional Thin Form Body */}
      <form onSubmit={handleSubmit} className="px-6 py-4 flex items-end gap-5 bg-white">
        
        {/* Assessment Select */}
        <div className="flex-[2]">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">
            Assessment
          </label>
          <select
            value={assessment}
            onChange={(e) => setAssessment(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-50 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/10 focus:border-[#00A3FF] transition-all text-[12px] font-medium text-slate-600 outline-none appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', paddingRight: '2.5rem' }}
          >
            <option value="">Select assessments...</option>
            <option value="1">Initial Evaluation</option>
            <option value="2">Follow-up Check</option>
          </select>
        </div>

        {/* Type Select */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 ml-0.5">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-50 border border-[#e2e8f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A3FF]/10 focus:border-[#00A3FF] transition-all text-[12px] font-medium text-slate-600 cursor-pointer outline-none appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', paddingRight: '2.5rem' }}
          >
            <option value="">Select</option>
            <option value="A">PRE</option>
            <option value="B">POST</option>
          </select>
        </div>

        {/* The Professional Toggle Switch */}
        <div className="flex items-center gap-2 mb-1.5 px-2">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className={`relative inline-flex h-4.5 w-8.5 items-center rounded-full transition-colors focus:outline-none ${
              isActive ? 'bg-[#007bff]' : 'bg-[#dc3545]'
            }`}
          >
            <span
              className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                isActive ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-[11px] font-bold text-slate-600 min-w-[45px]">
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Thin Vibrant Blue Button */}
        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#008be6] text-white px-6 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center justify-center gap-2 h-[34px] hover:translate-y-[-1px] active:scale-[0.98]"
        >
          <span className="text-sm font-light">+</span>
          <span>Add Record</span>
        </button>
      </form>
    </div>
  );
};

export default MapAssessment;