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
  ColumnChooser
} from 'devextreme-react/data-grid';
import { User, SquarePlus, ShoppingBag, List } from 'lucide-react';

// Import the Header component
import TableHeader from '../TableHeader';

const TreatmentTable = () => {
  // Component manages its own search state
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Dummy data covering the columns
  const [injectionData] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i === 0 ? 1 : i === 1 ? 321 : 6 + i,
      office: i % 2 === 0 ? "Fresno South" : "Merced",
      patientNo: 108 + i,
      fullName: i % 2 === 0 ? "Test, Leope" : "Aragon, Jean",
      patientCode: i % 2 === 0 ? "LTE" : "JAR",
      startDate: "03/22/2024",
      authUnit: Math.floor(Math.random() * 50) + 10,
      paidUnit: Math.floor(Math.random() * 40),
      balUnit: Math.floor(Math.random() * 10),
      frequency: "7 day",
      day: i % 2 === 0 ? "Friday" : "Wednesday"
    }))
  );

  // Pure Tailwind overrides to keep DevExtreme styling clean and rows ultra-thin
  const gridTailwindClasses = `
    /* Style the header panel for GroupPanel and SearchPanel */
    [&_.dx-datagrid-header-panel]:!bg-white 
    [&_.dx-datagrid-header-panel]:!border-b 
    [&_.dx-datagrid-header-panel]:!border-slate-200 
    [&_.dx-datagrid-header-panel]:!py-2
    [&_.dx-datagrid-header-panel]:!px-4
    [&_.dx-group-panel-item]:!text-slate-500

    [&_.dx-datagrid-headers]:!bg-[#F8FAFC] 
    [&_.dx-datagrid-headers]:!text-slate-500 
    [&_.dx-datagrid-headers]:!font-bold 
    [&_.dx-datagrid-headers]:!text-[12px]
    [&_.dx-datagrid-headers_td]:!border-b
    [&_.dx-datagrid-headers_td]:!border-slate-200
    [&_.dx-datagrid-filter-row]:!bg-white
    [&_.dx-row-alt>td]:!bg-[#F8FAFC]
    
    /* ULTRA THIN ROWS */
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row>td]:!py-1.5
    [&_.dx-data-row>td]:!text-slate-800
    [&_.dx-data-row>td]:!text-[13px]
  `;

  // Standardized Header Renderers for a professional look
  const renderHeader = (title) => (
    <div className="flex items-center justify-center gap-1.5 font-bold text-slate-500 text-[12px]">
      <List size={14} className="text-slate-500" /> {title}
    </div>
  );

  return (
    // Single outer container
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 min-h-[400px]">
      
      {/* TableHeader INSIDE the component */}
      <TableHeader 
        title="Treatment List"
        icon={ShoppingBag}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowAddForm(!showAddForm)} 
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* Local Add Form Placeholder */}
        {showAddForm && (
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-center animate-in slide-in-from-top-2 shrink-0">
            <p className="text-[#0066FF] font-bold text-sm">Add/Edit Treatment Form Component Here</p>
          </div>
        )}

        {/* DataGrid Container with Integrated Footer Style */}
        <div className={`flex-1 overflow-hidden relative custom-footer-grid ${gridTailwindClasses}`}>
          
          {/* TOTAL ENTRIES DESIGN */}
          <style>{`
            .custom-footer-grid .dx-datagrid {
              border: none !important;
            }
            .custom-footer-grid .dx-datagrid-pager {
              border-top: 1px solid #e2e8f0 !important;
              padding: 0 !important;
            }
            .custom-footer-grid .dx-datagrid-pager::before {
              content: 'Total: ${injectionData.length}';
              display: block;
              width: 100%;
              padding: 10px 16px;
              font-size: 13px;
              font-weight: 700;
              color: #475569;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
              background-color: #F8FAFC;
            }
            .custom-footer-grid .dx-pager {
              padding: 10px 16px !important;
            }
          `}</style>

          <DataGrid
            dataSource={injectionData} 
            height="100%"
            showBorders={false} 
            rowAlternationEnabled={true}
            columnAutoWidth={true}
            showRowLines={true}
            showColumnLines={true}
            hoverStateEnabled={true}
          >
            <Scrolling mode="standard" showScrollbar="always" />
            
            <SearchPanel visible={true} width={250} placeholder="Search patients..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            {/* Table Columns */}
            <Column 
              dataField="id" 
              width={80} 
              alignment="center" 
              headerCellRender={() => renderHeader("ID")} 
            />
            <Column 
              dataField="office" 
              alignment="center" 
              headerCellRender={() => renderHeader("Office")} 
            />
            <Column 
              dataField="patientNo" 
              alignment="center"
              headerCellRender={() => renderHeader("Patient No")}
              cellRender={(d) => (
                <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
                  <SquarePlus size={14} /> {d.value}
                </div>
              )}
            />
            <Column 
              dataField="fullName" 
              alignment="left"
              headerCellRender={() => <div className="flex items-center gap-1.5 font-bold text-slate-500 text-[12px]"><List size={14} className="text-slate-500" /> Full Name</div>}
              cellRender={(d) => (
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-[12px]">
                  <User size={14} className="text-emerald-500" /> {d.value}
                </div>
              )}
            />
            <Column 
              dataField="patientCode" 
              alignment="center"
              headerCellRender={() => renderHeader("Code")}
              cellRender={(d) => (
                <span className="bg-[#00A3FF] text-white px-2 py-0.5 rounded text-[10px] font-black uppercase">
                  {d.value}
                </span>
              )}
            />
            <Column dataField="startDate" dataType="date" alignment="center" headerCellRender={() => renderHeader("Start Date")} />
            <Column dataField="authUnit" alignment="center" headerCellRender={() => renderHeader("Auth")} />
            <Column dataField="paidUnit" alignment="center" headerCellRender={() => renderHeader("Paid")} />
            <Column dataField="balUnit" alignment="center" headerCellRender={() => renderHeader("Bal")} />
            <Column 
              dataField="frequency" 
              alignment="center"
              headerCellRender={() => renderHeader("Freq")}
              cellRender={(d) => <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-[10px] font-bold">{d.value}</span>}
            />
            <Column 
              dataField="day" 
              alignment="center"
              headerCellRender={() => renderHeader("Day")}
              cellRender={(d) => <span className="bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-[10px] font-black shadow-sm">{d.value}</span>}
            />

            {/* Fixed Paging Footer matched to new design */}
            <Paging defaultPageSize={10} />
            <Pager 
              visible={true} 
              showInfo={true} 
              displayMode="full" 
              showPageSizeSelector={true} 
              allowedPageSizes={[10, 20, 50, 100]} 
            />
          </DataGrid>
        </div>

        {/* Bottom Timestamp Footer */}
        <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 py-2 flex items-center justify-end shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
};

export default TreatmentTable;