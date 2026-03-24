import React, { useState, useRef, useEffect } from 'react';
import { X, UploadCloud, File, Network, ChevronDown, PlusCircle, Upload, Edit } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { name: 'INVENTORY', color: '#DC2626' },
  { name: 'INJECTION COMPOSITION', color: '#3B82F6' },
  { name: 'APPOINTMENT', color: '#e000e0' },
  { name: 'INJECTION CONTAINER', color: '#F59E0B' },
  { name: 'ASSESSMENT', color: '#10B981' },
  { name: 'GENERAL', color: '#64748B' }
];

const AddDocumentModal = ({ isOpen, onClose, onSaveDocument, editData = null }) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState('ASSESSMENT');
  const [existingFileName, setExistingFileName] = useState('');

  useEffect(() => {
    if (editData) {
      setCategory(editData.category || 'ASSESSMENT');
      setExistingFileName(editData.fileName || '');
      setSelectedFile(null); 
    } else {
      setCategory('ASSESSMENT');
      setExistingFileName('');
      setSelectedFile(null);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!editData && !selectedFile) return;

    const finalFileName = selectedFile ? selectedFile.name : existingFileName;
    const ext = finalFileName.split('.').pop().toLowerCase();
    
    let type = 'pdf';
    if (['xls', 'xlsx'].includes(ext)) type = 'excel';
    if (['doc', 'docx'].includes(ext)) type = 'word';
    if (['jpg', 'jpeg', 'png'].includes(ext)) type = 'image';

    const selectedCat = CATEGORY_OPTIONS.find(c => c.name === category) || CATEGORY_OPTIONS[5];
    const catCode = category.substring(0,3).toUpperCase();
    const dateCode = new Date().toISOString().slice(2,10).replace(/-/g,'');

    // THIS IS THE MAGIC LINE: It creates a temporary URL so the browser can display the file!
    const fileUrl = selectedFile ? URL.createObjectURL(selectedFile) : (editData?.fileUrl || null);

    const docData = {
      id: editData ? editData.id : Date.now(), 
      category: category,
      fileName: finalFileName,
      type: type,
      fileUrl: fileUrl, // <--- Added the URL here
      ref: editData ? editData.ref : `SA ${catCode} ${dateCode} NEW`,
      date: editData ? editData.date : new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      color: selectedCat.color
    };

    onSaveDocument(docData, !!editData); 
    onClose();
  };

  const isEditing = !!editData;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#F8FAFC] rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-slate-200">
        
        <div className="flex items-center justify-between px-8 py-5 bg-[#007BFF] shrink-0">
          <div className="flex items-center gap-2 text-white">
             {isEditing ? <Edit size={22} strokeWidth={2.5} /> : <PlusCircle size={22} strokeWidth={2.5} />}
             <h2 className="text-[18px] font-bold tracking-wide">
               {isEditing ? 'Edit Library Document' : 'Add New Library Document'}
             </h2>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-10 flex flex-col gap-8">
          <div>
            <label className="block text-[14px] font-semibold text-slate-500 mb-2">Category</label>
            <div className="relative w-1/2 min-w-[280px]">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Network size={18} strokeWidth={2} />
              </div>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-lg text-[15px] font-medium text-slate-700 outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-blue-100 transition-all appearance-none cursor-pointer shadow-sm"
              >
                {CATEGORY_OPTIONS.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div 
            className={`relative flex flex-col items-center justify-center w-full py-16 bg-white border-2 ${dragActive ? 'border-[#007BFF] bg-blue-50 scale-[1.02]' : 'border-dashed border-slate-300 hover:bg-slate-50 hover:border-slate-400'} rounded-xl transition-all`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
          >
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange} accept=".pdf,.docx,.xlsx,.png,.jpg,.jpeg" />
            
            {!selectedFile && !isEditing ? (
              <div className="flex flex-col items-center pointer-events-none text-center">
                <UploadCloud size={52} className="text-[#007BFF] mb-5" strokeWidth={1.5}/>
                <p className="text-[16px] font-medium text-slate-600 mb-5">Drag & drop your file here or click below</p>
                <button type="button" onClick={() => fileInputRef.current.click()} className="px-8 py-2.5 border border-[#007BFF] text-[#007BFF] rounded-full text-[15px] font-bold hover:bg-blue-50 transition-colors flex items-center gap-2 pointer-events-auto">
                  <Upload size={18} strokeWidth={2.5} /> Choose File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-in fade-in">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                  <File size={32} className="text-[#007BFF]" strokeWidth={2} />
                </div>
                <p className="text-[16px] font-bold text-slate-800 text-center px-6 truncate max-w-[500px]">
                  {selectedFile ? selectedFile.name : existingFileName}
                </p>
                <p className="text-[14px] font-medium text-slate-500 mt-2 mb-6">
                  {selectedFile ? 'Ready to upload' : 'Current active file'}
                </p>
                <button type="button" onClick={() => fileInputRef.current.click()} className="px-6 py-2 border border-slate-300 text-slate-600 rounded-full text-[13px] font-bold hover:bg-slate-50 transition-colors">
                  Replace File
                </button>
              </div>
            )}
          </div>

          <div className="text-center mt-[-16px]">
             <p className="text-[13px] text-slate-500">
               Supported: <strong className="font-bold text-slate-700">PDF, DOCX, XLSX, PNG, JPG</strong> — Max 10 MB
             </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 px-8 py-5 border-t border-slate-200 bg-slate-50">
          <button onClick={onClose} className="px-6 py-2.5 rounded-lg text-[15px] font-bold text-slate-600 bg-white border border-slate-300 hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!selectedFile && !isEditing}
            className="px-8 py-2.5 rounded-full text-[15px] font-bold text-white bg-[#007BFF] hover:bg-[#0056b3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm flex items-center gap-2"
          >
            {isEditing ? <Edit size={18} strokeWidth={2.5} /> : <UploadCloud size={18} strokeWidth={2.5} />}
            {isEditing ? 'Save Changes' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;