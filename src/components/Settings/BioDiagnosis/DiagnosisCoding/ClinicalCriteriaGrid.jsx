import React from 'react';
import { ClipboardList } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our powerhouse component

const ClinicalCriteriaGrid = () => {
  // 1. Initial Data specific to this tab
  const criteriaData = [
    { id: 1, name: 'GINA (Asthma)', isDefault: true },
    { id: 2, name: 'EPOS (CRSwNP)', isDefault: false },
    { id: 3, name: 'Hanifin & Rajka (AD)', isDefault: false },
    { id: 4, name: 'ACR/EULAR (RA)', isDefault: false },
    { id: 5, name: 'Other', isDefault: false },
  ];

  // 2. Pass everything into the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Clinical Criteria List" 
      icon={ClipboardList} 
      entityName="Clinical Criteria" 
      initialData={criteriaData} 
    />
  );
};

export default ClinicalCriteriaGrid;