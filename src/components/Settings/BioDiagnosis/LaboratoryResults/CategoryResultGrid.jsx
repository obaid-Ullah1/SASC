import React, { useState } from 'react';
import DataGrid, {
  Column,
  Grouping,
  Scrolling,
  Paging,
  Pager,
  Sorting,
} from 'devextreme-react/data-grid';
import { Edit2, Trash2, Tag, Biohazard, Check } from 'lucide-react';

import TableHeader from '../../../TableHeader'; 
import Confirmpopup from '../../../global/Confirmpopup';
import SuccessPopup from '../../../global/SuccessPopup';

import CategoryResultAddForm from './AddForms/CategoryResultAddForm';

const CategoryResultGrid = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Popup States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);

  // Static Data mapping directly to your screenshot
  const [categoryResultData, setCategoryResultData] = useState([
    { id: 1, category: 'CBC', name: 'Pending', isDefault: true },
    { id: 2, category: 'CBC', name: 'Done', isDefault: false },
    { id: 3, category: 'CBC', name: 'Not Ordered', isDefault: false },
    { id: 4, category: 'CMP', name: 'Pending', isDefault: true },
    { id: 5, category: 'CMP', name: 'Done', isDefault: false },
    { id: 6, category: 'CMP', name: 'Not Ordered', isDefault: false },
  ]);

  // --- HANDLERS ---
  const handleOpenAddForm = () => {
    setEditingData(null); 
    setIsAddFormOpen(!isAddFormOpen);
  };

  const handleEdit = (dataRow) => {
    setEditingData(dataRow);
    setIsAddFormOpen(true);
  };

  const handleDeleteClick = (dataRow) => {
    setItemToDelete(dataRow);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setCategoryResultData((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    setShowDeleteConfirm(false);
    setSuccessMessage("Category Result deleted successfully!");
    setShowSuccess(true);
    setItemToDelete(null);
  };

  const handleSaveForm = (formData) => {
    if (editingData) {
      setCategoryResultData((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      setSuccessMessage("Category Result updated successfully!");
    } else {
      const newId = categoryResultData.length > 0 ? Math.max(...categoryResultData.map(d => d.id)) + 1 : 1;
      setCategoryResultData((prev) => [...prev, { ...formData, id: newId }]);
      setSuccessMessage("New Category Result added successfully!");
    }
    setIsAddFormOpen(false);
    setShowSuccess(true);
  };

  // --- RENDERERS ---
  const renderActions = (data) => (
    <div className="flex items-center justify-center gap-1.5 h-full">
      <button 
        onClick={() => handleEdit(data.data)}
        className="group w-6 h-6 rounded border border-blue-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm active:scale-90"
        title="Edit"
      >
        <Edit2 size={11} strokeWidth={2.5} />
      </button>
      <button 
        onClick={() => handleDeleteClick(data.data)}
        className="group w-6 h-6 rounded border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
        title="Delete"
      >
        <Trash2 size={11} strokeWidth={2.5} />
      </button>
    </div>
  );

  const renderDefaultBadge = (cellData) => {
    if (!cellData.value) return null;
    return (
      <div className="flex items-center justify-start h-full">
        <span className="flex items-center gap-1 bg-[#15803d] text-white px-2 py-0.5 rounded text-[10px] font-bold tracking-wide shadow-sm">
          <Check size={11} strokeWidth={4} /> Yes
        </span>
      </div>
    );
  };

  const renderGroupRow = (cellData) => (
    <div className="flex items-center gap-2 text-sky-900 font-black text-[12px] uppercase tracking-wider">
      <Tag size={12} className="text-[#00A3FF]" strokeWidth={3} />
      {cellData.value}
    </div>
  );

  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-2.5
    
    [&_.dx-data-row>td]:!py-0.5 
    [&_.dx-data-row]:!h-[30px] 
    [&_.dx-data-row>td]:!px-4 
    [&_.dx-data-row>td]:!align-middle 
    [&_.dx-data-row>td]:!text-[12.5px]
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-datagrid-table_td]:!border-slate-200

    /* LIGHT BLUE SUB-HEADING (GROUP ROW) */
    [&_.dx-group-row]:!bg-[#f0f9ff]
    [&_.dx-group-row>td]:!bg-[#f0f9ff]
    [&_.dx-group-row>td]:!border-y-[1px]
    [&_.dx-group-row>td]:!border-sky-200
    [&_.dx-group-row>td]:!py-1.5

    [&_.dx-header-row_td]:!font-black 
    [&_.dx-header-row_td]:!text-slate-700 
    [&_.dx-header-row_td]:!text-[11px] 
    [&_.dx-header-row_td]:!uppercase 
    [&_.dx-header-row_td]:!tracking-wider
  `;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white">
      
      <div className="shrink-0">
        <TableHeader 
          title="Category Result List" 
          icon={Biohazard}
          onAddClick={handleOpenAddForm} 
        />
      </div>

      <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${gridClasses}`}>
        
        {isAddFormOpen && (
          <div className="px-4 py-4 shrink-0 border-b border-slate-200 bg-slate-50">
            <CategoryResultAddForm 
              isOpen={isAddFormOpen} 
              onClose={() => setIsAddFormOpen(false)} 
              onSave={handleSaveForm}
              editingData={editingData}
            />
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-hidden custom-footer-grid border-t border-slate-200">
          
          <style>{`
            .custom-footer-grid .dx-datagrid-pager {
              border-top: 1px solid #e2e8f0 !important;
              padding: 0 !important;
            }
            .custom-footer-grid .dx-datagrid-pager::before {
              content: 'Total Category Results: ${categoryResultData.length}';
              display: block;
              width: 100%;
              padding: 8px 16px;
              font-size: 12.5px;
              font-weight: 700;
              color: #475569;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
            }
            .custom-footer-grid .dx-pager {
              padding: 8px 16px !important;
            }
          `}</style>

          <DataGrid
            dataSource={categoryResultData}
            keyExpr="id"
            showBorders={false}
            showColumnLines={true}
            showRowLines={true}
            rowAlternationEnabled={true}
            hoverStateEnabled={true}
            columnAutoWidth={false}
            height="100%"
            width="100%"
          >
            <Scrolling mode="standard" showScrollbar="always" />
            
            <Paging defaultPageSize={20} />
            <Pager
              visible={true}
              allowedPageSizes={[10, 20, 50, 100]}
              displayMode="full"
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
            />

            <Sorting mode="single" />
            <Grouping autoExpandAll={true} />

            <Column 
              dataField="category" 
              caption="Category" 
              groupIndex={0} 
              groupCellRender={renderGroupRow} 
            />
            
            <Column 
              dataField="id" 
              caption="ID" 
              width={70} 
              alignment="center" 
              cssClass="font-semibold text-slate-500" 
            />
            
            <Column 
              dataField="category" 
              caption="Category" 
              width={200} 
            />

            <Column 
              dataField="name" 
              caption="Name" 
              minWidth={250} 
              cssClass="font-bold text-slate-800"
            />
            
            <Column 
              dataField="isDefault" 
              caption="Default" 
              width={100} 
              alignment="left" 
              cellRender={renderDefaultBadge} 
            />
            
            <Column 
              caption="Actions" 
              width={100} 
              alignment="center" 
              cellRender={renderActions} 
            />
          </DataGrid>
        </div>
      </div>

      <Confirmpopup 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete this Category Result (${itemToDelete?.name})?`}
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
      />

    </div>
  );
};

export default CategoryResultGrid;