import React, { useState, useMemo } from 'react';
import DataGrid, { 
  Column, 
  FilterRow, 
  HeaderFilter, 
  Scrolling, 
  Paging, 
  Pager, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { List, Pencil, Trash2 } from 'lucide-react';

import TableHeader from '../TableHeader'; 
import AddCategoryForm from './AddForms/AddCategoryForm'; 
// ✅ Navigate Popups
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const CategoryTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Allergy' }, 
    { id: 2, name: 'Chemical' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // --- POPUP STATES ---
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
  const [successInfo, setSuccessInfo] = useState({ show: false, message: "" });

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  // ✅ Trigger Delete Confirmation
  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id });
  };

  // ✅ Perform Delete
  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
    setSuccessInfo({ show: true, message: "Category deleted successfully!" });
  };

  // ✅ Handles Save (Add/Update)
  const handleSaveCategory = (categoryData) => {
    if (editingRecord) {
      // Update existing
      setData(data.map(item => 
        item.id === editingRecord.id ? { ...item, name: categoryData.name } : item
      ));
      setSuccessInfo({ show: true, message: "Category updated successfully!" });
    } else {
      // Add new
      const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      setData([{ id: nextId, name: categoryData.name }, ...data]);
      setSuccessInfo({ show: true, message: "Category added successfully!" });
    }
    setShowAddForm(false);
    setEditingRecord(null);
  };

  const actionCellRender = (cellData) => (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={() => {
          setEditingRecord(cellData.data); // Load data for editing
          setShowAddForm(true);
        }}
        className="w-6 h-6 rounded-full border border-[#00A3FF] text-[#00A3FF] flex items-center justify-center hover:bg-blue-50 transition-all shadow-sm active:scale-90"
      >
        <Pencil size={11} strokeWidth={2.5} />
      </button>
      <button 
        onClick={() => handleDeleteClick(cellData.data.id)}
        className="w-6 h-6 rounded-full border border-rose-500 text-rose-500 flex items-center justify-center hover:bg-rose-50 transition-all shadow-sm active:scale-90"
      >
        <Trash2 size={11} strokeWidth={2.5} />
      </button>
    </div>
  );

  const headerIdRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> ID</div>
  );
  const headerNameRender = () => (
    <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> Name</div>
  );
  const headerActionRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><Pencil size={14} className="text-slate-500" /> Actions</div>
  );

  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!hidden 
    [&_.dx-datagrid-headers]:!bg-[#F8FAFC] 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[12px]
    [&_.dx-datagrid-headers_td]:!border-b
    [&_.dx-datagrid-headers_td]:!border-slate-200
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row>td]:!py-1
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      <TableHeader 
        title="Category List"
        icon={List}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setEditingRecord(null); // Clear editing state for fresh add
          setShowAddForm(!showAddForm);
        }} 
      />

      <AddCategoryForm 
        isOpen={showAddForm} 
        onClose={() => {
          setShowAddForm(false);
          setEditingRecord(null);
        }} 
        onAdd={handleSaveCategory} 
        initialData={editingRecord}
      />
      
      <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
        <style>{`
          .custom-footer-grid .dx-datagrid-pager {
            border-top: 1px solid #e2e8f0 !important;
            padding: 0 !important;
          }
          .custom-footer-grid .dx-datagrid-pager::before {
            content: 'Total Items: ${filteredData.length}';
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
        `}</style>

        <DataGrid
          dataSource={filteredData}
          height="100%"
          showBorders={false} 
          rowAlternationEnabled={true}
          columnAutoWidth={true}
          showRowLines={true}
          showColumnLines={true}
          hoverStateEnabled={true}
        >
          <Scrolling mode="standard" showScrollbar="always" />
          <SearchPanel visible={false} /> 
          <FilterRow visible={false} />
          <HeaderFilter visible={true} />

          <Column dataField="id" headerCellRender={headerIdRender} width={100} alignment="center" />
          <Column dataField="name" headerCellRender={headerNameRender} alignment="left" cssClass="font-semibold" />
          <Column caption="Actions" alignment="center" width={150} headerCellRender={headerActionRender} cellRender={actionCellRender} />

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

      {/* ✅ NAVIGATED POPUPS */}
      <ConfirmPopup 
        isOpen={confirmDelete.show}
        onClose={() => setConfirmDelete({ show: false, id: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message="Are you sure you want to remove this category? This action cannot be undone."
      />

      <SuccessPopup 
        isOpen={successInfo.show}
        onClose={() => setSuccessInfo({ show: false, message: "" })}
        message={successInfo.message}
      />
      
      <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Database Online
        </p>
      </div>
      
    </div>
  );
};

export default CategoryTable;