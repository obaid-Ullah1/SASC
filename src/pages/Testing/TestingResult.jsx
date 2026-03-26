import React, { useState, useMemo } from 'react';
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
  TotalItem
} from 'devextreme-react/data-grid';
import { Eye, Pencil, Printer } from 'lucide-react';

// Import Header
import DoubleSearchHeader from '../../components/global/DoubleSearchHeader';

// ✅ IMPORT THE NEW COMPONENT
import RadioTestResult from '../../components/Injection/AddForms/RadioTestResult';

const TestingResult = () => {
  // 1. DATE STATES (Synced with Header)
  const [fromDate, setFromDate] = useState("2024-05-30");
  const [toDate, setToDate] = useState("2026-03-26");
  
  // 2. MODAL/VIEW STATE
  const [selectedResult, setSelectedResult] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // 3. MASTER DATA
  const [testingData] = useState([
    { id: 3703, patient: "Gonzalez , Eliana", patientNo: 3905, code: "EGO", testDate: "2026-03-16", performedBy: "Dr. Smith", testType: "SPT-90", createdDate: "2026-03-17" },
    { id: 1028, patient: "Sanchez , Estelito", patientNo: 3777, code: "ESA", testDate: "2026-03-14", performedBy: "Dr. Adams", testType: "Patch Test", createdDate: "2026-03-19" },
    { id: 3705, patient: "Ponce , Jeremiah", patientNo: 3526, code: "JPO", testDate: "2026-03-14", performedBy: "Sarah J.", testType: "SPT-90", createdDate: "2026-03-18" },
    { id: 3706, patient: "Zamarripa , Madelyn", patientNo: 3906, code: "MZA", testDate: "2026-03-14", performedBy: "Sarah J.", testType: "SPT-90", createdDate: "2026-03-18" },
    { id: 3700, patient: "Herrera , Moises", patientNo: 2372, code: "MOH", testDate: "2026-03-13", performedBy: "Dr. Smith", testType: "SPT-Food 1", createdDate: "2026-03-17" },
    { id: 3701, patient: "Ibarra Mendoza , Beatriz", patientNo: 3801, code: "BIB", testDate: "2026-03-13", performedBy: "Dr. Smith", testType: "SPT-90", createdDate: "2026-03-17" },
    { id: 3702, patient: "Tamayo , Mia", patientNo: 3696, code: "MTA", testDate: "2026-03-13", performedBy: "Dr. Smith", testType: "SPT-90", createdDate: "2026-03-17" },
    { id: 3692, patient: "Campos , Jacee", patientNo: 2871, code: "JCP", testDate: "2026-03-12", performedBy: "Sarah J.", testType: "SPT-Food 1", createdDate: "2026-03-12" },
    { id: 3693, patient: "Perez , Sadie Annmarie", patientNo: 3844, code: "SPE", testDate: "2026-03-12", performedBy: "Sarah J.", testType: "SPT-Food 1", createdDate: "2026-03-12" },
    { id: 3694, patient: "Stroud , Amiyah", patientNo: 3852, code: "AST", testDate: "2026-03-12", performedBy: "Sarah J.", testType: "LIMITED/PEDS", createdDate: "2026-03-12" },
  ]);

  // 4. FILTER LOGIC: Filter data based on header dates
  const filteredData = useMemo(() => {
    return testingData.filter(item => {
      const testDate = new Date(item.testDate);
      const start = new Date(fromDate);
      const end = new Date(toDate);
      return testDate >= start && testDate <= end;
    });
  }, [testingData, fromDate, toDate]);

  // 5. EVENT HANDLERS
  const handleViewClick = (data) => {
    setSelectedResult(data);
    setIsViewOpen(true);
  };

  // Custom Renderers
  const patientCellRender = (d) => (
    <span className="text-[#00A3FF] font-bold cursor-pointer hover:underline">
      {d.value}
    </span>
  );

  const actionCellRender = (cellData) => (
    <div className="flex items-center justify-center gap-2">
      {/* CLICKABLE EYE ICON */}
      <button 
        onClick={() => handleViewClick(cellData.data)}
        className="text-[#00A3FF] border border-[#00A3FF]/30 bg-blue-50 hover:bg-[#00A3FF] hover:text-white p-1 rounded transition-all active:scale-90" 
        title="View Details"
      >
        <Eye size={14} strokeWidth={2.5} />
      </button>
      <button className="text-[#00A3FF] border border-[#00A3FF]/30 bg-blue-50 hover:bg-[#00A3FF] hover:text-white p-1 rounded transition-colors" title="Edit">
        <Pencil size={14} strokeWidth={2.5} />
      </button>
      <button className="text-emerald-500 border border-emerald-500/30 bg-emerald-50 hover:bg-emerald-500 hover:text-white p-1 rounded transition-colors" title="Print">
        <Printer size={14} strokeWidth={2.5} />
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
    [&_.dx-datagrid-headers]:!bg-white 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[12px]
    [&_.dx-datagrid-filter-row]:!bg-white
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row>td]:!py-1
    [&_.dx-datagrid-pager]:!border-t 
    [&_.dx-datagrid-pager]:!border-slate-200 
    [&_.dx-datagrid-pager]:!bg-white 
    [&_.dx-datagrid-pager]:!py-3
    [&_.dx-datagrid-pager]:!px-4
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      {/* HEADER WORKING WITH DATE STATE */}
      <DoubleSearchHeader 
        title="Skin Testing List" 
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
          
          <style>{`
            .custom-footer-grid .dx-datagrid { border: none !important; }
            .custom-footer-grid .dx-pager { padding: 10px 16px !important; }
          `}</style>

          <DataGrid
            dataSource={filteredData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            showColumnLines={true}
            hoverStateEnabled={true}
          >
            <Scrolling mode="standard" showScrollbar="always" />
            
            <SearchPanel visible={true} width={250} placeholder="Search patient..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            <Column dataField="id" caption="ID" width={80} alignment="center" />
            <Column dataField="patient" caption="Patient" minWidth={200} cellRender={patientCellRender} />
            <Column dataField="patientNo" caption="Patient No" alignment="center" />
            <Column dataField="code" caption="Code" alignment="center" />
            <Column dataField="testDate" caption="Test Date" dataType="date" alignment="center" />
            <Column dataField="performedBy" caption="Performed By" alignment="center" />
            <Column dataField="testType" caption="Test Type" alignment="center" />
            <Column dataField="createdDate" caption="Created Date" dataType="date" alignment="center" />
            
            <Column 
              caption="Actions" 
              alignment="center" 
              width={120} 
              cellRender={actionCellRender} 
              allowFiltering={false}
              allowSorting={false}
            />

            <Summary>
              <TotalItem column="id" summaryType="count" displayFormat="{0}" />
            </Summary>

            <Paging defaultPageSize={10} />
            <Pager 
              visible={true} 
              showInfo={true} 
              displayMode="full" 
              showPageSizeSelector={true} 
              allowedPageSizes={[10, 20, 50, 100, 500, 1000]} 
            />
          </DataGrid>
        </div>
      </div>

      {/* ✅ CONNECTED REPORT MODAL */}
      <RadioTestResult 
        isOpen={isViewOpen} 
        onClose={() => setIsViewOpen(false)} 
        data={selectedResult} 
      />

    </div>
  );
};

export default TestingResult;