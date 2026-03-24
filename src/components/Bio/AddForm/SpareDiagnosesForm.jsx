import React, { useState, useRef, useEffect } from 'react';
import { 
  X, User, Activity, FlaskConical, Stethoscope, 
  Microscope, CheckCircle2, FileText, Star, 
  ClipboardList, History, ChevronDown, Clock, AlertCircle, Ban,
  CheckCircle, XCircle
} from 'lucide-react';

import SuccessPopup from '../../global/SuccessPopup';

const AddDiagnosisModal = ({ isOpen, onClose }) => {
  const [activeStep, setActiveStep] = useState('Patient');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const scrollContainerRef = useRef(null);

  const sectionRefs = {
    Patient: useRef(null),
    Diagnosis: useRef(null),
    Clinical: useRef(null),
    Lab: useRef(null),
    Scoring: useRef(null),
    Specimen: useRef(null),
    Docs: useRef(null),
    Audit: useRef(null),
  };

  const scrollToSection = (id) => {
    setActiveStep(id);
    sectionRefs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) return;

    const observerOptions = {
      root: scrollContainerRef.current,
      rootMargin: '-10% 0px -60% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeKey = Object.keys(sectionRefs).find(
            key => sectionRefs[key].current === entry.target
          );
          if (activeKey) {
            setActiveStep(activeKey);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose(); 
    }, 1500); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      <div className="bg-[#f8fafc] w-full sm:w-[98vw] max-w-[1600px] sm:rounded-2xl shadow-2xl border-0 sm:border border-white flex flex-col h-full sm:max-h-[96vh] overflow-hidden relative">
        
        <div className="bg-white border-b border-slate-200 shrink-0 sticky top-0 z-30 shadow-sm">
          <div className="px-4 lg:px-8 py-4 lg:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-12 sm:pr-8">
            <div className="flex items-center gap-3 lg:gap-4">
              {/* Brand Color Icon Background */}
              <div className="bg-[#00A3FF] p-2 lg:p-2.5 rounded-xl shadow-sm shrink-0">
                <FileText size={20} className="text-white lg:w-6 lg:h-6" />
              </div>
              <div>
                <h2 className="text-lg lg:text-2xl font-black text-slate-800 tracking-tight leading-tight lg:leading-none">Diagnostic Entry Record</h2>
                <p className="text-slate-500 font-medium text-xs lg:text-sm mt-0.5 lg:mt-1 hidden sm:block">Complete the required fields, statuses, and comments below.</p>
              </div>
            </div>
            <button onClick={onClose} className="absolute top-4 right-4 sm:relative sm:top-0 sm:right-0 p-2 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all">
              <X size={20} className="lg:w-6 lg:h-6" strokeWidth={2.5} />
            </button>
          </div>

          <div className="px-4 lg:px-8 flex flex-wrap items-center gap-x-2 gap-y-2 pb-3 lg:pb-0 w-full">
            {[
              { id: 'Patient', label: '1. Patient Details', icon: <User size={14}/> },
              { id: 'Diagnosis', label: '2. Diagnosis Coding', icon: <Stethoscope size={14}/> },
              { id: 'Clinical', label: '3. Clinical Criteria', icon: <Activity size={14}/> },
              { id: 'Lab', label: '4. Laboratory Results', icon: <FlaskConical size={14}/> },
              { id: 'Scoring', label: '5. Scoring Systems', icon: <Star size={14}/> },
              { id: 'Specimen', label: '6. Specimen Details', icon: <Microscope size={14}/> },
              { id: 'Docs', label: '7. Documentation', icon: <ClipboardList size={14}/> },
              { id: 'Audit', label: '8. Audit Trail', icon: <History size={14}/> },
            ].map((step) => (
              <button 
                key={step.id}
                onClick={() => scrollToSection(step.id)}
                className={`flex items-center gap-1.5 px-3 lg:px-4 py-2 lg:py-3 rounded-lg lg:rounded-none lg:border-b-2 transition-all text-xs lg:text-sm font-bold ${
                  activeStep === step.id 
                    ? 'bg-[#00A3FF]/10 text-[#00A3FF] lg:bg-transparent lg:border-[#00A3FF] lg:text-[#00A3FF]' 
                    : 'bg-slate-50 text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:bg-transparent lg:border-transparent'
                }`}
              >
                {step.icon} {step.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reduced Container Gaps (space-y-4 lg:space-y-5) */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-4 lg:space-y-5 scroll-smooth bg-slate-50/50 relative">
          
          <SectionCard title="Patient Details" icon={<User size={20}/>} ref={sectionRefs.Patient}>
            <FieldRow label="Patient ID" type="select" options={['Select Patient', 'Kristina Cortez', 'Olivia Frias']} />
            <FieldRow label="Encounter ID" type="text" placeholder="Auto-generated ID..." />
            <FieldRow label="Diagnosis Date" type="date" />
          </SectionCard>

          <SectionCard title="Diagnosis Coding" icon={<Stethoscope size={20}/>} ref={sectionRefs.Diagnosis}>
            <FieldRow label="ICD-10 Code" type="select" options={['Select Code...', 'J45.40 - Moderate persistent asthma', 'J45.50 - Severe persistent asthma']} />
            <FieldRow label="Severity" type="radio" options={['Mild', 'Moderate', 'Severe']} />
            <FieldRow label="Diagnosis Name" type="text" placeholder="Enter custom name or notes..." />
          </SectionCard>

          <SectionCard title="Clinical Criteria" icon={<Activity size={20}/>} ref={sectionRefs.Clinical}>
            <FieldRow label="Criteria Used" type="checkbox" options={['GINA (Asthma)', 'EPOS (CRSwNP)', 'Hanifin & Rajka (AD)', 'ACR/EULAR (RA)', 'Other']} />
            <FieldRow label="Key Findings" type="checkbox" options={['Wheeze', 'Rash', 'Polyps', 'Joint Swelling', 'Other']} />
          </SectionCard>

          <SectionCard title="Laboratory Results" icon={<FlaskConical size={20}/>} ref={sectionRefs.Lab}>
            <FieldRow label="CBC w/ Diff" type="radio" options={['Pending', 'Done', 'Not Ordered']} defaultComment="Notes Filed" />
            <FieldRow label="PFT (FEV₁)" type="radio" options={['Normal', 'Mild', 'Moderate', 'Severe']} defaultComment="Notes filed for cooments" />
            <FieldRow label="Allergy Test" type="radio" options={['Positive', 'Negative', 'Indeterminate']} defaultComment="Notes filed for cooments" />
            <FieldRow label="Radiology" type="radio" options={['Not Done', 'Normal', 'Abnormal']} defaultComment="Notes filed for cooments" />
            <FieldRow label="CMP (LFT/Renal)" type="radio" options={['Pending', 'Done', 'Not Ordered']} defaultComment="Notes filed for cooments" />
            <FieldRow label="CRP / ESR" type="radio" options={['CRP <5', 'CRP ≥5', 'ESR Normal', 'ESR High']} defaultComment="Notes filed for cooments" />
            <FieldRow label="Immunoglobulins" type="checkbox" options={['IgE', 'IgG', 'IgM', 'IgA']} defaultComment="Notes filed for cooments" />
            <FieldRow label="Eosinophil Count" type="radio" options={['<500/µL', '500–1500/µL', '>1500/µL']} defaultComment="Notes filed for cooments" />
            <FieldRow label="Infection Screen" type="checkbox" options={['TB Negative', 'TB Positive', 'HBV Negative', 'HBV Positive', 'HCV Negative', 'HCV Positive', 'HIV Negative', 'HIV Positive']} defaultComment="Notes filed for cooments" />
          </SectionCard>

          <SectionCard title="Scoring Systems" icon={<Star size={20}/>} ref={sectionRefs.Scoring}>
            <FieldRow label="ACT / ACQ" type="text" placeholder="Enter score..." />
            <FieldRow label="EASI / IGA" type="text" placeholder="Enter score..." />
            <FieldRow label="SNOT-22" type="text" placeholder="Enter score..." />
            <FieldRow label="Exacerbations" type="radio" options={['0', '1', '2-3', '≥4 (in past 12 months)']} />
          </SectionCard>

          <SectionCard title="Specimen Details" icon={<Microscope size={20}/>} ref={sectionRefs.Specimen}>
            <FieldRow label="Specimen Type" type="radio" options={['Blood', 'Serum', 'Plasma', 'Skin', 'Tissue', 'Nasal swab', 'BAL', 'Other']} />
            <FieldRow label="Specimen Site" type="radio" options={['Peripheral Vein', 'Artery', 'Nasal Cavity', 'Skin Lesion', 'Lung', 'Other']} />
            <FieldRow label="Collection Date/Time" type="datetime" />
            <FieldRow label="Collected By" type="radio" options={['MD', 'NP', 'PA', 'RN', 'Phlebotomist', 'Other']} />
            <FieldRow label="Specimen Condition" type="radio" options={['Adequate', 'Hemolyzed', 'Clotted', 'Insufficient', 'Contaminated']} />
            <FieldRow label="Lab Ref Number" type="text" placeholder="Enter Lab Reference..." />
          </SectionCard>

          <SectionCard title="Documentation" icon={<ClipboardList size={20}/>} ref={sectionRefs.Docs}>
            <FieldRow label="Medical Necessity" type="radio" options={['Statement Added', 'Pending']} />
            <FieldRow 
              label="Reports Uploaded" 
              type="radio" 
              options={[
                { label: 'Yes', value: 'yes', icon: <CheckCircle size={15} className="text-emerald-500" /> },
                { label: 'No', value: 'no', icon: <XCircle size={15} className="text-rose-500" /> }
              ]} 
            />
            <FieldRow label="Progress Notes" type="radio" options={['Draft', 'Signed', 'testest', 'test']} />
          </SectionCard>

          <SectionCard title="Audit Trail" icon={<History size={20}/>} ref={sectionRefs.Audit}>
            <FieldRow label="CreatedAt" type="datetime" />
            <FieldRow label="CreatedBy" type="text" placeholder="Enter User ID or Name..." />
          </SectionCard>

        </div>

        <div className="bg-white px-4 lg:px-8 py-4 lg:py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 gap-4 sm:gap-0">
          <div className="w-full sm:w-auto flex justify-center sm:justify-start items-center gap-2 text-emerald-600 font-bold text-xs lg:text-sm bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
            <CheckCircle2 size={16} className="lg:w-[18px] lg:h-[18px]" /> All changes autosaved
          </div>
          <div className="flex w-full sm:w-auto flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-4">
            <button onClick={onClose} className="flex-1 sm:flex-none px-4 lg:px-6 py-2.5 rounded-xl text-slate-600 font-black text-xs uppercase hover:bg-slate-100 transition-all border border-slate-200 sm:border-transparent">Cancel</button>
            <button className="flex-1 sm:flex-none bg-white border border-slate-300 px-4 lg:px-8 py-2.5 rounded-xl text-slate-700 font-black text-xs uppercase shadow-sm hover:bg-slate-50 transition-all">Save Draft</button>
            
            {/* Submit button with new brand color */}
            <button 
              onClick={handleSubmit} 
              className="w-full sm:w-auto bg-[#00A3FF] hover:opacity-90 px-6 lg:px-10 py-3 sm:py-2.5 rounded-xl text-white font-black text-xs uppercase shadow-lg shadow-[#00A3FF]/30 transition-all"
            >
              Submit Entry
            </button>
          </div>
        </div>
      </div>

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        type="Added" 
      />
    </div>
  );
};

const SectionCard = React.forwardRef(({ title, icon, children }, ref) => (
  <section ref={ref} className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
    <div className="bg-slate-50 px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-200 flex items-center gap-3 rounded-t-xl">
      <div className="bg-white border border-slate-200 p-1.5 lg:p-2 rounded-lg text-[#00A3FF] shadow-sm">{icon}</div>
      <h2 className="font-black text-slate-800 text-base lg:text-lg">{title}</h2>
    </div>
    
    <div className="hidden lg:grid grid-cols-12 gap-6 px-6 py-3 border-b border-slate-100 bg-slate-50/50 text-xs font-black text-slate-400 uppercase tracking-widest">
      <div className="col-span-3">Field Name</div>
      <div className="col-span-5">Entry Value</div>
      <div className="col-span-2">Status</div>
      <div className="col-span-2">Comments</div>
    </div>
    
    <div className="flex flex-col pb-2">
      {children}
    </div>
  </section>
));

const FieldRow = ({ label, type, options, placeholder, defaultComment }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [status, setStatus] = useState('pending');

  const statusConfig = {
    pending: { label: 'Pending', icon: <Clock size={14} />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', iconColor: 'text-amber-500' },
    complete: { label: 'Complete', icon: <CheckCircle2 size={14} />, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', iconColor: 'text-emerald-500' },
    review: { label: 'Needs Review', icon: <AlertCircle size={14} />, bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', iconColor: 'text-purple-500' },
    na: { label: 'N/A', icon: <Ban size={14} />, bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-600', iconColor: 'text-slate-400' }
  };

  const currentStatus = statusConfig[status];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start px-4 lg:px-6 py-4 lg:py-3 border-b border-slate-100 last:border-none hover:bg-[#00A3FF]/5 transition-colors group relative ${isStatusOpen ? 'z-50' : 'z-10'}`}>
      
      <div className="lg:col-span-3 flex items-center lg:h-10">
        <label className="text-sm font-bold text-slate-700">{label}</label>
      </div>

      <div className="lg:col-span-5">
        {type === 'text' && (
          <input type="text" placeholder={placeholder} className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] outline-none shadow-sm transition-all" />
        )}
        
        {type === 'select' && (
          <select className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] outline-none shadow-sm transition-all cursor-pointer">
            {options?.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        )}
        
        {type === 'date' && (
          <input type="date" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] outline-none shadow-sm transition-all" />
        )}

        {type === 'datetime' && (
          <input type="datetime-local" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] outline-none shadow-sm transition-all" />
        )}

        {type === 'radio' && (
          <div className="flex flex-wrap gap-2 lg:gap-3 mt-1">
            {options?.map((opt, index) => {
              const isObj = typeof opt === 'object' && opt !== null;
              const val = isObj ? opt.value : opt;
              const displayLabel = isObj ? opt.label : opt;
              const icon = isObj ? opt.icon : null;

              return (
                <label key={val} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-md transition-colors border border-transparent hover:border-slate-200">
                  <input 
                    type="radio" 
                    name={label} 
                    value={val} 
                    defaultChecked={index === 0} 
                    className="w-4 h-4 accent-[#00A3FF] cursor-pointer" 
                  />
                  {icon && <span className="flex items-center justify-center">{icon}</span>}
                  <span className="text-xs lg:text-sm text-slate-700 font-medium">{displayLabel}</span>
                </label>
              );
            })}
          </div>
        )}

        {type === 'checkbox' && (
          <div className="flex flex-wrap gap-x-3 gap-y-2 lg:gap-x-4 lg:gap-y-2 mt-1">
            {options?.map((opt, index) => {
              const isObj = typeof opt === 'object' && opt !== null;
              const val = isObj ? opt.value : opt;
              const displayLabel = isObj ? opt.label : opt;
              const icon = isObj ? opt.icon : null;

              return (
                <label key={val} className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-md transition-colors border border-transparent hover:border-slate-200">
                  <input 
                    type="checkbox" 
                    name={label} 
                    value={val} 
                    defaultChecked={index === 0} 
                    className="w-4 h-4 accent-[#00A3FF] rounded cursor-pointer" 
                  />
                  {icon && <span className="flex items-center justify-center">{icon}</span>}
                  <span className="text-xs lg:text-sm text-slate-700 font-medium">{displayLabel}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="lg:col-span-2 relative flex flex-col gap-1.5 lg:gap-0 mt-2 lg:mt-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest lg:hidden">Status</span>
        <div 
          className="relative w-full" 
          tabIndex={0} 
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setIsStatusOpen(false);
          }}
        >
          <button 
            type="button" 
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className={`w-full flex items-center justify-between px-3 py-2.5 lg:py-2 rounded-lg border text-sm font-bold shadow-sm transition-all ${currentStatus.bg} ${currentStatus.border} ${currentStatus.text}`}
          >
            <div className="flex items-center gap-2">
              <span className={currentStatus.iconColor}>{currentStatus.icon}</span>
              {currentStatus.label}
            </div>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''} opacity-60`} />
          </button>

          {isStatusOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden z-[100] py-1 animate-in fade-in zoom-in-95 duration-100">
              {Object.entries(statusConfig).map(([key, val]) => (
                <button 
                  key={key}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setStatus(key);
                    setIsStatusOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-3 lg:py-2.5 text-sm font-bold hover:bg-slate-50 transition-colors ${val.text}`}
                >
                  <span className={val.iconColor}>{val.icon}</span> {val.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-1.5 lg:gap-0 mt-2 lg:mt-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest lg:hidden">Comments</span>
        <textarea 
          placeholder="Add notes..." 
          defaultValue={defaultComment || ''}
          rows={1}
          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 lg:py-2 text-sm text-slate-600 focus:ring-2 focus:ring-[#00A3FF]/20 focus:border-[#00A3FF] outline-none shadow-sm transition-all resize-y min-h-[44px] lg:min-h-[40px]" 
        />
      </div>

    </div>
  );
};

export default AddDiagnosisModal;