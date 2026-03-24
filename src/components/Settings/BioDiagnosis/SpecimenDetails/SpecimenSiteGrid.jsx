import React from 'react';
import { MapPin } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const SpecimenSiteGrid = () => {
  const data = [
    { id: 1, name: 'Left Arm', isDefault: true },
    { id: 2, name: 'Right Arm', isDefault: false },
    { id: 3, name: 'Nasal', isDefault: false },
  ];
  return <SharedSimpleGrid title="Specimen Site List" icon={MapPin} entityName="Specimen Site" initialData={data} />;
};
export default SpecimenSiteGrid;