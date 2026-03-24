import React, { useState, useEffect } from 'react';
import { X, Beaker, RefreshCw } from 'lucide-react';

const AddIngredientForm = ({ onClose, onAdd, initialData }) => {
  // --- 3-Tier Dynamic Mapping ---
  const MASTER_MAPPING = {
    "Allergen": {
      "Pollens": ["Grass", "Tree", "Weed"],
      "Indoor Allergens": ["Mite", "Fungus/Mold"],
      "Insect Venoms": ["Bee", "Wasp", "Hornet", "Yellow jacket", "Fire ant"],
      "Food Allergens": ["Animal Proteins", "Eggs", "Tree Nuts", "Fish", "Fruit", "Meat"],
      "Regional / Environmental Allergens": ["Cockroach", "Fungal spores", "Local pollens"],
      "Animal": ["Animal dander", "Epithelia"]
    },
    "Bio Logical": {
      "Genentech / Novartis": ["Xolair® (Omalizumab)"],
      "Sanofi / Regeneron": ["Dupixent® (Dupilumab)"],
      "GlaxoSmithKline (GSK)": ["Nucala® (Mepolizumab)"],
      "AstraZeneca": ["Fasenra® (Benralizumab)"],
      "Teva Pharmaceuticals": ["Cinqair®"],
      "Amgen / AstraZeneca": ["Tezspire®"]
    },
    "Chemicals": {
      "Personal Care Chemicals": ["Cosmetic", "Hygiene", "Skin Care"],
      "Fragrance Chemicals": ["Fragrance"],
      "Industrial Chemicals": ["Industrial", "Miscellaneous"],
      "Pharmaceutical Chemicals": ["Medicinal"],
      "Metal Compounds": ["Metal"]
    },
    "Preservative": { "test": ["Standard Test"] },
    "Glycerine": {},
    "Diluent": {},
    "Injections": {}
  };

  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    type: '',
    ingredientName: '',
    scientificName: ''
  });

  // ✅ IMPROVED LOGIC: Populate form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || '',
        subCategory: initialData.subCategory || '',
        // Mapping parentSubCategory from the table back to the 'type' field in the form
        type: initialData.parentSubCategory || '', 
        ingredientName: initialData.name || '',
        scientificName: initialData.scientific || ''
      });
    } else {
      setFormData({ category: '', subCategory: '', type: '', ingredientName: '', scientificName: '' });
    }
  }, [initialData]);

  // Derived lists for dropdowns
  const categories = Object.keys(MASTER_MAPPING);
  const subCategories = formData.category ? Object.keys(MASTER_MAPPING[formData.category] || {}) : [];
  const types = (formData.category && formData.subCategory) ? (MASTER_MAPPING[formData.category][formData.subCategory] || []) : [];

  const handleCategoryChange = (val) => {
    setFormData({ ...formData, category: val, subCategory: '', type: '' });
  };

  const handleSubCategoryChange = (val) => {
    setFormData({ ...formData, subCategory: val, type: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.ingredientName) return;

    // Send data back to Category.jsx handleAddNewData
    onAdd({
      category: formData.category,
      subCategory: formData.subCategory,
      parentSubCategory: formData.type || formData.subCategory || "General", // Used as the Group Title in the table
      name: formData.ingredientName.trim(),
      scientific: formData.scientificName.trim(),
    });
    
    onClose();
  };

  const selectStyle = {
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394a3b8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.75rem center',
    backgroundSize: '1rem'
  };

  return (
    <div className="w-full bg-white border border-slate-300 rounded-xl shadow-lg mb-8 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-400">
      
      {/* Header Section */}
      <div className="bg-[#E0F2FE] px-6 py-3 flex justify-between items-center border-b border-blue-200">
        <div className="flex items-center gap-3">
          <div className="bg-[#0ea5e9] p-1.5 rounded-lg shadow-blue-200 shadow-lg">
            {initialData ? <RefreshCw size={18} className="text-white" /> : <Beaker size={18} className="text-white" />}
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#0369a1] font-bold text-[14px] leading-tight tracking-tight">
              {initialData ? 'Update Ingredient Mapping' : 'Add New Ingredient'}
            </h3>
            <span className="text-[10px] text-[#38bdf8] font-black uppercase tracking-widest">Inventory System</span>
          </div>
        </div>
        <button onClick={onClose} className="bg-[#ef4444] text-white rounded-md p-1 hover:bg-red-600 shadow-md active:scale-90">
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-5 flex flex-wrap items-end gap-x-3 gap-y-5 bg-white">
        
        {/* 1. Category */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
          <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Category</label>
          <select
            required
            value={formData.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[12.5px] font-bold text-slate-700 appearance-none outline-none focus:border-blue-400"
            style={selectStyle}
          >
            <option value="">-- Category --</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* 2. Sub-Category */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
          <label className={`text-[10px] font-black uppercase tracking-wider ${!formData.category ? 'text-slate-300' : 'text-slate-700'}`}>Sub Category</label>
          <select
            disabled={!formData.category || subCategories.length === 0}
            value={formData.subCategory}
            onChange={(e) => handleSubCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[12.5px] font-bold text-slate-700 appearance-none outline-none focus:border-blue-400 disabled:bg-slate-50"
            style={selectStyle}
          >
            <option value="">{subCategories.length === 0 ? "N/A" : "-- Sub Category --"}</option>
            {subCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
          </select>
        </div>

        {/* 3. Type */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-[160px]">
          <label className={`text-[10px] font-black uppercase tracking-wider ${!formData.subCategory ? 'text-slate-300' : 'text-slate-700'}`}>Type</label>
          <select
            disabled={!formData.subCategory || types.length === 0}
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[12.5px] font-bold text-slate-700 appearance-none outline-none focus:border-blue-400 disabled:bg-slate-50"
            style={selectStyle}
          >
            <option value="">{types.length === 0 ? "N/A" : "-- Type --"}</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* 4. Ingredient Name */}
        <div className="flex flex-col gap-1.5 flex-[1.2] min-w-[180px]">
          <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Ingredient Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Grass Mix"
            value={formData.ingredientName}
            onChange={(e) => setFormData({...formData, ingredientName: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[12.5px] font-bold placeholder:text-slate-300 outline-none focus:border-blue-400"
          />
        </div>

        {/* 5. Scientific Name */}
        <div className="flex flex-col gap-1.5 flex-[1.2] min-w-[180px]">
          <label className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Scientific Name</label>
          <input
            type="text"
            placeholder="e.g. Poaceae"
            value={formData.scientificName}
            onChange={(e) => setFormData({...formData, scientificName: e.target.value})}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-[12.5px] font-bold placeholder:text-slate-300 outline-none focus:border-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#008bdb] text-white font-black py-2 px-6 rounded-lg text-[12px] shadow-lg shadow-blue-100 active:scale-95 uppercase tracking-widest h-[38px] min-w-[120px] transition-all"
        >
          {initialData ? 'Update Record' : 'Add Record'}
        </button>
      </form>
    </div>
  );
};

export default AddIngredientForm;