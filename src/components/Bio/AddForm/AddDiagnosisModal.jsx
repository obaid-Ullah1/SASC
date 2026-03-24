import React, { useState } from 'react';
import { X, Save, FileText, CheckCircle2, ChevronDown, Clock, AlertCircle, Printer, Ban } from 'lucide-react';
import SuccessPopup from '../../global/SuccessPopup';

// Shared strict column widths to guarantee 100% perfect grid alignment
const colSection = "w-[140px] lg:w-[170px] shrink-0";
const colField = "w-[160px] lg:w-[210px] shrink-0";
const colEntry = "flex-1 min-w-[200px]";
const colStatus = "w-[130px] lg:w-[150px] shrink-0";
const colComments = "w-[200px] lg:w-[260px] shrink-0";

const AddDiagnosisModal = ({ isOpen, onClose, patientName = "Patient Name", testTitle = "Diagnostic Entry Record", onSubmitData }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [printMenuOpen, setPrintMenuOpen] = useState(false);
  const [printMode, setPrintMode] = useState('filled');

  // Automatically gathers every single input/dropdown/checkbox and sends it to the table
  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    
    const formData = new FormData(e.target);
    const dataObj = {};
    
    for (let [key, value] of formData.entries()) {
      if (key.startsWith('print_')) continue; // Ignore print-only hidden inputs
      
      if (dataObj[key]) {
        if (!Array.isArray(dataObj[key])) {
          dataObj[key] = [dataObj[key]];
        }
        dataObj[key].push(value);
      } else {
        dataObj[key] = value;
      }
    }

    if (onSubmitData) {
      onSubmitData(dataObj);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose(); 
    }, 1500); 
  };

  const handlePrint = (mode) => {
    setPrintMode(mode);
    setPrintMenuOpen(false);
    setTimeout(() => {
      window.print();
      setPrintMode('filled'); 
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <>
      <style type="text/css">
        {`
          @media print {
            @page { size: portrait; margin: 5mm; }
            html, body { height: auto !important; min-height: 100vh !important; overflow: visible !important; background: white !important; margin: 0 !important; padding: 0 !important; }
            body * { visibility: hidden !important; }
            #printable-diagnosis-form, #printable-diagnosis-form * { visibility: visible !important; }
            
            #printable-diagnosis-form {
              position: absolute !important; left: 0 !important; top: 0 !important;
              width: 100% !important; height: auto !important; min-height: 100% !important; 
              margin: 0 !important; padding: 5mm !important; 
              display: block !important; 
              background: white !important; overflow: visible !important;
              -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
            }

            .print-hidden { display: none !important; }

            input[type="checkbox"] { appearance: none; background-color: #fff; margin: 0; width: 14px; height: 14px; border: 1.5px solid black; border-radius: 2px; display: grid; place-content: center; }
            input[type="checkbox"]::before { content: ""; width: 8px; height: 8px; transform: scale(0); transition: 120ms transform ease-in-out; background-color: black; clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%); }
            input[type="checkbox"]:checked::before { transform: scale(1); }

            input[type="radio"] { appearance: none; background-color: #fff; margin: 0; width: 14px; height: 14px; border: 1.5px solid black; border-radius: 50%; display: grid; place-content: center; }
            input[type="radio"]::before { content: ""; width: 8px; height: 8px; border-radius: 50%; transform: scale(0); transition: 120ms transform ease-in-out; background-color: black; }
            input[type="radio"]:checked::before { transform: scale(1); }

            .print-blank input[type="text"], .print-blank select, .print-blank textarea { color: transparent !important; }
            .print-blank input[type="radio"]:checked::before, .print-blank input[type="checkbox"]:checked::before { transform: scale(0) !important; }
          }
        `}
      </style>

      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        
        {/* CHANGED to <form> tag to capture data submission */}
        <form onSubmit={handleFormSubmit} id="printable-diagnosis-form" className={`bg-[#f8fafc] w-full max-w-[1500px] rounded-xl shadow-2xl flex flex-col h-full max-h-[96vh] overflow-hidden border border-slate-300 print:max-h-none print:border-none print:shadow-none print:rounded-none print:bg-white print:block print:overflow-visible ${printMode === 'blank' ? 'print-blank' : ''}`}>
          
          {/* PRINT ONLY HEADER */}
          <div className="hidden print:flex items-end justify-between w-full border-b-[1.5px] border-slate-400 pb-3 mb-3 shrink-0">
            <div className="flex items-center gap-3">
              <img src="/download.png" alt="Sierra Allergy Logo" className="h-14 object-contain" />
              <div className="flex flex-col">
                <span className="text-[14px] font-black leading-none text-slate-800 tracking-wide uppercase">SIERRA ALLERGY</span>
                <span className="text-[9px] font-bold text-slate-500 leading-none uppercase mt-0.5">ASTHMA AND SINUS CENTER</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-slate-500 leading-none uppercase tracking-widest">{testTitle}</span>
              <h2 className="text-[16px] font-black text-black tracking-wide leading-none mt-1">{patientName}</h2>
            </div>
            <div className="w-48"></div>
          </div>

          {/* SCREEN ONLY HEADER */}
          <div className="bg-white border-b border-slate-300 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-sm relative z-20 print-hidden">
            <div className="flex items-center gap-3">
              <div className="bg-[#00A3FF] p-1.5 rounded shadow-sm shrink-0">
                <FileText size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight leading-none">Diagnostic Entry Record</h2>
              </div>
            </div>
            <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-md transition-all">
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          {/* MAIN TABLE CONTAINER */}
          <div className="flex-1 overflow-auto p-4 bg-white print:overflow-visible print:p-0 print:block">
            <div className="min-w-[1000px] w-full border-2 border-[#00A3FF] print:border-black rounded-sm flex flex-col text-[11px] text-slate-700 h-max print:h-auto">
              
              {/* FIXED TABLE HEADER */}
              <div className="flex bg-[#e0f2fe] print:bg-slate-100 font-bold text-[#00A3FF] print:text-black border-b-2 border-[#00A3FF] print:border-black shrink-0 text-[12px] lg:text-[13px]">
                <div className={`${colSection} py-1.5 px-3 border-r-2 border-[#00A3FF] print:border-black`}>Section</div>
                <div className={`${colField} py-1.5 px-3 border-r-2 border-[#00A3FF] print:border-black`}>Field</div>
                <div className={`${colEntry} py-1.5 px-3 border-r-2 border-[#00A3FF] print:border-black`}>Entry</div>
                <div className={`${colStatus} py-1.5 px-3 border-r-2 border-[#00A3FF] print:border-black`}>Status</div>
                <div className={`${colComments} py-1.5 px-3`}>Comments</div>
              </div>

              {/* TABLE BODY (Preserved Diagnosis Data) */}
              <div className="flex flex-col flex-1 print:block">
                
                <SectionCard title="Patient Details">
                  <FieldRow label="Patient ID" type="select" options={['Select Patient', 'Kristina Cortez', 'Olivia Frias']} />
                  <FieldRow label="Encounter ID" type="text" placeholder="" />
                  <FieldRow label="Diagnosis Date" type="date" />
                </SectionCard>

                <SectionCard title="Diagnosis Coding">
                  <FieldRow label="ICD-10 Code" type="select" options={['J45.40 - Moderate persistent asthma, uncomplicated', 'J45.50 - Severe persistent asthma']} isBlue />
                  <FieldRow label="Diagnosis Name" type="text" placeholder="" />
                  <FieldRow label="Severity" type="radio" options={['Mild', 'Moderate', 'Severe', 'test']} />
                </SectionCard>

                <SectionCard title="Clinical Criteria">
                  <FieldRow label="Criteria Used" type="checkbox" options={['GINA (Asthma)', 'EPOS (CRSwNP)', 'Hanifin & Rajka (AD)', 'ACR/EULAR (RA)', 'Other']} />
                  <FieldRow label="Key Findings" type="checkbox" options={['Wheeze', 'Rash', 'Polyps', 'Joint Swelling', 'Other']} />
                </SectionCard>

                <SectionCard title="Laboratory Results">
                  <FieldRow label="CBC w/ Diff" type="radio" options={['Pending', 'Done', 'Not Ordered']} />
                  <FieldRow label="PFT (FEV₁)" type="radio" options={['Normal', 'Mild', 'Moderate', 'Severe']} />
                  <FieldRow label="Allergy Test" type="radio" options={['Positive', 'Negative', 'Indeterminate']} />
                  <FieldRow label="Radiology" type="radio" options={['Not Done', 'Normal', 'Abnormal']} />
                  <FieldRow label="CMP (LFT/Renal)" type="radio" options={['Pending', 'Done', 'Not Ordered']} />
                  <FieldRow label="CRP / ESR" type="radio" options={['CRP <5', 'CRP ≥5', 'ESR Normal', 'ESR High']} />
                  <FieldRow label="Immunoglobulins" type="checkbox" options={['IgE', 'IgG', 'IgM', 'IgA']} />
                  <FieldRow label="Eosinophil Count" type="radio" options={['<500/µL', '500–1500/µL', '>1500/µL']} />
                  <FieldRow label="Infection Screen" type="checkbox" options={['TB Negative', 'TB Positive', 'HBV Negative', 'HBV Positive', 'HCV Negative', 'HCV Positive', 'HIV Negative', 'HIV Positive']} />
                </SectionCard>

                <SectionCard title="Scoring Systems">
                  <FieldRow label="ACT / ACQ" type="text" />
                  <FieldRow label="EASI / IGA" type="text" />
                  <FieldRow label="SNOT-22" type="text" />
                  <FieldRow label="Exacerbations" type="radio" options={['0', '1', '2-3', '≥4 (in past 12 months)']} />
                </SectionCard>

                <SectionCard title="Specimen Details">
                  <FieldRow label="Specimen Type" type="radio" options={['Blood', 'Serum', 'Plasma', 'Skin', 'Tissue', 'Nasal swab', 'BAL', 'Other', 'test']} />
                  <FieldRow label="Specimen Site" type="radio" options={['Peripheral Vein', 'Artery', 'Nasal Cavity', 'Skin Lesion', 'Lung', 'Other', 'test']} />
                  <FieldRow label="Collection Date/Time" type="datetime" />
                  <FieldRow label="Collected By" type="radio" options={['MD', 'NP', 'PA', 'RN', 'Phlebotomist', 'Other']} />
                  <FieldRow label="Specimen Condition" type="radio" options={['Adequate', 'Hemolyzed', 'Clotted', 'Insufficient', 'Contaminated', 'test']} />
                  <FieldRow label="Lab Ref Number" type="text" />
                </SectionCard>

                <SectionCard title="Documentation">
                  <FieldRow label="Medical Necessity" type="radio" options={['Statement Added', 'Pending']} />
                  <FieldRow label="Reports Uploaded" type="radio" options={[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }]} />
                  <FieldRow label="Progress Notes" type="radio" options={['Draft', 'Signed', 'testest', 'test']} />
                </SectionCard>

                <SectionCard title="Audit Trail">
                  <FieldRow label="CreatedAt" type="datetime" />
                  <FieldRow label="CreatedBy" type="text" />
                </SectionCard>

              </div>
            </div>
            
            {/* PRINT ONLY SIGNATURE SECTION */}
            <div className="hidden print:flex w-full justify-between items-end mt-12 pt-6 px-10 pb-4 shrink-0 break-inside-avoid">
              <div className="flex flex-col gap-1 w-72">
                <div className="border-b-2 border-black w-full h-8"></div>
                <span className="text-[12px] font-bold text-black uppercase tracking-widest text-center">Doctor Signature</span>
              </div>
              <div className="flex flex-col gap-1 w-48">
                <div className="border-b-2 border-black w-full h-8"></div>
                <span className="text-[12px] font-bold text-black uppercase tracking-widest text-center">Date</span>
              </div>
            </div>

          </div>

          {/* SCREEN ONLY FOOTER */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-300 flex items-center justify-between shrink-0 shadow-inner z-30 print-hidden">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[12px]">
              <CheckCircle2 size={16} /> All changes autosaved
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={onClose} className="px-6 py-1.5 rounded-md bg-white border border-slate-300 text-slate-600 font-bold text-[12px] hover:bg-slate-100 transition-colors shadow-sm">
                Cancel
              </button>

              <div className="relative">
                <button type="button" onClick={() => setPrintMenuOpen(!printMenuOpen)} className="flex items-center gap-2 px-6 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white font-bold text-[12px] shadow-sm transition-colors">
                  <Printer size={14} strokeWidth={2.5} /> Print <ChevronDown size={14} className={`${printMenuOpen ? 'rotate-180' : ''} transition-transform`} />
                </button>
                {printMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-40 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden flex flex-col z-[100] animate-in fade-in zoom-in-95 duration-100">
                    <button type="button" onClick={() => handlePrint('filled')} className="px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-[#00A3FF] hover:text-white border-b border-slate-100 transition-colors">
                      Print Filled Form
                    </button>
                    <button type="button" onClick={() => handlePrint('blank')} className="px-4 py-2.5 text-left text-xs font-bold text-slate-700 hover:bg-[#00A3FF] hover:text-white transition-colors">
                      Print Blank Form
                    </button>
                  </div>
                )}
              </div>

              <button type="submit" className="bg-[#00A3FF] hover:bg-[#008CE6] px-8 py-1.5 rounded-md text-white font-bold text-[12px] shadow-sm transition-colors">
                Submit Entry
              </button>
            </div>
          </div>
        </form>

        <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} type="Added" />
      </div>
    </>
  );
};

// --- REUSABLE GRID COMPONENTS ---

const SectionCard = ({ title, children }) => (
  // odd:bg-white even:bg-[#00A3FF]/[0.06] implements perfectly alternating Zebra Striping across sections!
  <div className="flex flex-1 border-b-2 border-[#00A3FF] print:border-black last:border-b-0 odd:bg-white even:bg-[#00A3FF]/[0.06] group print:break-inside-avoid print:odd:bg-transparent print:even:bg-transparent">
    <div className={`${colSection} flex items-center border-r-2 border-[#00A3FF] print:border-black py-2 px-3 font-black text-slate-800 print:text-black bg-transparent text-[12px] lg:text-[13px] uppercase tracking-wide`}>
      {title}
    </div>
    <div className="flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

const statusConfig = {
  na: { icon: null, text: 'text-slate-500', bg: 'bg-transparent', border: 'border-transparent' },
  pending: { icon: <Clock size={14} strokeWidth={3} />, text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  complete: { icon: <CheckCircle2 size={14} strokeWidth={3} />, text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  review: { icon: <AlertCircle size={14} strokeWidth={3} />, text: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
};

const FieldRow = ({ label, type, options, placeholder, isBlue }) => {
  const [currentStatus, setCurrentStatus] = useState('na');
  const handleStatusChange = (e) => setCurrentStatus(e.target.value);
  const statusStyle = statusConfig[currentStatus];

  // Automatically generates a valid name based on the label for the form data (e.g. "Dose Amount" -> "Dose_Amount")
  const safeName = label.replace(/[^a-zA-Z0-9]/g, '_');

  return (
    // Hover uses a neutral dynamic darkening (black/[0.04]) so it works perfectly on both white and light-blue sections
    <div className="flex flex-1 border-b-2 border-[#00A3FF] print:border-black last:border-b-0 hover:bg-black/[0.04] transition-colors print:break-inside-avoid">
      
      {/* Field Name */}
      <div className={`${colField} flex items-center border-r-2 border-[#00A3FF] print:border-black py-1 px-3 font-bold text-slate-800 print:text-black text-[12px] lg:text-[13px]`}>
        {label}
      </div>

      {/* Entry Input Area */}
      <div className={`${colEntry} flex items-center border-r-2 border-[#00A3FF] print:border-black py-1 px-3`}>
        {type === 'text' && (
          <input type="text" name={safeName} placeholder={placeholder} className="w-full h-[26px] bg-white border border-slate-300 print:border-black rounded-[3px] px-2 outline-none focus:border-[#00A3FF] shadow-sm transition-colors text-[12px] lg:text-[13px] font-medium text-slate-800 print:text-black" />
        )}
        
        {type === 'select' && (
          <select name={safeName} className={`w-full h-[26px] bg-white border border-slate-300 print:border-black rounded-[3px] px-1 outline-none focus:border-[#00A3FF] shadow-sm transition-colors text-[12px] lg:text-[13px] font-medium text-slate-800 print:text-black cursor-pointer ${isBlue ? 'text-[#00A3FF] font-bold print:text-black' : ''}`}>
            {options?.map(opt => {
              const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
              const displayLabel = typeof opt === 'object' && opt !== null ? opt.label : opt;
              return <option key={val} value={val}>{displayLabel}</option>;
            })}
          </select>
        )}
        
        {(type === 'date' || type === 'datetime') && (
          <div className="flex w-full">
            <input 
              type={type === 'date' ? 'date' : 'datetime-local'} 
              name={safeName}
              className="w-full max-w-[200px] h-[26px] bg-white border border-slate-300 print:border-black rounded-[3px] px-2 outline-none focus:border-[#00A3FF] shadow-sm transition-colors text-[12px] lg:text-[13px] font-medium text-slate-800 print:text-black" 
            />
          </div>
        )}

        {(type === 'radio' || type === 'checkbox') && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 py-0.5">
            {options?.map((opt, index) => {
              const val = typeof opt === 'object' && opt !== null ? opt.value : opt;
              const displayLabel = typeof opt === 'object' && opt !== null ? opt.label : opt;
              
              return (
                <label key={val} className="flex items-center gap-1.5 cursor-pointer group/label h-[26px]">
                  
                  {type === 'radio' ? (
                    <div className="relative flex items-center justify-center w-[14px] h-[14px] shrink-0 print:hidden">
                      <input type="radio" name={safeName} value={val} defaultChecked={index === 0} className="peer appearance-none w-full h-full border border-slate-400 bg-white rounded-full checked:border-[#00A3FF] cursor-pointer transition-colors m-0 outline-none" />
                      <div className="absolute w-[8px] h-[8px] bg-[#00A3FF] rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center w-[14px] h-[14px] shrink-0 print:hidden">
                      <input type="checkbox" name={safeName} value={val} defaultChecked={index === 0} className="peer appearance-none w-full h-full border border-slate-400 bg-white rounded-[2px] checked:bg-[#00A3FF] checked:border-[#00A3FF] cursor-pointer transition-colors m-0 outline-none" />
                      <svg className="absolute w-2.5 h-2.5 text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}

                  <input type={type} name={`print_${safeName}`} value={val} defaultChecked={index === 0} className="hidden print:block" />

                  <span className="text-[12px] lg:text-[13px] font-medium text-slate-800 print:text-black group-hover/label:text-[#00A3FF] transition-colors pt-[1px]">{displayLabel}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* STATUS COLUMN */}
      <div className={`${colStatus} flex items-center border-r-2 border-[#00A3FF] print:border-black py-1 px-1.5`}>
        <div className={`relative flex items-center w-full h-[26px] rounded-[3px] border shadow-sm transition-colors print:shadow-none print:bg-transparent print:border-black ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}`}>
          <div className="absolute left-1.5 pointer-events-none flex items-center print:hidden">
            {statusStyle.icon}
          </div>
          <select 
            name={`${safeName}_status`}
            value={currentStatus}
            onChange={handleStatusChange}
            className={`w-full h-full bg-transparent outline-none font-bold text-[12px] lg:text-[13px] cursor-pointer appearance-none print:pl-1 print:text-black ${statusStyle.icon ? 'pl-7' : 'pl-2'} pr-5`}
          >
            <option value="na" className="text-slate-800 bg-white">--</option>
            <option value="pending" className="text-slate-800 bg-white">Pending</option>
            <option value="complete" className="text-slate-800 bg-white">Complete</option>
            <option value="review" className="text-slate-800 bg-white">Needs Review</option>
          </select>
          <div className="absolute right-1.5 pointer-events-none flex items-center opacity-50 print:hidden">
            <ChevronDown size={14} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Comments Column */}
      <div className={`${colComments} flex items-center py-1 px-2`}>
        <textarea 
          name={`${safeName}_comments`}
          rows={1}
          placeholder=""
          className="w-full bg-white border border-slate-200 print:border-black rounded-[3px] px-2 py-1 text-[12px] lg:text-[13px] font-medium text-slate-800 print:text-black focus:border-[#00A3FF] outline-none shadow-sm resize-y min-h-[26px] max-h-[60px] leading-tight" 
        />
      </div>

    </div>
  );
};

export default AddDiagnosisModal;