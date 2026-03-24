import React, { useState } from 'react';
import DataGrid, { Column, Scrolling } from 'devextreme-react/data-grid';
import { List, HelpCircle, Plus, Pencil, Trash2, Settings } from 'lucide-react';

// Import the new inline form
import RulesAddForm from './AddForm/RulesAddForm';

const RuleNameTab = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Default data in ascending order
  const [tableData, setTableData] = useState([
    { id: '1003', ruleName: 'SAER-1' },
    { id: '1004', ruleName: 'SAER-2' },
    { id: '1005', ruleName: 'SAER-3' },
    { id: '1006', ruleName: 'Tets' },
  ]);

  // HANDLER UPDATED: Now adds to the bottom of the list
  const handleAddNewRule = (newRuleName) => {
    const nextId = tableData.length > 0 
      ? Math.max(...tableData.map(r => parseInt(r.id))) + 1 
      : 1000;

    const newEntry = {
      id: nextId.toString(),
      ruleName: newRuleName
    };

    // Use [...tableData, newEntry] to show the new record at the bottom
    setTableData([...tableData, newEntry]);
    setIsAddFormOpen(false); 
  };

  // REDUCED BUTTON SIZES TO FIT THIN ROWS
  const actionCellRender = (data) => {
    return (
      <div className="flex items-center justify-center gap-1.5 h-full">
        <button 
          className="w-6 h-6 rounded border border-blue-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm"
          title="Edit"
        >
          <Pencil size={11} strokeWidth={3} />
        </button>
        <button 
          onClick={() => {
            setTableData(prev => prev.filter(item => item.id !== data.data.id));
          }}
          className="w-6 h-6 rounded border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
          title="Delete"
        >
          <Trash2 size={11} strokeWidth={3} />
        </button>
      </div>
    );
  };

  const headerIdRender = () => <div className="font-bold text-slate-700 text-[12px] uppercase tracking-wider text-center w-full"># ID</div>;
  const headerRuleNameRender = () => (
    <div className="flex items-center gap-2 font-bold text-slate-700 text-[12px] uppercase tracking-wider">
      <List size={14} className="text-[#00A3FF]" /> Rule Name
    </div>
  );
  const headerActionRender = () => (
    <div className="flex items-center justify-center gap-2 font-bold text-slate-700 text-[12px] uppercase tracking-wider w-full">
      <Settings size={14} className="text-[#00A3FF]" /> Action
    </div>
  );

  // UPDATED CSS: MATCHING ALL OTHER TABS EXACTLY
  const gridClasses = `
    [&_.dx-datagrid-header-panel]:!hidden 
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-2
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    
    /* ULTRA THIN ROWS & PERFECT CENTERING */
    [&_.dx-data-row>td]:!py-0.5
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row]:!h-[28px]
    
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-data-row>td]:!text-[11.5px]
    [&_.dx-datagrid-table_td]:!border-slate-200
    [&_.dx-datagrid-borders_>_div]:!border-slate-300
    [&_.dx-selection-disabled]:!hidden
  `;

  return (
    <div className="bg-white flex flex-col h-full w-full rounded-xl shadow-md border border-slate-300 overflow-hidden">
      
      {/* 1. CUSTOM GRADIENT HEADER */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-5 py-2.5 flex items-center justify-between shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-3">
          <div className="bg-white/40 p-1.5 rounded-lg shadow-sm">
            <List size={20} className="text-[#2A333A]" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[16px] font-black text-[#2A333A] leading-tight tracking-wide">Rule Name</h2>
            <span className="text-[11px] text-[#2A333A]/80 font-bold mt-0.5">Create and manage dose rule names</span>
          </div>
        </div>
        <button className="w-[26px] h-[26px] rounded-md flex items-center justify-center bg-white/30 text-[#2A333A] hover:bg-white/60 transition-all shadow-sm">
          <HelpCircle size={15} strokeWidth={2.5} />
        </button>
      </div>

      {/* 2. MODERN ACTION BAR */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b-2 border-slate-200 shrink-0">
        <div className="text-[12px] font-bold text-slate-500 border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-full">
          Total Rules: <span className="text-[#00A3FF] text-[13px]">{tableData.length}</span>
        </div>
        
        <button 
          onClick={() => setIsAddFormOpen(!isAddFormOpen)}
          className={`${isAddFormOpen ? 'bg-slate-700 hover:bg-slate-800' : 'bg-[#00A3FF] hover:bg-[#008CE6]'} px-4 py-2 rounded-lg flex items-center gap-2 text-white text-[13px] font-bold shadow-md hover:shadow-lg transition-all active:scale-95`}
        >
          <Plus size={16} strokeWidth={3} className={isAddFormOpen ? "rotate-45 transition-transform" : "transition-transform"} /> 
          {isAddFormOpen ? 'Close Form' : 'Add New Rule'}
        </button>
      </div>

      {/* 3. TABLE AREA (Includes Inline Form) */}
      <div className={`flex-1 overflow-hidden bg-white p-3 flex flex-col ${gridClasses}`}>
        
        <RulesAddForm 
          isOpen={isAddFormOpen} 
          onClose={() => setIsAddFormOpen(false)} 
          onAdd={handleAddNewRule} 
        />

        <div className="flex-1 overflow-hidden">
          <DataGrid
            dataSource={tableData}
            height="100%"
            showBorders={true}
            showColumnLines={true}
            showRowLines={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
          >
            <Scrolling mode="standard" showScrollbar="always" />
            
            <Column 
              dataField="id" 
              headerCellRender={headerIdRender} 
              width={120} 
              alignment="center"
            />
            <Column 
              dataField="ruleName" 
              headerCellRender={headerRuleNameRender} 
            />
            <Column 
              caption="Action" 
              headerCellRender={headerActionRender} 
              cellRender={actionCellRender} 
              width={160} 
              alignment="center"
            />
          </DataGrid>
        </div>
      </div>

    </div>
  );
};

export default RuleNameTab;