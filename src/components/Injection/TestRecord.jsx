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

// ✅ Dynamic Dropdown Component for Negative/Positive Colors              
const StatusDropdown = () => {
  const [status, setStatus] = useState("Negative");

  // Determine dynamic colors based on selection
  let colorClasses = "bg-white border-slate-300 text-slate-800";
  if (status === "Positive") colorClasses = "bg-emerald-50 border-emerald-300 text-emerald-700 font-bold";
  if (status === "Negative") colorClasses = "bg-rose-50 border-rose-300 text-rose-700 font-bold";

  return (
    <select 
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className={`w-full rounded px-2 py-1.5 text-sm outline-none cursor-pointer border transition-colors focus:ring-2 focus:ring-[#00A3FF]/20 ${colorClasses}`}
    >
      <option value="Negative" className="bg-white text-slate-800 font-medium">Negative</option>
      <option value="Positive" className="bg-white text-slate-800 font-medium">Positive</option>
    </select>
  );
};

const TestRecord = () => {
  const [selectedGroup, setSelectedGroup] = useState("");
  
  // State to store uploaded images for each group
  const [uploadedImages, setUploadedImages] = useState({});

  // ✅ NEW: Reset key to clear all uncontrolled inputs when cancelling
  const [resetKey, setResetKey] = useState(0);

  // ✅ UPDATED: Popup States to track if we are saving or cancelling
  const [confirmPopup, setConfirmPopup] = useState({ isOpen: false, type: 'update', action: 'save' });
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

  // Theme Grid Classes - Lite color applied to headers
  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#e0f2fe] 
    [&_.dx-datagrid-headers]:!text-sky-900 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[13px]
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-sky-200
    
    [&_.dx-data-row>td]:!py-2.5
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
    [&_.dx-data-row>td]:!font-medium
    
    [&_.dx-data-row.dx-state-hover>td]:!bg-sky-50
    [&_.dx-datagrid-group-row]:!bg-slate-100
    [&_.dx-datagrid-group-row]:!text-slate-800
    [&_.dx-datagrid-group-row]:!font-semibold

    /* Inner borders explicitly visible */
    [&_.dx-datagrid-borders>div]:!border-slate-300
    [&_.dx-datagrid-content_.dx-datagrid-table_.dx-row>td]:!border-slate-300
  `;

  // Simple, readable input classes
  const labelClass = "flex items-center gap-2 text-sm font-semibold text-slate-700 mb-1 ml-1 group-hover:text-[#00A3FF] transition-colors";
  const inputBaseClasses = "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-800 focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 outline-none transition-all bg-white shadow-sm";
  const readOnlyInputClasses = "w-full border-0 bg-transparent py-1.5 text-sm text-slate-800 font-medium cursor-default outline-none";

  // ✅ UPDATED: Handlers to support Cancel and Save logic seamlessly
  const handleSaveClick = () => {
    setConfirmPopup({ isOpen: true, type: 'update', action: 'save' });
  };

  const handleCancelClick = () => {
    setConfirmPopup({ isOpen: true, type: 'cancel', action: 'cancel' });
  };

  const handlePopupConfirm = () => {
    if (confirmPopup.action === 'cancel') {
      // Reset everything to default state
      setSelectedGroup("");
      setUploadedImages({});
      setResetKey(prev => prev + 1); // Forces React to clear all inputs
      setConfirmPopup({ ...confirmPopup, isOpen: false });
    } else {
      // Proceed with Save
      setConfirmPopup({ ...confirmPopup, isOpen: false });
      setSuccessPopup({ isOpen: true, type: 'Added' });
    }
  };

  // Handle Image Upload Logic
  const handleImageUpload = (groupTitle, event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages(prev => ({
        ...prev,
        [groupTitle]: imageUrl
      }));
    }
  };

  return (
    <>
      <ConfirmPopup 
        isOpen={confirmPopup.isOpen}
        type={confirmPopup.type}
        itemName={confirmPopup.action === 'cancel' ? "Test Record Data" : "Test Record"}
        onClose={() => setConfirmPopup({ ...confirmPopup, isOpen: false })}
        onConfirm={handlePopupConfirm}
      />
      <SuccessPopup 
        isOpen={successPopup.isOpen}
        message="Allergy Test Record saved successfully!"
        onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
      />

      <div className="flex flex-col gap-6 animate-in fade-in duration-500 pb-10">
        
        {/* MAIN CONTAINER */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden">
          
          {/* TEST RECORD HEADER */}
          <div className="bg-[#00A3FF] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center">
                <ClipboardCheck size={20} className="text-[#00A3FF]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white leading-none">Test Record</h2>
                <p className="text-sm font-medium text-sky-100 mt-1">Diagnostic Laboratory</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm">
                <Activity size={16} className="text-[#00A3FF] animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">System Active</span>
            </div>
          </div>

          {/* ✅ Key added here to force re-render/reset of all child form elements */}
          <div key={resetKey} className="p-6 md:p-8">
            
            {/* TOP FORM FIELDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="group">
                <label className={labelClass}><User size={16} /> Patient</label>
                <select className={`${inputBaseClasses} appearance-none cursor-pointer`}>
                  <option value="">Select Patient</option>
                  <option value="1664">Napoli , Emily (1664)</option>
                  <option value="9823">Smith , John (9823)</option>
                  <option value="4412">Doe , Jane (4412)</option>
                </select>
              </div>

              <div className="group">
                <label className={labelClass}><Calendar size={16} /> Date</label>
                <input type="date" className={inputBaseClasses} />
              </div>

              <div className="group">
                <label className={labelClass}><ClipboardCheck size={16} /> Performed By</label>
                <input type="text" placeholder="Enter Name" className={inputBaseClasses} />
              </div>

              <div className="group">
                <label className={labelClass}><Layers size={16} /> Test Type</label>
                <select className={`${inputBaseClasses} appearance-none cursor-pointer`}>
                  <option value="">Select Type</option>
                  <option value="Prick">Prick</option>
                  <option value="Intradermal">Intradermal</option>
                </select>
              </div>
            </div>

            {/* GROUP SELECTION BAR */}
            <div className="bg-[#f0f9ff] border border-sky-200 rounded-xl p-5 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="w-full md:max-w-xs group">
                <label className="text-sm font-semibold text-sky-800 mb-1 block ml-1">Select Group</label>
                <div className="relative">
                  <select 
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full border border-sky-200 rounded-lg px-4 py-2.5 text-sm font-semibold bg-white hover:bg-slate-50 focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 outline-none transition-all cursor-pointer appearance-none text-slate-800"
                  >
                    <option value="" className="text-slate-400">-- Choose Allergen Group --</option>
                    <option value="SPT-90">SPT-90</option>
                    <option value="SPT-Food">SPT-Food</option>
                    <option value="Limited/PEDS">Limited/PEDS</option>
                    <option value="SPT-Food 1">SPT-Food 1</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-500 pointer-events-none" />
                </div>
              </div>

              <div className="hidden md:block h-10 w-[1px] bg-sky-200"></div>

              <div className="flex-1 flex flex-wrap justify-around gap-6 w-full">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-sky-700 mb-1">Items Loaded</p>
                    <p className="text-lg font-bold text-sky-900 leading-none">{gridData.length}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-rose-500 mb-1">Positives</p>
                    <p className="text-lg font-bold text-rose-600 leading-none">0</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-emerald-600 mb-1">Negatives</p>
                    <p className="text-lg font-bold text-emerald-700 leading-none">0</p>
                  </div>
              </div>
            </div>

            {/* DATAGRID SECTION */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-800 px-1">
                <Syringe size={18} className="text-[#00A3FF]" />
                <h3 className="text-base font-semibold">Allergen Input Matrix</h3>
              </div>
              
              <div className={`h-[500px] border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col ${gridClasses}`}>
                <DataGrid
                  dataSource={gridData} 
                  keyExpr="id"
                  showBorders={true}
                  showRowLines={true}
                  showColumnLines={true}
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
                      <div className="flex justify-between items-center w-full pr-4 py-1.5">
                        <div className="flex items-center gap-3">
                          <Layers size={16} className="text-slate-500" />
                          <span className="text-sm font-semibold text-slate-800">{cell.value}</span>
                          <span className="text-slate-600 text-xs font-medium bg-slate-200 px-2.5 py-0.5 rounded-full border border-slate-300">{cell?.data?.items?.length || 0} Items</span>
                        </div>
                        
                        {/* Image preview logic */}
                        <div className="flex items-center gap-3">
                          {uploadedImages[cell.value] && (
                            <img 
                              src={uploadedImages[cell.value]} 
                              alt="Uploaded panel preview" 
                              className="h-8 w-12 object-cover rounded border border-slate-300 shadow-sm"
                            />
                          )}
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            id={`file-${cell.value}`} 
                            onChange={(e) => handleImageUpload(cell.value, e)}
                          />
                          <label htmlFor={`file-${cell.value}`} className="cursor-pointer text-xs font-medium bg-white text-slate-700 border border-slate-300 px-4 py-1.5 rounded-md hover:bg-slate-50 transition-all shadow-sm">
                            {uploadedImages[cell.value] ? "Change Image" : "Upload Image"}
                          </label>
                        </div>
                      </div>
                    )}
                  />

                  {/* Simple text rendering inside cells */}
                  <Column dataField="allergen" caption="Allergen Name" minWidth={220} cellRender={(c) => <input readOnly value={c.data.allergen} className={readOnlyInputClasses} />} />
                  
                  <Column dataField="siteLabel" caption="Site" width={90} alignment="center" cellRender={(c) => <span className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded border border-slate-300">{c.data.siteLabel}</span>} />
                  
                  <Column dataField="wheal" caption="Wheal (mm)" width={140} cellRender={() => (
                    <div className="flex items-center justify-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-400 text-[#00A3FF] focus:ring-[#00A3FF] cursor-pointer" />
                      <input type="number" defaultValue="0" className="w-16 bg-white border border-slate-300 rounded px-2 py-1 text-sm font-medium text-center focus:border-[#00A3FF] outline-none" />
                    </div>
                  )} />
                  
                  {/* Dynamic Color Dropdown for Outcome */}
                  <Column dataField="result" caption="Outcome" width={140} cellRender={() => <StatusDropdown />} />
                  
                  <Column dataField="flare" caption="Flare (mm)" width={120} cellRender={() => (
                    <input type="number" defaultValue="0" className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-sm font-medium text-center focus:border-[#00A3FF] outline-none" />
                  )} />
                  
                  {/* Dynamic Color Dropdown for Ctrl Type */}
                  <Column dataField="controlType" caption="Ctrl Type" width={140} cellRender={() => <StatusDropdown />} />
                  
                  <Column dataField="ids" caption="Unique IDs" width={120} cellRender={() => (
                    <input type="text" placeholder="ID..." className="w-full bg-transparent border-b border-slate-300 text-sm font-medium outline-none placeholder:text-slate-400" />
                  )} />
                </DataGrid>
              </div>
            </div>

            {/* ✅ FORM ACTION BUTTONS WITH NEW CANCEL FUNCTIONALITY */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 border-t border-slate-200 pt-6">
              <button 
                onClick={handleCancelClick}
                className="flex items-center justify-center gap-2 px-8 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium text-sm hover:bg-slate-50 hover:text-rose-600 transition-all active:scale-95"
              >
                <XCircle size={18} /> Cancel Testing
              </button>
              
              <button 
                onClick={handleSaveClick}
                className="flex items-center justify-center gap-2 px-10 py-2.5 rounded-lg bg-[#00A3FF] text-white font-medium text-sm hover:bg-[#008fdf] shadow-md transition-all active:scale-95"
              >
                <Save size={18} /> Save Record
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TestRecord;