import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  RefreshCw, 
  Building2, 
  ToggleRight, 
  Save, 
  Plus 
} from 'lucide-react';
import { Switch } from 'devextreme-react';

const OfficeAddForm = ({ onSave, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    officeName: '',
    status: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        officeName: initialData.officeName || '',
        status: initialData.status === 'Active',
      });
    } else {
      setFormData({
        officeName: '',
        status: true,
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
      status: formData.status ? 'Active' : 'Inactive',
    };
    onSave(submitData);
  };

  const inputClasses = "w-full h-[38px] px-3 bg-white border-2 border-slate-200 rounded-lg text-[13px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium";

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
              {initialData ? 'Update Office' : 'Add New Office'}
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
          
          {/* Office Name Field */}
          <div className="flex flex-col gap-1.5 md:col-span-1">
            <div className="flex items-center gap-1.5">
              <Building2 size={13} className="text-[#00A3FF]" />
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Office Name</label>
            </div>
            <input
              type="text"
              value={formData.officeName}
              onChange={(e) => handleFieldChange('officeName', e.target.value)}
              placeholder="e.g. Main Branch"
              className={inputClasses}
              required
              autoFocus
            />
          </div>

          {/* Status & Submit Action */}
          <div className="flex items-end gap-5 h-full md:col-span-2">
            
            {/* Status Switch */}
            <div className="flex flex-col gap-1.5 flex-1 max-w-[200px]">
              <div className="flex items-center gap-1.5">
                <ToggleRight size={13} className="text-[#00A3FF]" />
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Status</label>
              </div>
              <div className="h-[38px] flex items-center gap-3">
                <Switch 
                  value={formData.status} 
                  onValueChange={(v) => handleFieldChange('status', v)} 
                />
                <span className={`text-[12px] font-black uppercase tracking-wider ${formData.status ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="h-[38px] px-8 bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[13px] font-bold rounded-lg transition-all shadow-[0_4px_10px_rgba(0,163,255,0.2)] hover:shadow-[0_6px_15px_rgba(0,163,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
            >
              {initialData ? <Save size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={3} />}
              {initialData ? 'Update Record' : 'Add Record'}
            </button>
          </div>

        </div>
      </form>
      
      <style jsx global>{`
        .dx-switch-on-handle { background-color: #00A3FF !important; }
      `}</style>
    </div>
  );
};

export default OfficeAddForm;