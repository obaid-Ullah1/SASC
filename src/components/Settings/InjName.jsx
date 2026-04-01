import React, { useState } from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Pager, 
  Paging, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { List, Plus, RefreshCw, Pencil, Trash2, Search, Filter, Settings, CheckCircle2, ShieldCheck, X } from 'lucide-react';

// Import the new Add form
import AddInjectionName from './AddForm/AddInjectionName'; 

// ✅ IMPORT GLOBAL POPUPS
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const InjName = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); 

  // ✅ GLOBAL POPUP STATES
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successType, setSuccessType] = useState(''); // 'Added', 'Updated', or 'Deleted'

  // Sample data matching your screenshot
  const [tableData, setTableData] = useState([
    { id: 1, allergen: 'Standard', injName: 'TREE MIX 1', compName: 'SA', isActive: true, isApproved: true },
    { id: 2, allergen: 'Standard', injName: 'TREE MIX 2', compName: 'SA', isActive: true, isApproved: true },
    { id: 3, allergen: 'Standard', injName: 'GRASS MIX', compName: 'SA', isActive: false, isApproved: true }, 
    { id: 4, allergen: 'Standard', injName: 'WEED MIX', compName: 'SA', isActive: true, isApproved: true },
    { id: 5, allergen: 'Standard', injName: 'MOLD MIX', compName: 'SA', isActive: true, isApproved: true },
    { id: 6, allergen: 'Standard', injName: 'STD MIX 1', compName: 'SA', isActive: true, isApproved: true },
    { id: 7, allergen: 'Standard', injName: 'STD MIX 2', compName: 'SA', isActive: true, isApproved: true },
    { id: 1017, allergen: 'Custom', injName: 'CUSTOM Mix 1', compName: 'SA', isActive: true, isApproved: true },
  ]);

  // --- HELPERS ---
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const triggerSuccess = (type) => {
    setSuccessType(type);
    setIsSuccessOpen(true);
    setTimeout(() => setIsSuccessOpen(false), 1500);
  };

  // --- CRUD ACTIONS ---
  const handleAddNewData = (formData) => {
    const nextId = tableData.length > 0 ? Math.max(...tableData.map(item => item.id)) + 1 : 1000;
    const newEntry = {
      id: nextId,
      allergen: formData.type, 
      injName: formData.injName,
      compName: formData.compName,
      isActive: formData.isActive,
      isApproved: true 
    };
    setTableData([newEntry, ...tableData]); 
    handleCloseForm(); 
    triggerSuccess('Added'); // ✅ Trigger Success
  };

  const handleUpdateData = (updatedRow) => {
    setTableData(tableData.map(row => row.id === updatedRow.id ? updatedRow : row));
    handleCloseForm();
    triggerSuccess('Updated'); // ✅ Trigger Success
  };

  // --- DELETE LOGIC WITH CONFIRMATION ---
  const handleDeleteClick = (rowData) => {
    setItemToDelete(rowData);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setTableData(tableData.filter(row => row.id !== itemToDelete.id));
    setIsConfirmOpen(false);
    setItemToDelete(null);
    triggerSuccess('Deleted'); // ✅ Trigger Success
  };

  const handleEditClick = (rowData) => {
    setEditingItem(rowData);
    setIsFormOpen(true);
  };

  // --- CUSTOM CELL RENDERERS ---
  const activeRender = (data) => (
    <div className="flex items-center justify-center h-full">
      {data.value ? (
        <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide whitespace-nowrap">
          <CheckCircle2 size={11} strokeWidth={3} /> Active
        </span>
      ) : (
        <span className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide whitespace-nowrap">
          <X size={11} strokeWidth={3} /> Inactive
        </span>
      )}
    </div>
  );

  const approvedRender = (data) => (
    <div className="flex items-center justify-center h-full">
      {data.value ? (
        <span className="bg-white border border-[#16A34A] text-[#16A34A] text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide whitespace-nowrap">
          <ShieldCheck size={11} strokeWidth={2.5} /> Approved
        </span>
      ) : (
        <span className="bg-white border border-slate-300 text-slate-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide whitespace-nowrap">
          Pending
        </span>
      )}
    </div>
  );

  const actionCellRender = (data) => (
    <div className="flex items-center justify-center gap-1.5 h-full">
      <button 
        onClick={() => handleEditClick(data.data)}
        className="w-6 h-6 rounded border border-blue-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm active:scale-95"
      >
        <Pencil size={11} strokeWidth={3} />
      </button>
      <button 
        onClick={() => handleDeleteClick(data.data)} // ✅ Wired to Popup
        className="w-6 h-6 rounded border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-95"
      >
        <Trash2 size={11} strokeWidth={3} />
      </button>
    </div>
  );

  // --- CUSTOM HEADER RENDERERS ---
  const headerIdRender = () => <div className="font-bold text-slate-500 text-[11px] uppercase tracking-wider text-center w-full"># ID</div>;
  const headerAllergenRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full"><List size={13} className="text-[#00A3FF]" /> ALLERGEN</div>;
  const headerNameRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full"><Pencil size={13} className="text-[#00A3FF]" /> INJECTION NAME</div>;
  const headerCompRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full"><Pencil size={13} className="text-[#00A3FF]" /> COMP NAME</div>;
  const headerActiveRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full"><CheckCircle2 size={13} className="text-[#16A34A]" /> ACTIVE</div>;
  const headerApprovedRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full"><ShieldCheck size={13} className="text-[#16A34A]" /> APPROVED</div>;
  const headerActionRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[11px] uppercase tracking-wider w-full">
      <Settings size={13} className="text-[#EAB308]" /> ACTIONS
    </div>
  );

  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-2.5
    [&_.dx-datagrid-text-content]:!text-slate-600
    [&_.dx-datagrid-text-content]:!font-bold
    [&_.dx-datagrid-text-content]:!text-[11.5px]
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!py-0.5
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row]:!h-[28px]
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!text-[11.5px]
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-selection-disabled]:!hidden
  `;

  return (
    <div className="bg-white flex flex-col h-full w-full rounded-xl shadow-lg border border-slate-300 overflow-hidden relative">
      
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 py-2.5 sm:py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <List size={18} className="text-[#2A333A] shrink-0" />
          <h2 className="text-[14px] sm:text-[15px] font-black text-[#2A333A] tracking-wide">Inj Name List</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
          <button 
            onClick={() => {
              if (isFormOpen) handleCloseForm();
              else setIsFormOpen(true);
            }}
            className={`${isFormOpen ? 'bg-rose-500 hover:bg-rose-600' : 'bg-[#007BFF] hover:bg-[#0056b3]'} w-[32px] h-[32px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95 shrink-0`}
            title={isFormOpen ? "Close Form" : "Add New Name"}
          >
            {isFormOpen ? <X size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
          </button>
          
          <div className="relative group flex-1 sm:flex-none">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={13} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="border border-white/60 rounded-md pl-8 pr-3 py-1.5 sm:py-1 text-[12px] w-full sm:w-40 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 transition-all bg-white/90"
            />
          </div>

          <button className="w-[32px] h-[32px] sm:w-8 sm:h-8 bg-white/50 border border-white/30 rounded flex items-center justify-center text-[#2A333A] hover:bg-white transition-all shadow-sm shrink-0">
            <RefreshCw size={14} strokeWidth={2.5} />
          </button>
          
          <button className="w-[32px] h-[32px] sm:w-8 sm:h-8 bg-rose-600 border border-rose-700 rounded flex items-center justify-center text-white hover:bg-rose-700 transition-all shadow-sm shrink-0">
            <Filter size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-hidden p-3 bg-white custom-footer-grid ${gridClasses} flex flex-col gap-3`}>
        
        <AddInjectionName 
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onAdd={handleAddNewData}
          onUpdate={handleUpdateData}
          editingItem={editingItem}
        />

        <style dangerouslySetInnerHTML={{ __html: `
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
          }
          .custom-footer-grid .dx-pager {
            padding: 10px 16px !important;
          }
        `}} />

        <div className="flex-1 overflow-hidden border border-slate-200 rounded-lg">
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
            
            <Column dataField="id" headerCellRender={headerIdRender} width={80} alignment="center" />
            <Column dataField="allergen" headerCellRender={headerAllergenRender} alignment="center" minWidth={120} />
            <Column dataField="injName" headerCellRender={headerNameRender} alignment="center" minWidth={150} />
            <Column dataField="compName" headerCellRender={headerCompRender} alignment="center" minWidth={120} />
            <Column dataField="isActive" headerCellRender={headerActiveRender} cellRender={activeRender} alignment="center" width={120} />
            <Column dataField="isApproved" headerCellRender={headerApprovedRender} cellRender={approvedRender} alignment="center" width={130} />
            
            <Column 
              caption="Action" 
              headerCellRender={headerActionRender} 
              cellRender={actionCellRender} 
              width={100} 
              alignment="center" 
              fixed={true} 
              fixedPosition="right" 
            />

            <Paging defaultPageSize={20} />
            <Pager
              visible={true}
              allowedPageSizes={[10, 20, 50, 100]}
              displayMode="full"
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
            />
          </DataGrid>
        </div>
      </div>

      {/* ✅ GLOBAL POPUPS MOUNTED HERE */}
      <ConfirmPopup 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Injection Name"
        message={`Are you sure you want to delete "${itemToDelete?.injName}"? This action cannot be undone.`}
      />

      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        type={successType}
      />

    </div>
  );
};

export default InjName;