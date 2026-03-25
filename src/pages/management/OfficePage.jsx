import React, { useState } from 'react';
import { Building2, CalendarDays, Briefcase, Pencil, Trash2 } from 'lucide-react';
import ManagementGrid from '../../components/management/ManagementGrid';

// ✅ Imported the specific Forms and Global Popups
import OfficeAddForm from '../../components/management/AddForms/OfficeAddForm';
import OfficeDayAdd from '../../components/management/AddForms/OfficeDayAdd';
import ConfirmPopup from '../../components/global/ConfirmPopup';
import SuccessPopup from '../../components/global/SuccessPopup';

const OfficePage = () => {
  const [activeTab, setActiveTab] = useState('offices');

  // --- STATE FOR FORMS & POPUPS ---
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // --- STATE FOR DATA (Converted from useMemo to useState to allow CRUD operations) ---
  const [officeData, setOfficeData] = useState(() => 
    Array.from({ length: 3280 }, (_, i) => ({
      id: i + 1,
      officeName: `Branch ${i + 1}`,
      status: i % 3 === 0 ? 'Inactive' : 'Active'
    }))
  );

  const [daysData, setDaysData] = useState(() => 
    Array.from({ length: 3280 }, (_, i) => ({
      id: i + 1,
      officeName: `Clinic ${(i % 10) + 1}`,
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i % 5]
    }))
  );

  const activeData = activeTab === 'offices' ? officeData : daysData;

  // --- CRUD HANDLERS ---
  const handleAddClick = () => {
    setEditingRecord(null);
    setShowAddForm(true);
  };

  const handleEditClick = (rowData) => {
    setEditingRecord(rowData);
    setShowAddForm(true);
  };

  const handleDeleteClick = (rowData) => {
    setRecordToDelete(rowData.id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (activeTab === 'offices') {
      setOfficeData(prev => prev.filter(item => item.id !== recordToDelete));
    } else {
      setDaysData(prev => prev.filter(item => item.id !== recordToDelete));
    }
    setShowConfirm(false);
    setRecordToDelete(null);
    setSuccessMessage("Record deleted successfully!");
    setShowSuccess(true);
  };

  const handleSaveForm = (formData) => {
    const isUpdate = !!editingRecord;

    if (activeTab === 'offices') {
      if (isUpdate) {
        setOfficeData(prev => prev.map(item => item.id === editingRecord.id ? { ...item, ...formData } : item));
      } else {
        const newId = officeData.length > 0 ? Math.max(...officeData.map(i => i.id)) + 1 : 1;
        setOfficeData([{ id: newId, ...formData }, ...officeData]);
      }
    } else {
      if (isUpdate) {
        setDaysData(prev => prev.map(item => item.id === editingRecord.id ? { ...item, ...formData } : item));
      } else {
        const newId = daysData.length > 0 ? Math.max(...daysData.map(i => i.id)) + 1 : 1;
        setDaysData([{ id: newId, ...formData }, ...daysData]);
      }
    }

    setShowAddForm(false);
    setEditingRecord(null);
    setSuccessMessage(isUpdate ? "Record updated successfully!" : "New record added successfully!");
    setShowSuccess(true);
  };

  // --- GRID COLUMNS ---
  const actionColumn = {
    caption: 'Actions',
    width: 110,
    fixed: true,
    fixedPosition: 'right',
    alignment: 'center',
    allowFiltering: false,
    cellRender: (row) => (
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => handleEditClick(row.data)}
          className="p-1.5 rounded-md text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm border border-blue-100"
          title="Edit Record"
        >
          <Pencil size={14} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => handleDeleteClick(row.data)}
          className="p-1.5 rounded-md text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm border border-red-100"
          title="Delete Record"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      </div>
    )
  };

  const statusRender = (data) => (
    <div className="flex justify-center">
      <span className={`px-4 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm ${
        data.value === 'Active' ? 'bg-[#2B9E64]' : 'bg-[#EF233C]'
      }`}>
        {data.value}
      </span>
    </div>
  );

  const commonColumns = [
    { field: 'id', caption: '# ID', width: 80, alignment: 'center' },
    { field: 'officeName', caption: 'Office Name', alignment: 'center' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#f0f4f7] overflow-hidden font-sans">

      {/* ===== UPDATED TABS (Official Pill Theme) ===== */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4 mt-0 shrink-0 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-300 w-fit mx-auto">
        <button
          onClick={() => { setActiveTab('offices'); setShowAddForm(false); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            activeTab === 'offices'
              ? 'bg-[#00A3FF] text-white shadow-lg scale-105 z-10'
              : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
          }`}
        >
          <Briefcase size={15} strokeWidth={activeTab === 'offices' ? 3 : 2} />
          <span className="text-[11px] font-black uppercase tracking-wider">Office</span>
        </button>

        <button
          onClick={() => { setActiveTab('days'); setShowAddForm(false); }}
          className={`flex items-center gap-2 px-4 py-1 rounded-xl transition-all duration-300 ${
            activeTab === 'days'
              ? 'bg-[#00A3FF] text-white shadow-lg scale-105 z-10'
              : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
          }`}
        >
          <CalendarDays size={15} strokeWidth={activeTab === 'days' ? 3 : 2} />
          <span className="text-[11px] font-black uppercase tracking-wider">Office Days</span>
        </button>
      </div>

      {/* ===== ADD FORM RENDER AREA ===== */}
      {showAddForm && (
        <div className="px-6 shrink-0">
          {activeTab === 'offices' ? (
            <OfficeAddForm 
              onSave={handleSaveForm}
              onClose={() => setShowAddForm(false)}
              initialData={editingRecord}
            />
          ) : (
            <OfficeDayAdd 
              onSave={handleSaveForm}
              onClose={() => setShowAddForm(false)}
              initialData={editingRecord}
            />
          )}
        </div>
      )}

      {/* ===== GRID AREA ===== */}
      <div className="flex-1 min-h-0 w-full px-6 pb-6 overflow-hidden">
        {activeTab === 'offices' ? (
          <ManagementGrid
            title="Offices"
            data={activeData}   // ✅ FULL DATA (DevExtreme handles paging)
            columns={[
              ...commonColumns,
              { field: 'status', caption: 'Status', alignment: 'center', cellRender: statusRender },
              actionColumn
            ]}
            icon={Briefcase}
            onAddClick={handleAddClick} // ✅ Pass Add click handler
          />
        ) : (
          <ManagementGrid
            title="Office Days"
            data={activeData}   // ✅ FULL DATA
            columns={[
              ...commonColumns,
              { field: 'day', caption: 'Office Day', alignment: 'center' },
              actionColumn
            ]}
            icon={CalendarDays}
            onAddClick={handleAddClick} // ✅ Pass Add click handler
          />
        )}
      </div>

      {/* ===== GLOBAL POPUPS ===== */}
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

    </div>
  );
};

export default OfficePage;