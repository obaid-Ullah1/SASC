import React, { useState, useEffect } from 'react';
import { 
  X, Activity, Tag, ListChecks, Droplet, 
  PlusCircle, Clock, Info 
} from 'lucide-react';

// Import both data dictionaries
import { skinTestData } from '../../../config/skinTestData';
import { chemicalTestData } from '../../../config/chemicalTestData'; 

// Import both form components
import RadioTestingForm from './RadioTestingForm';
import PatchTestingForm from './PatchTestingForm'; 

const SkinTestForm = ({ isOpen, onClose, patientName }) => {
  const [category, setCategory] = useState('');
  const [formType, setFormType] = useState(''); 
  const [test, setTest] = useState('');
  
  // Renamed from isRadioFormOpen to isFormOpen since it controls both forms now
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCategory('');
        setFormType('');
        setTest('');
        setIsFormOpen(false);
      }, 300); 
    }
  }, [isOpen]);

  // AUTO-OPEN LOGIC: When the dropdown changes, if all 3 steps are complete, pop it open immediately.
  const handleTestSelection = (e) => {
    const selectedTest = e.target.value;
    setTest(selectedTest);
    
    // If they already picked a category and form type, and selected a valid test, auto-launch!
    if (category !== '' && formType !== '' && selectedTest !== '') {
      setIsFormOpen(true);
    }
  };

  // Dynamically select which dictionary to pull data from based on Category
  const activeDictionary = category === 'Chemical' ? chemicalTestData : skinTestData;
  const selectedTestData = activeDictionary[test];

  return (
    <>
      <div className={`fixed inset-0 z-[60] transition-all duration-300 print:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose} />

        <div className={`absolute top-0 right-0 w-full sm:w-[380px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="bg-[#00A3FF] px-5 py-4 flex items-start justify-between shrink-0 shadow-sm z-10">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
                <Activity size={20} strokeWidth={2.5} />
                Skin Testing Workflow
              </div>
              <div className="text-white/90 text-sm font-medium ml-7">
                {patientName || 'Select Patient'}
              </div>
            </div>
            <button type="button" onClick={onClose} className="bg-white text-slate-600 hover:text-slate-800 p-1 rounded-md shadow-sm transition-colors mt-0.5">
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-7 bg-slate-50/30">
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[15px]">
                <Tag size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
                Step 1: Test Category
              </div>
              <select 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  setTest(''); // Automatically reset test selection if they change the category
                }} 
                className="w-full bg-white border border-[#00A3FF] rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00A3FF]/20 shadow-sm cursor-pointer"
              >
                <option value="">-- Select Category --</option>
                <option value="Allergy">Allergy</option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[15px]">
                <ListChecks size={16} className="text-emerald-500" strokeWidth={2.5} />
                Step 2: Form Type
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormType('new')} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all text-sm font-bold shadow-sm ${formType === 'new' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-emerald-200 bg-white text-emerald-400 hover:border-emerald-400 hover:bg-emerald-50/50'}`}>
                  <PlusCircle size={16} strokeWidth={2.5} /> New
                </button>
                <button type="button" onClick={() => setFormType('existing')} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all text-sm font-bold shadow-sm ${formType === 'existing' ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-amber-200 bg-white text-amber-400 hover:border-amber-400 hover:bg-amber-50/50'}`}>
                  <Clock size={16} strokeWidth={2.5} /> Existing
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[15px]">
                <Droplet size={16} className="text-rose-400 fill-rose-100" strokeWidth={2.5} />
                Step 3: Select Test
              </div>
              <select 
                value={test} 
                onChange={handleTestSelection} 
                disabled={!category}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">-- Select Test --</option>
                
                {/* Dynamically render options based on category */}
                {category === 'Allergy' && (
                  <>
                    <option value="SPT-90">SPT-90</option>
                    <option value="SPT-Food">SPT-Food</option>
                    <option value="LIMITED/PEDS">LIMITED/PEDS</option>
                    <option value="SPT-Food 1">SPT-Food 1</option>
                  </>
                )}
                {category === 'Chemical' && (
                  <>
                    <option value="Patch Test">Patch Test</option>
                  </>
                )}
              </select>
            </div>

            <div className="mt-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-1.5 text-sm text-slate-800">
              <div><span className="font-black">Category:</span> {category || '—'}</div>
              <div><span className="font-black">Form:</span> {formType ? (formType === 'new' ? 'New' : 'Existing') : '—'}</div>
              <div><span className="font-black">Test:</span> {test || '—'}</div>
            </div>
          </div>

          <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
              <Info size={14} />
              {selectedTestData ? 'Ready to launch!' : 'Complete all steps'}
            </div>
            
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
                Close
              </button>

              {/* MANUAL LAUNCH BUTTON */}
              {selectedTestData && formType && category && (
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="bg-[#00A3FF] hover:bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors shadow-sm animate-in zoom-in"
                >
                  Launch Form
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally Render the Correct Component Based on Category */}
      {category === 'Chemical' ? (
        <PatchTestingForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          patientName={patientName}
          testTitle={selectedTestData?.title} 
          panelsData={selectedTestData?.panels} 
        />
      ) : (
        <RadioTestingForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          patientName={patientName}
          testTitle={selectedTestData?.title} 
          panelsData={selectedTestData?.panels} 
        />
      )}
    </>
  );
};

export default SkinTestForm;