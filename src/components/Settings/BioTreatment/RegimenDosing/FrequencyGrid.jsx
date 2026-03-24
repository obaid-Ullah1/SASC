import React from 'react';
import { Briefcase } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const FrequencyGrid = () => {
  const data = [{ id: 1, name: 'Every 2 Weeks', isDefault: true }, { id: 2, name: 'Every 4 Weeks', isDefault: false }];
  return <SharedSimpleGrid title="Frequency List" icon={Briefcase} entityName="Frequency" initialData={data} />;
};
export default FrequencyGrid;