import React, { useState } from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Pager, 
  Paging, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { Settings2, Plus, RefreshCw, Pencil, Trash2, Search } from 'lucide-react';

// Import the new form component
import AdjustmentAddForm from './AddForm/AdjustmentAddForm';

const DoseAdjustment = () => {
  // Navigation / Pagination state
  const [pageSize, setPageSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);

  // Form visibility state
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Stateful data
  const [adjustmentData, setAdjustmentData] = useState([
    { id: 1, allergyType: 'Allergy', planType: 'Continue as Planned', sortOrder: 1 },
    { id: 2, allergyType: 'Allergy', planType: 'Repeat the Same Dose', sortOrder: 2 },
    { id: 3, allergyType: 'Allergy', planType: 'Reduce the Dose', sortOrder: 3 },
    { id: 4, allergyType: 'Allergy', planType: 'Skip / Delay Dose', sortOrder: 4 },
    { id: 5, allergyType: 'Allergy', planType: 'Stop Treatment Temporarily', sortOrder: 5 },
    { id: 6, allergyType: 'Allergy', planType: 'Discontinue Immunotherapy', sortOrder: 6 },
    { id: 1002, allergyType: 'Allergy', planType: 'Maintenance', sortOrder: 7 },
    { id: 2002, allergyType: 'Bio', planType: 'Continue as Planned', sortOrder: 8 },
    { id: 2003, allergyType: 'Bio', planType: 'Adjust Frequency', sortOrder: 9 },
    { id: 2004, allergyType: 'Bio', planType: 'Adjust Dose', sortOrder: 10 },
    { id: 2005, allergyType: 'Bio', planType: 'Skip / Delay Dose', sortOrder: 11 },
    { id: 2006, allergyType: 'Bio', planType: 'Stop Treatment Temporarily', sortOrder: 12 },
    { id: 2007, allergyType: 'Bio', planType: 'Discontinue Biologic', sortOrder: 13 },
    { id: 2008, allergyType: 'Bio', planType: 'Switch Biologic', sortOrder: 14 },
    { id: 2009, allergyType: 'Allergy', planType: 'Change Frequency', sortOrder: 15 },
  ]);

  // Dynamic Footer Calculations
  const totalCount = adjustmentData.length;
  const startEntry = totalCount === 0 ? 0 : (pageIndex * pageSize) + 1;
  const endEntry = Math.min((pageIndex + 1) * pageSize, totalCount);

  // Compute the next automatic Sort Order
  const nextSortOrder = adjustmentData.length > 0 
    ? Math.max(...adjustmentData.map(item => item.sortOrder)) + 1 
    : 1;

  // Handle Pagination changes
  const handleOptionChanged = (e) => {
    if (e.name === 'paging.pageSize') setPageSize(e.value);
    if (e.name === 'paging.pageIndex') setPageIndex(e.value);
  };

  // Add new row function
  const handleAddNewRow = (formData) => {
    const newId = adjustmentData.length > 0 ? Math.max(...adjustmentData.map(d => d.id)) + 1 : 1;
    
    const newEntry = {
      id: newId,
      allergyType: formData.type,
      planType: formData.plan,
      sortOrder: parseInt(formData.sortOrder) || nextSortOrder
    };

    setAdjustmentData([...adjustmentData, newEntry]);
    setIsAddFormOpen(false);
  };

  // Action Buttons Renderer
  const actionCellRender = (data) => (
    <div className="flex items-center justify-center gap-1.5 h-full">
      <button className="w-6 h-6 rounded border border-blue-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm">
        <Pencil size={11} strokeWidth={3} />
      </button>
      <button className="w-6 h-6 rounded border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm">
        <Trash2 size={11} strokeWidth={3} />
      </button>
    </div>
  );

  // Exact same styling from previous tabs for consistency
  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-3
    [&_.dx-datagrid-text-content]:!text-slate-600
    [&_.dx-datagrid-text-content]:!font-bold
    [&_.dx-datagrid-text-content]:!text-[12px]
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    
    /* THIN ROWS EXACTLY LIKE DOSE RULES TAB */
    [&_.dx-data-row>td]:!py-1
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row]:!h-[32px]
    
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!text-[12px]
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-selection-disabled]:!hidden
  `;

  return (
    <div className="bg-white flex flex-col h-full w-full rounded-xl shadow-lg border border-slate-300 overflow-hidden">
      
      {/* 1. THIN GRADIENT HEADER (Exactly matched to your requirements) */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 py-2 flex items-center justify-between shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-3">
          <div className="bg-white/40 p-1 rounded-md shadow-sm">
            <Settings2 size={18} className="text-[#2A333A]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-black text-[#2A333A] tracking-tight uppercase">Dose Adjustment Plan</h2>
              <span className="text-[10px] font-bold text-[#2A333A]/70 bg-white/30 px-2 py-0.5 rounded-full">Total: {totalCount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Add Button */}
          <button 
            onClick={() => setIsAddFormOpen(!isAddFormOpen)}
            className="bg-[#007BFF] hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={3} className={isAddFormOpen ? "rotate-45 transition-transform" : "transition-transform"} />
          </button>
          
          {/* Custom Search Input */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search plans..." 
              className="border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] w-48 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
            />
          </div>

          {/* Refresh Button */}
          <button className="w-8 h-8 bg-white/40 border border-white/20 rounded-lg flex items-center justify-center text-[#2A333A] hover:bg-white transition-all shadow-sm">
            <RefreshCw size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 2. DATAGRID CONTENT */}
      <div className={`flex-1 overflow-hidden p-3 bg-white custom-footer-grid ${gridClasses}`}>
        
        {/* INJECTED FORM */}
        <AdjustmentAddForm 
          isOpen={isAddFormOpen} 
          onClose={() => setIsAddFormOpen(false)} 
          onAdd={handleAddNewRow}
          nextSortOrder={nextSortOrder}
        />

        {/* CSS FOR TOTAL ENTRIES DESIGN */}
        <style>{`
          .custom-footer-grid .dx-datagrid-pager {
            border-top: 1px solid #e2e8f0 !important;
            padding: 0 !important;
          }
          .custom-footer-grid .dx-datagrid-pager::before {
            content: 'Total: ${totalCount}';
            display: block;
            width: 100%;
            padding: 10px 16px;
            font-size: 13px;
            font-weight: 700;
            color: #475569;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
          }
          .custom-footer-grid .dx-pager {
            padding: 10px 16px !important;
          }
        `}</style>

        <DataGrid
          dataSource={adjustmentData}
          height="100%"
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
          hoverStateEnabled={true}
          columnAutoWidth={true}
          onOptionChanged={handleOptionChanged}
        >
          <SearchPanel visible={false} />
          <LoadPanel enabled={true} />
          <Scrolling mode="standard" />
          
          <Column dataField="id" caption="# ID" width={80} cssClass="font-bold pl-4" alignment="center" />
          <Column dataField="allergyType" caption="Allergy Type" width={180} />
          <Column dataField="planType" caption="Plan Type" />
          <Column dataField="sortOrder" caption="Sort Order" width={120} alignment="center" />
          
          <Column 
            caption="Action" 
            cellRender={actionCellRender} 
            width={100} 
            alignment="center" 
            fixed={true} 
            fixedPosition="right" 
          />

          {/* 3. PAGER INTEGRATION */}
          <Paging defaultPageSize={20} />
          <Pager
            visible={true}
            allowedPageSizes={[10, 20, 50, 100]}
            displayMode="full"
            showPageSizeSelector={true}
            showInfo={false}
            showNavigationButtons={true}
          />
        </DataGrid>
      </div>
      
    </div>
  );
};

export default DoseAdjustment;