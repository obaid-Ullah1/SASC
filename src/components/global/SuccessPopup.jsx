import React, { useEffect, useState } from 'react';

const SuccessPopup = ({ isOpen, onClose, type = 'Updated' }) => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Formats date perfectly to match design
      const now = new Date();
      const optionsDate = { month: 'long', day: '2-digit' };
      const datePart = now.toLocaleDateString('en-US', optionsDate);
      const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      setCurrentDateTime(`${datePart}, at ${timePart}`);

      // SUPER QUICK DISMISS: Set to 800ms (0.8 seconds)
      const timer = setTimeout(() => {
        onClose();
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Converts "Added" or "Updated" to lowercase for the sentence
  const actionText = type.toLowerCase();

  return (
    // Sped up the fade-in animation to duration-150 for snappier feel
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      
      {/* White Card Container - Sped up zoom-in to duration-150 */}
      <div className="bg-white rounded-[3rem] w-full max-w-[360px] p-10 flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-150">

        {/* Icon & Bubbles Container */}
        <div className="relative w-32 h-32 mb-8 mt-2">
          
          {/* Floating Bubbles */}
          <div className="absolute -top-3 left-2 w-5 h-5 bg-[#52A8FF] rounded-full opacity-90 animate-pulse"></div>
          <div className="absolute top-4 -right-4 w-6 h-6 bg-[#52A8FF] rounded-full opacity-90 animate-pulse delay-75"></div>
          <div className="absolute -bottom-5 left-4 w-5 h-5 bg-[#52A8FF] rounded-full opacity-90 animate-pulse delay-150"></div>
          <div className="absolute top-1/2 -left-6 w-2.5 h-2.5 bg-[#52A8FF] rounded-full opacity-90 animate-pulse delay-200"></div>
          <div className="absolute -bottom-1 right-1 w-3 h-3 bg-[#52A8FF] rounded-full opacity-90 animate-pulse delay-300"></div>

          {/* Main Blue Circle */}
          <div className="absolute inset-0 bg-[#52A8FF] rounded-full shadow-[0_15px_35px_-5px_rgba(82,168,255,0.4)] flex items-center justify-center z-10">
            
            {/* Custom Solid Thumbs Up SVG */}
            <svg width="64" height="64" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-[28px] font-extrabold text-[#2A333A] leading-[1.2] mb-3 tracking-tight">
          Record {type} <br/> Successfully
        </h2>
        
        <p className="text-[15px] font-medium text-[#64748B] leading-relaxed px-2">
          You have {actionText} record successfully on <br/> {currentDateTime}
        </p>

      </div>
    </div>
  );
};

export default SuccessPopup;