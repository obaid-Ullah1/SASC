import React, { useState } from 'react';
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Paging,
  Pager,
  SearchPanel,
  LoadPanel
} from 'devextreme-react/data-grid';
import { Printer, Edit, FileText, Calendar, List } from 'lucide-react';

// Import your components
import DoubleSearchHeader from '../global/DoubleSearchHeader';
import PatientTestResult from './AddForms/PatientTestResult'; // ✅ Import the new screen

const MappingTable = () => {
  // 1. Manage State for the Header's Date Pickers
  const [fromDate, setFromDate] = useState('2026-02-26');
  const [toDate, setToDate] = useState('2026-02-26');

  // ✅ 2. NEW: State for Navigation/Modal
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock data
  const [tableData] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: 2437 + i,
      patient: i % 2 === 0 ? "Cortez, Kristina" : "Frias, Olivia",
      patientNo: 3000 + i,
      code: "KCO",
      testDate: "2026-01-28",
      testType: "SPT-90",
      createdDate: "2026-01-29"
    }))
  );

  // ✅ 3. Updated ActionCell to handle click events
  const ActionCell = (cellData) => (
    <div className="flex justify-center gap-1.5 h-full items-center">
      <button 
        onClick={() => {
            setSelectedPatient(cellData.data); // Pass row data
            setIsResultOpen(true);            // Open Screen
        }}
        className="w-6 h-6 rounded-full border border-cyan-500 text-cyan-500 flex items-center justify-center hover:bg-cyan-50 transition-all shadow-sm active:scale-90"
      >
        <Printer size={11} strokeWidth={2.5} />
      </button>
      <button className="w-6 h-6 rounded-full border border-[#00A3FF] text-[#00A3FF] flex items-center justify-center hover:bg-blue-50 transition-all shadow-sm active:scale-90">
        <Edit size={11} strokeWidth={2.5} />
      </button>
      <button className="w-6 h-6 rounded-full border border-[#16A34A] text-[#16A34A] flex items-center justify-center hover:bg-green-50 transition-all shadow-sm active:scale-90">
        <FileText size={11} strokeWidth={2.5} />
      </button>
    </div>
  );

  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!bg-white 
    [&_.dx-datagrid-header-panel]:!border-b 
    [&_.dx-datagrid-header-panel]:!border-slate-200 
    [&_.dx-datagrid-header-panel]:!py-2
    [&_.dx-datagrid-header-panel]:!px-4
    [&_.dx-group-panel-item]:!text-slate-500
    [&_.dx-datagrid-headers]:!bg-[#F8FAFC] 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[12px]
    [&_.dx-datagrid-headers_td]:!border-b
    [&_.dx-datagrid-headers_td]:!border-slate-200
    [&_.dx-datagrid-filter-row]:!bg-white
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row>td]:!py-1
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
  `;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 min-h-[400px]">
      
      <DoubleSearchHeader 
        title="Skin Testing List"
        icon={<Calendar size={20} />}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onAdd={() => console.log("Add clicked")}
        onRefresh={() => console.log("Refresh clicked")}
        onFilter={() => console.log("Filter clicked")}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
          <style>{`
            .custom-footer-grid .dx-datagrid-pager {
              border-top: 1px solid #e2e8f0 !important;
              padding: 0 !important;
            }
            .custom-footer-grid .dx-datagrid-pager::before {
              content: 'Total: ${tableData.length}';
              display: block;
              width: 100%;
              padding: 10px 16px;
              font-size: 13px;
              font-weight: 700;
              color: #475569;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
              background-color: #F8FAFC;
            }
          `}</style>

          <DataGrid
            dataSource={tableData}
            height="100%" 
            showBorders={false}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            showColumnLines={true}
            hoverStateEnabled={true}
          >
            <Scrolling mode="standard" useNative={true} />
            <LoadPanel enabled={true} />
            <GroupPanel visible={true} />
            <SearchPanel visible={true} width={240} placeholder="Search patient..." />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />

            <Column 
              dataField="id" 
              caption="ID" 
              width={80} 
              alignment="center" 
              headerCellRender={() => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} /> ID</div>}
            />
            <Column 
              dataField="patient" 
              caption="Patient" 
              alignment="left"
              cellRender={(data) => <span className="text-[#00A3FF] font-black underline cursor-pointer">{data.value}</span>}
            />
            <Column dataField="patientNo" caption="Patient No" alignment="center" />
            <Column dataField="code" caption="Code" alignment="center" />
            <Column dataField="testDate" caption="Test Date" dataType="date" alignment="center" />
            <Column dataField="testType" caption="Test Type" alignment="center" />
            <Column dataField="createdDate" caption="Created Date" dataType="date" alignment="center" />
            
            <Column 
              caption="Actions" 
              alignment="center" 
              width={120} 
              cellRender={ActionCell} // ✅ Using the internal function now
              fixed={true}
              fixedPosition="right"
            />

            <Paging defaultPageSize={15} />
            <Pager
              visible={true}
              allowedPageSizes={[15, 30, 50, 100]}
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
              displayMode="full" 
            />
          </DataGrid>
        </div>

        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>

      {/* ✅ 4. RENDERING THE TARGET SCREEN MODAL */}
      <PatientTestResult 
        isOpen={isResultOpen} 
        onClose={() => setIsResultOpen(false)} 
        patientData={selectedPatient}
      />

    </div>
  );
};

export default MappingTable;