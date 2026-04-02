import React, { useState } from 'react';
import DataGrid, {
  Column,
  Grouping,
  Scrolling,
  Paging,
  Pager,
  Sorting,
} from 'devextreme-react/data-grid';
import { Edit2, Trash2, Tag, TestTube2 } from 'lucide-react';

import TableHeader from '../../../TableHeader'; 
import ConfirmPopup from '../../../global/ConfirmPopup';
import SuccessPopup from '../../../global/SuccessPopup';

// IMPORTING THE CUSTOM LAB TEST FORM
import LabTestAddForm from './AddForms/LabTestAddForm';

const LabTestGrid = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Popup States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);

  // Static Data
  const [labTestData, setLabTestData] = useState([
    { id: 1, category: 'CBC', code: 'CBC', name: 'Complete Blood Count with Differential', unit: '' },
    { id: 9, category: 'CBC', code: 'EOS', name: 'Eosinophil Count', unit: 'cells/μL' },
    { id: 2, category: 'CMP', code: 'CMP', name: 'Comprehensive Metabolic Panel', unit: '' },
    { id: 3, category: 'Inflammatory', code: 'CRP', name: 'C-Reactive Protein', unit: 'mg/L' },
    { id: 4, category: 'Inflammatory', code: 'ESR', name: 'Erythrocyte Sedimentation Rate', unit: 'mm/hr' },
    { id: 5, category: 'Immunoglobulin', code: 'IgE', name: 'Immunoglobulin E', unit: 'IU/mL' },
    { id: 6, category: 'Immunoglobulin', code: 'IgG', name: 'Immunoglobulin G', unit: 'g/L' },
    { id: 7, category: 'Immunoglobulin', code: 'IgM', name: 'Immunoglobulin M', unit: 'g/L' },
    { id: 8, category: 'Immunoglobulin', code: 'IgA', name: 'Immunoglobulin A', unit: 'g/L' },
    { id: 10, category: 'LFT', code: 'ALT', name: 'Alanine Aminotransferase', unit: 'U/L' },
    { id: 11, category: 'LFT', code: 'AST', name: 'Aspartate Aminotransferase', unit: 'U/L' },
    { id: 12, category: 'Renal', code: 'BUN', name: 'Blood Urea Nitrogen', unit: 'mg/dL' },
    { id: 13, category: 'Renal', code: 'CREAT', name: 'Creatinine', unit: 'mg/dL' },
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
    setLabTestData((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    setShowDeleteConfirm(false);
    setSuccessMessage("Lab Test deleted successfully!");
    setShowSuccess(true);
    setItemToDelete(null);
  };

  // UPDATED: Fully implemented save logic
  const handleSaveForm = (formData) => {
    if (editingData) {
      setLabTestData((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      setSuccessMessage("Lab Test updated successfully!");
    } else {
      const newId = labTestData.length > 0 ? Math.max(...labTestData.map(d => d.id)) + 1 : 1;
      setLabTestData((prev) => [...prev, { ...formData, id: newId }]);
      setSuccessMessage("New Lab Test added successfully!");
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

  const renderGroupRow = (cellData) => (
    <div className="flex items-center gap-2 text-sky-900 font-black text-[12px] uppercase tracking-wider">
      <Tag size={12} className="text-[#00A3FF]" strokeWidth={3} />
      {cellData.value}
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

    /* LIGHT BLUE SUB-HEADING (GROUP ROW) STYLING */
    [&_.dx-group-row]:!bg-[#f0f9ff]
    [&_.dx-group-row>td]:!bg-[#f0f9ff]
    [&_.dx-group-row>td]:!border-y-[1px]
    [&_.dx-group-row>td]:!border-sky-200
    [&_.dx-group-row>td]:!py-1.5

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
          title="Lab Test List" 
          icon={TestTube2}
          onAddClick={handleOpenAddForm} 
        />
      </div>

      {/* 2. TABLE AREA - Solo Frame Alignment */}
      <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${gridClasses}`}>
        
        {/* UPDATED: INLINE CUSTOM FORM */}
        {isAddFormOpen && (
          <div className="px-4 py-4 shrink-0 border-b border-slate-200 bg-slate-50">
            <LabTestAddForm 
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
              content: 'Total Lab Tests: ${labTestData.length}';
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
            dataSource={labTestData}
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
              width={150} 
            />

            <Column 
              dataField="code" 
              caption="Code" 
              width={150} 
              cssClass="font-bold text-slate-800" 
            />
            
            <Column 
              dataField="name" 
              caption="Name" 
              minWidth={300} 
            />

            <Column 
              dataField="unit" 
              caption="Unit" 
              width={120} 
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
      <ConfirmPopup 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete this Lab Test (${itemToDelete?.name})?`}
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
      />

    </div>
  );
};

export default LabTestGrid;