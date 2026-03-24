import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, User, Package, Save, RotateCcw, Info, ClipboardCheck 
} from 'lucide-react';
import { DateBox, TextBox, TextArea } from 'devextreme-react';

const CheckedInForm = ({ isOpen, onClose, onSave, rowData }) => {
  const [formData, setFormData] = useState({
    checkedOn: new Date(),
    checkedBy: '',
    daysUntilNext: '',
    nextCheckOn: null,
    currentStock: '',
    remarks: ''
  });

  // Sync with row data when opened
  useEffect(() => {
    if (isOpen && rowData) {
      setFormData(prev => ({
        ...prev,
        checkedOn: rowData.checkedOn || new Date(),
        currentStock: rowData.stock || '',
        checkedBy: rowData.lastUpdatedBy || ''
      }));
    }
  }, [isOpen, rowData]);

  if (!isOpen) return null;

  // --- Theme Classes based on your "Popping Blue" style ---
  const labelClasses = "flex items-center gap-2 text-[11px] font-extrabold text-[#00A3FF] uppercase tracking-widest mb-2 block ml-1";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Main Container: Popping Border and Shadow */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,163,255,0.15)] border-2 border-[#00A3FF]/20 overflow-hidden animate-in zoom-in-95 duration-300 font-sans">
        
        {/* HEADER: Popping Blue Style */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#00A3FF] rounded-xl shadow-lg shadow-[#00A3FF]/30">
              <ClipboardCheck size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-[16px] font-black text-slate-800 tracking-tight">
                Update Check Details
              </h3>
              <p className="text-[11px] text-[#00A3FF] font-bold uppercase tracking-[0.2em]">
                Quality Assurance
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 bg-[#ef4444] text-white rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-90"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* FORM BODY */}
        <div className="p-8 bg-gradient-to-b from-white to-slate-50/50 space-y-6">
          
          {/* Item Badge Section */}
          <div className="flex items-center justify-between bg-white border-2 border-slate-100 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#00A3FF]">
                  <Package size={20} />
               </div>
               <div>
                  <h4 className="text-[14px] font-black text-slate-800 leading-none">{rowData?.name || 'Inventory Item'}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Lot: {rowData?.lotNo || 'N/A'}</span>
               </div>
            </div>
            <div className="bg-[#00A3FF] text-white px-3 py-1 rounded-full text-[10px] font-black tracking-tighter">
              ID: {rowData?.id}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div className="group">
              <label className={labelClasses}><Calendar size={14}/> Checked On</label>
              <DateBox value={formData.checkedOn} type="date" height={42} className="check-input" />
            </div>
            <div className="group">
              <label className={labelClasses}><User size={14}/> Checked By</label>
              <TextBox value={formData.checkedBy} placeholder="Technician Name" height={42} className="check-input" />
            </div>
            <div className="group">
              <label className={labelClasses}><RotateCcw size={14}/> Days Until Next</label>
              <TextBox placeholder="e.g. 30" height={42} className="check-input" />
            </div>
            <div className="group">
              <label className={labelClasses}><Calendar size={14}/> Next Check On</label>
              <DateBox placeholder="mm/dd/yyyy" height={42} className="check-input" />
            </div>
            <div className="group col-span-2">
              <label className={labelClasses}><Package size={14}/> Current Stock Level</label>
              <TextBox value={formData.currentStock} placeholder="Confirm current stock..." height={42} className="check-input" />
            </div>
            <div className="group col-span-2">
              <label className={labelClasses}><Info size={14} /> Remarks / Inspection Notes</label>
              <TextArea 
                placeholder="Enter stock verification or adverse reaction notes..." 
                height={90} 
                className="check-input"
              />
            </div>
          </div>

          {/* Footer Info / Previous Records */}
          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-slate-400">
               <RotateCcw size={12} />
               <span className="text-[11px] font-bold uppercase tracking-widest">Previous Check Records</span>
            </div>
            <p className="text-[12px] text-slate-300 italic font-medium ml-5">No previous check history found for this item.</p>
          </div>
        </div>

        {/* ACTION FOOTER */}
        <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#00A3FF]/60 text-[10px] font-bold uppercase tracking-tight">
            <Info size={14} /> Verify all fields before saving
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2 border-2 border-slate-200 text-slate-500 font-bold rounded-xl text-[12px] hover:bg-white hover:text-slate-700 transition-all uppercase tracking-widest"
            >
              Cancel
            </button>
            <button 
              onClick={() => onSave(formData)}
              className="px-8 py-2 bg-[#00A3FF] hover:bg-[#008bdb] text-white font-black rounded-xl text-[12px] shadow-lg shadow-[#00A3FF]/30 transition-all active:scale-95 flex items-center gap-2 uppercase tracking-widest"
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .check-input {
          border-radius: 0.75rem !important; 
          border: 2px solid #e2e8f0 !important; 
          background-color: #ffffff !important;
          transition: all 0.2s ease-in-out !important;
        }
        .check-input.dx-state-focused {
          border-color: #00A3FF !important;
          box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1) !important;
        }
        .dx-texteditor-input {
          padding-left: 16px !important;
          font-weight: 700 !important;
          color: #334155 !important; 
          font-size: 14px !important;
        }
        .dx-placeholder {
          font-size: 13px !important;
          padding-left: 16px !important;
          color: #94a3b8 !important; 
          font-style: italic !important;
        }
      `}</style>
    </div>
  );
};

export default CheckedInForm;