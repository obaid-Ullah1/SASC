import React from 'react';
import DataGrid, { 
  Column, 
  Paging, 
  SearchPanel, 
  FilterRow, 
  Scrolling 
} from 'devextreme-react/data-grid';
import { List, Pencil, Trash2 } from 'lucide-react';

const StandardTable = ({ title, data }) => {
  
  // Custom Renderer for Actions
  const actionCellRender = () => (
    <div className="flex justify-center gap-5">
      <Pencil 
        size={15} 
        strokeWidth={3} 
        className="text-blue-500 cursor-pointer hover:scale-110 transition-transform" 
      />
      <Trash2 
        size={15} 
        strokeWidth={3} 
        className="text-red-500 cursor-pointer hover:scale-110 transition-transform" 
      />
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden dx-viewport">
      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders={false}
        columnAutoWidth={true}
        rowAlternationEnabled={true}
        hoverStateEnabled={true}
        className="custom-standard-grid"
      >
        {/* DevExtreme Features */}
        <FilterRow visible={true} />
        <SearchPanel visible={false} /> {/* TableHeader handles search globally */}
        <Scrolling mode="virtual" />
        <Paging enabled={false} />

        {/* # ID Column */}
        <Column 
          dataField="id" 
          caption="# ID" 
          width={128} // Equivalent to w-32
          alignment="left"
          cssClass="px-6 py-3.5 text-xs font-bold text-slate-600 border-r border-slate-100"
          headerCellRender={() => (
            <span className="text-[11px] font-bold text-slate-400 uppercase"># ID</span>
          )}
        />

        {/* Dynamic Name Column */}
        <Column 
          dataField="name" 
          caption={`${title} Name`}
          cssClass="px-6 py-3.5 text-xs font-semibold text-slate-800 border-r border-slate-100"
          headerCellRender={() => (
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase">
              <List size={14}/> {title} Name
            </div>
          )}
        />

        {/* Actions Column */}
        <Column 
          caption="Actions" 
          width={160} // Equivalent to w-40
          alignment="center"
          cellRender={actionCellRender}
          headerCellRender={() => (
            <span className="text-[11px] font-bold text-slate-400 uppercase">Actions</span>
          )}
        />
      </DataGrid>

      {/* No Data Overlay - DevExtreme handles this automatically, but we can customize if data is empty */}
      {(!data || data.length === 0) && (
        <div className="px-6 py-10 text-center text-slate-400 text-xs italic border-t border-slate-100">
          No records found.
        </div>
      )}
    </div>
  );
};

export default StandardTable;