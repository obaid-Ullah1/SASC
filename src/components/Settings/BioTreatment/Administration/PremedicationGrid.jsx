import React from 'react';
import { ClipboardPlus } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const PremedicationGrid = () => {
  const data = [
    { id: 1, name: 'Acetaminophen (Tylenol)', isDefault: true },
    { id: 2, name: 'Diphenhydramine (Benadryl)', isDefault: false },
    { id: 3, name: 'Cetirizine (Zyrtec)', isDefault: false },
    { id: 4, name: 'Prednisone', isDefault: false },
    { id: 5, name: 'None Required', isDefault: false },
  ];

  return (
    <SharedSimpleGrid 
      title="Premedication List" 
      icon={ClipboardPlus} 
      entityName="Premedication" 
      initialData={data} 
    />
  );
};

// At the bottom of PremedicationGrid.jsx
export default PremedicationGrid;