import React, { forwardRef } from 'react';

const ChemicalRadioTemplate = forwardRef(({ 
  patientName, 
  testTitle, 
  panelsData, 
  readings1st = {}, 
  readings2nd = {}, 
  sigApp, 
  sig1st, 
  sig2nd, 
  maApplied, 
  maRemoved 
}, ref) => {

  // Grouping panels and cards into 4 logical rows for perfect horizontal alignment
  const rows = [
    { p1: panelsData[0], p2: panelsData[1], card: 'sigApp', title: 'PROVIDER (APPLICATION):' },
    { p1: panelsData[2], p2: panelsData[3], card: 'sig1st', title: 'PROVIDER (1ST READING):' },
    { p1: panelsData[4], p2: panelsData[5], card: 'sig2nd', title: 'PROVIDER (2ND READING):' },
    { p1: panelsData[6], p2: panelsData[7], card: 'ma' }
  ];

  return (
    <div ref={ref} className="w-full bg-white text-black flex flex-col font-sans h-screen min-h-[100vh] px-5 py-2">
      <style type="text/css">
        {`
          @media print {
            @page { size: A4 portrait; margin: 6mm; }
            body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; margin: 0; padding: 0; }
            .print-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
            .print-table th, .print-table td { border: 1px solid #000; padding: 0; vertical-align: middle; text-align: center; }
            .print-table th { background-color: #f8fafc !important; font-weight: 700; font-size: 8px; text-transform: uppercase; height: 18px !important; }
            
            /* Professional height to fill the A4 page perfectly without empty gaps */
            .print-table td { font-size: 9.5px; font-weight: 600; height: 23.5px !important; }
            
            .checkbox-box { width: 11px; height: 11px; border: 1.2px solid black; display: inline-block; background: white; margin-right: 4px; vertical-align: middle; }
            .checkbox-checked { background-color: black !important; position: relative; }
            .checkbox-checked::after { content: '✔'; color: white; font-size: 9px; position: absolute; top: -4px; left: 1.5px; }
          }
        `}
      </style>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-end border-b-[2.5px] border-black pb-2 mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <img src="/download.png" alt="Logo" className="h-11 object-contain" />
          <div className="flex flex-col">
            <span className="text-[15px] font-black uppercase leading-tight tracking-wide">Sierra Allergy</span>
            <span className="text-[9px] font-bold text-slate-600 uppercase leading-tight">Asthma and Sinus Center</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-0.5">Patch Test</div>
            <div className="text-[18px] font-black text-black uppercase leading-none">{patientName}</div>
        </div>
      </div>

      {/* --- ORGANIZED GRID --- */}
      <div className="flex-1 flex flex-col justify-start gap-3 overflow-hidden">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-[1fr_1fr_210px] gap-4 items-stretch flex-1 overflow-hidden">
            {row.p1 && <PanelBox panel={row.p1} r1={readings1st} r2={readings2nd} />}
            {row.p2 && <PanelBox panel={row.p2} r1={readings1st} r2={readings2nd} />}

            {row.card === 'ma' ? (
              <div className="border border-black p-3 rounded-sm flex flex-col justify-center gap-3">
                 <div>
                    <span className="text-[9px] font-black uppercase block mb-1">Date Applied:</span>
                    <div className="border border-black h-7 flex items-center px-2 mb-1 font-bold text-[9px] text-[#00A3FF]">{maApplied.date}</div>
                    <div className="flex items-center">
                       <div className={`checkbox-box ${maApplied.checked ? 'checkbox-checked' : ''}`}></div>
                       <span className="text-[9px] font-black mr-1 uppercase">MA: {maApplied.name}</span>
                    </div>
                 </div>
                 <div className="border-t border-slate-100 pt-2">
                    <span className="text-[9px] font-black uppercase block mb-1">Date Removed:</span>
                    <div className="border border-black h-7 flex items-center px-2 mb-1 font-bold text-[9px] text-[#00A3FF]">{maRemoved.date}</div>
                    <div className="flex items-center">
                       <div className={`checkbox-box ${maRemoved.checked ? 'checkbox-checked' : ''}`}></div>
                       <span className="text-[9px] font-black mr-1 uppercase">MA: {maRemoved.name}</span>
                    </div>
                 </div>
              </div>
            ) : (
              <SidebarCard title={row.title} data={idx === 0 ? sigApp : idx === 1 ? sig1st : sig2nd} />
            )}
          </div>
        ))}
      </div>

      <div className="hidden print:block w-full text-center text-[7px] text-slate-400 mt-1 uppercase font-bold tracking-widest shrink-0">
        Printed on {new Date().toLocaleDateString()} — Sierra Allergy & Asthma Center
      </div>
    </div>
  );
});

const PanelBox = ({ panel, r1, r2 }) => (
  <div className="flex flex-col border border-black rounded-sm overflow-hidden flex-1">
    <div className="bg-[#7A869A] text-white text-[9px] font-bold px-2 py-[3.5px] border-b border-black uppercase text-center">{panel.categoryName}</div>
    <table className="print-table h-full">
      <thead>
        <tr>
          <th style={{ width: '12%' }}>#</th>
          <th style={{ width: '58%' }} className="text-left px-2">Ingredient</th>
          <th style={{ width: '15%' }}>1st</th>
          <th style={{ width: '15%' }}>2nd</th>
        </tr>
      </thead>
      <tbody>
        {panel.items.map((item) => (
          <tr key={item.code}>
            <td className="font-bold">{item.code}</td>
            <td className="text-left px-2 truncate font-medium">{item.name}</td>
            <td className="font-bold text-[#00A3FF]">{r1[`${panel.categoryId}_${item.code}`] || ''}</td>
            <td className="font-bold text-[#00A3FF]">{r2[`${panel.categoryId}_${item.code}`] || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const SidebarCard = ({ title, data }) => (
  <div className="border border-black p-3 rounded-sm flex flex-col justify-between flex-1">
    <div className="text-[9.5px] font-black uppercase leading-none">{title}</div>
    <div className="flex items-end">
       <span className="text-[9px] font-bold mr-1">Name:</span>
       <div className="border-b border-black flex-1 h-3.5 text-[9px] font-bold text-[#00A3FF]">{data.name}</div>
    </div>
    <div className="flex items-center">
       <div className={`checkbox-box ${data.checked ? 'checkbox-checked' : ''}`}></div>
       <span className="text-[9px] font-black mr-1 uppercase">Sig:</span>
       <div className="border-b border-black flex-1 h-3.5"></div>
    </div>
    <div className="flex flex-col">
       <span className="text-[8px] font-bold uppercase mb-0.5">Date:</span>
       <div className="border border-black h-6 text-[9.5px] font-bold text-[#00A3FF] px-1.5 flex items-center">{data.date}</div>
    </div>
  </div>
);

export default ChemicalRadioTemplate;