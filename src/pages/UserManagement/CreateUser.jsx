import React, { useState } from 'react';
import { UserPlus, User, Mail, Shield, Building2, Lock, Send, ShieldCheck } from 'lucide-react';
import { TextBox, SelectBox } from 'devextreme-react';

// ✅ Imported Global Success Popup
import SuccessPopup from '../../components/global/SuccessPopup';

const CreateUser = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: null,
    office: null,
    password: '',
    confirmPassword: ''
  });

  // ✅ Success Popup State
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ✅ Handle Registration Click
  const handleRegister = () => {
    // Add your logic to save user data here
    setShowSuccess(true);
  };

  const roles = [
    { id: 1, name: 'Administrator' },
    { id: 2, name: 'Provider' },
    { id: 3, name: 'Staff' }
  ];

  const offices = [
    { id: 0, name: 'All Offices / Admin' },
    { id: 1, name: 'Main Clinic' },
    { id: 2, name: 'Branch Office' }
  ];

  const labelStyle = "text-[12px] font-bold text-slate-500 mb-1.5 flex items-center gap-2 ml-1 uppercase tracking-wider transition-colors group-hover:text-[#00A3FF]";

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-6 flex justify-center items-start font-sans selection:bg-[#00A3FF]/20">
      
      {/* CARD WITH TRENDING LIFT & SHADOW EFFECT */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,163,255,0.15)] hover:-translate-y-1 animate-in fade-in duration-700">
        
        {/* HEADER - OFFICIAL BLUE GRADIENT */}
        <div className="bg-gradient-to-r from-[#00A3FF] to-[#0077FF] px-8 py-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10" />
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shadow-xl">
              <UserPlus size={24} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight leading-none uppercase">Create New User</h3>
              <p className="text-blue-50 text-[11px] font-medium uppercase tracking-[0.15em] mt-2 opacity-80">Access Control & Identity Management</p>
            </div>
          </div>
        </div>

        {/* FORM BODY */}
        <div className="p-8 md:p-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            
            {/* PERSONAL SECTION */}
            <div className="space-y-6">
              <div className="group">
                <label className={labelStyle}><User size={14} /> Full Name</label>
                <TextBox 
                  value={formData.fullName}
                  onValueChange={(v) => handleInputChange('fullName', v)}
                  placeholder="e.g. John Doe" 
                  height={40} 
                  className="clean-trending-input"
                />
              </div>

              <div className="group">
                <label className={labelStyle}><Mail size={14} /> Corporate Email</label>
                <TextBox 
                  value={formData.email}
                  onValueChange={(v) => handleInputChange('email', v)}
                  placeholder="name@organization.com" 
                  height={40} 
                  className="clean-trending-input"
                />
              </div>
            </div>

            {/* ACCESS SECTION */}
            <div className="space-y-6">
              <div className="group">
                <label className={labelStyle}><Shield size={14} /> System Role</label>
                <SelectBox 
                  dataSource={roles}
                  displayExpr="name"
                  valueExpr="id"
                  placeholder="Select access level"
                  height={40}
                  className="clean-trending-input"
                />
              </div>

              <div className="group">
                <label className={labelStyle}><Building2 size={14} /> Assigned Office</label>
                <SelectBox 
                  dataSource={offices}
                  displayExpr="name"
                  valueExpr="id"
                  placeholder="Assign a workstation"
                  height={40}
                  className="clean-trending-input"
                />
              </div>
            </div>

            {/* SECURITY SECTION */}
            <div className="col-span-full pt-6 mt-4">
               <div className="flex items-center gap-4 mb-8">
                 <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-200 flex-1" />
                 <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 shadow-sm animate-pulse">
                    <Lock size={14} className="text-[#00A3FF]" />
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Security Credentials</span>
                 </div>
                 <div className="h-px bg-gradient-to-l from-transparent via-slate-200 to-slate-200 flex-1" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto">
                  <div className="group">
                    <label className={labelStyle}><ShieldCheck size={14} /> Password</label>
                    <TextBox 
                      mode="password"
                      placeholder="••••••••"
                      height={40}
                      className="clean-trending-input"
                    />
                  </div>
                  <div className="group">
                    <label className={labelStyle}><ShieldCheck size={14} /> Confirm Password</label>
                    <TextBox 
                      mode="password"
                      placeholder="••••••••"
                      height={40}
                      className="clean-trending-input"
                    />
                  </div>
               </div>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
               <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                 Encryption standard: <span className="text-slate-600 font-bold">AES-256 Bit</span>
               </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-colors">
                Discard
              </button>
              
              {/* ✅ Button with handleRegister click */}
              <button 
                onClick={handleRegister}
                className="flex-1 md:flex-none h-[42px] px-10 bg-[#00A3FF] hover:bg-[#0081FF] text-white text-[13px] font-bold rounded-xl shadow-[0_10px_20px_-5px_rgba(0,163,255,0.4)] transition-all active:scale-95 flex items-center justify-center gap-3 group"
              >
                <span className="uppercase tracking-widest">Register User</span>
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ✅ SUCCESS POPUP COMPONENT */}
      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message="User account has been created successfully!" 
      />

      <style jsx global>{`
        .clean-trending-input {
          border-radius: 10px !important;
          border: 2px solid #F1F5F9 !important;
          background: #F8FAFC !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .clean-trending-input.dx-state-hover {
          border-color: #E2E8F0 !important;
          background: #FFFFFF !important;
        }
        .clean-trending-input.dx-state-focused {
          border-color: #00A3FF !important;
          background: #FFFFFF !important;
          box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1) !important;
          transform: translateY(-1px);
        }
        .dx-texteditor-input { 
          padding-left: 14px !important; 
          font-weight: 500 !important; 
          color: #334155 !important; 
          font-size: 14px !important; 
        }
        .dx-placeholder { 
          font-size: 14px !important; 
          font-weight: 400 !important; 
          padding-left: 14px !important; 
          color: #94A3B8 !important; 
        }
      `}</style>
    </div>
  );
};

export default CreateUser;