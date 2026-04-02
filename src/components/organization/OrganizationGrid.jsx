import React, { useState } from 'react';
import { Building2, Hash, Mail, Phone, MapPin, Edit3, CheckCircle2 } from 'lucide-react';
import TableHeader from '../TableHeader';

// ✅ NEW: Added onEditClick to props
const OrganizationGrid = ({ records, onAddClick, onEditClick }) => {
  const [searchText, setSearchText] = useState("");

  const filteredRecords = records.filter(record => 
    record.name.toLowerCase().includes(searchText.toLowerCase()) ||
    record.code.toLowerCase().includes(searchText.toLowerCase()) ||
    record.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (value) => setSearchText(value);
  const handleReset = () => setSearchText("");

  return (
    <div className="bg-white border-2 border-slate-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden rounded-xl">
      <TableHeader 
        title="Organization Records" 
        icon={Building2} 
        searchValue={searchText}          
        onSearchChange={handleSearch}      
        onResetLayout={handleReset} 
        onHardReset={handleReset}
        onAddClick={onAddClick} 
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-[13px]">
          <thead className="bg-slate-50 text-slate-700 border-b-2 border-slate-300 font-bold uppercase tracking-wider text-[11px]">
            {/* ... (Headers remain exactly the same) ... */}
            <tr>
              <th className="py-2.5 px-4 border-r border-slate-300 text-center"># ID</th>
              <th className="py-2.5 px-4 border-r border-slate-300"><div className="flex items-center gap-2"><Building2 size={14} className="text-[#00A3FF]"/> Name</div></th>
              <th className="py-2.5 px-4 border-r border-slate-300"><div className="flex items-center gap-2"><Hash size={14} className="text-[#00A3FF]"/> Code</div></th>
              <th className="py-2.5 px-4 border-r border-slate-300"><div className="flex items-center gap-2"><Mail size={14} className="text-[#00A3FF]"/> Email</div></th>
              <th className="py-2.5 px-4 border-r border-slate-300"><div className="flex items-center gap-2"><Phone size={14} className="text-[#00A3FF]"/> Phone</div></th>
              <th className="py-2.5 px-4 border-r border-slate-300"><div className="flex items-center gap-2"><MapPin size={14} className="text-[#00A3FF]"/> Address</div></th>
              <th className="py-2.5 px-4 border-r border-slate-300"><div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#00A3FF]"/> Accounts</div></th>
              <th className="py-2.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-slate-200 hover:bg-blue-50/50 transition-colors group">
                  <td className="py-1.5 px-4 text-center border-r border-slate-200 font-medium text-slate-500">{record.id}</td>
                  <td className="py-1.5 px-4 border-r border-slate-200 font-bold text-slate-800">{record.name}</td>
                  <td className="py-1.5 px-4 border-r border-slate-200 font-semibold text-slate-600 uppercase tracking-wide">{record.code}</td>
                  <td className="py-1.5 px-4 border-r border-slate-200 text-[#00A3FF] font-medium">{record.email}</td>
                  <td className="py-1.5 px-4 border-r border-slate-200 font-medium text-slate-600">{record.phone}</td>
                  <td className="py-1.5 px-4 border-r border-slate-200 text-slate-600 truncate max-w-[150px]">{record.address}</td>
                  <td className="py-1.5 px-4 border-r border-slate-200">
                     <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-bold text-[11px] uppercase tracking-wider border border-emerald-200">
                       <CheckCircle2 size={12} strokeWidth={3} /> {record.accounts}
                     </span>
                  </td>
                  <td className="py-1.5 px-4 text-center">
                     {/* ✅ NEW: Wired up the onClick event to pass the specific row record back up */}
                     <button 
                       onClick={() => onEditClick(record)}
                       className="p-1 border-2 border-slate-200 text-slate-400 hover:text-[#00A3FF] hover:border-[#00A3FF] hover:bg-blue-50 rounded-md transition-all active:scale-95"
                     >
                       <Edit3 size={14} />
                     </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-6 text-center text-slate-500 font-medium italic">
                  No organizations found matching "{searchText}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationGrid;