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
import { 
  Users, List, Pencil, Trash2, CheckCircle2, X 
} from 'lucide-react';

import TableHeader from '../TableHeader'; 
import AddGroups from './AddForms/AddGroups'; 
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const GroupsTable = () => {
  const [data, setData] = useState([
    { id: 1, category: 'Allergy', name: 'SPT-90', description: 'Standard environmental 90-allergen', reqAllergen: 80, status: 'Active' },
    { id: 2, category: 'Allergy', name: 'SPT-Food', description: 'Food-specific panel', reqAllergen: 70, status: 'Active' },
    { id: 3, category: 'Allergy', name: 'LIMITED/PEDS', description: 'Pediatric / Limited allergen skin test', reqAllergen: 50, status: 'Active' },
    { id: 4, category: 'Chemical', name: 'Patch Test', description: 'Chemical exposure testing', reqAllergen: '', status: 'Active' },
    { id: 1004, category: 'Allergy', name: 'SPT-Food 1', description: 'Food-specific skin prick test panel', reqAllergen: '', status: 'Inactive' },
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
      Object.values(item).some(val => 
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id });
  };

  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
    setSuccessInfo({ show: true, message: "Group deleted successfully!" });
  };

  const handleAddNewGroup = (newGroupData) => {
    const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    const formattedGroup = {
      id: nextId,
      category: newGroupData.category || 'N/A',
      name: newGroupData.groupName,
      description: newGroupData.description,
      reqAllergen: newGroupData.requiredAllergens,
      status: newGroupData.isActive ? 'Active' : 'Inactive'
    };
    setData([formattedGroup, ...data]);
    setShowAddForm(false);
    setSuccessInfo({ show: true, message: "New group added successfully!" });
  };

  const handleEditClick = (rowData) => {
    setEditingRecord(rowData);
    setShowAddForm(true);
  };

  const actionCellRender = (cellData) => (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={() => handleEditClick(cellData.data)}
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

  const statusCellRender = (cellData) => {
    const isActive = cellData.value === 'Active';
    return (
      <div className="flex items-center justify-center">
        <span className={`${isActive ? 'bg-[#16A34A]' : 'bg-rose-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide`}>
          {isActive ? <CheckCircle2 size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
          {cellData.value}
        </span>
      </div>
    );
  };

  const headerIdRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} /> ID</div>;
  const headerCategoryRender = () => <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} /> Category</div>;
  const headerNameRender = () => <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} /> Name</div>;
  const headerDescriptionRender = () => <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} /> Description</div>;
  const headerReqRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} /> Req Allergen</div>;
  const headerStatusRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><CheckCircle2 size={14} /> Status</div>;
  const headerActionRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><Pencil size={14} /> Actions</div>;

  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!hidden 
    [&_.dx-datagrid-headers]:!bg-[#F8FAFC] 
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
        title="Groups List"
        icon={Users}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setEditingRecord(null);
          setShowAddForm(!showAddForm);
        }} 
      />

      <AddGroups 
        isOpen={showAddForm} 
        onClose={() => {
          setShowAddForm(false);
          setEditingRecord(null);
        }} 
        onAdd={handleAddNewGroup}
        initialData={editingRecord}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
          
          <style>{`
            .custom-footer-grid .dx-datagrid-pager {
              border-top: 1px solid #e2e8f0 !important;
              padding: 0 !important;
            }
            .custom-footer-grid .dx-datagrid-pager::before {
              content: 'Total: ${filteredData.length}';
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
            <HeaderFilter visible={true} />

            <Column dataField="id" headerCellRender={headerIdRender} width={80} alignment="center" />
            <Column dataField="category" headerCellRender={headerCategoryRender} alignment="left" />
            <Column dataField="name" headerCellRender={headerNameRender} alignment="left" />
            <Column dataField="description" headerCellRender={headerDescriptionRender} alignment="left" />
            <Column dataField="reqAllergen" headerCellRender={headerReqRender} alignment="center" />
            <Column dataField="status" headerCellRender={headerStatusRender} alignment="center" width={150} cellRender={statusCellRender} />
            <Column caption="Actions" alignment="center" width={120} headerCellRender={headerActionRender} cellRender={actionCellRender} />

            <Paging defaultPageSize={20} />
            {/* ✅ RESTORED FULL PAGINATION SETTINGS */}
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

        <ConfirmPopup 
          isOpen={confirmDelete.show}
          onClose={() => setConfirmDelete({ show: false, id: null })}
          onConfirm={handleConfirmDelete}
          title="Delete Group"
          message="Are you sure you want to delete this group? This action cannot be undone."
        />

        <SuccessPopup 
          isOpen={successInfo.show}
          onClose={() => setSuccessInfo({ show: false, message: "" })}
          message={successInfo.message}
        />

        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupsTable;