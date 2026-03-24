import React, { useState } from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Pager, 
  Paging, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { Syringe, Plus, RefreshCw, Pencil, Trash2, Search } from 'lucide-react';

// Import your custom Light Blue form component
import DoseAddForm from './AddForm/DoseAddForm';

const DoseRulesTab = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const [scheduleData, setScheduleData] = useState(
    Array.from({ length: 36 }, (_, i) => ({
      id: i + 1,
      order: i + 1,
      rule: 'SAER-1',
      vialDilution: i < 6 ? '1:100000' : i < 12 ? '1:10000' : '1:1000',
      doseMl: (0.05 + (i % 6) * 0.10).toFixed(2),
      escalation: 'Hybrid',
      value: '—',
      notes: ''
    }))
  );

  const handleAddNewRow = (formData) => {
    const newId = scheduleData.length > 0 ? Math.max(...scheduleData.map(d => d.id)) + 1 : 1;
    
    const newEntry = {
      id: newId,
      order: parseInt(formData.displayOrder) || newId,
      rule: formData.rule,
      vialDilution: formData.vialDilution,
      doseMl: formData.doseMl,
      escalation: formData.escalationMethod === 'Multiply (x)' ? 'Multiply' : formData.escalationMethod,
      value: formData.finalDoseMl || '—',
      notes: formData.notes || ''
    };

    setScheduleData([...scheduleData, newEntry]);
    setIsAddFormOpen(false);
  };

  // Cell Renderers - UPDATED FOR PERFECT VERTICAL CENTERING
  const dilutionCellRender = (data) => (
    <span className="text-[#FF4D94] font-bold tracking-tight">{data.value}</span>
  );

  const escalationCellRender = (data) => (
    <div className="flex justify-center items-center h-full">
      <span className="bg-[#FFC107] text-[#2A333A] text-[9.5px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase leading-none">
        {data.value}
      </span>
    </div>
  );

  // REDUCED ICON SIZES (w-6 h-6 and icon size 11)
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

  // Styling overrides - PERFECT CENTERING & THIN ROWS
  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-3
    [&_.dx-datagrid-text-content]:!text-slate-600
    [&_.dx-datagrid-text-content]:!font-bold
    [&_.dx-datagrid-text-content]:!text-[12px]
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    
    /* MODIFICATION: SLIGHTLY THIN ROWS & PERFECT VERTICAL CENTER */
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
      
      {/* 1. THIN GRADIENT HEADER */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 py-2 flex items-center justify-between shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-3">
          <div className="bg-white/40 p-1 rounded-md shadow-sm">
            <Syringe size={18} className="text-[#2A333A]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-black text-[#2A333A] tracking-tight uppercase">Schedule Rows</h2>
              <span className="text-[10px] font-bold text-[#2A333A]/70 bg-white/30 px-2 py-0.5 rounded-full">Total: {scheduleData.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddFormOpen(!isAddFormOpen)}
            className="bg-[#007BFF] hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95"
          >
            <Plus size={18} strokeWidth={3} className={isAddFormOpen ? "rotate-45 transition-transform" : "transition-transform"} />
          </button>
          
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search rules..." 
              className="border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] w-48 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
            />
          </div>

          <button className="w-8 h-8 bg-white/40 border border-white/20 rounded-lg flex items-center justify-center text-[#2A333A] hover:bg-white transition-all shadow-sm">
            <RefreshCw size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 2. DATAGRID CONTENT */}
      <div className={`flex-1 overflow-hidden p-3 bg-white custom-footer-grid ${gridClasses}`}>
        
        {/* INJECTED THE FORM HERE */}
        <DoseAddForm 
          isOpen={isAddFormOpen} 
          onClose={() => setIsAddFormOpen(false)} 
          onAdd={handleAddNewRow} 
        />
        
        {/* MODIFICATION: TOTAL ENTRIES DESIGN */}
        <style>{`
          .custom-footer-grid .dx-datagrid-pager {
            border-top: 1px solid #e2e8f0 !important;
            padding: 0 !important;
          }
          .custom-footer-grid .dx-datagrid-pager::before {
            content: 'Total: ${scheduleData.length}';
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
          dataSource={scheduleData}
          height="100%"
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
          hoverStateEnabled={true}
          columnAutoWidth={true}
        >
          <SearchPanel visible={false} />
          <LoadPanel enabled={true} />
          <Scrolling mode="standard" />
          
          <Column dataField="id" caption="Id" width={55} alignment="center" />
          <Column dataField="order" caption="Order" width={65} alignment="center" />
          <Column dataField="rule" caption="Rule" width={110} />
          <Column 
            dataField="vialDilution" 
            caption="Vial Dilution" 
            cellRender={dilutionCellRender} 
            minWidth={140}
          />
          <Column dataField="doseMl" caption="Dose (mL)" width={100} alignment="center" />
          <Column 
            dataField="escalation" 
            caption="Escalation" 
            cellRender={escalationCellRender} 
            width={120} 
          />
          <Column dataField="value" caption="Value" width={80} alignment="center" />
          <Column dataField="notes" caption="Notes" minWidth={150} />
          <Column 
            caption="Actions" 
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
            showInfo={true}
            showNavigationButtons={true}
          />
        </DataGrid>
      </div>
      
    </div>
  );
};

export default DoseRulesTab;