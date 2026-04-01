import React, { useState, useRef, useEffect } from 'react';
import { Pill, Paperclip, X, ChevronDown, Pencil, Save } from 'lucide-react';
import AttachmentModal from './AttachmentModal';

// --- DATA LISTS ---
const INJECTIONS_LIST = [
  "TREE MIX 1", "TREE MIX 2", "GRASS MIX", "WEED MIX", "MOLD MIX", 
  "STD MIX 1", "STD MIX 2", "STD MIX 3", "STD MIX 4", "AIT MIX 1", 
  "AIT MIX 2", "AIT MIX 3", "AIT MIX 4", "CUSTOM Mix 1", "CUSTOM 1", 
  "CUSTOM Mix 4", "CUSTOM 2", "CUSTOM Mix 4/2", "CUSTOM 4", 
  "CUSTOM Mix 1/2", "CUSTOM Mix 1/3", "SAG1-01/26/A", "SAG1-01/26/B", 
  "SAG1-01/26/C", "Test1", "SAG1-01/26/D"
];

const CATEGORIES_LIST = [
  "TREE MIX 1", "TREE MIX 2", "GRASS MIX", "WEED MIX", "MOLD MIX", 
  "STD MIX 1", "STD MIX 2", "STD MIX 3", "STD MIX 4", "AIT MIX 1", 
  "AIT MIX 2", "AIT MIX 3", "AIT MIX 4", "CUSTOM Mix 1", "CUSTOM 1"
];

const SUB_CATEGORIES_LIST = ["Sub Category 1", "Sub Category 2", "Sub Category 3"];
const TYPES_LIST = ["Type A", "Type B", "Type C"];
const INGREDIENTS_LIST = [
  "Acacia", "Alder, Red", "Ash, White", "Beech, American", 
  "Box Elder", "Cat", "Cedar, Mountain", "Cocklebur", "Diluent"
];

const CompositionAdd = ({ onClose, onAdd, onUpdate, editingItem }) => {
  // Form State
  const [selectedInjection, setSelectedInjection] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  
  // UI State
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isEditing = !!editingItem;

  // POPULATE FORM ON EDIT
  useEffect(() => {
    if (editingItem) {
      // Map the detail row data back to the form fields
      setSelectedInjection(editingItem.data.ingredient || "");
      setSelectedCategory(editingItem.mixName || "");
      // Other fields can be reset or mapped if they exist in your data structure
      setSelectedSubCategory("");
      setSelectedType("");
      setSelectedIngredients([]);
    } else {
      // Clear form for fresh Add
      setSelectedInjection("");
      setSelectedCategory("");
      setSelectedSubCategory("");
      setSelectedType("");
      setSelectedIngredients([]);
    }
  }, [editingItem]);

  // Close multi-select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsIngredientsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIngredientToggle = (ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient) 
        : [...prev, ingredient]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedInjection || !selectedCategory) {
      alert("Please select at least an Injection and a Category.");
      return;
    }
    
    const formData = { 
      injection: selectedInjection, 
      category: selectedCategory,
      subCategory: selectedSubCategory,
      type: selectedType,
      ingredients: selectedIngredients
    };

    if (isEditing) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <>
      <div className="bg-white border-2 border-sky-200 rounded-xl shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-visible mx-5 mt-4">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-3 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              {isEditing ? (
                <Pencil size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
              ) : (
                <Pill size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
              )}
            </div>
            <h3 className="font-black text-[#00A3FF] text-[14px] tracking-wide uppercase leading-tight">
              {isEditing ? 'Update Composition' : 'Manage Composition'}
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            {!isEditing && (
              <button 
                type="button"
                onClick={() => setIsAttachmentModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#00A3FF] text-[#00A3FF] rounded-full text-[11px] font-black uppercase tracking-wider hover:bg-sky-50 transition-all shadow-sm"
              >
                <Paperclip size={14} strokeWidth={2.5} />
                Attachment
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-white text-slate-400 border border-slate-200 rounded-md hover:bg-rose-500 hover:text-white hover:border-rose-500 p-1.5 transition-all shadow-sm"
            >
              <X size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-5 bg-slate-50/50">
          <div className="flex flex-col gap-5">
            
            {/* FIELDS */}
            <div className="flex flex-wrap md:flex-nowrap items-start gap-4 w-full">
              
              <div className="w-full md:w-48 flex flex-col gap-1.5 shrink-0">
                <label className="text-[12px] font-black text-[#1e293b] ml-1 tracking-wide">Injection</label>
                <select 
                  value={selectedInjection}
                  onChange={(e) => setSelectedInjection(e.target.value)}
                  className="w-full h-[38px] border border-slate-300 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 transition-all bg-white shadow-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                >
                  <option value="">-- Select --</option>
                  {INJECTIONS_LIST.map((inj) => <option key={inj} value={inj}>{inj}</option>)}
                </select>
              </div>

              <div className="w-full md:w-48 flex flex-col gap-1.5 shrink-0">
                <label className="text-[12px] font-black text-[#1e293b] ml-1 tracking-wide">Category (Mix)</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-[38px] border border-slate-300 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 transition-all bg-white shadow-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                >
                  <option value="">-- Select Category --</option>
                  {CATEGORIES_LIST.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="w-full md:w-48 flex flex-col gap-1.5 shrink-0">
                <label className="text-[12px] font-black text-[#1e293b] ml-1 tracking-wide">Sub Category</label>
                <select 
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  className="w-full h-[38px] border border-slate-300 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 transition-all bg-white shadow-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                >
                  <option value="">-- Select --</option>
                  {SUB_CATEGORIES_LIST.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                </select>
              </div>

              <div className="w-full md:w-48 flex flex-col gap-1.5 shrink-0">
                <label className="text-[12px] font-black text-[#1e293b] ml-1 tracking-wide">Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full h-[38px] border border-slate-300 rounded-lg px-3 text-[13px] font-semibold text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 transition-all bg-white shadow-sm appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                >
                  <option value="">-- Select --</option>
                  {TYPES_LIST.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              {/* Ingredients Multi-Select */}
              <div className="flex-1 min-w-[250px] flex flex-col gap-1.5" ref={dropdownRef}>
                <label className="text-[12px] font-black text-[#1e293b] ml-1 tracking-wide">Ingredients</label>
                <div className="relative w-full">
                  <div 
                    onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                    className="w-full min-h-[38px] border border-slate-300 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-slate-700 bg-white shadow-sm cursor-pointer flex items-center justify-between transition-all hover:border-[#00A3FF]"
                  >
                    <div className="flex flex-wrap gap-1 flex-1 truncate">
                      {selectedIngredients.length === 0 ? (
                        <span className="text-slate-400 font-normal">Select ingredients...</span>
                      ) : (
                        <span className="text-slate-700 truncate">{selectedIngredients.join(", ")}</span>
                      )}
                    </div>
                    <ChevronDown size={16} className="text-slate-400 shrink-0 ml-2" />
                  </div>

                  {isIngredientsOpen && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-50 max-h-56 overflow-y-auto">
                      <div className="p-1 flex flex-col">
                        {INGREDIENTS_LIST.map((ing) => (
                          <label key={ing} className="flex items-center gap-2.5 px-3 py-2 hover:bg-slate-50 cursor-pointer rounded-md transition-colors">
                            <input 
                              type="checkbox" 
                              checked={selectedIngredients.includes(ing)}
                              onChange={() => handleIngredientToggle(ing)}
                              className="w-4 h-4 rounded text-[#00A3FF] border-slate-300 focus:ring-[#00A3FF] cursor-pointer" 
                            />
                            <span className="text-[13px] font-semibold text-slate-700">{ing}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* ACTION BUTTON */}
            <div>
              <button
                type="submit"
                className={`${isEditing ? 'bg-[#00A3FF] hover:bg-[#008fdf]' : 'bg-[#198754] hover:bg-[#157347]'} text-white h-[38px] px-8 rounded-md text-[13px] font-black uppercase shadow-md transition-all active:scale-95 flex items-center justify-center gap-2`}
              >
                {isEditing ? <Save size={14} /> : <Plus size={16} strokeWidth={3} />}
                {isEditing ? 'Save Changes' : 'Add To List'}
              </button>
            </div>

          </div>
        </form>
      </div>

      {/* ATTACHMENT MODAL */}
      <AttachmentModal 
        isOpen={isAttachmentModalOpen} 
        onClose={() => setIsAttachmentModalOpen(false)} 
      />
    </>
  );
};

export default CompositionAdd;