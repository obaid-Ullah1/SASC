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
  Plus,
  Filter,
  RotateCw
} from 'lucide-react';

import AddMenuForm from "/src/components/management/AddForms/AddMenuForm";

const MenusPage = () => {
  const [activeTab, setActiveTab] = useState('Menu');
  const [showAddForm, setShowAddForm] = useState(false);

  const storageKey = "menus-grid-state-v6";

  const handleResetLayout = () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  };

  /* ===========================
     MENU DATA
  ============================ */
  const menuData = [
    { id: 1, menuName: 'Home', url: '', sort: 1, status: 'Active' },
    { id: 2, menuName: 'Management', url: '', sort: 2, status: 'Active' },
    { id: 3, menuName: 'Setting', url: '', sort: 3, status: 'Active' },
    { id: 10, menuName: 'Patient', url: '', sort: 10, status: 'Inactive' },
    { id: 12, menuName: 'Organization', url: '', sort: 12, status: 'Active' },
    ...Array.from({ length: 40 }, (_, i) => ({
      id: 100 + i,
      menuName: `Sample ${i + 1}`,
      url: '',
      sort: 99,
      status: 'Active'
    }))
  ];

  const subMenuData = [
    { id: 44, menu: 'Home', subMenu: 'Dash Board', url: '/home', status: 'Active' },
    { id: 16, menu: 'Management', subMenu: 'Status', url: '/status', status: 'Active' },
    { id: 17, menu: 'Setting', subMenu: 'User Management', url: '/usermanagement', status: 'Inactive' },
    { id: 19, menu: 'Setting', subMenu: 'Dose Rules', url: '/injectiondosetabs', status: 'Active' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F3F4F6] font-sans p-5">

      {/* MAIN CARD WITH RESPONSIVE HEIGHT */}
      <div
        className="bg-white border border-slate-300 rounded-xl shadow-2xl flex flex-col"
        style={{ height: "calc(100vh - 120px)" }}
      >

        {/* HEADER */}
        <div
          className="px-4 py-3 flex justify-between items-center border-b border-slate-200"
          style={{ background: 'linear-gradient(90deg, #7EE8B5 0%, #DDF51A 100%)' }}
        >
          <div className="flex items-center gap-3">
            <Users size={20} className="text-slate-800" strokeWidth={3} />
            <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-tighter">
              {activeTab === 'Menu' ? "Menu Records" : "Sub-Menu Records"}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"
            >
              <Plus size={18} strokeWidth={3} />
            </button>

            <button
              onClick={handleResetLayout}
              className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center shadow"
            >
              <RotateCw size={15} />
            </button>

            <button className="w-8 h-8 rounded bg-[#EF233C] text-white flex items-center justify-center shadow">
              <Filter size={15} />
            </button>
          </div>
        </div>

        {/* GRID AREA */}
        <div className="flex-1 overflow-hidden">
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
                <Column dataField="menu" caption="Menu" minWidth={150} />
                <Column dataField="subMenu" caption="Sub Menu" minWidth={180} />
                <Column dataField="url" caption="URL" minWidth={150} />
              </>
            )}

            <Column
              dataField="status"
              caption="Status"
              width={120}
              alignment="center"
            />

            <Column
              caption="Action"
              width={110}
              alignment="center"
              fixed={true}
              fixedPosition="right"
              allowFiltering={false}
              cellRender={() => (
                <div className="flex justify-center gap-2.5">
                  <button className="text-blue-500">
                    <Pencil size={15} />
                  </button>
                  <button className="text-red-500">
                    <Trash2 size={15} />
                  </button>
                </div>
              )}
            />

          </DataGrid>
        </div>
      </div>

      {/* PAGER STYLE */}
      <style jsx global>{`
        .dx-pager {
          border-top: 1px solid #e2e8f0 !important;
          padding: 10px 20px !important;
          background: #fff !important;
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
