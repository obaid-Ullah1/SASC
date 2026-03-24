import React, { useState } from 'react';
import { List, FileSpreadsheet, Settings2, Droplets } from 'lucide-react';

// 1. IMPORT ALL COMPONENTS
import RuleNameTab from '../../components/Settings/RuleNameTab';
import DoseRulesTab from '../../components/Settings/DoseRulesTab'; 
import DoseAdjustment from '../../components/Settings/DoseAdjustment';
import DilutionColor from '../../components/Settings/DilutionColor';

const DoseRulesPage = () => {
  const [activeTab, setActiveTab] = useState('ruleName');

  const tabs = [
    { id: 'ruleName', label: 'Rules Name', icon: <List size={16} /> },
    { id: 'doseRules', label: 'Dose Rules', icon: <FileSpreadsheet size={16} /> },
    { id: 'doseAdjustment', label: 'Dose Adjustment Plan', icon: <Settings2 size={16} /> },
    { id: 'dilutionRatio', label: 'Dilution Ratio Color', icon: <Droplets size={16} /> },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#f8fafc] p-4 lg:p-6 gap-4">
      
      {/* NAVIGATION TABS */}
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
        {activeTab === 'ruleName' && <RuleNameTab />}
        {activeTab === 'doseRules' && <DoseRulesTab />}
        {activeTab === 'doseAdjustment' && <DoseAdjustment />}
        {activeTab === 'dilutionRatio' && <DilutionColor />}

      </div>

    </div>
  );
};

export default DoseRulesPage;