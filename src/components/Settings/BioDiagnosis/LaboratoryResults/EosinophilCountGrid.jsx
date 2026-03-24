import React from 'react';
import { Bug } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our shared grid component

const EosinophilCountGrid = () => {
  // 1. Initial Data specific to Eosinophil counts
  const eosinophilData = [
    { id: 10, name: '<500/μL', isDefault: true },
    { id: 11, name: '500–1500/μL', isDefault: false },
    { id: 12, name: '>1500/μL', isDefault: false },
  ];

  // 2. Pass the data to the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Eosinophil" 
      icon={Bug} 
      entityName="Eosinophil" 
      initialData={eosinophilData} 
    />
  );
};

export default EosinophilCountGrid;