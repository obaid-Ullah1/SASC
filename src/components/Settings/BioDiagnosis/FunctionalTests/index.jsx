import React, { useState } from 'react';
import PftSeverityGrid from './PftSeverityGrid';
import AllergyTestResultGrid from './AllergyTestResultGrid';

// CUSTOM LUNGS ICON 
const LungsIcon = ({ size = 16, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v4" />
    <path d="M12 6c-1.5 0-3 1-3 2.5V14c0 1.5 1 2.5 2.5 2.5h.5" />
    <path d="M12 6c1.5 0 3 1 3 2.5V14c0 1.5-1 2.5-2.5 2.5h-.5" />
    <path d="M9 16.5A3.5 3.5 0 0 1 5.5 13V8.5c0-1.5 1-2.5 2.5-2.5 1.5 0 2.5.5 2.5 1.5" />
    <path d="M15 16.5A3.5 3.5 0 0 0 18.5 13V8.5c0-1.5-1-2.5-2.5-2.5-1.5 0-2.5.5-2.5 1.5" />
  </svg>
);

// CUSTOM ALLERGY HAND ICON
const HandIcon = ({ size = 16, strokeWidth = 2, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 11V6a2 2 0 0 0-4 0v4" />
    <path d="M14 10V4a2 2 0 0 0-4 0v6" />
    <path d="M10 10.5V3a2 2 0 0 0-4 0v9" />
    <path d="M6 12v-1a2 2 0 0 0-4 0v5c0 4.5 3 6.5 6 8h4c3 0 5-1.5 6-4l2-5.5a2.5 2.5 0 0 0-4.5-2.5H18" />
    <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    <circle cx="14" cy="15" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FunctionalTests = () => {
  const [activeCategory, setActiveCategory] = useState('PFT Severity'); 

  const categories = [
    { id: 'PFT Severity', icon: LungsIcon, Component: PftSeverityGrid },
    { id: 'Allergy Test Result', icon: HandIcon, Component: AllergyTestResultGrid }
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
                className={`flex items-center gap-2 font-bold text-[13px] transition-all duration-300 px-5 py-2 relative rounded-lg outline-none ${
                  isActive 
                    ? 'text-[#00A3FF] bg-gradient-to-b from-[#f0f9ff] to-[#e0f2fe] border border-[#15803d] shadow-[0_4px_12px_rgba(21,128,61,0.15)] transform scale-105 -translate-y-[2px] z-10' 
                    : 'text-slate-500 hover:text-[#00A3FF] hover:bg-slate-50 border border-transparent hover:shadow-sm hover:-translate-y-[1px] z-0' 
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
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

export default FunctionalTests;