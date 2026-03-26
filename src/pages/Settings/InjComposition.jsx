import React, { useState } from 'react';
import { List, Layers } from 'lucide-react';

// 1. IMPORT ALL TAB COMPONENTS
import InjType from '../../components/Settings/InjType';
import InjName from '../../components/Settings/InjName';
import Composition from '../../components/Settings/Composition'; // <-- Added Import for Composition

const InjComposition = () => {
  const [activeTab, setActiveTab] = useState('injType');

  const tabs = [
    { id: 'injType', label: 'Injection Type', icon: <List size={16} /> },
    { id: 'injName', label: 'Injection Name', icon: <List size={16} /> },
    { id: 'composition', label: 'Composition', icon: <Layers size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] p-4 lg:p-0 gap-4">
      
      {/* NAVIGATION TABS - Matched to DoseRulesPage styles */}
      <div className="flex justify-center w-full shrink-0">
        <div className="bg-white border border-sky-100 p-1 rounded-lg shadow-sm flex flex-wrap items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#00A3FF] text-white shadow-md'
                  : 'bg-transparent text-[#00A3FF] hover:bg-sky-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* DYNAMIC CONTENT CONTAINER */}
      <div className="flex-1 w-full overflow-hidden">
        
        {/* 2. DYNAMIC RENDERING LOGIC */}
        {activeTab === 'injType' && <InjType />}
        
        {/* Render the Injection Name component when tab is active */}
        {activeTab === 'injName' && <InjName />} 
        
        {/* Render the Composition component when tab is active */}
        {activeTab === 'composition' && <Composition />}

      </div>
    </div>
  );
};
export default InjComposition;