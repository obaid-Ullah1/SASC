import React, { useState, useMemo } from 'react';
import { 
  Settings, Activity, Palette, PlayCircle, List, 
  RefreshCw, Workflow, Pencil, Trash2 
} from 'lucide-react';

// Import custom components
import ManagementGrid from '../../components/management/ManagementGrid';
import AddStatusForm from '../../components/management/AddForms/AddStatusForm';
import AddProcessForm from '../../components/management/AddForms/AddProcessForm';
import AddColorForm from '../../components/management/AddForms/AddColorForm';
import AddProcessStatusForm from '../../components/management/AddForms/AddProcessStatusForm';
import AddActionForm from '../../components/management/AddForms/AddActionForm';
import AddActionProcessForm from '../../components/management/AddForms/AddActionProcessForm';

// Import Global Popups
import ConfirmPopup from '../../components/global/ConfirmPopup';
import SuccessPopup from '../../components/global/SuccessPopup';

const StatusPage = ({ activeColor = "bg-[#1D68F1]" }) => {
  const [activeSubTab, setActiveSubTab] = useState('Status');
  const [showAddForm, setShowAddForm] = useState(false);

  // --- CRUD & POPUP STATE ---
  const [editingRecord, setEditingRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // --- 1. STATE MANAGEMENT FOR DATA ---
  const [statusRecords, setStatusRecords] = useState([
    { id: 1, name: 'Scheduled' }, { id: 2, name: 'Missed' },
    { id: 1002, name: 'Dis Continue' }, { id: 1003, name: 'Stop' },
    { id: 1004, name: 'Patient Left' }, { id: 1005, name: 'Maintenance' },
    { id: 2005, name: 'Inactive' }, { id: 2006, name: 'Eligiblity' },
    { id: 2007, name: 'Re-Schedule' },
  ]);

  const [processRecords, setProcessRecords] = useState([
    { id: 1, process: 'Injection Container', code: 'INJ', color: '#2BFA06' },
    { id: 2, process: 'Inventory', code: 'INV', color: '#FF0000' }
  ]);

  const [colorRecords, setColorRecords] = useState([
    { id: 1, name: 'Red', code: '#FF0000', font: '#FFFFFF' },
    { id: 2, name: 'Green', code: '#2BFA06', font: '#000000' },
    { id: 3, name: 'Blue', code: '#0725cb', font: '#FFFFFF' },
    { id: 4, name: 'White', code: '#FFFFFF', font: '#000000' },
  ]);

  const [processStatusRecords, setProcessStatusRecords] = useState([
    { id: 1, process: 'Injection Container', statusName: 'Scheduled', color: '#2BFA06', isActive: true },
  ]);

  const [actionRecords, setActionRecords] = useState([
    { id: 1, name: 'Email Notification' },
    { id: 2, name: 'SMS Alert' },
  ]);

  const [actionProcessRecords, setActionProcessRecords] = useState([
    { id: 1, process: 'Injection Container', action: 'Email Notification', description: 'Notify on container update' },
  ]);

  // --- 2. HANDLERS ---
  const handleSaveStatus = (name) => {
    if (editingRecord) {
      setStatusRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, name } : r));
      setSuccessMsg("Status updated successfully!");
    } else {
      const newId = statusRecords.length > 0 ? Math.max(...statusRecords.map(r => r.id)) + 1 : 1;
      setStatusRecords([{ id: newId, name }, ...statusRecords]);
      setSuccessMsg("New status added successfully!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleSaveProcess = (formData) => {
    if (editingRecord) {
      setProcessRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...formData } : r));
      setSuccessMsg("Process updated successfully!");
    } else {
      const newId = processRecords.length > 0 ? Math.max(...processRecords.map(r => r.id)) + 1 : 1;
      setProcessRecords([{ id: newId, ...formData }, ...processRecords]);
      setSuccessMsg("New process added successfully!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleSaveColor = (formData) => {
    if (editingRecord) {
      setColorRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...formData } : r));
      setSuccessMsg("Color updated successfully!");
    } else {
      const newId = colorRecords.length > 0 ? Math.max(...colorRecords.map(r => r.id)) + 1 : 1;
      setColorRecords([{ id: newId, ...formData }, ...colorRecords]);
      setSuccessMsg("New color added successfully!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleSaveProcessStatus = (formData) => {
    if (editingRecord) {
      setProcessStatusRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...formData } : r));
      setSuccessMsg("Process Status updated successfully!");
    } else {
      const newId = processStatusRecords.length > 0 ? Math.max(...processStatusRecords.map(r => r.id)) + 1 : 1;
      setProcessStatusRecords([{ id: newId, ...formData }, ...processStatusRecords]);
      setSuccessMsg("New Process Status added successfully!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleSaveAction = (name) => {
    if (editingRecord) {
      setActionRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, name } : r));
      setSuccessMsg("Action updated successfully!");
    } else {
      const newId = actionRecords.length > 0 ? Math.max(...actionRecords.map(r => r.id)) + 1 : 1;
      setActionRecords([{ id: newId, name }, ...actionRecords]);
      setSuccessMsg("New Action added successfully!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleSaveActionProcess = (formData) => {
    const description = `Mapping: ${formData.process} -> ${formData.action}`;
    if (editingRecord) {
      setActionProcessRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...formData, description } : r));
      setSuccessMsg("Action-Process mapping updated!");
    } else {
      const newId = actionProcessRecords.length > 0 ? Math.max(...actionProcessRecords.map(r => r.id)) + 1 : 1;
      setActionProcessRecords([{ id: newId, ...formData, description }, ...actionProcessRecords]);
      setSuccessMsg("New Action-Process mapping created!");
    }
    closeForm();
    setShowSuccess(true);
  };

  const handleDeleteConfirm = () => {
    const filterFn = (r) => r.id !== recordToDelete.id;
    if (activeSubTab === 'Status') setStatusRecords(prev => prev.filter(filterFn));
    else if (activeSubTab === 'Process') setProcessRecords(prev => prev.filter(filterFn));
    else if (activeSubTab === 'Color') setColorRecords(prev => prev.filter(filterFn));
    else if (activeSubTab === 'Process-Status') setProcessStatusRecords(prev => prev.filter(filterFn));
    else if (activeSubTab === 'Action') setActionRecords(prev => prev.filter(filterFn));
    else if (activeSubTab === 'Action-Process') setActionProcessRecords(prev => prev.filter(filterFn));
    
    setShowConfirm(false);
    setRecordToDelete(null);
    setSuccessMsg("Record deleted successfully!");
    setShowSuccess(true);
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingRecord(null);
  };

  // --- 3. MEMOIZED CONFIGURATION ---
  const tabConfigs = useMemo(() => {
    const actionColumn = {
      caption: 'Actions',
      width: 110,
      fixed: true,
      fixedPosition: 'right',
      alignment: 'center',
      cellRender: (row) => (
        <div className="flex justify-center gap-2">
          <button 
            onClick={() => { setEditingRecord(row.data); setShowAddForm(true); }}
            className="p-1.5 rounded-md text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100"
            title="Edit Record"
          >
            <Pencil size={14} strokeWidth={2.5} />
          </button>
          <button 
            onClick={() => { setRecordToDelete(row.data); setShowConfirm(true); }}
            className="p-1.5 rounded-md text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all shadow-sm border border-red-100"
            title="Delete Record"
          >
            <Trash2 size={14} strokeWidth={2.5} />
          </button>
        </div>
      )
    };

    return {
      Status: {
        title: 'Status Records',
        icon: Activity,
        columns: [{ field: 'id', caption: '# ID', width: 80 }, { field: 'name', caption: 'Status Name' }, actionColumn],
        data: statusRecords,
      },
      Process: {
        title: 'Process List',
        icon: List,
        columns: [
          { field: 'id', caption: '# ID', width: 80 }, { field: 'process', caption: 'Process' }, { field: 'code', caption: 'Code' },
          {
            field: 'color', caption: 'Color', alignment: 'center',
            cellRender: (data) => (
              <div className="flex justify-center">
                <span className="px-4 py-0.5 rounded-full text-white text-[10px] font-bold shadow-sm" style={{ backgroundColor: data.value }}>{data.value}</span>
              </div>
            )
          },
          actionColumn
        ],
        data: processRecords,
      },
      Color: {
        title: 'Color List',
        icon: Palette,
        columns: [
          { field: 'id', caption: '# ID', width: 80 }, { field: 'name', caption: 'Color Name' },
          {
            field: 'code', caption: 'Color Code', alignment: 'center',
            cellRender: (data) => (
              <div className="flex justify-center">
                <span className="px-6 py-0.5 rounded-md text-[11px] font-bold shadow-sm border border-black/5" style={{ backgroundColor: data.value, color: data.data.font }}>{data.value}</span>
              </div>
            )
          },
          { field: 'font', caption: 'Font Code', alignment: 'center' },
          actionColumn
        ],
        data: colorRecords,
      },
      'Process-Status': {
        title: 'Process Status List',
        icon: RefreshCw,
        columns: [
          { field: 'id', caption: '# ID', width: 70 }, { field: 'process', caption: 'Process' }, { field: 'statusName', caption: 'Status' },
          {
            field: 'color', caption: 'Color', alignment: 'center',
            cellRender: (data) => (
              <div className="flex justify-center">
                <span className="px-5 py-0.5 rounded-full text-[10px] font-bold text-slate-800 shadow-sm" style={{ backgroundColor: data.value }}>{data.value}</span>
              </div>
            )
          },
          { field: 'isActive', caption: 'Active', alignment: 'center', cellRender: (data) => <input type="checkbox" checked={data.value} readOnly className="w-3.5 h-3.5 accent-blue-600 cursor-pointer" /> },
          actionColumn
        ],
        data: processStatusRecords,
      },
      Action: { 
        title: 'Action List', icon: PlayCircle, 
        columns: [{ field: 'id', caption: '# ID', width: 80 }, { field: 'name', caption: 'Action Name' }, actionColumn], 
        data: actionRecords, 
      },
      'Action-Process': { 
        title: 'Action-Process', icon: Workflow, 
        columns: [{ field: 'id', caption: '# ID', width: 80 }, { field: 'description', caption: 'Description' }, actionColumn], 
        data: actionProcessRecords 
      }
    };
  }, [statusRecords, processRecords, colorRecords, processStatusRecords, actionRecords, actionProcessRecords]); 

  const current = tabConfigs[activeSubTab];

  return (
    <div className={`w-full flex flex-col bg-[#f0f4f7] font-sans transition-all duration-300 ${showAddForm ? "h-auto min-h-screen overflow-y-auto" : "h-full overflow-hidden"}`}>
      
      <div className="flex flex-col items-center py-4 shrink-0 px-4">
        <div className="flex items-center gap-2.5 text-[#1D68F1]">
          <Settings size={24} strokeWidth={3} />
          <h1 className="text-[20px] sm:text-[24px] font-black tracking-tight uppercase text-slate-800">General Management</h1>
        </div>
      </div>

      <div className="w-full px-6 mb-6 shrink-0">
        <div className="flex flex-wrap justify-center gap-3">
          {Object.keys(tabConfigs).map((tabKey) => {
            const TabIcon = tabConfigs[tabKey].icon;
            const isActive = activeSubTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => { setActiveSubTab(tabKey); closeForm(); }}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 border shadow-sm ${isActive ? 'bg-[#1D68F1] text-white border-[#1D68F1] scale-105 z-10' : 'bg-white text-slate-500 border-gray-100 hover:bg-slate-50'} min-w-[140px] max-w-fit`}
              >
                <TabIcon size={16} strokeWidth={isActive ? 3 : 2} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{tabKey}</span>
              </button>
            );
          })}
        </div>
      </div>

      {showAddForm && (
        <div className="px-6 mb-6 shrink-0 animate-in fade-in slide-in-from-top-4 duration-300">
           {activeSubTab === 'Status' && <AddStatusForm onCancel={closeForm} onSave={handleSaveStatus} initialData={editingRecord} />}
           {activeSubTab === 'Process' && <AddProcessForm onCancel={closeForm} onSave={handleSaveProcess} initialData={editingRecord} />}
           {activeSubTab === 'Color' && <AddColorForm onCancel={closeForm} onSave={handleSaveColor} initialData={editingRecord} />}
           {activeSubTab === 'Process-Status' && <AddProcessStatusForm onCancel={closeForm} onSave={handleSaveProcessStatus} initialData={editingRecord} />}
           {activeSubTab === 'Action' && <AddActionForm onCancel={closeForm} onSave={handleSaveAction} initialData={editingRecord} />}
           {activeSubTab === 'Action-Process' && <AddActionProcessForm onCancel={closeForm} onSave={handleSaveActionProcess} initialData={editingRecord} />}
        </div>
      )}

      <div className={`${showAddForm ? "w-full px-6 pb-6 h-[450px]" : "flex-1 min-h-0 w-full px-6 pb-6 overflow-hidden"}`}>
        <ManagementGrid
          title={current.title}
          data={current.data}
          columns={current.columns}
          icon={current.icon}
          onAddClick={() => { setEditingRecord(null); setShowAddForm(true); }}
        />
      </div>

      <ConfirmPopup 
        isOpen={showConfirm} onClose={() => setShowConfirm(false)} onConfirm={handleDeleteConfirm}
        title={`Delete Record`}
        message={`Are you sure you want to delete this record? This action cannot be undone.`}
      />
      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} message={successMsg} />
    </div>
  );
};

export default StatusPage;