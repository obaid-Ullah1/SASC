import React, { useState } from 'react';
import { X, Plus, Beaker } from 'lucide-react';

const AddIngredientForm = ({ onClose, onAdd }) => {
  const CATEGORY_OPTIONS = ["Allergen", "Glycerine", "Bio Logical", "Preservative", "Diluent", "Injections", "Chemicals"];
  const SUB_CATEGORY_OPTIONS = ["Active", "Inactive", "Excipient"];
  const TYPE_OPTIONS = ["Liquid", "Powder", "Gas"];

  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    type: '',
    ingredientName: '',
    scientificName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.ingredientName) return;

    onAdd({
      id: Date.now(),
      ...formData
    });
    
    setFormData({
      category: '',
      subCategory: '',
      type: '',
      ingredientName: '',
      scientificName: ''
    });
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-xl shadow-lg mb-8 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-400">
      
      {/* Header Section: Light Blue Gradient */}
      <div className="bg-[#E0F2FE] px-6 py-3 flex justify-between items-center border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="bg-[#0ea5e9] p-1.5 rounded-lg shadow-blue-200 shadow-lg">
            <Beaker size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#0369a1] font-bold text-[14px] leading-tight tracking-tight">
              Add Ingredient
            </h3>
            <span className="text-[10px] text-[#38bdf8] font-black uppercase tracking-widest">
              Mapping Module
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          type="button"
          className="bg-[#ef4444] hover:bg-red-600 text-white rounded-md p-1 transition-all shadow-md active:scale-90"
        >
          <X size={16} strokeWidth={3} />
        </button>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="p-6 flex flex-wrap items-end gap-x-4 gap-y-6 bg-white">
        
        {/* Category Select */}
        <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <span className="text-blue-500">≡</span> Select Category
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-600 transition-all appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394a3b8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
          >
            <option value="">-- Choose Category --</option>
            {CATEGORY_OPTIONS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sub Category Select */}
        <div className="flex flex-col gap-2 flex-1 min-w-[180px]">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
            Sub Category Name
          </label>
          <select
            value={formData.subCategory}
            onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-slate-600 transition-all appearance-none"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2394a3b8%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpolyline points=%276 9 12 15 18 9%27%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
          >
            <option value="">-- Select Sub Category --</option>
            {SUB_CATEGORY_OPTIONS.map(sub => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Ingredients Input */}
        <div className="flex flex-col gap-2 flex-[1.5] min-w-[200px]">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
            Ingredients
          </label>
          <input
            type="text"
            required
            placeholder="Enter Name..."
            value={formData.ingredientName}
            onChange={(e) => setFormData({...formData, ingredientName: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder:text-slate-400 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-slate-50/30 focus:bg-white"
          />
        </div>

        {/* Scientific Name Input */}
        <div className="flex flex-col gap-2 flex-[1.5] min-w-[200px]">
          <label className="text-[11px] font-black text-slate-700 uppercase tracking-wider">
            Scientific Name
          </label>
          <input
            type="text"
            placeholder="Enter Scientific Name..."
            value={formData.scientificName}
            onChange={(e) => setFormData({...formData, scientificName: e.target.value})}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-[13px] placeholder:text-slate-400 placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all bg-slate-50/30 focus:bg-white"
          />
        </div>

        {/* UPDATED BUTTON COLOR: Vibrant Blue with Shadow Drop */}
        <button
          type="submit"
          className="bg-[#00A3FF] hover:bg-[#0086D1] text-white font-black py-2.5 px-8 rounded-xl text-[13px] transition-all flex items-center justify-center gap-2 h-[42px] min-w-[130px] shadow-lg shadow-blue-200 active:scale-95 border-b-2 border-blue-600/20 uppercase tracking-wide"
        >
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddIngredientForm;