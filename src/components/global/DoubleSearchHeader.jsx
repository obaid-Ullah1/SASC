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
      className="px-4 lg:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shrink-0 border-b border-[#bef264]"
      style={{ background: 'linear-gradient(90deg, #7EE8B5 0%, #DDF51A 100%)' }}
    >
      {/* Left Side: Title & Icon */}
      <div className="flex items-center gap-2 text-white text-[17px] md:text-[18px] font-bold tracking-wide shrink-0 drop-shadow-sm w-full md:w-auto">
        {icon}
        {title}
      </div>

      {/* Right Side: Controls Container */}
      {/* Uses flex-wrap. Mobile handles ordering to stack dates; Desktop stays inline */}
      <div className="flex flex-wrap items-center w-full md:w-auto gap-x-2 gap-y-3 sm:gap-3">

        {/* 1. Add Button (Mobile: Top Left, Desktop: Left) */}
        {onAdd && (
          <button 
            onClick={onAdd}
            className="order-1 bg-[#0066FF] w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-700 transition-all active:scale-95 shrink-0"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
        )}

        {/* 2. Date Pills Wrapper (Mobile: Bottom Row Full Width, Desktop: Middle) */}
        <div className="flex items-center gap-2 w-full sm:w-auto order-3 sm:order-2 flex-1 sm:flex-none">
          
          {/* From Date Pill */}
          <div className="bg-white px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-1 sm:gap-2 border border-transparent hover:border-slate-200 transition-all relative overflow-hidden group">
            <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500 whitespace-nowrap">From:</span>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => onFromDateChange && onFromDateChange(e.target.value)}
              className="text-[11px] sm:text-[12px] font-bold text-slate-800 outline-none bg-transparent w-full min-w-[70px] sm:w-[95px] cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10"
            />
            {/* Icon hidden on mobile to prevent overflow on very narrow screens */}
            <CalendarDays size={14} className="text-slate-600 group-hover:text-[#0066FF] transition-colors pointer-events-none shrink-0 hidden sm:block" />
          </div>

          {/* To Date Pill */}
          <div className="bg-white px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-1 sm:gap-2 border border-transparent hover:border-slate-200 transition-all relative overflow-hidden group">
            <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500 whitespace-nowrap">To:</span>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => onToDateChange && onToDateChange(e.target.value)}
              className="text-[11px] sm:text-[12px] font-bold text-slate-800 outline-none bg-transparent w-full min-w-[70px] sm:w-[95px] cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10"
            />
            {/* Icon hidden on mobile to prevent overflow on very narrow screens */}
            <CalendarDays size={14} className="text-slate-600 group-hover:text-[#0066FF] transition-colors pointer-events-none shrink-0 hidden sm:block" />
          </div>

        </div>
        
        {/* 3. Action Buttons (Mobile: Top Right next to Add btn, Desktop: Right) */}
        {/* ml-auto pushes these buttons to the far right side of the screen on mobile */}
        <div className="flex items-center gap-2 ml-auto sm:ml-0 order-2 sm:order-3 shrink-0">
          
          {/* Refresh Button */}
          {onRefresh && (
            <button 
              onClick={onRefresh}
              className="bg-white w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-lg flex items-center justify-center text-slate-800 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              <RefreshCw size={15} strokeWidth={2.5} />
            </button>
          )}

          {/* Filter Button */}
          {onFilter && (
            <button 
              onClick={onFilter}
              className="bg-[#E11D48] w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all active:scale-95"
            >
              <Filter size={15} strokeWidth={2.5} fill="currentColor" />
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default DoubleSearchHeader;