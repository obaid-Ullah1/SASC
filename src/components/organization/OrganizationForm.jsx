import React, { useState, useEffect } from 'react';
import { Building2, Hash, Mail, Phone, MapPin, PlusCircle, CheckCircle2, X, RefreshCw } from 'lucide-react';

// ✅ NEW: Added initialData prop
const OrganizationForm = ({ onSave, onClose, initialData }) => {
  const defaultState = { name: '', code: '', email: '', phone: '', address: '', isActive: true };
  const [formData, setFormData] = useState(defaultState);

  // ✅ NEW: Watch for initialData. If it exists, populate the form. If not, clear it.
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultState);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!formData.name) return; 
    onSave && onSave(formData); // Send data back to page
  };

  return (
    <div className="mb-6 bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-[#00A3FF]/20 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      
      <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00A3FF] rounded-lg shadow-lg shadow-[#00A3FF]/30">
            {/* ✅ DYNAMIC ICON */}
            {initialData ? <RefreshCw size={18} className="text-white" /> : <Building2 size={18} className="text-white" />}
          </div>
          <div>
            {/* ✅ DYNAMIC TITLES */}
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
              {initialData ? 'Update Organization' : 'Organization Management'}
            </h3>
            <p className="text-[11px] text-[#00A3FF] font-semibold uppercase tracking-wider">
              {initialData ? 'Modification Module' : 'Entry Module'}
            </p>
          </div>
        </div>

        <button 
          type="button"
          onClick={onClose}
          className="p-1.5 bg-[#ef4444] text-white rounded-md hover:bg-red-600 transition-all shadow-md active:scale-90"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-b from-white to-slate-50/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
          
          <div className="space-y-2.5 flex flex-col">
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">Organization Name</label>
            </div>
            <input 
              type="text"
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="Enter organization name" 
              className="w-full px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
            />
          </div>
          
          <div className="space-y-2.5 flex flex-col">
            <div className="flex items-center gap-2">
              <Hash size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">Code</label>
            </div>
            <input 
              type="text"
              value={formData.code} 
              onChange={(e) => setFormData({...formData, code: e.target.value})} 
              placeholder="ORG Code" 
              className="w-full px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
            />
          </div>

          <div className="space-y-2.5 flex flex-col">
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">Email</label>
            </div>
            <input 
              type="email"
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              placeholder="Email address" 
              className="w-full px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
            />
          </div>

          <div className="space-y-2.5 flex flex-col">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">Phone</label>
            </div>
            <input 
              type="text"
              value={formData.phone} 
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              placeholder="Phone number" 
              className="w-full px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
            />
          </div>

          <div className="md:col-span-4 space-y-2.5 flex flex-col">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#00A3FF]" />
              <label className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">Address</label>
            </div>
            <input 
              type="text"
              value={formData.address} 
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
              placeholder="Full address" 
              className="w-full px-5 py-3 bg-white border-2 border-slate-200 rounded-xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-end justify-between">
          
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-slate-400" />
              <span className="text-[12px] font-extrabold text-slate-700 uppercase tracking-widest">Status</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded-md checked:bg-[#00A3FF] checked:border-[#00A3FF] transition-all cursor-pointer group-hover:border-[#00A3FF]"
                />
                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <span className="text-[14px] font-bold text-slate-700 select-none group-hover:text-[#00A3FF] transition-colors">Active Account</span>
            </label>
          </div>
          
          <button 
            type="submit"
            className="px-12 py-3 bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[14px] font-bold rounded-xl transition-all shadow-[0_8px_20px_rgba(0,163,255,0.3)] hover:shadow-[0_12px_25px_rgba(0,163,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
          >
            {/* ✅ DYNAMIC BUTTON TEXT & ICON */}
            {initialData ? (
              <><RefreshCw size={18} strokeWidth={2.5} /> Update Record</>
            ) : (
              <><PlusCircle size={18} strokeWidth={2.5} /> Add Record</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationForm;