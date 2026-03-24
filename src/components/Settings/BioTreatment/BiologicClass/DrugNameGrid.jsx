import React from 'react';
import { Pill } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const DrugNameGrid = () => {
  const data = [
    { id: 1, name: 'Omalizumab', isDefault: true },
    { id: 2, name: 'Mepolizumab', isDefault: false },
    { id: 3, name: 'Reslizumab', isDefault: false },
    { id: 4, name: 'Benralizumab', isDefault: false },
    { id: 5, name: 'Dupilumab', isDefault: false },
    { id: 6, name: 'Tezepelumab', isDefault: false },
  ];

  return <SharedSimpleGrid title="Drug Name List" icon={Pill} entityName="Drug" initialData={data} />;
};

export default DrugNameGrid;