import React, { useState } from 'react';
import { Building2, ShieldCheck, Save, RotateCw, Edit3, Users } from 'lucide-react';
import { SelectBox, DataGrid } from 'devextreme-react';
import { Column, Scrolling, Paging } from 'devextreme-react/data-grid';

const OrgRoles = () => {
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  // Constants for your brand colors (Preserved)
  const brandGradient = "linear-gradient(90deg, #7EE8B5 0%, #DDF51A 100%)";
  const standardBlue = "#1D68F1"; 

  // Mock data for the table (Preserved)
  const [mappings] = useState([
    { id: 1, organization: 'SAASC', role: 'OrgAdmin' }
  ]);

  const organizations = [{ id: 1, name: 'SAASC' }, { id: 2, name: 'HealthCare Plus' }];
  const roles = [{ id: 1, name: 'Provider' }, { id: 2, name: ' PK Staff' }];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-4 flex flex-col gap-4 animate-in fade-in duration-500 font-sans">
      
      {/* 1. ASSIGN ROLE CARD (Updated to Blueprint/Sky Theme) */}
      <div className="w-full bg-white border-2 border-sky-200 rounded-lg shadow-lg overflow-hidden shrink-0">
        {/* BLUEPRINT HEADER */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Users size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <h2 className="text-sky-900 font-bold text-[13px] uppercase tracking-wide leading-tight">
              Assign Role to Organization
            </h2>
          </div>
        </div>

        {/* INPUT AREA */}
        <div className="p-6 bg-white/50 flex flex-wrap items-end gap-6">
          <div className="flex-1 min-w-[250px]">
            <label className="text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1">
              Organization <span className="text-red-500">*</span>
            </label>
            <SelectBox
              dataSource={organizations}
              displayExpr="name"
              valueExpr="id"
              placeholder="-- Select Organization --"
              height={42}
              onValueChanged={(e) => setSelectedOrg(e.value)}
              className="custom-selectbox"
              stylingMode="outlined"
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label className="text-[11px] font-black text-sky-900 mb-1.5 uppercase tracking-wider block ml-1">
              Role <span className="text-red-500">*</span>
            </label>
            <SelectBox
              dataSource={roles}
              displayExpr="name"
              valueExpr="id"
              placeholder="-- Select Role --"
              height={42}
              onValueChanged={(e) => setSelectedRole(e.value)}
              className="custom-selectbox"
              stylingMode="outlined"
            />
          </div>

          <button className="bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[42px] px-10 rounded-lg flex items-center justify-center gap-2 font-black text-[13px] transition-all shadow-md active:scale-95 uppercase tracking-wider shrink-0">
            <Save size={18} strokeWidth={2.5} />
            Save Mapping
          </button>
        </div>
      </div>

      {/* 2. MAPPING LIST SECTION (Preserved) */}
      <div className="flex-1 min-h-0 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden flex flex-col">
        
        {/* HEADER: Green-Yellow Gradient */}
        <div 
          className="px-4 py-2 flex justify-between items-center shadow-sm"
          style={{ background: brandGradient }}
        >
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-slate-800" />
            <h2 className="text-slate-800 font-black text-[14px] uppercase tracking-wide">Organization Role Mapping</h2>
          </div>
          <button className="p-1.5 hover:bg-white/30 rounded-full transition-colors text-slate-800">
            <RotateCw size={16} strokeWidth={3} />
          </button>
        </div>

        {/* COMPACT DATAGRID */}
        <div className="flex-1 custom-mapping-grid">
          <DataGrid
            dataSource={mappings}
            showBorders={false}
            showRowLines={true}
            height="100%"
            columnAutoWidth={true}
            hoverStateEnabled={true}
          >
            <Scrolling mode="virtual" />
            
            <Column dataField="id" caption="ID" width={80} alignment="center" />
            <Column dataField="organization" caption="Organization" alignment="center" />
            <Column dataField="role" caption="Role" alignment="center" />
            
            <Column 
              caption="Edit" 
              width={100} 
              alignment="center"
              cellRender={() => (
                <button className="p-1.5 text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-all">
                  <Edit3 size={15} />
                </button>
              )}
            />
          </DataGrid>
        </div>
      </div>

      <style jsx global>{`
        .custom-selectbox {
          border-radius: 8px !important;
          border: 2px solid #E2E8F0 !important;
        }
        
        .custom-selectbox.dx-state-focused {
          border-color: #00A3FF !important;
        }

        .custom-mapping-grid .dx-datagrid-headers {
          background-color: #F8FAFC !important;
          border-bottom: 1px solid #E2E8F0 !important;
        }

        .custom-mapping-grid .dx-datagrid-text-content {
          color: #94A3B8 !important;
          font-weight: 700 !important;
          font-size: 11px !important;
          text-transform: uppercase;
        }

        .custom-mapping-grid .dx-data-row td {
          padding: 12px 8px !important;
          font-size: 13px !important;
          border-bottom: 1px solid #F1F5F9 !important;
        }

        .dx-data-row.dx-state-hover {
          background-color: #F8FAFC !important;
        }
      `}</style>
    </div>
  );
};

export default OrgRoles;