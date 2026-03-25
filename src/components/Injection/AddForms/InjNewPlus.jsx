import React, { useState, useEffect } from 'react';
import { 
  X, PlusCircle, Save, List, Syringe, Scale, Droplets, Layers, 
  FileText, QrCode, Flag, MessageSquare, Archive, MapPin, 
  Thermometer, Activity, Beaker, FlaskConical 
} from 'lucide-react';
import { SelectBox } from 'devextreme-react';
import SuccessPopup from '../../global/SuccessPopup'; 

const InjNewPlus = ({ initialData, onClose, onSave }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    type: '', name: '', measurementType: '', quantity: '', instructions: '',
    lotNo: '', batchNo: '', status: 'Pending', notes: '', containerType: '',
    location: '', temperature: '', condition: '', concentration: '', activeIngredients: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        type: initialData.type || '',
        name: initialData.name || '',
        lotNo: initialData.lot || '',
        batchNo: initialData.batch || '',
      }));
    }
  }, [initialData]);

  // Handles the manual save for the Storage section
  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSave) onSave(formData);
    setShowSuccess(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // In a real app, an API auto-save trigger would fire here for non-storage fields
  };

  // ✅ OFFICIAL THEME CLASSES
  const labelClass = "text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider block mb-1.5";
  const inputClass = "w-full h-[40px] border-2 border-slate-200 rounded-lg pl-9 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all placeholder:text-slate-400";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none";

  return (
    <div className="w-full max-w-5xl bg-white border-2 border-sky-200 rounded-lg shadow-2xl animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden flex flex-col max-h-[90vh]">
      
      {/* MAIN MODAL HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200 shrink-0 z-20">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              New Injection Preparation
            </h3>
          </div>
        </div>
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* SCROLLABLE FORM BODY */}
      <div className="flex-1 overflow-y-auto p-5 bg-white/50 relative">
        <form id="inj-new-plus-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* ========================================== */}
          {/* SECTION 1: DETAILS (Sky Blue Theme)        */}
          {/* ========================================== */}
          <div className="w-full bg-white border-2 border-sky-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-sky-50 px-5 py-2.5 flex items-center gap-2.5 border-b border-sky-200">
              <Syringe size={15} className="text-[#00A3FF]" strokeWidth={2.5} />
              <h3 className="font-bold text-sky-900 text-[12px] uppercase tracking-wider">Details</h3>
            </div>
            
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="relative"><label className={labelClass}>Type</label><div className="relative"><List className={iconClass} size={14} /><SelectBox items={['Recipe Based', 'Manual Entry']} value={formData.type} onValueChange={(v) => handleInputChange('type', v)} placeholder="Select Type" height={40} className="themed-select-box" /></div></div>
              <div className="relative"><label className={labelClass}>Name</label><div className="relative"><Syringe className={iconClass} size={14} /><input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Injection Name" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Measurement Type</label><div className="relative"><Scale className={iconClass} size={14} /><SelectBox items={['mL', 'mg', 'cc']} value={formData.measurementType} onValueChange={(v) => handleInputChange('measurementType', v)} placeholder="mL" height={40} className="themed-select-box" /></div></div>
              <div className="relative"><label className={labelClass}>Quantity</label><div className="relative"><Droplets className={iconClass} size={14} /><input type="number" value={formData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} placeholder="e.g. 100" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Instructions</label><div className="relative"><FileText className={iconClass} size={14} /><input type="text" value={formData.instructions} onChange={(e) => handleInputChange('instructions', e.target.value)} placeholder="Instructions" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Lot No</label><div className="relative"><QrCode className={iconClass} size={14} /><input type="text" value={formData.lotNo} onChange={(e) => handleInputChange('lotNo', e.target.value)} placeholder="TR 100-02" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Batch No</label><div className="relative"><Layers className={iconClass} size={14} /><input type="text" value={formData.batchNo} onChange={(e) => handleInputChange('batchNo', e.target.value)} placeholder="02" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Status</label><div className="relative"><Flag className={iconClass} size={14} /><SelectBox items={['Pending', 'Approved', 'Rejected']} value={formData.status} onValueChange={(v) => handleInputChange('status', v)} placeholder="Select Status" height={40} className="themed-select-box" /></div></div>
              <div className="relative lg:col-span-4"><label className={labelClass}>Notes</label><div className="relative"><MessageSquare className={iconClass} size={14} /><input type="text" value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} placeholder="Notes" className={inputClass} /></div></div>
            </div>
          </div>

          {/* ========================================== */}
          {/* SECTION 2: STORAGE INFO (Emerald Theme)    */}
          {/* ========================================== */}
          <div className="w-full bg-white border-2 border-emerald-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-emerald-50 px-5 py-2.5 flex items-center gap-2.5 border-b border-emerald-200">
              <Archive size={15} className="text-emerald-500" strokeWidth={2.5} />
              <h3 className="font-bold text-emerald-900 text-[12px] uppercase tracking-wider">Storage Info</h3>
            </div>
            
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="relative"><label className={labelClass}>Container Type</label><div className="relative"><Archive className={iconClass} size={14} /><SelectBox items={['Vial', 'Syringe', 'Bag']} value={formData.containerType} onValueChange={(v) => handleInputChange('containerType', v)} placeholder="Select" height={40} className="themed-select-box" /></div></div>
              <div className="relative"><label className={labelClass}>Location</label><div className="relative"><MapPin className={iconClass} size={14} /><input type="text" value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="Location" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Temperature (°C)</label><div className="relative"><Thermometer className={iconClass} size={14} /><input type="text" value={formData.temperature} onChange={(e) => handleInputChange('temperature', e.target.value)} placeholder="Temperature" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Condition</label><div className="relative"><Activity className={iconClass} size={14} /><input type="text" value={formData.condition} onChange={(e) => handleInputChange('condition', e.target.value)} placeholder="Condition" className={inputClass} /></div></div>
            </div>

            {/* ✅ SAVE BUTTON MOVED HERE */}
            <div className="bg-slate-50 border-t border-emerald-200 px-5 py-3 flex items-center justify-end">
               <button 
                 type="submit" 
                 className="bg-[#10b981] hover:bg-emerald-600 text-white h-[36px] px-6 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center gap-2"
               >
                  <Save size={14} strokeWidth={3} /> Save Storage Info
               </button>
            </div>
          </div>

          {/* ========================================== */}
          {/* SECTION 3: FORMULA COMPOSITION (Amber)     */}
          {/* ========================================== */}
          <div className="w-full bg-white border-2 border-amber-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-amber-50 px-5 py-2.5 flex items-center gap-2.5 border-b border-amber-200">
              <FlaskConical size={15} className="text-amber-500" strokeWidth={2.5} />
              <h3 className="font-bold text-amber-900 text-[12px] uppercase tracking-wider">Formula Composition</h3>
            </div>
            
            <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="relative"><label className={labelClass}>Concentration</label><div className="relative"><FlaskConical className={iconClass} size={14} /><input type="text" value={formData.concentration} onChange={(e) => handleInputChange('concentration', e.target.value)} placeholder="Concentration" className={inputClass} /></div></div>
              <div className="relative"><label className={labelClass}>Active Ingredients</label><div className="relative"><Beaker className={iconClass} size={14} /><input type="text" value={formData.activeIngredients} onChange={(e) => handleInputChange('activeIngredients', e.target.value)} placeholder="Active Ingredients" className={inputClass} /></div></div>
            </div>
          </div>

        </form>
      </div>

      {/* ✅ OFFICIAL THEME FOOTER (Only Close & Auto-Save Indicator) */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         
         <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Activity size={14} className="animate-pulse text-[#00A3FF]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Details & Formula Auto-Save Active</span>
         </div>

         <button 
           type="button" 
           onClick={onClose} 
           className="h-[38px] px-8 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[12px] uppercase tracking-wider rounded-lg transition-colors"
         >
           Close
         </button>
      </div>

      <SuccessPopup isOpen={showSuccess} onClose={() => { setShowSuccess(false); onClose(); }} message="Storage Info saved successfully!" />

      <style jsx global>{`
        .themed-select-box { border-radius: 0.5rem !important; border: 2px solid #E2E8F0 !important; background-color: white !important; transition: all 0.2s ease !important; }
        .themed-select-box.dx-state-hover { border-color: #CBD5E1 !important; }
        .themed-select-box.dx-state-focused { border-color: #00A3FF !important; box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1) !important; }
        .themed-select-box .dx-texteditor-input { padding-left: 2.25rem !important; font-weight: 600 !important; color: #334155 !important; font-size: 13px !important; }
      `}</style>
    </div>
  );
};

export default InjNewPlus;