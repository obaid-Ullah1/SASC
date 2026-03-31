import React from 'react';
import { 
  FaTimes, 
  FaFileExcel, 
  FaCheckCircle, 
  FaVial,      
  FaTint,
  FaSyringe,
  FaInfoCircle,
  FaUserAlt,
  FaHashtag,
  FaClock,     
  FaBarcode,   
  FaFlask      
} from 'react-icons/fa';

const InjectionLog = ({ isOpen, onClose, patientNo = "3564", patientName = "Taunton, Kiley" }) => {
  if (!isOpen) return null;

  // --- DATA EXTRACTION ---
  const plannedRows = [
    { dos: '8/27/2026', day: 'Thu', status: 'Planned', conc: '1:10', color: 'Red', v1: '0.50 mL', l1: '-', v2: '0.50 mL', l2: '-', v3: '0.50 mL', l3: '-' },
    { dos: '8/20/2026', day: 'Thu', status: 'Planned', conc: '1:10', color: 'Red', v1: '0.40 mL', l1: '-', v2: '0.40 mL', l2: '-', v3: '0.40 mL', l3: '-' },
    { dos: '8/13/2026', day: 'Thu', status: 'Planned', conc: '1:10', color: 'Red', v1: '0.30 mL', l1: '-', v2: '0.30 mL', l2: '-', v3: '0.30 mL', l3: '-' },
    { dos: '8/6/2026', day: 'Thu', status: 'Planned', conc: '1:10', color: 'Red', v1: '0.20 mL', l1: '-', v2: '0.20 mL', l2: '-', v3: '0.20 mL', l3: '-' },
    { dos: '7/30/2026', day: 'Thu', status: 'Planned', conc: '1:10', color: 'Red', v1: '0.10 mL', l1: '-', v2: '0.10 mL', l2: '-', v3: '0.10 mL', l3: '-' },
    { dos: '7/23/2026', day: 'Thu', status: 'Planned', conc: '1:10', color: 'Red', v1: '0.05 mL', l1: '-', v2: '0.05 mL', l2: '-', v3: '0.05 mL', l3: '-' },
    { dos: '7/16/2026', day: 'Thu', status: 'Planned', conc: '1:100', color: 'Yellow', v1: '0.50 mL', l1: '-', v2: '0.50 mL', l2: '-', v3: '0.50 mL', l3: '-' },
    { dos: '7/9/2026', day: 'Thu', status: 'Planned', conc: '1:100', color: 'Yellow', v1: '0.40 mL', l1: '-', v2: '0.40 mL', l2: '-', v3: '0.40 mL', l3: '-' },
    { dos: '7/2/2026', day: 'Thu', status: 'Planned', conc: '1:100', color: 'Yellow', v1: '0.30 mL', l1: '-', v2: '0.30 mL', l2: '-', v3: '0.30 mL', l3: '-' },
    { dos: '6/25/2026', day: 'Thu', status: 'Planned', conc: '1:100', color: 'Yellow', v1: '0.20 mL', l1: '-', v2: '0.20 mL', l2: '-', v3: '0.20 mL', l3: '-' },
    { dos: '6/18/2026', day: 'Thu', status: 'Planned', conc: '1:100', color: 'Yellow', v1: '0.10 mL', l1: '-', v2: '0.10 mL', l2: '-', v3: '0.10 mL', l3: '-' },
    { dos: '6/11/2026', day: 'Thu', status: 'Planned', conc: '1:100', color: 'Yellow', v1: '0.05 mL', l1: '-', v2: '0.05 mL', l2: '-', v3: '0.05 mL', l3: '-' },
    { dos: '6/4/2026', day: 'Thu', status: 'Planned', conc: '1:1000', color: 'Blue', v1: '0.50 mL', l1: '-', v2: '0.50 mL', l2: '-', v3: '0.50 mL', l3: '-' },
    { dos: '5/28/2026', day: 'Thu', status: 'Planned', conc: '1:1000', color: 'Blue', v1: '0.40 mL', l1: '-', v2: '0.40 mL', l2: '-', v3: '0.40 mL', l3: '-' },
    { dos: '5/21/2026', day: 'Thu', status: 'Planned', conc: '1:1000', color: 'Blue', v1: '0.30 mL', l1: '-', v2: '0.30 mL', l2: '-', v3: '0.30 mL', l3: '-' },
    { dos: '5/14/2026', day: 'Thu', status: 'Planned', conc: '1:1000', color: 'Blue', v1: '0.20 mL', l1: '-', v2: '0.20 mL', l2: '-', v3: '0.20 mL', l3: '-' },
    { dos: '5/7/2026', day: 'Thu', status: 'Planned', conc: '1:1000', color: 'Blue', v1: '0.10 mL', l1: '-', v2: '0.10 mL', l2: '-', v3: '0.10 mL', l3: '-' },
    { dos: '4/30/2026', day: 'Thu', status: 'Planned', conc: '1:1000', color: 'Blue', v1: '0.05 mL', l1: '-', v2: '0.05 mL', l2: '-', v3: '0.05 mL', l3: '-' },
    { dos: '4/23/2026', day: 'Thu', status: 'Planned', conc: '1:10000', color: 'Green', v1: '0.50 mL', l1: '-', v2: '0.50 mL', l2: '-', v3: '0.50 mL', l3: '-' },
    { dos: '4/16/2026', day: 'Thu', status: 'Planned', conc: '1:10000', color: 'Green', v1: '0.40 mL', l1: '-', v2: '0.40 mL', l2: '-', v3: '0.40 mL', l3: '-' },
    { dos: '4/9/2026', day: 'Thu', status: 'Planned', conc: '1:10000', color: 'Green', v1: '0.30 mL', l1: '-', v2: '0.30 mL', l2: '-', v3: '0.30 mL', l3: '-' },
    { dos: '4/2/2026', day: 'Thu', status: 'Planned', conc: '1:10000', color: 'Green', v1: '0.20 mL', l1: '-', v2: '0.20 mL', l2: '-', v3: '0.20 mL', l3: '-' },
  ];

  const scheduledRows = [
    { dos: '2/26/2026', day: 'Thu', status: 'Scheduled', conc: '1:10000', color: 'Green', v1: '0.10 mL', l1: 'RA', v2: '0.10 mL', l2: 'LA', v3: '0.10 mL', l3: 'LA' },
    { dos: '2/24/2026', day: 'Tue', status: 'Scheduled', conc: '1:10000', color: 'Green', v1: '0.05 mL', l1: 'RA', v2: '0.05 mL', l2: 'LA', v3: '0.05 mL', l3: 'LA' },
    { dos: '2/12/2026', day: 'Thu', status: 'Scheduled', conc: '1:100000', color: 'Grey', v1: '0.50 mL', l1: 'RA', v2: '0.50 mL', l2: 'LA', v3: '0.50 mL', l3: 'LA' },
    { dos: '2/10/2026', day: 'Tue', status: 'Scheduled', conc: '1:100000', color: 'Grey', v1: '0.40 mL', l1: 'RA', v2: '0.40 mL', l2: 'LA', v3: '0.40 mL', l3: 'LA' },
    { dos: '2/5/2026', day: 'Fri', status: 'Scheduled', conc: '1:100000', color: 'Grey', v1: '0.30 mL', l1: 'RA', v2: '0.30 mL', l2: 'LA', v3: '0.30 mL', l3: 'LA' },
    { dos: '2/27/2026', day: 'Fri', status: 'Scheduled', conc: '1:100000', color: 'Grey', v1: '0.20 mL', l1: '-', v2: '0.20 mL', l2: '-', v3: '0.20 mL', l3: '-' },
    { dos: '2/19/2026', day: 'Thu', status: 'Scheduled', conc: '1:100000', color: 'Grey', v1: '0.10 mL', l1: '-', v2: '0.10 mL', l2: '-', v3: '0.10 mL', l3: '-' },
    { dos: '2/17/2026', day: 'Tue', status: 'Scheduled', conc: '1:100000', color: 'Grey', v1: '0.05 mL', l1: '-', v2: '0.05 mL', l2: '-', v3: '0.05 mL', l3: '-' },
  ];

  // --- 1. EXCEL EXPORT LOGIC ---
  const handleExportExcel = () => {
    // Generate headers
    const headers = [
      'DOS', 'Day', 'Status', 
      'AIT MIX 1 Conc', 'AIT MIX 1 Bottle', 'AIT MIX 1 Vol', 'AIT MIX 1 Loc',
      'AIT MIX 2 Conc', 'AIT MIX 2 Bottle', 'AIT MIX 2 Vol', 'AIT MIX 2 Loc',
      'AIT MIX 4 Conc', 'AIT MIX 4 Bottle', 'AIT MIX 4 Vol', 'AIT MIX 4 Loc'
    ];

    // Combine data
    const allRows = [...plannedRows, ...scheduledRows];

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...allRows.map(row => [
        row.dos, row.day, row.status,
        row.conc, row.color, row.v1, row.l1,
        row.conc, row.color, row.v2, row.l2,
        row.conc, row.color, row.v3, row.l3
      ].join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Injection_Log_${patientNo}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- REUSABLE EXACT PIXEL-PERFECT COMPONENTS ---
  const StatusBadge = ({ status }) => {
    if (status === 'Scheduled') {
      return (
        <span className="bg-[#00C853] text-white px-2 sm:px-3 py-0.5 rounded-full shadow-sm text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 sm:gap-1.5 w-[85px] sm:w-[100px] mx-auto tracking-wide">
          <FaCheckCircle size={10} className="sm:w-[11px] sm:h-[11px]" /> {status}
        </span>
      );
    }
    if (status === 'Planned') {
      return (
        <span className="text-slate-600 border-[1.5px] border-slate-300 bg-white px-2 sm:px-3 py-0.5 rounded-full shadow-sm text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 sm:gap-1.5 w-[85px] sm:w-[100px] mx-auto tracking-wide">
          <FaClock size={10} className="sm:w-[11px] sm:h-[11px]" /> {status}
        </span>
      );
    }
    if (status === 'Missed') {
      return (
        <span className="bg-[#FFEA00] text-slate-900 px-2 sm:px-3 py-0.5 rounded-full shadow-sm text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 sm:gap-1.5 w-[85px] sm:w-[100px] mx-auto tracking-wide">
          <FaCheckCircle size={10} className="sm:w-[11px] sm:h-[11px]" /> {status}
        </span>
      );
    }
    if (status === '-') {
      return (
        <span className="bg-[#00C853] text-white px-2 sm:px-3 py-0.5 rounded-full shadow-sm text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 sm:gap-1.5 w-[85px] sm:w-[100px] mx-auto opacity-75 tracking-wide">
          <FaCheckCircle size={10} className="opacity-0 sm:w-[11px] sm:h-[11px]" /> -
        </span>
      );
    }
    return null;
  };

  const BotBadge = ({ color }) => {
    const colorStyles = {
      Red: 'bg-[#E53935] text-white',
      Yellow: 'bg-[#FFEA00] text-slate-900', 
      Blue: 'bg-[#1E88E5] text-white',
      Green: 'bg-[#4CAF50] text-white',
      Grey: 'bg-[#616161] text-white', 
    };
    return (
      <div className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 rounded-full ${colorStyles[color]} text-[9px] sm:text-[10px] font-bold min-w-[55px] sm:min-w-[70px] justify-center shadow-sm border border-black/5 tracking-wide`}>
        <FaVial size={9} className="-rotate-45 opacity-90 sm:w-[10px] sm:h-[10px]" /> 
        {color}
      </div>
    );
  };

  const VolCell = ({ vol, color }) => {
    const textDropColor = {
      Yellow: 'text-slate-900',
      Red: 'text-[#D32F2F]',
      Blue: 'text-[#1976D2]',
      Green: 'text-[#388E3C]',
      Grey: 'text-[#424242]', 
    }[color];

    const lineColor = {
      Yellow: 'bg-[#FFEA00]',
      Red: 'bg-[#E53935]',
      Blue: 'bg-[#1E88E5]',
      Green: 'bg-[#4CAF50]',
      Grey: 'bg-[#757575]', 
    }[color];

    return (
      <div className={`flex items-center justify-center gap-1 sm:gap-1.5 ${textDropColor}`}>
        <div className={`w-[2.5px] sm:w-[3px] h-[12px] sm:h-[14px] rounded-full ${lineColor}`}></div>
        <FaTint size={10} className="mt-0.5 sm:w-[12px] sm:h-[12px]" />
        <span className="font-extrabold text-[10px] sm:text-[11px]">{vol}</span>
      </div>
    );
  };

  const AitMixGroup = ({ conc, color, vol, loc, isLast }) => (
    <>
      {/* --- 2. GRAY BG FOR CONC. CELLS --- */}
      <td className="bg-slate-100/70 py-1.5 sm:py-1 px-1 sm:px-1.5 border-r border-slate-200 text-center align-middle text-slate-700 font-bold text-[10px] sm:text-[11px]">
        {conc}
      </td>
      <td className="py-1.5 sm:py-1 px-1 sm:px-1.5 border-r border-slate-200 text-center align-middle">
        <BotBadge color={color} />
      </td>
      <td className="py-1.5 sm:py-1 px-1 sm:px-1.5 border-r border-slate-200 text-center align-middle">
        <VolCell vol={vol} color={color} />
      </td>
      {/* --- 3. DARK VERTICAL BORDER FOR COLUMN GROUPS ONLY --- */}
      <td className={`py-1.5 sm:py-1 px-1 sm:px-1.5 text-center align-middle text-slate-800 font-bold text-[10px] sm:text-[11px] ${!isLast ? 'border-r-[2px] border-r-slate-400' : ''}`}>
        {loc}
      </td>
    </>
  );

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm sm:p-4 antialiased">
      <div className="bg-slate-50 w-full h-full sm:max-w-[98vw] sm:h-[96vh] sm:rounded-md shadow-2xl flex flex-col overflow-hidden font-sans">
        
        {/* --- MAIN HEADER --- */}
        <div className="bg-[#1E88E5] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FaInfoCircle size={15} />
            <h2 className="text-[13px] sm:text-[14px] font-bold tracking-wide">Injection Log ({patientNo})</h2>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors">
            <FaTimes size={16} />
          </button>
        </div>

        {/* --- PATIENT INFO BAR --- */}
        <div className="bg-white px-3 sm:px-4 py-2 sm:py-2.5 flex flex-wrap items-center gap-3 sm:gap-6 border-b border-slate-200 text-[11px] sm:text-[12px] shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-1.5 text-slate-700">
            <FaUserAlt size={12} className="text-[#1E88E5]" />
            <span className="font-bold text-slate-800">Patient:</span> <span className="font-semibold">{patientName}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <FaHashtag size={12} className="text-[#388E3C]" />
            <span className="font-bold text-slate-800">Patient No:</span> <span className="font-semibold">{patientNo}</span>
          </div>
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        <div className="flex-1 overflow-y-auto flex flex-col pb-4 sm:pb-0">
          
          {/* === CURRENT INJECTION SECTION === */}
          <div className="bg-white mt-3 mx-2 sm:mx-3 shadow-sm border border-slate-200 rounded-md overflow-hidden shrink-0">
            <div className="px-3 py-2 flex items-center gap-2 text-[#2E7D32] bg-white border-b border-slate-200">
              <FaSyringe size={13} />
              <span className="font-extrabold tracking-wide text-[12px] sm:text-[13px]">Current Injection</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-[10px] sm:text-[11px] border-collapse whitespace-nowrap text-center">
                <thead className="bg-[#388E3C] text-white">
                  <tr>
                    <th className="py-2 px-2 sm:px-3 border-r border-white/20 font-bold tracking-wide">
                      <div className="flex items-center justify-center gap-1.5"><FaSyringe size={10} className="sm:w-[11px] sm:h-[11px]"/> Injection</div>
                    </th>
                    <th className="py-2 px-2 sm:px-3 border-r border-white/20 font-bold tracking-wide">
                      <div className="flex items-center justify-center gap-1.5"><FaBarcode size={10} className="sm:w-[11px] sm:h-[11px]"/> Code</div>
                    </th>
                    <th className="py-2 px-2 sm:px-3 border-r border-white/20 font-bold tracking-wide">
                      <div className="flex items-center justify-center gap-1.5"><FaVial size={10} className="sm:w-[11px] sm:h-[11px]"/> Bottle</div>
                    </th>
                    <th className="py-2 px-2 sm:px-3 border-r border-white/20 font-bold tracking-wide">
                      <div className="flex items-center justify-center gap-1.5"><FaFlask size={10} className="sm:w-[11px] sm:h-[11px]"/> Conc.</div>
                    </th>
                    <th className="py-2 px-2 sm:px-3 border-r border-white/20 font-bold tracking-wide">
                      <div className="flex items-center justify-center gap-1.5"><FaTint size={10} className="sm:w-[11px] sm:h-[11px]"/> Volume</div>
                    </th>
                    <th className="py-2 px-2 sm:px-3 font-bold tracking-wide">
                      <div className="flex items-center justify-center gap-1.5"><FaClock size={10} className="sm:w-[11px] sm:h-[11px]"/> Frequency</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-slate-200">
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 text-[#2E7D32] font-bold">AIT MIX 1</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 text-slate-700 font-semibold">ZZI-004</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200"><BotBadge color="Green" /></td>
                    <td className="bg-slate-100/70 py-1.5 px-2 sm:px-3 border-r border-slate-200 text-[#388E3C] font-extrabold">1:10000</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 font-extrabold text-slate-800">0.10 mL</td>
                    <td className="py-1.5 px-2 sm:px-3 text-slate-600 font-semibold">7 day</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 text-[#2E7D32] font-bold">AIT MIX 2</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 text-slate-700 font-semibold">ZZI-009</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200"><BotBadge color="Green" /></td>
                    <td className="bg-slate-100/70 py-1.5 px-2 sm:px-3 border-r border-slate-200 text-[#388E3C] font-extrabold">1:10000</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 font-extrabold text-slate-800">0.10 mL</td>
                    <td className="py-1.5 px-2 sm:px-3 text-slate-600 font-semibold">7 day</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 text-[#2E7D32] font-bold">AIT MIX 4</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 text-slate-700 font-semibold">ZZI-014</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200"><BotBadge color="Green" /></td>
                    <td className="bg-slate-100/70 py-1.5 px-2 sm:px-3 border-r border-slate-200 text-[#388E3C] font-extrabold">1:10000</td>
                    <td className="py-1.5 px-2 sm:px-3 border-r border-slate-200 font-extrabold text-slate-800">0.10 mL</td>
                    <td className="py-1.5 px-2 sm:px-3 text-slate-600 font-semibold">7 day</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* === INJECTION LOG SECTION === */}
          <div className="flex-1 flex flex-col bg-white mt-3 mx-2 sm:mx-3 mb-2 border border-slate-300 rounded-md overflow-hidden shadow-sm">
            
            <div className="bg-[#00BCD4] text-white px-3 sm:px-4 py-2 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FaFileExcel size={13} className="opacity-90 sm:w-[14px] sm:h-[14px]" />
                <h2 className="text-[12px] sm:text-[13px] font-bold tracking-wide">Injection Log</h2>
              </div>
              <button 
                onClick={handleExportExcel} // --- EXCEL ACTIVATION ADDED HERE ---
                className="bg-[#0097A7] hover:bg-[#00838F] p-1.5 rounded transition-colors shadow-sm border border-white/20"
                title="Export Log to Excel (.csv)"
              >
                <FaFileExcel size={13} />
              </button>
            </div>

            <div className="flex-1 overflow-x-auto relative">
              <table className="w-full text-[10px] sm:text-[11px] border-collapse whitespace-nowrap">
                
                <thead className="bg-[#F8F9FA] sticky top-0 z-10 shadow-[0_2px_3px_rgba(0,0,0,0.08)]">
                  <tr>
                    {/* DARK COLUMN LINES ON TH HEADERS */}
                    <th rowSpan="2" className="py-2.5 px-2 sm:px-3 border-r border-b border-slate-300 font-extrabold text-slate-700 min-w-[70px] sm:min-w-[90px] tracking-wide">DOS</th>
                    <th rowSpan="2" className="py-2.5 px-2 sm:px-3 border-r border-b border-slate-300 font-extrabold text-slate-700 min-w-[50px] sm:min-w-[60px] tracking-wide">Day</th>
                    <th rowSpan="2" className="py-2.5 px-2 sm:px-3 border-r-[2px] border-r-slate-400 border-b border-slate-300 font-extrabold text-slate-700 min-w-[100px] sm:min-w-[120px] tracking-wide">Status</th>
                    
                    <th colSpan="4" className="py-2 px-2 border-r-[2px] border-r-slate-400 border-b border-slate-300 font-extrabold text-slate-700 text-center uppercase tracking-wider bg-slate-100/50">AIT MIX 1</th>
                    <th colSpan="4" className="py-2 px-2 border-r-[2px] border-r-slate-400 border-b border-slate-300 font-extrabold text-slate-700 text-center uppercase tracking-wider bg-slate-100/50">AIT MIX 2</th>
                    <th colSpan="4" className="py-2 px-2 border-b border-slate-300 font-extrabold text-slate-700 text-center uppercase tracking-wider bg-slate-100/50">AIT MIX 4</th>
                  </tr>
                  <tr>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600 bg-slate-100/50">Conc.</th>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600">Bot.</th>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600">Vol</th>
                    <th className="py-1.5 px-1 border-r-[2px] border-r-slate-400 border-b border-slate-300 font-bold text-slate-600">Loc</th>
                    
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600 bg-slate-100/50">Conc.</th>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600">Bot.</th>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600">Vol</th>
                    <th className="py-1.5 px-1 border-r-[2px] border-r-slate-400 border-b border-slate-300 font-bold text-slate-600">Loc</th>
                    
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600 bg-slate-100/50">Conc.</th>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600">Bot.</th>
                    <th className="py-1.5 px-1 border-r border-b border-slate-300 font-bold text-slate-600">Vol</th>
                    <th className="py-1.5 px-1 border-b border-slate-300 font-bold text-slate-600">Loc</th>
                  </tr>
                </thead>
                
                <tbody>
                  {/* --- HEADER 1: PLANNED SCHEDULE --- */}
                  <tr className="bg-[#FFF3E0] border-b border-slate-300">
                    <td className="py-2 px-2 sm:px-3 border-r-[2px] border-r-slate-400 text-slate-900 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wider text-left" colSpan="3">
                      Planned Schedule
                    </td>
                    <td colSpan="4" className="border-r-[2px] border-r-slate-400"></td>
                    <td colSpan="4" className="border-r-[2px] border-r-slate-400"></td>
                    <td colSpan="4"></td>
                  </tr>

                  {plannedRows.map((row, i) => (
                    <tr key={`p-${i}`} className={`border-b border-slate-200 hover:bg-slate-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-1.5 px-2 sm:px-3 border-r border-slate-300 text-slate-800 text-center font-bold text-[10px] sm:text-[11px]">{row.dos}</td>
                      <td className="py-1.5 px-2 sm:px-3 border-r border-slate-300 text-[#1976D2] font-bold text-center">{row.day}</td>
                      {/* DARK COLUMN LINE ON STATUS */}
                      <td className="py-1.5 px-2 sm:px-3 border-r-[2px] border-r-slate-400 text-center"><StatusBadge status={row.status} /></td>
                      <AitMixGroup conc={row.conc} color={row.color} vol={row.v1} loc={row.l1} />
                      <AitMixGroup conc={row.conc} color={row.color} vol={row.v2} loc={row.l2} />
                      <AitMixGroup conc={row.conc} color={row.color} vol={row.v3} loc={row.l3} isLast={true} />
                    </tr>
                  ))}
                  
                  {/* --- HEADER 2: SCHEDULED --- */}
                  <tr className="bg-[#FFF3E0] border-b border-slate-300">
                    <td className="py-2 px-2 sm:px-3 border-r-[2px] border-r-slate-400 text-slate-900 font-extrabold uppercase text-[9px] sm:text-[10px] tracking-wider text-left" colSpan="3">
                      Scheduled
                    </td>
                    <td colSpan="4" className="border-r-[2px] border-r-slate-400"></td>
                    <td colSpan="4" className="border-r-[2px] border-r-slate-400"></td>
                    <td colSpan="4"></td>
                  </tr>

                  {scheduledRows.map((row, i) => (
                    <tr key={`s-${i}`} className={`border-b border-slate-200 hover:bg-slate-100 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="py-1.5 px-2 sm:px-3 border-r border-slate-300 text-slate-800 text-center font-bold text-[10px] sm:text-[11px]">{row.dos}</td>
                      <td className="py-1.5 px-2 sm:px-3 border-r border-slate-300 text-[#1976D2] font-bold text-center">{row.day}</td>
                      {/* DARK COLUMN LINE ON STATUS */}
                      <td className="py-1.5 px-2 sm:px-3 border-r-[2px] border-r-slate-400 text-center"><StatusBadge status={row.status} /></td>
                      <AitMixGroup conc={row.conc} color={row.color} vol={row.v1} loc={row.l1} />
                      <AitMixGroup conc={row.conc} color={row.color} vol={row.v2} loc={row.l2} />
                      <AitMixGroup conc={row.conc} color={row.color} vol={row.v3} loc={row.l3} isLast={true} />
                    </tr>
                  ))}
                  
                  {/* Summary Row */}
                  <tr className="bg-[#F5F5F5] border-b border-slate-300">
                    <td className="py-2 px-3 border-slate-300 text-slate-900 font-extrabold text-center uppercase tracking-wide text-[9px] sm:text-[10px]" colSpan="15">
                      Total Administered: 8
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- BOTTOM ACTION BAR --- */}
        <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 flex justify-end shrink-0 z-20">
          <button 
            onClick={onClose} 
            className="flex items-center gap-2 px-4 sm:px-5 py-1.5 border-[1.5px] border-slate-300 rounded-full text-slate-700 font-bold text-[12px] sm:text-[13px] hover:bg-slate-100 transition-colors shadow-sm"
          >
            <FaTimes size={12} /> Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default InjectionLog;