import React, { useState, useMemo } from 'react';
import DataGrid, { 
  Column, 
  FilterRow, 
  HeaderFilter, 
  Scrolling, 
  Paging, 
  Pager, 
  SearchPanel 
} from 'devextreme-react/data-grid';
import { Pencil, Trash2, CheckCircle2, FileText, X, List } from 'lucide-react';

import TableHeader from '../TableHeader';
import AddRuleName from './AddForms/AddRuleName'; // Path updated

const RuleNameTable = () => {
  const [data, setData] = useState([
    { id: 1, ruleName: 'Rule 1/25', status: 'Active' },
    { id: 2, ruleName: 'Rule 2/50', status: 'Active' },
    { id: 3, ruleName: 'Rule 10/100', status: 'Active' },
    { id: 4, ruleName: 'Standard Pediatric', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item => 
      Object.values(item).some(val => 
        val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this rule?")) {
      setData(data.filter(item => item.id !== id));
    }
  };

  // Logic to add the rule to the grid
  const handleAddRule = (newRule) => {
    const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([{ id: nextId, ...newRule }, ...data]);
    setShowAddForm(false);
  };

  const actionCellRender = (cellData) => (
    <div className="flex items-center justify-center gap-2">
      <button className="w-6 h-6 rounded-full border border-[#00A3FF] text-[#00A3FF] flex items-center justify-center hover:bg-blue-50 transition-all shadow-sm">
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

  const statusCellRender = (cellData) => {
    const isActive = cellData.value === 'Active';
    return (
      <div className="flex items-center justify-center">
        <span className={`${isActive ? 'bg-[#16A34A]' : 'bg-rose-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm uppercase tracking-wide`}>
          {isActive ? <CheckCircle2 size={12} strokeWidth={3} /> : <X size={12} strokeWidth={3} />}
          {cellData.value}
        </span>
      </div>
    );
  };

  const headerIdRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> ID</div>;
  const headerRuleNameRender = () => <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><FileText size={14} className="text-slate-500" /> Rule Name</div>;
  const headerStatusRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><CheckCircle2 size={14} className="text-slate-500" /> Status</div>;
  const headerActionRender = () => <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]"><Pencil size={14} className="text-slate-500" /> Actions</div>;

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
    [&_.dx-data-row>td]:!py-0.5
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
      
      <TableHeader 
        title="Rule Name List"
        icon={FileText}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowAddForm(!showAddForm)} 
      />

      <AddRuleName 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
        onAdd={handleAddRule} 
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
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

            <Column dataField="id" headerCellRender={headerIdRender} width={80} alignment="center" />
            <Column dataField="ruleName" headerCellRender={headerRuleNameRender} alignment="left" />
            <Column dataField="status" headerCellRender={headerStatusRender} alignment="center" width={150} cellRender={statusCellRender} />
            <Column caption="Actions" alignment="center" width={120} headerCellRender={headerActionRender} cellRender={actionCellRender} />

            <Paging defaultPageSize={20} />
            <Pager visible={true} allowedPageSizes={[10, 20, 50, 100]} displayMode="full" showPageSizeSelector={true} showInfo={true} showNavigationButtons={true} />
          </DataGrid>
        </div>

        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RuleNameTable;