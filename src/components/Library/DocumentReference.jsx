import React from 'react';
import { Users, Sparkles, Box } from 'lucide-react';

const DocumentReference = ({ refData }) => {
  const parts = refData.split(' '); 
  
  const getCategoryStyles = (code) => {
    switch (code) {
      case 'INV': return { color: 'text-red-600', icon: <Box size={12} strokeWidth={3} /> };
      case 'COMP': return { color: 'text-blue-600', icon: <Users size={12} strokeWidth={3} /> };
      case 'APPT': return { color: 'text-[#e000e0]', icon: <Sparkles size={12} strokeWidth={3} /> };
      case 'CONT': return { color: 'text-amber-500', icon: <Box size={12} strokeWidth={3} /> };
      case 'ASMT': return { color: 'text-emerald-500', icon: <Users size={12} strokeWidth={3} /> };
      case 'GEN': return { color: 'text-slate-500', icon: <Box size={12} strokeWidth={3} /> };
      default: return { color: 'text-slate-600', icon: null };
    }
  };

  const style = getCategoryStyles(parts[1] || '');

  return (
    <div className="flex items-center gap-1.5 font-medium text-[12px]">
      <span className="text-slate-400 font-semibold">
        {parts[0]}
      </span>
      <div className={`flex items-center gap-1 ${style.color} font-bold tracking-wide`}>
        {style.icon}
        <span>{parts[1]}</span>
      </div>
      <span className="text-slate-400 font-semibold">
        {parts[2]}
      </span>
      <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-slate-500 border border-slate-200 font-bold ml-0.5 shadow-sm">
        {parts[3]}
      </span>
    </div>
  );
};

export default DocumentReference;