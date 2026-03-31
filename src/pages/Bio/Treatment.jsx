import React from 'react';
// This path must be exact:
import TreatmentTable from '../../components/Bio/TreatmentTable';

const Treatment = () => {
  return (
    // Changed bg to white and removed all padding (p-0 instead of p-4 sm:p-6)
    <div className="w-full h-full bg-white p-0 overflow-hidden flex flex-col">
      <TreatmentTable />
    </div>
  );
};

export default Treatment;