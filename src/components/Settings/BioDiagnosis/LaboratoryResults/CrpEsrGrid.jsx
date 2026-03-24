import React from 'react';
import { TestTubes } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our shared grid component

const CrpEsrGrid = () => {
  // 1. Initial Data specific to CRP / ESR
  const crpEsrData = [
    { id: 1, name: 'CRP <5', isDefault: true },
    { id: 2, name: 'CRP ≥5', isDefault: false },
    { id: 3, name: 'ESR Normal', isDefault: false },
    { id: 4, name: 'ESR High', isDefault: false },
  ];

  // 2. Pass the data to the Shared Grid
  return (
    <SharedSimpleGrid 
      title="CRP / ESR" 
      icon={TestTubes} 
      entityName="CRP / ESR" 
      initialData={crpEsrData} 
    />
  );
};

export default CrpEsrGrid;