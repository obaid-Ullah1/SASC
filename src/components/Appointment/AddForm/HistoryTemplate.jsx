import React, { useState, useEffect } from 'react';
import { 
  X, Activity, Tag, ListChecks, Droplet, 
  PlusCircle, Clock, Info 
} from 'lucide-react';

const HistoryTemplate = ({ isOpen, onClose, selectedData }) => {
  const [category, setCategory] = useState('');
  const [formType, setFormType] = useState(''); 
  const [test, setTest] = useState('');
  
  // Controls the opening of the inner view/form
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

  // Logic to handle selection without external dictionary dependencies
  const handleTestSelection = (e) => {
    const selectedTest = e.target.value;
    setTest(selectedTest);
    
    if (category !== '' && formType !== '' && selectedTest !== '') {
      setIsFormOpen(true);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-[60] transition-all duration-300 print:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose} />

        <div className={`absolute top-0 right-0 w-full sm:w-[380px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          <div className="bg-[#00A3FF] px-5 py-4 flex items-start justify-between shrink-0 shadow-sm z-10">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
                <Activity size={20} strokeWidth={2.5} />
                History Record Workflow
              </div>
              <div className="text-white/90 text-sm font-medium ml-7">
                {selectedData?.patient || 'Select Patient'}
              </div>
            </div>
            <button type="button" onClick={onClose} className="bg-white text-slate-600 hover:text-slate-800 p-1 rounded-md shadow-sm transition-colors mt-0.5">
              <X size={18} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-7 bg-slate-50/30">
            
            {/* Step 1: Category Selection */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[15px]">
                <Tag size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
                Step 1: Record Category
              </div>
              <select 
                value={category} 
                onChange={(e) => {
                  setCategory(e.target.value);
                  setTest('');
                }} 
                className="w-full bg-white border border-[#00A3FF] rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-[#00A3FF]/20 shadow-sm cursor-pointer"
              >
                <option value="">-- Select Category --</option>
                <option value="General">General History</option>
                <option value="Clinical">Clinical History</option>
              </select>
            </div>

            {/* Step 2: Form/Record Type */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[15px]">
                <ListChecks size={16} className="text-emerald-500" strokeWidth={2.5} />
                Step 2: View Type
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormType('new')} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all text-sm font-bold shadow-sm ${formType === 'new' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-emerald-200 bg-white text-emerald-400 hover:border-emerald-400 hover:bg-emerald-50/50'}`}>
                  <PlusCircle size={16} strokeWidth={2.5} /> Full
                </button>
                <button type="button" onClick={() => setFormType('existing')} className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all text-sm font-bold shadow-sm ${formType === 'existing' ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-amber-200 bg-white text-amber-400 hover:border-amber-400 hover:bg-amber-50/50'}`}>
                  <Clock size={16} strokeWidth={2.5} /> Summary
                </button>
              </div>
            </div>

            {/* Step 3: Specific Item Selection */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 font-bold text-[15px]">
                <Droplet size={16} className="text-rose-400 fill-rose-100" strokeWidth={2.5} />
                Step 3: Select Detail
              </div>
              <select 
                value={test} 
                onChange={handleTestSelection} 
                disabled={!category}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#00A3FF] focus:ring-2 focus:ring-[#00A3FF]/20 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">-- Select Item --</option>
                {category === 'General' && (
                  <>
                    <option value="Visit-History">Visit History</option>
                    <option value="Patient-Overview">Patient Overview</option>
                  </>
                )}
                {category === 'Clinical' && (
                  <>
                    <option value="Lab-Results">Lab Results</option>
                    <option value="Medication-Log">Medication Log</option>
                  </>
                )}
              </select>
            </div>

            {/* Summary Box */}
            <div className="mt-2 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col gap-1.5 text-sm text-slate-800">
              <div><span className="font-black">Category:</span> {category || '—'}</div>
              <div><span className="font-black">Type:</span> {formType ? (formType === 'new' ? 'Full' : 'Summary') : '—'}</div>
              <div><span className="font-black">Detail:</span> {test || '—'}</div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="border-t border-slate-200 p-4 bg-slate-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
              <Info size={14} />
              {test ? 'Ready to view' : 'Complete selections'}
            </div>
            
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-sm">
                Close
              </button>

              {test && formType && category && (
                <button 
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="bg-[#00A3FF] hover:bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition-colors shadow-sm animate-in zoom-in"
                >
                  View Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Note: Form rendering logic removed as per request for new data connection. 
          Insert your new History Detail component below when ready.
      */}
      {isFormOpen && (
         <div className="fixed inset-0 z-[70] bg-white flex items-center justify-center p-10">
             <div className="text-center">
                 <Activity size={48} className="mx-auto text-[#00A3FF] mb-4" />
                 <h2 className="text-2xl font-bold">History Detail View</h2>
                 <p className="text-slate-500">Connecting to history data for: {test}</p>
                 <button 
                   onClick={() => setIsFormOpen(false)}
                   className="mt-6 bg-[#00A3FF] text-white px-6 py-2 rounded-lg font-bold"
                 >
                    Back to Workflow
                 </button>
             </div>
         </div>
      )}
    </>
  );
};

export default HistoryTemplate;