import React, { useState } from 'react';
import { Syringe, TestTubes, Stethoscope, Briefcase } from 'lucide-react';

import DoseModelGrid from './DoseModelGrid';
// ❌ Removed DoseAmountGrid import
import CompDoseAmountGrid from './CompDoseAmountGrid';
import RouteGrid from './RouteGrid';
import DurationGrid from './DurationGrid';
import FrequencyGrid from './FrequencyGrid';

const RegimenDosing = () => {
  // 1. Update the default state to 'Dose Model' (or another existing tab)
  const [activeCategory, setActiveCategory] = useState('Dose Model'); 

  const categories = [
    { id: 'Dose Model', icon: Syringe, Component: DoseModelGrid },
    // ❌ Removed Dose Amount from this list
    { id: 'Comp Dose Amount', icon: TestTubes, Component: CompDoseAmountGrid },
    { id: 'Route', icon: Stethoscope, Component: RouteGrid },
    { id: 'Duration (Trial)', icon: Briefcase, Component: DurationGrid },
    { id: 'Frequency', icon: Briefcase, Component: FrequencyGrid },
  ];

  const ActiveGridComponent = categories.find(c => c.id === activeCategory)?.Component;

  return (
    <div className="flex flex-col h-full w-full gap-4 animate-in fade-in duration-300">
      <div className="flex justify-center w-full shrink-0">
        <div className="bg-white border border-slate-200 p-1.5 rounded-xl shadow-sm inline-flex flex-wrap items-center justify-center gap-2 mx-auto transition-all">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            
            return (
              <button 
                key={`link-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 font-bold text-[12px] transition-all duration-300 px-4 py-2 relative rounded-lg outline-none ${
                  isActive 
                    ? 'text-[#00A3FF] bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] border border-[#15803d] shadow-[0_4px_12px_rgba(21,128,61,0.15)] transform scale-105 -translate-y-[2px] z-10' 
                    : 'text-slate-500 hover:text-[#00A3FF] hover:bg-slate-50 border border-transparent hover:shadow-sm hover:-translate-y-[1px] z-0' 
                }`}
              >
                <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                {cat.id}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden">
        {ActiveGridComponent && <ActiveGridComponent />}
      </div>
    </div>
  );
};

export default RegimenDosing;