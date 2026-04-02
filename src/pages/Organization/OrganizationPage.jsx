import React, { useState } from 'react';

// Components
import OrganizationForm from '../../components/organization/OrganizationForm.jsx';
import OrganizationGrid from '../../components/organization/OrganizationGrid.jsx';

// Global Components
import SuccessPopup from '../../components/global/SuccessPopup.jsx';

const OrganizationPage = () => {
  // 1. Central State for Data
  const [orgRecords, setOrgRecords] = useState([
    { id: 1, name: 'SAASC', code: 'SA', email: 'SAASC123@gmail.com', phone: '121-312-3123', address: 'test', accounts: 'Created' }
  ]);

  // 2. Form Visibility & Editing State
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  
  // 3. Success Popup State (Matching Category.jsx style)
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Helper to trigger the popup
  const triggerPopup = (msg) => {
    setSuccessMsg(msg);
    setShowSuccess(true);
    // Auto-hide handled by the component or manually here:
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Logic to handle both Add and Update
  const handleSaveOrganization = (formData) => {
    if (editingRecord) {
      // UPDATE: Find the record by ID and replace its data
      setOrgRecords(prev => prev.map(record => 
        record.id === editingRecord.id ? { ...formData, id: record.id } : record
      ));
      triggerPopup("Organization updated successfully!");
    } else {
      // ADD: Create a new record with a unique ID
      const newOrg = { 
        ...formData, 
        id: orgRecords.length > 0 ? Math.max(...orgRecords.map(o => o.id)) + 1 : 1, 
        accounts: 'Created' 
      };
      setOrgRecords([newOrg, ...orgRecords]);
      triggerPopup("Organization added successfully!");
    }
    
    closeForm();
  };

  // Logic to open form in Edit Mode
  const handleEditClick = (record) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  // Logic to Reset and Close Form
  const closeForm = () => {
    setShowForm(false);
    setEditingRecord(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans overflow-hidden relative">
      
      {/* SCROLLABLE CONTENT AREA */}
      <div className="p-4 space-y-6 overflow-y-auto flex-1 relative z-10">
        
        {/* ADD / UPDATE FORM */}
        {showForm && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
            <OrganizationForm 
              onSave={handleSaveOrganization} 
              onClose={closeForm}
              initialData={editingRecord}
            />
          </div>
        )}

        {/* RECORDS GRID */}
        <OrganizationGrid 
          records={orgRecords} 
          onAddClick={() => { setEditingRecord(null); setShowForm(true); }}
          onEditClick={handleEditClick}
        />
        
      </div>
      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        message={successMsg} 
      />

    </div>
  );
};

export default OrganizationPage;