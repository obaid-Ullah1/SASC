import React, { useState } from 'react';
import { X, Activity, Sparkles } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';

const AnalysisChartModal = ({ isOpen, onClose, data }) => {
  const [sortOrder, setSortOrder] = useState('High-Low');
  const [showCount, setShowCount] = useState('Top 50');
  const [activeIndex, setActiveIndex] = useState(null);

  if (!isOpen) return null;

  // 1. Sort and Filter Data
  let sortedData = [...data].sort((a, b) => {
    return sortOrder === 'High-Low' 
      ? b.positivePatients - a.positivePatients 
      : a.positivePatients - b.positivePatients;
  });

  if (showCount === 'Top 10') sortedData = sortedData.slice(0, 10);
  if (showCount === 'Top 15') sortedData = sortedData.slice(0, 15);
  if (showCount === 'Top 50') sortedData = sortedData.slice(0, 50);

  // 2. Optimized Premium Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 p-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-slate-100 flex flex-col gap-1 min-w-[180px] animate-in zoom-in-95 duration-150">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-500" />
            <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Selected Ingredient</span>
          </div>
          <p className="font-black text-slate-800 text-base leading-tight">{payload[0].payload.ingredient}</p>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
              <Activity size={16} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Patient Count</span>
              <span className="text-blue-600 font-black text-lg leading-none">{payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // 3. Fast SVG Badge Renderer (Now using Tailwind classes)
  const renderCustomBarLabel = (props) => {
    const { x, y, width, height, value, index } = props;
    const isHovered = activeIndex === index;
    const radius = 10;

    return (
      <g className="transition-all duration-200 ease-out">
        <rect 
          x={x + width + 8} 
          y={y + height / 2 - radius} 
          width={38} 
          height={radius * 2} 
          rx={radius} 
          fill={isHovered ? "#0066FF" : "#F1F5F9"} 
          className="transition-colors duration-200"
        />
        <text 
          x={x + width + 27} 
          y={y + height / 2 + 1} 
          fill={isHovered ? "#FFFFFF" : "#475569"} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          className="text-[11px] font-bold transition-colors duration-200"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-10">
      
      {/* Hardware-Accelerated Simple Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Main Modal Container */}
      <div className="relative bg-white w-full max-w-[1200px] h-full max-h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-[0.98] slide-in-from-bottom-4 duration-300">
        
        {/* Header */}
        <div className="relative z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Analysis: By Volume</h2>
          </div>

          <button 
            onClick={onClose}
            className="bg-white p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-all duration-150"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="relative z-10 px-6 py-3 border-b border-slate-200 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-bold text-slate-500 text-[11px] tracking-wider uppercase">Sort:</span>
            <div className="flex">
              <button 
                onClick={() => setSortOrder('High-Low')}
                className={`px-4 py-1.5 border border-blue-500 text-sm transition-all duration-200 ${
                  sortOrder === 'High-Low' ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-blue-500 hover:bg-blue-50'
                }`}
              >
                High-Low
              </button>
              <button 
                onClick={() => setSortOrder('Low-High')}
                className={`px-4 py-1.5 border border-l-0 border-blue-500 text-sm transition-all duration-200 ${
                  sortOrder === 'Low-High' ? 'bg-blue-600 text-white font-semibold' : 'bg-white text-blue-500 hover:bg-blue-50'
                }`}
              >
                Low-High
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 text-[11px] tracking-wider uppercase">Show:</span>
            <select 
              value={showCount}
              onChange={(e) => setShowCount(e.target.value)}
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded px-3 py-1.5 outline-none focus:border-blue-500 cursor-pointer"
            >
              <option>All Results</option>
              <option>Top 50</option>
              <option>Top 15</option>
              <option>Top 10</option>
            </select>
          </div>
        </div>

        {/* Chart Area - Vertical scrolling */}
        <div className="relative z-10 flex-1 p-6 overflow-y-auto bg-white">
          <div style={{ height: `${Math.max(800, sortedData.length * 24)}px` }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedData}
                margin={{ top: 10, right: 60, left: 10, bottom: 25 }}
                barCategoryGap="20%"
                onMouseLeave={() => setActiveIndex(null)}
              >
                <defs>
                  <linearGradient id="liquidGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00F0FF" />    
                    <stop offset="50%" stopColor="#0066FF" />   
                    <stop offset="100%" stopColor="#8B5CF6" />  
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                
                <XAxis 
                  type="number" 
                  tick={{ fill: '#64748B', fontSize: 11, fontWeight: 500 }}
                  tickLine={{ stroke: '#CBD5E1' }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  label={{ 
                    value: 'Patient Count', 
                    position: 'insideBottom', 
                    offset: -15, 
                    fill: '#64748B', 
                    fontSize: 13, 
                    fontWeight: 600 
                  }} 
                />
                
                <YAxis 
                  dataKey="ingredient" 
                  type="category" 
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }}
                  width={150}
                />
                
                <Tooltip 
                  cursor={{ fill: '#F8FAFC', rx: 4 }} 
                  content={<CustomTooltip />} 
                  animationDuration={150}
                />
                
                <Bar 
                  dataKey="positivePatients" 
                  radius={[0, 6, 6, 0]} 
                  background={{ fill: '#F8FAFC', radius: [0, 6, 6, 0] }}
                  label={renderCustomBarLabel} 
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {sortedData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="url(#liquidGradient)"
                      // Pure Tailwind applied here for the focus effect!
                      className={`cursor-pointer transition-opacity duration-200 ease-in-out ${
                        activeIndex === null || activeIndex === index ? 'opacity-100' : 'opacity-30'
                      }`}
                      onMouseEnter={() => setActiveIndex(index)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOTTOM FOOTER WITH CLOSE BUTTON */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
          <button 
            onClick={onClose}
            className="bg-[#64748B] hover:bg-[#475569] text-white px-6 py-2 rounded text-sm font-semibold transition-all active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default AnalysisChartModal;