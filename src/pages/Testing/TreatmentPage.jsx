import React, { useState } from 'react';
import { Waypoints, ClipboardCheck } from 'lucide-react';

// Import your existing components
import MappingTable from '../../components/Injection/MappingTable';
import TreatmentTable from '../../components/Injection/TreatmentTable';

const TreatmentPage = () => {
  const [activeTab, setActiveTab] = useState('Mapping');

  return (
    <div className="w-full h-full flex flex-col bg-[#f8fafc] p-1 overflow-hidden">
      
      {/* Centered Navigation Bar */}
      <div className="flex justify-center items-center mb-6 shrink-0">
        
        {/* Segmented Control Tabs */}
        <div className="flex items-center bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('Mapping')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === 'Mapping'
                ? 'bg-[#3B82F6] text-white shadow-md' 
                : 'bg-transparent text-[#3B82F6] hover:bg-blue-50' 
            }`}
          >
            <Waypoints size={16} strokeWidth={2.5} />
            Mapping
          </button>
          
          <button
            onClick={() => setActiveTab('Treatment')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
              activeTab === 'Treatment'
                ? 'bg-[#3B82F6] text-white shadow-md'
                : 'bg-transparent text-[#3B82F6] hover:bg-blue-50'
            }`}
          >
            <ClipboardCheck size={16} strokeWidth={2.5} />
            Treatment
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col bg-white">
        
        {/* ✅ HEADER REMOVED FROM HERE 
           The headers are already inside MappingTable and TreatmentTable 
        */}

        {/* Content Container */}
        <div className={`flex-1 overflow-hidden flex flex-col ${
          activeTab === 'Treatment' ? 'bg-slate-50/30 p-0' : 'bg-white p-0'
        }`}>
          {activeTab === 'Mapping' ? <MappingTable /> : <TreatmentTable />}
        </div>

      </div>
    </div>
  );
};

export default TreatmentPage;