import React from 'react';
import { Stethoscope } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const RouteGrid = () => {
  const data = [{ id: 1, name: 'Subcutaneous', isDefault: true }, { id: 2, name: 'Intravenous', isDefault: false }];
  return <SharedSimpleGrid title="Route List" icon={Stethoscope} entityName="Route" initialData={data} />;
};
export default RouteGrid;