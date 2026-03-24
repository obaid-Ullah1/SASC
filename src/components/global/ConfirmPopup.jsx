import React from 'react';

const ConfirmPopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type = 'delete', 
  itemName = 'record' 
}) => {
  if (!isOpen) return null;

  // Dynamic Theme Mapping based on action type
  const isDelete = type === 'delete';
  const themeColor = isDelete ? '#F43F5E' : '#52A8FF'; // Rose-500 for Delete, Sky Blue for Update
  const shadowColor = isDelete ? 'rgba(244,63,94,0.4)' : 'rgba(82,168,255,0.4)';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* White Card Container - Matched to SuccessPopup */}
      <div className="bg-white rounded-[3rem] w-full max-w-[360px] p-10 flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden animate-in zoom-in-90 slide-in-from-bottom-8 duration-300">

        {/* Icon & Bubbles Container */}
        <div className="relative w-28 h-28 mb-8 mt-2">
          
          {/* Floating Bubbles perfectly mapped to your design with dynamic colors */}
          <div className="absolute -top-3 left-2 w-5 h-5 rounded-full opacity-90 animate-pulse" style={{ backgroundColor: themeColor }}></div>
          <div className="absolute top-4 -right-4 w-6 h-6 rounded-full opacity-90 animate-pulse delay-75" style={{ backgroundColor: themeColor }}></div>
          <div className="absolute -bottom-5 left-4 w-5 h-5 rounded-full opacity-90 animate-pulse delay-150" style={{ backgroundColor: themeColor }}></div>
          <div className="absolute top-1/2 -left-6 w-2.5 h-2.5 rounded-full opacity-90 animate-pulse delay-200" style={{ backgroundColor: themeColor }}></div>
          <div className="absolute -bottom-1 right-1 w-3 h-3 rounded-full opacity-90 animate-pulse delay-300" style={{ backgroundColor: themeColor }}></div>

          {/* Main Circle */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center z-10"
            style={{ backgroundColor: themeColor, boxShadow: `0 15px 35px -5px ${shadowColor}` }}
          >
            {/* Dynamic SVG based on action */}
            {isDelete ? (
               // Trash Icon for Delete
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            ) : (
              // Question/Help Icon for Update
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            )}
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[26px] font-extrabold text-[#2A333A] leading-[1.2] mb-3 tracking-tight">
          {isDelete ? 'Delete Record?' : 'Update Record?'}
        </h2>
        
        <p className="text-[14px] font-medium text-[#64748B] leading-relaxed px-2">
          {isDelete 
            ? `Are you sure you want to delete this ${itemName}? This action cannot be undone.` 
            : `Are you sure you want to save these changes to the ${itemName}?`}
        </p>

        {/* Action Buttons */}
        <div className="flex w-full gap-3 mt-8">
          <button 
            onClick={onClose} 
            className="flex-1 py-3.5 rounded-2xl bg-slate-100 text-slate-500 font-extrabold text-[13px] uppercase tracking-wider hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3.5 rounded-2xl text-white font-extrabold text-[13px] uppercase tracking-wider hover:opacity-90 transition-opacity active:scale-95"
            style={{ backgroundColor: themeColor, boxShadow: `0 10px 25px -5px ${shadowColor}` }}
          >
            {isDelete ? 'Delete' : 'Confirm'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmPopup;