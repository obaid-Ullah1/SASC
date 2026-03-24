import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save, Edit, ChevronDown } from 'lucide-react';

const AddPanelForm = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    category: 'Allergy',
    testType: '🧩 SPT-90',
    panelName: '',
    panelCode: '',
    group: '',
    sortOrder: '',
    description: '',
    isActive: true
  });

  const categoryLogic = {
    Allergy: ['🧩 SPT-90', '🧩 SPT-Food', '🧩 LIMITED/PEDS', '🧩 SPT-Food 1'],
    Chemical: ['Patch Test']
  };

  // Sync form with editData whenever editData or isOpen changes
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          category: editData.category === 'ALLERGY' ? 'Allergy' : 'Chemical',
          testType: editData.testType || '',
          panelName: editData.name || '', // Mapping 'name' from table to 'panelName'
          panelCode: editData.code || '', // Mapping 'code' from table to 'panelCode'
          group: editData.group || '',
          sortOrder: editData.sortOrder || '',
          description: editData.description || '',
          isActive: editData.status === 'Active'
        });
      } else {
        // Reset to default for Add Mode
        setFormData({
          category: 'Allergy',
          testType: '🧩 SPT-90',
          panelName: '',
          panelCode: '',
          group: '',
          sortOrder: '',
          description: '',
          isActive: true
        });
      }
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'category') newData.testType = categoryLogic[value][0];
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.panelName) return;
    onAdd(formData);
  };

  const selectStyles = "appearance-none w-full h-[40px] px-4 bg-white border-2 border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:border-[#00A3FF] focus:border-[#00A3FF] transition-all outline-none cursor-pointer";
  const inputStyles = "w-full h-[40px] px-4 border-2 border-slate-200 bg-white rounded-lg text-[12px] font-semibold text-slate-700 focus:border-[#00A3FF] transition-all outline-none";

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg m-4 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300 shrink-0">
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editData ? <Edit size={16} className="text-amber-500" /> : <PlusCircle size={16} className="text-[#00A3FF]" />}
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            {editData ? 'Update Panel Record' : 'Create New Panel'}
          </h3>
        </div>
        <button type="button" onClick={onClose} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm">
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 bg-white/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-end">
          <InputGroup label="Category">
            <div className="relative group">
              <select name="category" value={formData.category} onChange={handleChange} className={selectStyles}>
                <option value="Allergy">Allergy</option>
                <option value="Chemical">Chemical</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Test Type">
            <div className="relative group">
              <select name="testType" value={formData.testType} onChange={handleChange} className={selectStyles}>
                {categoryLogic[formData.category].map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Panel Name">
            <input type="text" name="panelName" placeholder="Name..." value={formData.panelName} onChange={handleChange} className={inputStyles} />
          </InputGroup>

          <InputGroup label="Panel Code">
            <input type="text" name="panelCode" placeholder="CODE" value={formData.panelCode} onChange={handleChange} className={`${inputStyles} text-[#00A3FF] font-bold uppercase`} />
          </InputGroup>

          <InputGroup label="Group">
            <select name="group" value={formData.group} onChange={handleChange} className={selectStyles}>
              <option value="">Select Group</option>
              <option value="Group1">Group 1</option>
              <option value="Food Group">Food Group</option>
              <option value="Pediatric">Pediatric</option>
            </select>
          </InputGroup>

          <InputGroup label="Sort">
            <input type="number" name="sortOrder" value={formData.sortOrder} onChange={handleChange} className={inputStyles} />
          </InputGroup>

          <InputGroup label="Description">
            <input type="text" name="description" value={formData.description} onChange={handleChange} className={inputStyles} />
          </InputGroup>
        </div>

        <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
            className={`h-[40px] px-5 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shrink-0 border-2 ${
              formData.isActive ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${formData.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {formData.isActive ? 'Active' : 'Inactive'}
          </button>

          <div className="flex items-center gap-5">
            <button type="button" onClick={onClose} className="text-[11px] font-black uppercase text-slate-400 hover:text-rose-500 transition-colors">Discard</button>
            <button type="submit" className={`${editData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00A3FF] hover:bg-[#008CE6]'} text-white h-[40px] px-10 rounded-lg font-black text-[11px] uppercase shadow-md flex items-center justify-center gap-2`}>
              <Save size={14} strokeWidth={3} /> {editData ? 'Update Record' : 'Save Record'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const InputGroup = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

export default AddPanelForm;