import React, { useState } from 'react';
import { X, Plus, Save } from 'lucide-react';
import { TextBox, NumberBox, Switch, SelectBox } from 'devextreme-react';

const AddMenuForm = ({ activeTab, onSave, onClose }) => {
  // Local state for form fields
  const [formData, setFormData] = useState({
    parentId: null,
    subMenuName: '',
    menuName: '',
    menuUrl: '',
    menuIcon: 'fa-user-injured',
    iconColor: '',
    sortOrder: 16,
    status: true,
  });

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  // Mock data for the 'Menu' dropdown in Sub-Menu mode
  const parentMenus = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Management' },
    { id: 3, name: 'Setting' }
  ];

  return (
    <div className="w-full bg-white border border-slate-300 rounded-lg shadow-md mb-6 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      
      {/* HEADER SECTION */}
      <div className="px-4 py-2 border-b border-slate-200 flex justify-between items-center bg-white">
        <h3 className="text-[15px] font-bold text-slate-800">
          {activeTab === 'Menu' ? 'Add Menu' : 'Add Sub Menu'}
        </h3>
        <button 
          onClick={onClose}
          className="w-7 h-6 flex items-center justify-center rounded bg-[#EF233C] text-white hover:bg-red-600 transition-all"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      <div className="p-5">
        {activeTab === 'Menu' ? (
          /* ==========================================
             DESIGN 1: MAIN MENU (3-Column)
             ========================================== */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5 items-start">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-800">Menu Name</label>
              <TextBox placeholder="Menu Name" value={formData.menuName} onValueChange={(v) => handleFieldChange('menuName', v)} height={38} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-800">Menu URL</label>
              <TextBox placeholder="Menu URL" value={formData.menuUrl} onValueChange={(v) => handleFieldChange('menuUrl', v)} height={38} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-800">Menu Icon</label>
              <TextBox placeholder="fa-user-injured" value={formData.menuIcon} onValueChange={(v) => handleFieldChange('menuIcon', v)} height={38} />
              <span className="text-[11px] text-slate-500 italic mt-0.5">FontAwesome class (without <span className="text-pink-500 font-bold">fas</span>)</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-800">Icon Color</label>
              <TextBox placeholder="Color Code" value={formData.iconColor} onValueChange={(v) => handleFieldChange('iconColor', v)} height={38} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-slate-800">Sort Order</label>
              <div className="bg-[#6B7280] rounded-md h-[38px] flex items-center px-1 overflow-hidden">
                <NumberBox value={formData.sortOrder} onValueChange={(v) => handleFieldChange('sortOrder', v)} className="custom-sort-input" mode="number" />
              </div>
            </div>
            <div className="flex items-end gap-10 h-full pb-1">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Status</label>
                <div className="flex items-center gap-2">
                  <Switch value={formData.status} onValueChange={(v) => handleFieldChange('status', v)} />
                  <span className={`text-[13px] font-semibold ${formData.status ? 'text-slate-600' : 'text-slate-400'}`}>{formData.status ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <button onClick={() => onSave(formData)} className="flex-1 bg-[#1D9461] hover:bg-[#167a4f] text-white font-bold h-[38px] px-6 rounded-md flex items-center justify-center gap-3 transition-all">
                Add <Save size={18} fill="currentColor" strokeWidth={1} />
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================
             DESIGN 2: SUB MENU (4-Column)
             ========================================== */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 items-start">
              {/* Menu Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Menu</label>
                <SelectBox 
                  dataSource={parentMenus} 
                  displayExpr="name" 
                  valueExpr="id" 
                  placeholder="Select Menu" 
                  height={38} 
                  onValueChange={(v) => handleFieldChange('parentId', v)}
                />
              </div>

              {/* Sub Menu Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Sub Menu Name</label>
                <TextBox 
                  placeholder="Enter name" 
                  value={formData.subMenuName} 
                  onValueChange={(v) => handleFieldChange('subMenuName', v)} 
                  height={38} 
                />
              </div>

              {/* URL */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">URL</label>
                <TextBox 
                  placeholder="/url" 
                  value={formData.menuUrl} 
                  onValueChange={(v) => handleFieldChange('menuUrl', v)} 
                  height={38} 
                />
              </div>

              {/* Sort Order */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Sort Order</label>
                <div className="bg-[#6B7280] rounded-md h-[38px] flex items-center px-1">
                  <NumberBox 
                    value={formData.sortOrder} 
                    onValueChange={(v) => handleFieldChange('sortOrder', v)} 
                    className="custom-sort-input" 
                    mode="number"
                  />
                </div>
              </div>
            </div>

            {/* Bottom row for Status and Add Button */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-slate-800">Status</label>
                <div className="flex items-center gap-2">
                  <Switch 
                    value={formData.status} 
                    onValueChange={(v) => handleFieldChange('status', v)} 
                  />
                  <span className={`text-[13px] font-semibold ${formData.status ? 'text-slate-600' : 'text-slate-400'}`}>
                    {formData.status ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => onSave(formData)} 
                className="bg-[#1D9461] hover:bg-[#167a4f] text-white font-bold h-[38px] px-8 rounded-md flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Plus size={20} strokeWidth={3} />
                <span className="text-[15px]">Add</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-sort-input { background: transparent !important; border: none !important; width: 100%; }
        .custom-sort-input .dx-texteditor-input { color: white !important; text-align: left; padding: 0 10px !important; font-weight: 500 !important; }
        .custom-sort-input .dx-texteditor-container { background: transparent !important; border: none !important; }
        .dx-texteditor.dx-editor-outlined { border-radius: 6px !important; border-color: #d1d5db !important; }
        .dx-switch-on-handle { background-color: #1D68F1 !important; }
      `}</style>
    </div>
  );
};

export default AddMenuForm;