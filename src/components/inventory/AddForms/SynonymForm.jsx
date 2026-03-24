import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, BookOpen, Hash, Tag, Save, RotateCcw } from 'lucide-react';

const SynonymForm = ({ initialData, onClose, onSave }) => {
  const [synonymInput, setSynonymInput] = useState("");
  const [synonymsList, setSynonymsList] = useState([]);

  useEffect(() => {
    if (initialData) {
      setSynonymsList(initialData.synonyms || []);
    } else {
      setSynonymsList([]);
    }
  }, [initialData]);

  const addSynonym = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (!synonymInput.trim()) return;
      
      const newSynonym = {
        id: Date.now(),
        name: synonymInput.trim()
      };
      
      setSynonymsList([...synonymsList, newSynonym]);
      setSynonymInput("");
    }
  };

  const removeSynonym = (id) => {
    setSynonymsList(synonymsList.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(initialData.id, synonymsList);
    onClose();
  };

  return (
    /* Reduced mb-8 to mb-6 */
    <div className="mb-6 bg-white rounded-xl border-2 border-slate-300 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-400">
      
      {/* 💎 Header: Reduced py-4 to py-2.5 */}
      <div className="flex justify-between items-center px-5 py-2.5 bg-[#E0F2FE] border-b-2 border-slate-300">
        <div className="flex items-center gap-3">
          {/* Reduced icon container from w-10 h-10 to w-9 h-9 */}
          <div className="w-8 h-8 flex items-center justify-center bg-[#00A3FF] rounded-lg shadow-md text-white">
            <BookOpen size={16} strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-[13px] font-black text-[#004A7C] uppercase tracking-tight leading-none">
              Manage Synonyms
            </h3>
            <p className="text-[9px] text-[#00A3FF] font-bold uppercase tracking-widest mt-1 opacity-80">
              Ingredient Mapping
            </p>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1 bg-[#ef4444] text-white rounded hover:bg-red-600 transition-all active:scale-90"
        >
          <X size={14} strokeWidth={4} />
        </button>
      </div>

      {/* Body: Reduced p-8 to p-5, space-y-8 to space-y-5 */}
      <div className="p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Left Column: Inputs */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 ml-0.5">
                <Tag size={12} className="text-[#00A3FF]" /> Selected Ingredient
              </label>
              {/* Reduced h-[52px] to h-[40px] */}
              <input 
                type="text" 
                readOnly 
                value={initialData?.name || "No Ingredient Selected"} 
                className="w-full h-[40px] px-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-500 outline-none cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 ml-0.5">
                <Plus size={12} className="text-[#00A3FF]" /> Add New Synonym
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter synonym..." 
                  value={synonymInput}
                  onChange={(e) => setFormData ? null : setSynonymInput(e.target.value)}
                  onKeyDown={addSynonym}
                  className="flex-1 h-[40px] px-4 bg-white border-2 border-slate-200 rounded-xl text-[13px] font-bold text-slate-700 focus:border-[#00A3FF] transition-all outline-none"
                />
                <button 
                  type="button"
                  onClick={addSynonym}
                  className="w-[40px] h-[40px] bg-[#00A3FF] text-white rounded-xl hover:bg-[#008bdb] transition-all flex items-center justify-center shadow-md shadow-blue-50"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Synonym Table */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-500 ml-0.5">
              <Hash size={12} className="text-[#00A3FF]" /> Current List
            </label>
            <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b-2 border-slate-200">
                    <th className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase w-10 text-center border-r-2 border-slate-200">#</th>
                    <th className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase border-r-2 border-slate-200">Name</th>
                    <th className="px-3 py-1.5 text-[9px] font-black text-slate-400 uppercase text-center w-12">Del</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {synonymsList.map((s, index) => (
                    <tr key={s.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-3 py-1 text-[11px] font-bold text-slate-400 text-center border-r-2 border-slate-100">{index + 1}</td>
                      <td className="px-3 py-1 text-[12px] font-black text-slate-700 border-r-2 border-slate-100">{s.name}</td>
                      <td className="px-3 py-1 text-center">
                        <button 
                          onClick={() => removeSynonym(s.id)}
                          className="text-red-400 hover:text-red-600 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {synonymsList.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-3 py-6 text-center text-slate-300 text-[10px] font-bold uppercase italic">
                        No Synonyms
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons: Reduced padding and heights */}
        <div className="flex justify-end gap-3 pt-3 border-t-2 border-slate-100">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <RotateCcw size={14} /> Cancel
          </button>
          <button 
            type="button"
            onClick={handleSubmit}
            className="px-8 py-2 bg-[#66BB6A] hover:bg-[#4CAF50] text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-green-50"
          >
            <Save size={14} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SynonymForm;