import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SharedSimpleGrid from '../../BioDiagnosis/SharedSimpleGrid';

const ImagingOtherGrid = () => {
  const data = [{ id: 1, name: 'Chest X-Ray', isDefault: true }, { id: 2, name: 'Sinus CT', isDefault: false }];
  return <SharedSimpleGrid title="Imaging/Other List" icon={ImageIcon} entityName="Imaging" initialData={data} />;
};
export default ImagingOtherGrid;