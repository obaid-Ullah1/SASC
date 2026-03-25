import React, { useState, useMemo } from 'react';
import DataGrid, { 
  Column, 
  FilterRow, 
  HeaderFilter, 
  Scrolling, 
  Paging, 
  Pager, 
  SearchPanel 
} from 'devextreme-react/data-grid';
import { Pencil, Trash2, Layout, List } from 'lucide-react';

import TableHeader from '../TableHeader';
import AddGroupingRules from './AddForms/AddGroupingRules'; 
// ✅ Navigate Popups
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const GroupingRulesTable = () => {
  const [data, setData] = useState([
    { id: 1, rule: 'Rule 1/25', group: 'Group1', upperLimit: 60, groupLabel: 'Suggested Inj 1' },
    { id: 2, rule: 'Rule 1/25', group: 'Group1', upperLimit: 80, groupLabel: 'Suggested Inj 2' },
    { id: 3, rule: 'Rule 1/25', group: 'Group1', upperLimit: 100, groupLabel: 'Suggested Inj 3' },
    { id: 4, rule: 'Rule 1/25', group: 'Group2', upperLimit: 80, groupLabel: 'Suggested Inj 1' },
    { id: 5, rule: 'Rule 1/25', group: 'Group2', upperLimit: 100, groupLabel: 'Suggested Inj 2' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // --- ✅ POPUP STATES ---
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

  const handleAddNewClick = () => {
    setEditingData(null); 
    setShowAddForm(true);
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setShowAddForm(true);
  };

  // ✅ Trigger Delete Confirmation
  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id });
  };

  // ✅ Perform Delete after confirmation
  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
    setSuccessInfo({ show: true, message: "Grouping rule deleted successfully!" });
  };

  const handleFormSubmit = (formData) => {
    if (editingData) {
      setData(data.map(item => 
        item.id === editingData.id ? { ...item, ...formData } : item
      ));
      setSuccessInfo({ show: true, message: "Grouping rule updated successfully!" });
    } else {
      const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      setData([{ id: nextId, ...formData, group: 'New Group' }, ...data]);
      setSuccessInfo({ show: true, message: "New grouping rule added successfully!" });
    }
    setShowAddForm(false);
    setEditingData(null);
  };

  const actionCellRender = (cellData) => (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={() => handleEditClick(cellData.data)}
        className="w-7 h-7 rounded-full border border-[#00A3FF] text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm active:scale-90"
      >
        <Pencil size={12} strokeWidth={2.5} />
      </button>

      <button 
        onClick={() => handleDeleteClick(cellData.data.id)}
        className="w-7 h-7 rounded-full border border-rose-500 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
      >
        <Trash2 size={12} strokeWidth={2.5} />
      </button>
    </div>
  );

  const headerIdRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> ID</div>;
  const headerRuleRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><Layout size={14} className="text-slate-500" /> Rule</div>;
  const headerActionRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><Pencil size={14} className="text-slate-500" /> Actions</div>;

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
    [&_.dx-data-row>td]:!py-0.5
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      <TableHeader 
        title="Grouping Rules List"
        icon={Layout}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAddNewClick} 
      />

      <AddGroupingRules 
        key={editingData?.id || 'new'}
        isOpen={showAddForm} 
        editData={editingData}
        onClose={() => { setShowAddForm(false); setEditingData(null); }} 
        onAdd={handleFormSubmit} 
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
            <SearchPanel visible={false} /> 
            <FilterRow visible={false} />
            <HeaderFilter visible={true} />

            <Column dataField="id" headerCellRender={headerIdRender} width={80} alignment="center" />
            <Column dataField="rule" headerCellRender={headerRuleRender} alignment="center" />
            <Column dataField="group" caption="Group" alignment="center" />
            <Column dataField="upperLimit" caption="Upper %" alignment="center" />
            <Column dataField="groupLabel" caption="Group Label" alignment="center" />
            <Column 
              caption="Actions" 
              alignment="center" 
              width={120} 
              headerCellRender={headerActionRender} 
              cellRender={actionCellRender} 
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

        {/* ✅ CONFIRM DELETE POPUP */}
        <ConfirmPopup 
          isOpen={confirmDelete.show}
          onClose={() => setConfirmDelete({ show: false, id: null })}
          onConfirm={handleConfirmDelete}
          title="Delete Grouping Rule"
          message="Are you sure you want to delete this grouping rule? This action cannot be undone."
        />

        {/* ✅ SUCCESS POPUP */}
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

export default GroupingRulesTable;