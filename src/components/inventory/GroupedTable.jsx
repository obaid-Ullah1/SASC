// src/components/inventory/GroupedTable.jsx
import React from 'react';
import { List, GitBranch, Tag, Pencil, Trash2, Folder, Bookmark } from 'lucide-react';

const GroupedTable = ({ title, data, isTypeView }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden mb-5 last:mb-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Header with Cyan/Deep Sky Blue Background */}
      <div className="bg-[#00BFFF] px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {isTypeView ? (
            <Folder size={16} className="text-white fill-white/20" />
          ) : (
            <Bookmark size={16} className="text-white fill-white/20" />
          )}
          <h3 className="text-white text-[12px] font-black uppercase tracking-widest">
            {title}
          </h3>
        </div>
        <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
          {data.length} Items
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Darkened Header border to slate-300 */}
            <tr className="bg-slate-50 border-b border-slate-300">
              <th className="px-5 py-2 text-[10px] font-black text-slate-500 uppercase w-28 border-r border-slate-300">
                <div className="flex items-center gap-2"><GitBranch size={12} /> ID</div>
              </th>
              <th className="px-5 py-2 text-[10px] font-black text-slate-500 uppercase border-r border-slate-300">
                <div className="flex items-center gap-2">
                  <Tag size={12} /> {isTypeView ? 'Type Name' : 'Sub Category Name'}
                </div>
              </th>
              
              {isTypeView && (
                <th className="px-5 py-2 text-[10px] font-black text-slate-500 uppercase border-r border-slate-300 w-40">
                  Site Label
                </th>
              )}
              
              <th className="px-5 py-2 text-[10px] font-black text-slate-500 uppercase text-center w-32">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-slate-200">
            {data.map((item) => (
              /* Added border-b to ensure row lines are crisp */
              <tr key={item.id} className="border-b border-slate-200 hover:bg-blue-50/40 transition-colors group">
                <td className="px-5 py-1.5 text-[11.5px] text-slate-500 font-bold border-r border-slate-200">
                  #{item.id}
                </td>
                <td className="px-5 py-1.5 text-[11.5px] text-slate-700 font-bold border-r border-slate-200">
                  {item.name}
                </td>
                
                {isTypeView && (
                  <td className="px-5 py-1.5 text-[11px] text-blue-600 border-r border-slate-200 font-black italic tracking-wider">
                    {item.label || '-'}
                  </td>
                )}
                
                <td className="px-5 py-1.5">
                  <div className="flex justify-center gap-4 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-blue-100 rounded-md transition-colors">
                      <Pencil size={14} className="text-blue-500" strokeWidth={2.5} />
                    </button>
                    <button className="p-1 hover:bg-red-100 rounded-md transition-colors">
                      <Trash2 size={14} className="text-red-500" strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupedTable;