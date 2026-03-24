import React, { useState } from 'react';
import DataGrid, { 
  Column, 
  Paging, 
  SearchPanel, 
  FilterRow, 
  Scrolling 
} from 'devextreme-react/data-grid';
import { List, Pencil, Trash2 } from 'lucide-react';

// Global Components
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const StandardTable = ({ title, data, onEdit, onDelete }) => {
  const [deleteConfig, setDeleteConfig] = useState({ isOpen: false, itemId: null });
  const [showSuccess, setShowSuccess] = useState(false);

  // --- Logic Handlers ---
  const handleDeleteClick = (id) => {
    setDeleteConfig({ isOpen: true, itemId: id });
  };

  const handleConfirmDelete = () => {
    if (onDelete && deleteConfig.itemId) {
      onDelete(deleteConfig.itemId);
      setDeleteConfig({ isOpen: false, itemId: null });
      setShowSuccess(true);
    }
  };

  // Custom Renderer for Actions (Keeping your exact design)
  const actionCellRender = (cellData) => (
    <div className="flex justify-center gap-5">
      <Pencil 
        size={15} 
        strokeWidth={3} 
        onClick={() => onEdit(cellData.data)} // Logic added
        className="text-blue-500 cursor-pointer hover:scale-110 transition-transform" 
      />
      <Trash2 
        size={15} 
        strokeWidth={3} 
        onClick={() => handleDeleteClick(cellData.data.id)} // Logic added
        className="text-red-500 cursor-pointer hover:scale-110 transition-transform" 
      />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden dx-viewport">
      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders={false}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        hoverStateEnabled={true}
        className="custom-standard-grid"
      >
        <FilterRow visible={true} />
        <SearchPanel visible={false} />
        <Scrolling mode="virtual" />
        <Paging enabled={false} />

        {/* # ID Column - Keeping exact original CSS */}
        <Column 
          dataField="id" 
          caption="# ID" 
          width={128} 
          alignment="left"
          cssClass="px-6 py-3.5 text-xs font-bold text-slate-600 border-r border-slate-100"
          headerCellRender={() => (
            <span className="text-[11px] font-bold text-slate-400 uppercase"># ID</span>
          )}
        />

        {/* Name Column - Keeping exact original CSS */}
        <Column 
          dataField="name" 
          caption={`${title} Name`}
          cssClass="px-6 py-3.5 text-xs font-semibold text-slate-800 border-r border-slate-100"
          headerCellRender={() => (
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase">
              <List size={14}/> {title} Name
            </div>
          )}
        />

        {/* Actions Column */}
        <Column 
          caption="Actions" 
          width={160} 
          alignment="center"
          cellRender={actionCellRender}
          headerCellRender={() => (
            <span className="text-[11px] font-bold text-slate-400 uppercase">Actions</span>
          )}
        />
      </DataGrid>

      {(!data || data.length === 0) && (
        <div className="px-6 py-10 text-center text-slate-400 text-xs italic border-t border-slate-100">
          No records found.
        </div>
      )}

      {/* Popups */}
      <ConfirmPopup 
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig({ isOpen: false, itemId: null })}
        onConfirm={handleConfirmDelete}
        title={`Delete ${title}`}
        message={`Are you sure you want to remove this ${title.toLowerCase()}?`}
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Record has been deleted successfully."
      />
    </div>
  );
};

export default StandardTable;