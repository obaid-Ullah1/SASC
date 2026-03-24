import React, { useState } from 'react';
import { X, Tag, ListFilter, ChevronDown, Database, PenTool } from 'lucide-react';

const TypeForm = ({ onClose, onAdd }) => {
  // Mapping Category to Sub-Categories
  const SUB_CATEGORY_MAPPING = {
    "Allergen": [
      "Pollens", "Indoor Allergens", "Insect Venoms", 
      "Food Allergens", "Regional / Environmental Allergens", "Animal"
    ],
    "Glycerine": [],
    "Bio Logical": [
      "Genentech / Novartis", "Sanofi / Regeneron", 
      "GlaxoSmithKline (GSK)", "AstraZeneca", 
      "Teva Pharmaceuticals", "Amgen / AstraZeneca"
    ],
    "Preservative": ["test"],
    "Diluent": [],
    "Injections": [],
    "Chemicals": [
      "Personal Care Chemicals", "Fragrance Chemicals", 
      "Industrial Chemicals", "Pharmaceutical Chemicals", "Metal Compounds"
    ]
  };

  const CATEGORY_OPTIONS = Object.keys(SUB_CATEGORY_MAPPING);

  const [formData, setFormData] = useState({
    category: '',
    subCategory: '', 
    typeName: '',
    siteLabel: ''
  });

  const handleCategoryChange = (val) => {
    setFormData({
      ...formData,
      category: val,
      subCategory: '' // Reset sub-category when parent category changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.subCategory || !formData.typeName.trim()) return;

    onAdd({
      parentSubCategory: formData.subCategory, // Group title
      name: formData.typeName.trim(),          // Row name
      label: formData.siteLabel.trim(),         // Site Label
      category: formData.category
    });
    
    onClose();
  };

  // Get available sub-categories based on selected category
  const availableSubCategories = formData.category ? SUB_CATEGORY_MAPPING[formData.category] : [];

  return (
    <div className="mb-8 bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.15)] border-2 border-[#00A3FF]/20 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#00A3FF]/10 border-b border-[#00A3FF]/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#00A3FF] rounded-xl shadow-lg shadow-[#00A3FF]/30">
            <Tag size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-[16px] font-black text-slate-800 tracking-tight leading-none">
              Add Sub Category Type
            </h3>
            <p className="text-[10px] text-[#00A3FF] font-bold uppercase tracking-[0.15em] mt-1">
              Inventory Mapping System
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          type="button"
          className="p-2 bg-[#ef4444] text-white rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-90"
        >
          <X size={18} strokeWidth={3} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-8 bg-gradient-to-br from-white via-white to-blue-50/30">
        <div className="space-y-8">
          
          {/* Row 1: Category & Sub-Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1">
                <ListFilter size={15} className="text-[#00A3FF]" />
                <label className="text-[12px] font-black text-slate-600 uppercase tracking-widest">
                  Select Category
                </label>
              </div>
              <div className="relative">
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 appearance-none font-semibold"
                >
                  <option value="" disabled>-- Choose Category --</option>
                  {CATEGORY_OPTIONS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1">
                <Database size={15} className="text-[#00A3FF]" />
                <label className={`text-[12px] font-black uppercase tracking-widest ${!formData.category ? 'text-slate-300' : 'text-slate-600'}`}>
                  Select Sub Category
                </label>
              </div>
              <div className="relative">
                <select
                  required
                  disabled={!formData.category || availableSubCategories.length === 0}
                  value={formData.subCategory}
                  onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                  className="w-full px-5 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 appearance-none font-semibold disabled:bg-slate-50 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!formData.category ? "Select Category First" : availableSubCategories.length === 0 ? "No Sub Categories Found" : "-- Choose Sub Category --"}
                  </option>
                  {availableSubCategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>
          </div>

          {/* Row 2: Type Identity & Site Label */}
          <div className="pt-8 border-t-2 border-slate-100 flex flex-col md:flex-row items-end gap-6">
            <div className="flex-1 space-y-3 w-full">
              <div className="flex items-center gap-2 ml-1">
                <PenTool size={15} className="text-[#00A3FF]" />
                <label className="text-[12px] font-black text-slate-600 uppercase tracking-widest">
                  Type Name
                </label>
              </div>
              <input
                type="text"
                required
                placeholder="Enter specific type..."
                value={formData.typeName}
                onChange={(e) => setFormData({...formData, typeName: e.target.value})}
                className="w-full px-6 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 font-semibold"
              />
            </div>

            <div className="w-full md:w-[180px] space-y-3">
              <label className="text-[12px] font-black text-slate-600 uppercase tracking-widest ml-1">
                Site Label
              </label>
              <input
                type="text"
                placeholder="Label"
                value={formData.siteLabel}
                onChange={(e) => setFormData({...formData, siteLabel: e.target.value})}
                className="w-full px-6 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-[14px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto px-12 h-[54px] bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[15px] font-black rounded-2xl transition-all shadow-[0_10px_25px_rgba(0,163,255,0.4)] hover:shadow-[0_15px_30px_rgba(0,163,255,0.5)] active:scale-95 flex items-center justify-center gap-3 shrink-0"
            >
              Add Record
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default TypeForm;