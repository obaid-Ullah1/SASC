import React, { useState } from 'react';
import { UserPlus, ShieldCheck, Lock, UserCircle, CheckCircle2, Shield, Send } from 'lucide-react';
import { TextBox, SelectBox } from 'devextreme-react';

const CreateUser = () => {
  // --- 1. INITIAL STATE ---
  const initialFormState = {
    fullName: '',
    email: '',
    roleId: null,
    officeId: null,
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // --- 2. HANDLERS ---
  const handleDiscard = () => {
    setFormData(initialFormState);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- Theme Tokens ---
  const headerGradient = "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)";

  const roles = [
    { id: 1, name: 'Provider' },
    { id: 2, name: 'PK Staff' },
    { id: 3, name: 'Administrator' }
  ];

  const offices = [
    { id: 0, name: 'All Offices / Admin' },
    { id: 1, name: 'Merced' },
    { id: 2, name: 'Fresno South' },
    { id: 3, name: 'Telemedicine' }
  ];

  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-[0.1em] block ml-1 transition-colors";

  return (
    <div className="w-full min-h-screen bg-[#F1F5F9] p-4 md:p-8 flex flex-col items-center font-sans relative overflow-hidden">
      
      {/* Decorative Vibe Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-5xl bg-white border-2 border-sky-100 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,163,255,0.15)] overflow-hidden animate-in fade-in zoom-in-95 duration-1000 relative z-10">
        
        {/* ===== Header ===== */}
        <div 
          className="px-8 py-6 flex items-center justify-between border-b border-sky-100 relative overflow-hidden"
          style={{ background: headerGradient }}
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-white p-3 rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,163,255,0.2)] flex items-center justify-center border border-sky-50 group hover:rotate-[360deg] transition-transform duration-700">
              <UserPlus size={24} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-sky-900 font-black text-xl md:text-2xl uppercase tracking-tighter leading-none">
                Create User Account
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                 <div className="h-1 w-12 bg-[#00A3FF] rounded-full animate-pulse" />
                 <p className="text-sky-700/60 text-[10px] font-black uppercase tracking-[0.2em]">Identity Enrollment Gateway</p>
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white shadow-sm">
             <Shield size={16} className="text-emerald-500 animate-bounce" />
             <span className="text-[11px] font-black text-slate-600 uppercase tracking-tight">Encryption Active</span>
          </div>
        </div>

        {/* ===== Form Body ===== */}
        <div className="p-8 md:p-12 bg-gradient-to-b from-white to-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            
            {/* Section: Personal */}
            <div className="col-span-full">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-[#00A3FF]"><UserCircle size={18} /></div>
                  <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest">Personal Information</h3>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-sky-100 to-transparent ml-2" />
               </div>
            </div>

            <div className="w-full">
              <label className={labelClasses}>Full Legal Name <span className="text-red-500">*</span></label>
              <TextBox 
                value={formData.fullName}
                onValueChange={(v) => handleInputChange('fullName', v)}
                placeholder="John Doe" 
                height={46} 
                className="blueprint-input-fancy" 
                stylingMode="outlined" 
              />
            </div>

            <div className="w-full">
              <label className={labelClasses}>Corporate Email <span className="text-red-500">*</span></label>
              <TextBox 
                value={formData.email}
                onValueChange={(v) => handleInputChange('email', v)}
                placeholder="j.doe@company.com" 
                height={46} 
                className="blueprint-input-fancy" 
              />
            </div>

            {/* Section: Access */}
            <div className="col-span-full mt-4">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500"><ShieldCheck size={18} /></div>
                  <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest">Access Control</h3>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-100 to-transparent ml-2" />
               </div>
            </div>

            <div className="w-full">
              <label className={labelClasses}>System Role <span className="text-red-500">*</span></label>
              <SelectBox 
                dataSource={roles} 
                displayExpr="name" 
                valueExpr="id" 
                value={formData.roleId}
                onValueChange={(v) => handleInputChange('roleId', v)}
                placeholder="Select Privileges" 
                height={46} 
                className="blueprint-input-fancy" 
              />
            </div>

            <div className="w-full">
              <label className={labelClasses}>Primary Office Location <span className="text-red-500">*</span></label>
              <SelectBox 
                dataSource={offices} 
                displayExpr="name" 
                valueExpr="id" 
                value={formData.officeId}
                onValueChange={(v) => handleInputChange('officeId', v)}
                placeholder="Assign Station" 
                height={46} 
                className="blueprint-input-fancy" 
              />
            </div>

            {/* Section: Security */}
            <div className="col-span-full mt-4">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500"><Lock size={18} /></div>
                  <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-widest">Security Credentials</h3>
                  <div className="flex-1 h-[2px] bg-gradient-to-r from-amber-100 to-transparent ml-2" />
               </div>
            </div>

            <div className="w-full">
              <label className={labelClasses}>Initial Password <span className="text-red-500">*</span></label>
              <TextBox 
                mode="password" 
                value={formData.password}
                onValueChange={(v) => handleInputChange('password', v)}
                placeholder="••••••••" 
                height={46} 
                className="blueprint-input-fancy" 
              />
            </div>

            <div className="w-full">
              <label className={labelClasses}>Confirm Password <span className="text-red-500">*</span></label>
              <TextBox 
                mode="password" 
                value={formData.confirmPassword}
                onValueChange={(v) => handleInputChange('confirmPassword', v)}
                placeholder="••••••••" 
                height={46} 
                className="blueprint-input-fancy" 
              />
            </div>
          </div>
        </div>

        {/* ===== Action Footer ===== */}
        <div className="px-10 py-8 bg-slate-50/80 backdrop-blur-md border-t border-sky-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white rounded-full border border-sky-200 shadow-inner">
               <CheckCircle2 size={16} className="text-emerald-500" />
             </div>
             <p className="text-[12px] text-slate-500 font-bold max-w-xs leading-tight">
               Verified accounts will receive an invitation email immediately.
             </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button 
              type="button"
              onClick={handleDiscard} // Clears the form
              className="flex-1 md:flex-none h-[42px] px-8 border-2 border-slate-200 text-slate-500 font-black rounded-xl hover:bg-white hover:text-slate-800 hover:border-slate-300 transition-all text-[11px] uppercase tracking-widest cursor-pointer active:scale-95"
            >
              Discard
            </button>
            <button 
              type="button"
              className="flex-1 md:flex-none h-[42px] px-10 bg-[#00A3FF] hover:bg-[#008CE6] text-white font-black rounded-xl shadow-[0_8px_16px_-4px_rgba(0,163,255,0.4)] transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 text-[13px] uppercase tracking-widest cursor-pointer group"
            >
              <Send size={16} strokeWidth={3} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Confirm
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .blueprint-input-fancy {
          border-radius: 12px !important;
          border: 2px solid #E2E8F0 !important;
          background: white !important;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .blueprint-input-fancy.dx-state-hover { border-color: #BFDBFE !important; }
        .blueprint-input-fancy.dx-state-focused {
          border-color: #00A3FF !important;
          box-shadow: 0 10px 25px -10px rgba(0, 163, 255, 0.25) !important;
          transform: translateY(-1px);
        }
        .dx-texteditor-input { padding-left: 18px !important; font-weight: 800 !important; color: #1e293b !important; font-size: 14px !important; }
        .dx-placeholder { font-size: 14px !important; font-weight: 600 !important; padding-left: 18px !important; color: #94A3B8 !important; opacity: 0.6; }
      `}</style>
    </div>
  );
};

export default CreateUser;