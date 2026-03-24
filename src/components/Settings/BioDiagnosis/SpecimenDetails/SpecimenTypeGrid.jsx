import React from 'react';
import { Pipette } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const SpecimenTypeGrid = () => {
  const data = [
    { id: 1, name: 'Blood', isDefault: true },
    { id: 2, name: 'Serum', isDefault: false },
    { id: 3, name: 'Urine', isDefault: false },
    { id: 4, name: 'Saliva', isDefault: false },
  ];
  return <SharedSimpleGrid title="Specimen Type List" icon={Pipette} entityName="Specimen Type" initialData={data} />;
};
export default SpecimenTypeGrid;