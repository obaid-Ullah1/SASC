import React from 'react';
import { FileText } from 'lucide-react';
import SharedSimpleGrid from '../SharedSimpleGrid';

const ProgressNoteStatusGrid = () => {
  // Data mapped directly from your screenshot
  const statusData = [
    { id: 1, name: 'Draft', isDefault: true },
    { id: 2, name: 'Signed', isDefault: false },
    { id: 3, name: 'testest', isDefault: false },
    { id: 4, name: 'test', isDefault: false },
  ];

  return (
    <SharedSimpleGrid 
      title="Progress Note Status List" 
      icon={FileText} 
      entityName="Progress Note Status" 
      initialData={statusData} 
    />
  );
};

export default ProgressNoteStatusGrid;