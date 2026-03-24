import React from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Paging, 
  Pager,
  Selection,
  FilterRow 
} from 'devextreme-react/data-grid';
import { 
  Tag, FlaskConical, Palette, Barcode, Box, 
  Search, Link, List, QrCode, Layers, 
  Calendar, User, CheckCircle, UserCheck, 
  PieChart, MessageSquare, Settings, Pencil, PlusCircle 
} from 'lucide-react';

const PreparationGrid = ({ dataSource }) => {

  const QtyCell = (data) => (
    <div className="flex justify-center">
      <span className="bg-[#6c757d] text-white text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[45px] text-center shadow-sm">
        {data.value}
      </span>
    </div>
  );

  const StockUsedCell = (data) => {
    if (!data.value) return null;
    const isStock = data.column.dataField === 'stock';
    const bgColor = isStock ? 'bg-[#00C2FF]' : 'bg-[#FFC107]'; 
    return (
      <div className="flex justify-center">
        <span className={`${bgColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-md min-w-[50px] text-center shadow-sm border border-white/20`}>
          {data.value}
        </span>
      </div>
    );
  };

  const ActionCell = () => (
    <div className="flex items-center justify-center gap-2">
      <button className="bg-white hover:bg-blue-50 text-blue-500 border border-blue-200 rounded-full p-1 shadow-sm transition-transform active:scale-90">
        <Pencil size={12} strokeWidth={2.5} />
      </button>
      <button className="bg-white hover:bg-emerald-50 text-emerald-500 border border-emerald-200 rounded-full p-1 shadow-sm transition-transform active:scale-90">
        <PlusCircle size={12} strokeWidth={2.5} />
      </button>
    </div>
  );

  const HeaderWithIcon = (text, Icon) => (
    <div className="flex items-center gap-1.5 justify-center text-[#4A5568]">
      <Icon size={13} strokeWidth={2.5} />
      <span className="uppercase tracking-tight">{text}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden">
      
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        showRowLines={true}
        showColumnLines={true}
        columnAutoWidth={true}
        allowColumnResizing={true}
        hoverStateEnabled={true}
        rowAlternationEnabled={false}
        height="100%"
        width="100%"
      >
        {/* IMPORTANT: STANDARD scrolling for pager layout */}
        <Scrolling mode="standard" />

        {/* PAGINATION EXACT STYLE LIKE INVENTORY */}
        <Paging defaultPageSize={10} />

        <Pager
          visible={true}
          showPageSizeSelector={true}
          allowedPageSizes={[10, 20, 50, 100]}
          showNavigationButtons={true}
          showInfo={true}
          infoText="Page {0} of {1} ({2} items)"
        />

        <Selection mode="single" />
        <FilterRow visible={false} />

        {/* ---- ALL YOUR COLUMNS (UNCHANGED) ---- */}
        <Column dataField="id" caption="#" width={50} alignment="center" cssClass="font-bold text-slate-700" />
        <Column dataField="type" width={120} cssClass="font-bold text-slate-800"
          headerCellRender={() => HeaderWithIcon("Type", Tag)} />
        <Column dataField="name" minWidth={200} cssClass="font-bold text-slate-800"
          headerCellRender={() => HeaderWithIcon("Name", FlaskConical)} />
        <Column dataField="color" width={60} alignment="center" 
          cellRender={() => <div className="w-3.5 h-3.5 rounded-full bg-gray-300 border border-gray-400 mx-auto" />}
          headerCellRender={() => HeaderWithIcon("Color", Palette)} />
        <Column dataField="code" width={140} cssClass="font-bold text-slate-700"
          headerCellRender={() => HeaderWithIcon("Code", Barcode)} />
        <Column dataField="qty" width={80} alignment="center" cellRender={QtyCell}
          headerCellRender={() => HeaderWithIcon("Qty", Box)} />
        <Column dataField="stock" width={80} alignment="center" cellRender={StockUsedCell}
          headerCellRender={() => HeaderWithIcon("Stock", Box)} />
        <Column dataField="used" width={80} alignment="center" cellRender={StockUsedCell}
          headerCellRender={() => HeaderWithIcon("Used", Box)} />
        <Column dataField="conc" width={70} alignment="center"
          headerCellRender={() => HeaderWithIcon("Conc.", Search)} />
        <Column dataField="ingredients" minWidth={100} alignment="center"
          headerCellRender={() => HeaderWithIcon("Ingredients", Link)} />
        <Column dataField="instructions" width={100} alignment="center"
          headerCellRender={() => HeaderWithIcon("Instructions", List)} />
        <Column dataField="lot" width={100} cssClass="font-bold text-slate-700"
          headerCellRender={() => HeaderWithIcon("Lot", QrCode)} />
        <Column dataField="batch" width={70} alignment="center" cssClass="font-bold text-slate-700"
          headerCellRender={() => HeaderWithIcon("Batch", Layers)} />
        <Column dataField="prepDate" width={100} alignment="center"
          headerCellRender={() => HeaderWithIcon("Prep Date", Calendar)} />
        <Column dataField="preparedBy" width={100} alignment="center"
          headerCellRender={() => HeaderWithIcon("Prepared By", User)} />
        <Column dataField="expiry" width={100} alignment="center"
          headerCellRender={() => HeaderWithIcon("Expiry", Calendar)} />
        <Column dataField="qcDate" width={100} alignment="center"
          headerCellRender={() => HeaderWithIcon("QC Date", CheckCircle)} />
        <Column dataField="qcBy" width={80} alignment="center"
          headerCellRender={() => HeaderWithIcon("QC By", UserCheck)} />
        <Column dataField="ratio" width={70} alignment="center"
          headerCellRender={() => HeaderWithIcon("Ratio", PieChart)} />
        <Column dataField="status" width={70} alignment="center" 
          cellRender={() => <span className="font-bold text-slate-400">:</span>}
          headerCellRender={() => HeaderWithIcon("Status", List)} />
        <Column dataField="notes" width={80} alignment="center"
          headerCellRender={() => HeaderWithIcon("Notes", MessageSquare)} />
        <Column width={90} fixed={true} fixedPosition="right" alignment="center" cellRender={ActionCell}
          headerCellRender={() => HeaderWithIcon("Actions", Settings)} />

      </DataGrid>
    </div>
  );
};

export default PreparationGrid;