import React from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  SearchPanel,
  ColumnChooser,
  Scrolling,
} from "devextreme-react/data-grid";
import { Pencil, Trash2 } from "lucide-react";

// ✅ Added onNameDoubleClick to the props
const InventoryGrid = ({ data, onEdit, onDelete, onCheckUpdate, onNameDoubleClick }) => {
  // ✅ Decreased icon size to 14
  const actionCellRender = (cellData) => (
    <div className="flex justify-center gap-4">
      <Pencil
        size={14} 
        className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => onEdit && onEdit(cellData.data)}
      />
      <Trash2
        size={14}
        className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => onDelete && onDelete(cellData.data)}
      />
    </div>
  );

  const handleCellDblClick = (e) => {
    // Handles the QA Check Form
    if (e.column.dataField === "checkedOn" && e.data) {
      onCheckUpdate && onCheckUpdate(e.data);
    }
    // ✅ Handles the Reference Log Form
    if (e.column.dataField === "name" && e.data) {
      onNameDoubleClick && onNameDoubleClick(e.data);
    }
  };

  // ✅ Tailored classes to decrease font size and tighten row padding
  const gridClasses = `
    [&_.dx-data-row>td]:!text-[11.5px] 
    [&_.dx-data-row>td]:!py-1
    [&_.dx-column-indicators]:!scale-75
  `;

  return (
    <div className={`h-full flex flex-col flex-1 min-h-0 bg-white rounded-b-xl shadow-lg border-x border-b border-slate-200 overflow-hidden custom-footer-grid ${gridClasses}`}>
      
      <style>{`
        .custom-footer-grid .dx-datagrid-pager {
          border-top: 1px solid #e2e8f0 !important;
          padding: 8px 16px !important;
        }

        .custom-footer-grid .dx-datagrid-pager::before {
          content: 'Total Inventory Items: ${data?.length || 0}';
          display: block;
          width: 100%;
          padding: 6px 0;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          border-bottom: 1px solid #e2e8f0;
          margin-bottom: 6px;
        }
      `}</style>

      <DataGrid
        dataSource={data}
        keyExpr="id"
        showBorders={true}
        columnAutoWidth={false}
        allowColumnReordering={true}
        allowColumnResizing={true}
        rowAlternationEnabled={true}
        hoverStateEnabled={true}
        height="100%"
        width="100%"
        onCellDblClick={handleCellDblClick} // Attach the updated double-click handler
      >
        <Scrolling mode="standard" />

        <GroupPanel visible={true} placeholder="Drag a column header here to group by that column" />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <SearchPanel visible={true} width={250} placeholder="Search inventory..." />
        <ColumnChooser enabled={true} />

        <Paging defaultPageSize={10} />
        <Pager
          visible={true}
          allowedPageSizes={[10, 25, 50, 100]}
          displayMode="full"
          showPageSizeSelector={true}
          showInfo={true}
          showNavigationButtons={true}
          infoText="Page {0} of {1} ({2} items)"
        />

        <Column dataField="id" caption="ID" width={55} alignment="center" />

        <Column
          dataField="inv"
          caption="Inv"
          width={75}
          cellRender={(d) => (
            <div className="flex justify-center">
              <span className="bg-[#FEF9C3] text-[#A16207] px-2 py-0.5 rounded text-[9px] font-black border border-[#FEF08A] uppercase">
                {d.value}
              </span>
            </div>
          )}
        />

        {/* ✅ Added cursor-pointer and hover underline so users know it is clickable */}
        <Column 
          dataField="name" 
          caption="Name" 
          cssClass="text-[#1D68F1] font-bold cursor-pointer hover:underline" 
        />
        
        <Column dataField="description" caption="Description" width={180} />
        <Column dataField="purchaseOrder" caption="Purchase Order" width={120} />
        <Column dataField="purchaseDate" caption="Purchase Date" dataType="date" width={100} />
        <Column dataField="doM" caption="DoM" dataType="date" width={90} />
        <Column dataField="doE" caption="DoE" dataType="date" width={90} />
        <Column dataField="lotNo" caption="Lot No" width={100} />
        <Column dataField="batchNo" caption="Batch No" width={100} />
        <Column dataField="code" caption="Code" width={80} />
        <Column dataField="qty" caption="Qty" width={60} alignment="center" />
        <Column dataField="volume" caption="Volume" width={80} cellRender={(d) => (d.value ? `${d.value}` : "")} />
        <Column dataField="stock" caption="Stock" width={70} alignment="center" />
        <Column dataField="available" caption="Available" width={70} alignment="center" />
        <Column dataField="totalUsed" caption="Total Used" width={80} alignment="center" />
        <Column dataField="reorderLevel" caption="Reorder Level" width={90} alignment="center" />
        <Column dataField="minStock" caption="Min Stock" width={80} alignment="center" />
        <Column dataField="cost" caption="$ Cost" format="currency" width={100} />
        <Column dataField="spu" caption="$ PU" format="currency" width={90} />
        
        <Column 
          dataField="checkedOn" 
          caption="Checked On" 
          width={100}
          cellRender={() => <div className="h-[24px] w-full"></div>}
          cssClass="cursor-pointer"
        />

        <Column dataField="status" caption="Status" width={100} />
        <Column dataField="supplier" caption="Supplier" width={150} />

        <Column
          caption="Actions"
          width={80}
          alignment="center"
          fixed={true}
          fixedPosition="right"
          cellRender={actionCellRender}
        />
      </DataGrid>
    </div>
  );
};

export default InventoryGrid;