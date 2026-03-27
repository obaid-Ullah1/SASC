import React, { forwardRef } from 'react';

const AllergyRadioTemplate = forwardRef(({ 
  patientName, 
  testTitle, 
  panelsData, 
  scores, 
  ids, 
  printMode = 'filled' 
}, ref) => {
  const isUnfilled = printMode === 'unfilled';

  return (
    <div ref={ref} className="w-full bg-white text-black hidden print:flex print:flex-col font-sans h-screen min-h-[100vh] justify-between">
      <style type="text/css">
        {`
          @media print {
            @page { size: A4 portrait; margin: 8mm; }
            body { 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important; 
              background: white !important; 
              margin: 0; 
              padding: 0; 
            }
            .print-hidden { display: none !important; }
            
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table th, .print-table td { border: 1px solid #000; padding: 0; vertical-align: middle; text-align: center; }
            
            .print-table th { 
              background-color: #f8fafc !important; 
              font-weight: 700; 
              font-size: 8.5px; 
              text-transform: uppercase; 
              height: 17px !important; 
            }
            
            .print-table td { 
              font-size: 10px; 
              font-weight: 400 !important; 
              height: 19px !important; 
            }
            
            .radio-dot { width: 8px; height: 8px; border-radius: 50%; border: 1px solid black; display: inline-block; }
            .radio-dot-filled { background-color: black !important; }
            .checkbox-box { width: 9px; height: 9px; border: 1px solid black; display: inline-block; background: white; }
          }
        `}
      </style>
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end border-b-[2px] border-black pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-3">
          <img src="/download.png" alt="Sierra Allergy Logo" className="h-11 object-contain" />
          <div className="flex flex-col">
            <span className="text-[14px] font-black uppercase leading-tight tracking-wide text-black">Sierra Allergy</span>
            <span className="text-[10px] font-bold text-slate-600 uppercase leading-tight">Asthma and Sinus Center</span>
          </div>
        </div>
        <div className="flex gap-8 items-center text-[12px] text-black pb-1 pr-2">
          <div className="font-black uppercase mr-2 text-[13px]">{testTitle}</div>
          <div><span className="font-black uppercase mr-2 text-[12px]">Patient:</span><span className="font-bold">{patientName}</span></div>
        </div>
      </div>

      {/* --- GRID BODY --- */}
      {/* Set gap-y-2 to add a slight vertical gap between containers */}
      <div className="grid grid-cols-3 gap-x-4 gap-y-2 items-start overflow-hidden px-0.5">
        {panelsData.map((panel) => (
          <div key={panel.categoryId} className="flex flex-col border border-black rounded-sm overflow-hidden shrink-0">
            <div className="bg-[#1e293b] text-white text-[10px] font-bold px-1 py-[3px] text-center border-b border-black uppercase tracking-wide">
              {panel.categoryName}
            </div>
            <table className="print-table">
              <thead>
                <tr>
                  <th style={{ width: '12%' }}>#</th>
                  <th style={{ width: '48%' }} className="text-left px-1">Extract</th>
                  <th style={{ width: '8%' }}>0</th>
                  <th style={{ width: '8%' }}>1</th>
                  <th style={{ width: '8%' }}>2</th>
                  <th style={{ width: '8%' }}>3</th>
                  <th style={{ width: '8%' }}>4</th>
                  <th style={{ width: '15%' }}>ID</th>
                </tr>
              </thead>
              <tbody>
                {panel.items.map((item) => {
                  const key = `${panel.categoryId}_${item.code}`;
                  return (
                    <tr key={key}>
                      <td className="font-bold">{item.code}</td>
                      <td className="text-left px-1 truncate">{item.name}</td>
                      {[0, 1, 2, 3, 4].map((val) => (
                        <td key={val}>
                          {!isUnfilled && (
                            <div className={`radio-dot ${scores[key] === val ? 'radio-dot-filled' : ''}`} />
                          )}
                        </td>
                      ))}
                      <td>{!isUnfilled ? ids[key] : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* --- FOOTER SECTION (Anchored to bottom) --- */}
      <div className="shrink-0 flex flex-col mt-auto pb-35">
        <div className="border border-black p-1 text-[9px] text-center font-bold rounded-sm w-full mb-2">
          0 (&gt;0 mm No reaction), 1+ (1-3 mm Mild), 2+ (4-8 mm Moderate), 3+ (9-12 mm Strong), 4+ (13-99 mm Very strong or pseudopod)
        </div>

        <div className="border-b-[2px] border-black w-full mb-2"></div>

        <div className="grid grid-cols-3 px-1 gap-4">
          {[1, 2, 3].map((col) => (
            <div key={col} className={`flex flex-col text-[10px] text-black ${col > 1 ? 'border-l border-black pl-5' : 'pr-1'}`}>
              <div className="flex flex-col gap-1 mb-1.5">
                <label className="flex items-center gap-1.5 font-bold text-[9px]">
                  <div className="checkbox-box"></div>
                  Signed By {col === 3 ? 'IDs' : 'SPT'} Ordering Provider:
                </label>
                <div className="flex items-center gap-5 mt-0.5">
                    <label className="flex items-center gap-1.5 text-[9px] font-normal"><div className="checkbox-box"></div> SAASC</label>
                    <div className="flex items-center gap-1.5"><div className="checkbox-box"></div> <div className="border-b border-black w-28"></div></div>
                </div>
              </div>
              
              <div className="font-normal mb-2 flex items-end text-[10px]">
                Signature: <div className="border-b border-black flex-1 ml-1 h-3.5"></div>
              </div>
              
              <div className="flex items-center gap-3 w-full text-[9px]">
                <div className="flex items-end flex-1 min-w-0">
                  <span className="font-bold mr-1 whitespace-nowrap">Date:</span> 
                  <div className="border-b border-black flex-1 h-3"></div>
                </div>
                <div className="flex items-end flex-1 min-w-0">
                  <span className="font-bold mr-1 whitespace-nowrap">{col === 3 ? 'IDs' : 'SPT'}:</span> 
                  <div className="border-b border-black flex-1 h-3"></div>
                </div>
                <div className="flex items-end flex-1 min-w-0">
                  <span className="font-bold mr-1 whitespace-nowrap">MA:</span> 
                  <div className="border-b border-black flex-1 h-3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default AllergyRadioTemplate;