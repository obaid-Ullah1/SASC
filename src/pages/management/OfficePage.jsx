import React, { useState, useMemo } from 'react';
import { Building2, CalendarDays, Briefcase, Pencil, Trash2 } from 'lucide-react';
import ManagementGrid from '../../components/management/ManagementGrid';

const OfficePage = () => {
  const [activeTab, setActiveTab] = useState('offices');

  const officeData = useMemo(() =>
    Array.from({ length: 3280 }, (_, i) => ({
      id: i + 1,
      officeName: `Branch ${i + 1}`,
      status: i % 3 === 0 ? 'Inactive' : 'Active'
    }))
  , []);

  const daysData = useMemo(() =>
    Array.from({ length: 3280 }, (_, i) => ({
      id: i + 1,
      officeName: `Clinic ${(i % 10) + 1}`,
      day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][i % 5]
    }))
  , []);

  const activeData = activeTab === 'offices' ? officeData : daysData;

  const actionColumn = {
    caption: 'Actions',
    width: 110,
    fixed: true,
    fixedPosition: 'right',
    alignment: 'center',
    allowFiltering: false,
    cellRender: () => (
      <div className="flex justify-center items-center gap-2">
        <button
          className="p-1.5 rounded-md text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm border border-blue-100"
          title="Edit Record"
        >
          <Pencil size={14} strokeWidth={2.5} />
        </button>
        <button
          className="p-1.5 rounded-md text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm border border-red-100"
          title="Delete Record"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      </div>
    )
  };

  const statusRender = (data) => (
    <div className="flex justify-center">
      <span className={`px-4 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm ${
        data.value === 'Active' ? 'bg-[#2B9E64]' : 'bg-[#EF233C]'
      }`}>
        {data.value}
      </span>
    </div>
  );

  const commonColumns = [
    { field: 'id', caption: '# ID', width: 80, alignment: 'center' },
    { field: 'officeName', caption: 'Office Name', alignment: 'center' },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-[#f0f4f7] overflow-hidden font-sans">

      {/* ===== FIXED HEADER ===== */}
      <div className="flex flex-col items-center py-6 shrink-0">
        <div className="flex items-center gap-3 text-[#1D68F1]">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Building2 size={28} strokeWidth={3} />
          </div>
          <h1 className="text-[28px] font-black tracking-tight uppercase text-slate-800">
            Office Management
          </h1>
        </div>
      </div>

      {/* ===== FIXED TABS ===== */}
      <div className="w-full px-6 shrink-0">
        <div className="w-full bg-white p-1 rounded-xl flex shadow-md border border-gray-100 mb-4">
          <button
            onClick={() => setActiveTab('offices')}
            className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'offices'
                ? 'bg-[#1D68F1] text-white shadow-lg scale-[1.02]'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Briefcase size={18} strokeWidth={activeTab === 'offices' ? 3 : 2} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Office</span>
          </button>

          <button
            onClick={() => setActiveTab('days')}
            className={`flex-1 flex items-center justify-center gap-3 py-3 rounded-lg transition-all duration-300 ${
              activeTab === 'days'
                ? 'bg-[#1D68F1] text-white shadow-lg scale-[1.02]'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <CalendarDays size={18} strokeWidth={activeTab === 'days' ? 3 : 2} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Office Days</span>
          </button>
        </div>
      </div>

      {/* ===== GRID AREA ===== */}
      <div className="flex-1 min-h-0 w-full px-6 overflow-hidden">
        {activeTab === 'offices' ? (
          <ManagementGrid
            title="Offices"
            data={activeData}   // ✅ FULL DATA (DevExtreme handles paging)
            columns={[
              ...commonColumns,
              { field: 'status', caption: 'Status', alignment: 'center', cellRender: statusRender },
              actionColumn
            ]}
            icon={Briefcase}
          />
        ) : (
          <ManagementGrid
            title="Office Days"
            data={activeData}   // ✅ FULL DATA
            columns={[
              ...commonColumns,
              { field: 'day', caption: 'Office Day', alignment: 'center' },
              actionColumn
            ]}
            icon={CalendarDays}
          />
        )}
      </div>

    </div>
  );
};

export default OfficePage;
