import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our shared grid component

const ResultGrid = () => {
  // 1. Initial Data specific to Result List
  const resultData = [
    { id: 1, name: 'Not Done', isDefault: true },
    { id: 2, name: 'Normal', isDefault: false },
    { id: 3, name: 'Abnormal', isDefault: false },
    { id: 4, name: 'Positive', isDefault: false },
    { id: 5, name: 'Negative', isDefault: false },
    { id: 6, name: 'Pending', isDefault: false },
    { id: 7, name: 'Indeterminate', isDefault: false },
    { id: 9, name: 'Done', isDefault: false },
    { id: 10, name: 'Not Ordered', isDefault: false },
    { id: 11, name: 'test', isDefault: false },
  ];

  // 2. Pass the data to the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Result List" 
      icon={CheckCircle2} 
      entityName="Result" 
      initialData={resultData} 
    />
  );
};

export default ResultGrid;