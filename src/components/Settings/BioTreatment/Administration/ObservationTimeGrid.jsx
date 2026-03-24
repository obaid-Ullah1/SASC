import React from 'react';
import { Clock } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const ObservationTimeGrid = () => {
  const data = [
    { id: 1, name: '15 Minutes', isDefault: false },
    { id: 2, name: '30 Minutes', isDefault: true },
    { id: 3, name: '60 Minutes', isDefault: false },
    { id: 4, name: '120 Minutes', isDefault: false },
  ];

  return (
    <SharedSimpleGrid 
      title="Observation Time List" 
      icon={Clock} 
      entityName="Observation Time" 
      initialData={data} 
    />
  );
};

// ❌ YOU WERE LIKELY MISSING THIS LINE:
export default ObservationTimeGrid;