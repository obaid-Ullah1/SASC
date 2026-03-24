import React from 'react';
import { TrendingUp } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const ExacerbationsGrid = () => {
  // Data mapped directly from your screenshot
  const exacerbationData = [
    { id: 1, name: '0', isDefault: true },
    { id: 2, name: '1', isDefault: false },
    { id: 3, name: '2–3', isDefault: false },
    { id: 4, name: '≥4 (in past 12 months)', isDefault: false },
  ];

  return (
    <SharedSimpleGrid 
      title="Exacerbations" 
      icon={TrendingUp} 
      entityName="Exacerbation" 
      initialData={exacerbationData} 
    />
  );
};

export default ExacerbationsGrid;