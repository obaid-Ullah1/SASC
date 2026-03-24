import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const ResponseCriteriaGrid = () => {
  const data = [
    { id: 1, name: 'Reduction in Exacerbations', isDefault: true },
    { id: 2, name: 'FEV1 Improvement', isDefault: false },
    { id: 3, name: 'OCS Reduction', isDefault: false }
  ];
  return <SharedSimpleGrid title="Response Criteria List" icon={ClipboardCheck} entityName="Criterion" initialData={data} />;
};
export default ResponseCriteriaGrid;