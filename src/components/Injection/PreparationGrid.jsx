import React, { useState } from 'react';
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

// ✅ Component Imports
import TableHeader from '../../components/TableHeader';
import InjPreForm from './AddForms/InjPreForm';
import Ingredient2Click from './AddForms/Ingredient2Click';
import InjNewPlus from './AddForms/InjNewPlus'; 
import AddConcentrationForm from './AddForms/AddConcentrationForm'; 

const PreparationGrid = ({ dataSource, onSaveNew }) => {
  const [showInjForm, setShowInjForm] = useState(false); 
  const [showIngredientClickForm, setShowIngredientClickForm] = useState(false);
  const [showPlusForm, setShowPlusForm] = useState(false); 
  const [showConcForm, setShowConcForm] = useState(false); 
  
  const [actionRecord, setActionRecord] = useState(null); 

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

  const ActionCell = (cellInfo) => (
    <div className="flex items-center justify-center gap-2">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setActionRecord(cellInfo.data); 
          setShowInjForm(true); 
          setShowPlusForm(false);
          setShowIngredientClickForm(false);
          setShowConcForm(false);
        }}
        className="bg-white hover:bg-blue-50 text-blue-500 border border-blue-200 rounded-full p-1 shadow-sm transition-transform active:scale-90"
      >
        <Pencil size={12} strokeWidth={2.5} />
      </button>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setActionRecord(cellInfo.data); 
          setShowPlusForm(true); 
          setShowInjForm(false);
          setShowIngredientClickForm(false);
          setShowConcForm(false);
        }}
        className="bg-white hover:bg-emerald-50 text-emerald-500 border border-emerald-200 rounded-full p-1 shadow-sm transition-transform active:scale-90"
      >
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

  const handleCellDblClick = (e) => {
    if (e.column.dataField === 'ingredients') {
      setActionRecord(e.data);
      setShowIngredientClickForm(true);
      setShowInjForm(false);
      setShowPlusForm(false);
      setShowConcForm(false);
    } else if (e.column.dataField === 'conc') { 
      setActionRecord(e.data);
      setShowConcForm(true);
      setShowIngredientClickForm(false);
      setShowInjForm(false);
      setShowPlusForm(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowIngredientClickForm(false);
      setShowPlusForm(false);
      setShowConcForm(false); 
      setActionRecord(null);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-white overflow-hidden relative">
      
      <TableHeader 
        title="Preparation List" 
        icon={FlaskConical} 
        onAddClick={() => { 
          setActionRecord(null); 
          setShowInjForm(true); 
          setShowIngredientClickForm(false); 
          setShowPlusForm(false); 
          setShowConcForm(false);
        }}
      />

      {/* 1. MAIN PREP FORM */}
      {showInjForm && (
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0">
          <InjPreForm initialData={actionRecord} onClose={() => { setShowInjForm(false); setActionRecord(null); }} onSave={onSaveNew} />
        </div>
      )}

      {/* 2. GREEN PLUS FORM */}
      {showPlusForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40" onClick={handleBackdropClick}>
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl">
            <InjNewPlus initialData={actionRecord} onClose={() => { setShowPlusForm(false); setActionRecord(null); }} onSave={onSaveNew} />
          </div>
        </div>
      )}

      {/* 3. INGREDIENT DOUBLE-CLICK FORM */}
      {showIngredientClickForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40" onClick={handleBackdropClick}>
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl">
            <Ingredient2Click initialData={actionRecord} onClose={() => { setShowIngredientClickForm(false); setActionRecord(null); }} />
          </div>
        </div>
      )}

      {/* 4. ✅ CONCENTRATION DOUBLE-CLICK FORM (Fixed max-w-4xl) */}
      {showConcForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/40" onClick={handleBackdropClick}>
          {/* 👇 THIS WAS max-w-md, NOW IT IS max-w-4xl 👇 */}
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-4xl">
            <AddConcentrationForm initialData={actionRecord} onClose={() => { setShowConcForm(false); setActionRecord(null); }} />
          </div>
        </div>
      )}
      
      {/* DATA GRID */}
      <div className="flex-1 min-h-0 relative">
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
          onCellDblClick={handleCellDblClick}
        >
          <Scrolling mode="standard" />
          <Paging defaultPageSize={10} />
          <Pager visible={true} showPageSizeSelector={true} allowedPageSizes={[10, 20, 50, 100]} showNavigationButtons={true} showInfo={true} infoText="Page {0} of {1} ({2} items)" />
          <Selection mode="single" />
          <FilterRow visible={false} />

          <Column dataField="id" caption="#" width={50} alignment="center" cssClass="font-bold text-slate-700" />
          <Column dataField="type" width={120} cssClass="font-bold text-slate-800" headerCellRender={() => HeaderWithIcon("Type", Tag)} />
          <Column dataField="name" minWidth={200} cssClass="font-bold text-slate-800" headerCellRender={() => HeaderWithIcon("Name", FlaskConical)} />
          <Column dataField="color" width={60} alignment="center" cellRender={() => <div className="w-3.5 h-3.5 rounded-full bg-gray-300 border border-gray-400 mx-auto" />} headerCellRender={() => HeaderWithIcon("Color", Palette)} />
          <Column dataField="code" width={140} cssClass="font-bold text-slate-700" headerCellRender={() => HeaderWithIcon("Code", Barcode)} />
          <Column dataField="qty" width={80} alignment="center" cellRender={QtyCell} headerCellRender={() => HeaderWithIcon("Qty", Box)} />
          <Column dataField="stock" width={80} alignment="center" cellRender={StockUsedCell} headerCellRender={() => HeaderWithIcon("Stock", Box)} />
          <Column dataField="used" width={80} alignment="center" cellRender={StockUsedCell} headerCellRender={() => HeaderWithIcon("Used", Box)} />
          
          <Column dataField="conc" width={80} alignment="center" cssClass="conc-interactive-column" headerCellRender={() => HeaderWithIcon("Conc.", Search)} />
          
          <Column dataField="ingredients" minWidth={120} alignment="center" cssClass="ingredients-interactive-column" headerCellRender={() => HeaderWithIcon("Ingredients", Link)} />

          <Column dataField="instructions" width={100} alignment="center" headerCellRender={() => HeaderWithIcon("Instructions", List)} />
          <Column dataField="lot" width={100} cssClass="font-bold text-slate-700" headerCellRender={() => HeaderWithIcon("Lot", QrCode)} />
          <Column dataField="batch" width={70} alignment="center" cssClass="font-bold text-slate-700" headerCellRender={() => HeaderWithIcon("Batch", Layers)} />
          <Column dataField="prepDate" width={100} alignment="center" headerCellRender={() => HeaderWithIcon("Prep Date", Calendar)} />
          <Column dataField="preparedBy" width={100} alignment="center" headerCellRender={() => HeaderWithIcon("Prepared By", User)} />
          <Column dataField="expiry" width={100} alignment="center" headerCellRender={() => HeaderWithIcon("Expiry", Calendar)} />
          <Column dataField="qcDate" width={100} alignment="center" headerCellRender={() => HeaderWithIcon("QC Date", CheckCircle)} />
          <Column dataField="qcBy" width={80} alignment="center" headerCellRender={() => HeaderWithIcon("QC By", UserCheck)} />
          <Column dataField="ratio" width={70} alignment="center" headerCellRender={() => HeaderWithIcon("Ratio", PieChart)} />
          <Column dataField="status" width={70} alignment="center" cellRender={() => <span className="font-bold text-slate-400">:</span>} headerCellRender={() => HeaderWithIcon("Status", List)} />
          <Column dataField="notes" width={80} alignment="center" headerCellRender={() => HeaderWithIcon("Notes", MessageSquare)} />
          
          <Column width={90} fixed={true} fixedPosition="right" alignment="center" cellRender={ActionCell} headerCellRender={() => HeaderWithIcon("Actions", Settings)} />
        </DataGrid>
      </div>

      <style jsx global>{`
        .ingredients-interactive-column { background-color: #f0f9ff !important; color: #00A3FF !important; font-weight: 800 !important; cursor: pointer; }
        .ingredients-interactive-column:hover { background-color: #e0f2fe !important; text-decoration: underline; }
        
        .conc-interactive-column { background-color: #ecfdf5 !important; color: #10b981 !important; font-weight: 800 !important; cursor: pointer; }
        .conc-interactive-column:hover { background-color: #d1fae5 !important; text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default PreparationGrid;