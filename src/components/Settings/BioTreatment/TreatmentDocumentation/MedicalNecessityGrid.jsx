import React from 'react';
import { ClipboardPlus } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const MedicalNecessityGrid = () => {
  const data = [
    { id: 1, name: 'Prior Authorization Form', isDefault: true },
    { id: 2, name: 'Letter of Medical Necessity', isDefault: false },
    { id: 3, name: 'Clinical Notes Summary', isDefault: false }
  ];
  return <SharedSimpleGrid title="Medical Necessity Docs" icon={ClipboardPlus} entityName="Document" initialData={data} />;
};
export default MedicalNecessityGrid;