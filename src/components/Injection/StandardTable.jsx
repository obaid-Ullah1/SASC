import React from 'react';
import DataGrid, { Column, Scrolling, Selection } from 'devextreme-react/data-grid';
import { List, Pencil, Trash2 } from 'lucide-react';

const StandardTable = ({ title, data }) => {
  return (
    <div className="mb-6 bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      <DataGrid
        dataSource={data}
        showBorders={false}
        showRowLines={true}
        columnAutoWidth={true}
        className="custom-grid"
      >
        <Selection mode="single" />
        <Scrolling mode="virtual" />

        <Column 
          dataField="id" 
          caption="ID" 
          width={80}
          headerCellRender={() => <div className="text-blue-600 font-bold flex items-center gap-2"><List size={14}/>ID</div>} 
        />
        <Column 
          dataField="name" 
          caption="NAME" 
          headerCellRender={() => <div className="text-blue-600 font-bold">NAME</div>} 
        />
        <Column 
          caption="ACTIONS" 
          width={100} 
          alignment="center"
          cellRender={() => (
            <div className="flex gap-2 justify-center">
              <button className="p-1 text-blue-500 hover:bg-blue-50 rounded border border-blue-100"><Pencil size={12}/></button>
              <button className="p-1 text-red-500 hover:bg-red-50 rounded border border-red-100"><Trash2 size={12}/></button>
            </div>
          )}
        />
      </DataGrid>
    </div>
  );
};

export default StandardTable;