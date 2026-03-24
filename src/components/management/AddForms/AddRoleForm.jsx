import React, { useState, useEffect } from 'react';
import { UserPlus, X, Save, PlusCircle } from 'lucide-react';

const AddRoleForm = ({ onSave, onCancel, initialData }) => {
  // --- 1. STATE FOR FORM FIELDS ---
  const [formData, setFormData] = useState({ 
    roleName: '', 
    description: '' 
  });

  // --- 2. EFFECT FOR EDITING MODE ---
  useEffect(() => {
    if (initialData) {
      setFormData({
        roleName: initialData.roleName || '',
        description: initialData.description || ''
      });
    } else {
      setFormData({ roleName: '', description: '' });
    }
  }, [initialData]);

  // --- 3. SUBMIT HANDLER ---
  const handleSave = (e) => {
    e.preventDefault();
    if (formData.roleName.trim()) {
      onSave(formData);
    }
  };

  // ===== Blueprint Theme Classes =====
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white placeholder:text-slate-400 font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        {/* ===== Blueprint Header ===== */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <UserPlus 
                size={16} 
                className={initialData ? "text-amber-500" : "text-[#00A3FF]"} 
                strokeWidth={2.5} 
              />
            </div>
            <div>
              <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
                {initialData ? 'Edit System Role' : 'Add New System Role'}
              </h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm cursor-pointer"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* ===== Form Body ===== */}
        <form onSubmit={handleSave} className="p-6 bg-white/50">
          <div className="flex flex-col md:flex-row items-end justify-between gap-10 w-full">
            
            {/* Input Selection Group - Large scale preserved */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              
              {/* Role Name Field */}
              <div className="w-full">
                <label className={labelClasses}>
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Administrator"
                  value={formData.roleName}
                  onChange={(e) => setFormData({...formData, roleName: e.target.value})}
                  className={inputClasses}
                  required
                />
              </div>

              {/* Description Field */}
              <div className="w-full">
                <label className={labelClasses}>
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Brief role responsibility..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className={inputClasses}
                />
              </div>

            </div>

            {/* Action Buttons (Far Right) */}
            <div className="flex items-center gap-3 shrink-0">
              <button 
                type="button"
                onClick={onCancel}
                className="h-[42px] px-6 border-2 border-slate-200 text-slate-500 font-bold rounded-lg hover:bg-slate-50 transition-all text-[12px] uppercase tracking-wide cursor-pointer"
              >
                Cancel
              </button>

              <button 
                type="submit"
                className={`${
                  initialData ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-[#00A3FF] hover:bg-[#008CE6] shadow-blue-100'
                } text-white px-10 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-w-[140px]`}
              >
                {initialData ? <Save size={16} strokeWidth={2.5} /> : <PlusCircle size={16} strokeWidth={2.5} />}
                {initialData ? 'Update Role' : 'Save Role'}
              </button>
            </div>
          </div>
          
          <p className="text-[10px] text-slate-400 mt-4 ml-1 italic font-medium">
            Note: Role names should be unique to prevent permission conflicts within the access control list.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddRoleForm;