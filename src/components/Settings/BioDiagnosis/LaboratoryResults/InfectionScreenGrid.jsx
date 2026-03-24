import React from 'react';
import { Biohazard } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our shared powerhouse component

const InfectionScreenGrid = () => {
  // 1. Initial Data for Infection Screen
  const infectionData = [
    { id: 13, name: 'TB Negative', isDefault: true },
    { id: 14, name: 'TB Positive', isDefault: false },
    { id: 15, name: 'HBV Negative', isDefault: false },
    { id: 16, name: 'HBV Positive', isDefault: false },
    { id: 17, name: 'HCV Negative', isDefault: false },
    { id: 18, name: 'HCV Positive', isDefault: false },
    { id: 19, name: 'HIV Negative', isDefault: false },
    { id: 20, name: 'HIV Positive', isDefault: false },
  ];

  // 2. Pass everything into the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Infection Screen" 
      icon={Biohazard} 
      entityName="Infection Screen" 
      initialData={infectionData} 
    />
  );
};

export default InfectionScreenGrid;