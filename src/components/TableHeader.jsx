import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, RotateCw, Filter, LayoutGrid, Check, X, CheckSquare, Square } from 'lucide-react';

const TableHeader = ({ 
  title, 
  icon: HeaderIcon, 
  onAddClick, 
  handleResetLayout, 
  onSearchChange,
  searchValue,
  availableCategories = [], 
  selectedCategories = [], 
  onCategoryToggle 
}) => {
  const [showContainerDropdown, setShowContainerDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowContainerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if all available categories are currently selected
  const isAllSelected = availableCategories.length > 0 && selectedCategories.length === availableCategories.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      // If all are selected, clear the selection
      onCategoryToggle('CLEAR_ALL');
    } else {
      // If none or some are selected, select everything
      availableCategories.forEach(cat => {
        if (!selectedCategories.includes(cat)) {
          onCategoryToggle(cat);
        }
      });
    }
  };

  return (
    <div 
      className="px-3 py-2 flex flex-wrap justify-between items-center gap-2 border-b border-gray-300 flex-shrink-0 relative"
      style={{ background: 'linear-gradient(90deg, #7EE8B5 0%, #DDF51A 100%)' }}
    >
      {/* Title & Icon Section */}
      <div className="flex items-center gap-2 min-w-fit">
        {HeaderIcon && (
          <HeaderIcon size={16} className="text-slate-800" strokeWidth={2.5} />
        )}
        <h2 className="text-[12px] font-black text-slate-800 uppercase tracking-tight text-slate-800">
          {title}
        </h2>
      </div>
      
      {/* Actions & Search Section */}
      <div className="flex items-center gap-2 flex-grow justify-end sm:flex-grow-0">
        {/* Add Button */}
        <button 
          onClick={onAddClick}
          className="bg-[#1D68F1] p-1 rounded-full text-white shadow-md hover:scale-110 active:scale-95 transition-all flex-shrink-0"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
        
        {/* Search Bar */}
        <div className="relative max-w-[150px] sm:max-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="Search..." 
            className="pl-8 pr-3 py-1 text-[11px] border-none rounded-full w-full bg-white outline-none shadow-inner text-slate-800" 
          />
        </div>

        {/* Layout Reset Button */}
        <button 
          onClick={handleResetLayout} 
          className="p-1.5 bg-slate-900 rounded text-white hover:bg-slate-800 transition-colors shadow-md"
          title="Reset Layout"
        >
          <RotateCw size={13} />
        </button>

        {/* Container Selector Button (LayoutGrid) */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowContainerDropdown(!showContainerDropdown)}
            className={`p-1.5 rounded text-white transition-all shadow-md flex items-center gap-1 ${
              selectedCategories.length > 0 ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-800'
            }`}
            title="Select Specific Containers"
          >
            <LayoutGrid size={13} />
            {selectedCategories.length > 0 && (
              <span className="text-[9px] font-bold px-1 bg-white text-blue-600 rounded-sm">
                {selectedCategories.length}
              </span>
            )}
          </button>

          {/* Professional Dropdown Menu */}
          {showContainerDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-slate-200 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
              {/* Header with Select All Toggle */}
              <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    isAllSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-400 group-hover:border-blue-500'
                  }`}>
                    {isAllSelected && <Check size={11} className="text-white" strokeWidth={4} />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Select All</span>
                </label>
                
                {selectedCategories.length > 0 && (
                  <button 
                    onClick={() => onCategoryToggle('CLEAR_ALL')}
                    className="text-[9px] font-bold text-red-500 hover:text-red-600 flex items-center gap-0.5"
                  >
                    <X size={10} /> RESET
                  </button>
                )}
              </div>
              
              {/* Scrollable Container List */}
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {availableCategories.length > 0 ? (
                  availableCategories.map((cat) => {
                    const isChecked = selectedCategories.includes(cat);
                    return (
                      <label 
                        key={cat} 
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors border-l-4 hover:bg-slate-50 ${
                          isChecked ? 'border-blue-500 bg-blue-50/50' : 'border-transparent'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${
                          isChecked ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'
                        }`}>
                          {isChecked && <Check size={10} className="text-white" strokeWidth={4} />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={isChecked}
                          onChange={() => onCategoryToggle(cat)}
                        />
                        <span className={`text-[11px] truncate ${isChecked ? 'font-bold text-blue-700' : 'text-slate-600'}`}>
                          {cat}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <div className="px-4 py-4 text-center text-[10px] text-slate-400 italic">No options available</div>
                )}
              </div>
              
              {/* Footer Indicator */}
              <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[9px] text-slate-400 text-center font-medium">
                {selectedCategories.length} containers currently visible
              </div>
            </div>
          )}
        </div>

        {/* Existing Red Filter Button */}
        <button 
          className="p-1.5 bg-[#EF233C] rounded text-white hover:bg-red-600 transition-colors shadow-md"
          title="Filter"
        >
          <Filter size={13} />
        </button>
      </div>
    </div>
  );
};

export default TableHeader;