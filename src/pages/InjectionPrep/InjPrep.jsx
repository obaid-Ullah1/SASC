import React, { useState, useEffect } from 'react';
import PreparationGrid from '../../components/Injection/PreparationGrid';

const InjPrep = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const mockData = [];
    for (let i = 1; i <= 328; i++) {
      mockData.push({
        id: i,
        type: "Recipe Based",
        name: `TREE MIX ${i}-11/25-01`,
        code: `SA-TREE MIX ${i}-01`,
        qty: "100 mL",
        stock: i % 3 === 0 ? "-33.1" : "87.31",
        used: i % 3 === 0 ? "133.1" : "12.7",
        lot: "TR 100-01",
        batch: "01"
      });
    }
    setDataSource(mockData);
  }, []);

  const handleAddClick = () => {
    console.log("Opening Preparation Form...");
  };

  // ✅ NEW: Handles the data coming up from the form
  const handleSaveNewPrep = (formData) => {
    const newRecord = {
      id: dataSource.length > 0 ? Math.max(...dataSource.map(d => d.id)) + 1 : 1, 
      type: formData.type || "Manual Entry",
      name: formData.injection || "New Custom Mix",
      code: `SA-NEW-${Math.floor(Math.random() * 1000)}`,
      qty: `${formData.quantity || 0} ${formData.measurementType || 'mL'}`,
      stock: "0.00",
      used: "0.00",
      lot: "PENDING",
      batch: "01",
      status: formData.status || "Pending",
      notes: formData.notes || "",
      instructions: formData.instructions || ""
    };

    // Add the new record to the TOP of the grid
    setDataSource(prevData => [newRecord, ...prevData]);
  };

  return (
    <div className="flex flex-col h-full min-h-screen w-full bg-[#F1F5F9] overflow-hidden">
      
      {/* Main Content Area - Grid now contains its own header */}
      <div className="flex-1 min-h-0 overflow-hidden p-0">
        <div className="h-full bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden">
          <PreparationGrid 
            dataSource={dataSource} 
            onAddClick={handleAddClick}
            onSaveNew={handleSaveNewPrep} // ✅ Pass the function down to the grid
          />
        </div>
      </div>

    </div>
  );
};

export default InjPrep;