import React from 'react';
import { Edit2, Trash2, CheckCircle2, ListOrdered, Tag, Hash, Activity, ClipboardCheck } from 'lucide-react';

const AssessmentTable = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#f8fafc]">
            {/* ID Column - Compacted to 50px */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[50px] border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Hash size={11} className="text-[#1D68F1]" />
                ID
              </div>
            </th>
            {/* Label Column */}
            <th className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Tag size={11} className="text-[#1D68F1]" />
                Label
              </div>
            </th>
            {/* Sort Order Column - Reduced width */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[85px] border-b border-r border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <ListOrdered size={11} className="text-[#1D68F1]" />
                Sort
              </div>
            </th>
            {/* Active Column - Reduced width */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[70px] border-b border-r border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <Activity size={11} className="text-[#1D68F1]" />
                Act.
              </div>
            </th>
            {/* Actions Column - Optimized for thin rows */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[90px] border-b border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <Edit2 size={11} className="text-[#1D68F1]" />
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-blue-50/40 transition-colors group">
              {/* Vertical padding reduced to py-1 */}
              <td className="px-2 py-1 text-[11.5px] text-slate-500 border-b border-r border-slate-100 group-hover:border-blue-100">
                {item.id || "—"}
              </td>
              <td className="px-3 py-1 text-[12.5px] text-slate-700 font-medium italic border-b border-r border-slate-100 group-hover:border-blue-100">
                {item.name}
              </td>
              <td className="px-2 py-1 border-b border-r border-slate-100 text-center group-hover:border-blue-100">
                <span className="text-[11px] font-semibold text-slate-500">
                   {item.sortOrder}
                </span>
              </td>
              <td className="px-2 py-1 border-b border-r border-slate-100 text-center group-hover:border-blue-100">
                <div className="flex justify-center">
                  {item.active ? (
                    <CheckCircle2 size={14} className="text-emerald-500 opacity-80" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-50" />
                  )}
                </div>
              </td>
              <td className="px-2 py-1 border-b border-slate-100 text-center group-hover:border-blue-100">
                <div className="flex items-center justify-center gap-2">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Edit2 size={12} />
                  </button>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="py-6 text-center bg-slate-50">
          <ClipboardCheck className="mx-auto text-slate-300 mb-1" size={24} />
          <p className="text-slate-400 text-[10px] italic font-medium">No records found.</p>
        </div>
      )}
    </div>
  );
};

export default AssessmentTable;