import React from 'react';
import { Briefcase } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const DurationGrid = () => {
  const data = [{ id: 1, name: '12 Weeks', isDefault: true }, { id: 2, name: '24 Weeks', isDefault: false }];
  return <SharedSimpleGrid title="Duration List" icon={Briefcase} entityName="Duration" initialData={data} />;
};
export default DurationGrid;