import React from 'react';
import { MapPin } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid'; // <--- Pointing back to the sister folder

const SettingGrid = () => {
  const data = [
    { id: 1, name: 'Clinic', isDefault: true },
    { id: 2, name: 'Home Administration', isDefault: false },
  ];
  return <SharedSimpleGrid title="Setting List" icon={MapPin} entityName="Setting" initialData={data} />;
};

export default SettingGrid;