import React, { useState } from 'react';
import { 
  X, Beaker, FlaskConical, DollarSign 
} from 'lucide-react';

const Ingredient2Click = ({ initialData, onClose }) => {
  // Data modeled EXACTLY from your screenshot
  const [ingredients, setIngredients] = useState([
    { id: 1, common: 'Acacia', scientific: 'Acacia Dealbata', vol: 10.00, price: 49.2, isMix: true },
    { id: 2, common: 'Alder, Red', scientific: 'Alder Rubra', vol: 10.00, price: 0.0, isMix: true },
    { id: 3, common: 'Ash, White', scientific: 'Fraxinus Americana', vol: 10.00, price: 32.8, isMix: false },
    { id: 4, common: 'Beech, American', scientific: 'Fagus Grandifolia', vol: 10.00, price: 49.2, isMix: false },
    { id: 5, common: 'Gs Birch Mix', scientific: 'Betula Lenta, Populifolia, Nigra', vol: 10.00, price: 32.8, isMix: false },
    { id: 6, common: 'Box Elder', scientific: 'Acer Negundo', vol: 10.00, price: 32.8, isMix: false },
    { id: 7, common: 'Cedar, Mountain', scientific: 'Juniperus Ashei', vol: 10.00, price: 32.8, isMix: false },
    { id: 8, common: 'Cottonwood', scientific: 'Populus Deltoides', vol: 10.00, price: 32.8, isMix: false },
    { id: 9, common: 'Cypress Arizona', scientific: 'Callitropsis Arizonica', vol: 10.00, price: 32.8, isMix: false },
    { id: 10, common: 'Elm, American', scientific: 'Ulmus Americana', vol: 10.00, price: 0.0, isMix: false },
  ]);

  const toggleMix = (id) => {
    setIngredients(prev => prev.map(ing => 
      ing.id === id ? { ...ing, isMix: !ing.isMix } : ing
    ));
  };

  const totalVolume = ingredients.reduce((sum, item) => sum + item.vol, 0);
  const totalPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
  const mixVolume = ingredients.filter(i => i.isMix).reduce((sum, item) => sum + item.vol, 0);

  return (
    <div className="w-full max-w-5xl bg-white border-2 border-sky-200 rounded-lg shadow-lg mb-5 animate-in slide-in-from-top-3 fade-in duration-300 overflow-hidden flex flex-col max-h-[85vh]">
      
      {/* HEADER: Light sky gradient (Exact Match) */}
      <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-5 py-2.5 flex items-center justify-between border-b border-sky-200 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
            <Beaker size={16} className="text-[#00A3FF]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-bold text-sky-900 text-[13px] tracking-wide uppercase leading-tight">
              Ingredient Details
            </h3>
          </div>
        </div>
        
        <button 
          type="button" 
          onClick={onClose} 
          className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-1.5 transition-all shadow-sm"
        >
          <X size={14} strokeWidth={3} />
        </button>
      </div>

      {/* BODY: Exact white/50 bg */}
      <div className="flex-1 overflow-y-auto p-5 bg-white/50 flex flex-col gap-5">
        
        {/* Top Controls: Read-only Injection Display */}
        <div className="flex flex-col gap-1.5 md:w-1/2">
          <label className="text-[11px] font-black text-slate-500 ml-1 uppercase tracking-wider">Selected Injection</label>
          <div className="relative flex items-center w-full h-[40px] border-2 border-slate-200 bg-slate-50 rounded-lg pl-9 pr-4">
            <FlaskConical className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={14} />
            <span className="text-[13px] font-bold text-slate-700">
              {initialData?.name || 'TREE MIX 1-11/25-01'}
            </span>
          </div>
        </div>

        {/* INGREDIENTS TABLE: Highly visible borders & Lite Green selection */}
        <div className="bg-white border-2 border-slate-300 rounded-lg overflow-hidden shadow-sm relative">
          <table className="w-full text-left border-collapse">
            
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider text-center w-12 border border-slate-300">Id</th>
                <th className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider border border-slate-300">Common Name</th>
                <th className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider border border-slate-300">Scientific Name</th>
                <th className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider text-center w-28 border border-slate-300">Vol</th>
                <th className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider text-center w-28 border border-slate-300">Price</th>
                <th className="px-4 py-2.5 text-[11px] font-black text-slate-600 uppercase tracking-wider text-center w-20 border border-slate-300">isMix</th>
              </tr>
            </thead>
            
            <tbody>
              {/* Group Header */}
              <tr className="bg-sky-50/80">
                <td colSpan={6} className="py-2 text-center text-[11px] font-black text-sky-800 uppercase tracking-widest border border-slate-300">
                  {initialData?.name || 'TREE MIX 1-11/25-01'}
                </td>
              </tr>

              {/* Data Rows */}
              {ingredients.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => toggleMix(item.id)}
                  className={`group transition-colors cursor-pointer ${
                    item.isMix ? 'bg-emerald-50 hover:bg-emerald-100' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <td className="px-4 py-2 text-center text-[12px] font-bold text-slate-500 border border-slate-300">
                    {item.id}
                  </td>
                  <td className={`px-4 py-2 text-[13px] font-bold border border-slate-300 ${item.isMix ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {item.common}
                  </td>
                  <td className="px-4 py-2 text-[12px] font-medium text-slate-500 border border-slate-300">
                    {item.scientific}
                  </td>
                  <td className="px-4 py-2 border border-slate-300 text-center">
                    <span className="text-[12px] font-semibold text-slate-700">{item.vol.toFixed(2)} mL</span>
                  </td>
                  <td className="px-4 py-2 border border-slate-300 text-center">
                    <span className={`text-[12px] font-semibold ${item.price === 0 ? 'text-slate-300' : 'text-slate-700'}`}>
                      {item.price > 0 ? `$${item.price.toFixed(2)}` : '-'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-center border border-slate-300">
                    {/* FIXED CHECKBOX: pointer-events-none ensures the row gets the click */}
                    <input 
                      type="checkbox" 
                      checked={item.isMix} 
                      readOnly
                      className="w-4 h-4 accent-emerald-500 rounded border-slate-400 pointer-events-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>

            {/* TOTALS FOOTER */}
            <tfoot className="bg-sky-50 sticky bottom-0 z-10">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right text-[11px] font-black text-sky-900 uppercase tracking-widest border border-slate-300">
                  Totals:
                </td>
                <td className="px-4 py-3 text-center text-[12px] font-black text-sky-900 border border-slate-300">
                  {totalVolume.toFixed(2)} mL
                </td>
                <td className="px-4 py-3 text-center text-[12px] font-black text-rose-600 border border-slate-300 flex items-center justify-center gap-0.5">
                  <DollarSign size={13} strokeWidth={3} /> {totalPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-center text-[12px] font-black text-emerald-600 border border-slate-300">
                  {mixVolume.toFixed(2)} mL
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ACTION FOOTER: View Only Mode with Brand Button */}
      <div className="bg-white border-t border-sky-200 px-5 py-4 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[10px] font-black uppercase tracking-widest">Total Ingredients: {ingredients.length}</span>
         </div>
         <div className="flex items-center gap-3">
            {/* UPDATED BUTTON COLOR */}
            <button 
              onClick={onClose} 
              className="bg-[#00A3FF] hover:bg-[#008CE6] text-white h-[40px] px-8 rounded-lg text-[12px] font-black uppercase tracking-wider shadow-md transition-all active:scale-95 flex items-center justify-center"
            >
              Close Details
            </button>
         </div>
      </div>
    </div>
  );
};

export default Ingredient2Click;