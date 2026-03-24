import React from 'react';
import { FileText } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const ReportsUploadedGrid = () => {
  const data = [
    { id: 1, name: 'PFT Report', isDefault: true },
    { id: 2, name: 'Lab Results PDF', isDefault: false },
    { id: 3, name: 'Imaging Report', isDefault: false }
  ];
  return <SharedSimpleGrid title="Uploaded Reports List" icon={FileText} entityName="Report" initialData={data} />;
};
export default ReportsUploadedGrid;