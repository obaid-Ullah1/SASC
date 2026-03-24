import React, { useState } from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { List, Plus, RefreshCw, Pencil, Search, Filter, Tag, Settings, CheckCircle2, X } from 'lucide-react';

// Import your new form component
import AddInjName from './AddForm/AddInjName';

const InjType = () => {
  // State to control form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Sample data state
  const [tableData, setTableData] = useState([
    { id: 1, typeName: 'Standard', code: 'SAS', isCat: true },
    { id: 4, typeName: 'Custom', code: 'SAC', isCat: true },
    { id: 1008, typeName: 'Priority', code: 'SAP', isCat: true },
    { id: 1009, typeName: 'Executive', code: 'SAE', isCat: true },
    { id: 1010, typeName: 'Mix', code: 'MIX', isCat: true },
    { id: 2010, typeName: 'Average', code: 'AVG', isCat: true },
  ]);

  // Function to add new data from the form to the grid
  const handleAddNewData = (newData) => {
    const nextId = tableData.length > 0 
      ? Math.max(...tableData.map(item => item.id)) + 1 
      : 1;
    
    const entryWithId = { id: nextId, ...newData };
    setTableData([entryWithId, ...tableData]); // Add new record to the top
    setIsFormOpen(false); // Close form after saving
  };

  // --- CELL RENDERERS ---
  const isCatRender = (data) => (
    <div className="flex items-center justify-center h-full">
      {data.value ? (
        <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide">
          <CheckCircle2 size={10} strokeWidth={3} /> yes
        </span>
      ) : (
        <span className="text-slate-400 font-bold text-[10px] uppercase">No</span>
      )}
    </div>
  );

  const actionCellRender = () => (
    <div className="flex items-center justify-center gap-1.5 h-full">
      <button 
        className="w-6 h-6 rounded border border-blue-200 text-[#007BFF] flex items-center justify-center hover:bg-[#007BFF] hover:text-white transition-all shadow-sm active:scale-95"
        title="Edit"
      >
        <Pencil size={11} strokeWidth={3} />
      </button>
    </div>
  );

  // --- HEADER RENDERERS ---
  const headerIdRender = () => <div className="font-bold text-slate-500 text-[11px] uppercase tracking-wider text-center w-full"># ID</div>;
  const headerTypeRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full">
      <Tag size={13} className="text-[#00A3FF]" /> TYPE NAME
    </div>
  );
  const headerCodeRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full">
      <Tag size={13} className="text-[#00A3FF]" /> CODE
    </div>
  );
  const headerIsCatRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full">
      <Tag size={13} className="text-[#00A3FF]" /> ISCAT
    </div>
  );
  const headerActionRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full">
      <Settings size={13} className="text-[#EAB308]" /> ACTIONS
    </div>
  );

  const gridClasses = `
    [&_.dx-datagrid-header-panel]:!hidden 
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-2.5
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!py-0.5
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row]:!h-[28px]
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-data-row>td]:!text-[11.5px]
    [&_.dx-datagrid-table_td]:!border-slate-200
    [&_.dx-datagrid-borders_>_div]:!border-slate-300
  `;

  return (
    <div className="bg-white flex flex-col h-full w-full rounded-xl shadow-md border border-slate-300 overflow-hidden">
      
      {/* 1. HEADER */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 py-2.5 flex items-center justify-between shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-2">
          <List size={18} className="text-[#2A333A]" />
          <h2 className="text-[15px] font-black text-[#2A333A] tracking-wide">Inj Type List</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Add/Close Toggle Button */}
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`${isFormOpen ? 'bg-rose-500' : 'bg-[#007BFF]'} hover:opacity-90 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95`}
            title={isFormOpen ? "Close Form" : "Add New Type"}
          >
            {isFormOpen ? <X size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
          </button>
          
          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={13} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="border border-white/60 rounded-md pl-8 pr-3 py-1 text-[12px] w-40 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 transition-all bg-white/90"
            />
          </div>

          <button className="w-7 h-7 bg-white/50 border border-white/30 rounded flex items-center justify-center text-[#2A333A] hover:bg-white transition-all shadow-sm">
            <RefreshCw size={13} strokeWidth={2.5} />
          </button>

          <button className="w-7 h-7 bg-rose-600 border border-rose-700 rounded flex items-center justify-center text-white hover:bg-rose-700 transition-all shadow-sm">
            <Filter size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden p-3 gap-3">
        
        {/* ADD FORM SECTION (Conditionally Rendered) */}
        {isFormOpen && (
          <AddInjName 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            onAdd={handleAddNewData} 
          />
        )}

        {/* DATAGRID TABLE */}
        <div className={`flex-1 overflow-hidden bg-white border border-slate-200 rounded-lg shadow-inner ${gridClasses}`}>
          <DataGrid
            dataSource={tableData}
            height="100%"
            showBorders={false}
            showColumnLines={true}
            showRowLines={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            columnAutoWidth={true}
          >
            <SearchPanel visible={false} />
            <LoadPanel enabled={true} />
            <Scrolling mode="standard" showScrollbar="always" />
            
            <Column dataField="id" headerCellRender={headerIdRender} width={100} alignment="center" />
            <Column dataField="typeName" headerCellRender={headerTypeRender} alignment="center" />
            <Column dataField="code" headerCellRender={headerCodeRender} alignment="center" width={150} />
            <Column dataField="isCat" headerCellRender={headerIsCatRender} cellRender={isCatRender} alignment="center" width={150} />
            <Column 
              caption="Action" 
              headerCellRender={headerActionRender} 
              cellRender={actionCellRender} 
              width={100} 
              alignment="center" 
              fixed={true} 
              fixedPosition="right" 
            />
          </DataGrid>
        </div>
      </div>
    </div>
  );
};

export default InjType;