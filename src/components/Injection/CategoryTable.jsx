import React, { useState, useMemo } from 'react';
import DataGrid, { 
  Column, 
  FilterRow, 
  HeaderFilter, 
  Scrolling, 
  Paging, 
  Pager, 
  SearchPanel, 
  LoadPanel 
} from 'devextreme-react/data-grid';
import { List, Pencil, Trash2 } from 'lucide-react';

import TableHeader from '../TableHeader'; 
import AddCategoryForm from './AddForms/AddCategoryForm'; 

const CategoryTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'Allergy' }, 
    { id: 2, name: 'Chemical' }
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this category?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleAddNewCategory = (newCategory) => {
    const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([{ id: nextId, name: newCategory.name }, ...data]);
    setShowAddForm(false);
  };

  const actionCellRender = (cellData) => (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={() => {
          console.log("Edit clicked for:", cellData.data);
          setShowAddForm(true);
        }}
        className="w-6 h-6 rounded-full border border-[#00A3FF] text-[#00A3FF] flex items-center justify-center hover:bg-blue-50 transition-all shadow-sm"
      >
        <Pencil size={11} strokeWidth={2.5} />
      </button>
      <button 
        onClick={() => handleDelete(cellData.data.id)}
        className="w-6 h-6 rounded-full border border-rose-500 text-rose-500 flex items-center justify-center hover:bg-rose-50 transition-all shadow-sm"
      >
        <Trash2 size={11} strokeWidth={2.5} />
      </button>
    </div>
  );

  const headerIdRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> ID</div>
  );
  const headerNameRender = () => (
    <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> Name</div>
  );
  const headerActionRender = () => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><Pencil size={14} className="text-slate-500" /> Actions</div>
  );

  const gridTailwindClasses = `
    [&_.dx-datagrid-header-panel]:!hidden 
    [&_.dx-datagrid-headers]:!bg-[#F8FAFC] 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[12px]
    [&_.dx-datagrid-headers_td]:!border-b
    [&_.dx-datagrid-headers_td]:!border-slate-200
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row>td]:!py-1
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
  `;

  return (
    // SINGLE CONTAINER: Everything lives inside this one main card. No inner borders.
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      {/* 1. Gradient Header lives at the very top */}
      <TableHeader 
        title="Category List"
        icon={List}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowAddForm(!showAddForm)} 
      />

      {/* 2. Form renders flush under the header, pushing the grid down seamlessly */}
      <AddCategoryForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
        onAdd={handleAddNewCategory} 
      />
      
      {/* 3. The Grid Container */}
      <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
        <style>{`
          .custom-footer-grid .dx-datagrid-pager {
            border-top: 1px solid #e2e8f0 !important;
            padding: 0 !important;
          }
          .custom-footer-grid .dx-datagrid-pager::before {
            content: 'Total: ${filteredData.length}';
            display: block;
            width: 100%;
            padding: 10px 16px;
            font-size: 13px;
            font-weight: 700;
            color: #475569;
            border-bottom: 1px solid #e2e8f0;
            text-align: left;
          }
          .custom-footer-grid .dx-pager {
            padding: 10px 16px !important;
          }
        `}</style>

        <DataGrid
          dataSource={filteredData}
          height="100%"
          showBorders={false} 
          rowAlternationEnabled={true}
          columnAutoWidth={true}
          showRowLines={true}
          showColumnLines={true}
          hoverStateEnabled={true}
        >
          <Scrolling mode="standard" showScrollbar="always" />
          <SearchPanel visible={false} /> 
          <FilterRow visible={false} />
          <HeaderFilter visible={true} />

          <Column 
            dataField="id" 
            headerCellRender={headerIdRender} 
            width={100} 
            alignment="center"
          />
          <Column 
            dataField="name" 
            headerCellRender={headerNameRender} 
            alignment="left"
          />
          <Column 
            caption="Actions" 
            alignment="center" 
            width={150} 
            headerCellRender={headerActionRender} 
            cellRender={actionCellRender} 
          />

          <Paging defaultPageSize={20} />
          <Pager
            visible={true}
            allowedPageSizes={[10, 20, 50, 100]}
            displayMode="full"
            showPageSizeSelector={true}
            showInfo={true}
            showNavigationButtons={true}
          />
        </DataGrid>
      </div>
      
      {/* 4. Footer lives at the very bottom of the single frame */}
      <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>
      
    </div>
  );
};

export default CategoryTable;