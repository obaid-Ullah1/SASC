import React from 'react';
import { 
  X, 
  Syringe, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText 
} from 'lucide-react';

// --- HELPER FUNCTION: Calculate Runtime Status ---
// This analyzes the current date against the expiry date
const calculateStatus = (expiryDateString) => {
  if (!expiryDateString) return { label: 'Unknown', style: 'bg-slate-100 text-slate-600 border-slate-200', icon: AlertCircle };

  const today = new Date();
  // Strip time for a pure date comparison
  today.setHours(0, 0, 0, 0); 
  
  const expiryDate = new Date(expiryDateString);
  
  // Calculate the difference in time
  const diffTime = expiryDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { 
      label: 'Expired', 
      style: 'bg-rose-100 text-rose-700 border-rose-200', 
      icon: AlertCircle 
    };
  } else if (diffDays <= 30) { // Considered "Near Expiry" if within 30 days
    return { 
      label: `Expiring Soon (${diffDays}d)`, 
      style: 'bg-amber-100 text-amber-700 border-amber-200', 
      icon: Clock 
    };
  } else {
    return { 
      label: 'Active', 
      style: 'bg-emerald-100 text-emerald-700 border-emerald-200', 
      icon: CheckCircle2 
    };
  }
};

// --- MAIN COMPONENT ---
const ReferenceLog = ({ isOpen, onClose, logs }) => {
  if (!isOpen) return null;

  // MOCK DATA: If no logs are passed via props yet, use these to demonstrate the dynamic statuses.
  // Note: Using dates relative to your current 2026 timeline.
  const displayLogs = logs || [
    { id: 1, refNo: '-', saRef: 'SAI-001', createdOn: '01/22/2026', expiryDate: '03/15/2026' }, // Past date (Expired)
    { id: 2, refNo: 'REF-892', saRef: 'SAI-002', createdOn: '02/10/2026', expiryDate: '04/20/2026' }, // Near future (Expiring Soon)
    { id: 3, refNo: 'REF-893', saRef: 'SAI-003', createdOn: '03/01/2026', expiryDate: '12/01/2026' }, // Far future (Active)
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200 antialiased">
      
      {/* Main Container */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 font-sans flex flex-col max-h-[90vh]">
        
        {/* HEADER: Matching the Light Sky Blue Gradient Theme */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-sky-100 to-white border-b border-sky-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white text-[#00A3FF] rounded-lg shadow-sm border border-sky-100">
              <FileText size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-slate-800 leading-tight">
                Inventory Reference Log
              </h3>
              <p className="text-[13px] text-slate-500 mt-0.5">
                Track historical references and monitor expiration statuses
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* TABLE BODY */}
        <div className="p-6 bg-slate-50/50 overflow-y-auto flex-1">
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              
              {/* Table Header: Clean, light styling instead of heavy black */}
              <thead className="bg-slate-100/80 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 w-16 text-center">#</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 border-l border-slate-200">Ref No</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 border-l border-slate-200">SA Ref</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 border-l border-slate-200">Created On</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 border-l border-slate-200">Expiry Date</th>
                  <th className="py-3 px-4 text-[13px] font-semibold text-slate-600 border-l border-slate-200">Runtime Status</th>
                </tr>
              </thead>
              
              {/* Table Rows */}
              <tbody className="text-[13px] text-slate-700">
                {displayLogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500 font-medium">
                      No reference logs found.
                    </td>
                  </tr>
                ) : (
                  displayLogs.map((log, index) => {
                    // Calculate status dynamically for each row
                    const status = calculateStatus(log.expiryDate);
                    const StatusIcon = status.icon;

                    return (
                      <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0">
                        <td className="py-3.5 px-4 text-center text-slate-500 font-medium">{index + 1}</td>
                        
                        <td className="py-3.5 px-4 border-l border-slate-100 font-medium">
                          {log.refNo || <span className="text-slate-400 italic">--</span>}
                        </td>
                        
                        <td className="py-3.5 px-4 border-l border-slate-100 font-semibold text-slate-800">
                          {log.saRef}
                        </td>
                        
                        <td className="py-3.5 px-4 border-l border-slate-100">
                          {log.createdOn}
                        </td>

                        <td className="py-3.5 px-4 border-l border-slate-100">
                          {log.expiryDate}
                        </td>
                        
                        <td className="py-3.5 px-4 border-l border-slate-100">
                          {/* Dynamic Status Pill */}
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-bold border shadow-sm ${status.style}`}>
                            <StatusIcon size={14} strokeWidth={2.5} />
                            {status.label}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex items-center justify-end shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg text-[13px] hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm focus:ring-2 focus:ring-slate-200 outline-none flex items-center gap-2"
          >
            <X size={16} /> Close Log
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReferenceLog;