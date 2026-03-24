import React from 'react';
import { Syringe } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid'; // Our shared grid component

const ImmunoglobulinsGrid = () => {
  // 1. Initial Data specific to Immunoglobulins
  const immunoglobulinsData = [
    { id: 6, name: 'IgE', isDefault: true },
    { id: 7, name: 'IgG', isDefault: false },
    { id: 8, name: 'IgM', isDefault: false },
    { id: 9, name: 'IgA', isDefault: false },
  ];

  // 2. Pass the data to the Shared Grid
  return (
    <SharedSimpleGrid 
      title="Immunoglobulins" 
      icon={Syringe} 
      entityName="Immunoglobulin" 
      initialData={immunoglobulinsData} 
    />
  );
};

export default ImmunoglobulinsGrid;