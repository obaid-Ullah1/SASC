import React, { useState, useCallback } from 'react';
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
import { CalendarCheck, Edit, Activity, FileText } from 'lucide-react';

import DoubleSearchHeader from '../global/DoubleSearchHeader';
import AddAppointment from './AddForm/AddAppointment'; 
import SkinTestForm from './AddForm/SkinTestForm';
import InjectionSheet from './AddForm/InjectionSheet'; 

// IMPORT NEW INJECTION LOG
import InjectionLog from './InjectionLog';

const AppointmentTable = () => {
  // 1. Edit Form State (1st Icon)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // 2. Skin Testing Drawer State (2nd Icon)
  const [isSkinTestOpen, setIsSkinTestOpen] = useState(false);
  const [selectedPatientForTest, setSelectedPatientForTest] = useState('');

  // 3. Injection Sheet State (3rd Icon)
  const [isInjectionSheetOpen, setIsInjectionSheetOpen] = useState(false);
  const [selectedInjectionData, setSelectedInjectionData] = useState(null);

  // 4. Injection Log State (Clicking Patient No)
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [logPatientData, setLogPatientData] = useState(null);

  const [fromDate, setFromDate] = useState('2026-03-03');
  const [toDate, setToDate] = useState('2026-03-03');

  const apptData = [
    { id: 27303, fullName: 'Casillas, Norma', patientNo: '3601', patientType: 'Allergy', status: 'Inactive', apptType: 'Allergy Shots', office: 'Fresno North', verification: '-', dos: '2026-03-03', time: '', ptCode: '', nextDos: '', inActive: 'Active' },
    { id: 27304, fullName: 'Martinez, Sylvia', patientNo: '3724', patientType: 'Allergy', status: 'Scheduled', apptType: 'Follow up', office: 'Fresno North', verification: '-', dos: '2026-03-03', time: '', ptCode: '', nextDos: '', inActive: 'Active' },
    { id: 27305, fullName: 'Ramos Ramirez, Gizel', patientNo: '3383', patientType: 'Allergy', status: 'Scheduled', apptType: 'Special Testing', office: 'Fresno North', verification: '-', dos: '2026-03-03', time: '', ptCode: '', nextDos: '', inActive: 'Active' },
    { id: 27306, fullName: 'Mellenberger, Heather', patientNo: '634', patientType: 'Allergy', status: 'Inactive', apptType: 'Allergy Shots', office: 'Fresno North', verification: '-', dos: '2026-03-03', time: '', ptCode: '', nextDos: '', inActive: 'Active' },
    { id: 27307, fullName: 'Caldera, Giovani', patientNo: '1558', patientType: 'Allergy', status: 'Scheduled', apptType: 'Follow up', office: 'Fresno North', verification: '-', dos: '2026-03-03', time: '', ptCode: '', nextDos: '', inActive: 'Active' },
  ];

  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!bg-white 
    [&_.dx-datagrid-header-panel]:!border-b 
    [&_.dx-datagrid-header-panel]:!border-slate-200 
    [&_.dx-datagrid-header-panel]:!py-2
    [&_.dx-datagrid-header-panel]:!px-4
    [&_.dx-group-panel-item]:!text-slate-500
    [&_.dx-datagrid-headers]:!bg-white 
    [&_.dx-datagrid-headers]:!text-[#00A3FF] 
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

  // ✅ New Custom Renderer for Patient No (Sky Blue & Clickable)
  const patientNoRender = useCallback((cellData) => {
    return (
      <span 
        className="text-[#00A3FF] font-bold cursor-pointer hover:underline transition-all"
        onClick={(e) => {
          e.stopPropagation();
          setLogPatientData({
            no: cellData.value,
            name: cellData.data.fullName
          });
          setIsLogOpen(true);
        }}
        title="View Injection Log"
      >
        {cellData.value}
      </span>
    );
  }, []);

  const statusRender = (cellData) => {
    const isScheduled = cellData.value === 'Scheduled';
    return (
      <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-sm w-20
        ${isScheduled ? 'bg-[#22C55E]' : 'bg-[#EF4444]'}`}>
        {cellData.value}
      </div>
    );
  };

  const verificationRender = (cellData) => {
    return (
      <div className="inline-flex items-center justify-center w-8 h-5 rounded-full bg-[#EF4444] text-white text-xs font-bold shadow-sm">
        {cellData.value}
      </div>
    );
  };

  const activeRender = (cellData) => {
    return (
      <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#10B981] text-white text-[11px] font-bold shadow-sm w-16">
        {cellData.value}
      </div>
    );
  };

  const actionsRender = useCallback((cellData) => {
    return (
      <div className="flex items-center gap-1.5 justify-center">
        {/* 1. Edit Icon */}
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setEditData(cellData.data); 
            setIsFormOpen(true);        
          }}
          className="text-blue-600 border border-blue-200 hover:bg-blue-50 w-7 h-7 rounded flex items-center justify-center transition-colors" 
          title="Edit Appointment"
        >
          <Edit size={14} strokeWidth={2.5} />
        </button>
        
        {/* 2. Skin Testing Icon */}
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedPatientForTest(cellData.data.fullName);
            setIsSkinTestOpen(true);
          }}
          className="text-cyan-500 border border-cyan-200 hover:bg-cyan-50 w-7 h-7 rounded flex items-center justify-center transition-colors" 
          title="Skin Testing Workflow"
        >
          <Activity size={14} strokeWidth={2.5} />
        </button>
        
        {/* 3. Injection Sheet Icon */}
        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation(); 
            setSelectedInjectionData({
              name: cellData.data.fullName,
              no: cellData.data.patientNo,
              dos: cellData.data.dos
            });
            setIsInjectionSheetOpen(true);
          }}
          className="text-cyan-500 border border-cyan-200 hover:bg-cyan-50 w-7 h-7 rounded flex items-center justify-center transition-colors" 
          title="Injection Sheet"
        >
          <FileText size={14} strokeWidth={2.5} />
        </button>
      </div>
    );
  }, []);

  return (
    <div className="flex flex-col h-full w-full gap-4">
      
      <AddAppointment 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditData(null); 
        }} 
        editData={editData} 
      />

      <SkinTestForm 
        isOpen={isSkinTestOpen}
        onClose={() => setIsSkinTestOpen(false)}
        patientName={selectedPatientForTest}
      />

      {/* Wrapping in conditional rendering completely forces the DOM to mount it on top */}
      {isInjectionSheetOpen && (
        <InjectionSheet 
          isOpen={isInjectionSheetOpen}
          onClose={() => setIsInjectionSheetOpen(false)}
          patientName={selectedInjectionData?.name}
          patientNo={selectedInjectionData?.no}
          dos={selectedInjectionData?.dos}
        />
      )}

      {/* ✅ NEW INJECTION LOG MODAL */}
      <InjectionLog 
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        patientNo={logPatientData?.no}
        patientName={logPatientData?.name}
      />

      {/* MAIN TABLE CONTAINER */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
        
        <DoubleSearchHeader 
          title="Appointments" 
          icon={<CalendarCheck size={20} />}
          onAdd={() => {
            setEditData(null); 
            setIsFormOpen(!isFormOpen);
          }}
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
          onRefresh={() => console.log("Refreshing Data...")}
          onFilter={() => console.log("Toggle Filter Drawer...")}
        />

        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
            <DataGrid
              dataSource={apptData}
              height="100%"
              showBorders={true}
              rowAlternationEnabled={true}
              columnAutoWidth={false}
              allowColumnResizing={true}
              columnResizingMode="widget"
              showRowLines={true}
            >
              <Scrolling mode="standard" showScrollbar="always" />
              
              <SearchPanel visible={true} width={250} placeholder="Search..." />
              <ColumnChooser enabled={true} mode="select" />
              <FilterRow visible={true} />
              <HeaderFilter visible={true} />
              <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

              <Column dataField="id" caption="ID" width={70} alignment="center" />
              <Column dataField="fullName" caption="Full Name" minWidth={180} />
              
              {/* ✅ UPDATED PATIENT NO COLUMN */}
              <Column 
                dataField="patientNo" 
                caption="Patient No" 
                minWidth={100} 
                alignment="center"
                cellRender={patientNoRender} 
              />
              
              <Column dataField="patientType" caption="Patient Type" minWidth={120} />
              <Column dataField="status" caption="Status" minWidth={110} alignment="center" cellRender={statusRender} />
              <Column dataField="apptType" caption="Appt Type" minWidth={150} />
              <Column dataField="office" caption="Office" minWidth={130} />
              <Column dataField="verification" caption="Verification" minWidth={100} alignment="center" cellRender={verificationRender} />
              <Column dataField="dos" caption="DoS" dataType="date" minWidth={110} alignment="center" />
              <Column dataField="time" caption="Time" minWidth={90} />
              <Column dataField="ptCode" caption="PT Code" minWidth={90} />
              <Column dataField="nextDos" caption="Next DoS" dataType="date" minWidth={110} />
              <Column dataField="inActive" caption="In Active" minWidth={100} alignment="center" cellRender={activeRender} />
              <Column caption="Actions" width={120} alignment="center" cellRender={actionsRender} allowFiltering={false} allowSorting={false} />

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
      </div>
    </div>
  );
};

export default AppointmentTable;