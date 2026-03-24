import React, { useState } from 'react';
import { 
  List, 
  ListTree, 
  Ruler, 
  ScrollText, 
  Network, 
  LayoutPanelLeft, 
  Blocks 
} from 'lucide-react';

// --- IMPORTS ---
import CategoryTable from '../../components/Injection/CategoryTable';
import GroupsTable from '../../components/Injection/GroupsTable';
import ScaleTable from '../../components/Injection/ScaleTable';
import RuleNameTable from '../../components/Injection/RuleNameTable';
import GroupingRulesTable from '../../components/Injection/GroupingRulesTable';
import PanelTable from '../../components/Injection/PanelTable';
import PatchesTable from '../../components/Injection/PatchTable';

const TestRules = () => {
  const [activeTab, setActiveTab] = useState('Category');

  // Defined tabs to match your SkinTesting structure perfectly
  const tabs = [
    { name: 'Category', icon: List },
    { name: 'Groups', icon: ListTree },
    { name: 'Scale', icon: Ruler },
    { name: 'Rule Name', icon: ScrollText },
    { name: 'Grouping Rules', icon: Network },
    { name: 'Panel', icon: LayoutPanelLeft },
    { name: 'Patches', icon: Blocks },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Category': return <CategoryTable />;
      case 'Groups': return <GroupsTable />;
      case 'Scale': return <ScaleTable />;
      case 'Rule Name': return <RuleNameTable />;
      case 'Grouping Rules': return <GroupingRulesTable />;
      case 'Panel': return <PanelTable />;
      case 'Patches': return <PatchesTable />;
      default: return null;
    }
  };

  return (
    // Replaced h-screen/h-dvh with h-full to perfectly inherit your app's layout boundaries
    <div className="w-full h-full flex flex-col bg-[#f8fafc] p-6 overflow-hidden">
      
      {/* Navigation Tabs - Exact match to SkinTesting styling */}
      <div className="flex flex-wrap justify-center gap-2 mb-5 shrink-0 bg-white p-0 rounded-2xl shadow-sm border border-slate-100 w-fit mx-auto">
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
            <span className="text-[12px] font-black uppercase tracking-wider">
              {tab.name}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area - Nested exactly like SkinTesting to protect the footer */}
      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-slate-50/30 p-0">
          {/* Added the animation effect inside the protected h-full container */}
          <div className="h-full w-full animate-in fade-in zoom-in-95 duration-300">
            {renderContent()}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TestRules;