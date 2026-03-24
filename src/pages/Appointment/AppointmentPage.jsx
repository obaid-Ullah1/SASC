import React from 'react';
import AppointmentTable from '../../components/Appointment/AppointmentTable';

const AppointmentPage = () => {
  return (
    <div className="w-full h-full bg-[#f8fafc] p-2 sm:p-0 overflow-hidden flex flex-col">
      <AppointmentTable />
    </div>
  );
};

export default AppointmentPage;