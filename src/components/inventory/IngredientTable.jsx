import React from 'react';
import { Pencil, Trash2, Plus, List, FlaskConical, Beaker, FileText, Tags } from 'lucide-react';

const IngredientTable = ({ title, items }) => {
  if (!items) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
      {/* Container Header: Solid Cyan with White Text */}
      <div className="flex items-center gap-2 bg-[#00C5EB] px-3 py-2 text-white">
        <List size={16} strokeWidth={3} />
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-[#F8F9FA]">
            {/* Using fixed widths to ensure consistent alignment across all 26 containers */}
            <th className="w-[8%] border-r border-slate-200 px-4 py-2 text-left">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                <Tags size={12} /> ID
              </div>
            </th>
            <th className="w-[30%] border-r border-slate-200 px-4 py-2 text-left">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                <Beaker size={12} /> Ingredient
              </div>
            </th>
            <th className="w-[30%] border-r border-slate-200 px-4 py-2 text-left">
              <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600">
                <FileText size={12} /> Scientific Name
              </div>
            </th>
            <th className="w-[17%] border-r border-slate-200 px-4 py-2 text-center">
              <div className="flex justify-center items-center gap-1 text-[11px] font-bold text-slate-600">
                <FlaskConical size={12} /> Synonyms
              </div>
            </th>
            <th className="w-[15%] px-4 py-2 text-center">
              <div className="flex justify-center items-center gap-1 text-[11px] font-bold text-slate-600">
                <Pencil size={12} /> Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors">
              <td className="border-r border-slate-100 px-4 py-2.5 text-xs text-slate-500 text-left">
                {item.id}
              </td>
              <td className="border-r border-slate-100 px-4 py-2.5 text-xs font-bold text-slate-800 text-left">
                {item.name}
              </td>
              <td className="border-r border-slate-100 px-4 py-2.5 text-xs italic text-slate-400 text-left uppercase">
                {item.scientific || ''}
              </td>
              <td className="border-r border-slate-100 px-4 py-2 text-center">
                <button className="inline-flex items-center gap-1 rounded-full border border-[#1D68F1] px-4 py-1 text-[10px] font-medium text-[#1D68F1] hover:bg-blue-50 transition-all">
                  <Plus size={12} strokeWidth={3} /> Manage
                </button>
              </td>
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-4">
                  <Pencil size={16} className="text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
                  <Trash2 size={16} className="text-red-500 cursor-pointer hover:scale-110 transition-transform" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;