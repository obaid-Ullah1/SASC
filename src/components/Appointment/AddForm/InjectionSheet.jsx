import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import InjectionPrintTemplate from '../../Injection/InjectionPrintTemplate';

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

  // ✅ PRINTING STATE & MODAL LOGIC
  const [printMode, setPrintMode] = useState('filled'); // 'filled' or 'unfilled'
  const [showPrintModal, setShowPrintModal] = useState(false);

  const printRef = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printRef, 
    content: () => printRef.current, 
    documentTitle: `Injection_Sheet_${patientNo}`,
  });

  const triggerPrint = (mode) => {
    setPrintMode(mode);
    setShowPrintModal(false);
    // Give React 100ms to update the hidden template with the chosen mode before taking the snapshot
    setTimeout(() => {
      handlePrint();
    }, 100);
  };

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
      <div id="printable-injection-sheet" className="fixed inset-0 z-[99999] flex justify-center items-center bg-slate-900/70 backdrop-blur-sm p-2 sm:p-4 md:p-6">
        
        {/* ADDED: max-h-[98vh] for mobile screens so it doesn't get cut off, flex-col layout maintained */}
        <div className="bg-[#f8fafc] w-full max-w-[1500px] h-full max-h-[98vh] sm:max-h-[95vh] rounded-xl shadow-2xl flex flex-col border border-slate-300">
          
          {/* HEADER */}
          <div className="bg-[#FFB000] text-white px-4 sm:px-5 py-3 flex items-center justify-between shrink-0 rounded-t-xl">
            <div className="w-8 hidden sm:block"></div> 
            <div className="flex items-center gap-1.5 sm:gap-2 font-black text-[14px] sm:text-[17px] tracking-wide uppercase">
              <AlertCircle size={20} className="sm:w-[22px] sm:h-[22px]" strokeWidth={2.5} />
              <span className="truncate">Injection Sheet ({new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })})</span>
            </div>
            <button type="button" onClick={onClose} className="hover:bg-white/20 p-1 sm:p-1.5 rounded-full transition-colors shrink-0">
              <X size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={2.5} />
            </button>
          </div>

          {/* INFO BAR - Stack on Mobile, Inline on Desktop */}
          <div className="bg-white border-b-2 border-slate-200 px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-10 text-[13px] sm:text-[14px] text-slate-700 shrink-0 relative z-10 shadow-sm">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <User size={16} className="sm:w-[18px] sm:h-[18px] text-[#00A3FF] shrink-0" strokeWidth={2.5} />
              <span className="font-bold text-slate-500 uppercase shrink-0">Patient:</span>
              <span className="font-black text-[#00A3FF] text-[14px] sm:text-[15px] truncate">{patientName}</span>
            </div>
            <div className="flex items-center gap-4 sm:gap-10 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <CreditCard size={16} className="sm:w-[18px] sm:h-[18px] text-[#00A3FF] shrink-0" strokeWidth={2.5} />
                <span className="font-bold text-slate-500 uppercase shrink-0">No:</span>
                <span className="font-black text-slate-800 text-[14px] sm:text-[15px]">{patientNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="sm:w-[18px] sm:h-[18px] text-[#00A3FF] shrink-0" strokeWidth={2.5} />
                <span className="font-bold text-slate-500 uppercase shrink-0">DOS:</span>
                <span className="font-black text-slate-800 text-[14px] sm:text-[15px]">{safeDos}</span>
              </div>
            </div>
          </div>

          {/* MAIN SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-[#f8fafc] flex flex-col gap-4 sm:gap-6">
            
            {/* ACTION BUTTONS & MINUTES ROW - Stack on Mobile */}
            <div className="flex flex-col xl:flex-row items-start gap-4 xl:gap-6 shrink-0">
              
              {/* Type Selection */}
              <div className="w-full xl:flex-1 border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm bg-white">
                <div className="flex items-center gap-2 text-[#00A3FF] font-black text-[12px] sm:text-[13px] uppercase mb-3 sm:mb-4 tracking-wide">
                  Type (Click to Add Row)
                </div>
                {/* Flex Wrap ensures buttons flow onto next line on small screens */}
                <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
                  <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-lg border border-slate-200">
                    {['Pre', 'Post', 'Rxn'].map(type => {
                      const isActive = activeAction === type;
                      return (
                        <button 
                          key={type} type="button" onClick={() => handleAddAction(type)}
                          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-bold transition-all active:scale-95 flex-1 sm:flex-none justify-center ${
                            isActive 
                              ? 'bg-[#00A3FF] text-white shadow-md border-transparent' 
                              : 'bg-white border border-slate-300 text-slate-700 hover:border-[#00A3FF] hover:text-[#00A3FF] hover:shadow-md'
                          }`}
                        >
                          <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${isActive ? 'border-white' : 'border-slate-300'}`}>
                            {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                          </div>
                          {type}
                        </button>
                      );
                    })}
                  </div>
                  <button 
                    type="button" onClick={() => handleAddAction('Inj')} disabled={isLoadingInjections}
                    className={`flex flex-1 sm:flex-none justify-center items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg text-xs sm:text-sm font-black transition-all active:scale-95 shadow-sm disabled:opacity-50 ${
                      activeAction === 'Inj' 
                        ? 'bg-[#00A3FF] text-white border-2 border-[#00A3FF]' 
                        : 'bg-white text-[#00A3FF] border-2 border-[#00A3FF] hover:bg-[#00A3FF] hover:text-white'
                    }`}
                  >
                    {isLoadingInjections ? <span className="animate-pulse">Fetching...</span> : <><Database size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} /> <span className="truncate">Fetch Injection Data (Inj)</span></>}
                  </button>
                </div>
              </div>

              {/* Minutes Input */}
              <div className="w-full xl:w-72 border border-slate-200 rounded-xl p-3 sm:p-4 shadow-sm bg-white shrink-0">
                <div className="flex items-center gap-2 text-[#00A3FF] font-black text-[12px] sm:text-[13px] uppercase mb-3 sm:mb-4 tracking-wide">
                  <Clock size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" /> Minutes
                </div>
                <input type="text" placeholder="Minutes" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-full border border-slate-300 rounded-lg outline-none focus:border-[#00A3FF] px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] font-bold text-slate-800 bg-slate-50 focus:bg-white transition-all" />
              </div>
            </div>

            {/* ASSESSMENTS TABLE */}
            <div className="flex flex-col border border-slate-300 rounded-xl shadow-md bg-white shrink-0">
              <div className="bg-[#00A3FF] text-white font-black text-[14px] sm:text-[15px] px-4 sm:px-5 py-2.5 flex items-center justify-between uppercase rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Syringe size={16} className="text-white" /> 
                  <span>Assessment</span>
                </div>
                <div className="bg-white/20 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold">{assessments.length} Records</div>
              </div>
              
              <div className="flex flex-col rounded-b-lg overflow-hidden">
                <div className="bg-[#e0f2fe] px-3 sm:px-5 py-2 sm:py-2.5 flex items-center gap-2 text-[#0369a1] text-[11px] sm:text-[13px] font-medium border-b border-slate-200">
                  <Info size={14} className="sm:w-[16px] sm:h-[16px] shrink-0" strokeWidth={2.5} />
                  <span><strong>Note:</strong> Only YES (<span className="text-[#00A3FF] font-black">✔</span>) if any symptoms exist.</span>
                </div>

                <div className="w-full overflow-x-auto">
                  <div className="min-w-[800px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#f1f5f9] text-slate-600 text-[10px] sm:text-[11px] border-b border-slate-300">
                          <th className="px-2 py-2 font-bold text-center border-r border-slate-300 w-14 sm:w-16">Type</th>
                          <th className="px-2 py-2 font-bold text-center border-r border-slate-300 w-16 sm:w-20">Time/Min</th>
                          {SYMPTOMS.map((symptom, idx) => (
                            <th key={idx} className="px-1 py-2 font-bold text-center border-r border-slate-300 leading-tight align-bottom break-words">
                              {symptom}
                            </th>
                          ))}
                          <th className="px-2 py-2 font-bold text-center w-10"><Trash2 size={12} className="sm:w-[14px] sm:h-[14px] mx-auto" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {assessments.length === 0 ? (
                          <tr><td colSpan={SYMPTOMS.length + 3} className="text-center py-6 text-slate-400 font-bold text-xs sm:text-sm">No assessments added.</td></tr>
                        ) : (
                          assessments.map((row) => (
                            <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="px-1 sm:px-2 py-1.5 text-center font-black text-slate-800 text-[11px] sm:text-[12px] border-r border-slate-200">{row.type}</td>
                              <td className="px-1 sm:px-2 py-1.5 text-center border-r border-slate-200">
                                <input type="time" value={row.time} onChange={(e) => updateTime(row.id, e.target.value)} className="w-full text-center outline-none bg-transparent text-[11px] sm:text-[12px]" />
                              </td>
                              {SYMPTOMS.map((symptom, idx) => (
                                <td key={idx} className="px-1 py-1.5 text-center border-r border-slate-200 p-0 m-0">
                                  <div 
                                    className="flex items-center justify-center w-full min-h-[26px] sm:min-h-[30px] cursor-pointer hover:bg-blue-50 transition-colors" 
                                    onClick={() => toggleSymptom(row.id, symptom)}
                                  >
                                    {!!row.symptoms[symptom] && (
                                      <Check size={16} className="sm:w-[20px] sm:h-[20px] text-green-500" strokeWidth={4} />
                                    )}
                                  </div>
                                </td>
                              ))}
                              <td className="px-2 py-1.5 text-center"><button type="button" onClick={() => removeAssessmentRow(row.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={14} /></button></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* INJECTIONS TABLE */}
            {fetchedInjections && (
              <div className="flex flex-col border border-slate-300 rounded-xl shadow-md bg-white shrink-0 animate-in fade-in duration-300">
                <div className="bg-[#00A3FF] text-white font-black text-[14px] sm:text-[15px] px-4 sm:px-5 py-2.5 flex items-center justify-between uppercase rounded-t-lg">
                  <div className="flex items-center gap-2"><Syringe size={16} className="sm:w-[18px] sm:h-[18px]" /> Injection Details</div>
                  <button type="button" onClick={hideInjectionData} className="text-white/80 hover:text-white bg-white/10 rounded-full p-1 transition-colors"><X size={16} className="sm:w-[18px] sm:h-[18px]" /></button>
                </div>
                
                <div className="w-full overflow-x-auto p-0">
                  <div className="min-w-[900px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#e0f2fe] text-slate-700 text-[10px] sm:text-[11px] font-bold border-b border-slate-300">
                          <th className="px-2 py-2 border-r border-slate-200 text-center">Shot</th>
                          <th className="px-2 py-2 border-r border-slate-200">Injection</th>
                          <th className="px-2 py-2 border-r border-slate-200 text-center">Ratio</th>
                          <th className="px-2 py-2 border-r border-slate-200">Code</th>
                          <th className="px-2 py-2 border-r border-slate-200">Volume</th>
                          <th className="px-2 py-2 border-r border-slate-200 text-center">Bottle</th>
                          <th className="px-2 py-2 border-r border-slate-200">Staff</th>
                          <th className="px-2 py-2 border-r border-slate-200">Location</th>
                          <th className="px-2 py-2 border-r border-slate-200">Time</th>
                          <th className="px-2 py-2 border-r border-slate-200">Code</th>
                          <th className="px-2 py-2 border-r border-slate-200 text-center">Conf</th>
                          <th className="px-2 py-2 border-r border-slate-200 text-center">Rxn</th>
                          <th className="px-2 py-2">Remarks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-[11px] sm:text-[12px]">
                        {fetchedInjections.map((inj) => (
                          <tr key={inj.id} className="hover:bg-slate-50">
                            <td className="px-2 py-1.5 font-bold text-slate-700 border-r border-slate-200 text-center whitespace-nowrap">{inj.shot}</td>
                            <td className="px-2 py-1.5 text-slate-800 border-r border-slate-200 font-medium whitespace-nowrap">{inj.injection}</td>
                            <td className="px-2 py-1.5 font-black text-red-500 border-r border-slate-200 text-center whitespace-nowrap">{inj.ratio}</td>
                            <td className="px-2 py-1.5 font-bold text-blue-600 border-r border-slate-200 whitespace-nowrap">{inj.code1}</td>
                            <td className="px-2 py-1.5 font-bold text-[#00A3FF] border-r border-slate-200 whitespace-nowrap">{inj.volume}</td>
                            <td className="px-2 py-1.5 text-slate-700 border-r border-slate-200 text-center whitespace-nowrap">{inj.bottle}</td>
                            <td className="px-1 py-1 border-r border-slate-200">
                              <input type="text" value={inj.staff} onChange={(e) => handleInjectionChange(inj.id, 'staff', e.target.value)} className="w-10 sm:w-12 bg-transparent outline-none px-1 text-center" />
                            </td>
                            <td className="px-2 py-1.5 border-r border-slate-200">
                              <input type="text" value={inj.location} onChange={(e) => handleInjectionChange(inj.id, 'location', e.target.value)} className="w-10 bg-transparent outline-none px-1 text-center" />
                            </td>
                            <td className="px-1 py-1 border-r border-slate-200">
                              <input type="time" value={inj.time} onChange={(e) => handleInjectionChange(inj.id, 'time', e.target.value)} className="w-full bg-transparent outline-none px-1" />
                            </td>
                            <td className="px-1 py-1 border-r border-slate-200">
                              <input type="text" value={inj.code2} onChange={(e) => handleInjectionChange(inj.id, 'code2', e.target.value)} className="w-12 bg-transparent outline-none px-1 text-center" />
                            </td>
                            <td className="px-2 py-1.5 border-r border-slate-200 text-center">{inj.conf ? 'Yes' : 'No'}</td>
                            <td className="px-2 py-1.5 text-center border-r border-slate-200 p-0">
                              <div 
                                className="flex items-center justify-center w-full min-h-[28px] sm:min-h-[30px] cursor-pointer" 
                                onClick={() => handleInjectionChange(inj.id, 'rxn', !inj.rxn)}
                              >
                                {inj.rxn && <Check size={16} className="sm:w-[18px] sm:h-[18px] text-green-500" strokeWidth={4} />}
                              </div>
                            </td>
                            <td className="px-1 py-1">
                              <input type="text" value={inj.remarks} onChange={(e) => handleInjectionChange(inj.id, 'remarks', e.target.value)} className="w-full min-w-[100px] bg-transparent outline-none px-1" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* REACTION FORM GRID */}
            {reactionData && (
              <div className="flex flex-col border border-slate-200 rounded-xl shadow-sm bg-white shrink-0 overflow-hidden animate-in fade-in duration-300">
                <div className="bg-[#00A3FF] text-white font-bold text-[13px] sm:text-[14px] px-4 sm:px-5 py-2.5 flex items-center justify-between uppercase">
                  <div className="flex items-center gap-2">
                    <Zap size={14} className="sm:w-[16px] sm:h-[16px] fill-white" /> REACTION
                  </div>
                  <button type="button" onClick={hideReactionData} className="text-white hover:text-white bg-transparent hover:bg-white/20 rounded transition-colors p-1"><X size={16} className="sm:w-[20px] sm:h-[20px]" strokeWidth={2} /></button>
                </div>

                <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 bg-white">
                  {/* Grid stacks completely on mobile, 5 cols on desktop */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><ListOrdered size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> No</label>
                      <select value={reactionData.no} onChange={e => updateReactionData('no', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm bg-white h-[38px]"><option></option><option>1</option><option>2</option><option>3</option></select>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><MapPin size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> Loc</label>
                      <input type="text" value={reactionData.loc} onChange={e => updateReactionData('loc', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><AlertTriangle size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> Systemic</label>
                      <input type="text" value={reactionData.systemic} onChange={e => updateReactionData('systemic', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><Clock size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> Reaction Time</label>
                      <input type="time" value={reactionData.reactionTime} onChange={e => updateReactionData('reactionTime', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm bg-white h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2 lg:col-span-1">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><ImageIcon size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> Picture</label>
                      <div className="flex items-center h-[38px] border border-slate-300 rounded-md overflow-hidden bg-white shadow-sm">
                        <input type="file" className="w-full text-[11px] sm:text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:border-0 file:border-r file:border-slate-300 file:text-[11px] sm:file:text-xs file:font-bold file:bg-slate-50 file:text-slate-700 hover:file:bg-slate-100 outline-none cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><Syringe size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> PT Shot</label>
                      <input type="text" value={reactionData.ptShot} onChange={e => updateReactionData('ptShot', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><Star size={14} className="sm:w-[16px] sm:h-[16px] text-amber-400 fill-amber-400" strokeWidth={2} /> Score</label>
                      <input type="text" value={reactionData.score} onChange={e => updateReactionData('score', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div> Wheal</label>
                      <input type="text" value={reactionData.wheal} onChange={e => updateReactionData('wheal', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><Droplet size={14} className="sm:w-[16px] sm:h-[16px] text-red-500 fill-red-500" strokeWidth={2} /> Flare</label>
                      <input type="text" value={reactionData.flare} onChange={e => updateReactionData('flare', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm h-[38px]" />
                    </div>
                    <div className="flex flex-col gap-1.5 sm:gap-2 sm:col-span-2 lg:col-span-1">
                      <label className="flex items-center gap-2 text-slate-500 font-bold text-[12px] sm:text-[13px]"><Clock size={14} className="sm:w-[16px] sm:h-[16px] text-[#00A3FF]" strokeWidth={2.5} /> Obs Time</label>
                      <input type="time" value={reactionData.obsTime} onChange={e => updateReactionData('obsTime', e.target.value)} className="border border-slate-300 rounded-md px-3 py-2 text-[13px] sm:text-sm text-slate-800 outline-none focus:border-[#00A3FF] w-full shadow-sm bg-white h-[38px]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-2 shrink-0">
              <div className="flex items-center gap-2 text-amber-500 font-bold text-[12px] sm:text-[13px]">
                <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-amber-400 rounded-sm"></div> Note / Comments
              </div>
              <textarea rows="3" value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-slate-300 rounded-xl p-3 sm:p-4 outline-none text-[13px] sm:text-[14px] text-slate-800 resize-none bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-all"></textarea>
            </div>

            {/* SIGNATURE SECTION - Stack on Mobile, Inline on Desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 mt-auto shrink-0 mb-0 pt-4 sm:pt-0">
              <div className="flex flex-col items-center gap-1 w-full sm:w-auto">
                <input type="date" className="border-b border-slate-400 focus:border-[#00A3FF] bg-transparent w-full text-center outline-none text-[13px] sm:text-[14px] font-bold text-slate-800 pb-1" />
                <span className="text-[11px] sm:text-[12px] font-bold text-slate-500 uppercase">Date</span>
              </div>
              <div className="flex flex-col items-center gap-1 w-full sm:w-auto">
                <input type="text" className="border-b border-slate-400 focus:border-[#00A3FF] bg-transparent w-full text-center outline-none text-[13px] sm:text-[14px] font-bold text-slate-800 pb-1" />
                <span className="text-[11px] sm:text-[12px] font-bold text-slate-500 uppercase">Staff Member Name</span>
              </div>
              <div className="flex flex-col items-center gap-1 w-full sm:w-auto">
                <input type="text" className="border-b border-slate-400 focus:border-[#00A3FF] bg-transparent w-full text-center outline-none text-[13px] sm:text-[14px] font-bold text-slate-800 pb-1" />
                <span className="text-[11px] sm:text-[12px] font-bold text-slate-500 uppercase">Signature</span>
              </div>
            </div>

          </div>

          {/* FIXED FOOTER - Responsive Flex Stack */}
          <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between shrink-0 relative z-10 rounded-b-xl gap-3 md:gap-0 mt-auto">
            <button type="button" onClick={onClose} className="w-full md:w-auto border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-[13px] sm:text-[14px] px-8 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm order-last md:order-first">
              Close
            </button>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
              <button type="button" onClick={() => setShowPrintModal(true)} className="flex-1 sm:flex-none bg-slate-800 hover:bg-slate-700 text-white font-bold text-[13px] sm:text-[14px] px-6 sm:px-8 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95">
                <Printer size={16} className="sm:w-[18px] sm:h-[18px]" /> Print
              </button>
              <button type="button" onClick={handleClear} className="flex-1 sm:flex-none bg-rose-500 hover:bg-rose-600 text-white font-bold text-[13px] sm:text-[14px] px-6 sm:px-8 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95">
                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" /> Clear
              </button>
              <button type="button" onClick={() => console.log("Submit")} className="flex-1 sm:flex-none bg-[#00A3FF] hover:bg-[#008CE6] text-white font-bold text-[13px] sm:text-[14px] px-8 sm:px-10 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#00A3FF]/30 active:scale-95">
                <Send size={16} className="sm:w-[18px] sm:h-[18px]" /> Submit
              </button>
            </div>
          </div>

        </div>
      </div>

      {showPrintModal && (
        <div className="fixed inset-0 z-[100000] flex justify-center items-center bg-slate-900/60 backdrop-blur-sm print:hidden p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-[400px] flex flex-col gap-2 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-2 text-slate-800">
              <Printer size={24} className="text-[#00A3FF]" strokeWidth={2.5} />
              <h3 className="font-black text-[16px] sm:text-[18px] m-0 uppercase">Print Options</h3>
            </div>
            <p className="text-slate-500 text-[12px] sm:text-[13px] font-bold mb-4 leading-relaxed">
              Would you like to print the filled record, or a blank form for manual entry?
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => triggerPrint('filled')} className="bg-[#00A3FF] text-white font-bold text-[13px] sm:text-[14px] py-3 rounded-lg hover:bg-[#008CE6] transition-all flex justify-center items-center gap-2 shadow-md shadow-[#00A3FF]/20 active:scale-95">
                Print Filled Record
              </button>
              <button onClick={() => triggerPrint('unfilled')} className="bg-white border-2 border-slate-200 text-slate-700 font-bold text-[13px] sm:text-[14px] py-3 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all flex justify-center items-center gap-2 active:scale-95">
                Print Blank Form
              </button>
              <button onClick={() => setShowPrintModal(false)} className="text-slate-400 font-bold text-[12px] sm:text-[13px] py-2 mt-1 hover:text-slate-600 transition-all active:scale-95">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden left-[-9999px]">
        <InjectionPrintTemplate 
          ref={printRef}
          patientName={patientName}
          patientNo={patientNo}
          dos={dos}
          assessments={assessments}
          injections={fetchedInjections}
          reactionData={reactionData}
          note={note}
          printMode={printMode}
        />
      </div>
    </>
  );
};

export default InjectionSheet;