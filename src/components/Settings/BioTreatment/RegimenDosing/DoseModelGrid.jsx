import React from 'react';
import { Syringe } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const DoseModelGrid = () => {
  const data = [{ id: 1, name: 'Fixed Dose', isDefault: true }, { id: 2, name: 'Weight Based', isDefault: false }];
  return <SharedSimpleGrid title="Dose Model List" icon={Syringe} entityName="Dose Model" initialData={data} />;
};
export default DoseModelGrid;