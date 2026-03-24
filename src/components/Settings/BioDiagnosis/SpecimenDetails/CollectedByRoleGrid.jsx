import React from 'react';
import { UserRoundCog } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const CollectedByRoleGrid = () => {
  const data = [
    { id: 1, name: 'Nurse', isDefault: true },
    { id: 2, name: 'Phlebotomist', isDefault: false },
    { id: 3, name: 'Physician', isDefault: false },
    { id: 4, name: 'Technician', isDefault: false },
  ];
  return <SharedSimpleGrid title="Collected By Role" icon={UserRoundCog} entityName="Role" initialData={data} />;
};
export default CollectedByRoleGrid;