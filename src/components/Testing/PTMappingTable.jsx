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
  TotalItem,
  Editing,
  Lookup
} from 'devextreme-react/data-grid';
import { 
  Plus, RefreshCw, Filter, User, Pill, X, Droplet, Layers, IdCard, XCircle, Link
} from 'lucide-react';

// ✅ IMPORT THE BARCODE DETAILS MODAL
import InjCourseBarcode from '../Injection/AddForms/InjCourseBarcode';

// ✅ IMPORT THE TREATMENT LIST FORM
import TreatmentListForm from '../Injection/AddForms/TreatmentListForm';

// ✅ IMPORT THE NEW INJECTION CHART SHELL
import  InjectionChart from '../Injection/AddForms/InjectionChart';

// ==========================================
// MODAL 1: Patient Injections List
// ==========================================
const PatientInjectionsModal = ({ isOpen, onClose, patient, onInjectionClick, onPatientNameClick }) => {
  if (!isOpen || !patient) return null;

  // Mock data for the injections list
  const injections = [
    { id: 1, name: "AIT MIX 1", qty: 7.75, unit: 30 },
    { id: 2, name: "AIT MIX 2", qty: 7.75, unit: 30 },
    { id: 3, name: "AIT MIX 4", qty: 7.75, unit: 30 },
  ];

  const totalQty = injections.reduce((acc, curr) => acc + curr.qty, 0).toFixed(2);
  const totalUnit = injections.reduce((acc, curr) => acc + curr.unit, 0);

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="bg-[#1877F2] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-[16px] tracking-wide">
            {/* Updated icon to match the link icon in your screenshot */}
            <Link size={18} strokeWidth={2.5} className="rotate-45" /> Patient Injections
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Added overflow-x-auto for mobile responsiveness */}
        <div className="overflow-x-auto bg-white">
          {/* min-w-[700px] ensures the table doesn't squish on small phones, it will scroll instead */}
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[12px] font-bold text-slate-500">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 border-l border-slate-200">Patient No</th>
                <th className="py-3 px-4 border-l border-slate-200">Patient Name</th>
                <th className="py-3 px-4 border-l border-slate-200">Injection</th>
                <th className="py-3 px-4 border-l border-slate-200 text-center">Quantity</th>
                <th className="py-3 px-4 border-l border-slate-200 text-center">Unit</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {injections.map((inj, index) => (
                <tr key={inj.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-500">{index + 1}</td>
                  
                  {/* EXACT MATCH to Screenshot: Blue icon, Dark text */}
                  <td className="py-3.5 px-4 border-l border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <IdCard size={16} className="text-[#1877F2]" /> {patient.patientNo}
                    </div>
                  </td>
                  
                  {/* EXACT MATCH to Screenshot: Green icon, Dark text (Clickable) */}
                  <td className="py-3.5 px-4 border-l border-slate-100">
                    <button 
                      onClick={() => onPatientNameClick(patient)}
                      className="flex items-center gap-2 font-bold text-slate-800 hover:text-[#1877F2] transition-colors w-full text-left active:scale-[0.98]"
                      title="View Injection Chart"
                    >
                      <User size={16} className="text-[#10B981]" strokeWidth={2.5} /> {patient.fullName}
                    </button>
                  </td>
                  
                  {/* Clickable Injection Badge */}
                  <td className="py-3.5 px-4 border-l border-slate-100">
                    <button 
                      onClick={() => onInjectionClick(inj)}
                      className="inline-flex items-center gap-1.5 border border-[#cbe0fb] hover:border-[#1877F2] hover:bg-blue-50 rounded-full px-4 py-1.5 bg-white text-[#1877F2] font-bold text-[12px] shadow-sm transition-all active:scale-95 whitespace-nowrap"
                    >
                      <Pill size={14} className="-rotate-45" /> {inj.name}
                    </button>
                  </td>
                  
                  {/* EXACT MATCH to Screenshot: White Pill, Gray/Blue border, Blue Text */}
                  <td className="py-3.5 px-4 border-l border-slate-100 text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 border border-slate-200 rounded-full px-4 py-1.5 bg-white text-[#1877F2] font-bold text-[12px] shadow-sm min-w-[80px]">
                      <Droplet size={14} className="fill-[#1877F2]" /> {inj.qty}
                    </span>
                  </td>
                  
                  {/* EXACT MATCH to Screenshot: White Pill, Gray/Green border, Green Text */}
                  <td className="py-3.5 px-4 border-l border-slate-100 text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 border border-slate-200 rounded-full px-4 py-1.5 bg-white text-[#10B981] font-bold text-[12px] shadow-sm min-w-[80px]">
                      <Layers size={14} className="fill-[#10B981]" /> {inj.unit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            
            <tfoot>
              <tr className="bg-[#F8FAFC] border-t-2 border-slate-200">
                <td colSpan="4" className="py-4 px-4 text-right font-black text-slate-800 text-[13px]">
                  Grand Total:
                </td>
                <td className="py-4 px-4 text-center">
                   <span className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 bg-[#1877F2] text-white font-bold text-[12px] shadow-md min-w-[90px]">
                      <Droplet size={14} className="fill-white" /> {totalQty}
                    </span>
                </td>
                <td className="py-4 px-4 text-center">
                   <span className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-1.5 bg-[#10B981] text-white font-bold text-[12px] shadow-md min-w-[90px]">
                      <Layers size={14} className="fill-white" /> {totalUnit}
                    </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="bg-[#F8FAFC] border-t border-slate-200 px-5 py-3 flex justify-end shrink-0">
          <button onClick={onClose} className="flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 px-5 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all">
            <XCircle size={16} /> Close
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// MAIN TABLE COMPONENT
// ==========================================
const PTMappingTable = () => {
  const frequencyOptions = ["7 day", "14 day", "21 day", "28 day", "Quarterly", "6 Months", "Annual"];
  const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // ✅ MODAL STATES
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedInjection, setSelectedInjection] = useState(null);
  
  const [showAddForm, setShowAddForm] = useState(false);

  // ✅ NEW: Chart Form State
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);

  const [mappingData] = useState(Array.from({ length: 25 }, (_, i) => ({
    id: i === 0 ? 1 : i === 1 ? 321 : 6 + i,
    office: "",
    patientNo: 108 + i,
    fullName: i % 2 === 0 ? "Alcaraz Magan, Sandra" : "Aragon Louis , Jean",
    patientCode: i % 2 === 0 ? "LTE" : "JAR",
    startDate: "03/22/2024",
    authUnit: "active",
    paidUnit: "-",
    balUnit: "-",
    frequency: i % 2 === 0 ? "7 day" : "14 day",
    day: i % 2 === 0 ? "Friday" : "Wednesday"
  })));

  const StatusCircle = () => (
    <div className="flex justify-center items-center">
      <div className="h-5 w-5 rounded-full bg-[#00BFFF] flex items-center justify-center text-white text-[14px] font-bold shadow-sm">
        -
      </div>
    </div>
  );

  // DOUBLE CLICK HANDLER FOR DATA GRID
  const handleRowDblClick = (e) => {
    setSelectedPatient(e.data);
    setIsPatientModalOpen(true);
  };

  // CLICK HANDLER FOR INJECTION BADGE
  const handleOpenInjectionDetails = (injection) => {
    setSelectedInjection(injection);
    setIsDetailsModalOpen(true);
  };

  // CLICK HANDLER FOR PATIENT NAME IN MODAL
  const handleOpenChartModal = () => {
    setIsChartModalOpen(true);
  };

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
    [&_.dx-data-row]:!cursor-pointer
    [&_.dx-data-row:hover>td]:!bg-[#EFF6FF]
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 relative">
      
      {/* Exact Custom Header - RESPONSIVE */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 sm:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shrink-0">
        
        {/* Title */}
        <div className="flex items-center gap-2 text-[#2A333A] text-[16px] sm:text-[17px] font-semibold tracking-wide w-full md:w-auto">
          <Pill size={18} className="text-[#2A333A] fill-[#2A333A] -rotate-45 shrink-0" />
          Allergy Patient List
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-[#0066FF] w-[32px] h-[32px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-sm hover:bg-blue-700 transition-all active:scale-95 shrink-0"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
          
          <div className="flex items-center shadow-sm rounded-full bg-white px-3 sm:px-4 py-1.5 flex-1 sm:flex-none">
            <input 
              type="text" 
              placeholder="Search........" 
              className="w-full sm:w-48 lg:w-64 text-sm border-none outline-none text-slate-700 bg-transparent italic placeholder:text-slate-400" 
            />
          </div>
          
          <div className="flex items-center gap-2 shrink-0 ml-auto sm:ml-0">
            <button className="bg-[#1E293B] w-[32px] h-[32px] sm:w-8 sm:h-8 rounded flex items-center justify-center text-white shadow-sm hover:bg-black transition-all">
              <RefreshCw size={15} strokeWidth={2.5} />
            </button>
            
            <button className="bg-[#E11D48] w-[32px] h-[32px] sm:w-8 sm:h-8 rounded flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all">
              <Filter size={15} strokeWidth={2.5} fill="currentColor" />
            </button>

            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm flex items-center">
              <span className="text-[12px] font-semibold text-slate-800">Total: 509</span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ NEW MODAL: Add Treatment Form */}
      <TreatmentListForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />

      {/* MODAL 1: Patient Injections */}
      <PatientInjectionsModal 
        isOpen={isPatientModalOpen}
        onClose={() => setIsPatientModalOpen(false)}
        patient={selectedPatient}
        onInjectionClick={handleOpenInjectionDetails}
        onPatientNameClick={handleOpenChartModal} // WIRED UP HERE
      />

      {/* MODAL 2: Injection Course Details */}
      <InjCourseBarcode 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        patient={selectedPatient}
        injection={selectedInjection}
      />

      {/* ✅ MODAL 3: Injection Chart */}
      <InjectionChart 
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
        patient={selectedPatient}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
          <DataGrid
            dataSource={mappingData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            hoverStateEnabled={true}
            onRowDblClick={handleRowDblClick}
          >
            <Editing mode="cell" allowUpdating={true} selectTextOnEditStart={true} startEditAction="click" />
            <Scrolling mode="standard" showScrollbar="always" />
            <SearchPanel visible={true} width={250} placeholder="Search..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            <Column dataField="id" caption="#" width={60} alignment="center" allowEditing={false} />
            <Column dataField="office" caption="Office" minWidth={100} alignment="center" allowEditing={false} />
            
            <Column 
              dataField="patientNo" 
              caption="Patient No" 
              minWidth={120}
              allowEditing={false}
              cellRender={(d) => (
                <div className="flex items-center gap-2 text-blue-500 font-bold text-[12px] whitespace-nowrap">
                  <User size={14} className="text-blue-500 fill-current shrink-0" /> {d.value}
                </div>
              )}
            />
            
            <Column 
              dataField="fullName" 
              caption="Full Name" 
              minWidth={200}
              allowEditing={false}
              cellRender={(d) => (
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[12px] whitespace-nowrap">
                  <User size={14} className="text-emerald-500 fill-current shrink-0" /> {d.value}
                </div>
              )}
            />
            
            <Column 
              dataField="patientCode" 
              caption="Patient Code" 
              minWidth={120}
              allowEditing={false}
              cellRender={(d) => (
                <span className="bg-[#00BFFF] text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {d.value}
                </span>
              )}
            />
            
            <Column dataField="startDate" caption="Start Date" dataType="date" alignment="center" minWidth={120} allowEditing={false} />
            <Column dataField="authUnit" caption="Auth Unit" alignment="center" minWidth={100} allowEditing={false} cellRender={() => <StatusCircle />} />
            <Column dataField="paidUnit" caption="Paid Unit" alignment="center" minWidth={100} allowEditing={false} />
            <Column dataField="balUnit" caption="Bal Unit" alignment="center" minWidth={100} allowEditing={false} />
            
            <Column dataField="frequency" caption="Freq" alignment="center" minWidth={120}>
              <Lookup dataSource={frequencyOptions} />
            </Column>
            
            <Column dataField="day" caption="Day" alignment="center" minWidth={120}>
              <Lookup dataSource={dayOptions} />
            </Column>

            <Summary>
              <TotalItem column="id" summaryType="count" displayFormat="Total: {0}" />
            </Summary>

            <Paging defaultPageSize={10} />
            <Pager visible={true} showInfo={true} displayMode="full" showPageSizeSelector={true} allowedPageSizes={[10, 20, 50, 100]} />
          </DataGrid>
        </div>

        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex justify-center sm:justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-right">
            Last updated: 2/27/2026, 2:13:05 PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default PTMappingTable;