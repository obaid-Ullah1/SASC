import React, { useState } from 'react';
import { 
  List, Users, Ruler, FileText, Layout, 
  Box, Thermometer, Map, ShoppingBag 
} from 'lucide-react';

// Smart Components
import CategoryTable from '../../components/Injection/CategoryTable';
import GroupsTable from '../../components/Injection/GroupsTable';
import ScaleTable from '../../components/Injection/ScaleTable';
import RuleNameTable from '../../components/Injection/RuleNameTable';
import GroupingRulesTable from '../../components/Injection/GroupingRulesTable';
import PanelTable from '../../components/Injection/PanelTable';
import PatchTable from '../../components/Injection/PatchTable';
import MappingTable from '../../components/Injection/MappingTable';
import TestRecord from '../../components/Injection/TestRecord';
import TreatmentTable from '../../components/Injection/TreatmentTable';

const SkinTesting = () => {
  const [activeTab, setActiveTab] = useState('Category');

  const tabs = [
    { name: 'Category', icon: List },
    { name: 'Groups', icon: Users },
    { name: 'Scale', icon: Ruler },
    { name: 'Rule Name', icon: FileText },
    { name: 'Grouping Rules', icon: Layout },
    { name: 'Panel', icon: Box },
    { name: 'Patches', icon: Box },
    { name: 'Skin Testing', icon: Thermometer },
    { name: 'Mapping', icon: Map },
    { name: 'Treatment', icon: ShoppingBag },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Category': return <CategoryTable />; 
      case 'Groups': return <GroupsTable />;
      case 'Scale': return <ScaleTable />;
      case 'Rule Name': return <RuleNameTable />;
      case 'Grouping Rules': return <GroupingRulesTable />; 
      case 'Panel': return <PanelTable />;
      case 'Patches': return <PatchTable />; 
      case 'Skin Testing': return <TestRecord />; 
      case 'Mapping': return <MappingTable />; 
      case 'Treatment': return <TreatmentTable />;
      default: return null;
    }
  };

  return (
    /* Changed p-0 to px-5 pt-2 pb-8 to bring the content down and give room at the bottom */
    <div className="w-full h-full flex flex-col bg-[#f8fafc] px-0 pt-0 pb-10 overflow-hidden min-h-screen">
      
      {/* Navigation Tabs - Added my-4 for better vertical centering */}
      <div className="flex flex-wrap justify-center gap-2 my-4 shrink-0 bg-white p-0 rounded-2xl shadow-sm border border-slate-100 w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
              activeTab === tab.name 
                ? 'bg-[#00A3FF] text-white shadow-lg scale-105' 
                : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
            }`}
          >
            <tab.icon size={16} strokeWidth={activeTab === tab.name ? 3 : 2} />
            <span className="text-[11px] font-black uppercase tracking-wider">
              {tab.name}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area - Rounded-3xl and shadow-xl look great here */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden mb-2">
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-0">
          <div className="h-full w-full">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Subtle Bottom Spacer to ensure it doesn't hit the very edge of the screen */}
      <div className="h-2 w-full shrink-0" />
    </div>
  );
};

export default SkinTesting;