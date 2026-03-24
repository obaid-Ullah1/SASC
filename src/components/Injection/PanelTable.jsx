import React, { useState, useMemo } from 'react';
import DataGrid, { Column, Scrolling } from 'devextreme-react/data-grid';
import { Pencil, Trash2, CircleDot, ChevronRight, List, Box } from 'lucide-react';

// Import Header and the dynamic Add Form
import TableHeader from '../TableHeader';
import AddPanelForm from './AddForms/AddPanelForm';

// Import Custom Popups
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

const PanelTable = () => {
  const [data, setData] = useState([
    { id: 1, category: 'ALLERGY', group: 'Group1', testType: '🧩 SPT-90', name: 'Extract Tree (T1)', code: 'T01', sortOrder: 1, description: 'Standard Tree Pollen', status: 'Active' },
    { id: 2, category: 'ALLERGY', group: 'Group1', testType: '🧩 SPT-90', name: 'Extract Tree (T2)', code: 'T02', sortOrder: 2, description: 'Secondary Tree Pollen', status: 'Active' },
    { id: 14, category: 'ALLERGY', group: 'Food Group', testType: '🧩 SPT-Food', name: 'Patch Food (F1)', code: 'F01', sortOrder: 1, description: 'Basic Food Profile', status: 'Active' },
    { id: 200, category: 'CHEMICAL', group: 'Metals', testType: 'Patch Test', name: 'Nickel Sulfate', code: 'C01', sortOrder: 1, description: 'Common Metal Sensitivity', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // --- POPUP STATES ---
  const [confirmPopup, setConfirmPopup] = useState({ isOpen: false, type: 'delete', actionData: null });
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, type: 'Deleted' });

  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.values(item).some(val => 
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  const handleAddNewClick = () => {
    setEditingData(null); 
    setShowAddForm(true);
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setShowAddForm(true);
  };

  // --- INTERCEPT FORM SUBMIT ---
  const initiateSubmit = (formData) => {
    setConfirmPopup({
      isOpen: true,
      type: 'update', // Uses blue theme
      actionData: formData // Temporarily store the data
    });
  };

  // --- INTERCEPT DELETE ---
  const initiateDelete = (id) => {
    setConfirmPopup({
      isOpen: true,
      type: 'delete', // Uses red theme
      actionData: id // Temporarily store the ID
    });
  };

  // --- EXECUTE ACTIONS UPON CONFIRMATION ---
  const handleConfirmAction = () => {
    if (confirmPopup.type === 'delete') {
      // Execute Delete
      setData(data.filter(item => item.id !== confirmPopup.actionData));
      setSuccessPopup({ isOpen: true, type: 'Deleted' });
    } 
    else if (confirmPopup.type === 'update') {
      // Execute Save/Update
      const formData = confirmPopup.actionData;
      if (editingData) {
        setData(prev => prev.map(item => 
          item.id === editingData.id 
            ? { 
                ...item, 
                category: formData.category.toUpperCase(),
                testType: formData.testType,
                name: formData.panelName,
                code: formData.panelCode,
                group: formData.group,
                sortOrder: formData.sortOrder,
                description: formData.description,
                status: formData.isActive ? 'Active' : 'Inactive'
              } 
            : item
        ));
        setSuccessPopup({ isOpen: true, type: 'Updated' });
      } else {
        const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
        const newEntry = {
          id: nextId,
          category: formData.category.toUpperCase(),
          group: formData.group || 'N/A',
          testType: formData.testType,
          name: formData.panelName,
          code: formData.panelCode,
          sortOrder: formData.sortOrder || 0,
          description: formData.description,
          status: formData.isActive ? 'Active' : 'Inactive'
        };
        setData(prev => [newEntry, ...prev]);
        setSuccessPopup({ isOpen: true, type: 'Added' });
      }
      setShowAddForm(false);
      setEditingData(null);
    }
    
    // Close the confirm popup
    setConfirmPopup({ isOpen: false, type: 'delete', actionData: null });
  };

  const categoryStructure = [
    { name: 'ALLERGY', types: ['🧩 SPT-90', '🧩 SPT-Food', '🧩 LIMITED/PEDS', '🧩 SPT-Food 1'] },
    { name: 'CHEMICAL', types: ['Patch Test'] }
  ];

  const renderGrid = (typeData) => (
    <DataGrid
      dataSource={typeData}
      showBorders={false}
      showRowLines={true}
      columnAutoWidth={true}
      rowAlternationEnabled={true}
      className="custom-panel-grid"
    >
      <Column dataField="id" width={50} alignment="center" headerCellRender={() => <div className="flex items-center justify-center gap-1 font-bold text-[10px]"><List size={12}/> ID</div>} />
      <Column dataField="name" alignment="left" headerCellRender={() => <div className="flex items-center gap-1 pl-2 font-bold text-[10px] uppercase"><List size={12}/> Name</div>} />
      <Column dataField="code" width={80} alignment="center" headerCellRender={() => <div className="flex items-center justify-center gap-1 font-bold text-[10px]">CODE</div>} />
      <Column dataField="group" width={100} alignment="left" headerCellRender={() => <div className="flex items-center gap-1 pl-2 font-bold text-[10px] uppercase">Group</div>} />
      <Column dataField="sortOrder" width={80} alignment="center" headerCellRender={() => <div className="flex items-center justify-center gap-1 font-bold text-[10px]">SORT</div>} />
      
      <Column 
        dataField="status" 
        width={110} 
        alignment="center"
        cellRender={(cellData) => (
          <div className="flex items-center justify-center">
            <div className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full border shadow-sm ${
              cellData.value === 'Active' ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-rose-500 text-white border-rose-600'
            }`}>
              <CircleDot size={8} className={cellData.value === 'Active' ? 'animate-pulse' : ''} />
              <span className="text-[9px] font-black uppercase tracking-tighter">{cellData.value}</span>
            </div>
          </div>
        )}
      />

      <Column 
        width={100} 
        alignment="center" 
        cellRender={(cellData) => (
          <div className="flex items-center justify-center gap-2">
            <button 
              onClick={() => handleEditClick(cellData.data)}
              className="w-7 h-7 rounded-full border border-[#00A3FF] text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm active:scale-90"
            >
              <Pencil size={13} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => initiateDelete(cellData.data.id)} // Changed to open popup
              className="w-7 h-7 rounded-full border border-rose-500 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm active:scale-90"
            >
              <Trash2 size={13} strokeWidth={2.5} />
            </button>
          </div>
        )}
      />
    </DataGrid>
  );

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl overflow-hidden border border-slate-200">
      
      {/* Global Popups */}
      <ConfirmPopup 
        isOpen={confirmPopup.isOpen}
        type={confirmPopup.type}
        itemName="Panel"
        onClose={() => setConfirmPopup({ ...confirmPopup, isOpen: false })}
        onConfirm={handleConfirmAction}
      />
      <SuccessPopup 
        isOpen={successPopup.isOpen}
        type={successPopup.type}
        onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
      />

      <TableHeader 
        title="Panel List"
        icon={Box} 
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAddNewClick} 
      />

      <div className="flex-1 overflow-y-auto">
        <AddPanelForm 
          key={editingData?.id || 'new'} 
          isOpen={showAddForm}
          editData={editingData}
          onAdd={initiateSubmit} // Changed to open popup
          onClose={() => { setShowAddForm(false); setEditingData(null); }} 
        />

        <div className="flex flex-col gap-8 p-6 pb-10 bg-slate-50/20">
          {categoryStructure.map((cat) => (
            <div key={cat.name} className="flex flex-col gap-4">
              <div className="bg-[#00A3FF] py-3 px-6 rounded-xl shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChevronRight className="text-white" size={20} strokeWidth={3} />
                  <h2 className="text-white font-black tracking-widest text-sm uppercase">{cat.name}</h2>
                </div>
              </div>

              <div className="flex flex-col gap-6 pl-4 border-l-2 border-slate-100 ml-4">
                {cat.types.map((type) => {
                  const typeData = filteredData.filter(d => d.testType === type);
                  return (
                    <div key={type} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
                      <div className="bg-[#FEF9C3] border-b border-slate-200 py-2.5 px-5 flex items-center gap-2">
                        <span className="text-base filter drop-shadow-sm">🧩</span>
                        <h3 className="text-slate-800 font-extrabold text-[12px] uppercase">{type}</h3>
                      </div>
                      <div className="p-1">
                        {typeData.length > 0 ? renderGrid(typeData) : (
                          <div className="py-8 text-center text-slate-400 text-xs italic">
                            No entries found for {type}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelTable;