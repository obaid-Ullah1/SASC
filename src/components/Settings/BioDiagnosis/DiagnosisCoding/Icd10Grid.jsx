import React, { useState } from 'react';
import DataGrid, {
  Column,
  Grouping,
  Scrolling,
  Paging,
  Pager,
  Sorting,
} from 'devextreme-react/data-grid';
import { Edit2, Trash2, Check, Tag } from 'lucide-react';

import TableHeader from '../../../TableHeader'; 
import IcdAddForm from './AddForms/IcdAddForm';
import Confirmpopup from '../../../global/ConfirmPopup';
import SuccessPopup from '../../../global/SuccessPopup';

const Icd10Grid = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // Popup States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemToDelete, setItemToDelete] = useState(null);

  const [icd10Data, setIcd10Data] = useState([
    { id: 1, category: 'GINA (Asthma)', code: 'J45.40', name: 'Moderate persistent asthma, uncomplicated', isDefault: true },
    { id: 2, category: 'GINA (Asthma)', code: 'J45.41', name: 'Moderate persistent asthma with (acute) exacerbation', isDefault: false },
    { id: 3, category: 'GINA (Asthma)', code: 'J45.50', name: 'Severe persistent asthma, uncomplicated', isDefault: false },
    { id: 4, category: 'GINA (Asthma)', code: 'J45.51', name: 'Severe persistent asthma with (acute) exacerbation', isDefault: false },
    { id: 5, category: 'GINA (Asthma)', code: 'J45.52', name: 'Severe persistent asthma with status asthmaticus', isDefault: false },
    { id: 6, category: 'GINA (Asthma)', code: 'J45.909', name: 'Unspecified asthma, uncomplicated', isDefault: false },
    { id: 7, category: 'Hanifin & Rajka (AD)', code: 'L20.0', name: 'Besnier’s prurigo', isDefault: false },
    { id: 8, category: 'Hanifin & Rajka (AD)', code: 'L20.81', name: 'Atopic neurodermatitis', isDefault: false },
    { id: 9, category: 'Hanifin & Rajka (AD)', code: 'L20.82', name: 'Intrinsic (allergic) eczema', isDefault: false },
    { id: 10, category: 'Hanifin & Rajka (AD)', code: 'L20.83', name: 'Infantile (acute) atopic dermatitis', isDefault: false },
    { id: 14, category: 'EPOS (CRSwNP)', code: 'J33.0', name: 'Polyp of nasal cavity', isDefault: false },
    { id: 19, category: 'ACR/EULAR (RA)', code: 'M05.79', name: 'Rheumatoid arthritis...', isDefault: false },
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
    setIcd10Data((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    setShowDeleteConfirm(false);
    setSuccessMessage("ICD Code deleted successfully!");
    setShowSuccess(true);
    setItemToDelete(null);
  };

  const handleSaveForm = (formData) => {
    if (editingData) {
      setIcd10Data((prev) =>
        prev.map((item) => (item.id === formData.id ? { ...formData } : item))
      );
      setSuccessMessage("ICD Code updated successfully!");
    } else {
      const newId = icd10Data.length > 0 ? Math.max(...icd10Data.map(d => d.id)) + 1 : 1;
      setIcd10Data((prev) => [...prev, { ...formData, id: newId }]);
      setSuccessMessage("New ICD Code added successfully!");
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
    <div className="flex items-center gap-2 text-sky-800 font-black text-[11px] uppercase tracking-widest">
      <Tag size={12} className="text-sky-500" strokeWidth={3} />
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
    [&_.dx-group-row>td]:!border-sky-100
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
          title="ICD 10 Code List" 
          onAddClick={handleOpenAddForm} 
        />
      </div>

      {/* 2. TABLE AREA - Solo Frame Alignment */}
      <div className={`flex-1 flex flex-col min-h-0 overflow-hidden ${gridClasses}`}>
        
        <IcdAddForm 
          isOpen={isAddFormOpen} 
          onClose={() => setIsAddFormOpen(false)} 
          onSave={handleSaveForm}
          editingData={editingData}
        />

        <div className="flex-1 min-h-0 overflow-hidden custom-footer-grid border-t border-slate-200">
          
          <style>{`
            .custom-footer-grid .dx-datagrid-pager {
              border-top: 1px solid #e2e8f0 !important;
              padding: 0 !important;
            }
            .custom-footer-grid .dx-datagrid-pager::before {
              content: 'Total ICD Codes: ${icd10Data.length}';
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
            dataSource={icd10Data}
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
              dataField="code" 
              caption="Code" 
              width={120} 
              cssClass="font-bold text-slate-800" 
            />
            
            <Column 
              dataField="name" 
              caption="Name" 
              minWidth={300} 
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

      {/* Global Popups */}
      <Confirmpopup 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete this ICD Code (${itemToDelete?.code})?`}
      />

      <SuccessPopup 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message={successMessage}
      />

    </div>
  );
};

export default Icd10Grid;