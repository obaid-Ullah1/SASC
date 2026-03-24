import React from 'react';
import { Plus, RefreshCw, Filter, CalendarDays } from 'lucide-react';

const DoubleSearchHeader = ({ 
  title = "Summary List", 
  icon, 
  onAdd, 
  fromDate, 
  toDate, 
  onFromDateChange, 
  onToDateChange, 
  onRefresh, 
  onFilter 
}) => {
  return (
    <div 
      className="px-4 lg:px-5 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 shrink-0 border-b border-[#bef264]"
      style={{ background: 'linear-gradient(90deg, #7EE8B5 0%, #DDF51A 100%)' }}
    >
      {/* Left Side: Title & Icon */}
      <div className="flex items-center gap-2 text-white text-[18px] font-bold tracking-wide shrink-0 drop-shadow-sm">
        {icon}
        {title}
      </div>

      {/* Right Side: Controls */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
        
        {/* Add Button */}
        {onAdd && (
          <button 
            onClick={onAdd}
            className="bg-[#0066FF] w-[34px] h-[34px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-all active:scale-95 shrink-0"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        )}

        {/* Date Pills Wrapper */}
        <div className="flex items-center gap-2 w-full sm:w-auto order-last sm:order-none mt-2 sm:mt-0 flex-1 sm:flex-none">
          
          {/* From Date Pill */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 border border-transparent hover:border-slate-200 transition-all relative overflow-hidden group">
            <span className="text-[12px] font-semibold text-slate-500 whitespace-nowrap">From:</span>
            
            {/* Pro-trick: The native indicator is stretched to cover the whole box and made invisible. 
              This allows the user to click anywhere on the pill to open the calendar.
            */}
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => onFromDateChange && onFromDateChange(e.target.value)}
              className="text-[12px] font-bold text-slate-800 outline-none bg-transparent w-[95px] cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10"
            />
            <CalendarDays size={14} className="text-slate-600 group-hover:text-[#0066FF] transition-colors pointer-events-none" />
          </div>

          {/* To Date Pill */}
          <div className="bg-white px-3 py-1.5 rounded-full shadow-sm flex-1 sm:flex-none flex items-center justify-between sm:justify-start gap-2 border border-transparent hover:border-slate-200 transition-all relative overflow-hidden group">
            <span className="text-[12px] font-semibold text-slate-500 whitespace-nowrap">To:</span>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => onToDateChange && onToDateChange(e.target.value)}
              className="text-[12px] font-bold text-slate-800 outline-none bg-transparent w-[95px] cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10"
            />
            <CalendarDays size={14} className="text-slate-600 group-hover:text-[#0066FF] transition-colors pointer-events-none" />
          </div>

        </div>
        
        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0 shrink-0">
          
          {/* Refresh Button */}
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="bg-white w-[32px] h-[32px] rounded-lg flex items-center justify-center text-slate-800 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              <RefreshCw size={16} strokeWidth={2.5} />
            </button>
          )}

          {/* Filter Button */}
          {onFilter && (
            <button 
              onClick={onFilter}
              className="bg-[#E11D48] w-[32px] h-[32px] rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all active:scale-95"
            >
              <Filter size={16} strokeWidth={2.5} fill="currentColor" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default DoubleSearchHeader;