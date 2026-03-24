import React from 'react';
import { ClipboardList } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const IndicationGrid = () => {
  const data = [
    { id: 1, name: 'Severe Asthma', isDefault: true },
    { id: 2, name: 'CRSwNP', isDefault: false },
    { id: 3, name: 'Atopic Dermatitis', isDefault: false },
    { id: 4, name: 'Eosinophilic Esophagitis', isDefault: false },
  ];

  return <SharedSimpleGrid title="Indication List" icon={ClipboardList} entityName="Indication" initialData={data} />;
};

export default IndicationGrid;