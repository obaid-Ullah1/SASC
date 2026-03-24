import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle2, ListOrdered, Tag, Hash, Activity, Layers, ClipboardCheck } from 'lucide-react';
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const MapAssessmentTable = ({ data, onEdit, onDelete }) => {
  const [deleteConfig, setDeleteConfig] = useState({ isOpen: false, itemId: null });
  const [showSuccess, setShowSuccess] = useState(false);

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
    <div className="w-full bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#f8fafc]">
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[50px] border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Hash size={11} className="text-[#1D68F1]" /> ID
              </div>
            </th>
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[100px] border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Layers size={11} className="text-[#1D68F1]" /> Type
              </div>
            </th>
            <th className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-r border-slate-200">
              <div className="flex items-center gap-1">
                <Tag size={11} className="text-[#1D68F1]" /> Label
              </div>
            </th>
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[85px] border-b border-r border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <ListOrdered size={11} className="text-[#1D68F1]" /> Sort
              </div>
            </th>
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[70px] border-b border-r border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <Activity size={11} className="text-[#1D68F1]" /> Act.
              </div>
            </th>
            <th className="px-2 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-[90px] border-b border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1">
                <Edit2 size={11} className="text-[#1D68F1]" /> Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={item.id || index} className="hover:bg-blue-50/40 transition-colors group">
              <td className="px-2 py-1 text-[11.5px] text-slate-500 border-b border-r border-slate-100 group-hover:border-blue-100">
                {item.id || index + 1}
              </td>
              <td className="px-2 py-1 text-[12px] border-b border-r border-slate-100 group-hover:border-blue-100">
                <span className={`px-1.5 py-0 text-[10px] font-bold uppercase rounded ${
                  item.type?.toLowerCase() === 'post' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {item.type || "Pre"}
                </span>
              </td>
              <td className="px-3 py-1 text-[12.5px] text-slate-700 font-medium italic border-b border-r border-slate-100 group-hover:border-blue-100 truncate max-w-[200px]">
                {item.name || item.label}
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
                <div className="flex items-center justify-center gap-1.5">
                  <button 
                    onClick={() => onEdit && onEdit(item)}
                    className="p-1 text-blue-600 hover:text-[#1D68F1] transition-transform hover:scale-110"
                  >
                    <Edit2 size={12} strokeWidth={3} />
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(item.id)}
                    className="p-1 text-red-400 hover:text-red-600 transition-transform hover:scale-110"
                  >
                    <Trash2 size={12} strokeWidth={3} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <div className="py-8 text-center bg-slate-50/50">
          <ClipboardCheck className="mx-auto text-slate-300 mb-1" size={24} />
          <p className="text-slate-400 text-[10px] italic font-medium uppercase tracking-widest">No mapping found.</p>
        </div>
      )}

      {/* Logic Popups */}
      <ConfirmPopup 
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig({ isOpen: false, itemId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Mapping?"
        message="Are you sure you want to remove this assessment mapping?"
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Record has been deleted successfully."
      />
    </div>
  );
};

export default MapAssessmentTable;