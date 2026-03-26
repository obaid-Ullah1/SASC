import React from 'react';
import { X, Printer, Check } from 'lucide-react';

const RadioTestResult = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  // Exact 9 panels from the provided design screenshot
  const panels = [
    {
      title: "SPT-90 – Extract Tree (T1)",
      items: [
        { id: "T01", name: "Control", score: 0 },
        { id: "T02", name: "Histamine", score: 4 },
        { id: "T03", name: "Acacia", score: 2 },
        { id: "T04", name: "Alder, Red", score: 0 },
        { id: "T05", name: "Ash, White", score: 3 },
        { id: "T06", name: "Beech, American", score: 0 },
        { id: "T07", name: "Gs Birch Mix", score: 0 },
        { id: "T08", name: "Box Elder", score: 0 },
        { id: "T09", name: "Cedar, Mountain", score: 0 },
        { id: "T10", name: "Cottonwood", score: 0 },
      ]
    },
    {
      title: "SPT-90 – Extract Tree (T2)",
      items: [
        { id: "T11", name: "Cypress Arizona", score: 0 },
        { id: "T12", name: "Elm, American", score: 0 },
        { id: "T13", name: "Maple, Red", score: 0 },
        { id: "T14", name: "Mesquite", score: 0 },
        { id: "T15", name: "Mulberry, Red", score: 0 },
        { id: "T16", name: "Gs Eastern Oak Mix", score: 0 },
        { id: "T17", name: "Olive", score: 2 },
        { id: "T18", name: "Pine, Ponderosa", score: 0 },
        { id: "T19", name: "Privet, Common", score: 0 },
        { id: "T20", name: "Sycamore, Eastern", score: 0 },
      ]
    },
    {
      title: "SPT-90 – Extract Tree (T3)",
      items: [
        { id: "T21", name: "Walnut, Black", score: 4 },
        { id: "T22", name: "Willow, Black", score: 0 },
        { id: "T23", name: "Aspen", score: 0 },
        { id: "T24", name: "Eucalyptus", score: 0 },
        { id: "T25", name: "Juniper, western", score: 0 },
        { id: "T26", name: "Palm, Queen", score: 0 },
        { id: "T27", name: "Pecan", score: 4 },
        { id: "T28", name: "Pepper, Green", score: 0 },
        { id: "T29", name: "Poplar", score: 0 },
        { id: "T30", name: "Sweet Gum", score: 0 },
      ]
    },
    {
      title: "SPT-90 – Extract Grass (G1)",
      items: [
        { id: "G01", name: "Allermed Bermuda", score: 4 },
        { id: "G02", name: "Johnson Grass", score: 4 },
        { id: "G03", name: "Orchard", score: 4 },
        { id: "G04", name: "Perennial Rye", score: 4 },
        { id: "G05", name: "Timothy", score: 4 },
        { id: "G06", name: "Kentucky Blue", score: 4 },
        { id: "G07", name: "Meadow Fescue", score: 4 },
        { id: "G08", name: "Cultivated Corn", score: 4 },
        { id: "G09", name: "Cultivated Oat", score: 4 },
        { id: "G10", name: "Rye, Cultivated", score: 4 },
      ]
    },
    {
      title: "SPT-90 – Extract Weed (W1)",
      items: [
        { id: "W01", name: "Cocklebur", score: 0 },
        { id: "W02", name: "Plantain, English", score: 0 },
        { id: "W03", name: "Firebush/Kochia", score: 0 },
        { id: "W04", name: "Lamb's Quarter", score: 0 },
        { id: "W05", name: "Nettle", score: 0 },
        { id: "W06", name: "Pigweed, Rough", score: 2 },
        { id: "W07", name: "Ragweed, Western", score: 3 },
        { id: "W08", name: "Russian Thistle", score: 0 },
        { id: "W09", name: "Sagebrush, Common", score: 0 },
        { id: "W10", name: "Sheep Sorrel", score: 2 },
      ]
    },
    {
      title: "SPT-90 – Extract Weed (W2)",
      items: [
        { id: "W11", name: "Alfalfa", score: 0 },
        { id: "W12", name: "Dog Fennel", score: 0 },
        { id: "W13", name: "Ragweed, false", score: 0 },
        { id: "W14", name: "Goldenrod", score: 0 },
        { id: "W15", name: "Marsh Elder, Burweed", score: 0 },
        { id: "W16", name: "Mugwort, Common", score: 0 },
        { id: "W17", name: "Palmer's Amaranth", score: 0 },
        { id: "W18", name: "Saltbush, Annual", score: 0 },
        { id: "W19", name: "Gs Scale/Atriplex", score: 0 },
        { id: "W20", name: "Dock, Yellow", score: 0 },
      ]
    },
    {
      title: "SPT-90 – Extract Mold (M1)",
      items: [
        { id: "M01", name: "Alternaria Alternata", score: 0 },
        { id: "M02", name: "Aspergillus Fumigatus", score: 0 },
        { id: "M03", name: "Hormodendrum", score: 0 },
        { id: "M04", name: "Gs Penicillium Mix", score: 0 },
        { id: "M05", name: "Candida Albicans", score: 0 },
        { id: "M06", name: "Fusarium", score: 0 },
        { id: "M07", name: "Neurospora", score: 0 },
        { id: "M08", name: "Phoma Betae", score: 0 },
        { id: "M09", name: "Trichophyton", score: 0 },
        { id: "M10", name: "Saccharomyc", score: 0 },
      ]
    },
    {
      title: "SPT-90 – Extract Epithelia (E1)",
      items: [
        { id: "E01", name: "D. Farinae", score: 0 },
        { id: "E02", name: "D. Pteronyssinus", score: 0 },
        { id: "E03", name: "Cat", score: 2 },
        { id: "E04", name: "Dog Epithelia", score: 0 },
        { id: "E05", name: "Gs Mixed Feather", score: 0 },
        { id: "E06", name: "Cockroach Mix", score: 0 },
        { id: "E07", name: "Cattle", score: 0 },
        { id: "E08", name: "Horse Epithelia", score: 0 },
        { id: "E09", name: "Hamster", score: 0 },
        { id: "E10", name: "Rabbit Epithelia", score: 0 },
      ]
    },
    {
      title: "SPT-90 – Extract Food (F01)",
      items: [
        { id: "F01", name: "Cow's Milk", score: 0 },
        { id: "F02", name: "Egg White", score: 0 },
        { id: "F03", name: "Almond", score: 0 },
        { id: "F04", name: "Peanut", score: 0 },
        { id: "F05", name: "Whole Wheat", score: 0 },
        { id: "F06", name: "Corn", score: 0 },
        { id: "F07", name: "Soybean", score: 0 },
        { id: "F08", name: "Tomato", score: 0 },
        { id: "F09", name: "Shrimp", score: 0 },
        { id: "F10", name: "Tuna", score: 0 },
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[1550px] h-[98vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-300 animate-in zoom-in-95 duration-300">
        
        {/* --- HEADER --- */}
        <div className="bg-white px-6 py-3 border-b flex items-center justify-between shrink-0 relative">
          <div className="flex items-center gap-3">
             <img src="/download.png" alt="Logo" className="h-9 object-contain" />
             <div className="flex flex-col">
               <span className="text-[12px] font-black text-slate-800 leading-tight uppercase tracking-wider">Sierra Allergy</span>
               <span className="text-[9px] font-bold text-slate-500 leading-none">Asthma and Sinus Center</span>
             </div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <h2 className="text-[#00A3FF] text-[18px] font-black uppercase tracking-tighter">SPT-90</h2>
             <p className="text-slate-600 text-[12px] font-bold">{data?.patient || "Gonzalez, Eliana"}</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="bg-[#00A3FF] text-white p-1.5 rounded-lg hover:bg-[#008fdf] transition-all">
               <Printer size={18} />
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-rose-500 p-1.5 transition-all">
              <X size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* --- REPORT CONTENT: 9 PANELS --- */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
            {panels.map((panel, idx) => (
              <div key={idx} className="flex flex-col border-2 border-slate-800 rounded shadow-sm overflow-hidden bg-white">
                <div className="bg-[#2A333A] text-white px-3 py-1 text-[11px] font-bold tracking-wider uppercase">
                  {panel.title}
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b-2 border-slate-800 text-[10px] font-black text-slate-700 uppercase text-center">
                      <th className="px-1 py-1 border-r border-slate-800 w-8">#</th>
                      <th className="px-2 py-1 border-r border-slate-800 text-left">Ingredient</th>
                      {[0, 1, 2, 3, 4].map(n => <th key={n} className="w-7 border-r border-slate-800">{n}</th>)}
                      <th className="w-8">ID</th>
                    </tr>
                  </thead>
                  <tbody className="text-[10.5px]">
                    {panel.items.map((item, i) => (
                      <tr key={i} className="border-b border-slate-300">
                        <td className="px-1 py-1 border-r border-slate-800 font-bold text-center text-slate-600">{item.id}</td>
                        <td className="px-2 py-1 border-r border-slate-800 font-bold text-slate-800 truncate max-w-[120px]">{item.name}</td>
                        {[0, 1, 2, 3, 4].map(n => (
                          <td key={n} className="border-r border-slate-800 text-center align-middle h-6">
                            {item.score === n && <Check size={14} className="mx-auto text-black" strokeWidth={3} />}
                          </td>
                        ))}
                        <td className="px-1 py-1"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* --- HORIZONTAL LEGEND BAR --- */}
          <div className="mt-6 border-2 border-black bg-white py-1.5 text-center text-[11px] font-bold text-slate-700 uppercase">
             0 (&gt;0 mm No reaction), 1+ (1-3 mm Mild), 2+ (4-8 mm Moderate), 3+ (9-12 mm Strong), 4+ (13-99 mm Very strong or pseudopod)
          </div>

          {/* --- SIGNATURES GRID --- */}
          <div className="mt-8 grid grid-cols-3 gap-10">
            {/* Provider 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked readOnly className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Asif Khan (T1,T2,T3,G1,W1,W2,M1,E1,F01)</span>
              </div>
              <div className="text-[10px] font-black text-slate-500 mb-4 ml-5">Signature: ____________________</div>
              <div className="space-y-1 ml-5 text-[10px] font-black text-slate-700">
                <div>Date : <span className="text-black">3/16/2026</span></div>
                <div>SPT : <span className="text-black">80/20</span></div>
                <div>MA : __________________</div>
              </div>
            </div>

            {/* Provider 2 */}
            <div className="flex flex-col border-l border-slate-300 pl-6">
               <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black text-slate-800 uppercase">SPT Ordering Provider:</span>
              </div>
              <div className="text-[10px] font-black text-slate-500 mb-4 ml-5 text-center">Signature: ____________________</div>
              <div className="space-y-1 ml-5 text-[10px] font-black text-slate-700">
                <div>Date : __________</div>
                <div>SPT : __________</div>
                <div>MA : __________</div>
              </div>
            </div>

            {/* Provider 3 */}
            <div className="flex flex-col border-l border-slate-300 pl-6">
               <div className="flex items-center gap-2 mb-2">
                <input type="checkbox" className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black text-slate-800 uppercase">IDs Ordering Provider:</span>
              </div>
              <div className="text-[10px] font-black text-slate-500 mb-4 ml-5 text-center">Signature: ____________________</div>
              <div className="space-y-1 ml-5 text-[10px] font-black text-slate-700">
                <div>Date : __________</div>
                <div>IDs : <span className="text-black">0</span></div>
                <div>MA : __________</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FOOTER ACTIONS --- */}
        <div className="bg-slate-50 px-6 py-3 border-t flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-sm">
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadioTestResult;