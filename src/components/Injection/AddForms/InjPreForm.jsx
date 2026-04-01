import React, { useState, useEffect } from 'react';
import { 
  X, PlusCircle, Save, List, Syringe, Scale, Droplets, Layers, 
  FileText, Calendar, UserCheck, Flag, MessageSquare, 
  Archive, MapPin, Thermometer, Activity, Hash
} from 'lucide-react';
import { SelectBox } from 'devextreme-react';
import SuccessPopup from '../../global/SuccessPopup';

const InjPreForm = ({ onClose, onSave, initialData }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    type: null,
    injection: null,
    measurementType: null,
    quantity: '',
    byType: null,
    instructions: '',
    qualityCheckDate: '',
    checkedBy: '',
    status: null,
    notes: '',
    containerType: null,
    location: '',
    temperature: '',
    condition: ''
  });

  useEffect(() => {
    if (initialData) {
      const qtyParts = initialData.qty ? initialData.qty.split(' ') : [];
      const qtyAmount = qtyParts[0] || '';
      const qtyUnit = qtyParts[1] || 'mL';

      setFormData({
        type: initialData.type || null,
        injection: initialData.name || null,
        measurementType: qtyUnit,
        quantity: qtyAmount,
        byType: null,
        instructions: initialData.instructions || '',
        qualityCheckDate: initialData.qcDate || '',
        checkedBy: initialData.qcBy || '',
        status: initialData.status || null,
        notes: initialData.notes || '',
        containerType: null,
        location: '',
        temperature: '',
        condition: ''
      });
    } else {
      setFormData({
        type: null, injection: null, measurementType: null, quantity: '',
        byType: null, instructions: '', qualityCheckDate: '', checkedBy: '',
        status: null, notes: '', containerType: null, location: '',
        temperature: '', condition: ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(onSave) {
      onSave({ ...formData, id: initialData?.id });
    }
    setShowSuccess(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const labelClass = "text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider block mb-1.5";
  const inputClass = "w-full h-[40px] border-2 border-slate-200 rounded-lg pl-9 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all placeholder:text-slate-400";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in slide-in-from-top-3 fade-in duration-300 mb-6 px-1">
      
      {/* ========================================================= */}
      {/* CONTAINER 1: MAIN PREPARATION INFO                        */}
      {/* ========================================================= */}
      <div className="w-full bg-white border-2 border-sky-200 rounded-xl shadow-lg overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-4 sm:px-5 py-3 flex items-center justify-between border-b border-sky-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Syringe size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-sky-900 text-[12px] sm:text-[13px] tracking-wide uppercase leading-tight">
              {initialData ? 'Edit Preparation' : 'New Preparation'}
            </h3>
          </div>
          
          <button 
            type="button" 
            onClick={onClose} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm active:scale-90"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="p-4 sm:p-6 bg-white/50 flex flex-col gap-6">
          {/* Row 1: Optimized for Mobile (1 col) -> Tablet (2 cols) -> Desktop (5 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            <div className="relative">
              <label className={labelClass}>Type</label>
              <div className="relative">
                <List className={iconClass} size={14} />
                <SelectBox 
                  items={['Type A', 'Type B', 'Recipe Based', 'Manual Entry']} 
                  placeholder="Select Type" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.type}
                  onValueChange={(v) => handleInputChange('type', v)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Injection</label>
              <div className="relative">
                <Syringe className={iconClass} size={14} />
                <SelectBox 
                  items={['TREE MIX 1', 'GRASS MIX', formData.injection].filter(Boolean)} 
                  placeholder="-- Select --" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.injection}
                  onValueChange={(v) => handleInputChange('injection', v)}
                  acceptCustomValue={true}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Measurement</label>
              <div className="relative">
                <Scale className={iconClass} size={14} />
                <SelectBox 
                  items={['mL', 'mg', 'cc']} 
                  placeholder="mL" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.measurementType}
                  onValueChange={(v) => handleInputChange('measurementType', v)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Quantity</label>
              <div className="relative">
                <Droplets className={iconClass} size={14} />
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className={inputClass}
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)} 
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>By Type</label>
              <div className="relative">
                <Layers className={iconClass} size={14} />
                <SelectBox 
                  items={['Manual', 'Auto']} 
                  placeholder="Select" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.byType}
                  onValueChange={(v) => handleInputChange('byType', v)}
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            <div className="relative">
              <label className={labelClass}>Instructions</label>
              <div className="relative">
                <FileText className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="Instructions" 
                  className={inputClass}
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>QC Date</label>
              <div className="relative">
                <Calendar className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="mm/dd/yyyy"
                  className={inputClass}
                  value={formData.qualityCheckDate}
                  onChange={(e) => handleInputChange('qualityCheckDate', e.target.value)} 
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Checked By</label>
              <div className="relative">
                <UserCheck className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="Checked By" 
                  className={inputClass}
                  value={formData.checkedBy}
                  onChange={(e) => handleInputChange('checkedBy', e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Status</label>
              <div className="relative">
                <Flag className={iconClass} size={14} />
                <SelectBox 
                  items={['Pending', 'Approved', 'Rejected']} 
                  placeholder="Status" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.status}
                  onValueChange={(v) => handleInputChange('status', v)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Notes</label>
              <div className="relative">
                <MessageSquare className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="Notes" 
                  className={inputClass}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CONTAINER 2: STORAGE INFO                                 */}
      {/* ========================================================= */}
      <div className="w-full bg-white border-2 border-sky-200 rounded-xl shadow-lg overflow-hidden">
        
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-4 sm:px-5 py-3 flex items-center gap-2.5 border-b border-sky-200">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <Archive size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-sky-900 text-[12px] sm:text-[13px] tracking-wide uppercase leading-tight">
            Storage Details
          </h3>
        </div>

        <div className="p-4 sm:p-6 bg-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="relative">
              <label className={labelClass}>Container Type</label>
              <div className="relative">
                <Archive className={iconClass} size={14} />
                <SelectBox 
                  items={['Vial', 'Syringe', 'Bag']} 
                  placeholder="Select" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.containerType}
                  onValueChange={(v) => handleInputChange('containerType', v)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Location</label>
              <div className="relative">
                <MapPin className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="Location" 
                  className={inputClass}
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Temp (°C)</label>
              <div className="relative">
                <Thermometer className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="0°C" 
                  className={inputClass}
                  value={formData.temperature}
                  onChange={(e) => handleInputChange('temperature', e.target.value)}
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Condition</label>
              <div className="relative">
                <Activity className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="Condition" 
                  className={inputClass}
                  value={formData.condition}
                  onChange={(e) => handleInputChange('condition', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-sky-200 px-4 sm:px-5 py-4 flex flex-col sm:flex-row items-center justify-end gap-3 shrink-0">
          <button 
            type="button"
            onClick={onClose} 
            className="w-full sm:w-auto h-[40px] px-6 text-slate-500 font-black text-[11px] uppercase tracking-wider hover:text-rose-500 transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="w-full sm:w-auto bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[40px] px-10 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 order-1 sm:order-2"
          >
             <Save size={16} strokeWidth={3} /> {initialData ? 'Update Preparation' : 'Save Preparation'}
          </button>
        </div>
      </div>

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => { setShowSuccess(false); onClose(); }} 
        message={initialData ? "Preparation record updated successfully!" : "Injection preparation details saved successfully!"}
      />

      <style jsx global>{`
        .themed-select-box {
          border-radius: 0.5rem !important;
          border: 2px solid #E2E8F0 !important;
          background-color: white !important;
          transition: all 0.2s ease !important;
        }
        .themed-select-box.dx-state-hover {
          border-color: #CBD5E1 !important;
        }
        .themed-select-box.dx-state-focused {
          border-color: #00A3FF !important;
          box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1) !important;
        }
        .themed-select-box .dx-texteditor-input { 
          padding-left: 2.25rem !important; 
          font-weight: 600 !important;
          color: #334155 !important;
          font-size: 13px !important; 
        }
      `}</style>
    </form>
  );
};

export default InjPreForm;