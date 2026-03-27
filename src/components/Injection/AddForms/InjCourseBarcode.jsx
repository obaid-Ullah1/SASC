import React from 'react';
import { X, Droplet, Layers, CheckCircle2, QrCode, Printer, User as UserIcon, Hash, Pill } from 'lucide-react';

// ==========================================
// 1. HELPER: The Barcode Label (Frontend Dummy)
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
// 2. MAIN MODAL: Injection Course Details
// ==========================================
const InjCourseBarcode = ({ isOpen, onClose, patient, injection }) => {
  if (!isOpen || !patient || !injection) return null;

  const courseDetails = [
    { id: 1, ratio: "1:10", algQty: "0.141 mL stock", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Red", colorHex: "#EF4444", ptCode: "EIP-001", ref: "A-6066" },
    { id: 2, ratio: "1:100", algQty: "0.141 mL of 1:10", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Yellow", colorHex: "#FDE047", ptCode: "EIP-002", ref: "A-6067" },
    { id: 3, ratio: "1:1000", algQty: "0.141 mL of 1:100", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Blue", colorHex: "#3B82F6", ptCode: "EIP-003", ref: "A-6068" },
    { id: 4, ratio: "1:10000", algQty: "0.141 mL of 1:1000", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Green", colorHex: "#10B981", ptCode: "EIP-004", ref: "A-6069" },
    { id: 5, ratio: "1:100000", algQty: "0.141 mL of 1:10000", dilQty: "1.409", vol: 1.55, unit: 6, colorName: "Grey", colorHex: "#94A3B8", ptCode: "EIP-005", ref: "A-6070" },
  ];

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-[1350px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-300">
        
        {/* Header - Professional Green */}
        <div className="bg-[#10B981] text-white px-5 py-3 flex items-center justify-between border-b border-[#059669]">
          <div className="flex items-center gap-2 font-black text-[18px] tracking-wide">
            <Layers size={20} strokeWidth={2.5} /> Injection Course Details
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white text-slate-800 px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-slate-200">
              <UserIcon size={14} className="text-[#10B981]" /> {patient.fullName}
            </div>
            <div className="bg-white text-slate-800 px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-slate-200">
              <Hash size={14} className="text-rose-500" /> {patient.patientNo}
            </div>
            <div className="bg-[#00A3FF] text-white px-3 py-1 rounded-full text-[11px] font-black flex items-center gap-1.5 shadow-sm border border-blue-400">
              <Pill size={14} className="-rotate-45" /> {injection.name}
            </div>
            <button onClick={onClose} className="ml-2 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto p-4 bg-slate-50">
          <div className="border border-slate-300 rounded-lg overflow-hidden shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#D1E7DD] border-b-2 border-slate-300 text-[12px] font-black text-slate-800">
                  <th className="py-3 px-3 text-center w-10">#</th>
                  <th className="py-3 px-3 border-l border-slate-300">Ratio</th>
                  <th className="py-3 px-3 border-l border-slate-300">Allergen Qty</th>
                  <th className="py-3 px-3 border-l border-slate-300">Diluent Qty</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Volume</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Unit</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Vial Color</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Allergen</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Diluent</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Pt Code</th>
                  <th className="py-3 px-3 border-l border-slate-300 text-center">Bar Code</th>
                  <th className="py-3 px-3 border-l border-slate-300 w-[270px]">Label</th>
                </tr>
              </thead>
              <tbody className="text-[13px] font-bold text-slate-700">
                {courseDetails.map((row, index) => (
                  <tr key={row.id} className="border-b border-slate-200 hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-2.5 px-3 text-center text-slate-500">{index + 1}</td>
                    <td className="py-2.5 px-3 border-l border-slate-200 text-slate-600">{row.ratio}</td>
                    <td className="py-2.5 px-3 border-l border-slate-200 text-[#10B981]">{row.algQty}</td>
                    <td className="py-2.5 px-3 border-l border-slate-200 text-[#3B82F6]">{row.dilQty}</td>
                    
                    <td className="py-2.5 px-3 border-l border-slate-200 text-center">
                      <span className="flex items-center justify-center gap-1.5"><Droplet size={14} className="text-slate-800" /> {row.vol}</span>
                    </td>
                    <td className="py-2.5 px-3 border-l border-slate-200 text-center">
                      <span className="flex items-center justify-center gap-1.5"><Layers size={14} className="text-slate-800" /> {row.unit}</span>
                    </td>
                    
                    <td className="py-2.5 px-3 border-l border-slate-200">
                      <div className="flex items-center justify-center gap-2 font-black">
                        <div className="w-3.5 h-3.5 rounded-full shadow-sm border border-slate-300" style={{ backgroundColor: row.colorHex }}></div>
                        {row.colorName}
                      </div>
                    </td>
                    
                    <td className="py-2.5 px-3 border-l border-slate-200 text-center">
                      <CheckCircle2 size={20} className="mx-auto text-[#10B981] fill-[#D1E7DD]" />
                    </td>
                    <td className="py-2.5 px-3 border-l border-slate-200 text-center">
                      <CheckCircle2 size={20} className="mx-auto text-[#3B82F6] fill-[#DBEAFE]" />
                    </td>
                    
                    <td className="py-2.5 px-3 border-l border-slate-200 text-center">
                      <span className="bg-[#00A3FF] text-white px-3 py-1 rounded-full text-[11px] shadow-sm tracking-wide">{row.ptCode}</span>
                    </td>
                    <td className="py-2.5 px-3 border-l border-slate-200 text-center">
                      <div className="bg-white p-1 rounded-md inline-block border border-slate-300 shadow-sm hover:border-blue-400 cursor-pointer transition-colors">
                        <QrCode size={24} className="text-slate-700" />
                      </div>
                    </td>
                    
                    <td className="py-2 px-3 border-l border-slate-200 bg-slate-50/50">
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
                  <td colSpan="4" className="py-4 px-5 text-right font-black text-slate-800 text-[14px]">Total:</td>
                  <td className="py-4 px-3 text-center border-l border-slate-200">
                    <span className="inline-flex items-center justify-center gap-1.5 border border-[#3B82F6] rounded-full px-4 py-1.5 bg-white text-[#3B82F6] font-black text-[12px] shadow-sm min-w-[80px]">
                      <Droplet size={14} className="fill-[#3B82F6]" /> 7.75
                    </span>
                  </td>
                  <td className="py-4 px-3 text-center border-l border-slate-200">
                    <span className="inline-flex items-center justify-center gap-1.5 border border-[#10B981] rounded-full px-4 py-1.5 bg-white text-[#10B981] font-black text-[12px] shadow-sm min-w-[80px]">
                      <Layers size={14} className="fill-[#10B981]" /> 30
                    </span>
                  </td>
                  <td colSpan="6" className="border-l border-slate-200"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-[#F8FAFC] border-t border-slate-200 px-6 py-4 flex justify-end gap-4 shrink-0">
          <button onClick={onClose} className="flex items-center gap-2 border border-slate-300 bg-white hover:bg-slate-100 text-slate-600 px-8 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all active:scale-95">
            <X size={18} strokeWidth={2.5} /> Close
          </button>
          <button className="flex items-center gap-2 bg-[#00A3FF] hover:bg-[#008fdf] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 border border-[#008fdf]">
            <Printer size={18} strokeWidth={2.5} /> Print
          </button>
        </div>

      </div>
    </div>
  );
};

export default InjCourseBarcode;