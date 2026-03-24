import React, { useState } from 'react';
import { Lock, Save, Trash2, ShieldCheck, ListTree, X } from 'lucide-react';
import { SelectBox, DataGrid } from 'devextreme-react';
import { Column, Scrolling } from 'devextreme-react/data-grid';

const Authentication = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    { id: '1bd196d9', name: 'Provider' },
    { id: 'b4210aff', name: 'PK Staff' },
    { id: 'admin-001', name: 'Administrator' }
  ];

  // Mock data for the Assigned Menus table
  const [assignedMenus] = useState([
    { id: 1, name: 'Home', parent: '-', url: '-', sort: 1 },
    { id: 2, name: 'Dash Board', parent: 'Home', url: '/home', sort: 1 },
    { id: 3, name: 'Category', parent: 'Inventory', url: '/inventorytabs', sort: 1 },
    { id: 4, name: 'Appointment', parent: 'Appointment', url: '/appointment', sort: 1 },
    { id: 5, name: 'Library', parent: 'Library', url: '/libraryform', sort: 1 },
    { id: 6, name: 'Person', parent: 'Management', url: '/person', sort: 1 },
    { id: 7, name: 'Management', parent: '-', url: '-', sort: 2 },
    { id: 8, name: 'Diagnosis', parent: 'Bio', url: '/diagnosis', sort: 2 },
    { id: 9, name: 'Patient', parent: 'Appointment', url: '/patient', sort: 2 },
    { id: 10, name: 'Inventory', parent: 'Inventory', url: '/inventory', sort: 2 },
    { id: 11, name: 'Status', parent: 'Management', url: '/status', sort: 2 },
  ]);

  const handleRoleChange = (e) => setSelectedRole(e.value);

  // Constants for your brand colors
  const brandGradient = "linear-gradient(90deg, #7EE8B5 0%, #DDF51A 100%)";

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-4 flex flex-col gap-4 animate-in fade-in duration-500 font-sans">
      
      {/* 1. TOP SELECTION CARD (Updated to Blueprint/Sky Theme) */}
      <div className="w-full bg-white border-2 border-sky-200 rounded-lg shadow-lg overflow-hidden shrink-0">
        {/* BLUEPRINT HEADER */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Lock size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <h2 className="text-sky-900 font-bold text-[13px] uppercase tracking-wide leading-tight">
              Role Menu Permissions
            </h2>
          </div>
        </div>

        <div className="p-6 bg-white/50">
          <div className="max-w-md">
            <label className="text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1">
              Select Role Configuration <span className="text-red-500">*</span>
            </label>
            <SelectBox
              dataSource={roles}
              displayExpr="name"
              valueExpr="id"
              placeholder="-- Select Role --"
              height={42}
              onValueChanged={handleRoleChange}
              className="custom-role-select"
              stylingMode="outlined"
            />
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT AREA (Logic Kept the Same) */}
      {!selectedRole ? (
        <div className="flex-1 bg-white rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
          <ShieldCheck size={54} className="mb-3 opacity-20" />
          <p className="text-sm font-bold uppercase tracking-widest text-slate-300">Please select a role to proceed</p>
        </div>
      ) : (
        <div className="flex-1 flex gap-5 animate-in slide-in-from-bottom-4 duration-700">
          
          {/* LEFT: Menu Structure Sidebar */}
          <div className="w-72 bg-white rounded-xl border border-slate-200 p-5 flex flex-col shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <ListTree size={18} className="text-blue-600" />
                <h3 className="text-[15px] font-black text-slate-800 uppercase tracking-tight">Menu Structure</h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center">
               <div className="mb-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <ShieldCheck size={32} className="text-slate-200" />
                  </div>
                  <p className="text-[12px] text-slate-400 italic">No menus found.</p>
               </div>

               <button className="w-full bg-[#1D9461] hover:bg-[#167a4f] text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-black text-[13px] transition-all shadow-md active:scale-95 uppercase">
                 <Save size={18} />
                 Save Permissions
               </button>
            </div>
          </div>

          {/* RIGHT: Assigned Menus Table */}
          <div className="flex-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
            
            {/* Table Header: Swapped Orange for Brand Gradient */}
            <div 
              className="px-4 py-3 flex justify-between items-center shadow-sm"
              style={{ background: brandGradient }}
            >
              <h2 className="text-slate-800 font-black text-[14px] uppercase tracking-wide">Assigned Menus</h2>
              <div className="flex items-center gap-2 bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                <span className="text-slate-800 text-[10px] font-bold uppercase">Role:</span>
                <span className="text-slate-800 text-[11px] font-black">{roles.find(r => r.id === selectedRole)?.name}</span>
              </div>
            </div>

            {/* Compact DataGrid */}
            <div className="flex-1 custom-permission-grid">
              <DataGrid
                dataSource={assignedMenus}
                showBorders={false}
                showRowLines={true}
                rowAlternationEnabled={false}
                height="100%"
                hoverStateEnabled={true}
              >
                <Scrolling mode="virtual" />
                <Column dataField="id" caption="#" width={50} alignment="center" />
                <Column 
                    dataField="name" 
                    caption="Menu Name" 
                    cellRender={(e) => <span className="font-bold text-slate-700 text-[13px]">{e.value}</span>} 
                />
                <Column dataField="parent" caption="Parent Menu" alignment="center" />
                <Column dataField="url" caption="URL" alignment="center" cellRender={(e) => <span className="text-blue-500 text-[12px] italic">{e.value}</span>} />
                <Column dataField="sort" caption="Sort" width={70} alignment="center" />
                <Column 
                  caption="Action" 
                  width={90} 
                  alignment="center"
                  cellRender={() => (
                    <button className="p-1.5 bg-[#EF233C] text-white rounded-md hover:bg-red-600 hover:scale-110 transition-all shadow-sm">
                      <Trash2 size={14} strokeWidth={2.5} />
                    </button>
                  )}
                />
              </DataGrid>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-role-select {
          border-radius: 8px !important;
          border: 2px solid #E2E8F0 !important;
        }
        
        .custom-role-select.dx-state-focused {
          border-color: #00A3FF !important;
        }

        .custom-permission-grid .dx-datagrid-headers {
          background-color: #ffffff !important;
          border-bottom: 2px solid #F1F5F9 !important;
        }

        .custom-permission-grid .dx-datagrid-text-content {
          color: #94A3B8 !important;
          font-weight: 800 !important;
          font-size: 11px !important;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .custom-permission-grid .dx-data-row td {
          padding: 8px 10px !important;
          font-size: 13px !important;
          border-bottom: 1px solid #F1F5F9 !important;
        }
      `}</style>
    </div>
  );
};

export default Authentication;