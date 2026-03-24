import React from 'react';
import { CalendarRange } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const ResponseWindowGrid = () => {
  const data = [
    { id: 1, name: 'Initial (4-6 weeks)', isDefault: true },
    { id: 2, name: 'Intermediate (3 months)', isDefault: false },
    { id: 3, name: 'Full Evaluation (6 months)', isDefault: false }
  ];
  return <SharedSimpleGrid title="Response Window List" icon={CalendarRange} entityName="Window" initialData={data} />;
};
export default ResponseWindowGrid;