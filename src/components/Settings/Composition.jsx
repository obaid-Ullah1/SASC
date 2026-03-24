import React, { useState, useMemo, useCallback } from "react";
import { Edit2, Trash2, Plus, Search, Layers, FileSpreadsheet, FileText, CheckCircle2, ShieldCheck, AlertCircle, List, X } from "lucide-react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Scrolling,
  MasterDetail,
  Summary,
  TotalItem
} from "devextreme-react/data-grid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// 1. Import your custom Add Form component
import CompositionAdd from './AddForm/CompositionAdd';

// --- INITIAL DATA DICTIONARY ---
const initialAuthenticMixData = {
  "TREE MIX 1": [
    { ingredient: "Acacia", scientific: "Acacia Dealbata" }, { ingredient: "Alder, Red", scientific: "Alder Rubra" },
    { ingredient: "Ash, White", scientific: "Fraxinus Americana" }, { ingredient: "Beech, American", scientific: "Fagus Grandifolia" },
    { ingredient: "Gs Birch Mix", scientific: "Betula Lenta, Populifolia, Nigra" }, { ingredient: "Box Elder", scientific: "Acer Negunda" },
    { ingredient: "Cedar, Mountain", scientific: "Juniperus Ashei" }, { ingredient: "Cottonwood", scientific: "Populus Deltoides" },
    { ingredient: "Cypress Arizona", scientific: "Callitropsis Arizonica" }, { ingredient: "Elm, American", scientific: "Ulmus Americana" }
  ],
  "TREE MIX 2": [
    { ingredient: "Maple, Red", scientific: "" }, { ingredient: "Mesquite", scientific: "" }, { ingredient: "Mulberry, Red", scientific: "" },
    { ingredient: "Gs Eastern Oak Mix", scientific: "" }, { ingredient: "Olive", scientific: "" }, { ingredient: "Pine, Ponderosa", scientific: "" },
    { ingredient: "Privet, Common", scientific: "" }, { ingredient: "Sycamore, Eastern", scientific: "" }, { ingredient: "Walnut, Black", scientific: "" },
    { ingredient: "Willow, Black", scientific: "" }
  ],
  "GRASS MIX": [
    { ingredient: "Allermed Bermuda", scientific: "" }, { ingredient: "Johnson Grass", scientific: "" },
    { ingredient: "Orchard", scientific: "" }, { ingredient: "Perennial Rye", scientific: "" }, { ingredient: "Timothy", scientific: "" }
  ],
  "WEED MIX": [
    { ingredient: "Cocklebur", scientific: "" }, { ingredient: "Plantain, English", scientific: "" }, { ingredient: "Firebush/Kochia", scientific: "" },
    { ingredient: "Lamb's Quarter", scientific: "" }, { ingredient: "Mugwort, Common", scientific: "" }, { ingredient: "Nettle", scientific: "" },
    { ingredient: "Pigweed, Rough", scientific: "" }, { ingredient: "Russian Thistle", scientific: "" }, { ingredient: "Sheep Sorrel", scientific: "" },
    { ingredient: "Ragweed, Western", scientific: "" }
  ],
  "MOLD MIX": [
    { ingredient: "Alternaria Alternata", scientific: "" }, { ingredient: "Aspergillus Fumigatus", scientific: "" },
    { ingredient: "Hormodendrum", scientific: "" }, { ingredient: "Gs Penicillium Mix", scientific: "" }
  ],
  "STD MIX 1": [
    { ingredient: "TREE MIX 1", scientific: "" }, { ingredient: "TREE MIX 2", scientific: "" }, { ingredient: "GRASS MIX", scientific: "" }, { ingredient: "WEED MIX", scientific: "" }
  ],
  "STD MIX 2": [
    { ingredient: "D. Farinae", scientific: "" }, { ingredient: "D. Pteronyssinus", scientific: "" }, { ingredient: "MOLD MIX", scientific: "" }, { ingredient: "Diluent", scientific: "" }
  ],
  "STD MIX 3": [ { ingredient: "D. Farinae", scientific: "" }, { ingredient: "D. Pteronyssinus", scientific: "" }, { ingredient: "Diluent", scientific: "" } ],
  "STD MIX 4": [ { ingredient: "Cat", scientific: "" }, { ingredient: "Dog Epithelia", scientific: "" }, { ingredient: "Diluent", scientific: "" } ],
  "AIT MIX 2": [
    { ingredient: "D. Farinae", scientific: "" }, { ingredient: "D. Pteronyssinus", scientific: "" }, { ingredient: "Alternaria Alternata", scientific: "" },
    { ingredient: "Aspergillus Fumigatus", scientific: "" }, { ingredient: "Hormodendrum", scientific: "" }, { ingredient: "Gs Penicillium Mix", scientific: "" }, { ingredient: "Diluent", scientific: "" }
  ],
  "SAG1-01/26/A": [
    { ingredient: "Histamine", scientific: "" }, { ingredient: "Allermed Bermuda", scientific: "" }, { ingredient: "Acacia", scientific: "Acacia Dealbata" },
    { ingredient: "Plantain, English", scientific: "" }, { ingredient: "Perennial Rye", scientific: "" }, { ingredient: "Alder, Red", scientific: "Alder Rubra" },
    { ingredient: "Pigweed, Rough", scientific: "" }, { ingredient: "Firebush/Kochia", scientific: "" }, { ingredient: "Johnson Grass", scientific: "" },
    { ingredient: "Box Elder", scientific: "Acer Negunda" }, { ingredient: "Cocklebur", scientific: "" }, { ingredient: "Gs Birch Mix", scientific: "Betula Lenta, Populifolia, Nigra" },
    { ingredient: "Elm, American", scientific: "Ulmus Americana" }, { ingredient: "Orchard", scientific: "" }, { ingredient: "Olive", scientific: "" },
    { ingredient: "Russian Thistle", scientific: "" }, { ingredient: "Lamb's Quarter", scientific: "" }, { ingredient: "Cedar, Mountain", scientific: "Juniperus Ashei" },
    { ingredient: "Beech, American", scientific: "Fagus Grandifolia" }, { ingredient: "Willow, Black", scientific: "" }, { ingredient: "Ragweed, Western", scientific: "" },
    { ingredient: "Cottonwood", scientific: "Populus Deltoides" }, { ingredient: "Cultivated Corn", scientific: "" }, { ingredient: "Maple, Red", scientific: "" },
    { ingredient: "Meadow Fescue", scientific: "" }, { ingredient: "Dog Fennel", scientific: "" }, { ingredient: "Timothy", scientific: "" },
    { ingredient: "Kentucky Blue", scientific: "" }, { ingredient: "Ragweed, false", scientific: "" }, { ingredient: "Alfafla", scientific: "" }, { ingredient: "Mesquite", scientific: "" }
  ],
  "Test1": [ { ingredient: "SAG1-01/26/A", scientific: "" }, { ingredient: "SAG1-01/26/B", scientific: "" } ]
};

// Modified to accept a dynamic dataStore
const getIngredients = (mixName, count, dataStore) => {
  const currentMix = dataStore[mixName];
  if (currentMix && currentMix.length > 0) {
    return currentMix.map((item, i) => ({
      id: i + 1,
      ingredient: item.ingredient,
      scientific: item.scientific,
      percentage: Number((100 / currentMix.length).toFixed(2)),
    }));
  }
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ingredient: `Generic Ingredient ${i + 1}`,
    scientific: `Generic Scientific ${i + 1}`,
    percentage: count > 0 ? Number((100 / count).toFixed(2)) : 0,
  }));
};


// ==============================================================================
// 🌟 STATIC RENDERERS (Prevents React infinite loops)
// ==============================================================================

const renderMasterRow = (cell) => {
  const mix = cell.data;
  return (
    <div className="w-full rounded-xl bg-[#E6F6FF] border border-[#B3E5FF] px-5 py-2.5 shadow-sm flex justify-between items-center transition-all duration-200">
      <div className="text-[black] text-[13px] font-black uppercase tracking-wider">
        {mix.injName}
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-[#00A3FF] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
          {mix.itemsCount} Items
        </div>
        {mix.isVerified ? (
          <div className="bg-[#16A34A] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <CheckCircle2 size={12} strokeWidth={3} /> Verified
          </div>
        ) : (
          <div className="bg-slate-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <AlertCircle size={12} strokeWidth={2.5} /> Pending
          </div>
        )}
      </div>
    </div>
  );
};

const renderDetailId = (cell) => <span className="font-bold text-[#00A3FF] text-[12px]">{cell.text}</span>;
const renderDetailIngredient = (cell) => <span className="text-slate-700 text-[13px] font-semibold">{cell.text}</span>;
const renderDetailScientific = (cell) => <span className="text-slate-500 text-[12px] italic">{cell.text || "—"}</span>;
const renderDetailPercentage = (cell) => (
  <div className="mx-auto border border-slate-200 bg-white rounded w-12 py-1 text-center font-bold text-slate-700 text-[12px] shadow-sm">
    {Math.round(cell.value || 0)}
  </div>
);
const renderDetailAction = () => (
  <div className="flex gap-2 justify-center">
    <button className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
      <Edit2 size={14} strokeWidth={2.5} />
    </button>
    <button className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm">
      <Trash2 size={14} strokeWidth={2.5} />
    </button>
  </div>
);


// ==============================================================================
// INNER GRID COMPONENT (With its own Headers Forced ON)
// ==============================================================================
const DetailTemplate = React.memo(({ detailProps, mixDataStore }) => {
  const mix = detailProps.data;
  
  // Memoize data to recalculate immediately when an item is added
  const detailData = useMemo(() => getIngredients(mix.injName, mix.itemsCount, mixDataStore), [mix.injName, mix.itemsCount, mixDataStore]);

  return (
    <div className="px-6 py-3 bg-[#F8FAFC]">
      <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <DataGrid
          dataSource={detailData}
          keyExpr="id"
          showBorders={false}
          showColumnHeaders={true} /* CRITICAL FIX: Forces inner headers to show */
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
          hoverStateEnabled={true}
          columnAutoWidth={true}
          className="internal-grid"
        >
          {/* THESE COLUMNS SHOW HEADERS INDIVIDUALLY FOR EACH DROPDOWN */}
          <Column dataField="id" caption="#" width={70} alignment="center" cellRender={renderDetailId} />
          <Column dataField="ingredient" caption="INGREDIENT" cellRender={renderDetailIngredient} />
          <Column dataField="scientific" caption="SCIENTIFIC NAME" cellRender={renderDetailScientific} />
          <Column dataField="percentage" caption="%" width={100} alignment="center" cellRender={renderDetailPercentage} />
          <Column caption="ACTIONS" width={120} alignment="center" cellRender={renderDetailAction} />
          
          <Summary>
            <TotalItem 
              column="percentage" 
              summaryType="sum" 
              displayFormat="Total: {0}%" 
            />
          </Summary>
        </DataGrid>
      </div>
    </div>
  );
});


// ==============================================================================
// MAIN COMPONENT
// ==============================================================================
const Composition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  // Application State for Data (Allows live updating)
  const [mixData, setMixData] = useState(initialAuthenticMixData);
  const [mixDefinitions, setMixDefinitions] = useState([
    { injName: "TREE MIX 1", itemsCount: 10, isVerified: true, isApproved: true },
    { injName: "TREE MIX 2", itemsCount: 10, isVerified: true, isApproved: true },
    { injName: "GRASS MIX", itemsCount: 5, isVerified: true, isApproved: true },
    { injName: "WEED MIX", itemsCount: 10, isVerified: true, isApproved: true },
    { injName: "MOLD MIX", itemsCount: 4, isVerified: true, isApproved: true },
    { injName: "STD MIX 1", itemsCount: 4, isVerified: true, isApproved: true },
    { injName: "STD MIX 2", itemsCount: 4, isVerified: true, isApproved: true },
    { injName: "STD MIX 3", itemsCount: 3, isVerified: true, isApproved: true },
    { injName: "STD MIX 4", itemsCount: 3, isVerified: true, isApproved: true },
    { injName: "AIT MIX 1", itemsCount: 36, isVerified: true, isApproved: true },
    { injName: "AIT MIX 2", itemsCount: 7, isVerified: true, isApproved: true },
    { injName: "AIT MIX 3", itemsCount: 3, isVerified: true, isApproved: true },
    { injName: "AIT MIX 4", itemsCount: 3, isVerified: true, isApproved: true },
    { injName: "CUSTOM Mix 1", itemsCount: 21, isVerified: true, isApproved: true },
    { injName: "CUSTOM 1", itemsCount: 31, isVerified: true, isApproved: true },
    { injName: "CUSTOM Mix 4", itemsCount: 2, isVerified: true, isApproved: true },
    { injName: "CUSTOM 2", itemsCount: 5, isVerified: true, isApproved: true },
    { injName: "CUSTOM Mix 4/2", itemsCount: 2, isVerified: true, isApproved: true },
    { injName: "CUSTOM 4", itemsCount: 2, isVerified: true, isApproved: true },
    { injName: "CUSTOM Mix 1/2", itemsCount: 26, isVerified: true, isApproved: true },
    { injName: "CUSTOM Mix 1/3", itemsCount: 21, isVerified: true, isApproved: true },
    { injName: "SAG1-01/26/A", itemsCount: 31, isVerified: true, isApproved: true },
    { injName: "SAG1-01/26/B", itemsCount: 12, isVerified: true, isApproved: true },
    { injName: "SAG1-01/26/C", itemsCount: 16, isVerified: true, isApproved: true },
    { injName: "Test1", itemsCount: 2, isVerified: true, isApproved: true },
    { injName: "SAG1-01/26/D", itemsCount: 3, isVerified: false, isApproved: false }
  ]);

  // Handle Adding New Data from the CompositionAdd component
  const handleAddData = useCallback((data) => {
    const { injection, category } = data; // Assumes your CompositionAdd emits an object: { injection: '...', category: '...' }
    if (!injection || !category) return;

    // 1. Add ingredient to the specific mix
    setMixData(prev => {
      const currentList = prev[category] || [];
      return {
        ...prev,
        [category]: [...currentList, { ingredient: injection, scientific: "—", percentage: 0 }] // Percentage recalculates automatically
      };
    });

    // 2. Update the master definition count
    setMixDefinitions(prev => {
      const exists = prev.find(m => m.injName === category);
      if (exists) {
        return prev.map(m => m.injName === category ? { ...m, itemsCount: m.itemsCount + 1 } : m);
      } else {
        return [{ injName: category, itemsCount: 1, isVerified: false, isApproved: false }, ...prev];
      }
    });

    setIsAddFormVisible(false); // Close form on success
  }, []);


  const filteredMixes = useMemo(() => {
    return mixDefinitions.filter(mix => mix.injName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, mixDefinitions]);

  const handleRowClick = useCallback((e) => {
    if (e.rowType === 'data') {
      const isExpanded = e.component.isRowExpanded(e.key);
      if (isExpanded) {
        e.component.collapseRow(e.key);
      } else {
        e.component.expandRow(e.key);
      }
    }
  }, []);


  // --- EXPORT LOGIC (Updated to pull from live state + PDF Borders/Colors) ---
  const handleExportPdf = () => {
    const doc = new jsPDF();
    let finalY = 30;
    doc.setFontSize(16).setFont("helvetica", "bold").text("Sierra Allergy & Immunology", 14, 15);
    doc.setFontSize(12).setFont("helvetica", "normal").text("Allergy Injection Composition Summary", 14, 22);

    filteredMixes.forEach((mix) => {
      const ingredients = getIngredients(mix.injName, mix.itemsCount, mixData);
      if (finalY > 250) { doc.addPage(); finalY = 20; }
      doc.setFontSize(12).setFont("helvetica", "bold").text(`${mix.injName} (${mix.itemsCount} items)`, 14, finalY + 10);
      
      autoTable(doc, {
        startY: finalY + 14,
        head: [["#", "Ingredient", "Scientific Name", "%"]],
        body: ingredients.map(ing => [ing.id.toString(), ing.ingredient, ing.scientific, ing.percentage]),
        theme: "grid", // <-- CHANGED: Uses grid theme for borders
        styles: { 
          fontSize: 10, 
          cellPadding: 3, 
          lineColor: [210, 214, 220], // Slate border color
          lineWidth: 0.1 
        },
        headStyles: { 
          fillColor: [0, 163, 255], // <-- CHANGED: Brand Blue Background
          textColor: [255, 255, 255], // White text
          fontStyle: "bold" 
        },
      });
      finalY = doc.lastAutoTable.finalY + 10;
    });
    doc.save("Injection_Composition_Summary.pdf");
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [["Sierra Allergy & Immunology"], ["Allergy Injection Composition Summary"], []];
    filteredMixes.forEach((mix) => {
      const ingredients = getIngredients(mix.injName, mix.itemsCount, mixData);
      wsData.push([`${mix.injName} (${mix.itemsCount} items)`]);
      wsData.push(["#", "Ingredient", "Scientific Name", "%"]);
      ingredients.forEach(ing => wsData.push([ing.id, ing.ingredient, ing.scientific, ing.percentage]));
      wsData.push(["", "", "Total:", "100.00%"]);
      wsData.push([]); 
    });
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws["!cols"] = [{ wch: 5 }, { wch: 30 }, { wch: 40 }, { wch: 10 }];
    XLSX.utils.book_append_sheet(wb, ws, "Compositions");
    XLSX.writeFile(wb, "Injection_Composition_Summary.xlsx");
  };


  return (
    <div className="h-full w-full flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden">
      
      {/* HEADER SECTION - UPDATED TO PROVIDED CODE */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-2">
          <List size={18} className="text-[#2A333A]" />
          <h2 className="text-[15px] font-black text-[#2A333A] tracking-wide">Ingredients List</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Add Form Button */}
          <button 
            onClick={() => setIsAddFormVisible(!isAddFormVisible)}
            className={`${isAddFormVisible ? 'bg-rose-500 hover:bg-rose-600' : 'bg-[#007BFF] hover:bg-[#0056b3]'} w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95`}
            title={isAddFormVisible ? "Close Form" : "Add New Mix"}
          >
            {isAddFormVisible ? <X size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
          </button>
          
          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={13} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-white/60 rounded-md pl-8 pr-3 py-1 text-[12px] w-40 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 transition-all bg-white/90"
            />
          </div>

          <div className="w-px h-5 bg-black/10 mx-0.5"></div>

          {/* Export to Excel */}
          <button onClick={handleExportExcel} className="w-7 h-7 bg-[#16A34A] border border-[#15803D] rounded flex items-center justify-center text-white hover:bg-[#15803D] transition-all shadow-sm" title="Export to Excel">
            <FileSpreadsheet size={13} strokeWidth={2.5} />
          </button>
          
          {/* Export to PDF */}
          <button onClick={handleExportPdf} className="w-7 h-7 bg-[#DC2626] border border-[#B91C1C] rounded flex items-center justify-center text-white hover:bg-[#B91C1C] transition-all shadow-sm" title="Export to PDF">
            <FileText size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* RENDER THE EXTERNAL ADD FORM WHEN "+" IS CLICKED */}
      {isAddFormVisible && (
        <div className="border-b border-slate-200 bg-slate-50 relative z-10">
           {/* Make sure your CompositionAdd component calls the 'onAdd' prop 
             with an object like: { injection: "Acacia", category: "TREE MIX 1" } 
           */}
           <CompositionAdd 
              onClose={() => setIsAddFormVisible(false)} 
              onAdd={handleAddData} 
           />
        </div>
      )}

      {/* DEVEXTREME CSS OVERRIDES */}
      <style>{`
        /* OUTER MASTER GRID CSS */
        .master-grid .dx-datagrid-headers { display: none !important; } /* HIDES ONLY MASTER HEADERS */
        .master-grid .dx-data-row { cursor: pointer; transition: all 0.2s; }
        .master-grid .dx-data-row > td { padding: 4px 8px !important; border: none !important; vertical-align: middle !important; background-color: transparent !important; }
        .master-grid .dx-master-detail-row > td { padding: 0 !important; border: none !important; background-color: transparent !important;}
        
        /* INNER DETAIL GRID CSS (Headers forced ON for dropdowns) */
        .internal-grid .dx-datagrid-headers { display: block !important; background-color: #F8FAFC !important; border-bottom: 1px solid #E2E8F0 !important; }
        .internal-grid .dx-header-row > td { padding: 12px 14px !important; font-size: 11px !important; font-weight: 700 !important; color: #64748B !important; text-transform: uppercase !important; border-right: 1px solid #E2E8F0 !important; }
        .internal-grid .dx-data-row > td { padding: 6px 14px !important; vertical-align: middle !important; border-right: 1px solid #E2E8F0 !important; border-bottom: 1px solid #E2E8F0 !important; }
        .internal-grid .dx-header-row > td:last-child, .internal-grid .dx-data-row > td:last-child { border-right: none !important; }
        .internal-grid .dx-datagrid-summary-item { font-size: 13px !important; font-weight: bold !important; color: #16A34A !important; }
      `}</style>

      {/* MAIN DATAGRID */}
      <div className="flex-1 w-full overflow-hidden p-2">
        <DataGrid
          dataSource={filteredMixes}
          keyExpr="injName"
          showBorders={false}
          showColumnHeaders={false} // Hides outer master headers ONLY
          columnAutoWidth={true}
          height="100%"
          width="100%"
          className="master-grid"
          onRowClick={handleRowClick}
        >
          <Scrolling mode="standard" showScrollbar="always" />
          
          <MasterDetail
            enabled={true}
            // Passing the live 'mixData' state down to the template securely
            render={(detailProps) => <DetailTemplate detailProps={detailProps} mixDataStore={mixData} />} 
          />

          <Column 
            dataField="injName" 
            cellRender={renderMasterRow} 
          />

          <Paging defaultPageSize={50} />
          <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={[50, 100]} showInfo={true} showNavigationButtons={true} />
        </DataGrid>
      </div>

    </div>
  );
};

export default React.memo(Composition);