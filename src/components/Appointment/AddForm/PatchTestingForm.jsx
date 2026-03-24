import React, { useState } from 'react';
import { X, Save, Printer } from 'lucide-react';

const PatchTestingForm = ({ isOpen, onClose, patientName, testTitle, panelsData }) => {
  // State for the machine/database readings
  const [readings1st, setReadings1st] = useState({});
  const [readings2nd, setReadings2nd] = useState({});

  // State for the Provider Signatures
  const [sigApp, setSigApp] = useState({ checked: false, name: '', date: '' });
  const [sig1st, setSig1st] = useState({ checked: false, name: '', date: '' });
  const [sig2nd, setSig2nd] = useState({ checked: false, name: '', date: '' });

  // State for the MA Date Tracking
  const [maApplied, setMaApplied] = useState({ checked: false, name: '', date: '' });
  const [maRemoved, setMaRemoved] = useState({ checked: false, name: '', date: '' });

  if (!isOpen || !panelsData) return null;

  // Helper to get today's date in MM/DD/YYYY format
  const getFormattedDate = () => {
    const today = new Date();
    return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  };

  // --- AUTOMATION HANDLERS ---
  const handle1stReadingCheck = (checked) => {
    if (checked) {
      setSig1st({ checked: true, name: 'SAASC', date: getFormattedDate() });
      const newReadings = {};
      panelsData.forEach(panel => {
        panel.items.forEach(item => {
          newReadings[`${panel.categoryId}_${item.code}`] = '0';
        });
      });
      setReadings1st(newReadings);
    } else {
      setSig1st({ checked: false, name: '', date: '' });
      setReadings1st({});
    }
  };

  const handle2ndReadingCheck = (checked) => {
    if (checked) {
      setSig2nd({ checked: true, name: 'SAASC', date: getFormattedDate() });
      const newReadings = {};
      panelsData.forEach(panel => {
        panel.items.forEach(item => {
          newReadings[`${panel.categoryId}_${item.code}`] = '0';
        });
      });
      setReadings2nd(newReadings);
    } else {
      setSig2nd({ checked: false, name: '', date: '' });
      setReadings2nd({});
    }
  };

  // Sidebar cards mapping
  const sidebarCards = [
    <SignatureCard 
      key="sig1" title="PROVIDER (Application):" 
      data={sigApp}
      onCheck={(c) => setSigApp(c ? { checked: true, name: 'SAASC', date: getFormattedDate() } : { checked: false, name: '', date: '' })}
      onNameChange={(val) => setSigApp(prev => ({ ...prev, name: val }))}
      onDateChange={(val) => setSigApp(prev => ({ ...prev, date: val }))}
    />,
    <SignatureCard 
      key="sig2" title="PROVIDER (1st Reading):" 
      data={sig1st}
      onCheck={handle1stReadingCheck}
      onNameChange={(val) => setSig1st(prev => ({ ...prev, name: val }))}
      onDateChange={(val) => setSig1st(prev => ({ ...prev, date: val }))}
    />,
    <SignatureCard 
      key="sig3" title="PROVIDER (2nd Reading):" 
      data={sig2nd}
      onCheck={handle2ndReadingCheck}
      onNameChange={(val) => setSig2nd(prev => ({ ...prev, name: val }))}
      onDateChange={(val) => setSig2nd(prev => ({ ...prev, date: val }))}
    />,
    <DateTrackingCard 
      key="sig4" 
      maApplied={maApplied} maRemoved={maRemoved}
      onAppliedCheck={(c) => setMaApplied(c ? { checked: true, name: 'SAASC', date: getFormattedDate() } : { checked: false, name: '', date: '' })}
      onAppliedNameChange={(val) => setMaApplied(prev => ({ ...prev, name: val }))}
      onAppliedDateChange={(val) => setMaApplied(prev => ({ ...prev, date: val }))}
      onRemovedCheck={(c) => setMaRemoved(c ? { checked: true, name: 'SAASC', date: getFormattedDate() } : { checked: false, name: '', date: '' })}
      onRemovedNameChange={(val) => setMaRemoved(prev => ({ ...prev, name: val }))}
      onRemovedDateChange={(val) => setMaRemoved(prev => ({ ...prev, date: val }))}
    />
  ];

  // Group panels into pairs for layout
  const rows = [];
  for (let i = 0; i < panelsData.length; i += 2) {
    rows.push({
      panel1: panelsData[i],
      panel2: panelsData[i + 1] || null,
      sidebar: sidebarCards[i / 2] || null
    });
  }

  return (
    <>
      <style type="text/css" media="print">
        {`
          /* Strict A4 Portrait sizing. Margin 0 completely removes browser headers/footers */
          @page { size: portrait; margin: 0; }
          
          /* Unlock height restrictions for multipage printing */
          html, body { height: auto !important; min-height: 100vh !important; overflow: visible !important; background: white !important; margin: 0 !important; padding: 0 !important; }
          body * { visibility: hidden !important; }
          
          /* Master Print Wrapper Control */
          #printable-patch-form, #printable-patch-form * { visibility: visible !important; }
          
          #printable-patch-form {
            position: absolute !important; /* Anchors strictly to top left */
            left: 0 !important; top: 0 !important;
            width: 100% !important; height: max-content !important; min-height: 100% !important; 
            margin: 0 !important; 
            padding: 8mm !important; /* Re-adds clean, controlled padding inside the border */
            display: block !important; 
            background: white !important; overflow: visible !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
          }

          /* Ensure custom styled checkboxes print beautifully */
          input[type="checkbox"] { appearance: none; background-color: #fff; margin: 0; font: inherit; color: currentColor; width: 1.15em; height: 1.15em; border: 1px solid black; display: grid; place-content: center; }
          input[type="checkbox"]::before { content: ""; width: 0.65em; height: 0.65em; transform: scale(0); transition: 120ms transform ease-in-out; box-shadow: inset 1em 1em black; background-color: black; transform-origin: center; clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%); }
          input[type="checkbox"]:checked::before { transform: scale(1); }
        `}
      </style>

      {/* OUTER WRAPPER - print:absolute forces it to the very top */}
      <div 
        id="printable-patch-form" 
        className="fixed inset-0 z-[99999] flex justify-center bg-slate-900/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto print:absolute print:left-0 print:top-0 print:w-full print:h-auto print:bg-white print:p-0 print:block print:overflow-visible"
      >
        {/* MAIN CONTAINER */}
        <div className="bg-[#f8fafc] w-full max-w-[1600px] h-max min-h-[95vh] rounded-xl shadow-2xl flex flex-col border border-slate-300 print:w-full print:border-none print:shadow-none print:rounded-none print:h-auto print:max-h-none print:min-h-0 print:bg-white print:block print:overflow-visible">
          
          {/* --- PRINT ONLY HEADER (Logo & Data) --- */}
          <div className="hidden print:flex items-end justify-between w-full border-b-[1.5px] border-slate-400 pb-2 mb-2 px-1 shrink-0">
            <div className="flex items-center gap-2">
              <img src="/download.png" alt="Sierra Allergy Logo" className="h-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-[12px] font-black leading-tight text-slate-800 tracking-wide uppercase">SIERRA ALLERGY</span>
                <span className="text-[7px] font-bold text-slate-500 leading-none uppercase">ASTHMA AND SINUS CENTER</span>
              </div>
            </div>
            
            <div className="flex flex-col items-center pb-0.5">
              <span className="text-[9px] font-bold text-slate-500 leading-none mb-0.5">{testTitle}</span>
              <h2 className="text-[14px] font-black text-[#00A3FF] tracking-wide leading-none">{patientName}</h2>
            </div>
            
            <div className="w-32"></div> {/* Spacer to strictly center the middle text */}
          </div>

          {/* SCREEN ONLY HEADER */}
          <div className="bg-white px-6 py-4 flex items-center justify-between border-b-2 border-slate-300 shrink-0 relative print:hidden">
            <div className="flex items-center gap-3 z-10">
              <img src="/download.png" alt="Sierra Allergy Logo" className="h-10 object-contain" />
              <div className="flex flex-col">
                <span className="text-[16px] font-black leading-tight text-slate-800 tracking-wide uppercase">SIERRA ALLERGY</span>
                <span className="text-[11px] font-bold text-slate-500 leading-none uppercase">ASTHMA AND SINUS CENTER</span>
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-slate-500 leading-none mb-1">{testTitle}</span>
              <h2 className="text-2xl font-black text-[#00A3FF] tracking-wide leading-none">{patientName}</h2>
            </div>
            
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 z-10 transition-colors bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full">
              <X size={26} strokeWidth={2.5} />
            </button>
          </div>

          {/* DYNAMIC GRID BODY */}
          <div className="flex flex-col flex-1 p-5 gap-5 print:block print:p-0 print:h-auto print:overflow-visible">
            {rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_340px] gap-5 print:grid-cols-[1fr_1fr_180px] print:gap-1.5 print:mb-1.5 print:break-inside-avoid">
                <PatchPanel data={row.panel1} readings1st={readings1st} readings2nd={readings2nd} />
                {row.panel2 ? <PatchPanel data={row.panel2} readings1st={readings1st} readings2nd={readings2nd} /> : <div />}
                <div className="h-full flex flex-col">{row.sidebar || <div className="hidden print:block"></div>}</div>
              </div>
            ))}
          </div>

          {/* PRINT ONLY FOOTER */}
          <div className="hidden print:block w-full text-center text-[7px] text-slate-500 mt-2 font-medium">
            Printed on {getFormattedDate()} — Sierra Allergy & Asthma Center
          </div>

          {/* FOOTER ACTION BUTTONS */}
          <div className="bg-white px-6 py-4 flex justify-end gap-4 border-t-2 border-slate-300 print:hidden mt-auto rounded-b-xl">
            <button type="button" onClick={onClose} className="bg-[#64748b] hover:bg-slate-600 text-white font-bold text-sm px-8 py-2.5 rounded shadow transition-colors">
              Close
            </button>
            <button type="button" onClick={() => console.log("Saving Data...")} className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm px-8 py-2.5 rounded shadow transition-colors flex items-center gap-2">
              <Save size={18} strokeWidth={2.5} /> Save
            </button>
            <button type="button" onClick={() => window.print()} className="bg-[#00A3FF] hover:bg-[#008CE6] text-white font-bold text-sm px-8 py-2.5 rounded shadow transition-colors flex items-center gap-2">
              <Printer size={18} strokeWidth={2.5} /> Print
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

// --- REUSABLE SUB-COMPONENTS ---

const screenGrid = "grid-cols-[36px_1fr_48px_48px]";
const printGrid = "print:grid-cols-[18px_1fr_24px_24px]";

const PatchPanel = ({ data, readings1st, readings2nd }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`bg-white border-2 border-slate-400 rounded-lg flex flex-col overflow-hidden shadow-sm print:border-[1px] print:border-slate-400 print:rounded-none h-full`}>
      
      {/* Header */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b-2 border-slate-400 print:border-slate-400 print:py-0.5 print:px-1.5 transition-colors ${isActive ? 'bg-[#2A333A] text-white print:bg-[#7A869A]' : 'bg-[#64748B] text-white print:bg-[#7A869A]'}`}>
        <h3 className="font-bold text-[13px] tracking-wide print:text-[8px] uppercase">{data.categoryName}</h3>
        <label className="relative inline-flex items-center cursor-pointer print:hidden">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="sr-only peer" />
          <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00A3FF]"></div>
        </label>
        
        {/* Simplified toggle visual for print */}
        <div className="hidden print:block w-4 h-2.5 bg-slate-300 rounded-full relative">
          <div className="absolute top-[1px] left-[1px] w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${!isActive ? 'pointer-events-none' : ''}`}>
        
        {/* Table Headers */}
        <div className={`grid ${screenGrid} ${printGrid} divide-x divide-slate-300 border-b-2 border-slate-400 text-[12px] font-bold text-slate-600 text-center items-center print:text-[7px] print:text-black print:divide-slate-400 print:border-slate-400 bg-[#f8fafc] print:bg-slate-100 shrink-0`}>
          <div className="py-2 print:py-0.5">#</div>
          <div className="text-left pl-3 print:pl-1.5">Ingredient</div>
          <div className="py-2 print:py-0.5">1<sup className="text-[9px] print:text-[5px]">st</sup></div>
          <div className="py-2 print:py-0.5">2<sup className="text-[9px] print:text-[5px]">nd</sup></div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col bg-white divide-y divide-slate-200 print:divide-slate-300 flex-1">
          {data.items.map((item) => {
            const key = `${data.categoryId}_${item.code}`;
            return (
              <div key={key} className={`grid ${screenGrid} ${printGrid} divide-x divide-slate-200 hover:bg-[#00A3FF]/5 text-[12px] text-slate-800 print:text-[7.5px] print:divide-slate-300 flex-1`}>
                <div className="flex items-center justify-center font-bold py-1.5 print:py-[1px] text-slate-600 print:text-black">{item.code}</div>
                <div className="flex items-center pl-3 print:pl-1.5 font-medium print:font-bold text-slate-800 print:text-black leading-tight truncate whitespace-nowrap" title={item.name}>{item.name}</div>
                
                {/* READ ONLY INPUTS */}
                <input 
                  type="text" 
                  value={readings1st[key] || ''} 
                  readOnly 
                  className="w-full text-center outline-none bg-transparent font-black text-[#00A3FF] print:text-black print:font-bold cursor-default select-none print:h-full" 
                  tabIndex={-1} 
                />
                <input 
                  type="text" 
                  value={readings2nd[key] || ''} 
                  readOnly 
                  className="w-full text-center outline-none bg-transparent font-black text-[#00A3FF] print:text-black print:font-bold cursor-default select-none print:h-full" 
                  tabIndex={-1} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Signature Card (For Provider 1, 2, 3)
const SignatureCard = ({ title, data, onCheck, onNameChange, onDateChange }) => (
  <div className="bg-white border-2 border-slate-300 rounded-lg p-5 shadow-sm print:border-[1px] print:border-slate-400 print:rounded-none print:p-2 h-full flex flex-col justify-start">
    <h4 className="font-black text-slate-800 text-[14px] mb-5 print:text-[8px] print:text-black print:mb-1.5 uppercase leading-none">{title}</h4>
    
    <div className="flex items-end gap-2 mb-5 w-full print:mb-1.5">
      <span className="text-[13px] font-bold text-slate-800 print:text-black print:text-[8px] leading-none">Name:</span> 
      <input type="text" value={data.name} onChange={(e) => onNameChange(e.target.value)} className="border-b border-dashed border-slate-400 bg-transparent h-6 flex-1 outline-none px-1 text-[13px] font-bold text-[#00A3FF] print:text-black print:text-[8px] print:h-3 print:border-solid print:border-black focus:bg-slate-50" />
    </div>

    <label className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800 mb-5 cursor-pointer print:text-black print:text-[8px] print:mb-1.5 leading-none">
       <input type="checkbox" checked={data.checked} onChange={(e) => onCheck(e.target.checked)} className="w-4 h-4 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" /> Sig: 
       <div className="border-b border-black flex-1 ml-1 h-5 print:h-2"></div>
    </label>

    <div className="flex items-end gap-2 w-full mt-auto">
      <span className="text-[13px] font-bold text-slate-800 print:text-black print:text-[8px] leading-none">Date:</span> 
      <input type="text" value={data.date} onChange={(e) => onDateChange(e.target.value)} className="border border-black bg-transparent h-7 w-32 outline-none px-2 text-[13px] font-bold text-[#00A3FF] print:text-black print:h-3 print:w-16 print:text-[8px] print:rounded-none focus:border-[#00A3FF] print:px-1" />
    </div>
  </div>
);

// Specific Date Tracking Card (For MA Applied / Removed)
const DateTrackingCard = ({ maApplied, maRemoved, onAppliedCheck, onAppliedNameChange, onAppliedDateChange, onRemovedCheck, onRemovedNameChange, onRemovedDateChange }) => (
  <div className="bg-white border-2 border-slate-300 rounded-lg p-5 shadow-sm print:border-[1px] print:border-slate-400 print:rounded-none print:p-2 h-full flex flex-col justify-start">
    
    {/* Date Applied Section */}
    <div className="flex flex-col gap-1 mb-3 print:mb-1.5">
      <span className="text-[13px] font-bold text-slate-800 print:text-black print:text-[8px] leading-none">Date Applied:</span> 
      <input type="text" value={maApplied.date} onChange={(e) => onAppliedDateChange(e.target.value)} className="border border-black bg-transparent h-7 w-full outline-none px-2 text-[13px] font-bold text-[#00A3FF] print:text-black print:h-3 print:text-[8px] print:rounded-none focus:border-[#00A3FF]" />
    </div>
    <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800 mb-6 print:text-black print:text-[8px] print:mb-2 leading-none">
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input type="checkbox" checked={maApplied.checked} onChange={(e) => onAppliedCheck(e.target.checked)} className="w-4 h-4 accent-[#00A3FF] print:w-2.5 print:h-2.5 print:accent-black cursor-pointer" /> MA: 
      </label>
      <input type="text" value={maApplied.name} onChange={(e) => onAppliedNameChange(e.target.value)} className="border-b border-dashed border-slate-400 flex-1 outline-none px-1 text-[13px] font-bold text-[#00A3FF] print:text-black print:text-[8px] print:h-3 print:border-solid print:border-black focus:bg-slate-50" />
    </div>

    {/* Date Removed Section */}
    <div className="flex flex-col gap-1 mb-3 print:mb-1.5 mt-auto">
      <span className="text-[13px] font-bold text-slate-800 print:text-black print:text-[8px] leading-none">Date Removed:</span> 
      <input type="text" value={maRemoved.date} onChange={(e) => onRemovedDateChange(e.target.value)} className="border border-black bg-transparent h-7 w-full outline-none px-2 text-[13px] font-bold text-[#00A3FF] print:text-black print:h-3 print:text-[8px] print:rounded-none focus:border-[#00A3FF]" />
    </div>
    <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-800 print:text-black print:text-[8px] leading-none">
      <label className="flex items-center gap-1.5 cursor-pointer">
        <input type="checkbox" checked={maRemoved.checked} onChange={(e) => onRemovedCheck(e.target.checked)} className="w-4 h-4 accent-[#00A3FF] print:w-2.5 print:h-2.5 print:accent-black cursor-pointer" /> MA: 
      </label>
      <input type="text" value={maRemoved.name} onChange={(e) => onRemovedNameChange(e.target.value)} className="border-b border-dashed border-slate-400 flex-1 outline-none px-1 text-[13px] font-bold text-[#00A3FF] print:text-black print:text-[8px] print:h-3 print:border-solid print:border-black focus:bg-slate-50" />
    </div>
    
  </div>
);

export default PatchTestingForm;