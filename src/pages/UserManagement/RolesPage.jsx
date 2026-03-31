import React, { useState, useMemo } from 'react';
import DataGrid, { 
  Column, 
  HeaderFilter, 
  Paging, 
  Pager 
} from "devextreme-react/data-grid";
import { UserPlus, Edit3, Trash2 } from 'lucide-react';

// Import components
import AddRoleForm from "../../components/management/AddForms/AddRoleForm";
import TableHeader from '../../components/TableHeader';
import ConfirmPopup from '../../components/global/ConfirmPopup';
import SuccessPopup from '../../components/global/SuccessPopup';

const RolesPage = () => {
  // --- STATE MANAGEMENT ---
  const [roles, setRoles] = useState([
    { id: '1bd196d9-fc31-4d47-bf7d-1d94007e604d', roleName: 'Provider', description: 'Primary healthcare provider with full clinical access' },
    { id: 'b4210aff-f2e7-4580-8e4c-10d094baf56c', roleName: 'PK Staff', description: 'Internal administrative staff for record management' },
    { id: '2cd196d9-fc31-4d47-bf7d-1d94007e604e', roleName: 'Provider', description: 'Primary healthcare provider with full clinical access' },
    { id: 'c5210aff-f2e7-4580-8e4c-10d094baf56f', roleName: 'PK Staff', description: 'Internal administrative staff for record management' },
    { id: '3dd196d9-fc31-4d47-bf7d-1d94007e604g', roleName: 'Provider', description: 'Primary healthcare provider with full clinical access' },
    { id: 'd6210aff-f2e7-4580-8e4c-10d094baf56h', roleName: 'PK Staff', description: 'Internal administrative staff for record management' },
    { id: '4ed196d9-fc31-4d47-bf7d-1d94007e604i', roleName: 'Provider', description: 'Primary healthcare provider with full clinical access' },
    { id: 'e7210aff-f2e7-4580-8e4c-10d094baf56j', roleName: 'PK Staff', description: 'Internal administrative staff for record management' },
    { id: '5fd196d9-fc31-4d47-bf7d-1d94007e604k', roleName: 'Provider', description: 'Primary healthcare provider with full clinical access' },
    { id: 'f8210aff-f2e7-4580-8e4c-10d094baf56l', roleName: 'PK Staff', description: 'Internal administrative staff for record management' },
    { id: '6gd196d9-fc31-4d47-bf7d-1d94007e604m', roleName: 'Provider', description: 'Primary healthcare provider with full clinical access' },
    { id: 'g9210aff-f2e7-4580-8e4c-10d094baf56n', roleName: 'PK Staff', description: 'Internal administrative staff for record management' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // --- HANDLERS ---
  const handleSaveRole = (formData) => {
    if (editingRecord) {
      setRoles(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...formData } : r));
      setSuccessMsg("Role updated successfully!");
    } else {
      const newRole = { ...formData, id: crypto.randomUUID() };
      setRoles([newRole, ...roles]);
      setSuccessMsg("New role added successfully!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleDeleteConfirm = () => {
    setRoles(prev => prev.filter(r => r.id !== recordToDelete.id));
    setShowConfirm(false);
    setRecordToDelete(null);
    setSuccessMsg("Role deleted successfully!");
    setShowSuccess(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingRecord(null);
  };

  const filteredRoles = useMemo(() => {
    return roles.filter(role => 
      role.roleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (role.description && role.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [roles, searchQuery]);

  return (
    // UPDATED: Changed bg-[#F1F5F9] to bg-white and removed p-4 to go edge-to-edge
    <div className="w-full h-screen bg-white p-0 flex flex-col overflow-hidden font-sans animate-in fade-in duration-500">
      
      {/* DYNAMIC FORM SECTION */}
      {showAddForm && (
        <div className="mb-0 shrink-0 animate-in fade-in slide-in-from-top-4 duration-300 border-b border-slate-200 bg-slate-50 p-4">
          <AddRoleForm 
            onCancel={closeForm} 
            onSave={handleSaveRole}
            initialData={editingRecord}
          />
        </div>
      )}

      {/* COMBINED HEADER & GRID SECTION */}
      {/* UPDATED: Removed border, rounded-lg, and shadow-sm to remove the frame effect */}
      <div className="flex-1 min-h-0 bg-white flex flex-col overflow-hidden">
        
        {/* HEADER SECTION */}
        <div className="shrink-0 border-b border-slate-300">
          <TableHeader 
            title="Role Management"
            totalCount={roles.length}
            icon={UserPlus}
            onSearchChange={(val) => setSearchQuery(val)}
            onAddClick={() => {
              setEditingRecord(null);
              setShowAddForm(true);
            }}
          />
        </div>
        
        {/* COMPACT DATAGRID AREA */}
        <div className="flex-1 min-h-0 custom-role-grid bg-white">
          <DataGrid
            dataSource={filteredRoles}
            keyExpr="id"
            showBorders={false}
            showRowLines={true}
            height="100%"
            rowAlternationEnabled={false}
            columnAutoWidth={false}
            hoverStateEnabled={true}
          >
            <HeaderFilter visible={true} />
            
            <Paging defaultPageSize={10} />
            <Pager 
              showPageSizeSelector={true} 
              allowedPageSizes={[10, 20, 50]} 
              showInfo={true} 
            />
            
            <Column 
              dataField="id" 
              caption="ID" 
              width={280}
              cellRender={(e) => <span className="font-mono text-[10px] text-slate-400 select-all">{e.value}</span>}
            />
            <Column 
              dataField="roleName" 
              caption="Role Name" 
              width={180}
              cellRender={(e) => <span className="font-bold text-slate-700 text-[12px]">{e.value}</span>}
            />
            <Column 
              dataField="description" 
              caption="Description" 
              cellRender={(e) => <span className="text-slate-500 text-[11px] truncate block">{e.value || '-'}</span>}
            />
            
            <Column 
              caption="Actions" 
              width={80} 
              alignment="center" 
              fixed={true}
              fixedPosition="right"
              cellRender={(e) => (
                <div className="flex justify-center gap-1">
                  <button 
                    onClick={() => { 
                      setEditingRecord(e.data); 
                      setShowAddForm(true); 
                    }}
                    className="p-1 text-blue-500 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-all cursor-pointer"
                    title="Edit Role"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    onClick={() => { 
                      setRecordToDelete(e.data); 
                      setShowConfirm(true); 
                    }}
                    className="p-1 text-red-400 hover:bg-red-50 rounded border border-transparent hover:border-red-200 transition-all cursor-pointer"
                    title="Delete Role"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )} 
            />
          </DataGrid>
        </div>
      </div>

      {/* GLOBAL POPUPS */}
      <ConfirmPopup 
        isOpen={showConfirm} 
        onClose={() => setShowConfirm(false)} 
        onConfirm={handleDeleteConfirm}
        title="Delete Role"
        message={`Are you sure you want to delete "${recordToDelete?.roleName}"? This action cannot be undone.`}
      />

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message={successMsg}
      />

      <style jsx global>{`
        /* REDUCE PADDING: Make rows thin */
        .dx-datagrid-rowsview .dx-data-row td {
          padding: 6px 10px !important; 
          height: 32px !important;
          border-bottom: 1px solid #f1f5f9 !important; 
        }

        /* REFINED HEADER: Compact and clean */
        .dx-datagrid-headers {
          background-color: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }
        
        .dx-datagrid-headers .dx-datagrid-text-content {
          color: #64748b !important;
          font-weight: 700 !important;
          font-size: 11px !important;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        /* HOVER EFFECT */
        .dx-data-row.dx-state-hover {
          background-color: #f0fdf4 !important; 
          transition: background-color 0.2s ease;
        }

        /* ALIGNMENT FIX */
        .dx-datagrid-content .dx-datagrid-table .dx-row > td {
          vertical-align: middle !important;
        }
        
        .dx-datagrid-pager, .dx-pager {
          border-top: 1px solid #e2e8f0 !important;
          padding: 10px 20px !important;
          background: #fff !important;
          box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.05) !important;
        }
      `}</style>
    </div>
  );
};

export default RolesPage;