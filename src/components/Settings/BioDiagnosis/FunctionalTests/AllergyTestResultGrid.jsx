import React from 'react';
import { Activity } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // <-- FIXED: Only one set of dots!

const AllergyTestResultGrid = () => {
  const allergyData = [
    { id: 1, name: 'Negative', isDefault: true },
    { id: 2, name: 'Positive', isDefault: false },
    { id: 3, name: 'Equivocal', isDefault: false },
  ];

  return (
    <SharedSimpleGrid 
      title="Allergy Test Result" 
      icon={Activity} 
      entityName="Allergy Result" 
      initialData={allergyData} 
    />
  );
};

export default AllergyTestResultGrid;