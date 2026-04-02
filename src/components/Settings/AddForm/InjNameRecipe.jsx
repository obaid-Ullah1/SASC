import React, { useState } from 'react';
import { 
  Tag, Calendar, ListFilter, Filter, Syringe, 
  ChevronDown, ChevronRight, CheckSquare, X, Save,
  CheckCircle2
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_SUGGESTIONS = [
  {
    id: 'inj-1',
    title: 'SUGGESTED INJ 1',
    subtitle: 'Coverage Classification',
    theme: 'bg-blue-50 border-blue-300 text-blue-900',
    badge: 'border-blue-400 text-blue-700',
    groupActive: true, 
    ingredients: [
      { id: 1, group: 'Group1', name: 'Histamine', panel: 'Extract Tree (T1)', patients: 498, coverage: '2.57%', active: true },
      { id: 2, group: 'Group1', name: 'Allermed Bermuda', panel: 'Extract Grass (G1)', patients: 448, coverage: '4.89%', active: true },
      { id: 3, group: 'Group1', name: 'Acacia', panel: 'Extract Tree (T1)', patients: 433, coverage: '7.12%', active: true },
      { id: 4, group: 'Group1', name: 'Alder, Red', panel: 'Extract Tree (T1)', patients: 414, coverage: '9.26%', active: true },
      { id: 5, group: 'Group1', name: 'Perennial Rye', panel: 'Extract Grass (G1)', patients: 412, coverage: '11.39%', active: true },
      { id: 6, group: 'Group1', name: 'Firebush/Kochia', panel: 'Extract Weed (W1)', patients: 402, coverage: '13.46%', active: true },
      { id: 7, group: 'Group1', name: 'Plantain, English', panel: 'Extract Weed (W1)', patients: 401, coverage: '15.53%', active: true },
      { id: 8, group: 'Group1', name: 'Box Elder', panel: 'Extract Tree (T1)', patients: 393, coverage: '17.56%', active: true },
      { id: 9, group: 'Group1', name: 'Gs Birch Mix', panel: 'Extract Tree (T1)', patients: 390, coverage: '19.58%', active: true },
      { id: 10, group: 'Group1', name: 'Pigweed, Rough', panel: 'Extract Weed (W1)', patients: 389, coverage: '21.59%', active: true },
    ]
  },
  {
    id: 'inj-2',
    title: 'SUGGESTED INJ 2',
    subtitle: 'Coverage Classification',
    theme: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    badge: 'border-emerald-400 text-emerald-700',
    groupActive: true, 
    ingredients: [
      { id: 11, group: 'Group1', name: 'Firebush/Kochia', panel: 'Extract Weed (W1)', patients: 402, coverage: '13.46%', active: true },
      { id: 12, group: 'Group1', name: 'Plantain, English', panel: 'Extract Weed (W1)', patients: 401, coverage: '15.53%', active: true },
      { id: 13, group: 'Group1', name: 'Box Elder', panel: 'Extract Tree (T1)', patients: 393, coverage: '17.56%', active: true },
      { id: 14, group: 'Group1', name: 'Gs Birch Mix', panel: 'Extract Tree (T1)', patients: 390, coverage: '19.58%', active: true },
      { id: 15, group: 'Group1', name: 'Pigweed, Rough', panel: 'Extract Weed (W1)', patients: 389, coverage: '21.59%', active: true },
    ]
  },
  {
    id: 'inj-3',
    title: 'SUGGESTED INJ 3',
    subtitle: 'Coverage Classification',
    theme: 'bg-orange-50 border-orange-300 text-orange-900',
    badge: 'border-orange-400 text-orange-700',
    groupActive: true, 
    ingredients: [
      { id: 21, group: 'Group1', name: 'Histamine', panel: 'Extract Tree (T1)', patients: 498, coverage: '2.57%', active: true },
      { id: 22, group: 'Group1', name: 'Allermed Bermuda', panel: 'Extract Grass (G1)', patients: 448, coverage: '4.89%', active: true },
      { id: 23, group: 'Group1', name: 'Acacia', panel: 'Extract Tree (T1)', patients: 433, coverage: '7.12%', active: true },
      { id: 24, group: 'Group1', name: 'Alder, Red', panel: 'Extract Tree (T1)', patients: 414, coverage: '9.26%', active: true },
      { id: 25, group: 'Group1', name: 'Perennial Rye', panel: 'Extract Grass (G1)', patients: 412, coverage: '11.39%', active: true },
      { id: 26, group: 'Group1', name: 'Firebush/Kochia', panel: 'Extract Weed (W1)', patients: 402, coverage: '13.46%', active: true },
      { id: 27, group: 'Group1', name: 'Plantain, English', panel: 'Extract Weed (W1)', patients: 401, coverage: '15.53%', active: true },
      { id: 28, group: 'Group1', name: 'Box Elder', panel: 'Extract Tree (T1)', patients: 393, coverage: '17.56%', active: true },
      { id: 29, group: 'Group1', name: 'Gs Birch Mix', panel: 'Extract Tree (T1)', patients: 390, coverage: '19.58%', active: true },
      { id: 30, group: 'Group1', name: 'Pigweed, Rough', panel: 'Extract Weed (W1)', patients: 389, coverage: '21.59%', active: true },
    ]
  }
];

const InjNameRecipe = ({ onCancel, onSaveComplete }) => {
  const [hasApplied, setHasApplied] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(['inj-1', 'inj-2', 'inj-3']);
  const [recipeData, setRecipeData] = useState(MOCK_SUGGESTIONS);
  
  // State specifically for the review modal to manage editable percentages
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  const handleApplyFilters = () => setHasApplied(true);

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const toggleIngredientActive = (groupId, ingredientId) => {
    setRecipeData(prevData => prevData.map(group => {
      if (group.id !== groupId) return group;
      return {
        ...group,
        ingredients: group.ingredients.map(ing => 
          ing.id === ingredientId ? { ...ing, active: !ing.active } : ing
        )
      };
    }));
  };

  // UPDATED: Now only toggles the header group active state without affecting ingredients
  const toggleGroupActive = (e, groupId) => {
    e.stopPropagation();
    setRecipeData(prevData => prevData.map(group => {
      if (group.id !== groupId) return group;
      return {
        ...group,
        groupActive: !group.groupActive
      };
    }));
  };

  // Prepares the review data with default percentages when modal opens
  const handleReviewAndSave = () => {
    const activeGroupsForReview = recipeData
      .filter(g => g.groupActive) 
      .map(g => {
        const activeIngs = g.ingredients.filter(ing => ing.active);
        // Calculate default equal percentages to sum to 100
        const defaultPct = activeIngs.length > 0 ? (100 / activeIngs.length).toFixed(2) : "0";
        
        return {
          ...g,
          ingredients: activeIngs.map(ing => ({ ...ing, percentage: defaultPct }))
        };
      })
      .filter(g => g.ingredients.length > 0); 

    setReviewData(activeGroupsForReview);
    setShowReviewModal(true);
  };

  // Handles updating the percentage when a user manually types a new value
  const handlePercentageChange = (groupId, ingredientId, value) => {
    setReviewData(prevData => prevData.map(group => {
      if (group.id !== groupId) return group;
      return {
        ...group,
        ingredients: group.ingredients.map(ing => 
          ing.id === ingredientId ? { ...ing, percentage: value } : ing
        )
      };
    }));
  };

  const handleConfirmAndSave = () => {
    if (onSaveComplete) onSaveComplete(reviewData);
  };

  // Used just to determine if the review button should be disabled
  const hasActiveIngredients = recipeData.some(g => g.groupActive && g.ingredients.some(i => i.active));

  return (
    <>
      {/* Added `antialiased` for crisp text rendering */}
      <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg border-2 border-slate-300 overflow-hidden relative font-sans antialiased">
        
        {/* HEADER */}
        <div className="bg-[#1a73e8] px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 text-white">
            <Tag size={20} strokeWidth={2.5} />
            <h2 className="text-[16px] font-semibold tracking-wide">Injection Recipes</h2>
          </div>
          <button onClick={onCancel} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm shrink-0">
            <X size={16} strokeWidth={3} />
          </button>
        </div>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 bg-slate-50 p-4 md:p-6 overflow-hidden flex flex-col">
          <div className="max-w-7xl mx-auto flex flex-col gap-6 w-full h-full">
            
            {/* FILTER BAR */}
            <div className="bg-white border-2 border-slate-300 rounded-xl p-5 shadow-sm flex flex-wrap items-end gap-5 shrink-0">
              <div className="flex-1 min-w-[160px]">
                <label className="text-[#1a73e8] text-[13px] font-semibold mb-1.5 flex items-center gap-1.5"><Tag size={15} /> Group</label>
                <select className="w-full h-[40px] border-2 border-slate-300 rounded-lg text-[13px] px-3 font-medium text-slate-800 outline-none focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 cursor-pointer">
                  <option>All Groups</option>
                  <option>Group1</option>
                  <option>Group2</option>
                  <option>Group3</option>
                  <option>Group4</option>
                </select>
              </div>

              <div className="flex-1 min-w-[160px]">
                <label className="text-[#1a73e8] text-[13px] font-semibold mb-1.5 flex items-center gap-1.5"><Calendar size={15} /> Date From</label>
                <input type="date" defaultValue="2025-01-01" className="w-full h-[40px] border-2 border-slate-300 rounded-lg text-[13px] px-3 font-medium text-slate-800 outline-none focus:border-[#1a73e8]" />
              </div>

              <div className="flex-1 min-w-[160px]">
                <label className="text-[#1a73e8] text-[13px] font-semibold mb-1.5 flex items-center gap-1.5"><Calendar size={15} /> Date To</label>
                <input type="date" defaultValue="2026-04-01" className="w-full h-[40px] border-2 border-slate-300 rounded-lg text-[13px] px-3 font-medium text-slate-800 outline-none focus:border-[#1a73e8]" />
              </div>

              <div className="flex-1 min-w-[160px]">
                <label className="text-[#1a73e8] text-[13px] font-semibold mb-1.5 flex items-center gap-1.5"><ListFilter size={15} /> Group Rule</label>
                <select className="w-full h-[40px] border-2 border-slate-300 rounded-lg text-[13px] px-3 font-medium text-slate-800 outline-none focus:border-[#1a73e8] cursor-pointer">
                  <option>All Rules</option>
                  <option>Rule 1/25</option>
                </select>
              </div>

              <button onClick={handleApplyFilters} className="h-[40px] bg-[#00A3FF] hover:bg-[#008CE6] text-white px-8 rounded-lg font-bold text-[13px] tracking-wide flex items-center gap-2 transition-all active:scale-95 shadow-md shrink-0 border border-transparent">
                <Filter size={16} /> Apply
              </button>
            </div>

            {/* RESULTS TABLE */}
            <div className="bg-white border-2 border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col flex-1 min-h-[300px]">
              <div className="bg-[#178a8d] text-white px-5 py-3 flex items-center gap-2.5 shrink-0 border-b-2 border-[#126b6e]">
                <Syringe size={16} strokeWidth={2.5} />
                <span className="font-semibold text-[14px] tracking-wide">Injection Coverage Result</span>
              </div>
              
              <div className="overflow-auto flex-1 custom-scrollbar max-h-[55vh] relative">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="sticky top-0 bg-slate-100 border-b-2 border-slate-300 z-10 shadow-[0_2px_5px_rgba(0,0,0,0.05)]">
                    <tr>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider w-12 border-r border-slate-300 bg-slate-100">#</th>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-300 w-32 bg-slate-100">Group</th>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-300 bg-slate-100">Ingredient</th>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-300 bg-slate-100">Panel</th>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-300 text-center w-28 bg-slate-100">Patients</th>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider border-r border-slate-300 text-center w-32 bg-slate-100">% Coverage</th>
                      <th className="px-5 py-3 text-[12px] font-semibold text-slate-600 uppercase tracking-wider text-center w-24 bg-slate-100">Active</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {!hasApplied ? (
                      <tr>
                        <td colSpan="7" className="px-5 py-20 text-center text-[14px] font-medium text-slate-500 bg-white">
                          Please apply filters to generate injection recipes.
                        </td>
                      </tr>
                    ) : (
                      recipeData.map((group) => (
                        <React.Fragment key={group.id}>
                          {/* GROUP HEADER ROW */}
                          <tr 
                            onClick={() => toggleGroup(group.id)}
                            className={`border-b-2 border-l-4 cursor-pointer select-none transition-colors hover:brightness-95 ${group.theme}`}
                          >
                            <td className="px-3 py-3 text-center border-r border-slate-300">
                              {expandedGroups.includes(group.id) ? <ChevronDown size={18} className="mx-auto" /> : <ChevronRight size={18} className="mx-auto" />}
                            </td>
                            <td colSpan="6" className="px-4 py-3">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                  <button 
                                    onClick={(e) => toggleGroupActive(e, group.id)}
                                    className={`w-5 h-5 rounded flex items-center justify-center transition-colors border-2 ${
                                      group.groupActive ? 'bg-[#00A3FF] border-[#00A3FF] text-white' : 'border-slate-400 bg-white'
                                    }`}
                                  >
                                    {group.groupActive && <CheckSquare size={14} strokeWidth={3} className="text-white" />}
                                  </button>
                                  <Tag size={18} strokeWidth={2.5} />
                                  <div className="flex flex-col">
                                    <span className="font-bold text-[14px] text-slate-800">{group.title}</span>
                                    <span className="text-[12px] font-medium text-slate-600">{group.subtitle}</span>
                                  </div>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full border-2 text-[12px] font-semibold bg-white/60 ${group.badge}`}>
                                  {group.ingredients.length} Ingredients
                                </div>
                              </div>
                            </td>
                          </tr>

                          {/* GROUP INGREDIENT ROWS */}
                          {expandedGroups.includes(group.id) && group.ingredients.map((ing, index) => (
                            <tr key={ing.id} className="border-b border-slate-300 hover:bg-slate-50 transition-colors bg-white">
                              <td className="px-5 py-2.5 text-[13px] font-medium text-slate-600 border-r border-slate-300 text-center">{index + 1}</td>
                              <td className="px-5 py-2.5 text-[13px] font-medium text-slate-700 border-r border-slate-300">{ing.group}</td>
                              <td className="px-5 py-2.5 text-[13px] font-semibold text-[#1a73e8] border-r border-slate-300">{ing.name}</td>
                              <td className="px-5 py-2.5 text-[13px] font-medium text-slate-600 border-r border-slate-300">{ing.panel}</td>
                              <td className="px-5 py-2.5 text-[13px] font-semibold text-slate-700 border-r border-slate-300 text-center">{ing.patients}</td>
                              <td className="px-5 py-2.5 text-[13px] font-semibold text-emerald-600 border-r border-slate-300 text-center">{ing.coverage}</td>
                              <td className="px-5 py-2.5 text-center">
                                <button 
                                  onClick={() => toggleIngredientActive(group.id, ing.id)}
                                  className={`w-5 h-5 rounded flex items-center justify-center mx-auto transition-colors border-2 ${
                                    ing.active ? 'bg-[#00A3FF] border-[#00A3FF] text-white' : 'border-slate-400 bg-white'
                                  }`}
                                >
                                  {ing.active && <CheckSquare size={14} strokeWidth={3} className="text-white" />}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* STICKY FOOTER */}
        <div className="bg-white border-t-2 border-slate-300 px-6 py-4 flex items-center justify-end gap-4 shrink-0 z-20">
          <button onClick={onCancel} className="h-[42px] px-8 border-2 border-slate-300 text-slate-600 rounded-lg text-[13px] font-medium hover:bg-slate-100 transition-colors active:scale-95">
            Cancel
          </button>
          <button 
            onClick={handleReviewAndSave}
            disabled={!hasApplied || !hasActiveIngredients}
            className={`h-[42px] px-10 rounded-lg text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-all shadow-md border border-transparent ${
              hasApplied && hasActiveIngredients ? 'bg-[#00A3FF] hover:bg-[#008CE6] text-white active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save size={16} strokeWidth={2.5} /> Review & Save
          </button>
        </div>

      </div>

      {/* ========================================= */}
      {/* REVIEW INJECTION GROUPS MODAL             */}
      {/* ========================================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 antialiased">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border-2 border-slate-300">
            
            {/* Modal Header */}
            <div className="bg-[#1b804e] px-6 py-4 flex items-center justify-between shrink-0 border-b-2 border-[#126b6e]">
              <div className="flex items-center gap-3 text-white">
                <CheckCircle2 size={20} strokeWidth={3} />
                <h2 className="text-[16px] font-semibold tracking-wide">Review Injection Groups</h2>
              </div>
              <button onClick={() => setShowReviewModal(false)} className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm shrink-0">
                <X size={16} strokeWidth={3} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white">
              <h3 className="text-center text-[#1a73e8] font-bold text-[16px] mb-6 tracking-wide underline underline-offset-4 decoration-blue-200">
                Generated Injection Names & Ingredients
              </h3>

              <div className="flex flex-col gap-8 max-w-4xl mx-auto">
                {reviewData.length === 0 ? (
                  <p className="text-center text-slate-500 font-medium py-10">No active ingredients selected to review.</p>
                ) : (
                  reviewData.map((group, index) => {
                    const count = group.ingredients.length;
                    
                    // Dynamic Total Calculation
                    const totalPercentage = group.ingredients.reduce((sum, ing) => {
                      return sum + (parseFloat(ing.percentage) || 0);
                    }, 0).toFixed(2);
                    
                    // ✅ DYNAMIC SEQUENTIAL NAMING RULE: D, E, F based on sequence
                    const suffixLetter = ['D', 'E', 'F', 'G', 'H'][index] || 'D';
                    const generatedName = `SAG1-04/26/${suffixLetter}`;

                    return (
                      <div key={`review-${group.id}`} className="flex flex-col border-2 border-slate-300 rounded-xl overflow-hidden shadow-md">
                        
                        {/* Group Title Bar */}
                        <div className="bg-[#f0f7ff] border-b-2 border-slate-300 px-5 py-4 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 text-[#1a73e8]">
                            <Syringe size={18} strokeWidth={2.5} />
                            <span className="font-bold text-[15px]">{generatedName}</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="bg-[#d1fae5] text-emerald-800 px-4 py-1.5 rounded-full text-[12px] font-semibold border-2 border-emerald-300">
                              {count} Ingredients
                            </span>
                            {/* Dynamically Updated Total Header */}
                            <span className="bg-[#d1fae5] text-emerald-800 px-4 py-1.5 rounded-full text-[12px] font-semibold border-2 border-emerald-300 transition-all duration-200">
                              Total: {totalPercentage}%
                            </span>
                          </div>
                        </div>

                        {/* Ingredients Grid (SUPER THIN ROWS & GAPS) */}
                        <div className="px-5 py-2 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0.5">
                          {group.ingredients.map(ing => (
                            <div key={`rev-ing-${ing.id}`} className="flex items-center justify-between border-b border-slate-200 py-0.5 hover:bg-slate-50 rounded px-1 transition-colors">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={14} strokeWidth={2.5} className="text-emerald-600" />
                                <span className="text-[12px] font-medium text-slate-700 truncate">{ing.name}</span>
                              </div>
                              <div className="flex items-center shadow-sm rounded-md overflow-hidden border-2 border-slate-300 bg-white focus-within:border-[#00A3FF] focus-within:ring-1 focus-within:ring-[#00A3FF] transition-all">
                                {/* Editable Input */}
                                <input 
                                  type="number" 
                                  value={ing.percentage} 
                                  onChange={(e) => handlePercentageChange(group.id, ing.id, e.target.value)}
                                  className="w-14 h-6 text-center text-[12px] font-semibold text-slate-800 outline-none bg-transparent" 
                                />
                                <div className="h-6 w-8 bg-[#00A3FF] border-l-2 border-slate-300 text-white flex items-center justify-center font-bold text-[11px]">
                                  %
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t-2 border-slate-300 px-6 py-4 flex items-center justify-end gap-4 shrink-0">
              <button 
                onClick={() => setShowReviewModal(false)}
                className="h-[42px] px-8 border-2 border-slate-300 text-slate-600 bg-white rounded-lg text-[13px] font-medium hover:bg-slate-100 transition-colors active:scale-95 shadow-sm"
              >
                Back
              </button>
              <button 
                onClick={handleConfirmAndSave}
                disabled={reviewData.length === 0}
                className="h-[42px] px-8 bg-[#00A3FF] hover:bg-[#008CE6] border border-transparent text-white rounded-lg text-[13px] font-bold uppercase tracking-wide transition-colors active:scale-95 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm & Save
              </button>
            </div>

          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f8fafc; border-left: 1px solid #e2e8f0; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
      `}</style>
    </>
  );
};

export default InjNameRecipe;