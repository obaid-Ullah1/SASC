import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Beaker, 
  TestTube2, 
  Biohazard, 
  TestTubes, 
  Syringe, 
  Bug 
} from 'lucide-react';

// 1. IMPORT YOUR COMPLETED GRIDS
import ResultGrid from './ResultGrid';
import CategoryGrid from './CategoryGrid';
import LabTestGrid from './LabTestGrid'; 
import CategoryResultGrid from './CategoryResultGrid'; 
import CrpEsrGrid from './CrpEsrGrid'; // <-- NEW IMPORT
import ImmunoglobulinsGrid from './ImmunoglobulinsGrid';
import EosinophilCountGrid from './EosinophilCountGrid';
import InfectionScreenGrid from './InfectionScreenGrid';
// TEMPORARY PLACEHOLDER COMPONENT (Until we build the rest of the Grids)
const PlaceholderGrid = ({ name }) => (
  <div className="flex items-center justify-center h-full w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl">
    <h2 className="text-2xl font-bold text-slate-400">{name} Grid Under Construction</h2>
  </div>
);

const LaboratoryResults = () => {
  const [activeCategory, setActiveCategory] = useState('Result'); 

  // Mapping exactly to your 8 image tabs
  const categories = [
    { id: 'Result', icon: CheckCircle2, Component: ResultGrid }, 
    { id: 'Category', icon: Beaker, Component: CategoryGrid },
    { id: 'Lab Test', icon: TestTube2, Component: LabTestGrid },
    { id: 'Category Result', icon: Biohazard, Component: CategoryResultGrid },
    // 2. SWAPPED PLACEHOLDER FOR THE ACTUAL CRP/ESR GRID HERE
    { id: 'CRP/ESR', icon: TestTubes, Component: CrpEsrGrid },
    { id: 'Immunoglobulins', icon: Syringe, Component: ImmunoglobulinsGrid },
    { id: 'Eosinophil Count', icon: Bug, Component: EosinophilCountGrid },
    { id: 'Infection Screen', icon: Biohazard, Component: InfectionScreenGrid }
  ];

  const ActiveGridComponent = categories.find(c => c.id === activeCategory)?.Component;

  return (
    <div className="flex flex-col h-full w-full gap-4 animate-in fade-in duration-300">
      
      {/* LEVEL 3 NAVIGATION - Ultra-thin frame */}
      <div className="flex justify-center w-full shrink-0">
        <div className="bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm inline-flex flex-wrap items-center justify-center gap-2 mx-auto transition-all">
          
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            
            return (
              <button 
                key={`link-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 font-bold text-[13px] transition-all duration-300 px-5 py-2 relative rounded-lg outline-none ${
                  isActive 
                    /* ACTIVE TAB: Full green border, light blue bg, pops forward via Tailwind scale/translate */
                    ? 'text-[#00A3FF] bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] border border-[#15803d] shadow-[0_4px_12px_rgba(21,128,61,0.15)] transform scale-105 -translate-y-[2px] z-10' 
                    
                    /* INACTIVE TAB: Transparent border to prevent layout jumping, smooth hover lift */
                    : 'text-slate-500 hover:text-[#00A3FF] hover:bg-slate-50 border border-transparent hover:shadow-sm hover:-translate-y-[1px] z-0' 
                }`}
              >
                {/* Icon scales slightly when active using standard Tailwind */}
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                {cat.id}
              </button>
            );
          })}

        </div>
      </div>

      {/* THE GRID CONTAINER */}
      <div className="flex-1 w-full overflow-hidden">
        {ActiveGridComponent && <ActiveGridComponent />}
      </div>

    </div>
  );
};

export default LaboratoryResults;