import React from 'react';
import { ShieldAlert } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const SafetyRulesGrid = () => {
  const data = [
    { id: 1, name: 'Hypersensitivity Check', isDefault: true },
    { id: 2, name: 'Live Vaccine Avoidance', isDefault: false },
    { id: 3, name: 'Pregnancy/Lactation Review', isDefault: false }
  ];
  return <SharedSimpleGrid title="Safety Rules List" icon={ShieldAlert} entityName="Safety Rule" initialData={data} />;
};
export default SafetyRulesGrid;