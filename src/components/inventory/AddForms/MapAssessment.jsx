import React, { useState, useRef, useEffect } from 'react';
import { X, Link2, ChevronDown, Check, Zap, Activity, ShieldCheck } from 'lucide-react';

const MapAssessment = ({ onClose, onAdd, initialData }) => {
  const [selectedAssessments, setSelectedAssessments] = useState([]);
  const [type, setType] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const ASSESSMENT_OPTIONS = [
    "Antihistamir", "Coughing", "Hives", "Itching", "Ithchi Eyes", 
    "Left Before Time", "New Medication", "Runny Nose", "Sneezing", 
    "Tightness in chest", "Watery Eyes", "Wheezing"
  ];

  const TYPE_OPTIONS = [
    { value: 'pre', label: 'PRE-Treatment' },
    { value: 'post', label: 'POST-Treatment' },
    { value: 'rxn', label: 'Reaction (RXN)' },
    { value: 'inj', label: 'Injection (INJ)' }
  ];

  // ✅ LOGIC: Fetch data for Edit Mode
  useEffect(() => {
    if (initialData) {
      // Split "Coughing, Hives" back into ["Coughing", "Hives"]
      const items = initialData.name ? initialData.name.split(', ') : [];
      setSelectedAssessments(items);
      setType(initialData.type?.toLowerCase() || '');
      setIsActive(initialData.active ?? true);
    } else {
      // Reset for Add Mode
      setSelectedAssessments([]);
      setType('');
      setIsActive(true);
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleAssessment = (option) => {
    setSelectedAssessments(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };

  const removeAssessment = (e, option) => {
    e.stopPropagation();
    setSelectedAssessments(prev => prev.filter(item => item !== option));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAssessments.length === 0 || !type) return;
    onAdd({ 
      name: selectedAssessments.join(', '), 
      type: type.toUpperCase(), 
      active: isActive 
    });
    onClose();
  };

  return (
    <div className="relative z-[100] bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] mb-10 overflow-visible animate-in fade-in zoom-in-95 duration-300">
      
      {/* 💎 Premium Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-[#00A3FF] rounded-xl shadow-[0_8px_16px_rgba(0,163,255,0.3)] text-white">
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-[15px] font-extrabold text-slate-800 uppercase tracking-tight">
              {/* Dynamic Title based on mode */}
              {initialData ? 'Update Mapping' : 'Assessment Mapping'}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-2 h-2 rounded-full animate-pulse ${initialData ? 'bg-amber-500' : 'bg-green-500'}`}></span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Configuration Portal</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="group p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-xl transition-all duration-200"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* 🚀 Modern Form Body */}
      <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white overflow-visible">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Multi-Select Tag Input (7 Columns) */}
          <div className="lg:col-span-7 relative" ref={dropdownRef}>
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2.5 ml-1">
              <ShieldCheck size={14} className="text-[#00A3FF]" /> Select Assessments
            </label>
            
            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`min-h-[52px] w-full px-4 py-2 bg-white border-2 rounded-2xl cursor-pointer flex flex-wrap gap-2 items-center transition-all shadow-sm ${
                isDropdownOpen ? 'border-[#00A3FF] ring-4 ring-[#00A3FF]/5 shadow-lg' : 'border-slate-100 hover:border-slate-300'
              }`}
            >
              {selectedAssessments.length === 0 && (
                <span className="text-[13px] text-slate-400 font-medium italic">Click to select assessments...</span>
              )}
              {selectedAssessments.map(item => (
                <span key={item} className="flex items-center gap-1.5 bg-blue-50 text-[#00A3FF] pl-3 pr-1.5 py-1 rounded-lg text-[12px] font-bold border border-blue-100 animate-in zoom-in-90">
                  {item}
                  <button onClick={(e) => removeAssessment(e, item)} className="hover:bg-blue-200 p-0.5 rounded-md transition-colors">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <div className="ml-auto">
                <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-[1000] left-0 right-0 mt-3 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] max-h-72 overflow-y-auto custom-scrollbar p-2 animate-in slide-in-from-top-2">
                <div className="grid grid-cols-2 gap-1">
                  {ASSESSMENT_OPTIONS.map((option) => (
                    <div 
                      key={option}
                      onClick={() => toggleAssessment(option)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all ${
                        selectedAssessments.includes(option) ? 'bg-[#00A3FF] text-white' : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="text-[12px] font-bold">{option}</span>
                      {selectedAssessments.includes(option) && <Check size={16} strokeWidth={3} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Type Selection (3 Columns) */}
          <div className="lg:col-span-3">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 mb-2.5 ml-1">
              <Zap size={14} className="text-[#00A3FF]" /> Mapping Type
            </label>
            <div className="relative">
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-[52px] px-5 bg-white border-2 border-slate-100 rounded-2xl text-[13px] font-bold text-slate-700 outline-none hover:border-slate-300 focus:border-[#00A3FF] transition-all appearance-none cursor-pointer shadow-sm"
              >
                <option value="">Choose...</option>
                {TYPE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Status & Add (2 Columns) */}
          <div className="lg:col-span-2 flex flex-col justify-end gap-2">
             <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</span>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all ${
                    isActive ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-slate-200'
                  }`}
                >
                  <span className={`h-3.5 w-3.5 transform rounded-full bg-white transition-all ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
             </div>

            <button
              type="submit"
              className={`w-full h-[52px] rounded-2xl font-black text-[12px] uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
                initialData ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-100' : 'bg-[#00A3FF] hover:bg-[#008be6] shadow-blue-100'
              } text-white`}
            >
              {initialData ? 'Update Record' : 'Save Record'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MapAssessment;