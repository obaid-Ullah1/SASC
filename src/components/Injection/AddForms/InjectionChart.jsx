import React from 'react';
import { X, Activity, Droplet, Pill, IdCard, CalendarDays, Phone, User as UserIcon, Hash } from 'lucide-react';

const InjectionChart = ({ isOpen, onClose, patient }) => {
  if (!isOpen || !patient) return null;

  // Mock data based on your screenshot
  const antigens = [
    "Acacia", "Alder, Red", "Ash, White", "Beech, American", "Gs Birch Mix",
    "Box Elder", "Cedar, Mountain", "Cottonwood", "Cypress Arizona",
    "Elm, American", "Maple, Red", "Mesquite", "Mulberry, Red",
    "Gs Eastern Oak Mix", "Olive", "Pine, Ponderosa", "Privet, Common",
    "Sycamore, Eastern"
  ].map((name, i) => ({
    id: i + 1,
    name: name,
    volume: "10.00 mL",
    lotNumber: "N/A",
    expiration: "Not Provided"
  }));

  // Fallbacks for missing patient data to match the screenshot layout
  const displayPatientNo = patient?.patientNo || "108";
  const displayName = patient?.fullName || "Test , Leope";
  const displayDOB = patient?.dob || "2001-01-01";
  const displayPhone = patient?.phone || "747-287-6202 (C)";

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-300">
        
        {/* --- HEADER --- */}
        <div className="bg-[#1877F2] text-white px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between shrink-0 shadow-sm relative z-20">
          <div className="flex items-center gap-2.5 font-bold text-[15px] sm:text-[18px] tracking-wide">
            <Activity size={20} strokeWidth={2.5} /> 
            Injection Chart — STD MIX 1-11/25-01
          </div>
          <button 
            onClick={onClose} 
            className="text-white hover:bg-white/20 transition-colors p-1.5 rounded-lg active:scale-95"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* --- SCROLLABLE BODY --- */}
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-3 sm:p-5">
          
          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
            
            {/* Patient Info Card - Professional Blue Theme */}
            <div className="bg-gradient-to-br from-blue-50/80 to-white border border-blue-100 rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden group">
              {/* Decorative Blur Glow */}
              <div className="absolute -right-6 -top-6 bg-blue-200/40 w-32 h-32 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-300/40 transition-colors duration-500"></div>
              
              <div className="flex items-center gap-2 font-bold text-blue-900 text-[14px] sm:text-[15px] mb-4 sm:mb-5 pb-3 border-b border-blue-100/60 relative z-10">
                <IdCard size={18} className="text-blue-500" /> Patient Information
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 relative z-10">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-blue-600/80 mb-0.5 uppercase tracking-wider">
                    <Hash size={12} /> Patient No
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">{displayPatientNo}</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-blue-600/80 mb-0.5 uppercase tracking-wider">
                    <UserIcon size={12} /> Name
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">{displayName}</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-blue-600/80 mb-0.5 uppercase tracking-wider">
                    <CalendarDays size={12} /> DOB
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">{displayDOB}</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-blue-600/80 mb-0.5 uppercase tracking-wider">
                    <UserIcon size={12} /> Gender
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">-</span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-blue-600/80 mb-0.5 uppercase tracking-wider">
                    <Phone size={12} /> Phone
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">{displayPhone}</span>
                </div>
              </div>
            </div>

            {/* Injection Info Card - Professional Rose Theme */}
            <div className="bg-gradient-to-br from-rose-50/80 to-white border border-rose-100 rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden group">
              {/* Decorative Blur Glow */}
              <div className="absolute -right-6 -top-6 bg-rose-200/40 w-32 h-32 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-300/40 transition-colors duration-500"></div>
              
              <div className="flex items-center gap-2 font-bold text-rose-900 text-[14px] sm:text-[15px] mb-4 sm:mb-5 pb-3 border-b border-rose-100/60 relative z-10">
                <Droplet size={18} className="text-rose-500 fill-rose-100" /> Injection Information
              </div>
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 relative z-10">
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-rose-600/80 mb-0.5 uppercase tracking-wider">
                    <Pill size={12} className="-rotate-45" /> Injection Name
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">STD MIX 1</span>
                </div>
                <div className="flex flex-col">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-rose-600/80 mb-0.5 uppercase tracking-wider">
                    <CalendarDays size={12} /> Prepared Date
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px] truncate" title="2026-01-19T15:49:05.1982626">
                    2026-01-19T15:49:05.1982626
                  </span>
                </div>
                <div className="flex flex-col col-span-2">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-rose-600/80 mb-0.5 uppercase tracking-wider">
                    <UserIcon size={12} /> Prepared By
                  </span>
                  <span className="font-bold text-slate-800 text-[13px] sm:text-[14px]">-</span>
                </div>
              </div>
            </div>

          </div>

          {/* ANTIGEN COMPOSITION TABLE (Thin Rows & Darker Borders) */}
          <div className="bg-white border border-slate-300 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b border-slate-300 font-black text-slate-800 text-[15px] bg-white">
              Antigen Composition
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-700 text-[12px] font-bold border-b-2 border-slate-300 bg-slate-100">
                      <th className="py-2 px-3 text-center w-12 border-r border-slate-300">#</th>
                      <th className="py-2 px-4 border-r border-slate-300">Antigen Name</th>
                      <th className="py-2 px-4 border-r border-slate-300 text-center w-36">Volume</th>
                      <th className="py-2 px-4 border-r border-slate-300 text-center w-40">Lot Number</th>
                      <th className="py-2 px-4 text-center w-40">Expiration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {antigens.map((antigen) => (
                      <tr key={antigen.id} className="border-b border-slate-300 hover:bg-slate-50 transition-colors">
                        
                        {/* ID */}
                        <td className="py-1.5 px-3 text-center font-bold text-slate-600 border-r border-slate-300 text-[13px]">
                          {antigen.id}
                        </td>
                        
                        {/* Antigen Name Badge */}
                        <td className="py-1.5 px-4 border-r border-slate-300">
                          <div className="inline-flex items-center gap-1.5 bg-[#E0F7FA] text-[#00838F] px-3 py-0.5 rounded-full text-[12px] font-bold shadow-sm border border-[#b2ebf2]/80">
                            <Pill size={12} className="-rotate-45" /> {antigen.name}
                          </div>
                        </td>
                        
                        {/* Volume Badge */}
                        <td className="py-1.5 px-4 border-r border-slate-300 text-center">
                          <div className="inline-flex items-center justify-center bg-[#E1EFFF] text-[#1877F2] px-3 py-0.5 rounded-full text-[12px] font-bold w-[85px] shadow-sm border border-blue-200">
                            {antigen.volume}
                          </div>
                        </td>
                        
                        {/* Lot Number */}
                        <td className="py-1.5 px-4 border-r border-slate-300 text-center text-slate-500 italic text-[13px] font-medium">
                          {antigen.lotNumber}
                        </td>
                        
                        {/* Expiration */}
                        <td className="py-1.5 px-4 text-center text-slate-500 italic text-[13px] font-medium">
                          {antigen.expiration}
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        {/* --- FOOTER --- */}
        <div className="bg-[#F8FAFC] border-t border-slate-200 px-5 py-3 sm:py-4 flex justify-end shrink-0">
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-2.5 rounded-lg text-[14px] font-bold shadow-sm transition-all active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default InjectionChart;