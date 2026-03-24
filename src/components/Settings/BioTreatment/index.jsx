import React, { useState } from 'react';
import TreatmentIndication from './TreatmentIndication';
import BiologicClass from './BiologicClass';
import RegimenDosing from './RegimenDosing';
import Administration from './Administration';
import MonitoringPlan from './MonitoringPlan';
import SafetyResponse from './SafetyResponse';
import TreatmentDocumentation from './TreatmentDocumentation';
const BioTreatment = () => {
  const [activeSubTab, setActiveSubTab] = useState('Treatment Indication');

  const subTabs = [
    { id: 'Treatment Indication', label: 'Treatment Indication', Component: TreatmentIndication },
    { id: 'Biologic Class', label: 'Biologic Class', Component: BiologicClass },
    { id: 'Regimen & Dosing', label: 'Regimen & Dosing', Component: RegimenDosing },
    { id: 'Administration', label: 'Administration', Component: Administration },
    { id: 'Monitoring Plan', label: 'Monitoring Plan', Component: MonitoringPlan },
    { id: 'Safety & Response', label: 'Safety & Response', Component: SafetyResponse },
    { id: 'Treatment Documentation', label: 'Treatment Documentation', Component: TreatmentDocumentation },
  ];

  const ActiveComponent = subTabs.find(tab => tab.id === activeSubTab)?.Component;

  return (
    <div className="flex flex-col h-full w-full gap-4">
      {/* LEVEL 2 NAVIGATION */}
      <div className="flex justify-center w-full shrink-0 px-2">
        <div className="bg-white border border-slate-200 p-1 rounded-lg shadow-sm flex flex-wrap items-center justify-center gap-1 w-full max-w-7xl">
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

// CRITICAL: Vite needs this exact line to recognize the folder as a component
export default BioTreatment;