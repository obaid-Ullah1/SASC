import React from 'react';
import { ClipboardList } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const DiseaseScoresGrid = () => {
  const data = [{ id: 1, name: 'ACT Score', isDefault: true }, { id: 2, name: 'ACQ Score', isDefault: false }];
  return <SharedSimpleGrid title="Disease Scores List" icon={ClipboardList} entityName="Score" initialData={data} />;
};
export default DiseaseScoresGrid;