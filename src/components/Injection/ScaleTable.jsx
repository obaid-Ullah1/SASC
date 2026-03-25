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
import { Pencil, Trash2, Check, X, CircleDot, Ruler, List } from 'lucide-react';

// Import Header and our dynamically rendered Form
import TableHeader from '../TableHeader'; 
import AddScaleForm from './AddForms/AddScaleForm';
// ✅ Import Navigate Popups
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const ScaleTable = () => {
  const [data, setData] = useState([
    { id: 1, grade: '0', whealMin: 0, whealMax: 0, flareMin: 0, flareMax: 0, result: '0', description: 'Negative', status: 'Active', isDefault: true },
    { id: 2, grade: '1', whealMin: 1, whealMax: 3, flareMin: 1, flareMax: 5, result: '1+', description: 'Mildly Positive', status: 'Active', isDefault: false },
    { id: 3, grade: '2', whealMin: 4, whealMax: 6, flareMin: 6, flareMax: 10, result: '2+', description: 'Moderately Positive', status: 'Active', isDefault: false },
    { id: 4, grade: '3', whealMin: 7, whealMax: 9, flareMin: 11, flareMax: 15, result: '3+', description: 'Strongly Positive', status: 'Active', isDefault: false },
    { id: 5, grade: '4', whealMin: 10, whealMax: 20, flareMin: 16, flareMax: 30, result: '4+', description: 'Very Strongly Positive', status: 'Active', isDefault: false },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

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

  // ✅ Trigger Delete Confirmation
  const handleDeleteClick = (id) => {
    setConfirmDelete({ show: true, id });
  };

  // ✅ Perform Delete
  const handleConfirmDelete = () => {
    setData(data.filter(item => item.id !== confirmDelete.id));
    setConfirmDelete({ show: false, id: null });
    setSuccessInfo({ show: true, message: "Scale entry deleted successfully!" });
  };

  // ✅ HANDLES BOTH ADD AND UPDATE
  const handleSaveScale = (newScale) => {
    if (editingRecord) {
      // Update Logic
      setData(data.map(item => 
        item.id === editingRecord.id ? { 
          ...item, 
          grade: newScale.grade,
          whealMin: newScale.whealMin || 0,
          whealMax: newScale.whealMax || 0,
          flareMin: newScale.flareMin || 0,
          flareMax: newScale.flareMax || 0,
          result: newScale.result || '',
          description: newScale.description,
          status: newScale.isActive ? 'Active' : 'Inactive',
          isDefault: newScale.isDefChecked
        } : item
      ));
      setSuccessInfo({ show: true, message: "Scale entry updated successfully!" });
    } else {
      // Add Logic
      const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      const formattedScale = {
        id: nextId,
        grade: newScale.grade,
        whealMin: newScale.whealMin || 0,
        whealMax: newScale.whealMax || 0,
        flareMin: newScale.flareMin || 0,
        flareMax: newScale.flareMax || 0,
        result: newScale.result || '',
        description: newScale.description,
        status: newScale.isActive ? 'Active' : 'Inactive',
        isDefault: newScale.isDefChecked
      };
      setData([formattedScale, ...data]);
      setSuccessInfo({ show: true, message: "New scale added successfully!" });
    }
    setShowAddForm(false);
    setEditingRecord(null);
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
        <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border shadow-sm ${
          isActive ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-rose-500 border-rose-600 text-white'
        }`}>
          <CircleDot size={8} className={isActive ? 'animate-pulse' : ''} />
          <span className="text-[9px] font-black uppercase tracking-wider">
            {cellData.value}
          </span>
        </div>
      </div>
    );
  };

  const defaultCellRender = (cellData) => (
    <div className="flex justify-center">
      {cellData.value ? (
        <div className="flex items-center gap-1 bg-sky-600 text-white px-2.5 py-0.5 rounded shadow-sm">
          <Check size={10} strokeWidth={4} />
          <span className="text-[9px] font-black uppercase tracking-wider">Yes</span>
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-rose-500 text-white px-2.5 py-0.5 rounded shadow-sm">
          <X size={10} strokeWidth={4} />
          <span className="text-[9px] font-black uppercase tracking-wider">No</span>
        </div>
      )}
    </div>
  );

  const headerIdRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> ID</div>;
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
        title="Scale List"
        icon={Ruler}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => {
          setEditingRecord(null);
          setShowAddForm(!showAddForm);
        }} 
      />

      <AddScaleForm 
        isOpen={showAddForm} 
        onClose={() => {
          setShowAddForm(false);
          setEditingRecord(null);
        }} 
        onAdd={handleSaveScale} 
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
            <SearchPanel visible={false} /> 
            <FilterRow visible={false} />
            <HeaderFilter visible={true} />

            <Column dataField="id" headerCellRender={headerIdRender} width={80} alignment="center" />

            {[
              { field: 'grade', label: 'Grade' },
              { field: 'whealMin', label: 'W. Min' },
              { field: 'whealMax', label: 'W. Max' },
              { field: 'flareMin', label: 'F. Min' },
              { field: 'flareMax', label: 'F. Max' },
              { field: 'result', label: 'Result' },
              { field: 'description', label: 'Description' }
            ].map(col => (
              <Column key={col.field} dataField={col.field} alignment="center" caption={col.label} />
            ))}

            <Column dataField="status" caption="Status" alignment="center" width={100} cellRender={statusCellRender} />
            <Column dataField="isDefault" caption="Default" alignment="center" width={90} cellRender={defaultCellRender} />
            <Column caption="Actions" alignment="center" width={100} headerCellRender={headerActionRender} cellRender={actionCellRender} fixed={true} fixedPosition="right" />

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

        {/* ✅ Confirm Delete Popup */}
        <ConfirmPopup 
          isOpen={confirmDelete.show}
          onClose={() => setConfirmDelete({ show: false, id: null })}
          onConfirm={handleConfirmDelete}
          title="Delete Scale Entry"
          message="Are you sure you want to delete this scale entry? This action cannot be undone."
        />

        {/* ✅ Success Popup */}
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

export default ScaleTable;