import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { X, Droplet, Layers, CheckCircle2, QrCode, Printer, User as UserIcon, Hash, Pill } from 'lucide-react';

// ==========================================
// 1. VISUAL HELPER: The Horizontal Label (Used in the UI Table)
// ==========================================
const LabelBadge = ({
  colorName = 'Red',
  colorHex = '#EF4444',
  ptCode = 'EIP-001',
  barcodeRef = 'A-6066',
  expDate = '11/14/2025',
  patientNo = '3008',
  injectionName = 'AIT MIX 1',
  volume = '1.55'
}) => {
  const isLightBackground = colorName.toLowerCase() === 'yellow' || colorName.toLowerCase() === 'grey';
  const headerTextColor = isLightBackground ? '#000000' : '#FFFFFF';

  return (
    <div className="flex items-stretch border-[1.5px] border-slate-300 rounded-md overflow-hidden bg-white shadow-sm h-[64px] w-[250px] m-auto">
      {/* Left Box: Color & Barcode */}
      <div className="w-[85px] flex flex-col items-center border-r border-slate-300 bg-white shrink-0 justify-between">
        <div className="w-full text-center text-[10px] font-black py-0.5 tracking-wide" style={{ backgroundColor: colorHex, color: headerTextColor }}>
          {colorName}
        </div>
        <div className="font-black text-[13px] text-slate-900 leading-none mt-1">{ptCode}</div>
        
        {/* Placeholder for Backend Barcode */}
        <div className="h-5 w-16 bg-slate-800 my-0.5 relative opacity-80 flex items-center justify-evenly px-0.5">
          <div className="w-[1.5px] h-full bg-white"></div>
          <div className="w-[2.5px] h-full bg-white"></div>
          <div className="w-[1px] h-full bg-white"></div>
          <div className="w-[2px] h-full bg-white"></div>
          <div className="w-[1.5px] h-full bg-white"></div>
        </div>
        
        <div className="text-[8px] text-slate-500 font-bold mb-1">{barcodeRef}</div>
      </div>
      
      {/* Right Box: Injection Details */}
      <div className="p-1.5 flex flex-col justify-center text-[9px] text-slate-800 leading-[1.3] flex-1 bg-white">
        <div className="flex items-start"><span className="font-black w-[24px] shrink-0">Exp:</span> <span className="font-bold text-slate-600 truncate">{expDate}</span></div>
        <div className="flex items-start"><span className="font-black w-[24px] shrink-0">PtN:</span> <span className="font-bold text-slate-600 truncate">{patientNo}</span></div>
        <div className="flex items-start"><span className="font-black w-[24px] shrink-0">Inj:</span> <span className="font-bold text-slate-600 truncate" title={injectionName}>{injectionName}</span></div>
        <div className="flex items-start"><span className="font-black w-[24px] shrink-0">Vol:</span> <span className="font-bold text-slate-600 truncate">{volume} mL</span></div>
      </div>
    </div>
  );
};

// ==========================================
// 2. PRINT HELPER: The Vertical Sticker (Hidden, used only for printing)
// ==========================================
const PrintBarcodeSticker = ({ row, patient, injection }) => {
  // Split the full name. Assuming format "Lastname, Firstname"
  const nameParts = patient?.fullName?.split(',') || ['Patient', 'Name'];
  const lastName = nameParts[0]?.trim() || '';
  const firstName = nameParts[1]?.trim() || '';

  // A static array of widths to generate a realistic-looking fake barcode
  const barcodePattern = [2,1,2,3,1,1,2,2,1,2,1,3,1,2,2,1,1,2,3,1,2,1,2,2,1,1,2,1];

  return (
    <div className="bg-white flex flex-col text-left font-sans text-black w-[1.75in]">
      {/* Patient Name */}
      <div className="text-[14px] font-bold leading-tight truncate">{lastName}</div>
      <div className="text-[14px] font-bold leading-tight truncate">{firstName}</div>
      
      {/* Mix Details */}
      <div className="text-[13px] font-normal leading-tight truncate mt-[2px]">{injection?.name}</div>
      <div className="text-[13px] font-normal leading-tight truncate">{row?.ratio} ({row?.colorName})</div>
      
      {/* Huge Patient Code (Reduced font size from 32px to 28px, refined margins for crisp alignment) */}
      <div className="text-[28px] font-bold leading-none mt-[4px] mb-[4px] tracking-tight text-black">
        {row?.ptCode}
      </div>
      
      {/* Expiration Date */}
      <div className="text-[13px] font-normal leading-tight mb-[4px]">
        Exp: 09/09/2026
      </div>
      
      {/* CSS Generated Barcode */}
      <div className="flex items-stretch h-6 gap-[1.5px] w-full bg-white">
        {barcodePattern.map((w, i) => (
          <div key={i} className="bg-black" style={{ width: `${w * 1.2}px` }}></div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN MODAL: Injection Course Details
// ==========================================
const InjCourseBarcode = ({ isOpen, onClose, patient, injection }) => {
  const printRef = useRef(null);

  // Initialize react-to-print for the master print button
  const handlePrintAll = useReactToPrint({
    contentRef: printRef,
    content: () => printRef.current,
    documentTitle: `Bottle_Labels_${patient?.patientNo}`,
  });

  if (!isOpen || !patient || !injection) return null;

  const courseDetails = [
    { id: 1, ratio: "1:10", algQty: "0.141 mL stock", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Red", colorHex: "#EF4444", ptCode: "16-M", ref: "A-6066" },
    { id: 2, ratio: "1:100", algQty: "0.141 mL of 1:10", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Yellow", colorHex: "#FDE047", ptCode: "16-M", ref: "A-6067" },
    { id: 3, ratio: "1:1000", algQty: "0.141 mL of 1:100", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Blue", colorHex: "#3B82F6", ptCode: "16-M", ref: "A-6068" },
    { id: 4, ratio: "1:10000", algQty: "0.141 mL of 1:1000", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Green", colorHex: "#10B981", ptCode: "16-M", ref: "A-6069" },
    { id: 5, ratio: "1:100000", algQty: "0.141 mL of 1:10000", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Grey", colorHex: "#94A3B8", ptCode: "16-M", ref: "A-6070" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in duration-200">
        {/* Set max-h to 95vh so it never grows off screen */}
        <div className="bg-white w-full max-w-[1350px] max-h-[95vh] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-300">
          
          {/* Header - Responsive Wrap */}
          <div className="bg-[#10B981] text-white px-4 sm:px-5 py-3 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-[#059669] gap-3 md:gap-0 shrink-0">
            <div className="flex items-center gap-2 font-black text-[16px] sm:text-[18px] tracking-wide w-full md:w-auto justify-between md:justify-start">
              <span className="flex items-center gap-2">
                <Layers size={20} strokeWidth={2.5} /> Injection Course Details
              </span>
              {/* Close button shows here on mobile to be easily clickable */}
              <button onClick={onClose} className="md:hidden text-white hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="bg-white text-slate-800 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-slate-200">
                <UserIcon size={14} className="text-[#10B981]" /> {patient.fullName}
              </div>
              <div className="bg-white text-slate-800 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-slate-200">
                <Hash size={14} className="text-rose-500" /> {patient.patientNo}
              </div>
              <div className="bg-[#00A3FF] text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-blue-400">
                <Pill size={14} className="-rotate-45 shrink-0" /> <span className="truncate max-w-[100px] sm:max-w-none">{injection.name}</span>
              </div>
              {/* Close button hidden on mobile, visible on desktop */}
              <button onClick={onClose} className="hidden md:block ml-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Table Content - flex-1 and overflow-y-auto for vertical scroll */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-slate-50">
            <div className="border border-slate-300 rounded-lg overflow-x-auto shadow-sm bg-white">
              <div className="min-w-[900px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D1E7DD] border-b-2 border-slate-300 text-[11px] sm:text-[12px] font-black text-slate-800">
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 text-center w-10">#</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300">Ratio</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300">Allergen Qty</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300">Diluent Qty</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Volume</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Unit</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Vial Color</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Allergen</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Diluent</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Pt Code</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 text-center">Bar Code</th>
                      <th className="py-2.5 sm:py-3 px-2 sm:px-3 border-l border-slate-300 w-[270px]">Label</th>
                    </tr>
                  </thead>
                  <tbody className="text-[12px] sm:text-[13px] font-bold text-slate-700">
                    {courseDetails.map((row, index) => (
                      <tr key={row.id} className="border-b border-slate-200 hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-2.5 px-2 sm:px-3 text-center text-slate-500">{index + 1}</td>
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-slate-600">{row.ratio}</td>
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-[#10B981]">{row.algQty}</td>
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-[#3B82F6]">{row.dilQty}</td>
                        
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-center">
                          <span className="flex items-center justify-center gap-1 sm:gap-1.5"><Droplet size={14} className="text-slate-800" /> {row.vol}</span>
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-center">
                          <span className="flex items-center justify-center gap-1 sm:gap-1.5"><Layers size={14} className="text-slate-800" /> {row.unit}</span>
                        </td>
                        
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200">
                          <div className="flex items-center justify-center gap-1.5 sm:gap-2 font-black">
                            <div className="w-3.5 h-3.5 rounded-full shadow-sm border border-slate-300 shrink-0" style={{ backgroundColor: row.colorHex }}></div>
                            {row.colorName}
                          </div>
                        </td>
                        
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-center">
                          <CheckCircle2 size={18} className="sm:w-[20px] sm:h-[20px] mx-auto text-[#10B981] fill-[#D1E7DD]" />
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-center">
                          <CheckCircle2 size={18} className="sm:w-[20px] sm:h-[20px] mx-auto text-[#3B82F6] fill-[#DBEAFE]" />
                        </td>
                        
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-center">
                          <span className="bg-[#00A3FF] text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] shadow-sm tracking-wide">{row.ptCode}</span>
                        </td>
                        <td className="py-2.5 px-2 sm:px-3 border-l border-slate-200 text-center">
                          <div className="bg-white p-1 rounded-md inline-block border border-slate-300 shadow-sm hover:border-blue-400 cursor-pointer transition-colors">
                            <QrCode size={20} className="sm:w-[24px] sm:h-[24px] text-slate-700" />
                          </div>
                        </td>
                        
                        <td className="py-2 px-2 sm:px-3 border-l border-slate-200 bg-slate-50/50">
                          <LabelBadge 
                            colorName={row.colorName}
                            colorHex={row.colorHex}
                            ptCode={row.ptCode}
                            barcodeRef={row.ref}
                            patientNo={patient.patientNo}
                            injectionName={injection.name}
                            volume={row.vol}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  
                  {/* Footer Summary Area */}
                  <tfoot>
                    <tr className="bg-[#F8FAFC] border-t-2 border-slate-300">
                      <td colSpan="4" className="py-3 sm:py-4 px-3 sm:px-5 text-right font-black text-slate-800 text-[13px] sm:text-[14px]">Total:</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center border-l border-slate-200">
                        <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5 border border-[#3B82F6] rounded-full px-3 sm:px-4 py-1.5 bg-white text-[#3B82F6] font-black text-[11px] sm:text-[12px] shadow-sm min-w-[70px] sm:min-w-[80px]">
                          <Droplet size={14} className="fill-[#3B82F6]" /> 7.75
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-3 text-center border-l border-slate-200">
                        <span className="inline-flex items-center justify-center gap-1 sm:gap-1.5 border border-[#10B981] rounded-full px-3 sm:px-4 py-1.5 bg-white text-[#10B981] font-black text-[11px] sm:text-[12px] shadow-sm min-w-[70px] sm:min-w-[80px]">
                          <Layers size={14} className="fill-[#10B981]" /> 30
                        </span>
                      </td>
                      <td colSpan="6" className="border-l border-slate-200"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Action Buttons - Stacked on Mobile, Inline on Desktop */}
          <div className="bg-[#F8FAFC] border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-4 shrink-0">
            <button onClick={onClose} className="w-full sm:w-auto flex items-center justify-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 px-8 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95">
              <X size={18} strokeWidth={2.5} /> Close
            </button>
            <button onClick={handlePrintAll} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#00A3FF] hover:bg-[#008fdf] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 border border-[#008fdf]">
              <Printer size={18} strokeWidth={2.5} /> Print All Labels
            </button>
          </div>

        </div>
      </div>

      {/* ==========================================
          4. THE HIDDEN PRINT TEMPLATE (Prints ALL Labels)
      ========================================== */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden left-[-9999px]">
        {/* gap-12 creates the large vertical spacing between labels seen in the thermal printer photo */}
        <div ref={printRef} className="print:p-4 flex flex-col gap-12 bg-white">
          {courseDetails.map((row) => (
            <PrintBarcodeSticker 
              key={row.id}
              row={row} 
              patient={patient} 
              injection={injection} 
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InjCourseBarcode;