import React from 'react';
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Paging,
  Pager,
  SearchPanel,
  ColumnChooser,
  Summary,
  TotalItem,
  Editing,
  Lookup
} from 'devextreme-react/data-grid';
import { 
  Plus, RefreshCw, Filter, User, Pill
} from 'lucide-react';

const PTMappingTable = () => {
  // Exact dropdown options from your design images
  const frequencyOptions = ["7 day", "14 day", "21 day", "28 day", "Quarterly", "6 Months", "Annual"];
  const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Dummy data strictly modeled after the design image
  const mappingData = Array.from({ length: 25 }, (_, i) => ({
    id: i === 0 ? 1 : i === 1 ? 321 : 6 + i,
    office: "",
    patientNo: 108 + i,
    fullName: i % 2 === 0 ? "Test , Leope" : "Aragon , Jean",
    patientCode: i % 2 === 0 ? "LTE" : "JAR",
    startDate: "03/22/2024",
    authUnit: "active",
    paidUnit: "-",
    balUnit: "-",
    frequency: i % 2 === 0 ? "7 day" : "14 day", // Real matching data
    day: i % 2 === 0 ? "Friday" : "Wednesday"    // Real matching data
  }));

  // Reusable component for the cyan status circle in "Auth Unit"
  const StatusCircle = () => (
    <div className="flex justify-center items-center">
      <div className="h-5 w-5 rounded-full bg-[#00BFFF] flex items-center justify-center text-white text-[14px] font-bold shadow-sm">
        -
      </div>
    </div>
  );

  // Pure Tailwind overrides for DevExtreme
  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!bg-white 
    [&_.dx-datagrid-header-panel]:!border-b 
    [&_.dx-datagrid-header-panel]:!border-slate-200 
    [&_.dx-datagrid-header-panel]:!py-2
    [&_.dx-datagrid-header-panel]:!px-4
    [&_.dx-group-panel-item]:!text-slate-500
    [&_.dx-datagrid-headers]:!bg-white 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[11px]
    [&_.dx-datagrid-headers]:!uppercase
    [&_.dx-datagrid-filter-row]:!bg-white
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-datagrid-pager]:!border-t 
    [&_.dx-datagrid-pager]:!border-slate-200 
    [&_.dx-datagrid-pager]:!bg-white 
    [&_.dx-datagrid-pager]:!py-3
    [&_.dx-datagrid-pager]:!px-4
    [&_.dx-datagrid-total-footer]:!border-t 
    [&_.dx-datagrid-total-footer]:!border-slate-200 
    [&_.dx-datagrid-total-footer]:!bg-white
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      {/* Exact Custom Header */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-5 py-3 flex items-center justify-between shrink-0">
        
        {/* Title Section */}
        <div className="flex items-center gap-2 text-[#2A333A] text-[17px] font-semibold tracking-wide">
          <Pill size={18} className="text-[#2A333A] fill-[#2A333A] -rotate-45" />
          Allergy Patient List
        </div>

        {/* Controls Section */}
        <div className="flex items-center gap-2">
          {/* Blue Plus Circle */}
          <button className="bg-[#0066FF] w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95">
            <Plus size={18} strokeWidth={3} />
          </button>
          
          {/* White Search Bar */}
          <div className="flex items-center shadow-sm rounded-full bg-white px-4 py-1.5 ml-1">
            <input 
              type="text" 
              placeholder="Search........" 
              className="w-48 lg:w-64 text-sm border-none outline-none text-slate-700 bg-transparent italic placeholder:text-slate-400" 
            />
          </div>
          
          {/* Black Refresh Square */}
          <button className="bg-[#1E293B] w-8 h-8 rounded flex items-center justify-center text-white shadow-sm hover:bg-black transition-all ml-1">
            <RefreshCw size={15} strokeWidth={2.5} />
          </button>
          
          {/* Red Filter Square */}
          <button className="bg-[#E11D48] w-8 h-8 rounded flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all">
            <Filter size={15} strokeWidth={2.5} fill="currentColor" />
          </button>

          {/* White Total Pill */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm flex items-center ml-2">
            <span className="text-[12px] font-semibold text-slate-800">Total: 509</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
          <DataGrid
            dataSource={mappingData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
          >
            {/* ENABLE EDITING: This is required for the dropdowns to become clickable/selectable */}
            <Editing 
              mode="cell" 
              allowUpdating={true} 
              selectTextOnEditStart={true} 
              startEditAction="click" 
            />

            <Scrolling mode="standard" showScrollbar="always" />
            <SearchPanel visible={true} width={250} placeholder="Search..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            <Column dataField="id" caption="#" width={60} alignment="center" allowEditing={false} />
            <Column dataField="office" caption="Office" width={100} alignment="center" allowEditing={false} />
            
            <Column 
              dataField="patientNo" 
              caption="Patient No" 
              width={120}
              allowEditing={false}
              cellRender={(d) => (
                <div className="flex items-center gap-2 text-blue-500 font-bold text-[12px]">
                  <User size={14} className="text-blue-500 fill-current" /> {d.value}
                </div>
              )}
            />
            
            <Column 
              dataField="fullName" 
              caption="Full Name" 
              minWidth={200}
              allowEditing={false}
              cellRender={(d) => (
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[12px]">
                  <User size={14} className="text-emerald-500 fill-current" /> {d.value}
                </div>
              )}
            />
            
            <Column 
              dataField="patientCode" 
              caption="Patient Code" 
              width={120}
              allowEditing={false}
              cellRender={(d) => (
                <span className="bg-[#00BFFF] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {d.value}
                </span>
              )}
            />
            
            <Column dataField="startDate" caption="Start Date" dataType="date" alignment="center" width={120} allowEditing={false} />
            <Column dataField="authUnit" caption="Auth Unit" alignment="center" width={100} allowEditing={false} cellRender={() => <StatusCircle />} />
            <Column dataField="paidUnit" caption="Paid Unit" alignment="center" width={100} allowEditing={false} />
            <Column dataField="balUnit" caption="Bal Unit" alignment="center" width={100} allowEditing={false} />
            
            {/* UPDATED: Real Dropdown for Frequency */}
            <Column 
              dataField="frequency" 
              caption="Freq" 
              alignment="center"
              width={90}
            >
              <Lookup dataSource={frequencyOptions} />
            </Column>
            
            {/* UPDATED: Real Dropdown for Day */}
            <Column 
              dataField="day" 
              caption="Day" 
              alignment="center"
              width={90}
            >
              <Lookup dataSource={dayOptions} />
            </Column>

            <Summary>
              <TotalItem column="id" summaryType="count" displayFormat="Total: {0}" />
            </Summary>

            <Paging defaultPageSize={10} />
            <Pager 
              visible={true} 
              showInfo={true} 
              displayMode="full" 
              showPageSizeSelector={true} 
              allowedPageSizes={[10, 20, 50, 100]} 
            />
          </DataGrid>
        </div>

        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Last updated: 2/27/2026, 2:13:05 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default PTMappingTable;