import React, { useState } from 'react';
import { Pencil, Trash2, Plus, List, FlaskConical, Beaker, FileText, Hash } from 'lucide-react';
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const IngredientTable = ({ title, items, onEdit, onDelete, onManageSynonyms }) => {
  const [deleteConfig, setDeleteConfig] = useState({ isOpen: false, itemId: null });
  const [showSuccess, setShowSuccess] = useState(false);

  if (!items) return null;

  const handleDeleteClick = (id) => {
    setDeleteConfig({ isOpen: true, itemId: id });
  };

  const handleConfirmDelete = () => {
    if (onDelete && deleteConfig.itemId) {
      onDelete(deleteConfig.itemId);
      setDeleteConfig({ isOpen: false, itemId: null });
      setShowSuccess(true);
    }
  };

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-slate-300 bg-white shadow-md animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Container Header: Solid Cyan with White Text */}
      <div className="flex items-center justify-between bg-[#00C5EB] px-4 py-2 text-white shadow-sm">
        <div className="flex items-center gap-2">
          <List size={16} strokeWidth={3} />
          <h3 className="text-[12px] font-black uppercase tracking-widest">{title}</h3>
        </div>
        <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tighter">
          {items.length} Ingredients
        </span>
      </div>
      
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b border-slate-300 bg-slate-50">
            <th className="w-[10%] border-r border-slate-300 px-4 py-2 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Hash size={12} className="text-blue-500" /> ID
              </div>
            </th>
            <th className="w-[30%] border-r border-slate-300 px-4 py-2 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <Beaker size={12} className="text-blue-500" /> Ingredient
              </div>
            </th>
            <th className="w-[28%] border-r border-slate-300 px-4 py-2 text-left">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <FileText size={12} className="text-blue-500" /> Scientific
              </div>
            </th>
            <th className="w-[17%] border-r border-slate-300 px-4 py-2 text-center">
              <div className="flex justify-center items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                <FlaskConical size={12} className="text-blue-500" /> Synonyms
              </div>
            </th>
            <th className="w-[15%] px-4 py-2 text-center">
              <div className="flex justify-center items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/40 transition-colors group">
              <td className="border-r border-slate-200 px-4 py-1.5 text-[11.5px] font-bold text-slate-500">
                #{item.id}
              </td>
              <td className="border-r border-slate-200 px-4 py-1.5 text-[11.5px] font-black text-slate-800">
                {item.name}
              </td>
              <td className="border-r border-slate-200 px-4 py-1.5 text-[11px] italic font-bold text-slate-400 uppercase tracking-tight">
                {item.scientific || '—'}
              </td>
              <td className="border-r border-slate-200 px-4 py-1.5 text-center">
                {/* ✅ Updated: Clicking Manage now triggers the Synonyms Navigation */}
                <button 
                  onClick={() => onManageSynonyms && onManageSynonyms(item)}
                  className="inline-flex items-center gap-1 rounded-full border-2 border-[#1D68F1] px-3 py-0.5 text-[10px] font-black text-[#1D68F1] hover:bg-[#1D68F1] hover:text-white transition-all active:scale-95 shadow-sm"
                >
                  <Plus size={10} strokeWidth={4} /> Manage
                </button>
              </td>
              <td className="px-4 py-1.5 text-center">
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => onEdit && onEdit(item)}
                    className="p-1 hover:bg-blue-100 rounded-md transition-all group-hover:scale-110"
                  >
                    <Pencil size={15} strokeWidth={3} className="text-blue-500" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(item.id)}
                    className="p-1 hover:bg-red-100 rounded-md transition-all group-hover:scale-110"
                  >
                    <Trash2 size={15} strokeWidth={3} className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popups */}
      <ConfirmPopup 
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig({ isOpen: false, itemId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Ingredient"
        message={`Are you sure you want to remove this ingredient from the "${title}" group?`}
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Ingredient has been deleted successfully."
      />
    </div>
  );
};

export default IngredientTable;