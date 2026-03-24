import React, { useState, useRef } from 'react';
import { X, UploadCloud, FileUp, FileText, FileImage, Eye, Trash2, FolderOpen, Paperclip, CheckCircle } from 'lucide-react';
import DataGrid, { Column, Scrolling, Paging, Pager } from 'devextreme-react/data-grid';

// Initial Mock Data
const initialAttachments = [
  { id: 1, category: "Injection Composition", fileName: "AIT List.jpeg", type: "image", uploaded: "10/15/2025" },
  { id: 2, category: "Injection Composition", fileName: "Vaccine Template.docx", type: "word", uploaded: "10/15/2025" },
  { id: 3, category: "Injection Composition", fileName: "Inj Module - 250107 CAIT MIXES.pdf", type: "pdf", uploaded: "10/15/2025" },
  { id: 4, category: "Injection Composition", fileName: "557 CUSTOM Mix 1.pdf", type: "pdf", uploaded: "11/12/2025" },
];

const AttachmentModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  
  // State for functionality
  const [attachments, setAttachments] = useState(initialAttachments);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // --- FUNCTIONALITY LOGIC ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    // Determine basic file type for the icon
    let fileType = 'image';
    if (selectedFile.name.toLowerCase().endsWith('.pdf')) fileType = 'pdf';
    if (selectedFile.name.toLowerCase().endsWith('.doc') || selectedFile.name.toLowerCase().endsWith('.docx')) fileType = 'word';

    const newAttachment = {
      id: attachments.length > 0 ? Math.max(...attachments.map(a => a.id)) + 1 : 1, // Generate a quick ID
      category: "Injection Composition",
      fileName: selectedFile.name,
      type: fileType,
      // Format current date as MM/DD/YYYY
      uploaded: new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    };

    // Add to the top of the grid
    setAttachments([newAttachment, ...attachments]);
    
    // Reset file selection
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (id) => {
    setAttachments(attachments.filter(item => item.id !== id));
  };


  // --- DEVEXTREME RENDERERS ---
  const categoryRender = (cell) => (
    <span className="bg-sky-50 border border-sky-200 text-[#00A3FF] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
      {cell.value}
    </span>
  );

  const fileNameRender = (cell) => {
    const isPdf = cell.data.type === 'pdf';
    const isWord = cell.data.type === 'word';
    return (
      <div className="flex items-center gap-2">
        {isPdf && <FileText size={16} className="text-rose-500 fill-rose-100" />}
        {isWord && <FileText size={16} className="text-[#00A3FF] fill-blue-100" />}
        {!isPdf && !isWord && <FileImage size={16} className="text-amber-500 fill-amber-100" />}
        <span className="text-slate-700 font-bold text-[12.5px] truncate max-w-[200px]" title={cell.value}>
          {cell.value}
        </span>
      </div>
    );
  };

  const actionRender = (cell) => (
    <div className="flex items-center justify-center gap-2">
      <button className="w-8 h-8 rounded-md border border-sky-200 text-[#00A3FF] flex items-center justify-center hover:bg-[#00A3FF] hover:text-white transition-all shadow-sm">
        <Eye size={14} strokeWidth={2.5} />
      </button>
      <button 
        onClick={() => handleDelete(cell.data.id)}
        className="w-8 h-8 rounded-md border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
      >
        <Trash2 size={14} strokeWidth={2.5} />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8">
      
      {/* MODAL CONTAINER */}
      <div className="bg-white border-2 border-sky-200 rounded-xl shadow-2xl w-full max-w-5xl flex flex-col h-[85vh] min-h-[700px] animate-in slide-in-from-top-4 fade-in duration-300 overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] px-6 py-4 flex items-center justify-between border-b border-sky-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-center border border-sky-100">
              <Paperclip size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
            </div>
            <h3 className="font-bold text-sky-900 text-[15px] tracking-wide uppercase leading-tight">
              Manage Attachments
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="bg-white text-rose-500 border border-rose-200 rounded-md hover:bg-rose-500 hover:text-white p-2 transition-all shadow-sm"
          >
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-6">
          
          {/* UPLOAD AREA - Compacted vertical size (py-6 instead of py-12) */}
          <div 
            className={`border-2 border-dashed rounded-xl py-6 px-8 flex flex-col items-center justify-center transition-all duration-200 bg-white shadow-sm shrink-0
              ${dragActive ? 'border-[#00A3FF] bg-sky-50 shadow-inner' : 'border-slate-300 hover:border-[#00A3FF]'}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            
            {/* Conditional UI based on if a file is selected */}
            {!selectedFile ? (
              <>
                <UploadCloud size={36} className="text-[#00A3FF] mb-3" strokeWidth={1.5} />
                <p className="text-slate-600 font-bold text-[13px] mb-4 uppercase tracking-wide">
                  Drag & drop your file here or click below
                </p>
              </>
            ) : (
              <>
                <CheckCircle size={36} className="text-emerald-500 mb-3" strokeWidth={1.5} />
                <p className="text-emerald-600 font-bold text-[13px] mb-4 truncate max-w-sm" title={selectedFile.name}>
                  Selected: {selectedFile.name}
                </p>
              </>
            )}
            
            <div className="flex flex-row items-center gap-3">
              <label className="cursor-pointer border-2 border-[#00A3FF] text-[#00A3FF] font-black text-[11px] uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-sky-50 transition-all shadow-sm flex items-center gap-2">
                <FileUp size={14} strokeWidth={3} />
                {selectedFile ? 'Change File' : 'Choose File'}
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              </label>
              
              <button 
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`font-black text-[11px] uppercase tracking-wider px-10 py-2.5 rounded-lg shadow-md flex items-center gap-2 transition-all active:scale-95
                  ${selectedFile ? 'bg-[#00A3FF] hover:bg-[#008CE6] text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                <UploadCloud size={14} strokeWidth={3} />
                Upload
              </button>
            </div>

            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mt-4">
              Supported: <span className="text-slate-600">PDF, DOCX, XLSX, PNG, JPG</span> — Max 10 MB
            </p>
          </div>

          {/* DATA GRID SECTION - Greatly increased vertical size */}
          <div className="bg-white border-2 border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden flex-1 min-h-[400px]">
            <div className="px-5 py-3 border-b border-slate-200 flex items-center gap-2 bg-slate-50 shrink-0">
              <FolderOpen size={18} className="text-[#00A3FF]" strokeWidth={2.5} />
              <h3 className="font-black text-slate-600 text-[12px] uppercase tracking-wider">Existing Attachments</h3>
            </div>
            
            <div className="w-full flex-1 overflow-hidden">
              <DataGrid
                dataSource={attachments} // Now bound to state
                keyExpr="id"
                showBorders={false}
                showColumnLines={true}
                showRowLines={true}
                rowAlternationEnabled={true}
                hoverStateEnabled={true}
                height="100%"
                className="[&_.dx-datagrid-headers]:!bg-[#F8FAFC] [&_.dx-header-row>td]:!text-slate-500 [&_.dx-header-row>td]:!font-black [&_.dx-header-row>td]:!text-[11px] [&_.dx-header-row>td]:!uppercase [&_.dx-header-row>td]:!tracking-wider [&_.dx-header-row>td]:!py-4 [&_.dx-data-row>td]:!align-middle [&_.dx-data-row>td]:!py-3"
              >
                <Scrolling mode="standard" />
                <Paging defaultPageSize={10} />
                <Pager visible={true} showInfo={true} showPageSizeSelector={true} allowedPageSizes={[5, 10, 20]} />

                <Column dataField="id" caption="#" width={70} alignment="center" cellRender={(cell) => <span className="font-bold text-[#00A3FF] text-[13px]">{cell.value}</span>} />
                <Column dataField="category" caption="CATEGORY" width={240} alignment="left" cellRender={categoryRender} />
                <Column dataField="fileName" caption="FILE NAME" cellRender={fileNameRender} />
                <Column dataField="uploaded" caption="UPLOADED" width={140} alignment="center" cellRender={(cell) => <span className="text-slate-500 font-bold text-[13px]">{cell.value}</span>} />
                <Column caption="ACTIONS" width={140} alignment="center" cellRender={actionRender} />
              </DataGrid>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AttachmentModal;