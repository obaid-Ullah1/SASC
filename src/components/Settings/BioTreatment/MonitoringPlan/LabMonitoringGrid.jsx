import React from 'react';
import { Beaker } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const LabMonitoringGrid = () => {
  const data = [{ id: 1, name: 'CBC with Differential', isDefault: true }, { id: 2, name: 'Serum IgE', isDefault: false }];
  return <SharedSimpleGrid title="Lab Monitoring List" icon={Beaker} entityName="Lab" initialData={data} />;
};
export default LabMonitoringGrid;