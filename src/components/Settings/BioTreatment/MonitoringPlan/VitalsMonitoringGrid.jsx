import React from 'react';
import { Stethoscope } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const VitalsMonitoringGrid = () => {
  const data = [{ id: 1, name: 'Blood Pressure', isDefault: true }, { id: 2, name: 'Heart Rate', isDefault: false }];
  return <SharedSimpleGrid title="Vitals Monitoring List" icon={Stethoscope} entityName="Vital" initialData={data} />;
};
export default VitalsMonitoringGrid;