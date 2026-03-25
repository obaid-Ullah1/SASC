import React, { useState, useEffect } from 'react';
import { 
  X, PlusCircle, Save, List, Syringe, Scale, Droplets, Layers, 
  FileText, Calendar, UserCheck, Flag, MessageSquare, 
  Archive, MapPin, Thermometer, Activity 
} from 'lucide-react';
import { SelectBox } from 'devextreme-react';
import SuccessPopup from '../../global/SuccessPopup'; // Adjust path if needed

// ✅ Added initialData to the props
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

  // ✅ NEW: Auto-fill form when editing an existing row
  useEffect(() => {
    if (initialData) {
      // Extract the number and unit from "100 mL"
      const qtyParts = initialData.qty ? initialData.qty.split(' ') : [];
      const qtyAmount = qtyParts[0] || '';
      const qtyUnit = qtyParts[1] || 'mL';

      setFormData({
        type: initialData.type || null,
        injection: initialData.name || null, // Maps 'name' to the 'injection' field
        measurementType: qtyUnit,
        quantity: qtyAmount,
        byType: null, // Not tracked in grid currently
        instructions: initialData.instructions || '',
        qualityCheckDate: initialData.qcDate || '',
        checkedBy: initialData.qcBy || '',
        status: initialData.status || null,
        notes: initialData.notes || '',
        // Storage fields default to empty since they aren't on the main grid
        containerType: null,
        location: '',
        temperature: '',
        condition: ''
      });
    } else {
      // Clear the form if adding a new record
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
      // Pass the original ID back if we are editing, otherwise it creates a new row
      onSave({ ...formData, id: initialData?.id });
    }
    setShowSuccess(true);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Shared classes for theme consistency
  const labelClass = "text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider block mb-1.5";
  const inputClass = "w-full h-[40px] border-2 border-slate-200 rounded-lg pl-9 pr-4 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all placeholder:text-slate-400";
  const iconClass = "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-in slide-in-from-top-3 fade-in duration-300 mb-6">
      
      {/* ========================================================= */}
      {/* CONTAINER 1: MAIN PREPARATION INFO                        */}
      {/* ========================================================= */}
      <div className="w-full bg-white border-2 border-sky-200 rounded-lg shadow-lg overflow-hidden">
        
        {/* Main Header */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Syringe size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              {initialData ? 'Edit Preparation Form' : 'New Preparation Form'}
            </h3>
          </div>
          
          <button 
            type="button" 
            onClick={onClose} 
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        <div className="p-5 bg-white/50 flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
                {/* Notice I added the specific mock data items to the list so DevExtreme SelectBox binds properly */}
                <SelectBox 
                  items={['TREE MIX 1', 'GRASS MIX', formData.injection].filter(Boolean)} 
                  placeholder="-- Select --" 
                  height={40} 
                  className="themed-select-box"
                  value={formData.injection}
                  onValueChange={(v) => handleInputChange('injection', v)}
                  acceptCustomValue={true} // Allows it to show whatever was in the grid
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass}>Measurement Type</label>
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
                  placeholder="Qty" 
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
              <label className={labelClass}>Quality Check Date</label>
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
                  placeholder="Select Status" 
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
      <div className="w-full bg-white border-2 border-sky-200 rounded-lg shadow-lg overflow-hidden">
        
        {/* Storage Header */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center gap-2.5 border-b border-sky-200">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <Archive size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            Storage Info
          </h3>
        </div>

        <div className="p-5 bg-white/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
              <label className={labelClass}>Temperature (°C)</label>
              <div className="relative">
                <Thermometer className={iconClass} size={14} />
                <input 
                  type="text" 
                  placeholder="Temperature" 
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

        {/* Action Footer attached to the bottom container */}
        <div className="bg-white border-t border-sky-200 px-5 py-4 flex items-center justify-end shrink-0">
           <div className="flex items-center gap-3">
              <button 
                type="button"
                onClick={onClose} 
                className="h-[40px] px-6 text-slate-500 font-black text-[11px] uppercase tracking-wider hover:text-rose-500 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[40px] px-8 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                 <Save size={14} strokeWidth={3} /> {initialData ? 'Update Record' : 'Save Record'}
              </button>
           </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => { setShowSuccess(false); onClose(); }} 
        message={initialData ? "Preparation record updated successfully!" : "Injection preparation details saved successfully!"}
      />

      {/* DEVEXTREME OVERRIDE STYLES */}
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