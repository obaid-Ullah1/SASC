import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save, ChevronDown } from 'lucide-react';

export const CompDoseAmountForm = ({ isOpen, onClose, onSave, editingData, entityName }) => {
  // 1. DATA MAPPING FROM SCREENSHOT
  const companyData = [
    { 
      name: 'Genentech', 
      injections: ['Xolair® (Omalizumab)'] 
    },
    { 
      name: 'Sanofi / Regeneron', 
      injections: ['Dupixent® (Dupilumab)'] 
    },
    { 
      name: 'GlaxoSmithKline (GSK)', 
      injections: ['Nucala® (Mepolizumab)'] 
    },
    { 
      name: 'AstraZeneca', 
      injections: ['Fasenra® (Benralizumab)'] 
    },
    { 
      name: 'Teva Pharmaceuticals', 
      injections: ['Cinqair® (U.S.) / Cinqaero® (EU) (Reslizumab)'] 
    },
    { 
      name: 'Amgen / AstraZeneca', 
      injections: ['Tezspire® (Tezepelumab)'] 
    }
  ];

  const doseOptions = ['100 mg', '150 mg', '300 mg', '600 mg', 'Custom'];

  const defaultFormState = {
    companyName: '',
    injectionName: '',
    dose: '',
    isDefault: false
  };

  const [formData, setFormData] = useState(defaultFormState);
  const [availableInjections, setAvailableInjections] = useState([]);

  // Sync form data when editingData changes
  useEffect(() => {
    if (editingData) {
      setFormData(editingData);
      // Populate injections if editing
      const company = companyData.find(c => c.name === editingData.companyName);
      setAvailableInjections(company ? company.injections : []);
    } else {
      setFormData(defaultFormState);
      setAvailableInjections([]);
    }
  }, [editingData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'companyName') {
      // Find associated injections when company changes
      const selectedCompany = companyData.find(c => c.name === value);
      setAvailableInjections(selectedCompany ? selectedCompany.injections : []);
      
      setFormData(prev => ({
        ...prev,
        companyName: value,
        injectionName: '' // Reset injection when company changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.injectionName || !formData.dose) {
      alert("Please select Company, Injection, and Dose.");
      return;
    }
    onSave(formData);
    setFormData(defaultFormState);
  };

  const selectClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white appearance-none cursor-pointer";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 duration-300 overflow-hidden">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editingData ? <Save size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> : <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />}
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            {editingData ? `Update ${entityName}` : `Add New ${entityName}`}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm">
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 bg-white/50">
        <div className="flex flex-wrap items-end gap-4">
          
          {/* COMPANY NAME DROPDOWN */}
          <div className="flex flex-col flex-1 min-w-[200px] relative">
            <label className={labelClasses}>Company Name</label>
            <div className="relative">
              <select name="companyName" value={formData.companyName} onChange={handleChange} className={selectClasses}>
                <option value="">Select Company</option>
                {companyData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* INJECTION NAME DROPDOWN (DEPENDENT) */}
          <div className="flex flex-col flex-1 min-w-[220px] relative">
            <label className={labelClasses}>Injection Name</label>
            <div className="relative">
              <select 
                name="injectionName" 
                value={formData.injectionName} 
                onChange={handleChange} 
                className={`${selectClasses} ${!formData.companyName ? 'bg-slate-50 cursor-not-allowed opacity-60' : ''}`}
                disabled={!formData.companyName}
              >
                <option value="">Select Injection</option>
                {availableInjections.map(inj => <option key={inj} value={inj}>{inj}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* DOSE DROPDOWN */}
          <div className="flex flex-col w-[160px] relative">
            <label className={labelClasses}>Dose</label>
            <div className="relative">
              <select name="dose" value={formData.dose} onChange={handleChange} className={selectClasses}>
                <option value="">Select Dose</option>
                {doseOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* DEFAULT CHECKBOX */}
          <div className="flex items-center gap-2 h-[42px] px-2 mb-[2px]">
            <input 
              type="checkbox" 
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-5 h-5 text-[#00A3FF] border-2 border-slate-300 rounded focus:ring-4 focus:ring-[#00A3FF]/10 transition-all cursor-pointer"
            />
            <label htmlFor="isDefault" className="text-[12px] font-black text-sky-900 cursor-pointer uppercase tracking-wider">
              Default
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-2">
          <button type="submit" className="bg-[#00A3FF] hover:bg-[#008CE6] text-white px-12 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95">
            {editingData ? 'Save Changes' : 'Add To List'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompDoseAmountForm;