import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, User, Package, Save, RotateCcw, Info, ClipboardCheck, Hash 
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

  // --- Professional SaaS Label Styling ---
  const labelClasses = "flex items-center gap-1.5 text-[13px] font-medium text-slate-700 mb-1.5 ml-0.5";
  const iconClasses = "text-slate-400";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200 antialiased">
      
      {/* Main Container: Clean, subtle shadow, soft rounded corners */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans flex flex-col max-h-[95vh]">
        
        {/* HEADER: Light Sky Blue Gradient */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-sky-100 to-white border-b border-sky-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white text-[#00A3FF] rounded-lg shadow-sm border border-sky-100">
              <ClipboardCheck size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-slate-800 leading-tight">
                Quality Assurance Check
              </h3>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Update inventory verification details
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* FORM BODY: Scrollable if needed */}
        <div className="p-6 bg-slate-50/50 overflow-y-auto flex-1">
          
          {/* Item Summary Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-sm mb-6 gap-4">
            <div className="flex items-center gap-3.5">
               <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
                  <Package size={20} />
               </div>
               <div className="flex flex-col">
                  <h4 className="text-[14px] font-semibold text-slate-800">{rowData?.name || 'Inventory Item Name'}</h4>
                  <div className="flex items-center gap-3 text-[12px] text-slate-500 mt-1">
                    <span className="flex items-center gap-1"><Hash size={12} /> Lot: {rowData?.lotNo || 'N/A'}</span>
                  </div>
               </div>
            </div>
            {/* Crisp Light Green ID Box */}
            <div className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-md text-[12px] font-bold flex items-center gap-1.5 w-fit shrink-0 shadow-sm">
              ID: {rowData?.id || '---'}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className={labelClasses}><Calendar size={16} className={iconClasses} /> Checked On</label>
              <DateBox value={formData.checkedOn} type="date" height={38} className="dx-custom-input" />
            </div>
            
            <div>
              <label className={labelClasses}><User size={16} className={iconClasses} /> Checked By</label>
              <TextBox value={formData.checkedBy} placeholder="Technician Name" height={38} className="dx-custom-input" />
            </div>
            
            <div>
              <label className={labelClasses}><RotateCcw size={16} className={iconClasses} /> Days Until Next</label>
              <TextBox placeholder="e.g. 30" height={38} className="dx-custom-input" />
            </div>
            
            <div>
              <label className={labelClasses}><Calendar size={16} className={iconClasses} /> Next Check On</label>
              <DateBox placeholder="mm/dd/yyyy" height={38} className="dx-custom-input" />
            </div>
            
            <div className="sm:col-span-2">
              <label className={labelClasses}><Package size={16} className={iconClasses} /> Current Stock Level</label>
              <TextBox value={formData.currentStock} placeholder="Confirm current stock count" height={38} className="dx-custom-input" />
            </div>
            
            <div className="sm:col-span-2">
              <label className={labelClasses}><Info size={16} className={iconClasses} /> Remarks / Inspection Notes</label>
              <TextArea 
                placeholder="Enter stock verification notes, conditions, or discrepancies..." 
                height={80} 
                className="dx-custom-input"
              />
            </div>
          </div>

          {/* Footer Info / Previous Records */}
          <div className="mt-8 pt-5 border-t border-slate-200">
            <h5 className="text-[13px] font-semibold text-slate-700 mb-1">Previous Check Records</h5>
            <p className="text-[13px] text-slate-500">No previous check history found for this item.</p>
          </div>
        </div>

        {/* ACTION FOOTER */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg text-[13px] hover:bg-slate-50 hover:text-slate-900 transition-colors focus:ring-2 focus:ring-slate-200 outline-none"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="px-6 py-2.5 bg-[#00A3FF] hover:bg-[#008fdf] text-white font-medium rounded-lg text-[13px] shadow-sm transition-all focus:ring-4 focus:ring-[#00A3FF]/20 outline-none flex items-center gap-2"
          >
            <Save size={16} /> Save Details
          </button>
        </div>
      </div>

      {/* --- REFINED DEVEXTREME CSS OVERRIDES --- */}
      <style jsx global>{`
        .dx-custom-input {
          border-radius: 8px !important; 
          border: 1px solid #cbd5e1 !important; 
          background-color: #ffffff !important;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
          transition: all 0.15s ease-in-out !important;
        }
        .dx-custom-input.dx-state-hover {
          border-color: #94a3b8 !important;
        }
        .dx-custom-input.dx-state-focused {
          border-color: #00A3FF !important;
          box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.15) !important;
        }
        .dx-texteditor-input {
          padding-left: 12px !important;
          font-weight: 400 !important;
          color: #334155 !important; 
          font-size: 13px !important;
        }
        .dx-placeholder {
          font-size: 13px !important;
          padding-left: 12px !important;
          color: #94a3b8 !important; 
        }
        .dx-dropdowneditor-icon {
          border-radius: 0 8px 8px 0 !important;
        }
      `}</style>
    </div>
  );
};

export default CheckedInForm;