import React from 'react';
import PTMappingTable from '../../components/Testing/PTMappingTable';

const PTMapping = () => {
  return (
    // Changed bg to white and removed all padding (p-0 instead of p-6)
    <div className="w-full h-full bg-white p-0 overflow-hidden flex flex-col">
      <PTMappingTable />
    </div>
  );
};

export default PTMapping;