import React from 'react';
// This path must be exact:
import TreatmentTable from '../../components/Bio/TreatmentTable';

const Treatment = () => {
  return (
    <div className="w-full h-full bg-[#f8fafc] p-4 sm:p-6 overflow-hidden flex flex-col">
      <TreatmentTable />
    </div>
  );
};

export default Treatment;