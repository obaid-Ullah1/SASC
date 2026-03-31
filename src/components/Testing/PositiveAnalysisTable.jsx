import React, { useState } from 'react';
import DataGrid, {
  Column,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  Scrolling,
  Paging,
  Pager,
  SearchPanel,
  ColumnChooser,
  Summary,
  TotalItem
} from 'devextreme-react/data-grid';
import { 
  RefreshCw, Filter, Syringe, Pill, CalendarDays, PlusCircle, BarChart3
} from 'lucide-react';

// Import the new Chart Modal
import AnalysisChartModal from './AnalysisChartModal';

const PositiveAnalysisTable = () => {
  // State to control the chart modal visibility
  const [isChartOpen, setIsChartOpen] = useState(false);

  // Dummy data modeled strictly after your image
  const analysisData = Array.from({ length: 30 }, (_, i) => {
    const panels = ["Extract Tree (T1)", "Extract Tree (T2)", "Extract Tree (T3)", "Extract Weed (W1)"];
    const ingredients = ["Alder", "Ash", "Bahia Grass", "Bermuda Grass", "Birch", "Box Elder", "Cedar, Mountain"];
    
    return {
      id: i + 1,
      panel: panels[i % panels.length],
      ingredient: ingredients[i % ingredients.length],
      positivePatients: Math.floor(Math.random() * 200) + 10 // Random count between 10 and 210
    };
  });

  // Pure Tailwind overrides for DevExtreme (No <style> tags)
  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!bg-white 
    [&_.dx-datagrid-header-panel]:!border-b 
    [&_.dx-datagrid-header-panel]:!border-slate-200 
    [&_.dx-datagrid-header-panel]:!py-2
    [&_.dx-datagrid-header-panel]:!px-4
    [&_.dx-group-panel-item]:!text-slate-500
    [&_.dx-datagrid-headers]:!bg-white 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[11px]
    [&_.dx-datagrid-headers]:!uppercase
    [&_.dx-datagrid-filter-row]:!bg-white
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-datagrid-pager]:!border-t 
    [&_.dx-datagrid-pager]:!border-slate-200 
    [&_.dx-datagrid-pager]:!bg-white 
    [&_.dx-datagrid-pager]:!py-3
    [&_.dx-datagrid-pager]:!px-4
    [&_.dx-datagrid-total-footer]:!border-t 
    [&_.dx-datagrid-total-footer]:!border-slate-200 
    [&_.dx-datagrid-total-footer]:!bg-white
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      {/* 1. Exact Custom Header matching the new design - NOW RESPONSIVE */}
      <div className="bg-gradient-to-r from-[#7CE5B3] to-[#E9FA00] px-4 sm:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0 shrink-0 border-b border-[#bef264]">
        
        {/* Title Section */}
        <div className="flex items-center gap-2 text-[#2A333A] text-[16px] sm:text-[17px] font-semibold tracking-wide w-full md:w-auto">
          <Pill size={18} className="text-[#2A333A] fill-[#2A333A] -rotate-45 shrink-0" />
          <span className="truncate">Injection Coverage Summary</span>
        </div>

        {/* Controls Section - Flex Wrap & Ordering for Mobile */}
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2 w-full md:w-auto">
          
          {/* Date Pills - Wrapped to stack on mobile */}
          <div className="flex items-center gap-2 w-full sm:w-auto order-last sm:order-none mt-1 sm:mt-0 flex-1 sm:flex-none">
            {/* White Date Pill: From */}
            <div className="bg-white px-2 sm:px-4 py-1.5 rounded-full shadow-sm flex items-center justify-center sm:justify-start gap-1 sm:gap-2 cursor-pointer hover:bg-slate-50 flex-1 sm:flex-none">
              <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500">From:</span>
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-800 whitespace-nowrap">01/01/2026</span>
              <CalendarDays size={14} className="text-slate-400 ml-1 hidden sm:block" />
            </div>

            {/* White Date Pill: To */}
            <div className="bg-white px-2 sm:px-4 py-1.5 rounded-full shadow-sm flex items-center justify-center sm:justify-start gap-1 sm:gap-2 cursor-pointer hover:bg-slate-50 flex-1 sm:flex-none">
              <span className="text-[11px] sm:text-[12px] font-semibold text-slate-500">To:</span>
              <span className="text-[11px] sm:text-[12px] font-bold text-slate-800 whitespace-nowrap">02/27/2026</span>
              <CalendarDays size={14} className="text-slate-400 ml-1 hidden sm:block" />
            </div>
          </div>
          
          {/* Action Buttons Wrapper - Pushed right on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto sm:ml-0 shrink-0">
            {/* Black Refresh Square */}
            <button className="bg-[#1E293B] w-[32px] h-[32px] sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-black transition-all">
              <RefreshCw size={15} strokeWidth={2.5} />
            </button>

            {/* UPDATED: White Graph Square Button that opens the Modal */}
            <button 
              onClick={() => setIsChartOpen(true)}
              className="bg-white w-[32px] h-[32px] sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
            >
              <BarChart3 size={15} strokeWidth={2.5} />
            </button>
            
            {/* Red Filter Square */}
            <button className="bg-[#E11D48] w-[32px] h-[32px] sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white shadow-sm hover:bg-rose-700 transition-all">
              <Filter size={15} strokeWidth={2.5} fill="currentColor" />
            </button>
          </div>

        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* 2. DevExtreme DataGrid */}
        <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
          <DataGrid
            dataSource={analysisData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
          >
            <Scrolling mode="standard" showScrollbar="always" />
            
            <SearchPanel visible={true} width={250} placeholder="Search records..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            {/* Exact columns matched to the design */}
            <Column dataField="id" caption="#" width={50} alignment="center" />
            
            {/* Red Panel Badges */}
            <Column 
              dataField="panel" 
              caption="Panel" 
              minWidth={160}
              cellRender={(d) => (
                <div className="flex items-center">
                  <span className="bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] px-2.5 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1.5 tracking-tight">
                    <PlusCircle size={10} className="fill-[#DC2626] text-white shrink-0" />
                    <span className="truncate">{d.value}</span>
                  </span>
                </div>
              )}
            />
            
            {/* Teal Syringe + Blue Ingredient Text */}
            <Column 
              dataField="ingredient" 
              caption="Ingredient" 
              minWidth={200}
              cellRender={(d) => (
                <div className="flex items-center gap-2.5 text-[#1E40AF] font-bold text-[12px] truncate">
                  <Syringe size={14} className="text-[#0D9488] shrink-0" /> {d.value}
                </div>
              )}
            />
            
            {/* Blue Bold Positive Patients Number */}
            <Column 
              dataField="positivePatients" 
              caption="Positive Patients" 
              alignment="right"
              width={150}
              cellRender={(d) => (
                <div className="text-[#2563EB] font-black text-[12px] pr-4">
                  {d.value}
                </div>
              )}
            />

            <Summary>
              <TotalItem column="id" summaryType="count" displayFormat="Total: {0}" />
            </Summary>

            <Paging defaultPageSize={20} />
            <Pager 
              visible={true} 
              showInfo={true} 
              displayMode="full" 
              showPageSizeSelector={true} 
              allowedPageSizes={[10, 20, 50, 100]} 
            />
          </DataGrid>
        </div>

        {/* 3. Footer Timestamp */}
        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex justify-center sm:justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center sm:text-right">
            Last updated: 2/27/2026, 4:15:00 PM
          </p>
        </div>
      </div>

      {/* 4. Chart Modal Overlay */}
      <AnalysisChartModal 
        isOpen={isChartOpen} 
        onClose={() => setIsChartOpen(false)} 
        data={analysisData} 
      />

    </div>
  );
};

export default PositiveAnalysisTable;