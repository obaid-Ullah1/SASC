import React, { useState, useRef } from 'react';
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
import { Eye, History } from 'lucide-react';
import DoubleSearchHeader from '../../components/global/DoubleSearchHeader';

// ✅ 1. Import the HistoryTemplate
import HistoryTemplate from '../../components/Appointment/AddForm/HistoryTemplate';

const HistoryTable = () => {
  // ✅ 2. State for the template visibility and selected data
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // States for Header Controls
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const dataGridRef = useRef(null);

  const [historyData, setHistoryData] = useState([
    { id: 1, patient: 'John Doe', mrn: 'MRN-48291', status: 'Completed' },
    { id: 2, patient: 'Jane Smith', mrn: 'MRN-59203', status: 'Cancelled' },
    { id: 3, patient: 'Michael Johnson', mrn: 'MRN-10394', status: 'No Show' },
    { id: 4, patient: 'Emily Davis', mrn: 'MRN-84726', status: 'Completed' },
  ]);

  // Reset Function for the Header
  const handleReset = () => {
    setFromDate('');
    setToDate('');
    if (dataGridRef.current) {
      const instance = dataGridRef.current.instance;
      instance.clearFilter();
      instance.clearSorting();
      instance.clearGrouping();
      instance.pageIndex(0); 
    }
  };

  // ✅ 3. Update Action Cell Renderer to open the HistoryTemplate and pass data
  const actionCellRender = (cellData) => {
    return (
      <div className="flex items-center justify-center text-slate-400">
        <button 
          title="View Details"
          className="hover:text-blue-500 transition-colors"
          onClick={() => {
            setSelectedRecord(cellData.data); // Save the clicked row's data
            setIsTemplateOpen(true);          // Open the sliding template
          }}
        >
          <Eye size={16} />
        </button>
      </div>
    );
  };

  // Pure Tailwind overrides for DevExtreme
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
      
      {/* ✅ Wired up DoubleSearchHeader with all props */}
      <DoubleSearchHeader 
        title="Appointment History"
        icon={<History size={18} />}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        onReset={handleReset}
        onRefresh={() => console.log("Refreshing data...")}
        onFilter={() => console.log("Opening filters...")}
      />

      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* DevExtreme DataGrid */}
        <div className={`flex-1 overflow-hidden relative ${gridTailwindClasses}`}>
          <DataGrid
            ref={dataGridRef} // Ref attached for resetting
            dataSource={historyData}
            height="100%"
            showBorders={true}
            rowAlternationEnabled={true}
            columnAutoWidth={false}
            allowColumnResizing={true}
            columnResizingMode="widget"
            showRowLines={true}
          >
            <Scrolling mode="standard" showScrollbar="always" />
            
            <SearchPanel visible={true} width={250} placeholder="Search History..." />
            <ColumnChooser enabled={true} mode="select" />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />
            <GroupPanel visible={true} emptyPanelText="Drag a column header here to group by that column" />

            {/* Exactly the 4 columns requested */}
            <Column dataField="id" caption="ID" width={80} alignment="center" />
            <Column dataField="patient" caption="Patient" minWidth={200} />
            <Column dataField="mrn" caption="MRN" minWidth={150} />
            
            {/* The Action Column utilizing the custom cellRender */}
            <Column 
              caption="Action" 
              width={120} 
              alignment="center" 
              cellRender={actionCellRender} 
              allowFiltering={false}
              allowSorting={false}
            />

            <Summary>
              <TotalItem column="id" summaryType="count" displayFormat="Total Records: {0}" />
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
      </div>

      {/* ✅ 4. Render the HistoryTemplate */}
      <HistoryTemplate 
        isOpen={isTemplateOpen} 
        onClose={() => setIsTemplateOpen(false)} 
        selectedData={selectedRecord} 
      />

    </div>
  );
};

export default HistoryTable;