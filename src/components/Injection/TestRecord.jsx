import React, { useState, useMemo } from "react";
import { Save, XCircle, Syringe, User, Calendar, ClipboardCheck, Layers, Activity, ChevronDown } from "lucide-react";
import DataGrid, {
  Column,
  Paging,
  Sorting,
  Grouping,
  Scrolling,
} from "devextreme-react/data-grid";

// Import Popups
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

// 1. Removed { data } prop - This component is entirely self-sufficient
const TestRecord = () => {
  const [selectedGroup, setSelectedGroup] = useState("");

  // Popup States
  const [confirmPopup, setConfirmPopup] = useState({ isOpen: false, type: 'update' });
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, type: 'Added' });

  // Scalable Mock Data Architecture
  const gridData = useMemo(() => {
    if (!selectedGroup) return [];

    let groupDefinitions = [];

    switch (selectedGroup) {
      case "SPT-90":
        groupDefinitions = [
          { title: "Extract Tree (T1)", allergens: ["Control", "Histamine", "Acacia", "Alder, Red", "Ash, White", "Beech, American", "Gs Birch Mix", "Box Elder", "Cedar, Mountain", "Cottonwood"] },
          { title: "Extract Tree (T2)", allergens: ["Cypress", "Elm", "Hackberry", "Hazelnut", "Hickory", "Juniper", "Maple", "Mesquite", "Mulberry", "Oak"] },
          { title: "Extract Tree (T3)", allergens: ["Olive", "Pecan", "Pine", "Poplar", "Sweetgum", "Sycamore", "Walnut", "Willow", "Sample Tree 9", "Sample Tree 10"] },
          { title: "Extract Grass (G1)", allergens: ["Bahia", "Bermuda", "Johnson", "Kentucky Blue", "Orchard", "Perennial Rye", "Redtop", "Sweet Vernal", "Timothy", "Meadow Fescue"] },
          { title: "Extract Weed (W1)", allergens: ["Careless Weed", "Cocklebur", "Dandelion", "English Plantain", "Firebush", "Lamb's Quarters", "Marsh Elder", "Mugwort", "Nettle", "Pigweed"] },
          { title: "Extract Mold (M1)", allergens: ["Alternaria", "Aspergillus", "Botrytis", "Candida", "Cladosporium", "Curvularia", "Epicoccum", "Fusarium", "Helminthosporium", "Mucor"] },
          { title: "Extract Epithelia (E1)", allergens: ["Cat Dander", "Dog Dander", "Horse Dander", "Cow Dander", "Guinea Pig", "Rabbit", "Mouse", "Rat", "Feathers Mix", "Wool Mix"] },
        ];
        break;
      case "SPT-Food":
        groupDefinitions = [
          { title: "Dairy & Egg (F1)", allergens: ["Cow's Milk", "Egg White", "Egg Yolk", "Cheese, Cheddar", "Yogurt", "Casein", "Whey", "Goat's Milk", "Sheep's Milk", "Butter"] },
          { title: "Nuts & Seeds (F2)", allergens: ["Peanut", "Almond", "Walnut", "Cashew", "Pecan", "Hazelnut", "Pistachio", "Macadamia", "Pine Nut", "Sesame Seed"] },
        ];
        break;
      case "Limited/PEDS":
        groupDefinitions = [
          { title: "Pediatric Tree (P1)", allergens: ["Control", "Histamine", "Oak", "Maple", "Birch"] },
          { title: "Pediatric Grass (P2)", allergens: ["Timothy", "Bermuda", "Rye", "Orchard", "Sweet Vernal"] },
        ];
        break;
      case "SPT-Food 1":
        groupDefinitions = [
          { title: "Top 8 Allergens (T8)", allergens: ["Control", "Histamine", "Milk", "Egg", "Peanut", "Tree Nut Mix", "Soy", "Wheat", "Fish Mix", "Shellfish Mix"] },
        ];
        break;
      default:
        return [];
    }

    let idCounter = 1;
    let allRows = [];

    groupDefinitions.forEach((group) => {
      const match = group.title.match(/\((.*?)\)/);
      const sitePrefix = match ? match[1] : "S";

      group.allergens.forEach((allergenName, index) => {
        const siteNum = index + 1;
        allRows.push({
          id: idCounter++,
          allergen: allergenName,
          siteLabel: `${sitePrefix}${siteNum.toString().padStart(2, '0')}`,
          wheal: "-",
          result: "PENDING",
          flare: "-",
          controlType: "-",
          ids: `ID-${idCounter}`,
          groupTitle: group.title,
        });
      });
    });

    return allRows;
  }, [selectedGroup]);

  // Premium Grid CSS with enhanced readability and light blue themes
  const gridClasses = `
    /* Light blue tinted headers for a cleaner look */
    [&_.dx-datagrid-headers]:!bg-[#f4faff] 
    [&_.dx-datagrid-headers]:!border-b-2
    [&_.dx-datagrid-headers]:!border-[#e0f2fe]
    
    [&_.dx-header-row_td]:!py-3.5 
    [&_.dx-header-row_td]:!text-slate-600
    [&_.dx-header-row_td]:!font-extrabold
    [&_.dx-header-row_td]:!text-[11px]
    [&_.dx-header-row_td]:!uppercase
    [&_.dx-header-row_td]:!tracking-wider
    
    [&_.dx-data-row>td]:!py-1.5 
    [&_.dx-data-row>td]:!px-2 
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row>td]:!border-b
    [&_.dx-data-row>td]:!border-slate-100
    
    /* Interactive Row Hover Effect */
    [&_.dx-data-row.dx-state-hover>td]:!bg-[#e0f2fe]
    [&_.dx-data-row.dx-state-hover>td]:!transition-colors
    
    [&_.dx-selection-disabled]:!bg-transparent
    [&_.dx-datagrid-group-row]:!bg-white
    [&_.dx-datagrid-group-opened]:!text-[black]
    [&_.dx-datagrid-group-closed]:!text-[black]
  `;

  // Enhanced Shared Tailwind classes for the form inputs
  const inputBaseClasses = "w-full border border-slate-200 rounded-lg px-3 py-2 text-[13px] text-slate-800 font-medium hover:border-[#00A3FF]/40 focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/10 outline-none transition-all bg-white shadow-sm cursor-pointer";
  const readOnlyInputClasses = "w-full border-0 bg-slate-50 rounded-lg px-3 py-2 text-[13px] text-slate-700 font-bold cursor-default outline-none hover:bg-slate-100 transition-colors";

  // --- POPUP HANDLERS ---
  const handleSaveClick = () => {
    // Open Confirmation Popup first
    setConfirmPopup({ isOpen: true, type: 'update' });
  };

  const confirmSave = () => {
    // Close confirmation, trigger success
    setConfirmPopup({ isOpen: false, type: 'update' });
    setSuccessPopup({ isOpen: true, type: 'Added' });
  };

  return (
    <>
      {/* GLOBAL POPUPS */}
      <ConfirmPopup 
        isOpen={confirmPopup.isOpen}
        type={confirmPopup.type}
        itemName="Test Record"
        onClose={() => setConfirmPopup({ ...confirmPopup, isOpen: false })}
        onConfirm={confirmSave}
      />
      <SuccessPopup 
        isOpen={successPopup.isOpen}
        type="Saved" // Changed text to "Saved Successfully"
        onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
      />

      <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-20">
        
        {/* Premium Main Card Wrapper */}
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
          
          {/* ADDED: Professional Sky Blue Gradient Header */}
          <div className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-white px-8 py-5 border-b border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-sky-100 flex items-center justify-center">
                <ClipboardCheck size={24} className="text-[#00A3FF]" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-slate-800 uppercase tracking-tight leading-none">Test Record</h2>
                <p className="text-[12px] font-bold text-[#00A3FF] uppercase tracking-wider mt-1">Patient Allergy Testing Details</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Top Form Fields: 4 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              
              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-hover:text-[#00A3FF] transition-colors">
                  <User size={14} className="text-[#00A3FF]" /> Patient
                </label>
                <select className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-200 focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 outline-none transition-all bg-slate-50/50 cursor-pointer appearance-none shadow-sm">
                  <option value="">Select Patient</option>
                  <option value="1664">Napoli , Emily (1664)</option>
                  <option value="9823">Smith , John (9823)</option>
                  <option value="4412">Doe , Jane (4412)</option>
                </select>
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-hover:text-[#00A3FF] transition-colors">
                  <Calendar size={14} className="text-[#00A3FF]" /> Date
                </label>
                <input type="date" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-200 focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 outline-none transition-all bg-slate-50/50 shadow-sm" />
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-hover:text-[#00A3FF] transition-colors">
                  <ClipboardCheck size={14} className="text-[#00A3FF]" /> Performed By
                </label>
                <input type="text" placeholder="Enter Name" className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-200 focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 outline-none transition-all bg-slate-50/50 placeholder:text-slate-400 shadow-sm" />
              </div>

              <div className="space-y-2 group">
                <label className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-hover:text-[#00A3FF] transition-colors">
                  <Layers size={14} className="text-[#00A3FF]" /> Test Type
                </label>
                <select className="w-full border-2 border-slate-100 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:border-slate-200 focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 outline-none transition-all bg-slate-50/50 cursor-pointer appearance-none shadow-sm">
                  <option value="">Select Test Type</option>
                  <option value="Prick">Prick</option>
                  <option value="Intradermal">Intradermal</option>
                </select>
              </div>
            </div>

            <hr className="border-slate-100 mb-8" />

            {/* Group Selection Dropdown */}
            <div className="max-w-sm space-y-2 mb-8 group">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider ml-1 group-hover:text-[#00A3FF] transition-colors">Select Group</label>
              <div className="relative">
                <select 
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="w-full border-2 border-[#00A3FF]/20 rounded-2xl px-4 py-3 text-sm focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/20 outline-none transition-all font-bold bg-[#f0f9ff] hover:bg-[#e0f2fe] cursor-pointer appearance-none shadow-sm text-slate-800"
                >
                  <option value="">-- Select Group --</option>
                  <option value="SPT-90">SPT-90</option>
                  <option value="SPT-Food">SPT-Food</option>
                  <option value="Limited/PEDS">Limited/PEDS</option>
                  <option value="SPT-Food 1">SPT-Food 1</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00A3FF]">
                  <Activity size={18} />
                </div>
              </div>
            </div>

            {/* Allergens Tested Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 mb-2 px-1">
                <Syringe size={18} className="text-[#00A3FF]" />
                <h3 className="text-[14px] font-black uppercase tracking-wider">Allergens Tested</h3>
              </div>
              
              <div className={`h-[600px] border-2 border-slate-100 rounded-[1.5rem] overflow-hidden shadow-sm flex flex-col ${gridClasses}`}>
                <DataGrid
                  dataSource={gridData} 
                  keyExpr="id"
                  showBorders={false}
                  showRowLines={true}
                  hoverStateEnabled={true}
                  noDataText={selectedGroup ? "Loading..." : "No allergens added. Please select a group."}
                  rowAlternationEnabled={false}
                  columnAutoWidth={false}
                  height="100%"
                  width="100%"
                >
                  <Scrolling mode="standard" showScrollbar="always" />
                  <Paging enabled={false} />
                  <Sorting mode="none" />
                  <Grouping autoExpandAll={false} expandMode="rowClick" />

                  {/* Group Heading Configuration */}
                  <Column
                    dataField="groupTitle"
                    groupIndex={0}
                    visible={false}
                    groupCellRender={(cell) => {
                      const count = cell?.data?.items?.length || 0;
                      return (
                        <div className="flex justify-between items-center w-full pr-4 py-2 hover:opacity-80 transition-opacity">
                          <div className="flex items-center gap-3">
                            <Layers size={16} className="text-[#00A3FF]" />
                            <span className="text-[14px] font-bold text-slate-800 tracking-wide uppercase">
                              {cell.value}
                            </span>
                            <span className="text-[#00A3FF] text-[12px] font-bold bg-[#00A3FF]/10 px-2.5 py-0.5 rounded-md">
                              {count}
                            </span>
                          </div>
                          {/* File Upload aligned to the right */}
                          <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                             <input 
                               type="file" 
                               className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-slate-200 file:text-xs file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-50 cursor-pointer transition-all shadow-sm"
                             />
                          </div>
                        </div>
                      );
                    }}
                  />

                  {/* --- CUSTOM FORM DATA COLUMNS --- */}
                  <Column 
                    dataField="allergen" 
                    caption="Allergen" 
                    minWidth={200}
                    cellRender={(cell) => (
                      <input type="text" readOnly value={cell.data.allergen} className={readOnlyInputClasses} />
                    )} 
                  />
                  
                  <Column 
                    dataField="siteLabel" 
                    caption="Site Label" 
                    width={110} 
                    alignment="center"
                    cellRender={(cell) => (
                      <span className="px-3 py-1.5 rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20 text-[#00A3FF] text-[12px] font-bold tracking-wide shadow-sm">
                        {cell.data.siteLabel}
                      </span>
                    )}
                  />
                  
                  <Column 
                    dataField="wheal" 
                    caption="Wheal (mm)" 
                    width={130} 
                    cellRender={() => (
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#00A3FF] focus:ring-[#00A3FF] transition-all cursor-pointer" />
                        <input type="number" defaultValue="0" className={inputBaseClasses} />
                      </div>
                    )} 
                  />
                  
                  <Column 
                    dataField="result" 
                    caption="Result" 
                    width={150} 
                    cellRender={() => (
                      <div className="relative">
                        <select className={`${inputBaseClasses} appearance-none pr-8`}>
                          <option value="Negative">Negative</option>
                          <option value="Positive">Positive</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00A3FF] pointer-events-none" />
                      </div>
                    )} 
                  />
                  
                  <Column 
                    dataField="flare" 
                    caption="Flare (mm)" 
                    width={120} 
                    cellRender={() => (
                      <input type="number" defaultValue="0" className={inputBaseClasses} />
                    )} 
                  />
                  
                  <Column 
                    dataField="controlType" 
                    caption="Control Type" 
                    width={160} 
                    cellRender={() => (
                      <div className="relative">
                        <select className={`${inputBaseClasses} appearance-none pr-8`}>
                          <option value="Negative">Negative</option>
                          <option value="Positive">Positive</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00A3FF] pointer-events-none" />
                      </div>
                    )} 
                  />
                  
                  <Column 
                    dataField="ids" 
                    caption="IDs" 
                    width={100} 
                    cellRender={() => (
                      <input type="text" className={inputBaseClasses} />
                    )} 
                  />
                </DataGrid>
              </div>

              {/* Interactive Totals Summary Bar */}
              <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 mt-2 shadow-sm">
                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-3">
                  Total Allergens
                  <span className="bg-white border-2 border-slate-200 px-4 py-1.5 rounded-xl text-slate-800 shadow-sm font-black text-sm">{gridData.length} / 0</span>
                </span>
                
                <div className="flex gap-4">
                    <div className="flex items-center gap-3 bg-red-50/80 border border-red-100 px-4 py-2 rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default">
                      <span className="text-[11px] font-extrabold text-red-500 uppercase tracking-wider">Positives</span>
                      <span className="w-7 h-7 rounded-lg bg-white text-red-600 flex items-center justify-center font-black shadow-sm text-sm border border-red-100">0</span>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50/80 border border-green-100 px-4 py-2 rounded-xl hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default">
                      <span className="text-[11px] font-extrabold text-green-600 uppercase tracking-wider">Negatives</span>
                      <span className="w-7 h-7 rounded-lg bg-white text-green-600 flex items-center justify-center font-black shadow-sm text-sm border border-green-100">0</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-500 font-bold text-[12px] hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300 transition-all uppercase tracking-wider shadow-sm">
                <XCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" /> 
                Cancel
              </button>
              
              {/* SAVED BUTTON WIRED TO POPUP */}
              <button 
                onClick={handleSaveClick}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#00A3FF] text-white font-bold text-[12px] hover:bg-[#008fdf] shadow-[0_8px_20px_rgba(0,163,255,0.3)] transition-all uppercase tracking-widest hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
              >
                <Save size={18} /> 
                Save Test
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TestRecord;