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
  ColumnChooser
} from 'devextreme-react/data-grid';
import { User, SquarePlus, ShoppingBag, List, Pill, X, Droplet, Layers, IdCard, XCircle } from 'lucide-react';

// Import components
import TableHeader from '../TableHeader';
import TreatmentListForm from './AddForms/TreatmentListForm';

// ✅ FIXED IMPORT: Now importing InjCourseBarcode
import InjCourseBarcode from './AddForms/InjCourseBarcode';

// ==========================================
// MODAL 1: Patient Injections List
// ==========================================
const PatientInjectionsModal = ({ isOpen, onClose, patient, onInjectionClick }) => {
  if (!isOpen || !patient) return null;

  // Mock data for the injections list
  const injections = [
    { id: 1, name: "AIT MIX 1-11/25-01", qty: 7.75, unit: 30 },
    { id: 2, name: "AIT MIX 2-11/25-01", qty: 7.75, unit: 30 },
    { id: 3, name: "AIT MIX 4-11/25-01", qty: 7.75, unit: 30 },
  ];

  const totalQty = injections.reduce((acc, curr) => acc + curr.qty, 0).toFixed(2);
  const totalUnit = injections.reduce((acc, curr) => acc + curr.unit, 0);

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="bg-[#1877F2] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-[16px] tracking-wide">
            <Pill size={18} strokeWidth={2.5} className="-rotate-45" /> Patient Injections
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
                  <td className="py-3 px-4 text-center text-slate-600">{index + 1}</td>
                  
                  <td className="py-3 px-4 border-l border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <IdCard size={14} className="text-[#1877F2]" /> {patient.patientNo}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4 border-l border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-slate-700">
                      <User size={14} className="text-emerald-600" strokeWidth={3} /> {patient.fullName}
                    </div>
                  </td>
                  
                  <td className="py-3 px-4 border-l border-slate-100">
                    {/* CLICKABLE INJECTION BADGE */}
                    <button 
                      onClick={() => onInjectionClick(inj)}
                      className="inline-flex items-center gap-1.5 border border-blue-200 hover:border-[#1877F2] hover:bg-blue-50 rounded-full px-3 py-1 bg-white text-[#1877F2] font-bold text-[11px] shadow-sm transition-all active:scale-95"
                    >
                      <Pill size={12} className="-rotate-45" /> {inj.name}
                    </button>
                  </td>
                  
                  <td className="py-3 px-4 border-l border-slate-100 text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 border border-slate-200 rounded-full px-4 py-1 bg-white text-[#1877F2] font-bold text-[12px] shadow-sm min-w-[80px]">
                      <Droplet size={12} className="fill-[#1877F2]" /> {inj.qty}
                    </span>
                  </td>
                  
                  <td className="py-3 px-4 border-l border-slate-100 text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 border border-slate-200 rounded-full px-4 py-1 bg-white text-emerald-600 font-bold text-[12px] shadow-sm min-w-[80px]">
                      <Layers size={12} className="fill-emerald-600" /> {inj.unit}
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


const TreatmentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // MODAL STATES
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedInjection, setSelectedInjection] = useState(null);

  const [injectionData] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i === 0 ? 1 : i === 1 ? 321 : 6 + i,
      office: i % 2 === 0 ? "Fresno South" : "Merced",
      patientNo: 108 + i,
      fullName: i % 2 === 0 ? "Test, Leope" : "Aragon, Jean",
      patientCode: i % 2 === 0 ? "LTE" : "JAR",
      startDate: "03/22/2024",
      authUnit: Math.floor(Math.random() * 50) + 10,
      paidUnit: Math.floor(Math.random() * 40),
      balUnit: Math.floor(Math.random() * 10),
      frequency: "7 day",
      day: i % 2 === 0 ? "Friday" : "Wednesday"
    }))
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
    [&_.dx-data-row>td]:!py-1.5
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]

    /* Add cursor pointer & hover effect so rows look clickable */
    [&_.dx-data-row]:!cursor-pointer
    [&_.dx-data-row:hover>td]:!bg-[#EFF6FF]
  `;

  const renderHeader = (title) => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]">
      <List size={14} className="text-slate-500" /> {title}
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

  return (
    <div className="flex flex-col h-full w-full gap-6 relative">
      
      {/* FORM IS NOW OUTSIDE THE GRID */}
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
      />

      {/* ✅ FIXED TAG: MODAL 2: Injection Course Details (using the correct import) */}
      <InjCourseBarcode 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        patient={selectedPatient}
        injection={selectedInjection}
      />

      {/* TABLE CARD CONTAINER */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 min-h-[400px]">
        
        <TableHeader 
          title="Treatment List"
          icon={ShoppingBag}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => setShowAddForm(!showAddForm)} 
        />

        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
            
            <style>{`
              .custom-footer-grid .dx-datagrid { border: none !important; }
              .custom-footer-grid .dx-datagrid-pager {
                border-top: 1px solid #e2e8f0 !important;
                padding: 0 !important;
              }
              .custom-footer-grid .dx-datagrid-pager::before {
                content: 'Total: ${injectionData.length}';
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
              .custom-footer-grid .dx-pager { padding: 10px 16px !important; }
            `}</style>

            <DataGrid
              dataSource={injectionData} 
              height="100%"
              showBorders={false} 
              rowAlternationEnabled={true}
              columnAutoWidth={true}
              showRowLines={true}
              showColumnLines={true}
              hoverStateEnabled={true}
              onRowDblClick={handleRowDblClick} // CONNECTED DOUBLE CLICK EVENT
            >
              <Scrolling mode="standard" showScrollbar="always" />
              <SearchPanel visible={true} width={250} placeholder="Search patients..." />
              <ColumnChooser enabled={true} mode="select" />
              <FilterRow visible={true} />
              <HeaderFilter visible={true} />
              <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

              <Column dataField="id" width={80} alignment="center" headerCellRender={() => renderHeader("ID")} />
              <Column dataField="office" alignment="center" headerCellRender={() => renderHeader("Office")} />
              <Column 
                dataField="patientNo" 
                alignment="center"
                headerCellRender={() => renderHeader("Patient No")}
                cellRender={(d) => (
                  <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
                    <SquarePlus size={14} /> {d.value}
                  </div>
                )}
              />
              <Column 
                dataField="fullName" 
                alignment="left"
                headerCellRender={() => <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> Full Name</div>}
                cellRender={(d) => (
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-[12px]">
                    <User size={14} className="text-emerald-500" /> {d.value}
                  </div>
                )}
              />
              <Column 
                dataField="patientCode" 
                alignment="center"
                headerCellRender={() => renderHeader("Code")}
                cellRender={(d) => (
                  <span className="bg-[#00A3FF] text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">
                    {d.value}
                  </span>
                )}
              />
              <Column dataField="startDate" dataType="date" alignment="center" headerCellRender={() => renderHeader("Start Date")} />
              <Column dataField="authUnit" alignment="center" headerCellRender={() => renderHeader("Auth")} />
              <Column dataField="paidUnit" alignment="center" headerCellRender={() => renderHeader("Paid")} />
              <Column dataField="balUnit" alignment="center" headerCellRender={() => renderHeader("Bal")} />
              <Column 
                dataField="frequency" 
                alignment="center"
                headerCellRender={() => renderHeader("Freq")}
                cellRender={(d) => <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-[10px] font-bold">{d.value}</span>}
              />
              <Column 
                dataField="day" 
                alignment="center"
                headerCellRender={() => renderHeader("Day")}
                cellRender={(d) => <span className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black shadow-sm">{d.value}</span>}
              />

              <Paging defaultPageSize={10} />
              <Pager visible={true} showInfo={true} displayMode="full" showPageSizeSelector={true} allowedPageSizes={[10, 20, 50, 100]} />
            </DataGrid>
          </div>

          <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last updated: {new Date().toLocaleString()}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TreatmentTable;