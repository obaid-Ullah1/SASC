import React from 'react';
import { Edit2, Trash2, CheckCircle2, ListOrdered, Tag, Hash, Activity, Layers } from 'lucide-react';

const MapAssessmentTable = ({ data }) => {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#f8fafc]">
            {/* Reduced ID Column Width */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[50px] border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Hash size={11} className="text-[#1D68F1]" />
                ID
              </div>
            </th>
            {/* Type Column */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[100px] border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Layers size={11} className="text-[#1D68F1]" />
                Type
              </div>
            </th>
            {/* Label Column */}
            <th className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Tag size={11} className="text-[#1D68F1]" />
                Label
              </div>
            </th>
            {/* Sort Order Column */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[85px] border-b border-r border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <ListOrdered size={11} className="text-[#1D68F1]" />
                Sort
              </div>
            </th>
            {/* Active Column */}
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[70px] border-b border-r border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <Activity size={11} className="text-[#1D68F1]" />
                Act.
              </div>
            </th>
            {/* Actions Column */}
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
              {/* Vertical padding reduced from py-2 to py-1 */}
              <td className="px-2 py-1 text-[11.5px] text-slate-500 border-b border-r border-slate-100 group-hover:border-blue-100">
                {item.id || index + 1}
              </td>
              <td className="px-2 py-1 text-[12px] border-b border-r border-slate-100 group-hover:border-blue-100">
                <span className={`px-1.5 py-0 text-[10px] font-bold uppercase rounded ${
                  item.type === 'Post' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {item.type || "Pre"}
                </span>
              </td>
              <td className="px-3 py-1 text-[12.5px] text-slate-700 font-medium italic border-b border-r border-slate-100 group-hover:border-blue-100 truncate max-w-[200px]">
                {item.label || item.name}
              </td>
              <td className="px-2 py-1 border-b border-r border-slate-100 text-center group-hover:border-blue-100">
                <span className="text-[11px] font-semibold text-slate-500">
                   {item.sortOrder}
                </span>
              </td>
              <td className="px-2 py-1 border-b border-r border-slate-100 text-center group-hover:border-blue-100">
                <div className="flex justify-center">
                  <CheckCircle2 size={14} className="text-emerald-500 opacity-80" />
                </div>
              </td>
              <td className="px-2 py-1 border-b border-slate-100 text-center group-hover:border-blue-100">
                <div className="flex items-center justify-center gap-1.5">
                  <button className="p-1 text-blue-600 hover:text-[#1D68F1] transition-colors">
                    <Edit2 size={12} />
                  </button>
                  <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MapAssessmentTable;