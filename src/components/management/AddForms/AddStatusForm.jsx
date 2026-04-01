import React, { useState, useEffect } from 'react';
import { X, Tag, PlusCircle, Pencil, Save } from 'lucide-react';

const AddStatusForm = ({ onCancel, onSave, initialData }) => {
  const [statusName, setStatusName] = useState("");

  // ✅ Check if we are in Edit Mode
  const isEditing = !!initialData;

  // ✅ Fetch details of the clicked row when the component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      // Assuming your row data has a field called 'name' or 'statusName'
      // Adjust 'initialData.name' to match your actual data field
      setStatusName(initialData.name || initialData.status || "");
    } else {
      setStatusName("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statusName.trim()) return;
    
    // Pass the data back. If editing, we usually include the ID
    const dataToSave = isEditing 
      ? { ...initialData, name: statusName } 
      : statusName;

    onSave(dataToSave);
    
    if (!isEditing) setStatusName("");
  };

  // Standardized Blueprint Classes
  const inputClasses = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all bg-white placeholder:text-slate-400 placeholder:font-semibold";
  const labelClasses = "text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1";

  return (
    <div className="w-full mb-5 font-sans">
      <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg animate-in slide-in-from-top-3 duration-300 overflow-hidden">
        
        {/* ===== Header (Dynamic Title) ===== */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-4 sm:px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              {isEditing ? (
                <Pencil size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
              ) : (
                <Tag size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
              )}
            </div>
            <div>
              <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
                {isEditing ? "Update Status Details" : "Add New Status"}
              </h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm shrink-0"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* ===== Form Body (Responsive Layout) ===== */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 bg-white/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-10">
            
            {/* Input Field */}
            <div className="w-full md:flex-1 md:max-w-md">
              <label className={labelClasses}>
                Status Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={statusName}
                onChange={(e) => setStatusName(e.target.value)}
                placeholder="e.g., Pending, Approved, In Progress..."
                className={inputClasses}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="h-[42px] px-6 border-2 border-slate-200 text-slate-500 font-bold rounded-lg hover:bg-slate-50 transition-all text-[12px] uppercase tracking-wide flex items-center justify-center"
              >
                Cancel
              </button>

              <button
                type="submit"
                className={`${
                  isEditing ? 'bg-[#16A34A] hover:bg-[#15803D]' : 'bg-[#00A3FF] hover:bg-[#008CE6]'
                } text-white px-8 h-[42px] rounded-lg text-[13px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap`}
              >
                {isEditing ? (
                  <><Save size={16} strokeWidth={2.5} /> Update Status</>
                ) : (
                  <><PlusCircle size={16} strokeWidth={2.5} /> Save Status</>
                )}
              </button>
            </div>

          </div>
          
          <p className="text-[10px] text-slate-400 mt-3 md:mt-2 ml-1 italic font-medium">
            {isEditing 
              ? "Modifying this status will update all associated records in the workflow."
              : "Note: This status will become available across the operational workflow."
            }
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddStatusForm;