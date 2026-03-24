import React from 'react';
import { Activity } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; 

const PftSeverityGrid = () => {
  // 1. Define the specific data for this screen
  const pftData = [
    { id: 1, name: 'Normal', isDefault: true },
    { id: 2, name: 'Mild', isDefault: false },
    { id: 3, name: 'Moderate', isDefault: false },
    { id: 4, name: 'Severe', isDefault: false },
  ];

  // 2. Call the Shared Grid and pass the data! (The form is already inside it)
  return (
    <SharedSimpleGrid 
      title="PFT Severity List" 
      icon={Activity} 
      entityName="PFT Severity" 
      initialData={pftData} 
    />
  );
};

export default PftSeverityGrid;