import React from 'react';
import { List } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Imports our new powerhouse component

const SeverityGrid = () => {
  // 1. Your exact initial data
  const severityData = [
    { id: 1, name: 'Mild', isDefault: true },
    { id: 2, name: 'Moderate', isDefault: false },
    { id: 3, name: 'Severe', isDefault: false },
    { id: 6, name: 'test', isDefault: false },
  ];

  // 2. Pass the data to the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Severity List" 
      icon={List} 
      entityName="Severity" 
      initialData={severityData} 
    />
  );
};

export default SeverityGrid;