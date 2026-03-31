import React, { useState, useMemo } from 'react';
import DataGrid, { 
  Column, 
  Scrolling, 
  Paging,
  Pager
} from 'devextreme-react/data-grid';
import { 
  FolderOpen, Search, RotateCcw, FileSpreadsheet, FileText, 
  Eye, Pencil, Trash2, Plus, ChevronDown, Image as ImageIcon, FileCode2, X
} from 'lucide-react';

// Sub-components
import DocumentReference from '../../components/Library/DocumentReference';
import AddDocumentModal from '../../components/Library/AddDocumentModal';
import ViewDocumentModal from '../../components/Library/ViewDocumentModal';

// Global Popups
import ConfirmPopup from '../../components/global/ConfirmPopup';
import SuccessPopup from '../../components/global/SuccessPopup';

const CATEGORY_OPTIONS = [
  { name: 'INVENTORY', color: '#DC2626' },
  { name: 'INJECTION COMPOSITION', color: '#3B82F6' },
  { name: 'APPOINTMENT', color: '#e000e0' },
  { name: 'INJECTION CONTAINER', color: '#F59E0B' },
  { name: 'ASSESSMENT', color: '#10B981' },
  { name: 'GENERAL', color: '#64748B' }
];

const LibraryPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  
  // States for Actions
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [viewingDoc, setViewingDoc] = useState(null);
  
  // States for Global Popups
  const [confirmPopup, setConfirmPopup] = useState({ isOpen: false, idToDelete: null });
  const [successPopup, setSuccessPopup] = useState({ isOpen: false, message: '' });
  
  // States for Filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [gridData, setGridData] = useState([
    { id: 1, category: 'INVENTORY', fileName: 'Invoice_Allergen_Final_All_7_Pages(15-10-25)1.x...', type: 'excel', ref: 'SA INV 251015 A0001', date: 'Oct 15, 2025', color: '#DC2626' },
    { id: 2, category: 'INJECTION COMPOSITION', fileName: 'AIT List.jpeg', type: 'image', ref: 'SA COMP 251015 A0002', date: 'Oct 15, 2025', color: '#3B82F6' },
    { id: 3, category: 'INJECTION COMPOSITION', fileName: 'Vaccine Template.docx', type: 'word', ref: 'SA COMP 251015 A0003', date: 'Oct 15, 2025', color: '#3B82F6' },
    { id: 4, category: 'INJECTION CONTAINER', fileName: 'Vial_Specs_2026.pdf', type: 'pdf', ref: 'SA CONT 251015 A0004', date: 'Oct 15, 2025', color: '#F59E0B' },
    { id: 5, category: 'APPOINTMENT', fileName: 'SelectedPatientInjSheet.xlsx', type: 'excel', ref: 'SA APPT 251107 A0005', date: 'Nov 07, 2025', color: '#e000e0' },
    { id: 6, category: 'ASSESSMENT', fileName: 'Patient_Eval_Form.docx', type: 'word', ref: 'SA ASMT 251107 A0006', date: 'Nov 07, 2025', color: '#10B981' },
    { id: 7, category: 'APPOINTMENT', fileName: 'SelectedPatientInjSheet1.xlsx', type: 'excel', ref: 'SA APPT 251107 A0007', date: 'Nov 07, 2025', color: '#e000e0' },
    { id: 8, category: 'GENERAL', fileName: 'Clinic_Policy_Update.pdf', type: 'pdf', ref: 'SA GEN 251107 A0008', date: 'Nov 07, 2025', color: '#64748B' },
  ]);

  // --- FILTERING ENGINE ---
  const filteredData = useMemo(() => {
    return gridData.filter(item => {
      const matchesSearch = 
        item.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ref.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [gridData, searchTerm, selectedCategory]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  // --- STANDARD HANDLERS ---
  const handleCategoryChange = (rowId, newCategoryName) => {
    const selectedCat = CATEGORY_OPTIONS.find(c => c.name === newCategoryName);
    setGridData(prevData => prevData.map(item => 
      item.id === rowId 
        ? { ...item, category: newCategoryName, color: selectedCat.color } 
        : item
    ));
    setEditingCategoryId(null); 
    setSuccessPopup({ isOpen: true, message: 'Category updated successfully!' });
  };

  const handleAddDocument = (newDoc, isUpdate = false) => {
    if (isUpdate) {
      setGridData(gridData.map(item => item.id === newDoc.id ? newDoc : item));
      setSuccessPopup({ isOpen: true, message: 'Document updated successfully!' });
    } else {
      setGridData([newDoc, ...gridData]);
      setSuccessPopup({ isOpen: true, message: 'Document uploaded successfully!' });
    }
  };

  const handleOpenAdd = () => {
    setEditingDoc(null);
    setIsModalOpen(true);
  };

  const handleEdit = (doc) => {
    setEditingDoc(doc);
    setIsModalOpen(true);
  };

  // --- GLOBAL POPUP DELETE FLOW ---
  const handleDeleteClick = (id) => {
    setConfirmPopup({ isOpen: true, idToDelete: id });
  };

  const executeDelete = () => {
    setGridData(gridData.filter(item => item.id !== confirmPopup.idToDelete));
    setConfirmPopup({ isOpen: false, idToDelete: null });
    setSuccessPopup({ isOpen: true, message: 'Document deleted successfully!' });
  };

  const handleView = (doc) => {
    if (doc.type === 'excel') {
      if (doc.fileUrl) {
         const link = document.createElement('a');
         link.href = doc.fileUrl;
         link.download = doc.fileName;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } else {
         alert(`Downloading Excel File: ${doc.fileName}\n(This will open natively in MS Excel)`);
      }
    } else {
      setViewingDoc(doc);
      setIsViewModalOpen(true);
    }
  };

  // --- EXPORT HANDLERS ---
  const handleExportExcel = () => {
    const headers = "ID,Category,File Name,Ref,Uploaded\n";
    const rows = filteredData.map(e => `${e.id},${e.category},${e.fileName},${e.ref},${e.date}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Library_Documents.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPdf = async () => {
    try {
      const { default: jsPDF } = await import('jspdf');
      await import('jspdf-autotable');

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0); 
      doc.text("Library Documents", 14, 20);

      const tableColumn = ["#", "Category", "File Name", "Uploaded"];
      const tableRows = filteredData.map(item => [
        item.id,
        item.category,
        item.fileName,
        item.date
      ]);

      doc.autoTable({
        startY: 28,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [24, 119, 242], textColor: 255, fontStyle: 'bold', fontSize: 10 },
        bodyStyles: { textColor: 50, fontSize: 9, cellPadding: 4 },
        alternateRowStyles: { fillColor: [248, 249, 250] },
        columnStyles: {
          0: { cellWidth: 15 }, 
          1: { cellWidth: 45 }, 
          2: { cellWidth: 95 }, 
          3: { cellWidth: 30 }, 
        },
        styles: { font: 'helvetica', lineColor: [220, 220, 220], lineWidth: 0.1 }
      });

      doc.save('Library_Documents.pdf');

    } catch (error) {
      console.error("PDF Error:", error);
      alert("Please open your terminal and run:\n\nnpm install jspdf jspdf-autotable");
    }
  };

  const FileIcon = ({ type }) => {
    switch(type) {
      case 'excel': return <FileSpreadsheet size={16} className="text-[#16A34A]" strokeWidth={2.5} />;
      case 'pdf': return <FileText size={16} className="text-[#DC2626]" strokeWidth={2.5} />;
      case 'word': return <FileCode2 size={16} className="text-[#3B82F6]" strokeWidth={2.5} />;
      case 'image': return <ImageIcon size={16} className="text-[#EAB308]" strokeWidth={2.5} />;
      default: return <FileText size={16} className="text-slate-400" strokeWidth={2.5} />;
    }
  };

  const gridClasses = `
    [&_.dx-datagrid-headers]:!bg-[#F8FAFC] 
    [&_.dx-datagrid-headers_td]:!border-b-2
    [&_.dx-datagrid-headers_td]:!border-slate-300
    [&_.dx-datagrid-headers_td]:!py-3
    [&_.dx-datagrid-text-content]:!text-slate-600
    [&_.dx-datagrid-text-content]:!font-bold
    [&_.dx-datagrid-text-content]:!text-[12px]
    [&_.dx-row-alt>td]:!bg-[#fcfdfe]
    [&_.dx-data-row>td]:!py-1
    [&_.dx-data-row>td]:!align-middle
    [&_.dx-data-row]:!h-[48px] 
    [&_.dx-data-row>td]:!text-slate-700
    [&_.dx-data-row>td]:!text-[12.5px]
    [&_.dx-data-row>td]:!font-medium
    [&_.dx-datagrid-table_td]:!border-slate-200
  `;

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden relative">
      
      {/* RESPONSIVE HEADER */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 shrink-0 gap-4 bg-white">
        
        {/* Title */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <FolderOpen size={24} className="text-[#007BFF]" strokeWidth={2.5} />
          <h1 className="text-[16px] sm:text-[18px] font-black text-[#007BFF] tracking-wide">
            Library Documents
          </h1>
        </div>

        {/* Controls - Stacking efficiently on mobile */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          
          {/* Search Bar - Full width on very small screens, auto otherwise */}
          <div className="relative group w-full sm:w-auto flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#007BFF] transition-colors" size={15} />
            <input 
              type="text" 
              placeholder="Search by file name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-full text-[13px] w-full sm:w-[240px] focus:border-[#007BFF] focus:ring-2 focus:ring-blue-50 outline-none transition-all" 
            />
          </div>
          
          {/* Category Dropdown */}
          <div className="relative w-full sm:w-auto flex-1 sm:flex-none">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none flex items-center pl-4 pr-9 py-1.5 border border-slate-300 rounded-full text-[13px] font-medium text-slate-600 bg-white hover:bg-slate-50 transition-colors outline-none cursor-pointer w-full sm:min-w-[120px]"
            >
              <option value="All">All Categories</option>
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
          </div>

          {/* Reset Filters */}
          <button 
            onClick={handleResetFilters}
            title="Reset Filters"
            className="w-8 h-8 flex items-center justify-center border border-slate-300 bg-white hover:bg-slate-50 rounded-full text-slate-500 transition-colors shrink-0"
          >
            <RotateCcw size={14} strokeWidth={2.5} />
          </button>

          <div className="w-[1px] h-[20px] bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Action Buttons Group */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto mt-1 sm:mt-0">
            <button 
              onClick={handleOpenAdd}
              className="flex items-center justify-center gap-1.5 bg-[#007BFF] text-white px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm hover:bg-[#0056b3] transition-colors flex-1 sm:flex-none"
            >
              <Plus size={14} strokeWidth={3} /> Add Doc
            </button>

            <button onClick={handleExportExcel} className="flex items-center justify-center gap-1.5 bg-[#16A34A] text-white px-3 sm:px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm hover:bg-[#15803d] transition-colors flex-1 sm:flex-none">
              <FileSpreadsheet size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">Excel</span>
            </button>
            
            <button onClick={handleExportPdf} className="flex items-center justify-center gap-1.5 bg-[#DC2626] text-white px-3 sm:px-4 py-1.5 rounded-full text-[12px] font-bold shadow-sm hover:bg-[#B91C1C] transition-colors flex-1 sm:flex-none">
              <FileText size={14} strokeWidth={2.5} /> <span className="hidden sm:inline">PDF</span>
            </button>
          </div>

        </div>
      </div>

      {/* DATA GRID */}
      <div className={`flex-1 overflow-hidden bg-white w-full custom-footer-grid ${gridClasses}`}>
        <style>{`
          .custom-footer-grid .dx-datagrid-pager { border-top: 1px solid #e2e8f0 !important; padding: 0 !important; }
          .custom-footer-grid .dx-datagrid-pager::before {
            content: 'Total Documents: ${filteredData.length}';
            display: block; width: 100%; padding: 10px 16px; font-size: 13px; font-weight: 700; color: #475569; border-bottom: 1px solid #e2e8f0; text-align: left; background-color: #f8fafc;
          }
          .custom-footer-grid .dx-pager { padding: 10px 16px !important; }
        `}</style>

        <DataGrid 
          dataSource={filteredData} 
          showBorders={true} 
          showRowLines={true} 
          showColumnLines={true}
          rowAlternationEnabled={true} 
          hoverStateEnabled={true} 
          columnAutoWidth={true} // Ensures columns squish appropriately or trigger horizontal scroll
          height="100%"
          width="100%"
        >
          <Scrolling mode="standard" showScrollbar="always" />
          
          <Column dataField="id" caption="#" width={50} alignment="center" cssClass="font-semibold text-slate-400" />
          
          <Column 
            caption="Category" 
            minWidth={200}
            cellRender={(data) => {
              const isEditing = editingCategoryId === data.data.id;

              if (isEditing) {
                return (
                  <div className="flex items-center gap-1.5 px-1 w-full animate-in fade-in duration-200">
                    <select
                      autoFocus
                      className="flex-1 text-[11px] font-bold text-slate-700 bg-white border-2 border-[#007BFF] rounded-md px-2 py-1 outline-none shadow-sm cursor-pointer"
                      value={data.data.category}
                      onChange={(e) => handleCategoryChange(data.data.id, e.target.value)}
                    >
                      {CATEGORY_OPTIONS.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => setEditingCategoryId(null)}
                      className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-slate-50 transition-colors shadow-sm shrink-0"
                    >
                      <X size={12} strokeWidth={3} className="text-slate-400 hover:text-rose-500"/>
                    </button>
                  </div>
                );
              }

              return (
                <div className="flex items-center justify-between px-1 w-full gap-2">
                  <span 
                    className="px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider truncate" 
                    style={{ backgroundColor: data.data.color }}
                  >
                    {data.data.category}
                  </span>
                  <button 
                    onClick={() => setEditingCategoryId(data.data.id)}
                    className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center bg-white hover:bg-emerald-50 hover:border-emerald-200 transition-colors shadow-sm shrink-0"
                    title="Edit Category"
                  >
                    <Pencil size={11} strokeWidth={2.5} className="text-emerald-500"/>
                  </button>
                </div>
              );
            }} 
          />

          <Column 
            caption="File Name" 
            minWidth={220}
            cellRender={(data) => (
              <div className="flex items-center gap-2.5">
                <FileIcon type={data.data.type} />
                <span onClick={() => handleView(data.data)} className="text-slate-800 font-bold text-[13px] hover:text-[#007BFF] hover:underline cursor-pointer truncate">
                  {data.data.fileName}
                </span>
              </div>
            )} 
          />

          <Column 
            dataField="ref" 
            caption="Ref" 
            minWidth={200}
            cellRender={(data) => <DocumentReference refData={data.value} />} 
          />

          <Column 
            dataField="date" 
            caption="Uploaded" 
            minWidth={110}
            cellRender={(data) => <span className="text-[12px] text-slate-600 font-bold">{data.value}</span>}
          />

          <Column 
            caption="Actions" 
            width={120} 
            alignment="center"
            fixed={true}
            fixedPosition="right"
            cellRender={(data) => (
              <div className="flex justify-center gap-2 h-full items-center">
                <button onClick={() => handleView(data.data)} className="w-[26px] h-[26px] rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all shadow-sm group">
                  <Eye size={12} strokeWidth={2.5} className="text-[#007BFF] group-hover:scale-110 transition-transform" />
                </button>
                <button onClick={() => handleEdit(data.data)} className="w-[26px] h-[26px] rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center transition-all shadow-sm group">
                  <Pencil size={12} strokeWidth={2.5} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                </button>
                <button onClick={() => handleDeleteClick(data.data.id)} className="w-[26px] h-[26px] rounded-full border border-slate-200 bg-white hover:bg-rose-50 flex items-center justify-center transition-all shadow-sm group">
                  <Trash2 size={12} strokeWidth={2.5} className="text-rose-500 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            )} 
          />
          
          <Paging defaultPageSize={20} />
          <Pager visible={true} allowedPageSizes={[10, 20, 50]} showPageSizeSelector={true} showInfo={true} showNavigationButtons={true} />
        </DataGrid>
      </div>

      {/* --- ALL MODALS & POPUPS --- */}
      <AddDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSaveDocument={handleAddDocument} 
        editData={editingDoc}
      />

      <ViewDocumentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        document={viewingDoc}
      />

      <ConfirmPopup 
        isOpen={confirmPopup.isOpen}
        onClose={() => setConfirmPopup({ isOpen: false, idToDelete: null })}
        onConfirm={executeDelete}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
      />

      <SuccessPopup 
        isOpen={successPopup.isOpen}
        onClose={() => setSuccessPopup({ isOpen: false, message: '' })}
        message={successPopup.message}
        title="Success"
      />

    </div>
  );
};

export default LibraryPage;