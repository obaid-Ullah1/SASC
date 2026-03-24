import React from 'react';
import { AlertTriangle } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const SpecimenConditionGrid = () => {
  const data = [
    { id: 1, name: 'Room Temperature', isDefault: true },
    { id: 2, name: 'Refrigerated', isDefault: false },
    { id: 3, name: 'Frozen', isDefault: false },
    { id: 4, name: 'Hemolyzed', isDefault: false },
  ];
  return <SharedSimpleGrid title="Specimen Condition" icon={AlertTriangle} entityName="Condition" initialData={data} />;
};
export default SpecimenConditionGrid;