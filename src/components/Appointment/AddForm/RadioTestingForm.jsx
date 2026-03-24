import React, { useState, useEffect } from 'react';
import { X, AlertCircle, Save, Printer, Plus, CheckSquare } from 'lucide-react';

const RadioTestingForm = ({ isOpen, onClose, patientName, testTitle, panelsData }) => {
  const [scores, setScores] = useState({});
  const [ids, setIdValues] = useState({});
  
  const [pendingExtraItem, setPendingExtraItem] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]); 

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
          @page { size: A4 portrait; margin: 8mm; }
          body * { visibility: hidden !important; }
          #printable-radio-form, #printable-radio-form * { visibility: visible !important; }
          #printable-radio-form {
            position: absolute !important; left: 0 !important; top: 0 !important;
            width: 100% !important; height: auto !important; margin: 0 !important;
            padding: 0 !important; background: white !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; 
          }
        `}
      </style>

      {/* --- CONFIRMATION MODAL (Extra Option) --- */}
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
              <h4 className="font-bold text-slate-800 text-[15px]">Add this ingredient as an <span className="text-[#00A3FF]">Extra Option</span>?</h4>
              <p className="text-slate-500 text-xs font-medium mt-1">This will appear in the Extra Options table.</p>

              <div className="w-full mt-6 border border-slate-200 rounded-lg p-4 text-left shadow-sm bg-[#00A3FF]/5">
                <div className="text-[#00A3FF] text-[10px] font-black tracking-widest uppercase mb-2">Selected Ingredient</div>
                <div className="font-black text-slate-800 text-sm">{pendingExtraItem.code}</div>
                <div className="text-slate-600 text-sm font-medium mt-0.5">{pendingExtraItem.name}</div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-100 flex justify-between bg-slate-50/50">
              <button onClick={() => setPendingExtraItem(null)} className="border-2 border-slate-300 rounded-full px-6 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors">
                Cancel
              </button>
              <button onClick={handleConfirmExtraOption} className="bg-[#00A3FF] text-white rounded-full px-6 py-2 font-bold text-sm flex items-center gap-2 hover:bg-[#008CE6] shadow-md shadow-[#00A3FF]/20 transition-all active:scale-95">
                 <CheckSquare size={16} strokeWidth={2.5} /> Yes, Add Extra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OUTER WRAPPER */}
      <div 
        id="printable-radio-form"
        className="fixed inset-0 z-[99999] flex justify-center bg-slate-900/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto print:absolute print:inset-0 print:bg-white print:p-0 print:block print:overflow-visible print:h-auto"
      >
        <div className="bg-white w-full max-w-[1400px] h-max min-h-[95vh] rounded-xl shadow-2xl flex flex-col border border-slate-300 print:w-full print:max-w-none print:border-none print:shadow-none print:rounded-none print:block">
          
          {/* --- HEADER --- */}
          <div className="px-6 py-4 flex items-center justify-between border-b-2 border-slate-300 shrink-0 relative print:border-black print:py-1 print:px-2">
            <div className="flex items-center gap-3 z-10 print:gap-1.5">
              {/* UPDATED LOGO IMAGE */}
              <img src="/download.png" alt="Sierra Allergy Logo" className="h-10 object-contain shrink-0 print:h-8" />
              <div className="flex flex-col">
                <span className="text-[15px] font-black leading-tight text-slate-800 tracking-wide uppercase print:text-[11px]">SIERRA ALLERGY</span>
                <span className="text-[10px] font-bold text-slate-500 leading-none uppercase print:text-[8px]">ASTHMA AND SINUS CENTER</span>
              </div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-bold text-slate-500 leading-none mb-1 print:text-[9px] print:mb-0.5">{testTitle}</span>
              <h2 className="text-2xl font-black text-[#00A3FF] tracking-wide leading-none print:text-base">{patientName}</h2>
            </div>
            
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors z-10 print:hidden">
              <X size={28} strokeWidth={2.5} />
            </button>
          </div>

          {/* --- MAIN GRID BODY --- */}
          <div className="p-4 bg-[#f1f5f9] flex-1 print:bg-white print:p-1.5 print:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-3 print:gap-1.5">
              {panelsData.map((category) => (
                <ExtractPanel 
                  key={category.categoryId} 
                  data={category} 
                  scores={scores}
                  ids={ids}
                  onScoreChange={handleScoreChange}
                  onIdChange={handleIdChange}
                  onRowDoubleClick={handleRowDoubleClick} 
                />
              ))}
            </div>
          </div>

          {/* --- FOOTER --- */}
          <div className="bg-white shrink-0 flex flex-col border-t-2 border-slate-300 print:border-none print:block print:mt-1">
            
            <div className="px-6 py-3 print:px-1.5 print:pb-1 print:pt-1">
              <div className="border border-black bg-white text-slate-800 text-center py-2 text-[12px] font-medium rounded-sm w-full print:text-[8px] print:py-0.5">
                0 (&gt;0 mm No reaction), 1+ (1-3 mm Mild), 2+ (4-8 mm Moderate), 3+ (9-12 mm Strong), 4+ (13-99 mm Very strong or pseudopod)
              </div>
            </div>

            <div className="px-6 print:px-1.5 mb-2 print:mb-1">
              <div className="border-b border-black w-full"></div>
            </div>

            {/* Signatures Grid */}
            <div className="grid grid-cols-3 px-6 pb-6 pt-1 print:px-2 print:pb-2 print:pt-0 print:grid-cols-3">
              
              {/* Column 1 */}
              <div className="flex flex-col text-[12px] text-slate-800 print:text-[9px] pr-4 print:pr-2">
                <label className="flex items-center gap-2 font-medium mb-2 ml-16 print:ml-10 cursor-pointer print:mb-1 print:gap-1.5">
                   <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" /> Signed By SPT Ordering Provider:
                </label>
                <label className="flex items-center gap-2 cursor-pointer print:gap-1.5"><input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] print:w-2.5 print:h-2.5 print:accent-black" /> SAASC</label>
                <div className="flex items-center gap-2 mt-1 print:gap-1.5 print:mt-0.5">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" />
                  <div className="border-b border-black w-36 print:w-24"></div>
                </div>
                <div className="font-bold mt-3 print:mt-1.5">Signature:</div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">Date :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">SPT :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">MA :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col text-[12px] text-slate-800 border-l border-slate-300 pl-6 pr-4 print:pl-3 print:pr-2 print:border-slate-300 print:text-[9px]">
                <label className="flex items-center gap-2 font-medium mb-2 ml-16 print:ml-10 cursor-pointer print:mb-1 print:gap-1.5">
                   <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" /> Signed By SPT Ordering Provider:
                </label>
                <label className="flex items-center gap-2 cursor-pointer print:gap-1.5"><input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] print:w-2.5 print:h-2.5 print:accent-black" /> SAASC</label>
                <div className="flex items-center gap-2 mt-1 print:gap-1.5 print:mt-0.5">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" />
                  <div className="border-b border-black w-36 print:w-24"></div>
                </div>
                <div className="font-bold mt-3 print:mt-1.5">Signature:</div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">Date :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">SPT :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">MA :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col text-[12px] text-slate-800 border-l border-slate-300 pl-6 pr-2 print:pl-3 print:border-slate-300 print:text-[9px]">
                <label className="flex items-center gap-2 font-medium mb-2 ml-16 print:ml-10 cursor-pointer print:mb-1 print:gap-1.5">
                   <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" /> Signed By IDs Ordering Provider:
               </label>
                <label className="flex items-center gap-2 cursor-pointer print:gap-1.5"><input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] print:w-2.5 print:h-2.5 print:accent-black" /> SAASC</label>
                <div className="flex items-center gap-2 mt-1 print:gap-1.5 print:mt-0.5">
                  <input type="checkbox" className="w-3.5 h-3.5 accent-[#00A3FF] cursor-pointer print:w-2.5 print:h-2.5 print:accent-black" />
                  <div className="border-b border-black w-36 print:w-24"></div>
                </div>
                <div className="font-bold mt-3 print:mt-1.5">Signature:</div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">Date :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">IDs :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
                <div className="flex items-end gap-2 mt-1.5 w-full max-w-[220px] print:max-w-[160px] print:mt-1">
                  <span className="w-10 print:w-8 text-[11px] print:text-[8px]">MA :</span> 
                  <input type="text" className="border-b border-black bg-transparent h-5 flex-1 outline-none px-1 text-[12px] font-bold text-black print:h-3 print:text-[8px] focus:bg-slate-50" />
                </div>
              </div>

            </div>

            {/* --- EXTRA OPTIONS CONTAINER --- */}
            {extraOptions.length > 0 && (
              <div className="px-6 pb-6 pt-2 print:px-1.5 print:pb-2 print:pt-1">
                <div className="border-t-[3px] border-[#00A3FF] print:border-black mb-4 print:mb-2 w-full"></div>
                <h3 className="font-black text-slate-800 text-base mb-3 print:text-[10px] print:mb-1.5 uppercase tracking-wide text-center">Extra Options Added</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 gap-3 print:gap-1.5">
                  <ExtractPanel
                    data={{ categoryId: 'EXTRA', categoryName: 'Extra Options', items: extraOptions }}
                    scores={scores}
                    ids={ids}
                    onScoreChange={handleScoreChange}
                    onIdChange={handleIdChange}
                    onRowDoubleClick={null} 
                  />
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="bg-[#f1f5f9] px-6 py-4 flex justify-end gap-4 border-t border-slate-300 print:hidden">
              <button 
                type="button" 
                onClick={onClose} 
                className="bg-[#64748b] hover:bg-slate-600 text-white font-bold text-sm px-8 py-2.5 rounded shadow transition-colors"
              >
                Close
              </button>
              <button 
                type="button" 
                onClick={() => {
                   console.log("Saving Data:", { scores, ids, extraOptions });
                   onClose();
                }} 
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm px-8 py-2.5 rounded shadow transition-colors flex items-center gap-2"
              >
                <Save size={18} strokeWidth={2.5} /> Save
              </button>
              <button 
                type="button" 
                onClick={() => window.print()} 
                className="bg-[#00A3FF] hover:bg-[#008CE6] text-white font-bold text-sm px-8 py-2.5 rounded shadow transition-colors flex items-center gap-2"
              >
                <Printer size={18} strokeWidth={2.5} /> Print
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

// --- REUSABLE SUB-COMPONENT ---
const screenGrid = "grid-cols-[36px_1fr_32px_32px_32px_32px_32px_44px]";
const printGrid = "print:grid-cols-[20px_1fr_18px_18px_18px_18px_18px_24px]";

const ExtractPanel = ({ data, scores, ids, onScoreChange, onIdChange, onRowDoubleClick }) => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={`relative bg-white border-2 border-slate-400 rounded-lg flex flex-col overflow-hidden shadow-sm print:border-[1px] print:border-black print:rounded-none transition-all duration-200 ${!isActive ? 'opacity-70 grayscale' : ''}`}>
      
      {!isActive && (
        <div className="absolute inset-0 z-10 inactive-overlay pointer-events-none print:hidden"></div>
      )}

      {/* Panel Header */}
      <div className={`${isActive ? 'bg-[#2A333A]' : 'bg-[#64748B]'} text-white px-3 py-2 flex items-center justify-between border-b-2 border-slate-400 shrink-0 print:border-black print:bg-[#283541] print:text-white print:py-0.5 print:px-2 relative z-20 transition-colors`}>
        <h3 className="font-bold text-[14px] tracking-wide leading-none print:text-[9px]">{data.categoryName}</h3>
        <label className="flex items-center gap-1.5 text-[11px] font-bold cursor-pointer leading-none print:text-[7px]">
          <input 
            type="checkbox" 
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 accent-[#00A3FF] rounded-sm cursor-pointer print:w-2 print:h-2" 
          />
          Active
        </label>
      </div>

      <div className={`flex flex-col flex-1 ${!isActive ? 'pointer-events-none' : ''}`}>
        
        {/* Table Headers */}
        <div className={`grid ${screenGrid} ${printGrid} divide-x divide-slate-400 bg-slate-100 border-b-2 border-slate-400 text-[12px] font-bold text-slate-700 text-center items-center shrink-0 print:text-[7px] print:divide-black print:border-black print:bg-slate-100`}>
          <div className="py-2 print:py-[2px]">#</div>
          <div className="text-left pl-2 py-2 print:py-[2px] print:pl-1.5">Extracts</div>
          <div className="py-2 print:py-[2px]">0</div>
          <div className="py-2 print:py-[2px]">1</div>
          <div className="py-2 print:py-[2px]">2</div>
          <div className="py-2 print:py-[2px]">3</div>
          <div className="py-2 print:py-[2px]">4</div>
          <div className="py-2 print:py-[2px]">ID</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col bg-white divide-y divide-slate-300 flex-1 print:divide-black">
          {data.items.map((item) => {
            const compositeKey = `${data.categoryId}_${item.code}`;
            
            return (
              <div 
                key={compositeKey} 
                onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(item)}
                className={`grid ${screenGrid} ${printGrid} divide-x divide-slate-300 hover:bg-[#00A3FF]/10 text-[13px] text-slate-800 flex-1 print:text-[8px] print:divide-black ${onRowDoubleClick ? 'cursor-pointer' : ''}`}
                title={onRowDoubleClick ? "Double-click to add to Extra Options" : ""}
              >
                <div className="flex items-center justify-center font-bold py-1.5 print:py-[2px] select-none">{item.code}</div>
                
                <div className="flex items-center pl-2 font-medium truncate whitespace-nowrap leading-none print:pl-1.5 select-none">
                  {item.name}
                </div>
                
                {/* 100% CUSTOM CSS RADIO BUTTONS (No accent-color bleeding) */}
                {[0, 1, 2, 3, 4].map((val) => (
                  <div key={val} className="flex items-center justify-center">
                    <input 
                      type="radio" 
                      name={`score_${compositeKey}`} 
                      checked={scores[compositeKey] === val}
                      onChange={() => onScoreChange(data.categoryId, item.code, val)}
                      className="
                        appearance-none m-0 flex items-center justify-center
                        w-4 h-4 rounded-full border-[1.5px] border-slate-400 bg-white cursor-pointer transition-colors
                        checked:border-[#00A3FF]
                        before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:bg-[#00A3FF] before:scale-0 before:transition-transform
                        checked:before:scale-100
                        print:w-[9px] print:h-[9px] print:border-[1px] print:border-black print:checked:border-black
                        print:before:w-[5px] print:before:h-[5px] print:before:bg-black
                      " 
                    />
                  </div>
                ))}
                
                {/* Tiny ID Input Box */}
                <div className="flex items-center justify-center px-1.5 print:px-[1px]">
                  <input 
                    type="text" 
                    value={ids[compositeKey] || ''}
                    onChange={(e) => onIdChange(data.categoryId, item.code, e.target.value)}
                    className="w-full h-6 border border-slate-300 rounded-sm text-center outline-none focus:border-[#00A3FF] text-[12px] print:h-2.5 print:border-black print:text-[6px] print:rounded-none"
                  />
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