import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle2, Hash, Tag, ListOrdered, Activity, ClipboardCheck } from 'lucide-react';
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const AssessmentTable = ({ data, onEdit, onDelete }) => {
  // --- Local States for Popups ---
  const [deleteConfig, setDeleteConfig] = useState({ isOpen: false, itemId: null });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteConfig({ isOpen: true, itemId: id });
  };

  const handleConfirmDelete = () => {
    if (onDelete && deleteConfig.itemId) {
      onDelete(deleteConfig.itemId); // Call parent delete function
      setDeleteConfig({ isOpen: false, itemId: null });
      setShowSuccess(true); // Trigger success feedback
    }
  };

  return (
    <div className="w-full bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden">
      <table className="w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-[#f8fafc]">
            <th className="px-2 py-2 text-[10px] font-black text-slate-500 uppercase tracking-wider w-[60px] border-b border-r border-slate-300">
              <div className="flex items-center gap-1">
                <Hash size={11} className="text-[#1D68F1]" /> ID
              </div>
            </th>
            <th className="px-3 py-2 text-[10px] font-black text-slate-500 uppercase tracking-wider border-b border-r border-slate-300">
              <div className="flex items-center gap-1">
                <Tag size={11} className="text-[#1D68F1]" /> Label Name
              </div>
            </th>
            <th className="px-2 py-2 text-[10px] font-black text-slate-500 uppercase tracking-wider w-[85px] border-b border-r border-slate-300 text-center">
              <div className="flex items-center justify-center gap-1">
                <ListOrdered size={11} className="text-[#1D68F1]" /> Sort
              </div>
            </th>
            <th className="px-2 py-2 text-[10px] font-black text-slate-500 uppercase tracking-wider w-[70px] border-b border-r border-slate-300 text-center">
              <div className="flex items-center justify-center gap-1">
                <Activity size={11} className="text-[#1D68F1]" /> Active
              </div>
            </th>
            <th className="px-2 py-2 text-[10px] font-black text-slate-500 uppercase tracking-wider w-[100px] border-b border-slate-300 text-center">
              <div className="flex items-center justify-center gap-1">
                <Edit2 size={11} className="text-[#1D68F1]" /> Actions
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-2 py-1.5 text-[11.5px] text-slate-500 font-bold border-b border-r border-slate-200">
                #{item.id}
              </td>
              <td className="px-3 py-1.5 text-[12px] text-slate-700 font-bold italic border-b border-r border-slate-200">
                {item.name}
              </td>
              <td className="px-2 py-1.5 border-b border-r border-slate-200 text-center">
                <span className="text-[11px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                   {item.sortOrder}
                </span>
              </td>
              <td className="px-2 py-1.5 border-b border-r border-slate-200 text-center">
                <div className="flex justify-center">
                  {item.active ? (
                    <CheckCircle2 size={16} className="text-emerald-500" strokeWidth={3} />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300 bg-slate-50" />
                  )}
                </div>
              </td>
              <td className="px-2 py-1.5 border-b border-slate-200 text-center">
                <div className="flex items-center justify-center gap-3">
                  {/* Edit Button: Calls parent onEdit */}
                  <button 
                    onClick={() => onEdit && onEdit(item)}
                    className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <Edit2 size={12} strokeWidth={3} />
                  </button>
                  {/* Delete Button: Triggers local confirm */}
                  <button 
                    onClick={() => handleDeleteClick(item.id)}
                    className="p-1.5 bg-red-50 text-red-500 rounded-md hover:bg-red-500 hover:text-white transition-all shadow-sm"
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
        <div className="py-12 text-center bg-slate-50/50">
          <ClipboardCheck className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">No Assessment Labels Found</p>
        </div>
      )}

      {/* --- Popups Integration --- */}
      
      <ConfirmPopup 
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig({ isOpen: false, itemId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Label?"
        message="Are you sure you want to remove this assessment label? This action cannot be undone."
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Record Deleted"
        message="The assessment label has been successfully removed from the database."
      />
    </div>
  );
};

export default AssessmentTable;