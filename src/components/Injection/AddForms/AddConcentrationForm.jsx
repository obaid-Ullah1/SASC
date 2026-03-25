import React, { useState } from 'react';
import { 
  X, Plus, Save, FlaskConical, Table, 
  Trash2, AlertCircle, Beaker 
} from 'lucide-react';
import { SelectBox } from 'devextreme-react';
import SuccessPopup from '../../global/SuccessPopup'; 

const AddConcentrationForm = ({ initialData, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Dynamic rows for the form
  const [rows, setRows] = useState([
    { id: Date.now(), category: '', percentage: '', quantity: '' }
  ]);

  const [savedData, setSavedData] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), category: '', percentage: '', quantity: '' }]);
  };

  const handleRemoveRow = (id) => {
    if (rows.length === 1) {
      setRows([{ id: Date.now(), category: '', percentage: '', quantity: '' }]);
      return;
    }
    setRows(rows.filter(row => row.id !== id));
  };

  const handleRowChange = (id, field, value) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validRows = rows.filter(r => r.category || r.percentage || r.quantity);
    if (validRows.length > 0) {
      setSavedData([...savedData, ...validRows]);
      setRows([{ id: Date.now(), category: '', percentage: '', quantity: '' }]); 
      setShowSuccess(true);
    }
  };

  const totalPercentage = rows.reduce((sum, row) => sum + (parseFloat(row.percentage) || 0), 0);
  const totalQuantity = rows.reduce((sum, row) => sum + (parseFloat(row.quantity) || 0), 0);

  // Theme Classes
  const labelClass = "text-[11px] font-black text-slate-500 ml-1 uppercase tracking-[0.05em] block mb-2";
  const inputClass = "w-full h-[42px] border-2 border-slate-200 rounded-lg px-4 text-[13px] font-bold text-slate-700 bg-white outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all placeholder:text-slate-300 placeholder:font-medium";
  const totalsBoxClass = "h-[42px] border-2 border-emerald-200 rounded-lg px-4 text-[14px] font-black text-emerald-600 flex items-center justify-center shadow-sm w-full bg-white tracking-tight";

  return (
    <div className="w-full bg-white border-2 border-sky-200 rounded-xl shadow-2xl animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden flex flex-col max-h-[92vh]">
      
      {/* 1. MODAL HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-6 py-3.5 flex items-center justify-between border-b border-sky-200 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <FlaskConical size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-black text-sky-900 text-[14px] tracking-tight uppercase leading-tight">
              Concentration Management
            </h3>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm active:scale-90"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto p-6 bg-white/50 flex flex-col gap-8">
        
        {/* SECTION 1: DYNAMIC FORM */}
        <div className="bg-white border-2 border-sky-100 rounded-xl shadow-sm overflow-hidden">
          
          <div className="bg-sky-50 px-6 py-3 flex items-center gap-2.5 border-b border-sky-100">
            <Beaker size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            <h3 className="font-black text-sky-800 text-[12px] uppercase tracking-widest">Injection Concentration</h3>
          </div>

          <div className="p-8">
            {/* ✅ FIXED: TARGET INJECTION DISPLAY (Read-Only, No Dropdown) */}
            <div className="flex flex-col items-center justify-center mb-10">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">Selected Injection</label>
              <div className="w-full max-w-md h-[44px] border-2 border-rose-200 bg-rose-50/30 rounded-lg flex items-center justify-center text-[15px] font-black text-rose-600 shadow-sm px-4 text-center">
                {initialData?.name || 'NO INJECTION SELECTED'}
              </div>
            </div>

            {/* DYNAMIC ROWS AREA (Lite Blue) */}
            <div className="bg-[#f0f9ff]/60 p-6 rounded-xl border-2 border-sky-100/50 shadow-inner">
              
              {/* Header Row */}
              <div className="grid grid-cols-12 gap-5 mb-3 px-1">
                <div className="col-span-4"><label className={labelClass}>Category</label></div>
                <div className="col-span-3"><label className={labelClass}>Percentage (%)</label></div>
                <div className="col-span-3"><label className={labelClass}>Quantity (mL)</label></div>
                <div className="col-span-2"></div>
              </div>

              {/* Input Rows */}
              <div className="flex flex-col gap-4">
                {rows.map((row) => (
                  <div key={row.id} className="grid grid-cols-12 gap-5 items-center animate-in fade-in slide-in-from-left-2 duration-200">
                    <div className="col-span-4">
                      <SelectBox 
                        items={['Category A', 'Category B', 'Category C']} 
                        placeholder="Select..." 
                        height={42} 
                        className="themed-select-box-no-icon shadow-sm"
                        value={row.category}
                        onValueChange={(v) => handleRowChange(row.id, 'category', v)}
                      />
                    </div>
                    <div className="col-span-3">
                      <input type="number" placeholder="0" className={inputClass} value={row.percentage} onChange={(e) => handleRowChange(row.id, 'percentage', e.target.value)} />
                    </div>
                    <div className="col-span-3">
                      <input type="number" placeholder="0.00" className={inputClass} value={row.quantity} onChange={(e) => handleRowChange(row.id, 'quantity', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                      <button onClick={() => handleRemoveRow(row.id)} className="w-full h-[42px] bg-rose-500 hover:bg-rose-600 text-white rounded-lg flex items-center justify-center gap-2 font-black text-[11px] uppercase tracking-wider transition-all active:scale-95 shadow-md">
                        <Trash2 size={13} strokeWidth={2.5} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTALS BAR */}
              <div className="grid grid-cols-12 gap-5 items-center mt-8 pt-6 border-t-2 border-sky-100">
                <div className="col-span-4 flex justify-end pr-3">
                  <span className="font-black text-[14px] text-emerald-700 uppercase tracking-tighter">Running Totals</span>
                </div>
                <div className="col-span-3"><div className={totalsBoxClass}>{totalPercentage.toFixed(0)}%</div></div>
                <div className="col-span-3"><div className={totalsBoxClass}>{totalQuantity.toFixed(2)}</div></div>
                <div className="col-span-2"></div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-center gap-5 mt-10">
              <button onClick={handleAddRow} className="h-[44px] px-8 bg-white border-2 border-emerald-400 text-emerald-600 hover:bg-emerald-50 rounded-lg font-black text-[12px] uppercase tracking-widest shadow-sm transition-all active:scale-95 flex items-center gap-2">
                <Plus size={18} strokeWidth={3} /> Add Row
              </button>
              <button onClick={handleSubmit} className="h-[44px] px-12 bg-[#00A3FF] hover:bg-[#008CE6] text-white rounded-lg font-black text-[12px] uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center gap-2">
                <Save size={18} strokeWidth={3} /> Submit Concentration
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: DATA TABLE */}
        <div className="bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden mb-4">
          <div className="bg-slate-50 px-6 py-3 flex items-center justify-center gap-2.5 border-b border-slate-200">
            <Table size={16} className="text-slate-500" strokeWidth={2.5} />
            <h3 className="font-black text-slate-600 text-[12px] uppercase tracking-widest">Concentration History</h3>
          </div>
          <div className="p-6">
            {savedData.length === 0 ? (
              <div className="bg-rose-50/50 border-2 border-dashed border-rose-200 rounded-xl py-6 flex items-center justify-center gap-2 text-rose-400">
                <AlertCircle size={18} />
                <span className="font-black text-[12px] uppercase tracking-widest">No Concentration Data Recorded</span>
              </div>
            ) : (
              <div className="border-2 border-slate-100 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-5 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest border-r border-slate-200">Category</th>
                      <th className="px-5 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center border-r border-slate-200">Percentage</th>
                      <th className="px-5 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {savedData.map((data, idx) => (
                      <tr key={idx} className="bg-white hover:bg-sky-50/30 transition-colors">
                        <td className="px-5 py-4 text-[14px] font-bold text-slate-700 border-r border-slate-100">{data.category}</td>
                        <td className="px-5 py-4 text-center text-[14px] font-black text-[#00A3FF] border-r border-slate-100">{data.percentage}%</td>
                        <td className="px-5 py-4 text-center text-[14px] font-black text-emerald-600">{data.quantity} mL</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-end shrink-0 shadow-inner z-20">
         <button onClick={onClose} className="h-[42px] px-12 bg-slate-800 hover:bg-slate-900 text-white font-black text-[12px] uppercase tracking-widest rounded-lg shadow-lg transition-all active:scale-95">
           Close Panel
         </button>
      </div>

      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} message="Concentration added successfully!" />

      <style jsx global>{`
        .themed-select-box-no-icon { border-radius: 0.5rem !important; border: 2px solid #E2E8F0 !important; background-color: white !important; }
        .themed-select-box-no-icon.dx-state-hover { border-color: #CBD5E1 !important; }
        .themed-select-box-no-icon.dx-state-focused { border-color: #00A3FF !important; box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1) !important; }
        .themed-select-box-no-icon .dx-texteditor-input { padding-left: 1rem !important; font-weight: 700 !important; color: #334155 !important; font-size: 13px !important; }
      `}</style>
    </div>
  );
};

export default AddConcentrationForm;