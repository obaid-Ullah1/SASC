import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Save, Edit, ChevronDown } from 'lucide-react';

const AddPatchForm = ({ isOpen, onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    testCategory: '',
    testType: '',
    panel: '',
    category: '',
    subCategory: '',
    type: '',
    ingredient: ''
  });

  // --- 1. DEPENDENCY DICTIONARIES ---

  // Test Type depends on Test Category
  const testTypeOptions = {
    Allergy: ["SPT-90", "SPT-Food", "LIMITED/PEDS", "SPT-Food 1"],
    Chemical: ["Patch Test", "Standard Chemical"]
  };

  // Panel depends on Test Type (Mapped from PatchTable)
  const panelOptions = {
    "SPT-90": [
      "Extract Tree (T1)", "Extract Tree (T2)", "Extract Tree (T3)",
      "Extract Grass (G1)", "Extract Weed (W1)", "Extract Weed (W2)",
      "Extract Mold (M1)", "Extract Epithelia (E1)", "Extract Food (F01)"
    ],
    "SPT-Food": [
      "Patch Food (F1)", "Patch Food (F2)", "Patch Food (F3)", 
      "Patch Food (F4)", "Patch Food (F5)", "Patch Food (F6)", 
      "Patch Food (F7)", "Patch Food (F8)", "Patch Food (F9)"
    ],
    "LIMITED/PEDS": [
      "LIMITED (L1)", "LIMITED (L2)", "LIMITED (L3)", 
      "LIMITED (L4)", "LIMITED (L5)", "LIMITED (L6)", 
      "PEDIATRIC (P1)", "PEDIATRIC (P2)"
    ],
    "SPT-Food 1": [
      "FOOD EXTRACT (F1)", "FOOD EXTRACT (F2)", "FOOD EXTRACT (F3)"
    ]
  };

  // Sub Category depends on Category
  const subCategoryOptions = {
    Allergen: ["Trees", "Weeds", "Grasses", "Molds", "Epidermals", "Foods"],
    Biological: ["Vaccines", "Antisera", "Blood Products"],
    Chemical: ["Metals", "Fragrances", "Preservatives", "Cosmetic/Hygiene"],
    Glycerine: ["Standard", "Phenolated"],
    Preservative: ["Phenol", "Thimerosal"],
    Diluent: ["Normal Saline", "HSA", "Sterile Water"],
    Injections: ["Subcutaneous", "Intramuscular"]
  };

  const categoryList = [
    "Glycerine", "Allergen", "Biological", "Preservative", 
    "Diluent", "Injections", "Chemical"
  ];


  // --- 2. EFFECT HOOKS ---
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          testCategory: editData.testCategory || 'Allergy',
          testType: editData.testType || 'SPT-90',
          panel: editData.panel || 'Extract Tree (T1)',
          category: editData.category || 'Allergen',
          subCategory: editData.subCategory || 'Trees',
          type: editData.type || 'Extract',
          ingredient: editData.ingredient || ''
        });
      } else {
        setFormData({
          testCategory: 'Allergy',
          testType: '',
          panel: '',
          category: '',
          subCategory: '',
          type: '',
          ingredient: ''
        });
      }
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;


  // --- 3. CASCADING CHANGE HANDLER ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };

      // If Test Category changes, reset Test Type and Panel
      if (name === 'testCategory') {
        newData.testType = '';
        newData.panel = '';
      }
      
      // If Test Type changes, reset Panel
      if (name === 'testType') {
        newData.panel = '';
      }

      // If Category changes, reset Sub Category
      if (name === 'category') {
        newData.subCategory = '';
      }

      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      groupTitle: formData.panel || formData.testType, // Maps gracefully to table
      label: formData.type || 'N/A'
    }); 
  };

  const selectStyles = "appearance-none w-full h-[40px] px-4 bg-white border-2 border-slate-200 rounded-lg text-[12px] font-bold text-slate-700 hover:border-[#00A3FF] focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all outline-none cursor-pointer disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";

  // Dynamic dropdown arrays based on current selections
  const currentTestTypes = testTypeOptions[formData.testCategory] || [];
  const currentPanels = panelOptions[formData.testType] || [];
  const currentSubCategories = subCategoryOptions[formData.category] || [];

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg m-4 overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300 shrink-0">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            {editData ? (
              <Edit size={16} className="text-amber-500" strokeWidth={2.5} />
            ) : (
              <PlusCircle size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            )}
          </div>
          <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
            {editData ? 'Update Patch Record' : 'Manage Patches'}
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

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="flex flex-col bg-white/50 p-5">
        
        {/* TOP ROW: 6 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 mb-5">
          
          <InputGroup label="Test Category">
            <div className="relative group">
              <select name="testCategory" value={formData.testCategory} onChange={handleChange} className={selectStyles}>
                <option value="">-- Select --</option>
                <option value="Allergy">Allergy</option>
                <option value="Chemical">Chemical</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] pointer-events-none transition-colors" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Test Type">
            <div className="relative group">
              <select 
                name="testType" 
                value={formData.testType} 
                onChange={handleChange} 
                className={selectStyles}
                disabled={!formData.testCategory}
              >
                <option value="">-- Select Type --</option>
                {currentTestTypes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] pointer-events-none transition-colors" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Panel">
            <div className="relative group">
              <select 
                name="panel" 
                value={formData.panel} 
                onChange={handleChange} 
                className={selectStyles}
                disabled={!formData.testType}
              >
                <option value="">-- Select Panel --</option>
                {currentPanels.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] pointer-events-none transition-colors" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Category">
            <div className="relative group">
              <select name="category" value={formData.category} onChange={handleChange} className={selectStyles}>
                <option value="">-- Select Category --</option>
                {categoryList.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] pointer-events-none transition-colors" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Sub Category">
            <div className="relative group">
              <select 
                name="subCategory" 
                value={formData.subCategory} 
                onChange={handleChange} 
                className={selectStyles}
                disabled={!formData.category}
              >
                <option value="">-- Sub Category --</option>
                {currentSubCategories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] pointer-events-none transition-colors" size={14} />
            </div>
          </InputGroup>

          <InputGroup label="Type">
            <div className="relative group">
              <select name="type" value={formData.type} onChange={handleChange} className={selectStyles}>
                <option value="">-- Select Type --</option>
                <option value="Extract">Extract</option>
                <option value="Raw">Raw</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-[#00A3FF] pointer-events-none transition-colors" size={14} />
            </div>
          </InputGroup>

        </div>

        {/* BOTTOM ROW: Ingredients (Left) and Buttons (Right) */}
        <div className="flex flex-col sm:flex-row items-end justify-between gap-5 mt-1">
          
          {/* Ingredients Container */}
          <div className="w-full sm:w-[350px]">
            <InputGroup label="Ingredient Name">
              <input 
                type="text"
                name="ingredient"
                value={formData.ingredient}
                onChange={handleChange}
                placeholder="Type ingredient name..."
                className="w-full h-[40px] px-4 border-2 border-slate-200 bg-white rounded-lg text-[12px] font-bold text-slate-700 focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 transition-all outline-none"
              />
            </InputGroup>
          </div>

          {/* Action Buttons Container - Right aligned */}
          <div className="flex items-center justify-end gap-3 w-full sm:w-auto shrink-0">
            <button 
              type="button"
              onClick={onClose}
              className="h-[40px] px-6 rounded-lg text-[11px] font-black uppercase text-slate-500 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors tracking-widest border-2 border-slate-200 bg-white"
            >
              Discard
            </button>
            
            <button 
              type="submit"
              className={`h-[40px] px-8 rounded-lg text-[12px] font-black uppercase tracking-wider text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
                editData ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#00A3FF] hover:bg-[#008CE6]'
              }`}
            >
              {editData ? (
                <><Edit size={14} strokeWidth={3} /> Update Patch</>
              ) : (
                <><PlusCircle size={14} strokeWidth={3} /> Add Patch</>
              )}
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

export default AddPatchForm;