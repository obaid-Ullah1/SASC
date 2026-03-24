import React from 'react';
import { Beaker } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const ClassGrid = () => {
  const data = [
    { id: 1, name: 'Anti-IgE', isDefault: true },
    { id: 2, name: 'Anti-IL5', isDefault: false },
    { id: 3, name: 'Anti-IL5R', isDefault: false },
    { id: 4, name: 'Anti-IL4R/IL13', isDefault: false },
    { id: 5, name: 'Anti-TSLP', isDefault: false },
  ];

  return <SharedSimpleGrid title="Biologic Class List" icon={Beaker} entityName="Class" initialData={data} />;
};

export default ClassGrid;