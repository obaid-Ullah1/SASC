import React, { forwardRef } from 'react';
import { Pencil, Zap, MessageSquare, Check } from 'lucide-react';

const SYMPTOMS = [
  'Coughing', 'Wheezing', 'Tightness in chest', 'Sneezing', 
  'Itching', 'Runny Nose', 'Watery Eyes', 'Itchy Eyes', 
  'Hives', 'Antihistamine', 'New Medication', 'Left Before Time', 'None'
];

const InjectionPrintTemplate = forwardRef(({ 
  patientName, 
  patientNo, 
  dos, 
  assessments = [], 
  injections = null, 
  reactionData = null, 
  note = '',
  printMode = 'filled' // ✅ RECEIVES THE PRINT MODE
}, ref) => {
  
  const safeDos = dos instanceof Date 
    ? dos.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) 
    : String(dos || 'N/A');

  // ✅ LOGIC TO HANDLE "UNFILLED" MODE (Generates empty rows for the doctor to write on)
  const isUnfilled = printMode === 'unfilled';

  const displayAssessments = isUnfilled 
    ? [ { type: 'Pre' }, { type: 'Post' }, { type: 'Rxn' } ] 
    : assessments;
  
  const displayInjections = isUnfilled && injections
    ? injections.map(inj => ({
        ...inj,
        staff: '--',
        time: '--:--',
        code2: '--',
        conf: false,
        rxn: false,
        remarks: ''
      }))
    : injections;
  
  // If unfilled, force the reaction table to appear empty
  const displayReaction = isUnfilled 
    ? { no: '--', loc: '--', systemic: '--', reactionTime: '--:--', ptShot: '--', score: '--', wheal: '--', flare: '--', obsTime: '--:--' } 
    : reactionData;

  const displayNote = isUnfilled ? '' : note;

  return (
    <div ref={ref} className="w-full bg-white text-black hidden print:flex print:flex-col font-sans min-h-[95vh]">
      
      {/* --- STRICT & CLEAN PRINT STYLES --- */}
      <style type="text/css">
        {`
          @media print {
            @page { size: A4 portrait; margin: 10mm; }
            body { 
              -webkit-print-color-adjust: exact !important; 
              print-color-adjust: exact !important; 
              background: white !important; 
              margin: 0; 
              padding: 0; 
            }
            .print-hidden { display: none !important; }
            
            /* Professional Crisp Tables */
            table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            th, td { border: 1px solid #000; padding: 8px 4px; color: #000; }
            
            /* Perfectly Centered Headers */
            th { 
              background-color: #f8fafc !important; 
              font-weight: 800 !important; 
              font-size: 10.5px !important; 
              text-align: center !important; 
              vertical-align: middle !important;
              text-transform: uppercase !important; 
            }
            
            /* Normal Weight Data Cells (Fixed height added for unfilled boxes) */
            td { 
              font-size: 13px !important; 
              font-weight: 400 !important; 
              text-align: center !important; 
              vertical-align: middle !important;
              height: 32px !important;
            }
            
            .print-check { color: #059669 !important; stroke-width: 4px !important; }
          }
        `}
      </style>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b-2 border-black pb-4 mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <img src="/download.png" alt="Sierra Allergy Logo" className="h-16 object-contain" />
          <div className="flex flex-col justify-center pt-1">
            <span className="text-[16px] font-black uppercase leading-none tracking-wide text-black">Sierra Allergy</span>
            <span className="text-[11.5px] font-bold text-black uppercase leading-tight mt-1">Asthma and Sinus Center</span>
          </div>
        </div>
        <div className="flex gap-8 items-center text-[14px] text-black">
          <div className="flex items-center"><span className="font-black uppercase mr-2">Patient:</span><span className="font-normal">{patientName}</span></div>
          <div className="flex items-center"><span className="font-black uppercase mr-2">Patient No:</span><span className="font-normal">{patientNo}</span></div>
          <div className="flex items-center"><span className="font-black uppercase mr-2">DOS:</span><span className="font-normal">{safeDos}</span></div>
        </div>
      </div>

      {/* Wrapper to push signatures to bottom */}
      <div className="flex-1 flex flex-col">
        
        {/* --- 1. ASSESSMENT SECTION --- */}
        <div className="mb-2 flex items-center justify-between mt-2">
          <div className="font-black text-[15px] uppercase flex items-center gap-2">
            <Pencil size={18} strokeWidth={2.5} /> Assessment
          </div>
          <div className="text-[11px] font-bold flex items-center gap-1">
            Note: Only YES (<Check size={14} strokeWidth={4} className="text-[#059669] inline" />) if any symptoms exist.
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th className="w-12">Type</th>
              <th className="w-16">Time/Min</th>
              {SYMPTOMS.map((s, i) => (
                <th key={i} className="leading-tight px-1">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayAssessments.length === 0 ? (
              <tr><td colSpan={SYMPTOMS.length + 2} className="py-6 text-slate-500 italic">No assessments recorded.</td></tr>
            ) : (
              displayAssessments.map((row, index) => (
                <tr key={row.id || index}>
                  <td className={isUnfilled ? 'font-bold text-left px-4' : ''}>{row.type}</td>
                  <td>{isUnfilled ? '--:--' : (row.time || '--:--')}</td>
                  {SYMPTOMS.map((s, i) => (
                    <td key={i}>
                      {!isUnfilled && row.symptoms && row.symptoms[s] ? (
                        <div className="flex justify-center"><Check size={18} className="print-check" /></div>
                      ) : ''}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* --- 2. INJECTION DETAILS SECTION --- */}
        {/* Render if there are injections, OR if we are forcing an unfilled form */}
        {(displayInjections || isUnfilled) && (
          <>
            <div className="font-black text-[15px] uppercase flex items-center gap-2 mb-2 mt-6">
              <Pencil size={18} strokeWidth={2.5} /> Injection Details
            </div>
            <table>
              <thead>
                <tr>
                  <th>Shot</th>
                  <th>Injection</th>
                  <th>Ratio</th>
                  <th>Code</th>
                  <th>Volume</th>
                  <th>Bottle</th>
                  <th>Staff</th>
                  <th>Location</th>
                  <th>Time</th>
                  <th>Code</th>
                  <th>Conf</th>
                  <th>Rxn</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {displayInjections ? displayInjections.map((inj, index) => (
                  <tr key={inj.id || index}>
                    <td>{inj.shot}</td>
                    <td className="text-left px-2">{inj.injection}</td>
                    <td>{inj.ratio}</td>
                    <td>{inj.code1}</td>
                    <td>{inj.volume}</td>
                    <td>{inj.bottle}</td>
                    <td>{inj.staff || '--'}</td>
                    <td>{inj.location || '--'}</td>
                    <td>{inj.time || '--:--'}</td>
                    <td>{inj.code2 || '--'}</td>
                    <td>{isUnfilled ? 'No' : (inj.conf ? 'Yes' : 'No')}</td>
                    <td>
                      {!isUnfilled && inj.rxn ? <div className="flex justify-center"><Check size={18} className="print-check" /></div> : ''}
                    </td>
                    <td>{inj.remarks || ''}</td>
                  </tr>
                )) : (
                  // Fallback empty rows if Unfilled is clicked but injections haven't been fetched
                  [1, 2, 3].map(i => (
                    <tr key={i}>
                      <td>Shot - {i}</td><td></td><td></td><td></td><td></td><td></td><td>--</td><td>--</td><td>--:--</td><td>--</td><td>No</td><td></td><td></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}

        {/* --- 3. REACTION SECTION --- */}
        {(displayReaction) && (
          <>
            <div className="font-black text-[15px] uppercase flex items-center gap-2 mb-2 mt-6">
              <Zap size={18} strokeWidth={2.5} className="fill-black" /> Reaction
            </div>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Loc</th>
                  <th>Systemic</th>
                  <th>Reaction Time</th>
                  <th>PT Shot</th>
                  <th>Score</th>
                  <th>Wheal</th>
                  <th>Flare</th>
                  <th>Obs Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{displayReaction.no || '--'}</td>
                  <td>{displayReaction.loc || '--'}</td>
                  <td>{displayReaction.systemic || '--'}</td>
                  <td>{displayReaction.reactionTime || '--:--'}</td>
                  <td>{displayReaction.ptShot || '--'}</td>
                  <td>{displayReaction.score || '--'}</td>
                  <td>{displayReaction.wheal || '--'}</td>
                  <td>{displayReaction.flare || '--'}</td>
                  <td>{displayReaction.obsTime || '--:--'}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {/* --- 4. NOTE SECTION --- */}
        <div className="font-black text-[15px] uppercase flex items-center gap-2 mb-2 mt-6">
          <MessageSquare size={18} strokeWidth={2.5} /> Note / Comments
        </div>
        <div className="border border-black p-4 min-h-[120px] w-full text-[13px] font-normal whitespace-pre-wrap">
          {displayNote}
        </div>

      </div>

      {/* --- 5. SIGNATURES (Anchored safely to bottom) --- */}
      <div className="flex justify-between items-end mt-auto pt-10 px-4 pb-2 shrink-0">
        <div className="w-[25%] text-center">
          <div className="font-normal text-[14px] mb-1">{safeDos}</div>
          <div className="border-t border-black pt-1 text-[11px] font-black uppercase">Date</div>
        </div>
        <div className="w-[30%] text-center">
          <div className="border-t border-black pt-1 text-[11px] font-black uppercase">Staff Member Name</div>
        </div>
        <div className="w-[30%] text-center">
          <div className="border-t border-black pt-1 text-[11px] font-black uppercase">Signature</div>
        </div>
      </div>

    </div>
  );
});

export default InjectionPrintTemplate;