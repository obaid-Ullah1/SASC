import React from 'react';
import { ClipboardList, Users, ListTodo, Syringe, Calendar, Search } from 'lucide-react';
import StatCard from '../components/ui/StatCard';

const Dashboard = () => {
  return (
    <div className="p-10 bg-[#F8FAFC] min-h-screen">
      {/* Top Header Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Syringe className="text-blue-600 w-8 h-8" /> Injection Module
          </h1>
          <p className="text-slate-500 mt-1 font-medium">     Welcome back, Admin. Here is your overview.</p>
        </div>
        <div className="relative group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
           <input type="text" placeholder="Search data..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-64 shadow-sm" />
        </div>
      </div>

      {/* Modern Gradient Banner */}
      <div className="relative w-full bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-500 p-10 rounded-[2rem] flex items-center gap-8 mb-12 shadow-2xl shadow-blue-500/20 overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="z-10 bg-white/20 backdrop-blur-md p-5 rounded-3xl border border-white/30">
           <span className="text-4xl">🚀</span>
        </div>
        <div className="z-10">
          <h2 className="text-white text-3xl font-bold">Allergy & Immunotherapy Dashboard</h2>
          <p className="text-blue-100 mt-2 text-lg">Real-time patient tracking and stock management system.</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <StatCard icon={ClipboardList} title="Active Treatment" value="3,239" gradient="bg-gradient-to-br from-blue-500 to-cyan-500" />
        <StatCard icon={Users} title="Total Patient" value="9,396" gradient="bg-gradient-to-br from-indigo-500 to-purple-500" />
        <StatCard icon={ListTodo} title="Pending Injection" value="1,240" gradient="bg-gradient-to-br from-pink-500 to-rose-500" />
        <StatCard icon={ClipboardList} title="Completed Skin Test" value="2,150" gradient="bg-gradient-to-br from-amber-500 to-orange-500" />
        <StatCard icon={ClipboardList} title="Biologicals in Stock" value="854" gradient="bg-gradient-to-br from-emerald-500 to-teal-500" />
        <StatCard icon={Calendar} title="Appointments" value="128" gradient="bg-gradient-to-br from-violet-600 to-purple-600" />
      </div>
    </div>
  );
};

export default Dashboard;