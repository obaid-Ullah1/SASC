import React, { useState } from 'react';
import DiagnosisCoding from './DiagnosisCoding';
import LaboratoryResults from './LaboratoryResults'; 
import FunctionalTests from './FunctionalTests'; // <-- 1. NEW IMPORT ADDED HERE
import Imaging from './Imaging';
import SpecimenDetails from './SpecimenDetails';
import Documentation from './Documentation';
import Scoring from './Scoring';
const BioDiagnosis = () => {
  const [activeSubTab, setActiveSubTab] = useState('Diagnosis Coding');

  // We add the 'Component' property here to make switching clean and dynamic
  const subTabs = [
    { id: 'Diagnosis Coding', label: 'Diagnosis Coding', Component: DiagnosisCoding },
    { id: 'Laboratory Results', label: 'Laboratory Results', Component: LaboratoryResults },
    
    // 2. COMPONENT PROPERTY ADDED HERE 👇
    { id: 'Functional Tests', label: 'Functional Tests', Component: FunctionalTests }, 
    
    { id: 'Imaging', label: 'Imaging', Component: Imaging },
    { id: 'Specimen Details', label: 'Specimen Details', Component: SpecimenDetails },
    { id: 'Documentation', label: 'Documentation', Component: Documentation },
    { id: 'Scoring', label: 'Scoring', Component: Scoring },
  ];

  // Find the component associated with the currently active tab
  const ActiveComponent = subTabs.find(tab => tab.id === activeSubTab)?.Component;

  return (
    <div className="flex flex-col h-full w-full gap-4">
      
      {/* LEVEL 2 NAVIGATION (FIXED) - Matches Screenshot */}
      <div className="flex justify-center w-full shrink-0 px-2">
        <div className="bg-white border border-slate-200 p-1 rounded-lg shadow-sm flex flex-wrap items-center justify-center gap-1 w-full max-w-5xl">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center justify-center px-4 lg:px-6 py-2 rounded-md text-[13px] font-bold transition-all duration-200 ${
                activeSubTab === tab.id
                  ? 'bg-[#00A3FF] text-white shadow-sm'
                  : 'bg-transparent text-[#00A3FF] hover:bg-sky-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC CONTENT */}
      <div className="flex-1 w-full overflow-hidden">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="h-full flex items-center justify-center text-[#00A3FF] font-bold border-2 border-dashed border-sky-200 rounded-2xl bg-white shadow-sm">
            {activeSubTab} Screen Under Construction
          </div>
        )}
      </div>

    </div>
  );
};

export default BioDiagnosis;