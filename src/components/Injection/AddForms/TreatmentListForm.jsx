import React, { useState } from 'react';
import { User, X, Syringe, Plus, Save, XCircle } from 'lucide-react';

const TreatmentListForm = ({ isOpen, onClose, onSave }) => {
  // Form State
  const [patient, setPatient] = useState('');
  const [logDate, setLogDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [frequency, setFrequency] = useState('');
  const [maxUnit, setMaxUnit] = useState('');
  const [day, setDay] = useState('');

  // Rows State - Added 'process' to track selection per row
  const [rows, setRows] = useState([{ id: Date.now(), process: 'Select' }]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), process: 'Select' }]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length > 1) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  // Handle changing the process (Auto/Manual) for a specific row
  const handleProcessChange = (id, newProcess) => {
    setRows(rows.map(row => (row.id === id ? { ...row, process: newProcess } : row)));
  };

  const handleSaveClick = () => {
    // Package data to send to the parent grid
    const newRecord = {
      id: Math.floor(Math.random() * 9000) + 1000,
      office: "Fresno South", // Default or dynamically assigned
      patientNo: Math.floor(Math.random() * 900) + 100,
      fullName: patient || "New, Patient",
      patientCode: "NEW",
      startDate: startDate || new Date().toLocaleDateString(),
      authUnit: maxUnit || 20,
      paidUnit: 0,
      balUnit: maxUnit || 20,
      frequency: frequency || "Weekly",
      day: day || "Monday"
    };

    onSave(newRecord);
  };

  if (!isOpen) return null;

  // Theme Classes
  const labelClass = "block text-xs font-semibold text-slate-700 mb-1.5 ml-0.5";
  const inputClass = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 outline-none transition-all bg-white shadow-sm";
  const selectClass = `${inputClass} appearance-none cursor-pointer bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_16px]`;
  
  // Custom Adornment Input Component
  const AdornmentInput = ({ placeholder }) => (
    <div className="flex shadow-sm rounded-lg">
      <input 
        type="number" 
        placeholder={placeholder} 
        defaultValue="0.0"
        className="w-full border border-slate-300 border-r-0 rounded-l-lg px-3 py-2 text-sm font-medium text-slate-800 focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 outline-none transition-all z-10" 
      />
      <span className="bg-[#00A3FF] text-white text-xs font-bold px-3 py-2 rounded-r-lg border border-[#00A3FF] flex items-center justify-center shrink-0">
        ml
      </span>
    </div>
  );

  return (
    <div className="w-full shrink-0 animate-in slide-in-from-top-4 duration-300">
      
      <div className="w-full bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
        
        {/* HEADER: Updated to Lite Sky Blue Theme */}
        <div className="bg-[#f0f9ff] px-6 py-4 border-b border-sky-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 text-[#00A3FF]">
             <User size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
             <h2 className="text-[15px] font-bold tracking-wide">Treatment</h2>
          </div>
          <button 
            onClick={onClose} 
            className="bg-rose-500 hover:bg-rose-600 text-white rounded p-1 transition-all active:scale-95 shadow-sm"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-5 md:p-6 flex flex-col gap-6 bg-white">
          
          {/* TOP SECTION: PATIENT DETAILS */}
          <div className="bg-[#f0f9ff] border border-sky-200 rounded-xl p-5 shadow-sm w-full">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="col-span-1">
                <label className={labelClass}>Patient</label>
                <select 
                  value={patient} onChange={(e) => setPatient(e.target.value)}
                  className={selectClass} 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                >
                  <option value="">Select Patient</option>
                  <option value="Napoli, Emily">Napoli, Emily</option>
                  <option value="Smith, John">Smith, John</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className={labelClass}>Log Date</label>
                <input type="date" value={logDate} onChange={(e) => setLogDate(e.target.value)} className={inputClass} />
              </div>

              <div className="col-span-1">
                <label className={labelClass}>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
              </div>

              <div className="col-span-1">
                <label className={labelClass}>Frequency</label>
                <select 
                  value={frequency} onChange={(e) => setFrequency(e.target.value)}
                  className={selectClass} 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                >
                  <option value="">Select</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-Weekly">Bi-Weekly</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className={labelClass}>Max-unit</label>
                <input type="number" value={maxUnit} onChange={(e) => setMaxUnit(e.target.value)} placeholder="Max_Unit" className={inputClass} />
              </div>

              <div className="col-span-1">
                <label className={labelClass}>Day</label>
                <select 
                  value={day} onChange={(e) => setDay(e.target.value)}
                  className={selectClass} 
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                >
                  <option value="">Select</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: INJECTION DETAILS */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-[#00A3FF]">
                <Syringe size={18} strokeWidth={2.5} />
                <h3 className="text-sm font-bold tracking-wide">Injection Details</h3>
              </div>
              <button 
                onClick={handleAddRow}
                className="flex items-center gap-1.5 bg-[#00A3FF] hover:bg-[#008ce6] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
              >
                <Plus size={14} strokeWidth={3} /> New Row
              </button>
            </div>

            {/* Dynamic Rows Container */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[1000px] flex flex-col gap-3">
                
                {/* Headers */}
                <div className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_1fr_1fr_1fr_0.8fr_0.2fr] gap-3 px-1">
                  <span className="text-xs font-bold text-slate-500">Container</span>
                  <span className="text-xs font-bold text-slate-500">Process</span>
                  <span className="text-xs font-bold text-slate-500">Rule</span>
                  <span className="text-xs font-bold text-slate-500">M Type</span>
                  <span className="text-xs font-bold text-slate-500">Qty</span>
                  <span className="text-xs font-bold text-slate-500">Allergen</span>
                  <span className="text-xs font-bold text-slate-500">Diluent</span>
                  <span className="text-xs font-bold text-slate-500">PD Vol</span>
                  <span className="text-xs font-bold text-slate-500">Unit</span>
                  <span></span>
                </div>

                {/* Rows mapping */}
                {rows.map((row) => (
                  <div key={row.id} className="grid grid-cols-[1.5fr_1fr_1fr_0.8fr_1fr_1fr_1fr_1fr_0.8fr_0.2fr] gap-3 items-center bg-white border border-slate-200 p-2 rounded-xl shadow-sm hover:border-[#00A3FF]/30 transition-colors">
                    
                    <select className={selectClass} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}>
                      <option>Select container...</option>
                      <option>Vial 1</option>
                    </select>

                    {/* ✅ Process Dropdown: Controls the Rule Dropdown */}
                    <select 
                      value={row.process || "Select"}
                      onChange={(e) => handleProcessChange(row.id, e.target.value)}
                      className={selectClass} 
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                    >
                      <option value="Select">Select</option>
                      <option value="Auto">Auto</option>
                      <option value="Manual">Manual</option>
                    </select>

                    {/* ✅ Rule Dropdown: Disabled and styled when Process is Manual */}
                    <select 
                      disabled={row.process === 'Manual'}
                      className={`${selectClass} ${row.process === 'Manual' ? '!bg-slate-100 opacity-60 !cursor-not-allowed' : ''}`} 
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}
                    >
                      <option>Select Rule...</option>
                      <option>SAER-1</option>
                    </select>

                    <select className={selectClass} style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")` }}>
                      <option>ML</option>
                      <option>CC</option>
                      <option>MG</option>
                    </select>

                    <AdornmentInput placeholder="0.0" />
                    <AdornmentInput placeholder="0.0" />
                    <AdornmentInput placeholder="0.0" />
                    <AdornmentInput placeholder="0.0" />

                    <input type="number" defaultValue="1" className={inputClass} />

                    <button 
                      onClick={() => handleRemoveRow(row.id)}
                      disabled={rows.length === 1}
                      className="flex justify-center items-center w-6 h-6 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 disabled:opacity-30 transition-all mx-auto"
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* FOOTER */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end items-center border-t border-slate-200 gap-3 shrink-0 rounded-b-xl">
           <button 
             onClick={onClose} 
             className="flex items-center gap-1.5 px-5 py-2 rounded-lg border border-slate-300 text-slate-600 font-bold text-sm hover:bg-white hover:text-slate-800 transition-all shadow-sm active:scale-95"
           >
             <XCircle size={16} /> Cancel
           </button>
           
           {/* Button color updated to Sky Blue */}
           <button 
             onClick={handleSaveClick} 
             className="flex items-center gap-1.5 px-6 py-2 rounded-lg bg-[#00A3FF] text-white font-bold text-sm hover:bg-[#008fdf] shadow-md transition-all active:scale-95"
           >
             <Save size={16} /> Save
           </button>
        </div>

      </div>
    </div>
  );
};

export default TreatmentListForm;