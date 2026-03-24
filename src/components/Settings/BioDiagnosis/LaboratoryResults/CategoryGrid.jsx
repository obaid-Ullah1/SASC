import React, { useState } from 'react';
import DataGrid, {
  Column,
  Scrolling,
  Paging,
  Pager,
  Sorting,
} from 'devextreme-react/data-grid';
import { Edit2, Trash2, Beaker } from 'lucide-react';

import TableHeader from '../../../TableHeader'; 
import Confirmpopup from '../../../global/Confirmpopup';
import SuccessPopup from '../../../global/SuccessPopup';

// IMPORT THE REUSABLE SHARED FORM
import { SharedAddForm } from '../DiagnosisCoding/AddForms/SharedAddForm';

const CategoryGrid = () => {
  // Static Data mapping directly to your Lab Category screenshot
  const [categoryData, setCategoryData] = useState([
    { id: 1, name: 'CBC' },
    { id: 2, name: 'CMP' },
    { id: 3, name: 'Inflammatory' },
    { id: 4, name: 'Immunoglobulin' },
    { id: 5, name: 'LFT' },
    { id: 6, name: 'Renal' },
  ]);

  // Form States
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Popup States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);

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
    setCategoryData((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    setShowDeleteConfirm(false);
    setSuccessMessage("Category deleted successfully!");
    setShowSuccess(true);
    setItemToDelete(null);
  };

  const handleSaveForm = (formData) => {
    if (editingData) {
      setCategoryData((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      setSuccessMessage("Category updated successfully!");
    } else {
      const newId = categoryData.length > 0 ? Math.max(...categoryData.map(d => d.id)) + 1 : 1;
      setCategoryData((prev) => [...prev, { ...formData, id: newId }]);
      setSuccessMessage("New Category added successfully!");
    }
    setIsAddFormOpen(false);
    setShowSuccess(true);
  };

  // --- RENDERERS ---
  const renderActions = (data) => (
    <div className="flex items-center justify-center gap-1.5 h-full">
      <button 
        onClick={() => handleEdit(data.data)}
        className="w-6 h-6 rounded border border-blue-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm"
        title="Edit"
      >
        <Edit2 size={11} strokeWidth={2.5} />
      </button>
      <button 
        onClick={() => handleDeleteClick(data.data)}
        className="w-6 h-6 rounded border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
        title="Delete"
      >
        <Trash2 size={11} strokeWidth={2.5} />
      </button>
    </div>
  );

  const gridClasses = `
    /* DISTINCT HEADER BACKGROUND & ALIGNMENT */
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-2.5
    
    /* ULTRA THIN ROWS - Tightened to 30px height */
    [&_.dx-data-row>td]:!py-0.5 
    [&_.dx-data-row]:!h-[30px] 
    [&_.dx-data-row>td]:!px-4 
    [&_.dx-data-row>td]:!align-middle 
    [&_.dx-data-row>td]:!text-[12.5px]
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-datagrid-table_td]:!border-slate-200

    /* NATIVE HEADER TEXT STYLE */
    [&_.dx-header-row_td]:!font-black 
    [&_.dx-header-row_td]:!text-slate-700 
    [&_.dx-header-row_td]:!text-[11px] 
    [&_.dx-header-row_td]:!uppercase 
    [&_.dx-header-row_td]:!tracking-wider
  `;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white">
      
      {/* 1. HEADER SECTION */}
      <div className="shrink-0">
        <TableHeader 
          title="Lab Category" 
          icon={Beaker}
          onAddClick={handleOpenAddForm} 
        />
      </div>

      {/* 2. TABLE AREA - Solo Frame Alignment */}
      <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${gridClasses}`}>
        
        {/* INLINE SHARED FORM */}
        {isAddFormOpen && (
          <div className="px-4 py-4 shrink-0 border-b border-slate-200 bg-slate-50">
            <SharedAddForm 
              isOpen={isAddFormOpen} 
              onClose={() => setIsAddFormOpen(false)} 
              onSave={handleSaveForm}
              editingData={editingData}
              entityName="Lab Category" // <--- Injects dynamic text!
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
              content: 'Total Categories: ${categoryData.length}';
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
            dataSource={categoryData}
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

            {/* ONLY ID, NAME, AND ACTIONS AS PER SCREENSHOT */}
            <Column 
              dataField="id" 
              caption="ID" 
              width={70} 
              alignment="center" 
              cssClass="font-semibold text-slate-500" 
            />
            
            <Column 
              dataField="name" 
              caption="Name" 
              minWidth={250} 
              cssClass="font-bold text-slate-800"
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

      {/* Global Popups */}
      <Confirmpopup 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete "${itemToDelete?.name}"?`}
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
      />

    </div>
  );
};

export default CategoryGrid;