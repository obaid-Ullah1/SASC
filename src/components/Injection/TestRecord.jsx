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

const TestRecord = () => {
  const [selectedGroup, setSelectedGroup] = useState("");

  // Popup States
  const [confirmPopup, setConfirmPopup] = useState({ isOpen: false, type: 'update' });
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, type: 'Added' });

  // Logic remains exactly as provided
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

  // ✅ Updated Theme Grid Classes
  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#f8fafc] 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-black 
    [&_.dx-datagrid-headers]:!text-[11px]
    [&_.dx-datagrid-headers]:!uppercase
    [&_.dx-datagrid-headers]:!tracking-widest
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-sky-100
    
    [&_.dx-data-row>td]:!py-2
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
    [&_.dx-data-row>td]:!font-semibold
    
    [&_.dx-data-row.dx-state-hover>td]:!bg-[#f0f9ff]
    [&_.dx-datagrid-group-row]:!bg-sky-50/50
    [&_.dx-datagrid-group-row]:!text-sky-900
    [&_.dx-datagrid-group-row]:!font-black
  `;

  // ✅ Theme Input Classes
  const labelClass = "flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 group-hover:text-[#00A3FF] transition-colors";
  const inputBaseClasses = "w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 outline-none transition-all bg-white shadow-sm";
  const readOnlyInputClasses = "w-full border-0 bg-transparent py-2 text-[13px] text-slate-800 font-black cursor-default outline-none";

  // Popup Handlers remain same
  const handleSaveClick = () => {
    setConfirmPopup({ isOpen: true, type: 'update' });
  };

  const confirmSave = () => {
    setConfirmPopup({ isOpen: false, type: 'update' });
    setSuccessPopup({ isOpen: true, type: 'Added' });
  };

  return (
    <>
      <ConfirmPopup 
        isOpen={confirmPopup.isOpen}
        type={confirmPopup.type}
        itemName="Test Record"
        onClose={() => setConfirmPopup({ ...confirmPopup, isOpen: false })}
        onConfirm={confirmSave}
      />
      <SuccessPopup 
        isOpen={successPopup.isOpen}
        message="Allergy Test Record saved successfully!"
        onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
      />

      <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
        
        {/* ✅ THEMED MAIN CONTAINER */}
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-sky-100 overflow-hidden">
          
          {/* ✅ SLIM GRADIENT HEADER */}
          <div className="bg-gradient-to-r from-[#e0f2fe] via-[#f0f9ff] to-white px-6 py-4 border-b-2 border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl shadow-sm border border-sky-100 flex items-center justify-center">
                <ClipboardCheck size={20} className="text-[#00A3FF]" strokeWidth={3} />
              </div>
              <div>
                <h2 className="text-[16px] font-black text-sky-950 uppercase tracking-tight leading-none">Test Record</h2>
                <p className="text-[10px] font-black text-[#00A3FF] uppercase tracking-[0.2em] mt-1">Diagnostic Laboratory</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-sky-100 shadow-sm">
                <Activity size={14} className="text-[#00A3FF] animate-pulse" />
                <span className="text-[9px] font-black text-sky-800 uppercase tracking-widest">System Active</span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* TOP FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="space-y-2 group">
                <label className={labelClass}><User size={13} /> Patient</label>
                <select className={`${inputBaseClasses} appearance-none cursor-pointer`}>
                  <option value="">Select Patient</option>
                  <option value="1664">Napoli , Emily (1664)</option>
                  <option value="9823">Smith , John (9823)</option>
                  <option value="4412">Doe , Jane (4412)</option>
                </select>
              </div>

              <div className="space-y-2 group">
                <label className={labelClass}><Calendar size={13} /> Date</label>
                <input type="date" className={inputBaseClasses} />
              </div>

              <div className="space-y-2 group">
                <label className={labelClass}><ClipboardCheck size={13} /> Performed By</label>
                <input type="text" placeholder="Enter Name" className={inputBaseClasses} />
              </div>

              <div className="space-y-2 group">
                <label className={labelClass}><Layers size={13} /> Test Type</label>
                <select className={`${inputBaseClasses} appearance-none cursor-pointer`}>
                  <option value="">Select Type</option>
                  <option value="Prick">Prick</option>
                  <option value="Intradermal">Intradermal</option>
                </select>
              </div>
            </div>

            {/* ✅ GROUP SELECTION BAR - IMPROVED VISIBILITY */}
            <div className="bg-[#f0f9ff]/60 border-2 border-sky-100 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center gap-8 shadow-inner">
              <div className="w-full md:max-w-xs space-y-2 group">
                <label className="text-[11px] font-black text-sky-600 uppercase tracking-widest ml-1">Select Group</label>
                <div className="relative">
                  <select 
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full border-2 border-[#00A3FF]/30 rounded-xl px-4 py-3 text-sm font-black bg-white hover:bg-white focus:border-[#00A3FF] outline-none transition-all cursor-pointer appearance-none shadow-md text-rose-600"
                  >
                    <option value="" className="text-slate-400">-- Choose Allergen Group --</option>
                    <option value="SPT-90">SPT-90</option>
                    <option value="SPT-Food">SPT-Food</option>
                    <option value="Limited/PEDS">Limited/PEDS</option>
                    <option value="SPT-Food 1">SPT-Food 1</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00A3FF] pointer-events-none" />
                </div>
              </div>

              <div className="hidden md:block h-12 w-[2px] bg-sky-100"></div>

              <div className="flex-1 flex flex-wrap justify-around gap-6 w-full">
                  <div className="text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Items Loaded</p>
                    <p className="text-lg font-black text-slate-700 leading-none">{gridData.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest mb-1">Positives</p>
                    <p className="text-lg font-black text-rose-600 leading-none">0</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1">Negatives</p>
                    <p className="text-lg font-black text-emerald-600 leading-none">0</p>
                  </div>
              </div>
            </div>

            {/* ✅ DATAGRID SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-800 px-1">
                <Syringe size={16} className="text-[#00A3FF]" />
                <h3 className="text-[12px] font-black uppercase tracking-[0.2em]">Allergen Input Matrix</h3>
              </div>
              
              <div className={`h-[500px] border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col ${gridClasses}`}>
                <DataGrid
                  dataSource={gridData} 
                  keyExpr="id"
                  showBorders={false}
                  showRowLines={true}
                  hoverStateEnabled={true}
                  noDataText={selectedGroup ? "Initializing..." : "Please select an allergen group to begin recording results."}
                  height="100%"
                >
                  <Scrolling mode="virtual" />
                  <Paging enabled={false} />
                  <Grouping autoExpandAll={true} />

                  <Column
                    dataField="groupTitle"
                    groupIndex={0}
                    visible={false}
                    groupCellRender={(cell) => (
                      <div className="flex justify-between items-center w-full pr-4 py-1">
                        <div className="flex items-center gap-3">
                          <Layers size={14} className="text-[#00A3FF]" />
                          <span className="text-[12px] font-black text-sky-900 uppercase tracking-wider">{cell.value}</span>
                          <span className="text-[#00A3FF] text-[10px] font-black bg-white px-2 py-0.5 rounded border border-sky-100 shadow-sm">{cell?.data?.items?.length || 0} ITEMS</span>
                        </div>
                        <input type="file" className="hidden" id={`file-${cell.value}`} />
                        <label htmlFor={`file-${cell.value}`} className="cursor-pointer text-[9px] font-black bg-[#00A3FF] text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-sky-600 active:scale-95 transition-all">UPLOAD IMAGE</label>
                      </div>
                    )}
                  />

                  <Column dataField="allergen" caption="Allergen Name" minWidth={220} cellRender={(c) => <input readOnly value={c.data.allergen} className={readOnlyInputClasses} />} />
                  <Column dataField="siteLabel" caption="Site" width={90} alignment="center" cellRender={(c) => <span className="bg-sky-100/50 text-[#00A3FF] text-[11px] font-black px-2.5 py-1 rounded-md border border-sky-100">{c.data.siteLabel}</span>} />
                  <Column dataField="wheal" caption="Wheal (mm)" width={130} cellRender={() => (
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-sky-200 text-[#00A3FF] focus:ring-[#00A3FF] cursor-pointer" />
                      <input type="number" defaultValue="0" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center focus:border-[#00A3FF] outline-none" />
                    </div>
                  )} />
                  <Column dataField="result" caption="Outcome" width={140} cellRender={() => (
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-black text-slate-700 outline-none cursor-pointer">
                      <option value="Negative">NEGATIVE</option>
                      <option value="Positive">POSITIVE</option>
                    </select>
                  )} />
                  <Column dataField="flare" caption="Flare (mm)" width={120} cellRender={() => <input type="number" defaultValue="0" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-center focus:border-[#00A3FF] outline-none" />} />
                  <Column dataField="controlType" caption="Ctrl Type" width={140} cellRender={() => (
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-black text-slate-700 outline-none cursor-pointer">
                      <option value="Negative">NEGATIVE</option>
                      <option value="Positive">POSITIVE</option>
                    </select>
                  )} />
                  <Column dataField="ids" caption="Unique IDs" width={110} cellRender={() => <input type="text" placeholder="ID..." className="w-full bg-transparent border-b border-slate-100 text-[11px] font-bold outline-none placeholder:text-slate-300" />} />
                </DataGrid>
              </div>
            </div>

            {/* ✅ FORM ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12 border-t border-slate-100 pt-8">
              <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-slate-200 text-slate-500 font-black text-[11px] hover:bg-slate-50 hover:text-slate-800 transition-all uppercase tracking-widest active:scale-95">
                <XCircle size={16} /> Cancel Testing
              </button>
              
              <button 
                onClick={handleSaveClick}
                className="flex items-center justify-center gap-2 px-12 py-3.5 rounded-xl bg-[#00A3FF] text-white font-black text-[11px] hover:bg-[#008fdf] shadow-[0_10px_20px_rgba(0,163,255,0.2)] transition-all uppercase tracking-[0.2em] active:scale-95"
              >
                <Save size={16} /> Save Record
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TestRecord;