import React, { useState, useEffect } from 'react';
import { Tag, Search, RefreshCw, Filter, Plus } from 'lucide-react';
import PreparationGrid from '../../components/Injection/PreparationGrid';

const InjPrep = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const mockData = [];
    for (let i = 1; i <= 328; i++) {
      mockData.push({
        id: i,
        type: "Recipe Based",
        name: `TREE MIX ${i}-11/25-01`,
        code: `SA-TREE MIX ${i}-01`,
        qty: "100 mL",
        stock: i % 3 === 0 ? "-33.1" : "87.31",
        used: i % 3 === 0 ? "133.1" : "12.7",
        lot: "TR 100-01",
        batch: "01"
      });
    }
    setDataSource(mockData);
  }, []);

  return (
    <div className="flex flex-col h-full min-h-screen w-full bg-[#FFE4E1] overflow-hidden rounded-t-[10px]">
      
      <div className="bg-gradient-to-r from-[#88F298] via-[#A7F590] to-[#E4FC76] px-4 py-2 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-2 text-slate-800">
          <Tag size={20} fill="currentColor" className="text-slate-800 opacity-80" />
          <h1 className="text-[15px] font-bold tracking-tight opacity-90">Injection Preparation</h1>
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-[#0066FF] hover:bg-blue-700 text-white p-1.5 rounded-full shadow-md active:scale-95 transition-all flex items-center justify-center w-8 h-8">
            <Plus size={20} strokeWidth={3} />
          </button>

          <div className="relative">
            <input 
              type="text" 
              placeholder="Search.........." 
              className="bg-white text-slate-700 rounded-full pl-9 pr-4 py-1.5 w-64 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-400/50 shadow-inner italic"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>

          <button className="bg-[#1A1A1A] hover:bg-black text-white p-1.5 rounded-[4px] shadow-sm active:scale-95 transition-all w-8 h-8 flex items-center justify-center">
            <RefreshCw size={16} />
          </button>

          <button className="bg-[#DC3545] hover:bg-red-700 text-white p-1.5 rounded-[4px] shadow-sm active:scale-95 transition-all w-8 h-8 flex items-center justify-center">
            <Filter size={16} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <PreparationGrid dataSource={dataSource} />
      </div>

    </div>
  );
};

export default InjPrep;