import React, { useMemo, useState } from 'react';
import { X, Check, FlaskConical } from 'lucide-react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Selection
} from 'devextreme-react/data-grid';

const PatientTestResult = ({ isOpen, onClose, patientData }) => {
  // 1. STATE MANAGEMENT FOR UI TOGGLES
  const [viewModes, setViewModes] = useState({
    "Group1": "ALL", // "ALL" or "BEST"
    "Group2": "ALL"
  });

  const [dropdownValues, setDropdownValues] = useState({
    "Group1": "SA", // "SA" or "LT"
    "Group2": "SA"
  });

  // Handle toggling between "Show Best Match" and "Show All Injections"
  const toggleViewMode = (group) => {
    setViewModes(prev => ({
      ...prev,
      [group]: prev[group] === "ALL" ? "BEST" : "ALL"
    }));
  };

  // Handle Dropdown Change
  const handleDropdownChange = (group, value) => {
    setDropdownValues(prev => ({
      ...prev,
      [group]: value
    }));
  };

  // 2. MOCK DATA (Replicating exact layout from screenshots)
  const mappingData = useMemo(() => [
    // Group 1
    { id: 1, group: "Group1", count: "19 Allergens", panel: "Extract Tree (T3)", positive: "Walnut, Black", wheal: 4, ids: "-", priority: "High", std: true, ait: true, custom12: true, custom1: true, grass: false, custom1_2: true, custom13: true, weed: false, tree1: false, tree2: true },
    { id: 2, group: "Group1", count: "19 Allergens", panel: "Extract Grass (G1)", positive: "Allermed Bermuda", wheal: 4, ids: "-", priority: "High", std: true, ait: true, custom12: true, custom1: false, grass: true, custom1_2: false, custom13: false, weed: false, tree1: false, tree2: false },
    { id: 3, group: "Group1", count: "19 Allergens", panel: "Extract Grass (G1)", positive: "Johnson Grass", wheal: 4, ids: "-", priority: "High", std: true, ait: true, custom12: true, custom1: false, grass: true, custom1_2: false, custom13: false, weed: false, tree1: false, tree2: false },
    { id: 4, group: "Group1", count: "19 Allergens", panel: "Extract Grass (G1)", positive: "Orchard", wheal: 4, ids: "-", priority: "High", std: true, ait: true, custom12: true, custom1: false, grass: true, custom1_2: false, custom13: false, weed: false, tree1: false, tree2: false },
    { id: 5, group: "Group1", count: "19 Allergens", panel: "Extract Grass (G1)", positive: "Perennial Rye", wheal: 4, ids: "-", priority: "High", std: true, ait: true, custom12: true, custom1: false, grass: true, custom1_2: false, custom13: false, weed: false, tree1: false, tree2: false },
    { id: 6, group: "Group1", count: "19 Allergens", panel: "Extract Grass (G1)", positive: "Timothy", wheal: 4, ids: "-", priority: "High", std: true, ait: true, custom12: true, custom1: false, grass: true, custom1_2: false, custom13: false, weed: false, tree1: false, tree2: false },
    { id: 7, group: "Group1", count: "19 Allergens", panel: "Extract Tree (T1)", positive: "Ash, White", wheal: 3, ids: "-", priority: "Moderate", std: true, ait: true, custom12: true, custom1: true, grass: false, custom1_2: true, custom13: true, weed: false, tree1: true, tree2: false },
    { id: 8, group: "Group1", count: "19 Allergens", panel: "Extract Weed (W1)", positive: "Ragweed, Western", wheal: 3, ids: "-", priority: "Moderate", std: true, ait: true, custom12: false, custom1: true, grass: false, custom1_2: false, custom13: false, weed: true, tree1: false, tree2: false },
    { id: 9, group: "Group1", count: "19 Allergens", panel: "Extract Tree (T1)", positive: "Acacia", wheal: 2, ids: "-", priority: "Low", std: true, ait: true, custom12: true, custom1: true, grass: false, custom1_2: true, custom13: true, weed: false, tree1: true, tree2: false },
    { id: 10, group: "Group1", count: "19 Allergens", panel: "Extract Tree (T2)", positive: "Olive", wheal: 2, ids: "-", priority: "Low", std: true, ait: true, custom12: true, custom1: true, grass: false, custom1_2: true, custom13: true, weed: false, tree1: false, tree2: true },
    { id: 11, group: "Group1", count: "19 Allergens", panel: "Extract Weed (W1)", positive: "Pigweed, Rough", wheal: 2, ids: "-", priority: "Low", std: true, ait: true, custom12: false, custom1: true, grass: false, custom1_2: false, custom13: false, weed: true, tree1: false, tree2: false },
    { id: 12, group: "Group1", count: "19 Allergens", panel: "Extract Weed (W1)", positive: "Sheep Sorrel", wheal: 2, ids: "-", priority: "Low", std: true, ait: true, custom12: false, custom1: true, grass: false, custom1_2: false, custom13: false, weed: true, tree1: false, tree2: false },
    { id: 13, group: "Group1", count: "19 Allergens", panel: "Extract Tree (T1)", positive: "Histamine", wheal: 4, ids: "-", priority: "High", std: false, ait: false, custom12: false, custom1: false, grass: false, custom1_2: false, custom13: false, weed: false, tree1: false, tree2: false },
    // Group 2
    { id: 1, group: "Group2", count: "1 Allergens", panel: "Extract Epithelia (E1)", positive: "Cat", wheal: 2, ids: "-", priority: "Low", custom4: true },
  ], []);

  // ALL Mix columns definitions mapped from first screenshot
  const mixDefinitions = [
    { field: 'std', title: 'STD MIX 1', stats: '(12/19, 63.2%)' },
    { field: 'ait', title: 'AIT MIX 1', stats: '(12/19, 63.2%)' },
    { field: 'custom12', title: 'CUSTOM MIX 1/2', stats: '(9/19, 47.4%)' },
    { field: 'custom1', title: 'CUSTOM 1', stats: '(7/19, 36.8%)' },
    { field: 'grass', title: 'GRASS MIX', stats: '(5/19, 26.3%)' },
    { field: 'custom1_2', title: 'CUSTOM MIX 1', stats: '(4/19, 21.1%)' },
    { field: 'custom13', title: 'CUSTOM MIX 1/3', stats: '(4/19, 21.1%)' },
    { field: 'weed', title: 'WEED MIX', stats: '(3/19, 15.8%)' },
    { field: 'tree1', title: 'TREE MIX 1', stats: '(2/19, 10.5%)' },
    { field: 'tree2', title: 'TREE MIX 2', stats: '(2/19, 10.5%)' },
    { field: 'custom4', title: 'CUSTOM Mix 4', stats: '(1/1, 100.0%)' },
  ];

  if (!isOpen) return null;

  const uniqueGroups = [...new Set(mappingData.map(d => d.group))];

  // 3. UI RENDERERS MATCHING SCREENSHOT EXACTLY
  const MixHeader = (title, stats) => (
    <div className="flex flex-col items-center justify-center py-0.5 leading-tight">
      <input type="checkbox" className="mb-1 w-3 h-3 cursor-pointer" />
      <span className="text-[11px] font-bold text-[#00A3FF] uppercase">{title}</span>
      <span className="text-[9px] font-semibold text-[#00A3FF] mt-0.5">{stats}</span>
    </div>
  );

  const StatusIcon = ({ active }) => {
    if (active === undefined) return null;
    return (
      <div className="flex justify-center items-center h-full">
        {active ? (
          <div className="bg-[#16A34A] rounded-[3px] w-4 h-4 flex items-center justify-center shadow-sm">
            <Check size={14} className="text-white" strokeWidth={4} />
          </div>
        ) : (
          <X size={15} className="text-[#DC2626]" strokeWidth={4} />
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-[98vw] h-[95vh] bg-[#F4F6F8] rounded-lg shadow-2xl flex flex-col overflow-hidden border border-slate-400">
        
        {/* MODAL HEADER: Lite Sky Blue */}
        <div className="bg-[#00A3FF] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-white">
             <FlaskConical size={16} strokeWidth={2.5} />
             <h2 className="text-[14px] font-bold tracking-wide">
               Patient Test Results – {patientData?.patient || "Gonzalez , Eliana"}
             </h2>
          </div>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded p-1 transition-all">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          
          {uniqueGroups.map((groupName, index) => {
            const groupData = mappingData.filter(d => d.group === groupName);
            const groupCount = groupData[0].count;
            const currentMode = viewModes[groupName];
            const currentDD = dropdownValues[groupName];
            
            // Determine which columns to show based on Mode
            let activeMixes = [];
            if (currentMode === "ALL") {
              // Show all columns that have data for this group
              activeMixes = mixDefinitions.filter(mix => groupData.some(d => d[mix.field] !== undefined));
            } else {
              // BEST MATCH LOGIC
              const bestMatchTitle = groupName === "Group1" 
                ? (currentDD === "SA" ? "SAG1-01/26/D" : "LTG1-01/26/D") 
                : "CUSTOM Mix 4";
              const bestMatchStats = groupName === "Group1" ? "(19/19, 100.0%)" : "(1/1, 100.0%)";
              
              activeMixes = [{ field: 'best', title: bestMatchTitle, stats: bestMatchStats }];
            }
            
            return (
              <div key={groupName} className="bg-white border border-slate-300 rounded shadow-sm flex flex-col">
                
                {/* Group Toolbar */}
                <div className="flex justify-between items-center px-4 py-2 border-b border-slate-200 bg-white">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[#00A3FF] font-bold text-[14px]">{groupName}</span>
                    <span className="text-slate-600 text-[12px]">({groupCount})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <select 
                      value={currentDD}
                      onChange={(e) => handleDropdownChange(groupName, e.target.value)}
                      className="border border-slate-300 rounded px-2 py-1 text-[12px] text-slate-700 outline-none focus:border-blue-500 w-16 cursor-pointer"
                    >
                      <option value="SA">SA</option>
                      <option value="LT">LT</option>
                    </select>
                    <button 
                      onClick={() => toggleViewMode(groupName)}
                      className="border border-slate-300 bg-white rounded px-4 py-1 text-[12px] text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
                    >
                      {currentMode === "ALL" ? "Show Best Match" : "Show All Injections"}
                    </button>
                  </div>
                </div>

                {/* Group DataGrid */}
                <div className="custom-matching-grid">
                  <DataGrid
                    dataSource={groupData}
                    showBorders={true}
                    showRowLines={true}
                    showColumnLines={true}
                    columnAutoWidth={false}
                    rowAlternationEnabled={false}
                    hoverStateEnabled={true}
                    height={index === 0 ? 550 : 150} 
                  >
                    <Selection mode="multiple" showCheckBoxesMode="always" width={40} />
                    <Scrolling mode="virtual" />

                    {/* ✅ Text changed to simple font-medium and standard sizes */}
                    <Column dataField="id" caption="#" width={50} alignment="center" cssClass="text-slate-600 font-medium text-[12px]" />
                    <Column dataField="panel" caption="Panel" width={180} cssClass="text-slate-700 font-medium text-[12px]" />
                    <Column dataField="positive" caption="Pt Positive" minWidth={200} cssClass="text-slate-800 font-medium text-[12px]" />
                    <Column dataField="wheal" caption="Wheal" width={70} alignment="left" cssClass="text-slate-700 font-medium text-[12px]" />
                    <Column dataField="ids" caption="IDs" width={60} alignment="left" cssClass="text-slate-700 font-medium text-[12px]" />
                    <Column dataField="priority" caption="Priority" width={90} alignment="left" cssClass="text-slate-700 font-medium text-[12px]" />

                    {/* Dynamic Cyan Mix Columns */}
                    {activeMixes.map((mix) => (
                      <Column 
                        key={mix.field}
                        dataField={mix.field} 
                        headerCellRender={() => MixHeader(mix.title, mix.stats)} 
                        alignment="center" 
                        width={110} 
                        cssClass="mix-cell-border"
                        cellRender={(d) => <StatusIcon active={currentMode === "BEST" ? true : d.value} />} 
                      />
                    ))}
                  </DataGrid>
                </div>
              </div>
            );
          })}

        </div>

        {/* MODAL FOOTER */}
        <div className="bg-white px-6 py-3 flex justify-end border-t border-slate-300 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
           <button 
             onClick={onClose} 
             className="bg-[#6C757D] text-white px-6 py-1.5 rounded text-[13px] font-semibold hover:bg-[#5a6268] active:scale-95 transition-all shadow-sm"
           >
             Close
           </button>
        </div>

      </div>

      <style jsx global>{`
        .custom-matching-grid .dx-datagrid {
          border: none !important;
        }
        .custom-matching-grid .dx-datagrid-headers {
          background-color: #ffffff !important;
          color: #475569 !important;
          font-weight: 600 !important;
          font-size: 11px !important;
          border-bottom: 1px solid #cbd5e1 !important; /* Slightly darker header bottom */
        }
        
        /* Cyan Header Application for mix columns (starts from 8th column due to checkbox + other core columns) */
        .custom-matching-grid .dx-header-row > td:nth-child(n+8) {
          background-color: #E0F7FA !important; 
          border-bottom: 1px solid #B2EBF2 !important;
        }

        .custom-matching-grid .dx-datagrid-borders > .dx-datagrid-headers, 
        .custom-matching-grid .dx-datagrid-borders > .dx-datagrid-rowsview, 
        .custom-matching-grid .dx-datagrid-borders > .dx-datagrid-filter-panel {
          border-left: none !important;
          border-right: none !important;
        }

        /* ✅ Row and Column Borders made slightly more visible (#cbd5e1 = slate-300) */
        .custom-matching-grid .dx-column-lines > td {
          border-left: 1px solid #cbd5e1 !important;
          border-right: 1px solid #cbd5e1 !important;
        }

        .custom-matching-grid .dx-row-lines > td {
          border-bottom: 1px solid #cbd5e1 !important;
        }

        .custom-matching-grid .dx-command-select {
          border-right: 1px solid #cbd5e1 !important;
        }
      `}</style>
    </div>
  );
};

export default PatientTestResult;