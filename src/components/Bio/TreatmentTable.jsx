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

// Import the Treatment Form Modal we just created
import TreatmentForm from './AddForm/TreatmentForm';

const TreatmentTable = () => {
  // State to control the form modal visibility
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State to hold the table data dynamically
  const [txData, setTxData] = useState([]);

  // Function to catch data from the form and map it to the table columns
  const handleAddNewEntry = (formData) => {
    // Helper function to handle arrays (like checkboxes) and format them as comma-separated strings
    const formatValue = (val) => Array.isArray(val) ? val.join(', ') : (val || '');

    // Map the form data keys (which were auto-generated from labels) to the table's dataFields
    const newEntry = {
      id: txData.length + 1, // Auto-increment ID
      patient: formatValue(formData.Patient),
      ptNo: `PT-${Math.floor(1000 + Math.random() * 9000)}`, // Auto-generate a dummy PT number for display
      encounter: formatValue(formData.Encounter_ID),
      treatmentDate: formatValue(formData.Treatment_Date),
      indication: formatValue(formData.Indication),
      goals: formatValue(formData.Treatment_Goals),
      biologicClass: formatValue(formData.Class),
      drug: formatValue(formData.Drug),
      doseModel: formatValue(formData.Dose_Model),
      doseAmount: formatValue(formData.Dose_Amount),
      route: formatValue(formData.Route),
      frequency: formatValue(formData.Frequency),
      duration: formatValue(formData.Duration),
      setting: formatValue(formData.Setting),
      premedication: formatValue(formData.Premedication),
      administeredBy: formatValue(formData.Administered_By),
      observationTime: formatValue(formData.Observation_Time),
      vitals: formatValue(formData.Vitals),
      imaging: formatValue(formData.Imaging),
      diseaseScores: formatValue(formData.Disease_Scores),
      labMonitoring: formatValue(formData.Lab_Monitoring),
      safetyRules: formatValue(formData.Safety_Rules),
      responseWindow: formatValue(formData.Response_Window),
      responseCriteria: formatValue(formData.Response_Criteria),
      documentation: formatValue(formData.Medical_Necessity),
      reports: formatValue(formData.Reports_Uploaded),
      notes: formatValue(formData.Progress_Notes),
      logs: new Date().toLocaleDateString(), // Set current date as log
    };

    // Add the new entry to the top of the table
    setTxData(prevData => [newEntry, ...prevData]);
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
      
      {/* --- ULTRA RESPONSIVE HEADER --- */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 sm:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shrink-0 border-b border-[#bef264]">
        
        {/* Title Section matching the image */}
        <div className="flex items-center gap-2 text-[#2A333A] text-[17px] font-semibold tracking-wide w-full md:w-auto">
          <ClipboardList size={20} className="text-[#2A333A]" />
          Tx Summary List
        </div>

        {/* Controls Section - Intelligent Grid/Flex Wrapping for Mobile */}
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
          
          {/* Blue Plus Circle to open TreatmentForm */}
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
            <CalendarDays size={14} className="text-slate-400 hidden sm:block ml-1" />
          </div>

          {/* White Date Pill: To */}
          <div className="bg-white flex-1 md:flex-none justify-center md:justify-start px-2 sm:px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1 sm:gap-2 cursor-pointer hover:bg-slate-50 whitespace-nowrap">
            <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500">To:</span>
            <span className="text-[11px] sm:text-[12px] font-bold text-slate-800">03/02/2026</span>
            <CalendarDays size={14} className="text-slate-400 hidden sm:block ml-1" />
          </div>
          
          {/* Right Action Buttons */}
          <button className="bg-white w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 shadow-sm hover:bg-slate-50 transition-all md:ml-1 shrink-0">
            <RefreshCw size={15} strokeWidth={2.5} />
          </button>
          <button className="bg-[#E11D48] w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all shrink-0">
            <Filter size={15} strokeWidth={2.5} fill="currentColor" />
          </button>

        </div>
      </div>
      {/* --- END HEADER --- */}

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* DevExtreme DataGrid */}
        <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
          <DataGrid
            dataSource={txData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={false}
            allowColumnResizing={true}
            columnResizingMode="widget"
            showRowLines={true}
          >
            {/* Horizontal Scrolling for many columns */}
            <Scrolling mode="standard" showScrollbar="always" />
            
            <SearchPanel visible={true} width={250} placeholder="Search Treatment Summary..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            {/* 29 Columns mapped exactly from your Tx Summary List screenshot */}
            <Column dataField="id" caption="ID" width={70} alignment="center" />
            <Column dataField="patient" caption="Patient" minWidth={150} />
            <Column dataField="ptNo" caption="PT No" minWidth={100} />
            <Column dataField="encounter" caption="Encounter" minWidth={120} />
            
            {/* Treatment Date with native calendar filter icon */}
            <Column dataField="treatmentDate" caption="Treatment Date" dataType="date" minWidth={140} alignment="center" />
            
            <Column dataField="indication" caption="Indication" minWidth={140} />
            <Column dataField="goals" caption="Goals" minWidth={150} />
            <Column dataField="biologicClass" caption="Biologic Class" minWidth={140} />
            <Column dataField="drug" caption="Drug" minWidth={120} />
            <Column dataField="doseModel" caption="Dose Model" minWidth={120} />
            <Column dataField="doseAmount" caption="Dose Amount" minWidth={120} />
            <Column dataField="route" caption="Route" minWidth={100} />
            <Column dataField="frequency" caption="Frequency" minWidth={120} />
            <Column dataField="duration" caption="Duration" minWidth={120} />
            <Column dataField="setting" caption="Setting" minWidth={120} />
            <Column dataField="premedication" caption="Premedication" minWidth={140} />
            <Column dataField="administeredBy" caption="Administered By" minWidth={140} />
            <Column dataField="observationTime" caption="Observation Time" minWidth={150} />
            <Column dataField="vitals" caption="Vitals" minWidth={120} />
            <Column dataField="imaging" caption="Imaging" minWidth={120} />
            <Column dataField="diseaseScores" caption="Disease Scores" minWidth={140} />
            <Column dataField="labMonitoring" caption="Lab Monitoring" minWidth={140} />
            <Column dataField="safetyRules" caption="Safety Rules" minWidth={150} />
            <Column dataField="responseWindow" caption="Response Window" minWidth={150} />
            <Column dataField="responseCriteria" caption="Response Criteria" minWidth={150} />
            <Column dataField="documentation" caption="Documentation" minWidth={140} />
            <Column dataField="reports" caption="Reports" minWidth={120} />
            <Column dataField="notes" caption="Notes" minWidth={150} />
            <Column dataField="logs" caption="Logs" minWidth={120} />

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
      <TreatmentForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSubmitData={handleAddNewEntry} 
      />

    </div>
  );
};

export default TreatmentTable;