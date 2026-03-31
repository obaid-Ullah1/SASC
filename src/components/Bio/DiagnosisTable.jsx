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
  ColumnChooser,
  Summary,
  TotalItem
} from 'devextreme-react/data-grid';
import { 
  Plus, RefreshCw, Filter, CalendarDays, ClipboardList
} from 'lucide-react';

// Import the new Modal Component
import AddDiagnosisModal from './AddForm/AddDiagnosisModal';

const DiagnosisTable = () => {
  // State to control the form modal visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State to hold the table data dynamically
  const [dxData, setDxData] = useState([]);

  // Function to catch data from the form and map it to the table columns
  const handleAddNewEntry = (formData) => {
    
    // Helper function that perfectly recreates the safeName generated in the modal
    // so we can extract the correct data based on the exact label string.
    const getVal = (label) => {
      const safeName = label.replace(/[^a-zA-Z0-9]/g, '_');
      const val = formData[safeName];
      return Array.isArray(val) ? val.join(', ') : (val || '');
    };

    // Map the form data to the table's specific dataFields
    const newEntry = {
      id: dxData.length + 1, // Auto-increment ID
      patient: getVal('Patient ID'),
      ptNo: `PT-${Math.floor(1000 + Math.random() * 9000)}`, // Auto-generate dummy PT number
      encounter: getVal('Encounter ID'),
      dxDate: getVal('Diagnosis Date'),
      icd10: getVal('ICD-10 Code'),
      diagnosis: getVal('Diagnosis Name'),
      severity: getVal('Severity'),
      pft: getVal('PFT (FEV₁)'),
      allergy: getVal('Allergy Test'),
      imaging: getVal('Radiology'),
      progressNote: getVal('Progress Notes'),
      cbc: getVal('CBC w/ Diff'),
      cmp: getVal('CMP (LFT/Renal)'),
      crp: getVal('CRP / ESR'),
      eosinophil: getVal('Eosinophil Count'),
      act: getVal('ACT / ACQ'),
      easi: getVal('EASI / IGA'),
      snot22: getVal('SNOT-22'),
      exacerbation: getVal('Exacerbations'),
      specimenType: getVal('Specimen Type'),
      site: getVal('Specimen Site'),
      collectedBy: getVal('Collected By'),
      condition: getVal('Specimen Condition'),
      collectedOn: getVal('Collection Date/Time'),
      labRef: getVal('Lab Ref Number'),
      necessity: getVal('Medical Necessity'),
      uploaded: getVal('Reports Uploaded'),
      criteriaUsed: getVal('Criteria Used'),
      keyFindings: getVal('Key Findings'),
      immunoglobulins: getVal('Immunoglobulins'),
      infectionScreen: getVal('Infection Screen')
    };

    // Add the new entry to the top of the table state
    setDxData(prevData => [newEntry, ...prevData]);
  };

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
      
      {/* Exact Custom Header matching the design - UPDATED FOR MOBILE RESPONSIVENESS */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 sm:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shrink-0 border-b border-[#bef264]">
        
        {/* Title Section */}
        <div className="flex items-center gap-2 text-[#2A333A] text-[17px] font-semibold tracking-wide w-full md:w-auto">
          <ClipboardList size={20} className="text-[#2A333A]" />
          Dx Summary
        </div>

        {/* Controls Section - Optimized for mobile wrapping and stretching */}
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
          {/* Blue Plus Circle */}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#0066FF] w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95 shrink-0"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
   
          {/* White Date Pill: From */}
          <div className="bg-white flex-1 md:flex-none justify-center md:justify-start px-2 sm:px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-slate-50 md:ml-1 whitespace-nowrap">
            <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500">From:</span>
            <span className="text-[11px] sm:text-[12px] font-bold text-slate-800">01/31/2026</span>
            <CalendarDays size={14} className="text-slate-400 ml-1 hidden sm:block" />
          </div>

          {/* White Date Pill: To */}
          <div className="bg-white flex-1 md:flex-none justify-center md:justify-start px-2 sm:px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-slate-50 whitespace-nowrap">
            <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500">To:</span>
            <span className="text-[11px] sm:text-[12px] font-bold text-slate-800">03/02/2026</span>
            <CalendarDays size={14} className="text-slate-400 ml-1 hidden sm:block" />
          </div>
          
          {/* White Refresh Square */}
          <button className="bg-white w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 shadow-sm hover:bg-slate-50 transition-all md:ml-1 shrink-0">
            <RefreshCw size={15} strokeWidth={2.5} />
          </button>
          
          {/* Red Filter Square */}
          <button className="bg-[#E11D48] w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all shrink-0">
            <Filter size={15} strokeWidth={2.5} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* DevExtreme DataGrid */}
        <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
          <DataGrid
            dataSource={dxData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={false}
            allowColumnResizing={true}
            columnResizingMode="widget"
            showRowLines={true}
          >
            {/* Horizontal Scrolling is heavily required for 32 columns */}
            <Scrolling mode="standard" showScrollbar="always" />
            
            <SearchPanel visible={true} width={250} placeholder="Search Dx Summary..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            {/* All 32 Columns perfectly mapped */}
            <Column dataField="id" caption="ID" width={70} alignment="center" />
            <Column dataField="patient" caption="Patient" minWidth={150} />
            <Column dataField="ptNo" caption="PT No" minWidth={100} />
            <Column dataField="encounter" caption="Encounter" minWidth={120} />
            <Column dataField="dxDate" caption="Dx Date" dataType="date" minWidth={120} alignment="center" />
            <Column dataField="icd10" caption="ICD-10" minWidth={100} />
            <Column dataField="diagnosis" caption="Diagnosis" minWidth={150} />
            <Column dataField="severity" caption="Severity" minWidth={100} />
            <Column dataField="pft" caption="PFT" minWidth={100} />
            <Column dataField="allergy" caption="Allergy" minWidth={100} />
            <Column dataField="imaging" caption="Imaging" minWidth={100} />
            <Column dataField="progressNote" caption="Progress Note" minWidth={150} />
            <Column dataField="cbc" caption="CBC" minWidth={80} />
            <Column dataField="cmp" caption="CMP" minWidth={80} />
            <Column dataField="crp" caption="CRP" minWidth={80} />
            <Column dataField="eosinophil" caption="Eosinophil" minWidth={100} />
            <Column dataField="act" caption="ACT" minWidth={80} />
            <Column dataField="easi" caption="EASI" minWidth={80} />
            <Column dataField="snot22" caption="SNOT-22" minWidth={100} />
            <Column dataField="exacerbation" caption="Exacerbation" minWidth={120} />
            <Column dataField="specimenType" caption="Specimen Type" minWidth={130} />
            <Column dataField="site" caption="Site" minWidth={100} />
            <Column dataField="collectedBy" caption="Collected By" minWidth={120} />
            <Column dataField="condition" caption="Condition" minWidth={100} />
            <Column dataField="collectedOn" caption="Collected On" dataType="date" minWidth={120} alignment="center" />
            <Column dataField="labRef" caption="Lab Ref" minWidth={100} />
            <Column dataField="necessity" caption="Necessity" minWidth={100} />
            <Column dataField="uploaded" caption="Uploaded" minWidth={100} />
            <Column dataField="criteriaUsed" caption="Criteria Used" minWidth={120} />
            <Column dataField="keyFindings" caption="Key Findings" minWidth={150} />
            <Column dataField="immunoglobulins" caption="Immunoglobulins" minWidth={150} />
            <Column dataField="infectionScreen" caption="Infection Screen" minWidth={140} />

            <Summary>
              <TotalItem column="id" summaryType="count" displayFormat="Total: {0}" />
            </Summary>

            <Paging defaultPageSize={20} />
            <Pager 
              visible={true} 
              showInfo={true} 
              displayMode="full" 
              showPageSizeSelector={true} 
              allowedPageSizes={[10, 20, 50, 100]} 
            />
          </DataGrid>
        </div>
      </div>

      {/* Render the Form Modal and pass the submit handler */}
      <AddDiagnosisModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmitData={handleAddNewEntry}
      />

    </div>
  );
};

export default DiagnosisTable;