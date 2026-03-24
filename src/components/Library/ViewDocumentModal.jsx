import React from 'react';
import { X, FileText, Download, AlertCircle } from 'lucide-react';

const ViewDocumentModal = ({ isOpen, onClose, document }) => {
  if (!isOpen || !document) return null;

  // Handle native download triggered from the modal
  const handleDownload = () => {
    if (document.fileUrl) {
      const link = document.createElement('a');
      link.href = document.fileUrl;
      link.download = document.fileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } else {
      alert("This is a mock document. Please upload a real file to download it.");
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 text-[#007BFF] rounded-lg">
               <FileText size={20} strokeWidth={2.5} />
             </div>
             <div>
               <h2 className="text-[16px] font-bold text-slate-800">{document.fileName}</h2>
               <p className="text-[12px] font-semibold text-slate-500">{document.category} • {document.ref}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download size={16} strokeWidth={2.5} /> Download
            </button>
            <div className="w-[1px] h-[24px] bg-slate-300 mx-1"></div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Dynamic Viewer Area */}
        <div className="flex-1 bg-slate-200 p-4 md:p-8 overflow-hidden flex items-center justify-center relative">
           
           {!document.fileUrl ? (
             // FALLBACK: If it's the hardcoded dummy data from the grid
             <div className="w-full h-full max-w-3xl bg-white shadow-md border border-slate-300 flex flex-col items-center justify-center text-slate-400 rounded-xl">
                <AlertCircle size={64} className="mb-4 text-amber-400 opacity-50" />
                <p className="font-bold text-lg text-slate-600">Mock Data Preview</p>
                <p className="text-sm font-medium mt-2 text-center max-w-md">
                  This is a placeholder row. Please click <b>"Add Document"</b>, upload a real PDF or Image, and then click View!
                </p>
             </div>
           ) : document.type === 'pdf' ? (
             // PDF VIEWER
             <iframe 
                src={`${document.fileUrl}#toolbar=0`} 
                className="w-full h-full rounded-xl shadow-lg border border-slate-300 bg-white" 
                title="PDF Viewer" 
             />
           ) : document.type === 'image' ? (
             // IMAGE VIEWER
             <div className="w-full h-full p-4 bg-white rounded-xl shadow-lg border border-slate-300 flex items-center justify-center">
                <img 
                  src={document.fileUrl} 
                  alt={document.fileName} 
                  className="max-w-full max-h-full object-contain" 
                />
             </div>
           ) : (
             // WORD DOC FALLBACK (Browsers can't render .docx natively)
             <div className="w-full h-full max-w-3xl bg-white shadow-md border border-slate-300 flex flex-col items-center justify-center text-slate-400 rounded-xl">
                <FileText size={64} className="mb-4 text-[#007BFF] opacity-50" />
                <p className="font-bold text-lg text-slate-600">Preview Not Available</p>
                <p className="text-sm font-medium mt-2 text-center max-w-md">
                  Browsers cannot natively preview Word Documents. Please click the download button above to view it.
                </p>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default ViewDocumentModal;