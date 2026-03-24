import React from 'react';
import DiagnosisTable from '../../components/Bio/DiagnosisTable';


const Diagnosis = () => {
  return (
    <div className="w-full h-full bg-[#f8fafc] p-6 overflow-hidden flex flex-col">
      <DiagnosisTable />
    </div>
  );
};

export default Diagnosis;