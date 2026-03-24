// src/components/inventory/AddForms/InventoryAddForm.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, Save, Paperclip, Building2, ClipboardList, Syringe, ChevronUp 
} from 'lucide-react';
import { TextBox, SelectBox, DateBox } from 'devextreme-react';

const InventoryAddForm = ({ isOpen, onClose, onSave, editData }) => {
  const initialFormState = {
    category: null, code: '', lotNo: '', measurementType: null,
    volume: '', serialNo: '', purchaseOrder: '', purDate: null,
    dom: null, doe: null, containerId: '', barcode: '',
    containerType: '', capacity: '', status: null, condition: '',
    totalCost: '', spu: 'Auto Calculated', attachment: null,
    minStock: '', reorderLevel: '', reorderQuantity: '', storageInstructions: '',
    storageCondition: '', lastCheckedOn: null, nextCheckOn: null, compliance: null,
    stockStatus: null, lastUpdatedBy: '', lastUpdateDate: null, remarks: '',
    allocation: '', injectionType: '', injectionId: '', trackingLocation: '', adverseReaction: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  // Load existing data if editData is provided
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          ...initialFormState,
          id: editData.id,
          category: editData.inv === 'Allergen' ? 1 : editData.inv === 'Chemical' ? 2 : 3,
          code: editData.code || editData.name || '',
          lotNo: editData.lotNo || '',
          measurementType: editData.volume?.includes('mL') ? 'ml' : 'units',
          volume: editData.volume?.replace(' mL', '') || '',
          serialNo: editData.batchNo || '',
          purchaseOrder: editData.purchaseOrder || '',
          purDate: editData.purchaseDate || null,
          dom: editData.doM || null,
          doe: editData.doE || null,
          capacity: editData.qty?.toString() || '',
          status: editData.status === 'In Stock' ? 1 : editData.status === 'Low Stock' ? 2 : 3,
          totalCost: editData.cost?.toString() || '',
          minStock: editData.minStock?.toString() || '',
          reorderLevel: editData.reorderLevel?.toString() || '',
          lastCheckedOn: editData.checkedOn || null,
        });
      } else {
        setFormData(initialFormState); // Reset if new
      }
    }
  }, [isOpen, editData]);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  const labelClasses = "text-[11px] font-extrabold text-slate-700 uppercase tracking-widest mb-2 block ml-1";
  
  const categories = [{ id: 1, name: 'Allergen' }, { id: 2, name: 'Chemical' }, { id: 3, name: 'Biological' }];
  const measurementTypes = [{ id: 'ml', name: 'mL' }, { id: 'mg', name: 'mg' }, { id: 'units', name: 'Units' }];
  const complianceOptions = [{ id: 1, name: 'FDA Approved' }, { id: 2, name: 'Pending' }, { id: 3, name: 'N/A' }];
  const statusOptions = [{ id: 1, name: 'In Stock' }, { id: 2, name: 'Low Stock' }, { id: 3, name: 'Out of Stock' }];

  return (
    <div className="flex flex-col gap-6 shrink-0 font-sans mb-4 animate-in fade-in slide-in-from-top-4 duration-300">
      
      {/* CONTAINER 1: INVENTORY DETAILS */}
      <div className="bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border-2 border-[#00A3FF]/20 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00A3FF] rounded-lg shadow-lg shadow-[#00A3FF]/30">
              <Building2 size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">
                {editData ? 'Update Inventory Details' : 'Add Inventory Details'}
              </h3>
              <p className="text-[11px] text-[#00A3FF] font-semibold uppercase tracking-wider">
                General Information
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-[13px]">
            <button 
              onClick={() => onSave(formData)}
              className="px-6 py-2.5 bg-[#00A3FF] hover:bg-[#008bdb] text-white font-bold rounded-xl transition-all shadow-[0_8px_20px_rgba(0,163,255,0.3)] hover:shadow-[0_12px_25px_rgba(0,163,255,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-2"
            >
              <Save size={16} /> {editData ? 'Update Record' : 'Save Record'}
            </button>
            <button className="px-5 py-2.5 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-200 hover:border-[#00A3FF]/40 hover:text-[#00A3FF] transition-all shadow-sm flex items-center gap-2">
              <Paperclip size={16} /> Attachment
            </button>
            <button type="button" onClick={onClose} className="p-2 bg-[#ef4444] text-white rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-90 ml-2">
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="p-8 bg-gradient-to-b from-white to-slate-50/30 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-6">
          <div className="w-full"><label className={labelClasses}>Category</label><SelectBox value={formData.category} onValueChanged={(e) => handleFieldChange('category', e.value)} dataSource={categories} displayExpr="name" valueExpr="id" placeholder="Select Category" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Code</label><TextBox value={formData.code} onValueChanged={(e) => handleFieldChange('code', e.value)} placeholder="Enter Code" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Lot#</label><TextBox value={formData.lotNo} onValueChanged={(e) => handleFieldChange('lotNo', e.value)} placeholder="Lot No" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Measurement Type</label><SelectBox value={formData.measurementType} onValueChanged={(e) => handleFieldChange('measurementType', e.value)} dataSource={measurementTypes} displayExpr="name" valueExpr="id" placeholder="mL" height={44} className="popping-input" /></div>

          <div className="w-full"><label className={labelClasses}>Volume</label><TextBox value={formData.volume} onValueChanged={(e) => handleFieldChange('volume', e.value)} placeholder="Volume" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Serial No</label><TextBox value={formData.serialNo} onValueChanged={(e) => handleFieldChange('serialNo', e.value)} placeholder="Serial No" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Purchase Order</label><TextBox value={formData.purchaseOrder} onValueChanged={(e) => handleFieldChange('purchaseOrder', e.value)} placeholder="PO Number" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Pur Date</label><DateBox value={formData.purDate} onValueChanged={(e) => handleFieldChange('purDate', e.value)} displayFormat="MM/dd/yyyy" placeholder="mm/dd/yyyy" height={44} className="popping-input" /></div>

          <div className="w-full"><label className={labelClasses}>DoM</label><DateBox value={formData.dom} onValueChanged={(e) => handleFieldChange('dom', e.value)} displayFormat="MM/dd/yyyy" placeholder="mm/dd/yyyy" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>DoE</label><DateBox value={formData.doe} onValueChanged={(e) => handleFieldChange('doe', e.value)} displayFormat="MM/dd/yyyy" placeholder="mm/dd/yyyy" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Container ID</label><TextBox value={formData.containerId} onValueChanged={(e) => handleFieldChange('containerId', e.value)} placeholder="Container ID" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Barcode / QR Code</label><TextBox value={formData.barcode} onValueChanged={(e) => handleFieldChange('barcode', e.value)} placeholder="Scan or Enter Code" height={44} className="popping-input" /></div>

          <div className="w-full"><label className={labelClasses}>Container Type</label><TextBox value={formData.containerType} onValueChanged={(e) => handleFieldChange('containerType', e.value)} placeholder="Type" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Capacity</label><TextBox value={formData.capacity} onValueChanged={(e) => handleFieldChange('capacity', e.value)} placeholder="Capacity" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Status</label><SelectBox value={formData.status} onValueChanged={(e) => handleFieldChange('status', e.value)} dataSource={statusOptions} displayExpr="name" valueExpr="id" placeholder="Select Status" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Condition</label><TextBox value={formData.condition} onValueChanged={(e) => handleFieldChange('condition', e.value)} placeholder="Condition" height={44} className="popping-input" /></div>

          <div className="w-full"><label className={labelClasses}>$ Cost</label><TextBox value={formData.totalCost} onValueChanged={(e) => handleFieldChange('totalCost', e.value)} placeholder="Total Cost" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>$ PU</label><TextBox value={formData.spu} placeholder="Auto Calculated" readOnly={true} height={44} className="popping-input bg-slate-100 opacity-80" /></div>
          
          <div className="w-full col-span-1 md:col-span-2">
            <label className={labelClasses}>Attachment</label>
            <div className="flex items-center h-[44px] border-2 border-slate-200 rounded-xl overflow-hidden bg-white hover:border-[#00A3FF] transition-all focus-within:ring-4 focus-within:ring-[#00A3FF]/10 group">
              <button className="h-full px-5 bg-slate-50 hover:bg-slate-100 border-r-2 border-slate-200 text-[13px] font-bold text-slate-700 transition-colors flex items-center gap-2 group-hover:text-[#00A3FF]">
                <Paperclip size={16} /> Choose File
              </button>
              <span className="px-4 text-[13px] font-medium text-slate-400 italic">No file chosen</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTAINER 2: STOCK DETAILS */}
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-2 border-[#00A3FF]/20 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00A3FF] rounded-lg shadow-lg shadow-[#00A3FF]/30">
              <ClipboardList size={18} className="text-white" />
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Stock Details</h3>
          </div>
          <ChevronUp size={20} className="text-[#00A3FF] cursor-pointer hover:scale-110 transition-transform" />
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-6">
          <div className="w-full"><label className={labelClasses}>Min Stock</label><TextBox value={formData.minStock} onValueChanged={(e) => handleFieldChange('minStock', e.value)} placeholder="Min Stock" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Reorder Level</label><TextBox value={formData.reorderLevel} onValueChanged={(e) => handleFieldChange('reorderLevel', e.value)} placeholder="Reorder Level" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Reorder Quantity</label><TextBox value={formData.reorderQuantity} onValueChanged={(e) => handleFieldChange('reorderQuantity', e.value)} placeholder="Reorder Quantity" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Storage Instructions</label><TextBox value={formData.storageInstructions} onValueChanged={(e) => handleFieldChange('storageInstructions', e.value)} placeholder="Storage Instructions" height={44} className="popping-input" /></div>

          <div className="w-full"><label className={labelClasses}>Storage Condition</label><TextBox value={formData.storageCondition} onValueChanged={(e) => handleFieldChange('storageCondition', e.value)} placeholder="Storage Condition" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Last Checked On</label><DateBox value={formData.lastCheckedOn} onValueChanged={(e) => handleFieldChange('lastCheckedOn', e.value)} displayFormat="MM/dd/yyyy" placeholder="mm/dd/yyyy" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Next Check On</label><DateBox value={formData.nextCheckOn} onValueChanged={(e) => handleFieldChange('nextCheckOn', e.value)} displayFormat="MM/dd/yyyy" placeholder="mm/dd/yyyy" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Compliance</label><SelectBox value={formData.compliance} onValueChanged={(e) => handleFieldChange('compliance', e.value)} dataSource={complianceOptions} displayExpr="name" valueExpr="id" placeholder="Select Compliance" height={44} className="popping-input" /></div>
        </div>
      </div>

      {/* CONTAINER 3: INJECTION DETAILS */}
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-2 border-[#00A3FF]/20 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/15 border-b border-[#00A3FF]/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00A3FF] rounded-lg shadow-lg shadow-[#00A3FF]/30">
              <Syringe size={18} className="text-white" />
            </div>
            <h3 className="text-[15px] font-bold text-slate-800 tracking-tight">Injection Details</h3>
          </div>
          <ChevronUp size={20} className="text-[#00A3FF] cursor-pointer hover:scale-110 transition-transform" />
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-6">
          <div className="w-full"><label className={labelClasses}>Allocation</label><TextBox value={formData.allocation} onValueChanged={(e) => handleFieldChange('allocation', e.value)} placeholder="Allocation" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Injection Type</label><TextBox value={formData.injectionType} onValueChanged={(e) => handleFieldChange('injectionType', e.value)} placeholder="Injection Type" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Injection ID</label><TextBox value={formData.injectionId} onValueChanged={(e) => handleFieldChange('injectionId', e.value)} placeholder="Injection ID" height={44} className="popping-input" /></div>
          <div className="w-full"><label className={labelClasses}>Tracking / Location</label><TextBox value={formData.trackingLocation} onValueChanged={(e) => handleFieldChange('trackingLocation', e.value)} placeholder="Tracking / Location" height={44} className="popping-input" /></div>
          <div className="w-full col-span-1 md:col-span-2"><label className={labelClasses}>Adverse Reaction Reports</label><TextBox value={formData.adverseReaction} onValueChanged={(e) => handleFieldChange('adverseReaction', e.value)} placeholder="Adverse Reaction Reports" height={44} className="popping-input" /></div>
        </div>
      </div>

      <style jsx global>{`
        .popping-input {
          border-radius: 0.75rem !important; 
          border: 2px solid #e2e8f0 !important; 
          background-color: #ffffff !important;
          transition: all 0.2s ease-in-out !important;
        }
        .popping-input.dx-state-hover { border-color: #93c5fd !important; }
        .popping-input.dx-state-focused {
          border-color: #00A3FF !important;
          box-shadow: 0 0 0 4px rgba(0, 163, 255, 0.1) !important;
        }
        .dx-texteditor-input {
          padding-left: 16px !important;
          font-weight: 600 !important;
          color: #334155 !important; 
          font-size: 14px !important;
        }
        .dx-placeholder {
          font-size: 14px !important;
          padding-left: 16px !important;
          color: #94a3b8 !important; 
          font-style: italic !important;
          font-weight: 500 !important;
        }
      `}</style>
    </div>
  );
};

export default InventoryAddForm;