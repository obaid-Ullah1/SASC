import React, { useState } from 'react';
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  SearchPanel,
  Scrolling,
  StateStoring,
} from "devextreme-react/data-grid";

import {
  Users,
  Pencil,
  Trash2,
  Menu as MenuIcon, 
  LayoutGrid        
} from 'lucide-react';

import TableHeader from "../../components/TableHeader";
import AddMenuForm from "/src/components/management/AddForms/AddMenuForm";

// ✅ Added Global Popups
import ConfirmPopup from '../../components/global/ConfirmPopup';
import SuccessPopup from '../../components/global/SuccessPopup';

const MenusPage = () => {
  const [activeTab, setActiveTab] = useState('Menu');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null); 

  // ✅ Added Popup State
  const [showConfirm, setShowConfirm] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const storageKey = "menus-grid-state-v6";

  const handleResetLayout = () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  };

  /* ===========================
      DATA STATE
  ============================ */
  const [menuData, setMenuData] = useState([
    { id: 1, menuName: 'Home', url: '', sort: 1, status: 'Active', color: '#8b5cf6' },
    { id: 2, menuName: 'Management', url: '', sort: 2, status: 'Active', color: '#10b981' },
    { id: 3, menuName: 'Setting', url: '', sort: 3, status: 'Active', color: '#475569' },
  ]);

  const [subMenuData, setSubMenuData] = useState([
    { id: 44, menu: 'Home', subMenu: 'Dash Board', url: '/home', parentId: 1, status: 'Active', color: '#10b981' },
    { id: 16, menu: 'Management', subMenu: 'Status', url: '/status', parentId: 2, status: 'Active', color: '#6366f1' },
  ]);

  /* ===========================
      CRUD HANDLERS
  ============================ */
  const handleOpenAddForm = () => {
    setEditingRecord(null);
    setShowAddForm(true);
  };

  const handleEditClick = (rowData) => {
    setEditingRecord(rowData);
    setShowAddForm(true);
  };

  // ✅ Updated to open Confirm Popup instead of window.confirm
  const handleDeleteClick = (id) => {
    setRecordToDelete(id);
    setShowConfirm(true);
  };

  // ✅ Added confirmation execution function
  const confirmDelete = () => {
    if (activeTab === 'Menu') {
      setMenuData(prev => prev.filter(item => item.id !== recordToDelete));
    } else {
      setSubMenuData(prev => prev.filter(item => item.id !== recordToDelete));
    }
    setShowConfirm(false);
    setRecordToDelete(null);
    setSuccessMessage("Record deleted successfully!");
    setShowSuccess(true);
  };

  const handleSaveForm = (formData) => {
    const isUpdate = !!editingRecord;

    if (activeTab === 'Menu') {
      if (editingRecord) {
        setMenuData(prev => prev.map(item => item.id === editingRecord.id ? { ...item, ...formData } : item));
      } else {
        setMenuData([{ ...formData, id: Date.now() }, ...menuData]);
      }
    } else {
      if (editingRecord) {
        setSubMenuData(prev => prev.map(item => item.id === editingRecord.id ? { ...item, ...formData } : item));
      } else {
        setSubMenuData([{ ...formData, id: Date.now() }, ...subMenuData]);
      }
    }
    setShowAddForm(false);
    setEditingRecord(null);
    setSuccessMessage(isUpdate ? "Record updated successfully!" : "New record added successfully!");
    setShowSuccess(true);
  };

  /* ===========================
      NEW COLUMN RENDERS
  ============================ */
  const iconCellRender = () => (
    <div className="flex justify-center">
      <div className="p-1 rounded bg-blue-50 text-[#1D68F1]">
         <Users size={14} />
      </div>
    </div>
  );

  const colorCellRender = (data) => (
    <div className="flex justify-center">
      <div 
        className="w-4 h-4 rounded-full border border-slate-300 shadow-sm" 
        style={{ backgroundColor: data.value || '#cbd5e1' }} 
      />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#F3F4F6] font-sans p-0 flex flex-col">

      {/* ======================================================== */}
      {/* UPDATED TABS NAVIGATION WITH OFFICIAL THEME */}
      {/* ======================================================== */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-3 mt-0 shrink-0 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-300 w-fit mx-auto">
        <button
          onClick={() => { setActiveTab('Menu'); setShowAddForm(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            activeTab === 'Menu' 
              ? 'bg-[#00A3FF] text-white shadow-lg scale-105' 
              : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
          }`}
        >
          <MenuIcon size={15} strokeWidth={activeTab === 'Menu' ? 3 : 2} />
          <span className="text-[11px] font-black uppercase tracking-wider">Menu</span>
        </button>
        <button
          onClick={() => { setActiveTab('Sub-Menu'); setShowAddForm(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            activeTab === 'Sub-Menu' 
              ? 'bg-[#00A3FF] text-white shadow-lg scale-105' 
              : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
          }`}
        >
          <LayoutGrid size={15} strokeWidth={activeTab === 'Sub-Menu' ? 3 : 2} />
          <span className="text-[11px] font-black uppercase tracking-wider">Sub-Menu</span>
        </button>
      </div>

      {/* MAIN CARD WITH RESPONSIVE HEIGHT */}
      <div
        className="bg-white border border-slate-300 rounded-xl shadow-2xl flex flex-col mx-5 relative"
        style={{ height: "calc(100vh - 140px)" }}
      >

        {/* HEADER */}
        <TableHeader 
          title={activeTab === 'Menu' ? "Menu Records" : "Sub-Menu Records"}
          onAddClick={handleOpenAddForm}
          onResetClick={handleResetLayout}
        />

        {/* ADD FORM RENDER AREA */}
        {showAddForm && (
          <div className="p-4 border-b border-slate-200 bg-slate-50 shrink-0">
            <AddMenuForm 
              onCancel={() => setShowAddForm(false)} 
              onSave={handleSaveForm}
              initialData={editingRecord}
              activeTab={activeTab}
            />
          </div>
        )}

        {/* GRID AREA: min-h-0 and relative are critical to binding the sticky pager */}
        <div className="flex-1 min-h-0 relative overflow-hidden flex flex-col">
          <DataGrid
            dataSource={activeTab === 'Menu' ? menuData : subMenuData}
            keyExpr="id"
            height="100%"
            showBorders={false}
            rowAlternationEnabled={true}
            allowColumnReordering={true}
            allowColumnResizing={true}
            columnResizingMode="widget"
          >

            <StateStoring
              enabled={true}
              type="localStorage"
              storageKey={storageKey}
            />

            {/* INTERNAL SCROLL ONLY */}
            <Scrolling mode="virtual" />

            <GroupPanel visible={true} />
            <SearchPanel visible={true} width={220} placeholder="Search..." />
            <FilterRow visible={true} applyFilter="auto" />
            <HeaderFilter visible={true} />

            <Paging defaultPageSize={20} />

            <Pager
              visible={true}
              showPageSizeSelector={true}
              allowedPageSizes={[10, 20, 50, 100]}
              showInfo={true}
              infoText="Page {0} of {1} ({2} items)"
              showNavigationButtons={true}
              displayMode="full"
            />

            {/* COLUMNS FOR MENU AND SUB-MENU */}
            {activeTab === 'Menu' ? (
              <>
                <Column dataField="id" caption="ID" width={60} alignment="center" />
                <Column dataField="menuName" caption="Menu Name" minWidth={180} />
                <Column dataField="url" caption="URL" minWidth={150} />
                <Column dataField="sort" caption="Sort" width={70} alignment="center" />
              </>
            ) : (
              <>
                <Column dataField="id" caption="ID" width={80} alignment="center" />
                <Column dataField="menu" caption="Menu" minWidth={130} />
                <Column dataField="subMenu" caption="Sub Menu" minWidth={150} />
                <Column dataField="url" caption="URL" minWidth={130} />
                <Column dataField="parentId" caption="Parent ID" width={90} alignment="center" />
              </>
            )}

            <Column caption="Icon" width={70} alignment="center" cellRender={iconCellRender} />
            <Column dataField="color" caption="Color" width={70} alignment="center" cellRender={colorCellRender} />

            <Column
              dataField="status"
              caption="Status"
              width={100}
              alignment="center"
            />

            {/* WIRED UP ACTION ICONS */}
            <Column
              caption="Action"
              width={110}
              alignment="center"
              fixed={true}
              fixedPosition="right"
              allowFiltering={false}
              cellRender={(row) => (
                <div className="flex justify-center gap-2.5">
                  <button 
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={() => handleEditClick(row.data)}
                  >
                    <Pencil size={15} />
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleDeleteClick(row.data.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            />

          </DataGrid>
        </div>
      </div>

      {/* ✅ ADDED GLOBAL POPUPS */}
      <ConfirmPopup 
        isOpen={showConfirm} 
        onClose={() => setShowConfirm(false)} 
        onConfirm={confirmDelete}
        title="Delete Record"
        message="Are you sure you want to delete this record? This action cannot be undone."
      />
      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message={successMessage} 
      />

      <style jsx global>{`
        /* FORCED STICKY FOOTER LOGIC */
        .dx-datagrid-pager, .dx-pager {
          position: sticky !important;
          bottom: 0 !important;
          z-index: 50 !important;
          border-top: 1px solid #e2e8f0 !important;
          padding: 10px 20px !important;
          background: #fff !important;
          box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05) !important;
        }

        .dx-page.dx-selection {
          background-color: #cbd5e1 !important;
          border-radius: 4px !important;
        }

        .dx-page-sizes .dx-selection {
          background-color: #cbd5e1 !important;
          border-radius: 4px !important;
        }
      `}</style>

    </div>
  );
};

export default MenusPage;