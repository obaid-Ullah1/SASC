import React, { useState } from 'react';
import { 
  X, AlertCircle, User, CreditCard, Calendar, 
  Clock, Info, Printer, Trash2, Send, Plus, 
  Activity, Syringe, Database, Hash, Divide, 
  Barcode, AlignRight, Droplet, MapPin, CheckCircle2, 
  Settings, MessageSquare, Zap, ListOrdered, AlertTriangle, 
  Image as ImageIcon, Star, Check
} from 'lucide-react';

const SYMPTOMS = [
  'Coughing', 'Wheezing', 'Tightness in chest', 'Sneezing', 
  'Itching', 'Runny Nose', 'Watery Eyes', 'Itchy Eyes', 
  'Hives', 'Antihistamine', 'New Medication', 'Left Before Time', 'None'
];

// Simulated Database Fetch for Existing Injections
const SIMULATED_DB_INJECTIONS = [
  { id: 1, shot: 'Shot - 1', injection: 'STD MIX 1', ratio: '1 : 100000', code1: 'BVA-005', volume: '0.05 mL', bottle: 'Grey', staff: 'o', location: 'RA', time: '', code2: '', conf: false, rxn: false, remarks: '' },
  { id: 2, shot: 'Shot - 1', injection: 'STD MIX 2', ratio: '1 : 100000', code1: 'BVA-010', volume: '0.05 mL', bottle: 'Grey', staff: '', location: 'LA', time: '', code2: '', conf: false, rxn: false, remarks: '' },
  { id: 3, shot: 'Shot - 1', injection: 'STD MIX 4', ratio: '1 : 100000', code1: 'BVA-015', volume: '0.05 mL', bottle: 'Grey', staff: '', location: 'LA', time: '', code2: '', conf: false, rxn: false, remarks: '' },
];

const InjectionSheet = ({ isOpen, onClose, patientName = "Valencia Chavez , Blanca", patientNo = "1016", dos = "2025-01-02" }) => {
  const [minutes, setMinutes] = useState('');
  const [note, setNote] = useState('');
  
  // Track the active button
  const [activeAction, setActiveAction] = useState(null);

  // States for dynamic sections
  const [assessments, setAssessments] = useState([]);
  const [fetchedInjections, setFetchedInjections] = useState(null);
  const [isLoadingInjections, setIsLoadingInjections] = useState(false);
  
  // SINGLE Reaction State (Restricts to max 1 container)
  const [reactionData, setReactionData] = useState(null);

  if (!isOpen) return null;

  // Safely format the date
  const safeDos = dos instanceof Date 
    ? dos.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }) 
    : String(dos || 'N/A');

  // Helper to get current time in strict HH:mm format
  const getCurrentTimeHHMM = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // --- ACTION HANDLERS ---
  const handleAddAction = (type) => {
    setActiveAction(type); // Highlights the clicked button

    if (type === 'Inj') {
      setIsLoadingInjections(true);
      setTimeout(() => {
        setFetchedInjections(SIMULATED_DB_INJECTIONS);
        setIsLoadingInjections(false);
      }, 500);
    } else {
      const newAssessment = { id: Date.now(), type: type, time: '', symptoms: {} };
      setAssessments([...assessments, newAssessment]);

      // If user clicks "Rxn", show the reaction container ONLY if it doesn't already exist
      if (type === 'Rxn' && !reactionData) {
        setReactionData({
          no: '', loc: '', systemic: '', reactionTime: '', ptShot: '', score: '', wheal: '', flare: '', obsTime: ''
        });
      }
    }
  };

  const toggleSymptom = (rowId, symptom) => {
    setAssessments(assessments.map(row => {
      if (row.id === rowId) {
        const newSymptoms = { ...row.symptoms };
        let newTime = row.time;

        if (!newSymptoms[symptom] && !newTime) {
          newTime = getCurrentTimeHHMM();
        }

        if (symptom === 'None') {
          return { ...row, time: newTime, symptoms: { 'None': !newSymptoms['None'] } };
        } else {
          newSymptoms[symptom] = !newSymptoms[symptom];
          newSymptoms['None'] = false;
          return { ...row, time: newTime, symptoms: newSymptoms };
        }
      }
      return row;
    }));
  };

  const updateTime = (rowId, newTime) => setAssessments(assessments.map(row => row.id === rowId ? { ...row, time: newTime } : row));
  const removeAssessmentRow = (rowId) => setAssessments(assessments.filter(row => row.id !== rowId));
  
  const handleInjectionChange = (id, field, value) => setFetchedInjections(prev => prev.map(inj => inj.id === id ? { ...inj, [field]: value } : inj));
  const hideInjectionData = () => {
    setFetchedInjections(null);
    if (activeAction === 'Inj') setActiveAction(null);
  };

  // Reaction container handlers
  const updateReactionData = (field, value) => setReactionData({ ...reactionData, [field]: value });
  const hideReactionData = () => setReactionData(null);

  const handleClear = () => {
    setAssessments([]);
    setFetchedInjections(null);
    setReactionData(null);
    setMinutes('');
    setNote('');
    setActiveAction(null);
  };

  return (
    <>
      <style type="text/css" media="print">
        {`
          /* Strict A4 Portrait sizing with overrides to stop squishing */
          @page { size: A4 portrait; margin: 10mm; }
          
          /* Remove layout restrictions from body so it prints full height */
          html, body { height: auto !important; overflow: visible !important; background: white !important; }
          body * { visibility: hidden !important; }
          
          /* The specific print wrapper takes control */
          #printable-injection-sheet, #printable-injection-sheet * { visibility: visible !important; }
          #printable-injection-sheet {
            position: absolute !important; left: 0 !important; top: 0 !important;
            width: 100% !important; min-height: 100vh !important; height: auto !important; 
            margin: 0 !important; padding: 0 !important;
            display: flex !important; flex-direction: column !important;
            background: white !important; overflow: visible !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
          }
          
          /* Hide time picker icons */
          input[type="time"]::-webkit-calendar-picker-indicator { display: none; }
          input[type="date"]::-webkit-calendar-picker-indicator { display: none; }
        `}
      </style>

      {/* Outer Modal Wrapper */}
      <div 
        id="printable-injection-sheet" 
        className="fixed inset-0 z-[99999] flex justify-center items-center bg-slate-900/70 backdrop-blur-sm p-4 sm:p-6"
      >
        {/* Main Container */}
        <div className="bg-[#f8fafc] w-full max-w-[1500px] h-full max-h-[95vh] rounded-xl shadow-2xl flex flex-col border border-slate-300 print:w-full print:border-none print:shadow-none print:rounded-none print:h-auto print:max-h-none print:min-h-screen print:bg-white print:block">
          
          {/* --- PRINT ONLY HEADER --- */}
          <div className="hidden print:flex items-end justify-between w-full border-b-2 border-slate-400 pb-4 mb-4 px-2 shrink-0">
            <div className="flex flex-col items-center">
              <img src="/download.png" alt="Sierra Allergy Logo" className="h-20 object-contain" />
            </div>
            <div className="flex items-center gap-6 text-[12px] font-bold text-black pb-2">
              <div>Patient: <span className="font-normal">{patientName}</span></div>
              <div>Patient No: <span className="font-normal">{patientNo}</span></div>
              <div>DOS: <span className="font-normal">{safeDos}</span></div>
            </div>
          </div>

          {/* SCREEN ONLY HEADER */}
          <div className="bg-[#FFB000] text-white px-5 py-3 flex items-center justify-between shrink-0 rounded-t-xl print:hidden">
            <div className="w-8"></div> 
            <div className="flex items-center gap-2 font-black text-[17px] tracking-wide uppercase">
              <AlertCircle size={22} strokeWidth={2.5} />
              Injection Sheet For ({new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })})
            </div>
            <button type="button" onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* SCREEN ONLY PATIENT BANNER */}
          <div className="bg-white border-b-2 border-slate-200 px-6 py-3 flex items-center gap-10 text-[14px] text-slate-700 shrink-0 print:hidden relative z-10 shadow-sm">
            <div className="flex items-center gap-2">
              <User size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
              <span className="font-bold text-slate-500 uppercase">Patient:</span>
              <span className="font-black text-[#00A3FF] text-[15px]">{patientName}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
              <span className="font-bold text-slate-500 uppercase">Patient No:</span>
              <span className="font-black text-slate-800 text-[15px]">{patientNo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
              <span className="font-bold text-slate-500 uppercase">DOS:</span>
              <span className="font-black text-slate-800 text-[15px]">{safeDos}</span>
            </div>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] flex flex-col gap-6 print:flex-1 print:p-0 print:gap-4 print:bg-white print:overflow-visible">
            
            {/* Action Triggers (Hidden on print) */}
            <div className="flex items-start gap-6 print:hidden shrink-0">
              <div className="flex-1 border border-slate-200 rounded-xl p-4 shadow-sm bg-white">
                <div className="flex items-center gap-2 text-[#00A3FF] font-black text-[13px] uppercase mb-4 tracking-wide">
                  Type (Click to Add Row)
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
                    {['Pre', 'Post', 'Rxn'].map(type => {
                      const isActive = activeAction === type;
                      return (
                        <button 
                          key={type} type="button" onClick={() => handleAddAction(type)}
                          className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all active:scale-95 ${
                            isActive 
                              ? 'bg-[#00A3FF] text-white shadow-md border-transparent' 
                              : 'bg-white border border-slate-300 text-slate-700 hover:border-[#00A3FF] hover:text-[#00A3FF] hover:shadow-md'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${isActive ? 'border-white' : 'border-slate-300'}`}>
                            {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  <button 
                    type="button" onClick={() => handleAddAction('Inj')} disabled={isLoadingInjections}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black transition-all active:scale-95 shadow-sm disabled:opacity-50 ${
                      activeAction === 'Inj' 
                        ? 'bg-[#00A3FF] text-white border-2 border-[#00A3FF]' 
                        : 'bg-white text-[#00A3FF] border-2 border-[#00A3FF] hover:bg-[#00A3FF] hover:text-white'
                    }`}
                  >
                    {isLoadingInjections ? <span className="animate-pulse">Fetching...</span> : <><Database size={18} strokeWidth={2.5} /> Fetch Injection Data (Inj)</>}
                  </button>
                </div>
              </div>
              <div className="w-72 border border-slate-200 rounded-xl p-4 shadow-sm bg-white">
                <div className="flex items-center gap-2 text-[#00A3FF] font-black text-[13px] uppercase mb-4 tracking-wide">
                  <Clock size={16} className="text-[#00A3FF]" /> Minutes
                </div>
                <input type="text" placeholder="Minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-full border border-slate-300 rounded-lg outline-none focus:border-[#00A3FF] px-4 py-2 text-[14px] font-bold text-slate-800 bg-slate-50 focus:bg-white" />
              </div>
            </div>

            {/* --- 1. ASSESSMENT SECTION --- */}
            <div className="flex flex-col border border-slate-300 rounded-xl shadow-md print:shadow-none print:border-none bg-white shrink-0 print:mb-2">
              <div className="bg-[#00A3FF] text-white font-black text-[15px] px-5 py-2.5 flex items-center justify-between uppercase rounded-t-lg print:bg-transparent print:text-black print:border-b-2 print:border-slate-800 print:px-0 print:py-1">
                <div className="flex items-center gap-2">
                  <Syringe size={16} className="text-white print:hidden" /> 
                  <span className="print:hidden">Assessment</span>
                  <span className="hidden print:flex items-center gap-1 text-[13px] font-black text-black"><Syringe size={14}/> ASSESSMENT</span>
                </div>
                <div className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold print:hidden">{assessments.length} Records</div>
              </div>
              
              <div className="flex flex-col rounded-b-lg overflow-hidden print:border print:border-slate-800 print:rounded-sm">
                <div className="bg-[#e0f2fe] px-5 py-2.5 flex items-center gap-2 text-[#0369a1] text-[13px] font-medium border-b border-slate-200 print:bg-white print:text-black print:px-2 print:py-1.5 print:text-[11px] print:border-slate-800">
                  <Info size={16} strokeWidth={2.5} className="shrink-0 print:text-black" />
                  <span><strong>Note:</strong> Only YES (<span className="text-[#00A3FF] font-black print:text-black">✔</span>) if any symptoms exist.</span>
                </div>

                <div className="w-full overflow-x-auto print:overflow-visible">
                  <table className="w-full text-left border-collapse print:text-[10px] print:table-fixed">
                    <thead>
                      <tr className="bg-[#f1f5f9] text-slate-600 text-[11px] border-b border-slate-300 print:bg-slate-100 print:text-black print:border-slate-800">
                        <th className="px-2 py-2 font-bold text-center border-r border-slate-300 w-16 print:border-slate-400 print:text-[10px] print:w-10">Type</th>
                        <th className="px-2 py-2 font-bold text-center border-r border-slate-300 w-20 print:border-slate-400 print:text-[10px] print:w-16">Time/Min</th>
                        {SYMPTOMS.map((symptom, idx) => (
                          <th key={idx} className="px-1 py-2 font-bold text-center border-r border-slate-300 leading-tight align-bottom print:px-0.5 print:border-slate-400 break-words print:text-[9px]">
                            {symptom}
                          </th>
                        ))}
                        <th className="px-2 py-2 font-bold text-center print:hidden w-10"><Trash2 size={14} className="mx-auto" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {assessments.length === 0 ? (
                        <tr><td colSpan={SYMPTOMS.length + 3} className="text-center py-6 text-slate-400 font-bold text-sm print:py-2 print:text-black">No assessments added.</td></tr>
                      ) : (
                        assessments.map((row) => (
                          <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50 print:border-slate-400">
                            <td className="px-2 py-1.5 text-center font-black text-slate-800 text-[12px] border-r border-slate-200 print:text-[11px] print:border-slate-400 print:text-black">{row.type}</td>
                            <td className="px-2 py-1.5 text-center border-r border-slate-200 print:border-slate-400 print:px-0.5">
                              <input type="time" value={row.time} onChange={(e) => updateTime(row.id, e.target.value)} className="w-full text-center outline-none bg-transparent print:text-[11px] print:font-bold print:text-black" />
                            </td>
                            {SYMPTOMS.map((symptom, idx) => (
                              <td key={idx} className="px-1 py-1.5 text-center border-r border-slate-200 print:border-slate-400 p-0 m-0">
                                {/* GREEN TICK IMPLEMENTATION (REPLACES CHECKBOX) */}
                                <div 
                                  className="flex items-center justify-center w-full min-h-[26px] cursor-pointer hover:bg-blue-50 transition-colors print:min-h-0 print:py-1" 
                                  onClick={() => toggleSymptom(row.id, symptom)}
                                >
                                  {!!row.symptoms[symptom] && (
                                    <Check size={20} strokeWidth={4} className="text-green-500 print:text-green-700 print:w-4 print:h-4" />
                                  )}
                                </div>
                              </td>
                            ))}
                            <td className="px-2 py-1.5 text-center print:hidden"><button type="button" onClick={() => removeAssessmentRow(row.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={14} /></button></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* --- 2. INJECTION DETAILS SECTION --- */}
            {fetchedInjections && (
              <div className="flex flex-col border border-slate-300 rounded-xl shadow-md bg-white print:shadow-none print:border-none shrink-0 print:mb-2">
                <div className="bg-[#00A3FF] text-white font-black text-[15px] px-5 py-2.5 flex items-center justify-between uppercase rounded-t-lg print:bg-transparent print:text-black print:border-b-2 print:border-slate-800 print:px-0 print:py-1">
                  <div className="flex items-center gap-2 print:hidden"><Syringe size={18} /> Injection Details</div>
                  <div className="hidden print:flex items-center gap-1 text-[13px] font-black text-black"><Syringe size={14}/> INJECTION DETAILS</div>
                  <button type="button" onClick={hideInjectionData} className="text-white/80 hover:text-white bg-white/10 rounded-full p-1 print:hidden"><X size={18} /></button>
                </div>
                
                <div className="w-full overflow-x-auto p-0 print:border print:border-slate-800 print:rounded-sm print:overflow-visible">
                  <table className="w-full text-left border-collapse print:text-[10px]">
                    <thead>
                      <tr className="bg-[#e0f2fe] text-slate-700 text-[11px] font-bold border-b border-slate-300 print:bg-slate-100 print:text-black print:border-slate-400">
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400 text-center">Shot</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Injection</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400 text-center">Ratio</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Code</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Volume</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400 text-center">Bottle</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Staff</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Location</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Time</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400">Code</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400 text-center">Conf</th>
                        <th className="px-2 py-2 border-r border-slate-200 print:border-slate-400 text-center">Rxn</th>
                        <th className="px-2 py-2">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 print:divide-slate-400">
                      {fetchedInjections.map((inj) => (
                        <tr key={inj.id} className="hover:bg-slate-50">
                          <td className="px-2 py-1.5 font-bold text-slate-700 border-r border-slate-200 print:border-slate-400 print:text-black text-center">{inj.shot}</td>
                          <td className="px-2 py-1.5 text-slate-800 border-r border-slate-200 print:border-slate-400 print:text-black font-medium">{inj.injection}</td>
                          <td className="px-2 py-1.5 font-black text-red-500 border-r border-slate-200 print:border-slate-400 print:text-black text-center">{inj.ratio}</td>
                          <td className="px-2 py-1.5 font-bold text-blue-600 border-r border-slate-200 print:border-slate-400 print:text-black">{inj.code1}</td>
                          <td className="px-2 py-1.5 font-bold text-[#00A3FF] border-r border-slate-200 print:border-slate-400 print:text-black">{inj.volume}</td>
                          <td className="px-2 py-1.5 text-slate-700 border-r border-slate-200 print:border-slate-400 print:text-black text-center">{inj.bottle}</td>
                          <td className="px-1 py-1 border-r border-slate-200 print:border-slate-400">
                            <input type="text" value={inj.staff} onChange={(e) => handleInjectionChange(inj.id, 'staff', e.target.value)} className="w-full bg-transparent outline-none px-1 print:text-[11px] print:font-bold print:text-black" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-slate-200 print:border-slate-400 print:text-black print:font-bold print:text-[11px]">
                            <input type="text" value={inj.location} onChange={(e) => handleInjectionChange(inj.id, 'location', e.target.value)} className="w-10 bg-transparent outline-none px-1" />
                          </td>
                          <td className="px-1 py-1 border-r border-slate-200 print:border-slate-400">
                            <input type="time" value={inj.time} onChange={(e) => handleInjectionChange(inj.id, 'time', e.target.value)} className="w-full bg-transparent outline-none px-1 print:text-[11px] print:font-bold print:text-black" />
                          </td>
                          <td className="px-1 py-1 border-r border-slate-200 print:border-slate-400">
                            <input type="text" value={inj.code2} onChange={(e) => handleInjectionChange(inj.id, 'code2', e.target.value)} className="w-12 bg-transparent outline-none px-1 print:text-[11px] print:font-bold print:text-black" />
                          </td>
                          <td className="px-2 py-1.5 border-r border-slate-200 print:border-slate-400 print:text-black text-center print:font-bold print:text-[11px]">{inj.conf ? 'Yes' : 'No'}</td>
                          <td className="px-2 py-1.5 text-center border-r border-slate-200 print:border-slate-400 p-0">
                            {/* GREEN TICK FOR RXN ALSO */}
                            <div 
                              className="flex items-center justify-center w-full min-h-[24px] cursor-pointer print:min-h-0 print:py-0.5" 
                              onClick={() => handleInjectionChange(inj.id, 'rxn', !inj.rxn)}
                            >
                              {inj.rxn && <Check size={18} strokeWidth={4} className="text-green-500 print:text-green-700 print:w-4 print:h-4" />}
                            </div>
                          </td>
                          <td className="px-1 py-1">
                            <input type="text" value={inj.remarks} onChange={(e) => handleInjectionChange(inj.id, 'remarks', e.target.value)} className="w-full bg-transparent outline-none px-1 print:text-[11px] print:font-bold print:text-black" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- 3. REACTION SECTION (Strictly Max 1) --- */}
            {reactionData && (
              <div className="flex flex-col border border-slate-200 rounded-xl shadow-sm bg-white print:shadow-none print:border-none shrink-0 overflow-hidden">
                
                <div className="bg-[#00A3FF] text-white font-bold text-[14px] px-5 py-2.5 flex items-center justify-between uppercase print:bg-transparent print:text-black print:border-b-2 print:border-slate-800 print:px-0 print:py-1">
                  <div className="flex items-center gap-2 print:hidden">
                    <Zap size={16} className="fill-white" /> REACTION
                  </div>
                  <div className="hidden print:flex items-center gap-1 text-[13px] text-black font-black"><Zap size={14} className="fill-black"/> REACTION</div>
                  <button type="button" onClick={hideReactionData} className="text-white hover:text-white bg-transparent hover:bg-white/20 rounded print:hidden transition-colors"><X size={20} strokeWidth={2} /></button>
                </div>

                <div className="p-6 flex flex-col gap-6 print:p-0 print:border print:border-slate-800 print:rounded-sm bg-white print:mt-1">
                  
                  {/* Row 1 (Screen View) */}
                  <div className="grid grid-cols-5 gap-6 print:gap-4 print:hidden">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <ListOrdered size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> No
                      </label>
                      <select value={reactionData.no} onChange={e => updateReactionData('no', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm bg-white h-[38px]">
                        <option></option><option>1</option><option>2</option><option>3</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <MapPin size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> Loc
                      </label>
                      <input type="text" value={reactionData.loc} onChange={e => updateReactionData('loc', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <AlertTriangle size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> Systemic
                      </label>
                      <input type="text" value={reactionData.systemic} onChange={e => updateReactionData('systemic', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <Clock size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> Reaction Time
                      </label>
                      <input type="time" value={reactionData.reactionTime} onChange={e => updateReactionData('reactionTime', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm bg-white h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <ImageIcon size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> Picture
                      </label>
                      <div className="flex items-center h-[38px] border border-slate-300 rounded-md overflow-hidden bg-white shadow-sm">
                        <input type="file" className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:border-0 file:border-r file:border-slate-300 file:text-xs file:font-bold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 outline-none cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 (Screen View) */}
                  <div className="grid grid-cols-5 gap-6 print:gap-4 print:hidden">
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <Syringe size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> PT Shot
                      </label>
                      <input type="text" value={reactionData.ptShot} onChange={e => updateReactionData('ptShot', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <Star size={16} className="text-amber-400 fill-amber-400" strokeWidth={2} /> Score
                      </label>
                      <input type="text" value={reactionData.score} onChange={e => updateReactionData('score', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div> Wheal
                      </label>
                      <input type="text" value={reactionData.wheal} onChange={e => updateReactionData('wheal', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <Droplet size={16} className="text-red-500 fill-red-500" strokeWidth={2} /> Flare
                      </label>
                      <input type="text" value={reactionData.flare} onChange={e => updateReactionData('flare', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
                        <Clock size={16} className="text-[#00A3FF]" strokeWidth={2.5} /> Obs Time
                      </label>
                      <input type="time" value={reactionData.obsTime} onChange={e => updateReactionData('obsTime', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm bg-white h-[38px]" />
                    </div>
                  </div>

                  {/* --- PRINT ONLY REACTION TABLE --- */}
                  <table className="hidden print:table w-full text-left border-collapse print:text-[11px]">
                    <thead>
                      <tr className="bg-slate-100 text-black text-[11px] font-bold border-b border-slate-400">
                        <th className="px-3 py-2 border-r border-slate-400 text-center w-12">No</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">Loc</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">Systemic</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">Reaction Time</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">PT Shot</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">Score</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">Wheal</th>
                        <th className="px-3 py-2 border-r border-slate-400 text-center">Flare</th>
                        <th className="px-3 py-2 text-center">Obs Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.no}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.loc}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.systemic}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.reactionTime}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.ptShot}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.score}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.wheal}</td>
                        <td className="px-2 py-2 border-r border-slate-400 text-center font-bold text-black">{reactionData.flare}</td>
                        <td className="px-2 py-2 text-center font-bold text-black">{reactionData.obsTime}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- NOTE SECTION (Expands vertically on print) --- */}
            <div className="flex flex-col gap-2 mt-2 shrink-0 print:flex-1 print:min-h-[100px]">
              <div className="flex items-center gap-2 text-amber-500 font-bold text-[13px] print:hidden">
                <div className="w-3.5 h-3.5 bg-amber-400 rounded-sm"></div> Note / Comments
              </div>
              <div className="hidden print:flex items-center gap-1 text-[13px] text-black font-black mt-2"><MessageSquare size={14}/> NOTE / COMMENTS</div>
              <textarea 
                rows="3" value={note} onChange={(e) => setNote(e.target.value)}
                className="w-full border border-slate-300 rounded-xl p-4 outline-none text-[13px] text-slate-800 resize-none print:border-black print:rounded-sm print:p-3 bg-white print:h-full print:text-[12px] print:font-bold print:text-black"
              ></textarea>
            </div>

            {/* --- SIGNATURE SECTION (Pushed to bottom of paper via print:mt-auto) --- */}
            <div className="grid grid-cols-3 gap-10 mt-8 print:mt-auto shrink-0 mb-4 print:px-4 print:pb-4">
              <div className="flex flex-col items-center gap-1">
                <input type="date" className="border-b border-black focus:border-[#00A3FF] bg-transparent w-full text-center outline-none text-[14px] font-bold text-slate-800 pb-1 print:text-[12px] print:border-black uppercase cursor-pointer print:text-black" />
                <span className="text-[12px] font-bold text-black print:text-[12px]">Date</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <input type="text" className="border-b border-black focus:border-[#00A3FF] bg-transparent w-full text-center outline-none text-[14px] font-bold text-slate-800 pb-1 print:text-[12px] print:border-black print:text-black" />
                <span className="text-[12px] font-bold text-black print:text-[12px]">Name</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <input type="text" className="border-b border-black focus:border-[#00A3FF] bg-transparent w-full text-center outline-none text-[14px] font-bold text-slate-800 pb-1 print:text-[12px] print:border-black print:text-black" />
                <span className="text-[12px] font-bold text-black print:text-[12px]">Signature</span>
              </div>
            </div>
          </div>

          {/* --- FOOTER ACTION BUTTONS --- */}
          <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 print:hidden relative z-10 rounded-b-xl">
            <button type="button" onClick={onClose} className="border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-[14px] px-8 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-sm">
              Close
            </button>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-[14px] px-8 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-md">
                <Printer size={18} /> Print
              </button>
              <button type="button" onClick={handleClear} className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[14px] px-8 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-md">
                <Trash2 size={18} /> Clear
              </button>
              <button type="button" onClick={() => console.log("Submit")} className="bg-[#00A3FF] hover:bg-[#008CE6] text-white font-bold text-[14px] px-10 py-2.5 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-[#00A3FF]/30 active:scale-95">
                <Send size={18} /> Submit
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default InjectionSheet;