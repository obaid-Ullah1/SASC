import React, { useState } from 'react';
import BioDiagnosis from '../../components/Settings/BioDiagnosis';
// Point explicitly to the index file inside the folder
import BioTreatment from '../../components/Settings/BioTreatment/index'; 

const BioManagement = () => {
  const [activeMainTab, setActiveMainTab] = useState('Diagnosis');

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] p-4 lg:p-0 gap-4 animate-in fade-in duration-300">
      
      {/* LEVEL 1 NAVIGATION */}
      <div className="flex justify-center w-full shrink-0">
        <div className="bg-white border border-slate-200 p-1 rounded-lg shadow-sm flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveMainTab('Diagnosis')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-md text-[13px] font-bold transition-all duration-200 ${
              activeMainTab === 'Diagnosis' ? 'bg-[green] text-white shadow-md' : 'bg-transparent text-[#1E3A8A] hover:bg-blue-50'
            }`}
          >
            Diagnosis
          </button>
          <button
            onClick={() => setActiveMainTab('Treatment')}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-md text-[13px] font-bold transition-all duration-200 ${
              activeMainTab === 'Treatment' ? 'bg-[green] text-white shadow-md' : 'bg-transparent text-[#1E3A8A] hover:bg-blue-50'
            }`}
          >
            Treatment
          </button>
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        {activeMainTab === 'Diagnosis' && <BioDiagnosis />}
        
        {/* Render the BioTreatment component from the folder */}
        {activeMainTab === 'Treatment' && <BioTreatment />}
      </div>

    </div>
  );
};

export default BioManagement;