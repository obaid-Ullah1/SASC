import React from 'react';
import { ImageIcon } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const ImagingResultGrid = () => {
  // Static data based on typical imaging results
  const imagingData = [
    { id: 1, name: 'Normal', isDefault: true },
    { id: 2, name: 'Abnormal', isDefault: false },
    { id: 3, name: 'Inconclusive', isDefault: false },
    { id: 4, name: 'Pending', isDefault: false },
  ];

  return (
    <SharedSimpleGrid 
      title="Imaging Result List" 
      icon={ImageIcon} 
      entityName="Imaging Result" 
      initialData={imagingData} 
    />
  );
};

export default ImagingResultGrid;