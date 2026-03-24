import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Box } from "lucide-react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Sorting,
  Grouping,
  Scrolling,
} from "devextreme-react/data-grid";

// Import Header and Custom Components
import TableHeader from '../TableHeader';
import AddPatchForm from './AddForms/AddPatchForm';
import ConfirmPopup from '../global/ConfirmPopup';
import SuccessPopup from '../global/SuccessPopup';

// Helper to generate initial data only once
const generateInitialData = () => {
  const groupTitles = [
    "Extract Weed (W1)", "LIMITED (L1)", "Patch Food (F1)", "FOOD EXTRACT (F1)",
    "Extract Grass (G1)", "Extract Mold (M1)", "PEDIATRIC (P1)", "LIMITED (L6)",
    "Extract Epithelia (E1)", "Extract Food (F01)", "COSMETIC/HYGIENE/SKIN CARE (P02)",
    "Extract Tree (T2)", "Extract Weed (W2)", "LIMITED (L2)", "Patch Food (F2)",
    "FOOD EXTRACT (F2)", "PEDIATRIC (P2)", "COSMETIC/HYGIENE/SKIN CARE (P03)",
    "Extract Tree (T3)", "LIMITED (L3)", "Patch Food (F3)", "FOOD EXTRACT (F3)",
    "FRAGNANCE (P04)", "LIMITED (L4)", "Patch Food (F4)", "FOOD EXTRACT (F4)",
    "INDUSTRIAL/MISCELLANEOUS (P05)", "LIMITED (L5)", "Patch Food (F5)", "FOOD EXTRACT (F5)",
    "INDUSTRIAL/MISCELLANEOUS (P06)", "Patch Food (F6)", "FOOD EXTRACT (F6)",
    "MEDICINAL (P07)", "Patch Food (F7)", "FOOD EXTRACT (F7)", "METAL (P08)",
    "Patch Food (F8)", "FOOD EXTRACT (F8)", "Patch Food (F9)"
  ];

  let idCounter = 1;

  return groupTitles.flatMap((group) =>
    Array.from({ length: 5 }).map((_, index) => ({
      id: idCounter++,
      ingredient: `Sample Ingredient ${index + 1}`,
      label: `L${index + 1}`,
      sortOrder: index + 1,
      groupTitle: group,
    }))
  );
};

const PatchTable = () => {
  // 1. Core States
  const [data, setData] = useState(generateInitialData);
  const [searchTerm, setSearchTerm] = useState("");
  
  // 2. Form States
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  // 3. Popup States
  const [confirmPopup, setConfirmPopup] = useState({ isOpen: false, type: 'delete', actionData: null });
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, type: 'Deleted' });

  // 4. Filtering Logic
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(val => 
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  // --- UI TRIGGERS ---

  const handleAddNewClick = () => {
    setEditingData(null);
    setShowAddForm(true);
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setShowAddForm(true);
  };

  const initiateSubmit = (formData) => {
    setConfirmPopup({
      isOpen: true,
      type: 'update', // Uses the blue confirmation theme
      actionData: formData
    });
  };

  const initiateDelete = (id) => {
    setConfirmPopup({
      isOpen: true,
      type: 'delete', // Uses the red confirmation theme
      actionData: id
    });
  };

  // --- ACTION EXECUTION ---

  const handleConfirmAction = () => {
    if (confirmPopup.type === 'delete') {
      // Execute Delete
      setData(prev => prev.filter(item => item.id !== confirmPopup.actionData));
      setSuccessPopup({ isOpen: true, type: 'Deleted' });
    } 
    else if (confirmPopup.type === 'update') {
      // Execute Add or Update
      const formData = confirmPopup.actionData;
      
      if (editingData) {
        // Update Existing
        setData(prev => prev.map(item => 
          item.id === editingData.id 
            ? { ...item, ...formData } 
            : item
        ));
        setSuccessPopup({ isOpen: true, type: 'Updated' });
      } else {
        // Add New
        const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
        const newEntry = { id: nextId, ...formData };
        setData(prev => [newEntry, ...prev]);
        setSuccessPopup({ isOpen: true, type: 'Added' });
      }
      
      setShowAddForm(false);
      setEditingData(null);
    }
    
    // Close the confirmation dialog
    setConfirmPopup({ isOpen: false, type: 'delete', actionData: null });
  };

  return (
    <div className="flex flex-col h-full w-full">
      
      {/* Global Popups */}
      <ConfirmPopup 
        isOpen={confirmPopup.isOpen}
        type={confirmPopup.type}
        itemName="Patch"
        onClose={() => setConfirmPopup({ ...confirmPopup, isOpen: false })}
        onConfirm={handleConfirmAction}
      />
      <SuccessPopup 
        isOpen={successPopup.isOpen}
        type={successPopup.type}
        onClose={() => setSuccessPopup({ ...successPopup, isOpen: false })}
      />

      {/* Header */}
      <TableHeader 
        title="Patch List"
        icon={Box} 
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAddNewClick} 
      />

      <div className="flex-1 p-6 bg-slate-50/30 overflow-hidden flex flex-col">
        
        {/* Dynamic Add/Edit Form */}
        <AddPatchForm 
          key={editingData?.id || 'new'}
          isOpen={showAddForm}
          editData={editingData}
          onAdd={initiateSubmit}
          onClose={() => { setShowAddForm(false); setEditingData(null); }}
        />

        <div className="h-full w-full flex flex-col bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden [&_.dx-data-row>td]:!py-0.5 [&_.dx-data-row>td]:!align-middle min-h-[400px]">
          
          <DataGrid
            dataSource={filteredData}
            keyExpr="id"
            showBorders={false}
            columnAutoWidth={true}
            rowAlternationEnabled={true}
            height="100%" 
            width="100%"
          >
            <Scrolling mode="standard" showScrollbar="always" />

            <Grouping autoExpandAll={false} expandMode="rowClick" />
            <Sorting mode="multiple" />

            <Paging defaultPageSize={50} />
            <Pager
              visible={true}
              showPageSizeSelector={true}
              allowedPageSizes={[50, 100, 500, 1000]}
              showInfo={true}
              showNavigationButtons={true}
            />

            <Column
              dataField="groupTitle"
              groupIndex={0}
              visible={false}
              groupCellRender={(cell) => {
                const count =
                  cell?.data?.collapsedItems?.length ||
                  cell?.data?.items?.length ||
                  0;

                return (
                  <div className="w-full">
                    <div className="rounded-xl bg-[#E6F6FF] border border-[#B3E5FF] px-5 py-1 shadow-sm flex justify-between items-center cursor-pointer hover:bg-[#D9F2FF] transition-all duration-200">
                      <div className="text-[black] text-[13px] font-black uppercase tracking-wider">
                        {cell.value}
                      </div>
                      <div className="bg-[#00A3FF] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                        {count} Items
                      </div>
                    </div>
                  </div>
                );
              }}
            />

            <Column dataField="id" caption="ID" width={70} />
            
            <Column
              dataField="ingredient"
              caption="Ingredient"
              cellRender={(cell) => (
                <span className="text-slate-700 text-[13px] font-semibold">
                  {cell.text}
                </span>
              )}
            />

            <Column dataField="label" caption="Label" width={90} />
            <Column dataField="sortOrder" caption="Sort Order" width={110} alignment="center" />

            <Column
              caption="Actions"
              width={130}
              alignment="center"
              cellRender={(cellData) => (
                <div className="flex gap-2 justify-center">
                  <button 
                    onClick={() => handleEditClick(cellData.data)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                  >
                    <Edit2 size={14} strokeWidth={2.5} />
                  </button>
                  <button 
                    onClick={() => initiateDelete(cellData.data.id)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm"
                  >
                    <Trash2 size={14} strokeWidth={2.5} />
                  </button>
                </div>
              )}
            />
          </DataGrid>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PatchTable);