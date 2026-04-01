import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Beaker, ChevronDown, Pencil, Save } from 'lucide-react';

const DilutionAddForm = ({ isOpen, onClose, onAdd, onUpdate, editingItem }) => {
  const [formData, setFormData] = useState({ ratio: '', color: null });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const isEditing = !!editingItem;

  // Pre-defined colors matching your screenshot
  const colorOptions = [
    { name: 'Grey', hex: '#9CA3AF' },
    { name: 'Green', hex: '#22C55E' },
    { name: 'Yellow', hex: '#EAB308' },
    { name: 'Red', hex: '#EF4444' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Magenta', hex: '#EC4899' },
    { name: 'Blue', hex: '#3B82F6' }
  ];

  // Logic to populate form when editing or reset when adding fresh
  useEffect(() => {
    if (isOpen) {
      if (editingItem) {
        setFormData({
          ratio: editingItem.ratio,
          color: { name: editingItem.colorName, hex: editingItem.hex }
        });
      } else {
        setFormData({ ratio: '', color: null });
      }
    }
  }, [editingItem, isOpen]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleReset = (e) => {
    e?.preventDefault();
    if (isEditing) {
      // Revert to original values
      setFormData({
        ratio: editingItem.ratio,
        color: { name: editingItem.colorName, hex: editingItem.hex }
      });
    } else {
      setFormData({ ratio: '', color: null });
    }
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.color) {
      alert("Please select a color.");
      return;
    }
    
    if (isEditing) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }
  };

  const selectColor = (color) => {
    setFormData(prev => ({ ...prev, color }));
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-visible">
      
      {/* 1. LIGHT BLUE FORM HEADER */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-4 sm:px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100 shrink-0">
            {isEditing ? (
              <Pencil size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            ) : (
              <Plus size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            )}
          </div>
          <h3 className="font-bold text-sky-900 text-[12px] sm:text-[13px] tracking-wide uppercase leading-tight">
            {isEditing ? 'Update Dilution Ratio Color' : 'Add Dilution Ratio Color'}
          </h3>
        </div>
        
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm shrink-0"
          title="Close Form"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* 2. FORM BODY - Responsive Flex Stack */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-5 bg-white/50">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 w-full">
          
          {/* RATIO INPUT */}
          <div className="flex flex-col gap-1.5 w-full md:flex-1">
            <label className="text-[12px] font-bold text-slate-700">Map Ratio Color <span className="text-rose-500">*</span></label>
            <div className="flex h-[38px] rounded-lg overflow-hidden border-2 border-slate-200 focus-within:border-[#00A3FF] focus-within:ring-4 focus-within:ring-[#00A3FF]/10 transition-all bg-white">
              <div className="bg-[#00A3FF] w-[40px] flex items-center justify-center shrink-0">
                <Beaker size={16} className="text-white" />
              </div>
              <input 
                type="text" 
                value={formData.ratio} 
                onChange={(e) => setFormData(prev => ({ ...prev, ratio: e.target.value }))} 
                required
                placeholder="e.g. 1:10000"
                className="flex-1 px-3 text-[13px] font-medium text-slate-700 outline-none placeholder:italic placeholder:text-slate-400 placeholder:font-normal w-full"
              />
            </div>
          </div>

          {/* CUSTOM COLOR DROPDOWN */}
          <div className="flex flex-col gap-1.5 w-full md:w-[220px] relative" ref={dropdownRef}>
            <label className="text-[12px] font-bold text-slate-700">Color <span className="text-rose-500">*</span></label>
            
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex w-full items-center justify-between h-[38px] px-3 border-2 rounded-lg text-[13px] transition-all bg-white outline-none ${
                isDropdownOpen ? 'border-[#00A3FF] ring-4 ring-[#00A3FF]/10' : 'border-slate-200'
              }`}
            >
              {formData.color ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full shadow-inner ring-1 ring-black/10" style={{ backgroundColor: formData.color.hex }}></div>
                  <span className="font-medium text-slate-700">{formData.color.name}</span>
                </div>
              ) : (
                <span className="text-slate-400 italic">Select color...</span>
              )}
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-[60px] left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 max-h-[200px] overflow-y-auto">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => selectColor(color)}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-slate-50 transition-colors text-left"
                  >
                    <div className="w-3.5 h-3.5 rounded-full shadow-inner ring-1 ring-black/10" style={{ backgroundColor: color.hex }}></div>
                    <span className="text-[13px] font-medium text-slate-700">{color.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
            <button 
              type="submit" 
              className="flex-1 md:flex-none bg-[#00A3FF] hover:bg-[#008CE6] text-white px-8 h-[38px] rounded-lg text-[13px] font-bold shadow-md transition-all active:scale-95 flex items-center justify-center"
            >
              {isEditing ? 'Update' : 'Add'}
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="flex-1 md:flex-none bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-600 px-5 h-[38px] rounded-lg text-[13px] font-bold transition-all flex items-center justify-center"
            >
              {isEditing ? 'Revert' : 'Reset'}
            </button>
          </div>

        </div>
      </form>

    </div>
  );
};

export default DilutionAddForm;