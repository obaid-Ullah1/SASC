import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const TreatmentGoalGrid = () => {
  const data = [
    { id: 1, name: 'Symptom Control', isDefault: true },
    { id: 2, name: 'Exacerbation Reduction', isDefault: false },
    { id: 3, name: 'Oral Corticosteroid Sparing', isDefault: false },
    { id: 4, name: 'Improved Lung Function', isDefault: false },
  ];

  return <SharedSimpleGrid title="Treatment Goal List" icon={CheckCircle2} entityName="Goal" initialData={data} />;
};

export default TreatmentGoalGrid;