import React from 'react';
import DataGrid, { 
  Column, Scrolling, LoadPanel, StateStoring, Paging, Pager 
} from 'devextreme-react/data-grid';
import TableHeader from '../TableHeader'; 

const ManagementGrid = ({ title, data, columns, icon: HeaderIcon, onAddClick }) => {
  const storageKey = `storage-grid-${title.replace(/\s+/g, '-').toLowerCase()}`;

  const handleResetLayout = () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  };

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden rounded-lg border border-gray-300 shadow-sm transition-all duration-500">

      <TableHeader 
        title={title}
        icon={HeaderIcon}
        onAddClick={onAddClick}
        handleResetLayout={handleResetLayout}
      />

      {/* GRID CONTAINER */}
      <div className="flex-1 w-full min-h-0">
        <DataGrid
          dataSource={data}
          keyExpr="id"
          height="100%" 
          width="100%"  
          showBorders={false}
          columnAutoWidth={true}
          rowAlternationEnabled={true}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnResizingMode="widget"
          className="stretch-grid"
        >
          <StateStoring enabled={true} type="localStorage" storageKey={storageKey} />
          <Scrolling mode="virtual" rowRenderingMode="virtual" useNative={false} />
          <Paging defaultPageSize={20} />
          <Pager 
            visible={true} 
            showPageSizeSelector={true} 
            allowedPageSizes={[10, 20, 50, 100]} 
            showInfo={true} 
            showNavigationButtons={true} 
            displayMode="full" 
          />
          <LoadPanel enabled={true} />

          {columns.map((col, index) => (
            <Column 
              key={index}
              dataField={col.field}
              caption={col.caption}
              width={col.width}
              alignment={col.alignment || 'left'}
              cellRender={col.cellRender}
              fixed={col.fixed}
              fixedPosition={col.fixedPosition}
            />
          ))}
        </DataGrid>
      </div>

      <style jsx global>{`
        /* Force the grid to fill container */
        .dx-datagrid.stretch-grid {
            width: 100% !important;
        }

        /* Header styling - slightly thinner */
        .dx-datagrid-headers { 
            height: 28px !important; 
            font-size: 10px !important; 
            font-weight: 800 !important; 
            text-transform: uppercase !important; 
            background-color: #f8fafc !important;
            border-bottom: 1px solid #e2e8f0 !important;
        }

        /* * FIX: Remove default DevExtreme inner cell borders 
         * to prevent the double-line effect under the header 
         */
        .dx-datagrid-headers .dx-datagrid-table .dx-header-row > td {
            border-bottom: none !important;
        }
        
        /* Row height reduced for "thin" look */
        .dx-datagrid-rowsview .dx-row { 
            height: 30px !important; 
        }

        /* Cell padding reduced for sleeker appearance */
        .dx-datagrid-table .dx-row > td { 
            padding: 2px 8px !important; 
            font-size: 11px !important; 
            vertical-align: middle !important;
        }

        /* Hover effect */
        .dx-datagrid-rowsview .dx-row.dx-state-hover {
            background-color: #f1f5f9 !important;
        }

        /* Pager Styling */
        .dx-datagrid-pager {
            padding: 6px !important;
            border-top: 1px solid #e2e8f0 !important;
            font-size: 11px !important;
        }

        /* Target the Lucide icons specifically if they are inside buttons in the grid */
        .dx-datagrid-rowsview button svg {
            width: 12px !important;
            height: 12px !important;
            stroke-width: 2.5px !important;
        }
      `}</style>
    </div>
  );
};

export default ManagementGrid;