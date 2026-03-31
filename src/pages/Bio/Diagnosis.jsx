import React from 'react';
import DiagnosisTable from '../../components/Bio/DiagnosisTable';

const Diagnosis = () => {
  return (
    // Changed bg to white and removed all padding (p-0 instead of p-6)
    <div className="w-full h-full bg-white p-0 overflow-hidden flex flex-col">
      <DiagnosisTable />
    </div>
  );
};

export default Diagnosis;