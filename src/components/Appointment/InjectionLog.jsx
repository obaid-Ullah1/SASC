import React from 'react';
import { 
  FaTimes, 
  FaFileExcel, 
  FaCheckCircle, 
  FaVial,      
  FaTint,
  FaSyringe,
  FaMinusCircle,
  FaInfoCircle,
  FaUserAlt,
  FaHashtag
} from 'react-icons/fa';

const InjectionLog = ({ isOpen, onClose, patientNo = "3564", patientName = "Taunton, Kiley" }) => {
  if (!isOpen) return null;

  // --- REUSABLE EXACT PIXEL-PERFECT COMPONENTS ---

  // 1. Status Badge (Scheduled, Missed, -)
  const StatusBadge = ({ status }) => {
    if (status === 'Scheduled') {
      return (
        <span className="bg-[#00E676] text-white px-3 py-0.5 rounded-full shadow-sm text-[11px] font-bold flex items-center justify-center gap-1.5 w-[100px] mx-auto">
          <FaCheckCircle size={11} /> {status}
        </span>
      );
    }
    if (status === 'Missed') {
      return (
        <span className="bg-[#FFEA00] text-slate-900 px-3 py-0.5 rounded-full shadow-sm text-[11px] font-bold flex items-center justify-center gap-1.5 w-[100px] mx-auto">
          <FaCheckCircle size={11} /> {status}
        </span>
      );
    }
    if (status === '-') {
      return (
        <span className="bg-[#00E676] text-white px-3 py-0.5 rounded-full shadow-sm text-[11px] font-bold flex items-center justify-center gap-1.5 w-[100px] mx-auto">
          <FaCheckCircle size={11} className="opacity-0" /> -
        </span>
      );
    }
    return null;
  };

  // 2. Bot Badge (Red, Yellow, Blue Pill)
  const BotBadge = ({ color }) => {
    const colorStyles = {
      Red: 'bg-[#E53935] text-white',
      Yellow: 'bg-[#FFEA00] text-slate-900', 
      Blue: 'bg-[#1E88E5] text-white',
    };
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full ${colorStyles[color]} text-[10px] font-bold min-w-[70px] justify-center shadow-sm`}>
        <FaVial size={10} className="-rotate-45" /> 
        {color}
      </div>
    );
  };

  // 3. Vol Cell (| + Drop + Text) with conditional color logic
  const VolCell = ({ vol, color }) => {
    const textDropColor = color === 'Yellow' ? 'text-slate-900' : (color === 'Red' ? 'text-[#E53935]' : 'text-[#1E88E5]');
    const lineColor = color === 'Yellow' ? 'bg-[#FFEA00]' : (color === 'Red' ? 'bg-[#E53935]' : 'bg-[#1E88E5]');

    return (
      <div className={`flex items-center justify-center gap-1.5 ${textDropColor}`}>
        <div className={`w-[3px] h-[14px] rounded-full ${lineColor}`}></div>
        <FaTint size={12} />
        <span className="font-bold text-[11px]">{vol}</span>
      </div>
    );
  };

  // 4. Group of 4 Sub-Columns (Conc, Bot, Vol, Loc)
  const AitMixGroup = ({ conc, color, vol, loc, isLast }) => (
    <>
      <td className="py-1.5 px-1 border-r border-slate-200 text-center align-middle text-slate-600 font-medium">
        {conc}
      </td>
      <td className="py-1.5 px-1 border-r border-slate-200 text-center align-middle">
        <BotBadge color={color} />
      </td>
      <td className="py-1.5 px-1 border-r border-slate-200 text-center align-middle">
        <VolCell vol={vol} color={color} />
      </td>
      <td className={`py-1.5 px-1 text-center align-middle text-slate-800 font-medium ${!isLast ? 'border-r-2 border-slate-300' : ''}`}>
        {loc}
      </td>
    </>
  );

  // Data generation matching your screenshot rows
  const generateRows = () => {
    return [
      { dos: '3/26/2026', day: 'Thu', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '3/17/2026', day: 'Tue', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '3/10/2026', day: 'Tue', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '3/6/2026', day: 'Fri', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '2/26/2026', day: 'Thu', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '2/19/2026', day: 'Thu', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.40 mL', l1: 'RA', v2: '0.40 mL', l2: 'LA', v3: '0.40 mL', l3: 'LA' },
      { dos: '2/12/2026', day: 'Thu', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.30 mL', l1: 'RA', v2: '0.30 mL', l2: 'LA', v3: '0.30 mL', l3: 'LA' },
      { dos: '2/3/2026', day: 'Tue', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.20 mL', l1: 'RA', v2: '0.20 mL', l2: 'LA', v3: '0.20 mL', l3: 'LA' },
      { dos: '1/30/2026', day: 'Fri', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.15 mL', l1: 'RA', v2: '0.15 mL', l2: 'LA', v3: '0.15 mL', l3: 'LA' },
      { dos: '1/23/2026', day: 'Fri', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.10 mL', l1: 'RA', v2: '0.10 mL', l2: 'LA', v3: '0.10 mL', l3: 'LA' },
      { dos: '1/16/2026', day: 'Fri', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.05 mL', l1: 'RA', v2: '0.05 mL', l2: 'LA', v3: '0.05 mL', l3: 'LA' },
      { dos: '1/14/2026', day: 'Wed', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.10 mL', l1: '-', v2: '0.10 mL', l2: '-', v3: '0.10 mL', l3: '-' },
      { dos: '1/9/2026', day: 'Fri', status: 'Missed', conc: '1:10', color: 'Red', v1: '0.10 mL', l1: '-', v2: '0.10 mL', l2: '-', v3: '0.10 mL', l3: '-' },
      { dos: '1/6/2026', day: 'Tue', status: 'Scheduled', conc: '1:10', color: 'Red', v1: '0.05 mL', l1: 'RA', v2: '0.05 mL', l2: 'LA', v3: '0.05 mL', l3: 'LA' },
      { dos: '1/2/2026', day: 'Fri', status: 'Scheduled', conc: '1:100', color: 'Yellow', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '12/26/2025', day: 'Fri', status: 'Scheduled', conc: '1:100', color: 'Yellow', v1: '0.40 mL', l1: 'RA', v2: '0.40 mL', l2: 'LA', v3: '0.40 mL', l3: 'LA' },
      { dos: '12/19/2025', day: 'Fri', status: 'Scheduled', conc: '1:100', color: 'Yellow', v1: '0.30 mL', l1: 'RA', v2: '0.30 mL', l2: 'LA', v3: '0.30 mL', l3: 'LA' },
      { dos: '12/11/2025', day: 'Thu', status: 'Scheduled', conc: '1:100', color: 'Yellow', v1: '0.20 mL', l1: 'RA', v2: '0.20 mL', l2: 'LA', v3: '0.20 mL', l3: 'LA' },
      { dos: '12/5/2025', day: 'Fri', status: '-', conc: '1:100', color: 'Yellow', v1: '0.15 mL', l1: 'RA', v2: '0.15 mL', l2: 'LA', v3: '0.15 mL', l3: 'LA' },
      { dos: '11/25/2025', day: 'Tue', status: 'Scheduled', conc: '1:100', color: 'Yellow', v1: '0.10 mL', l1: 'RA', v2: '0.10 mL', l2: 'LA', v3: '0.10 mL', l3: 'LA' },
      { dos: '11/20/2025', day: 'Thu', status: 'Scheduled', conc: '1:100', color: 'Yellow', v1: '0.05 mL', l1: 'RA', v2: '0.05 mL', l2: 'LA', v3: '0.05 mL', l3: 'LA' },
      { dos: '11/11/2025', day: 'Tue', status: 'Scheduled', conc: '1:1000', color: 'Blue', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
      { dos: '11/6/2025', day: 'Thu', status: '-', conc: '1:1000', color: 'Blue', v1: '0.40 mL', l1: 'RA', v2: '0.40 mL', l2: 'LA', v3: '0.40 mL', l3: 'LA' },
      { dos: '10/16/2025', day: 'Thu', status: 'Scheduled', conc: '1:1000', color: 'Blue', v1: '0.40 mL', l1: 'RA', v2: '0.40 mL', l2: 'LA', v3: '0.40 mL', l3: 'LA' },
    ];
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-slate-50 w-full max-w-[98vw] h-[95vh] rounded-md shadow-2xl flex flex-col overflow-hidden font-sans">
        
        {/* --- MAIN HEADER (Blue) --- */}
        <div className="bg-[#1E88E5] text-white px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FaInfoCircle size={15} />
            <h2 className="text-[13px] font-bold tracking-wide">Injection Log ({patientNo})</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
            <FaTimes size={15} />
          </button>
        </div>

        {/* --- PATIENT INFO BAR --- */}
        <div className="bg-white px-4 py-2.5 flex items-center gap-6 border-b border-slate-200 text-[12px] shrink-0">
          <div className="flex items-center gap-1.5 text-slate-700">
            <FaUserAlt size={12} className="text-[#1E88E5]" />
            <span className="font-bold text-slate-800">Patient:</span> {patientName}
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <FaHashtag size={12} className="text-[#388E3C]" />
            <span className="font-bold text-slate-800">Patient No:</span> {patientNo}
          </div>
        </div>

        {/* --- CURRENT INJECTION GREEN BAR --- */}
        <div className="bg-white px-4 py-2 flex items-center gap-2 text-[#2E7D32] border-b border-slate-200 shrink-0">
           <FaSyringe size={16} />
           <span className="font-bold text-[14px]">Current Injection</span>
        </div>

        {/* --- CURRENT INJECTION GREEN TABLE HEADER --- */}
        <div className="bg-[#4CAF50] flex text-white text-[11px] font-bold text-center shrink-0 border-b border-white">
          <div className="flex-1 py-1.5 border-r border-white/30 flex items-center justify-center gap-1"><FaSyringe size={10}/> Injection</div>
          <div className="flex-1 py-1.5 border-r border-white/30 flex items-center justify-center gap-1"><FaHashtag size={10}/> Code</div>
          <div className="flex-1 py-1.5 border-r border-white/30 flex items-center justify-center gap-1"><FaVial size={10}/> Bottle</div>
          <div className="flex-1 py-1.5 border-r border-white/30 flex items-center justify-center gap-1"><FaMinusCircle size={10}/> Conc.</div>
          <div className="flex-1 py-1.5 border-r border-white/30 flex items-center justify-center gap-1"><FaTint size={10}/> Volume</div>
          <div className="flex-1 py-1.5 flex items-center justify-center gap-1"><FaInfoCircle size={10}/> Frequency</div>
        </div>

        {/* --- INJECTION LOG HEADER (Cyan) --- */}
        <div className="bg-[#00BCD4] text-white px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FaFileExcel size={14} className="opacity-90" />
            <h2 className="text-[13px] font-bold tracking-wide">Injection Log</h2>
          </div>
          <button className="bg-[#388E3C] hover:bg-[#2E7D32] p-1.5 rounded transition-colors shadow-sm">
            <FaFileExcel size={13} />
          </button>
        </div>

        {/* --- SCROLLABLE TABLE AREA --- */}
        <div className="flex-1 overflow-auto bg-white mx-2 mb-2 border border-slate-300 shadow-sm relative">
          <table className="w-full text-[11px] border-collapse whitespace-nowrap">
            
            {/* STICKY DOUBLE HEADERS */}
            <thead className="bg-[#F8F9FA] sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              {/* Top Tier Header */}
              <tr>
                <th rowSpan="2" className="py-2 px-3 border-r-2 border-b border-slate-300 font-semibold text-slate-500 w-[90px]">DOS</th>
                <th rowSpan="2" className="py-2 px-3 border-r-2 border-b border-slate-300 font-semibold text-slate-500 w-[60px]">Day</th>
                <th rowSpan="2" className="py-2 px-3 border-r-2 border-b border-slate-300 font-semibold text-slate-500 w-[120px]">Status</th>
                
                <th colSpan="4" className="py-1.5 px-2 border-r-2 border-b border-slate-300 font-medium text-[#00A3FF] text-center tracking-wide">AIT MIX 1</th>
                <th colSpan="4" className="py-1.5 px-2 border-r-2 border-b border-slate-300 font-medium text-[#00A3FF] text-center tracking-wide">AIT MIX 2</th>
                <th colSpan="4" className="py-1.5 px-2 border-b border-slate-300 font-medium text-[#00A3FF] text-center tracking-wide">AIT MIX 4</th>
              </tr>
              {/* Bottom Tier Header (Sub-columns) */}
              <tr>
                {/* MIX 1 */}
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Conc.</th>
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Bot.</th>
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Vol</th>
                <th className="py-1 px-1 border-r-2 border-b border-slate-300 font-semibold text-slate-400">Loc</th>
                {/* MIX 2 */}
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Conc.</th>
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Bot.</th>
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Vol</th>
                <th className="py-1 px-1 border-r-2 border-b border-slate-300 font-semibold text-slate-400">Loc</th>
                {/* MIX 4 */}
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Conc.</th>
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Bot.</th>
                <th className="py-1 px-1 border-r border-b border-slate-200 font-semibold text-slate-400">Vol</th>
                <th className="py-1 px-1 border-b border-slate-200 font-semibold text-slate-400">Loc</th>
              </tr>
            </thead>
            
            <tbody>
              {/* Planned Schedule Row */}
              <tr className="bg-[#E6C280]/40 border-b border-slate-300">
                <td className="py-1.5 px-3 border-r-2 border-slate-300 text-slate-900 font-bold text-left" colSpan="3">
                  Planned Schedule
                </td>
                <td colSpan="4" className="border-r-2 border-slate-300"></td>
                <td colSpan="4" className="border-r-2 border-slate-300"></td>
                <td colSpan="4"></td>
              </tr>

              {/* Data Rows generated matching screenshot perfectly */}
              {generateRows().map((row, i) => (
                <tr key={i} className={`border-b border-slate-200 hover:bg-slate-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  
                  {/* DOS */}
                  <td className="py-1.5 px-3 border-r-2 border-slate-300 text-slate-700 text-center font-medium">
                    {row.dos}
                  </td>
                  
                  {/* Day */}
                  <td className="py-1.5 px-3 border-r-2 border-slate-300 text-[#00A3FF] font-bold text-center">
                    {row.day}
                  </td>
                  
                  {/* Status */}
                  <td className="py-1.5 px-3 border-r-2 border-slate-300 text-center">
                    <StatusBadge status={row.status} />
                  </td>

                  {/* AIT MIX 1 */}
                  <AitMixGroup conc={row.conc} color={row.color} vol={row.v1} loc={row.l1} />
                  
                  {/* AIT MIX 2 */}
                  <AitMixGroup conc={row.conc} color={row.color} vol={row.v2} loc={row.l2} />
                  
                  {/* AIT MIX 4 */}
                  <AitMixGroup conc={row.conc} color={row.color} vol={row.v3} loc={row.l3} isLast={true} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- BOTTOM ACTION BAR --- */}
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex justify-end shrink-0">
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 px-5 py-1.5 border-[1.5px] border-slate-300 rounded-full text-slate-600 font-bold text-[13px] hover:bg-slate-100 hover:text-slate-800 transition-colors"
          >
            <FaTimes size={12} /> Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default InjectionLog;