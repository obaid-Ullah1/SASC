import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our shared grid component

const KeyFindingGrid = () => {
  // 1. Initial Data specific to Key Findings
  const keyFindingsData = [
    { id: 1, name: 'Wheeze', isDefault: true },
    { id: 2, name: 'Rash', isDefault: false },
    { id: 3, name: 'Polyps', isDefault: false },
    { id: 4, name: 'Joint Swelling', isDefault: false },
    { id: 5, name: 'Other', isDefault: false },
  ];

  // 2. Pass the data to the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Key Finding List" 
      icon={ClipboardCheck} 
      entityName="Key Finding" 
      initialData={keyFindingsData} 
    />
  );
};

export default KeyFindingGrid;