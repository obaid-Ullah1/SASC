import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  RefreshCw, 
  Building2, 
  CalendarDays, 
  Save, 
  Plus 
} from 'lucide-react';

const OfficeDayAdd = ({ onSave, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    officeName: '',
    day: '',
  });

  // Mock list of offices to populate the dropdown
  const availableOffices = [
    'Clinic 1', 'Clinic 2', 'Clinic 3', 'Branch 1', 'Branch 2'
  ];

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        officeName: initialData.officeName || '',
        day: initialData.day || '',
      });
    } else {
      setFormData({
        officeName: '',
        day: '',
      });
    }
  }, [initialData]);

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      officeName: formData.officeName,
      day: formData.day,
    };
    onSave(submitData);
  };

  const inputClasses = "w-full h-[38px] px-3 bg-white border-2 border-slate-200 rounded-lg text-[13px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 font-medium appearance-none cursor-pointer";

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#00A3FF]/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 mb-4">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#00A3FF]/10 border-b border-[#00A3FF]/20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#00A3FF] rounded-md shadow-md shadow-[#00A3FF]/30">
            {initialData ? <RefreshCw size={16} className="text-white" /> : <PlusCircle size={16} className="text-white" />}
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-slate-800 tracking-tight leading-none">
              {initialData ? 'Update Office Day' : 'Add Office Day'}
            </h3>
            <p className="text-[10px] text-[#00A3FF] font-bold uppercase tracking-wider mt-0.5">
              {initialData ? 'Modification Module' : 'Entry Module'}
            </p>
          </div>
        </div>
        
        <button 
          type="button"
          onClick={onClose}
          className="p-1.5 bg-slate-100 text-slate-500 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="flex flex-col bg-gradient-to-b from-white to-slate-50/30">
        
        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
          
          {/* Office Selection */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <Building2 size={13} className="text-[#00A3FF]" />
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Select Office</label>
            </div>
            <div className="relative">
              <select
                value={formData.officeName}
                onChange={(e) => handleFieldChange('officeName', e.target.value)}
                className={inputClasses}
                required
                autoFocus
              >
                <option value="" disabled>-- Select an Office --</option>
                {availableOffices.map((office, idx) => (
                  <option key={idx} value={office}>{office}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Day Selection */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <CalendarDays size={13} className="text-[#00A3FF]" />
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Working Day</label>
            </div>
            <div className="relative">
              <select
                value={formData.day}
                onChange={(e) => handleFieldChange('day', e.target.value)}
                className={inputClasses}
                required
              >
                <option value="" disabled>-- Select a Day --</option>
                {daysOfWeek.map((day, idx) => (
                  <option key={idx} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-end h-full">
            <button
              type="submit"
              className="h-[38px] px-8 w-full md:w-auto bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[13px] font-bold rounded-lg transition-all shadow-[0_4px_10px_rgba(0,163,255,0.2)] hover:shadow-[0_6px_15px_rgba(0,163,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
            >
              {initialData ? <Save size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={3} />}
              {initialData ? 'Update Record' : 'Add Record'}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default OfficeDayAdd;