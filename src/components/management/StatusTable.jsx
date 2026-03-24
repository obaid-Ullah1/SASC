import React from 'react';
import DataGrid, { Column, Paging, Selection, Scrolling } from 'devextreme-react/data-grid';
import { Search, Plus, RotateCw, Filter, Edit3, Trash2, Tag } from 'lucide-react';

const StatusTable = () => {
  const statusData = [
    { id: 1, name: 'Scheduled' },
    { id: 2, name: 'Missed' },
    { id: 3, name: 'Reaction' },
    { id: 1002, name: 'Dis Continue' },
    { id: 1003, name: 'Stop' },
    { id: 1004, name: 'Patient Left' },
    { id: 1005, name: 'Maintenance' },
    { id: 2005, name: 'Inactive' },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 shadow-sm overflow-hidden">
      {/*  Header: Lime/Emerald Gradient */}
      <div className="bg-gradient-to-r from-[#7EE8B5] to-[#D6F13D] px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-slate-800" />
          <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-tight">Status Records</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="bg-[#1D68F1] p-1.5 rounded-lg text-white shadow-md hover:bg-blue-700">
            <Plus size={16} strokeWidth={3} />
          </button>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Search Status" 
              className="pl-8 pr-3 py-1 text-[11px] border-none rounded-full w-64 focus:ring-0 outline-none" 
            />
          </div>

          <button className="bg-black p-1.5 rounded-lg text-white"><RotateCw size={14} /></button>
          <button className="bg-[#EF233C] p-1.5 rounded-lg text-white"><Filter size={14} /></button>
        </div>
      </div>

      {/* DevExtreme DataGrid styled to look exactly like your table design */}
      <DataGrid
        dataSource={statusData}
        keyExpr="id"
        showBorders={false}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        hoverStateEnabled={true}
        className="custom-status-grid"
      >
        <Scrolling mode="virtual" />
        <Selection mode="single" />
        
        <Column 
          dataField="id" 
          caption="ID" 
          width={80} 
          cellRender={(data) => <span className="text-gray-500 font-bold text-[11px]">{data.value}</span>}
        />
        <Column 
          dataField="name" 
          caption="Status Name" 
          cellRender={(data) => <span className="text-slate-700 font-bold text-[12px] uppercase">{data.value}</span>}
        />
        <Column 
          caption="Actions" 
          width={100}
          alignment="right"
          cellRender={() => (
            <div className="flex justify-end gap-3 text-blue-500">
              <button className="hover:scale-110 transition-transform"><Edit3 size={14} /></button>
              <button className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={14} /></button>
            </div>
          )}
        />
      </DataGrid>

      <style jsx global>{`
        .custom-status-grid .dx-datagrid-headers {
          background-color: #f8fafc !important;
          border-bottom: 1px solid #e2e8f0 !important;
        }
        .custom-status-grid .dx-datagrid-text-content {
          color: #94a3b8 !important;
          font-weight: 900 !important;
          font-size: 10px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
        }
        .custom-status-grid .dx-data-row {
          height: 38px !important;
        }
      `}</style>
    </div>
  );
};

export default StatusTable;