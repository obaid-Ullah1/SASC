import React, { useState, useEffect } from 'react';
import { X, PlusCircle, User, CreditCard, Calendar, ChevronDown, Save } from 'lucide-react';

const AddPersonForm = ({ onCancel, onAdd, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    fullName: '',
    dob: '',
    gender: '',
    cnic: '',
    classification: ''
  });

  // --- FUNCTIONALITY: Pre-fill form if editing ---
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ firstName: '', lastName: '', fullName: '', dob: '', gender: '', cnic: '', classification: '' });
    }
  }, [initialData]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      fullName: `${prev.firstName} ${prev.lastName}`.trim()
    }));
  }, [formData.firstName, formData.lastName]);

  const handleInputChange = (e, fieldLabel) => {
    const value = e.target.value;
    const keyMap = {
      'First Name': 'firstName',
      'Last Name': 'lastName',
      'Date of Birth': 'dob',
      'Gender': 'gender',
      'CNIC / Identity': 'cnic',
      'Classification': 'classification'
    };
    const key = keyMap[fieldLabel];
    if (key) setFormData(prev => ({ ...prev, [key]: value }));
  };

  const formFields = [
    { label: 'First Name', placeholder: 'Enter first name', type: 'text', value: formData.firstName },
    { label: 'Last Name', placeholder: 'Enter last name', type: 'text', value: formData.lastName },
    { label: 'Full Name', placeholder: 'Generated automatically', type: 'text', disabled: true, value: formData.fullName },
    { label: 'Date of Birth', type: 'date', icon: <Calendar size={16} className="text-slate-400" />, value: formData.dob },
    { label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], value: formData.gender },
    { label: 'CNIC / Identity', placeholder: '00000-0000000-0', type: 'text', icon: <CreditCard size={16} className="text-slate-400" />, value: formData.cnic },
    { label: 'Classification', type: 'select', options: ['Staff Member', 'External Client'], value: formData.classification },
  ];

  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white placeholder:text-slate-400 placeholder:font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              {initialData ? <Save size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> : <User size={16} className="text-[#00A3FF]" strokeWidth={2.5} />}
            </div>
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              {initialData ? "Update Profile" : "Create New Profile"}
            </h3>
          </div>
          <button type="button" onClick={onCancel} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm">
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 bg-white/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
            
            {formFields.map((field, idx) => (
              <div key={idx} className={`flex flex-col relative ${field.disabled ? 'opacity-60' : ''}`}>
                <label className={labelClasses}>{field.label}</label>
                <div className="relative">
                  {field.type === 'select' ? (
                    <>
                      <select 
                        className={`${inputClasses} appearance-none cursor-pointer`}
                        value={field.value}
                        onChange={(e) => handleInputChange(e, field.label)}
                      >
                        <option value="">Select...</option>
                        {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
                    </>
                  ) : (
                    <>
                      <input 
                        disabled={field.disabled}
                        type={field.type} 
                        placeholder={field.placeholder} 
                        value={field.value}
                        onChange={(e) => handleInputChange(e, field.label)}
                        className={inputClasses} 
                      />
                      {field.icon && <div className="absolute right-3 top-3 pointer-events-none">{field.icon}</div>}
                    </>
                  )}
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-end h-full">
              <button 
                onClick={() => onAdd(formData)}
                className="bg-[#00A3FF] hover:bg-[#008CE6] text-white w-full h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {initialData ? <Save size={16} strokeWidth={2.5} /> : <PlusCircle size={16} strokeWidth={2.5} />}
                {initialData ? "Update" : "Register"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPersonForm;