import React, { useState } from 'react';
import { FilePlus2, AlignJustify, ClipboardList, Stethoscope } from 'lucide-react';

// Import Level 4 Grids
import Icd10Grid from './Icd10Grid';
import SeverityGrid from './SeverityGrid';
import ClinicalCriteriaGrid from './ClinicalCriteriaGrid';
import KeyFindingGrid from './KeyFindingGrid';

const DiagnosisCoding = () => {
  // Defaulting to 'ICD 10 Code' so the grid is visible immediately
  const [activeCategory, setActiveCategory] = useState('ICD 10 Code'); 

  const categories = [
    { id: 'ICD 10 Code', icon: FilePlus2, Component: Icd10Grid },
    { id: 'Severity', icon: AlignJustify, Component: SeverityGrid },
    { id: 'Clinical Criteria', icon: ClipboardList, Component: ClinicalCriteriaGrid },
    { id: 'Key Finding', icon: Stethoscope, Component: KeyFindingGrid }
  ];

  const ActiveGridComponent = categories.find(c => c.id === activeCategory)?.Component;

  return (
    <div className="flex flex-col h-full w-full gap-4 animate-in fade-in duration-300">
      
      {/* LEVEL 3 NAVIGATION - Ultra-thin frame */}
      <div className="flex justify-center w-full shrink-0">
        
        {/* THIN FRAME: Tightly hugs the buttons with p-1.5 */}
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
                    /* ACTIVE TAB: Full green border, light blue bg, pops forward and up with a custom shadow */
                    ? 'text-[#00A3FF] bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] border border-[#15803d] shadow-[0_4px_12px_rgba(21,128,61,0.15)] transform scale-105 -translate-y-[2px] z-10' 
                    
                    /* INACTIVE TAB: Transparent border to prevent layout jumping, smooth hover lift */
                    : 'text-slate-500 hover:text-[#00A3FF] hover:bg-slate-50 border border-transparent hover:shadow-sm hover:-translate-y-[1px] z-0' 
                }`}
              >
                {/* Icon dynamically scales its stroke width for emphasis */}
                <Icon 
                  size={16} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}
                />
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

export default DiagnosisCoding;