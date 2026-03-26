import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Save, Printer, Plus, CheckSquare, FileText, File } from 'lucide-react';

const RadioTestingForm = ({ isOpen, onClose, patientName, testTitle, panelsData }) => {
  const [scores, setScores] = useState({});
  const [ids, setIdValues] = useState({});
  
  const [pendingExtraItem, setPendingExtraItem] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]); 

  // ✅ Printing States
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [isPrintingUnfilled, setIsPrintingUnfilled] = useState(false);

  useEffect(() => {
    if (panelsData && panelsData.length > 0) {
      const initialScores = {};
      panelsData.forEach(panel => {
        panel.items.forEach(item => {
          const key = `${panel.categoryId}_${item.code}`;
          if (initialScores[key] === undefined) {
            initialScores[key] = 0;
          }
        });
      });
      setScores(prev => ({ ...initialScores, ...prev }));
    }
  }, [panelsData]);

  if (!isOpen) return null;

  if (!panelsData || !Array.isArray(panelsData) || panelsData.length === 0) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
        <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4 max-w-sm text-center">
          <AlertCircle size={40} className="text-red-500" />
          <div>
            <h3 className="font-bold text-lg text-slate-800">No Data Found</h3>
            <p className="text-sm text-slate-500 mt-1">The form could not find the data for <b>{testTitle}</b>.</p>
          </div>
          <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-2 rounded-lg font-bold">Go Back</button>
        </div>
      </div>
    );
  }

  const handleScoreChange = (panelId, code, value) => {
    setScores(prev => ({ ...prev, [`${panelId}_${code}`]: value }));
  };

  const handleIdChange = (panelId, code, value) => {
    setIdValues(prev => ({ ...prev, [`${panelId}_${code}`]: value }));
  };

  const handleRowDoubleClick = (item) => {
    setPendingExtraItem(item);
  };

  const handleConfirmExtraOption = () => {
    if (!extraOptions.some(e => e.code === pendingExtraItem.code)) {
      setExtraOptions([...extraOptions, pendingExtraItem]);
      setScores(prev => ({ ...prev, [`EXTRA_${pendingExtraItem.code}`]: 0 }));
    }
    setPendingExtraItem(null); 
  };

  // ✅ PRINT HANDLERS
  const triggerFilledPrint = () => {
    setIsPrintingUnfilled(false);
    setShowPrintOptions(false);
    setTimeout(() => { window.print(); }, 100);
  };

  const triggerUnfilledPrint = () => {
    setIsPrintingUnfilled(true);
    setShowPrintOptions(false);
    setTimeout(() => { 
      window.print(); 
      setIsPrintingUnfilled(false); 
    }, 100);
  };

  return (
    <>
      <style type="text/css" media="all">
        {`
          .inactive-overlay {
            background-image: repeating-linear-gradient(
              45deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04) 10px,
              rgba(255, 255, 255, 0.5) 10px, rgba(255, 255, 255, 0.5) 20px
            );
          }
        `}
      </style>
      <style type="text/css" media="print">
        {`
          @page { 
            size: A4 portrait; 
            margin: 5mm; 
          }
          body * { visibility: hidden !important; }
          #printable-radio-form, #printable-radio-form * { visibility: visible !important; }
          #printable-radio-form {
            position: absolute !important; 
            left: 0 !important; 
            top: 0 !important;
            width: 100% !important; 
            height: 99.5% !important; 
            margin: 0 !important;
            padding: 0 !important; 
            background: white !important;
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            display: flex !important;
            flex-direction: column !important;
          }
        `}
      </style>

      {/* PRINT OPTION MODAL */}
      {showPrintOptions && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 print:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="bg-[#2A333A] px-5 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-[16px]">Print Options</h3>
              <button onClick={() => setShowPrintOptions(false)}><X size={20}/></button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <button onClick={triggerFilledPrint} className="flex items-center gap-4 w-full p-4 border-2 border-slate-100 rounded-xl hover:border-[#00A3FF] hover:bg-blue-50 transition-all text-left group">
                <div className="bg-blue-100 p-2 rounded-lg text-[#00A3FF] group-hover:bg-[#00A3FF] group-hover:text-white transition-colors">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Filled Form</div>
                  <div className="text-[11px] text-slate-500 font-medium">Prints results and patient data</div>
                </div>
              </button>
              <button onClick={triggerUnfilledPrint} className="flex items-center gap-4 w-full p-4 border-2 border-slate-100 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all text-left group">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-50 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                  <File size={24} />
                </div>
                <div>
                  <div className="font-bold text-slate-800">Unfilled (Hard Copy)</div>
                  <div className="text-[11px] text-slate-500 font-medium">Removes radio buttons & text for manual entry</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {pendingExtraItem && (
        <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 print:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="border-b-[3px] border-[#00A3FF] px-5 py-4 flex justify-between items-start bg-white">
              <div>
                <h3 className="text-[#00A3FF] font-bold text-[17px] tracking-wide">Confirm Extra Option</h3>
                <p className="text-slate-500 text-xs mt-0.5 font-medium">This ingredient will be added separately</p>
              </div>
              <button onClick={() => setPendingExtraItem(null)} className="text-slate-400 hover:text-slate-700 transition-colors p-1 -mr-2">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-6 flex flex-col items-center text-center bg-white">
              <div className="w-16 h-16 bg-[#00A3FF] rounded-full flex items-center justify-center shadow-lg shadow-[#00A3FF]/30 mb-5 text-white">
                 <Plus size={32} strokeWidth={2.5} />
              </div>
              <h4 className="font-bold text-slate-800 text-[15px]">Add <span className="text-[#00A3FF]">{pendingExtraItem.code}</span> as an Extra Option?</h4>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 flex justify-between bg-slate-50/50">
              <button onClick={() => setPendingExtraItem(null)} className="border-2 border-slate-300 rounded-full px-6 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors">Cancel</button>
              <button onClick={handleConfirmExtraOption} className="bg-[#00A3FF] text-white rounded-full px-6 py-2 font-bold text-sm flex items-center gap-2 hover:bg-[#008CE6] shadow-md transition-all active:scale-95">
                 <CheckSquare size={16} strokeWidth={2.5} /> Yes, Add Extra
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="printable-radio-form" className="fixed inset-0 z-[99999] flex justify-center bg-slate-900/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto print:absolute print:inset-0 print:bg-white print:p-0 print:block print:overflow-visible print:h-auto">
        <div className="bg-white w-full max-w-[1450px] h-max min-h-[95vh] rounded-xl shadow-2xl flex flex-col border border-slate-300 print:w-full print:max-w-none print:border-none print:shadow-none print:rounded-none print:flex print:flex-col print:h-full">
          
          {/* --- HEADER --- */}
          <div className="px-6 py-4 flex items-center justify-between border-b-2 border-slate-300 shrink-0 relative print:border-black print:py-3 print:px-6">
            <div className="flex items-center gap-3 z-10 print:gap-3">
              <img src="/download.png" alt="Sierra Allergy Logo" className="h-10 object-contain shrink-0 print:h-14" />
              <div className="flex flex-col">
                <span className="text-[15px] font-black leading-tight text-slate-800 tracking-wide uppercase print:text-[16px]">SIERRA ALLERGY</span>
                <span className="text-[10px] font-bold text-slate-500 leading-none uppercase print:text-[11px]">ASTHMA AND SINUS CENTER</span>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-500 leading-none mb-1 print:text-[13px] print:mb-1.5">{testTitle}</span>
              <h2 className="text-2xl font-black text-[#00A3FF] tracking-wide leading-none print:text-[22px] print:text-black">
                {isPrintingUnfilled ? "" : patientName}
              </h2>
            </div>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors z-10 print:hidden">
              <X size={28} strokeWidth={2.5} />
            </button>
          </div>

          {/* --- MAIN GRID BODY --- */}
          <div className="p-5 bg-[#f1f5f9] flex-1 print:bg-white print:p-5 print:flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-4 print:gap-x-5 print:gap-y-8">
              {panelsData.map((category) => (
                <ExtractPanel 
                  key={category.categoryId} 
                  data={category} 
                  scores={scores}
                  ids={ids}
                  onScoreChange={handleScoreChange}
                  onIdChange={handleIdChange}
                  onRowDoubleClick={handleRowDoubleClick} 
                  isPrintingUnfilled={isPrintingUnfilled}
                />
              ))}
            </div>
          </div>

          {/* --- FOOTER --- */}
          <div className="bg-white shrink-0 flex flex-col border-t-2 border-slate-300 print:border-none print:mt-auto print:pb-6">
            <div className="px-6 py-4 print:px-6 print:py-3">
              <div className="border border-black bg-white text-slate-800 text-center py-2.5 text-[12px] font-bold rounded-sm w-full print:text-[11px] print:py-2">
                0 (&gt;0 mm No reaction), 1+ (1-3 mm Mild), 2+ (4-8 mm Moderate), 3+ (9-12 mm Strong), 4+ (13-99 mm Very strong or pseudopod)
              </div>
            </div>

            <div className="px-6 print:px-6">
              <div className="border-b-2 border-black w-full"></div>
            </div>

            {/* Signatures Grid */}
            <div className="grid grid-cols-3 px-6 pb-6 pt-3 print:px-6 print:pb-6 print:pt-6 print:grid-cols-3 print:gap-6">
              {[1, 2, 3].map((col) => (
                <div key={col} className={`flex flex-col text-[12px] text-slate-800 ${col > 1 ? 'border-l border-slate-300 pl-8' : 'pr-6'} print:text-[11px] print:pl-6 print:pr-2 print:border-black`}>
                  <label className="flex items-center gap-2 font-black mb-2.5 ml-16 print:ml-0 cursor-pointer print:mb-3">
                    <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] print:accent-black" /> Signed By {col === 3 ? 'IDs' : 'SPT'} Ordering Provider:
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer print:mb-2.5"><input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] print:accent-black" /> SAASC</label>
                  <div className="flex items-center gap-2 mt-1 print:mb-5"><input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] print:accent-black" /><div className="border-b border-black w-40 print:w-full"></div></div>
                  <div className="font-bold mt-4 print:mt-3">Signature: ______________________</div>
                  <div className="flex items-end gap-2 mt-5 w-full max-w-[240px] print:max-w-none print:mt-4">
                    <span className="w-12 print:w-14 text-[11px] print:text-[10px] font-black">Date :</span> 
                    <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:text-[11px]" />
                  </div>
                  <div className="flex items-end gap-2 mt-2.5 w-full max-w-[240px] print:max-w-none">
                    <span className="w-12 print:w-14 text-[11px] print:text-[10px] font-black">{col === 3 ? 'IDs' : 'SPT'} :</span> 
                    <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:text-[11px]" />
                  </div>
                  <div className="flex items-end gap-2 mt-2.5 w-full max-w-[240px] print:max-w-none">
                    <span className="w-12 print:w-14 text-[11px] print:text-[10px] font-black">MA :</span> 
                    <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:text-[11px]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="bg-[#f1f5f9] px-6 py-4 flex justify-end gap-4 border-t border-slate-300 print:hidden">
              <button type="button" onClick={onClose} className="bg-[#64748b] hover:bg-slate-600 text-white font-bold text-sm px-8 py-2.5 rounded shadow">Close</button>
              <button type="button" onClick={() => { console.log("Saving:", { scores, ids, extraOptions }); onClose(); }} className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm px-8 py-2.5 rounded shadow flex items-center gap-2"><Save size={18} /> Save</button>
              <button type="button" onClick={() => setShowPrintOptions(true)} className="bg-[#00A3FF] hover:bg-[#008CE6] text-white font-bold text-sm px-8 py-2.5 rounded shadow flex items-center gap-2"><Printer size={18} /> Print</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const screenGrid = "grid-cols-[40px_1fr_36px_36px_36px_36px_36px_48px]";
const printGrid = "print:grid-cols-[28px_1fr_24px_24px_24px_24px_24px_32px]";

const ExtractPanel = ({ data, scores, ids, onScoreChange, onIdChange, onRowDoubleClick, isPrintingUnfilled }) => {
  const [isActive, setIsActive] = useState(true);
  return (
    <div className={`relative bg-white border-2 border-slate-400 rounded-lg flex flex-col overflow-hidden shadow-sm print:border-[1.5px] print:border-black transition-all duration-200 ${!isActive ? 'opacity-70 grayscale' : ''}`}>
      {!isActive && (<div className="absolute inset-0 z-10 inactive-overlay pointer-events-none print:hidden"></div>)}
      <div className={`${isActive ? 'bg-[#2A333A]' : 'bg-[#64748B]'} text-white px-3.5 py-2.5 flex items-center justify-between border-b-2 border-slate-400 shrink-0 print:border-black print:bg-[#283541] print:text-white print:py-1.5 print:px-3 relative z-20`}>
        <h3 className="font-bold text-[15px] tracking-wide print:text-[12px]">{data.categoryName}</h3>
        <label className="flex items-center gap-1.5 text-[11px] font-bold cursor-pointer print:hidden"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 accent-[#00A3FF]" /> Active</label>
      </div>
      <div className={`flex flex-col flex-1 ${!isActive ? 'pointer-events-none' : ''}`}>
        <div className={`grid ${screenGrid} ${printGrid} divide-x divide-slate-400 bg-slate-100 border-b-2 border-slate-400 text-[12px] font-bold text-slate-700 text-center items-center print:text-[10px] print:divide-black print:border-black`}>
          <div className="py-2.5 print:py-1.5">#</div><div className="text-left pl-2.5 py-2.5 print:py-1.5">Extracts</div>
          <div>0</div><div>1</div><div>2</div><div>3</div><div>4</div><div>ID</div>
        </div>
        <div className="flex flex-col bg-white divide-y divide-slate-300 flex-1 print:divide-black">
          {data.items.map((item) => {
            const compositeKey = `${data.categoryId}_${item.code}`;
            return (
              <div key={compositeKey} onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(item)} className={`grid ${screenGrid} ${printGrid} divide-x divide-slate-300 hover:bg-[#00A3FF]/10 text-[13px] text-slate-800 flex-1 print:text-[10.5px] print:divide-black ${onRowDoubleClick ? 'cursor-pointer' : ''}`}>
                <div className="flex items-center justify-center font-bold py-2 print:py-1.5">{item.code}</div>
                <div className="flex items-center pl-2.5 font-medium truncate whitespace-nowrap print:pl-2 print:font-bold">{item.name}</div>
                {[0, 1, 2, 3, 4].map((val) => (
                  <div key={val} className="flex items-center justify-center h-full">
                    {!isPrintingUnfilled && (
                      <input 
                        type="radio" 
                        name={`score_${compositeKey}`} 
                        checked={scores[compositeKey] === val}
                        onChange={() => onScoreChange(data.categoryId, item.code, val)}
                        className="appearance-none m-0 flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] border-slate-400 bg-white cursor-pointer checked:border-[#00A3FF] before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:bg-[#00A3FF] before:scale-0 checked:before:scale-100 print:w-[11px] print:h-[11px] print:border-black print:before:bg-black" 
                      />
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-center px-1.5 print:px-[1px]">
                  <input type="text" value={isPrintingUnfilled ? "" : (ids[compositeKey] || '')} onChange={(e) => onIdChange(data.categoryId, item.code, e.target.value)} className="w-full h-6 border border-slate-300 rounded-sm text-center outline-none focus:border-[#00A3FF] text-[12px] print:h-4.5 print:border-black print:text-[10px]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RadioTestingForm;