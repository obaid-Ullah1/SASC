import React from 'react';
import { List, GitBranch, Tag, Pencil, Trash2, Folder } from 'lucide-react';

const GroupedTable = ({ title, data, isTypeView }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-md overflow-hidden mb-6 last:mb-0">
      {/* Header with Cyan Background */}
      <div className="bg-[#00BFFF] px-4 py-1.5 flex items-center gap-2">
        {isTypeView ? <Folder size={16} className="text-white" /> : <List size={16} className="text-white" strokeWidth={3} />}
        <h3 className="text-white text-[13px] font-bold uppercase tracking-tight">{title}</h3>
      </div>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="px-6 py-2 text-[10px] font-bold text-slate-500 uppercase w-32 border-r border-slate-200">
              <div className="flex items-center gap-2"><GitBranch size={12} className="text-slate-400" /> ID</div>
            </th>
            <th className="px-6 py-2 text-[10px] font-bold text-slate-500 uppercase border-r border-slate-200">
              <div className="flex items-center gap-2"><Tag size={12} className="text-slate-400" /> {isTypeView ? 'Type' : 'Sub Category'}</div>
            </th>
            {isTypeView && (
              <th className="px-6 py-2 text-[10px] font-bold text-slate-500 uppercase border-r border-slate-200">Site Label</th>
            )}
            <th className="px-6 py-2 text-[10px] font-bold text-slate-500 uppercase text-center w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <td className="px-6 py-2.5 text-xs text-slate-600 font-bold border-r border-slate-100">{item.id}</td>
              <td className="px-6 py-2.5 text-xs text-slate-800 font-semibold border-r border-slate-100">{item.name}</td>
              {isTypeView && (
                <td className="px-6 py-2.5 text-xs text-slate-600 border-r border-slate-100 italic">{item.label || '-'}</td>
              )}
              <td className="px-6 py-2.5 border-r border-slate-100">
                <div className="flex justify-center gap-5">
                  <Pencil size={15} strokeWidth={3} className="text-blue-500 cursor-pointer" />
                  <Trash2 size={15} strokeWidth={3} className="text-red-500 cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupedTable;