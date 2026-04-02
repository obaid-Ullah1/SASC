import React, { useState } from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Pager, 
  Paging, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { Layers, Plus, RefreshCw, Pencil, Trash2, Search } from 'lucide-react';

// Import the form component
import DilutionAddForm from './AddForm/DilutionAddForm';

// ✅ IMPORT GLOBAL POPUPS
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const DilutionColor = () => {
  const [pageSize, setPageSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(0);
  
  // Form & Editing state
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // ✅ GLOBAL POPUP STATES
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successType, setSuccessType] = useState(''); // 'Added', 'Updated', or 'Deleted'

  const [colorData, setColorData] = useState([
    { id: 1, ratio: '1:100000', colorName: 'Grey', hex: '#9CA3AF' },
    { id: 2, ratio: '1:10000', colorName: 'Green', hex: '#22C55E' },
    { id: 3, ratio: '1:1000', colorName: 'Blue', hex: '#3B82F6' },
    { id: 4, ratio: '1:100', colorName: 'Yellow', hex: '#EAB308' },
    { id: 5, ratio: '1:10', colorName: 'Red', hex: '#EF4444' },
    { id: 1006, ratio: '1:1', colorName: 'Black', hex: '#000000' },
  ]);

  const totalCount = colorData.length;

  const handleOptionChanged = (e) => {
    if (e.name === 'paging.pageSize') setPageSize(e.value);
    if (e.name === 'paging.pageIndex') setPageIndex(e.value);
  };

  // Helper to close form and reset edit state
  const handleCloseForm = () => {
    setIsAddFormOpen(false);
    setEditingItem(null);
  };

  // Helper to trigger success message
  const triggerSuccess = (type) => {
    setSuccessType(type);
    setIsSuccessOpen(true);
    setTimeout(() => setIsSuccessOpen(false), 1500);
  };

  // --- ADD ACTION ---
  const handleAddNewRow = (formData) => {
    const newId = colorData.length > 0 ? Math.max(...colorData.map(d => d.id)) + 1 : 1;
    const newEntry = {
      id: newId,
      ratio: formData.ratio,
      colorName: formData.color.name,
      hex: formData.color.hex
    };
    setColorData([...colorData, newEntry]);
    handleCloseForm();
    triggerSuccess('Added');
  };

  // --- UPDATE ACTION ---
  const handleUpdateRow = (formData) => {
    setColorData(colorData.map(item => 
      item.id === editingItem.id 
        ? { ...item, ratio: formData.ratio, colorName: formData.color.name, hex: formData.color.hex } 
        : item
    ));
    handleCloseForm();
    triggerSuccess('Updated');
  };

  // --- DELETE ACTIONS ---
  const handleDeleteClick = (rowData) => {
    setItemToDelete(rowData);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setColorData(prev => prev.filter(item => item.id !== itemToDelete.id));
    setIsConfirmOpen(false);
    setItemToDelete(null);
    triggerSuccess('Deleted');
  };

  const colorIndicatorRender = (data) => (
    <div className="flex items-center justify-center h-full">
      <div 
        className="w-4 h-4 rounded-full shadow-inner ring-1 ring-black/10 transition-transform hover:scale-110" 
        style={{ backgroundColor: data.data.hex }}
        title={data.data.colorName}
      ></div>
    </div>
  );

  // REDUCED ICON SIZES WIRED TO ACTIONS
  const actionCellRender = (data) => (
    <div className="flex items-center justify-center gap-1.5 h-full">
      <button 
        onClick={() => {
          setEditingItem(data.data);
          setIsAddFormOpen(true);
        }}
        className="w-6 h-6 rounded border border-blue-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm"
        title="Edit"
      >
        <Pencil size={11} strokeWidth={3} />
      </button>
      <button 
        onClick={() => handleDeleteClick(data.data)}
        className="w-6 h-6 rounded border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white hover:scale-110 active:scale-95 transition-all shadow-sm"
        title="Delete"
      >
        <Trash2 size={11} strokeWidth={3} />
      </button>
    </div>
  );

  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#F1F5F9] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-3
    [&_.dx-datagrid-text-content]:!text-slate-600
    [&_.dx-datagrid-text-content]:!font-bold
    [&_.dx-datagrid-text-content]:!text-[12px]
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!py-1
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row]:!h-[32px]
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!text-[12px]
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-selection-disabled]:!hidden
  `;

  return (
    <div className="bg-white flex flex-col h-full w-full rounded-xl shadow-lg border border-slate-300 overflow-hidden relative">
      
      {/* 1. HEADER */}
      <div className="bg-gradient-to-r from-[#76E0C2] to-[#E2FB46] px-4 py-2 sm:py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shrink-0 border-b border-[#bef264]">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-white/40 p-1 rounded-md shadow-sm shrink-0">
            <Layers size={18} className="text-[#2A333A]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-[14px] font-black text-[#2A333A] tracking-tight uppercase">Dilution Ratio Color</h2>
              <span className="text-[10px] font-bold text-[#2A333A]/70 bg-white/30 px-2 py-0.5 rounded-full shrink-0">Total: {totalCount}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
          <button 
            onClick={() => {
              if (isAddFormOpen) handleCloseForm();
              else {
                setEditingItem(null);
                setIsAddFormOpen(true);
              }
            }}
            className="bg-[#007BFF] hover:bg-blue-600 w-[32px] h-[32px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white shadow-md transition-all active:scale-95 shrink-0"
            title={isAddFormOpen ? "Close Form" : "Add New Row"}
          >
            <Plus size={18} strokeWidth={3} className={isAddFormOpen ? "rotate-45 transition-transform" : "transition-transform"} />
          </button>
          
          <div className="relative group flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search colors..." 
              className="border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-[12px] w-full sm:w-48 outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-blue-100 transition-all bg-white/80"
            />
          </div>

          <button className="w-[32px] h-[32px] sm:w-8 sm:h-8 bg-white/40 border border-white/20 rounded-lg flex items-center justify-center text-[#2A333A] hover:bg-white transition-all shadow-sm shrink-0">
            <RefreshCw size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 2. DATAGRID CONTENT */}
      <div className={`flex-1 overflow-hidden p-0 bg-white custom-footer-grid ${gridClasses}`}>
        
        <DilutionAddForm 
          isOpen={isAddFormOpen} 
          onClose={handleCloseForm} 
          onAdd={handleAddNewRow} 
          onUpdate={handleUpdateRow}
          editingItem={editingItem}
        />

        <style dangerouslySetInnerHTML={{ __html: `
          .custom-footer-grid .dx-datagrid-pager {
            border-top: 1px solid #e2e8f0 !important;
            padding: 0 !important;
          }
          .custom-footer-grid .dx-datagrid-pager::before {
            content: 'Total: ${totalCount}';
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

        <DataGrid
          dataSource={colorData}
          height="100%"
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
          rowAlternationEnabled={true}
          hoverStateEnabled={true}
          columnAutoWidth={true}
          onOptionChanged={handleOptionChanged}
        >
          <SearchPanel visible={false} />
          <LoadPanel enabled={true} />
          <Scrolling mode="standard" showScrollbar="always" />
          
          <Column dataField="id" caption="# ID" width={80} cssClass="font-bold pl-4" alignment="left" />
          <Column dataField="ratio" caption="Dilution Ratio" minWidth={250} />
          <Column dataField="colorName" caption="Color Name" cssClass="font-semibold" minWidth={150} />
          <Column 
            dataField="hex" 
            caption="Color" 
            cellRender={colorIndicatorRender} 
            width={150} 
            alignment="center" 
          />
          
          <Column 
            caption="Action" 
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
            showInfo={false}
            showNavigationButtons={true}
          />
        </DataGrid>
      </div>

      {/* ✅ GLOBAL POPUPS MOUNTED HERE */}
      <ConfirmPopup 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Ratio"
        message={`Are you sure you want to delete the "${itemToDelete?.ratio}" ratio? This action cannot be undone.`}
      />

      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        type={successType}
      />
      
    </div>
  );
};

export default DilutionColor;