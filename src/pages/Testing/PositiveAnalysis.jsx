import React from 'react';
import PositiveAnalysisTable from '../../components/Testing/PositiveAnalysisTable';

const PositiveAnalysis = () => {
  return (
    // Changed bg to white and removed all padding (p-0 instead of p-6)
    <div className="w-full h-full bg-white p-0 overflow-hidden flex flex-col">
      <PositiveAnalysisTable />
    </div>
  );
};

export default PositiveAnalysis;