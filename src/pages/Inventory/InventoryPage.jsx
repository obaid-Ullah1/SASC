// src/pages/InventoryPage.jsx

import React, { useState } from "react";
import InventoryHeader from "../../components/TableHeader";
import InventoryGrid from "../../components/inventory/InventoryGrid";
import InventoryAddForm from "../../components/inventory/AddForms/InventoryAddForm"; 
import CheckedInForm from "../../components/inventory/AddForms/CheckedInForm"; // The QA check form
import ConfirmPopup from "../../components/global/ConfirmPopup";
import SuccessPopup from "../../components/global/SuccessPopup";
import ReferenceLog from "../../components/inventory/AddForms/RefrenceLog";

const generateInventoryData = () => {
  const data = [];
  for (let i = 1; i <= 35; i++) {
    // Generate dates to test the runtime status logic
    const testDate = new Date();
    if (i % 3 === 0) testDate.setDate(testDate.getDate() - 10); // Expired
    else if (i % 2 === 0) testDate.setDate(testDate.getDate() + 15); // Expiring Soon
    else testDate.setDate(testDate.getDate() + 100); // Active

    data.push({
      id: i,
      inv: "Allergen",
      name: "HISTATROL POS ID 0.1MG/ML",
      description: "ACACIA 50 ML 1:40 W/V 50% GLY",
      purchaseOrder: "PO-" + i,
      purchaseDate: new Date(),
      doM: new Date(),
      doE: testDate, // Testing expiry logic
      lotNo: "LOT-" + i,
      batchNo: "BATCH-" + i,
      code: "CID",
      qty: 50,
      volume: "50 mL",
      stock: 50,
      available: 36.35,
      totalUsed: 10,
      reorderLevel: 5,
      minStock: 2,
      cost: 164.15,
      spu: 3.28,
      checkedOn: null, 
      status: "In Stock",
      supplier: "STALLERGENES GREER",
    });
  }
  return data;
};

const InventoryPage = () => {
  const [inventory, setInventory] = useState(generateInventoryData());
  
  // --- FORM STATES ---
  const [isAddFormOpen, setIsAddFormOpen] = useState(false); 
  const [isCheckFormOpen, setIsCheckFormOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [checkRowData, setCheckRowData] = useState(null);

  // --- REFERENCE LOG STATES ---
  const [isRefLogOpen, setIsRefLogOpen] = useState(false);
  const [selectedItemForLog, setSelectedItemForLog] = useState(null);

  // --- POPUP STATES ---
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // --- HANDLERS ---
  const handleOpenAdd = () => {
    setEditingData(null);
    setIsAddFormOpen(!isAddFormOpen);
  };

  const handleEditClick = (rowData) => {
    setEditingData(rowData);
    setIsAddFormOpen(true);
  };

  const handleCheckUpdateClick = (rowData) => {
    setCheckRowData(rowData);
    setIsCheckFormOpen(true);
  };

  const handleDeleteClick = (rowData) => {
    setItemToDelete(rowData);
    setShowDeleteConfirm(true);
  };

  // Triggered when double-clicking the name in the grid
  const handleNameDoubleClick = (rowData) => {
    // We package the specific data needed for the Reference Log
    // Formatting the 'doE' to a string standard for the log component
    const logData = [
      {
        id: rowData.id,
        refNo: rowData.purchaseOrder || '-',
        saRef: `SAI-${rowData.id.toString().padStart(3, '0')}`,
        createdOn: new Date(rowData.purchaseDate).toLocaleDateString(),
        expiryDate: new Date(rowData.doE).toLocaleDateString(), 
      }
    ];

    setSelectedItemForLog(logData);
    setIsRefLogOpen(true);
  };

  const handleConfirmDelete = () => {
    setInventory((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    setSuccessMessage("Inventory item deleted successfully!");
    setShowSuccess(true);
  };

  const handleSaveInventory = (formData) => {
    const mappedItem = {
      ...formData,
      inv: formData.category === 1 ? "Allergen" : formData.category === 2 ? "Chemical" : "Biological", 
      name: formData.code || "New Item", 
      description: formData.containerType || "Manual Entry",
      purchaseOrder: formData.purchaseOrder,
      purchaseDate: formData.purDate || new Date(),
      doM: formData.dom || new Date(),
      doE: formData.doe || new Date(),
      lotNo: formData.lotNo,
      batchNo: formData.serialNo || "N/A",
      code: formData.code,
      qty: formData.capacity || 0,
      volume: formData.volume ? `${formData.volume} mL` : "0 mL",
      stock: formData.capacity || 0,
      available: formData.capacity || 0, 
      reorderLevel: formData.reorderLevel || 0,
      minStock: formData.minStock || 0,
      cost: formData.totalCost || 0,
      status: formData.status === 2 ? "Low Stock" : formData.status === 3 ? "Out of Stock" : "In Stock",
    };

    if (editingData) {
      setInventory((prev) => prev.map((item) => (item.id === formData.id ? { ...item, ...mappedItem } : item)));
      setSuccessMessage("Inventory updated successfully!");
    } else {
      const newItem = {
        ...mappedItem,
        id: inventory.length > 0 ? Math.max(...inventory.map(d => d.id)) + 1 : 1,
        totalUsed: 0,
        spu: 0,
        supplier: "In-House",
        checkedOn: null 
      };
      setInventory([newItem, ...inventory]);
      setSuccessMessage("New inventory item added!");
    }
    
    setIsAddFormOpen(false);
    setEditingData(null);
    setShowSuccess(true);
  };

  const handleSaveCheckDetails = (checkData) => {
    setIsCheckFormOpen(false);
    setSuccessMessage("Check details updated successfully!");
    setShowSuccess(true);
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] flex flex-col overflow-hidden font-sans">
      
      <div className="flex-1 flex flex-col min-h-0 px-0 pt-0 pb-27 gap-2">
        
        {/* ADD/EDIT FORM */}
        {isAddFormOpen && (
          <div className="shrink-0 overflow-y-auto max-h-[45vh] custom-scrollbar pr-2 mb-2">
            <InventoryAddForm 
              isOpen={isAddFormOpen} 
              onClose={() => { setIsAddFormOpen(false); setEditingData(null); }} 
              onSave={handleSaveInventory} 
              editData={editingData}
            />
          </div>
        )}

        {/* MAIN GRID CARD */}
        <div className="flex-1 flex flex-col min-h-0 w-full bg-white rounded-sm shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 overflow-hidden">
          
          <div className="shrink-0">
            <InventoryHeader
              title="Inventory List"
              onAddClick={handleOpenAdd}
              onRefresh={() => window.location.reload()}
            />
          </div>

          <div className="flex-1 min-h-0 overflow-hidden bg-white">
            <InventoryGrid 
              data={inventory} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onCheckUpdate={handleCheckUpdateClick} 
              onNameDoubleClick={handleNameDoubleClick} // Passed new handler
            />
          </div>
          
        </div>
      </div>

      {/* POPUP: CHECKED IN FORM (Double Click) */}
      <CheckedInForm 
        isOpen={isCheckFormOpen}
        onClose={() => setIsCheckFormOpen(false)}
        onSave={handleSaveCheckDetails}
        rowData={checkRowData}
      />

      {/* POPUP: REFERENCE LOG FORM (Double Click on Name) */}
      <ReferenceLog 
        isOpen={isRefLogOpen}
        onClose={() => setIsRefLogOpen(false)}
        logs={selectedItemForLog} // Passes the mapped data with the DOE included
      />

      {/* GLOBAL POPUPS */}
      <ConfirmPopup 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Inventory Item"
        message={`Are you sure you want to delete this inventory item?`}
      />

      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} message={successMessage} />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default InventoryPage;