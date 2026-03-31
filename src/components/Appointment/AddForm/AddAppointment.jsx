import React, { useState, useEffect } from 'react';
import { 
  X, CalendarCheck, CheckSquare, Contact, FilePlus, 
  Flag, Building2, Save 
} from 'lucide-react';

// Exact path mapped to components/global/SuccessPopup.jsx
import SuccessPopup from '../../global/SuccessPopup';

const AddAppointment = ({ isOpen, onClose, editData }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  // State to hold the form data
  const [formData, setFormData] = useState({
    patient: '',
    patientType: '',
    apptType: '',
    dos: '',
    status: '',
    office: '',
    apptTime: '',
    inActive: false
  });

  // Watch for editData to populate the form, or clear it if it's a new entry
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setFormData({
          patient: editData.fullName || '',
          patientType: editData.patientType || '',
          apptType: editData.apptType || '',
          dos: editData.dos || '',
          status: editData.status || '',
          office: editData.office || '',
          apptTime: editData.time || '',
          inActive: editData.status === 'Inactive' || editData.inActive === 'Inactive'
        });
      } else {
        setFormData({
          patient: '', patientType: '', apptType: '', dos: '', status: '', office: '', apptTime: '', inActive: false
        });
      }
    }
  }, [isOpen, editData]);

  if (!isOpen) return null;

  const handleSave = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose(); 
    }, 1500);
  };

  return (
    <div className="w-full shrink-0 animate-in fade-in slide-in-from-top-4 duration-300 z-10">
      
      <div className="bg-white w-full rounded-xl shadow-md border border-slate-200 overflow-hidden relative flex flex-col">
        
        {/* --- HEADER --- */}
        {/* Adjusted padding for mobile (px-4 sm:px-5) */}
        <div className="bg-[#00A3FF] px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 text-white">
            <CalendarCheck size={20} strokeWidth={2.5} />
            <h2 className="text-base sm:text-lg font-bold tracking-wide">
              {editData ? 'Edit Appointment' : 'Appointment Registration'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-white hover:bg-white/20 p-1.5 rounded-full transition-colors border border-transparent hover:border-white/30"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* --- FORM BODY --- */}
        {/* Adjusted padding and gap for mobile */}
        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2 text-slate-800">
              <CheckSquare size={16} className="text-[#00A3FF] fill-[#00A3FF]/10" strokeWidth={2.5} />
              <h3 className="font-bold text-sm">Appt Info</h3>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium">All fields are required unless noted</span>
          </div>

          {/* Form Grid: 1 col on mobile, 2 on tablet, 12 on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-5 gap-y-4 sm:gap-y-6">
            
            {/* ROW 1 */}
            <div className="sm:col-span-2 lg:col-span-3 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">Patient</label>
              <select 
                value={formData.patient}
                onChange={(e) => setFormData({...formData, patient: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:14px_14px] bg-[position:right_12px_center] bg-no-repeat pr-8"
              >
                <option value="">Select patient</option>
                <option value="Casillas, Norma">Casillas, Norma</option>
                <option value="Martinez, Sylvia">Martinez, Sylvia</option>
                <option value="Ramos Ramirez, Gizel">Ramos Ramirez, Gizel</option>
                <option value="Mellenberger, Heather">Mellenberger, Heather</option>
                <option value="Caldera, Giovani">Caldera, Giovani</option>
              </select>
            </div>

            <div className="sm:col-span-1 lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">Patient Type</label>
              <div className="relative flex items-center">
                <Contact size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                <select 
                  value={formData.patientType}
                  onChange={(e) => setFormData({...formData, patientType: e.target.value})}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all cursor-pointer appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Allergy">Allergy</option>
                  <option value="Asthma">Asthma</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-1 lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">Appt Type</label>
              <div className="relative flex items-center">
                <FilePlus size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                <select 
                  value={formData.apptType}
                  onChange={(e) => setFormData({...formData, apptType: e.target.value})}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all cursor-pointer appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Follow up">Follow up</option>
                  <option value="PROCEDURE ONLY">PROCEDURE ONLY</option>
                  <option value="Special Testing">Special Testing</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-1 lg:col-span-3 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">DOS</label>
              <input 
                type="date" 
                value={formData.dos}
                onChange={(e) => setFormData({...formData, dos: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all"
              />
            </div>

            <div className="sm:col-span-1 lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">Status</label>
              <div className="relative flex items-center">
                <Flag size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all cursor-pointer appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* ROW 2 */}
            <div className="sm:col-span-1 lg:col-span-3 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">Office</label>
              <div className="relative flex items-center">
                <Building2 size={15} className="absolute left-3 text-slate-400 pointer-events-none" />
                <select 
                  value={formData.office}
                  onChange={(e) => setFormData({...formData, office: e.target.value})}
                  className="w-full bg-white border border-slate-300 rounded-lg py-2.5 pl-9 pr-3 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all cursor-pointer appearance-none"
                >
                  <option value="">Select</option>
                  <option value="Fresno North">Fresno North</option>
                  <option value="Fresno South">Fresno South</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-1 lg:col-span-3 flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500">Appt Time</label>
              <input 
                type="time" 
                value={formData.apptTime}
                onChange={(e) => setFormData({...formData, apptTime: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-600 outline-none focus:border-[#00A3FF] focus:ring-1 focus:ring-[#00A3FF] transition-all"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-500">Patient Status</label>
              <label className="relative inline-flex items-center cursor-pointer group w-max mt-0.5">
                <input 
                  type="checkbox" 
                  checked={formData.inActive}
                  onChange={(e) => setFormData({...formData, inActive: e.target.checked})}
                  className="sr-only peer" 
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00A3FF]"></div>
                <span className="ml-2.5 text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">InActive</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-100">
            <button 
              onClick={handleSave}
              className="w-full sm:w-auto bg-[#00A3FF] hover:opacity-90 text-white font-bold text-sm px-10 py-2.5 rounded-full shadow-md shadow-[#00A3FF]/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Save size={16} strokeWidth={2.5} />
              Save
            </button>
          </div>

        </div>
      </div>

      <SuccessPopup 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        type={editData ? "Updated" : "Added"} 
      />

    </div>
  );
};

export default AddAppointment;