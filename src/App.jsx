import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import 'devextreme/dist/css/dx.light.css';
import Dashboard from './pages/Dashboard';
import PersonPage from './pages/management/PersonPage'; 
import StatusPage from './pages/management/StatusPage';
import OfficePage from './pages/management/OfficePage';
import AppointmentRules from './pages/management/AppointmentRules';  
import MenusPage from './pages/UserManagement/MenusPage';
import RolesPage from './pages/UserManagement/RolesPage';
import Authentication from './pages/UserManagement/Authentication'; 
import OrgRoles from './pages/UserManagement/OrgRoles';
import CreateUser from './pages/UserManagement/CreateUser';
import InventoryPage from './pages/Inventory/InventoryPage';
import Category from './pages/Inventory/Category'; 
import TreatmentPage from './pages/Testing/TreatmentPage';
import PTMapping from './pages/Testing/PTMapping';
import SkinTesting from './pages/InjectionPrep/SkinTesting'; 
import InjPrep from './pages/InjectionPrep/InjPrep'; 
import PositiveAnalysis from './pages/Testing/PositiveAnalysis';
import Diagnosis from './pages/Bio/Diagnosis';
import Treatment from './pages/Bio/Treatment';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import DoseRulesPage from './pages/Settings/DoseRulesPage'; 
import InjComposition from './pages/Settings/InjComposition';

// IMPORT NEW TEST RULES SCREEN
import TestRules from './pages/Settings/TestRules';

// IMPORT BIO MANAGEMENT SCREEN
import BioManagement from './pages/Settings/BioManagement';

// IMPORT LIBRARY SCREEN
import LibraryPage from './pages/Library/LibraryPage';

// ✅ IMPORT NEW TESTING RESULT SCREEN
import TestingResult from './pages/Testing/TestingResult';

/**
 * LayoutWrapper syncs the URL path with the MainLayout's activeTab state.
 */
const LayoutWrapper = ({ children, themeColor, setThemeColor, themeOptions }) => {
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || 'dashboard';

  return (
    <MainLayout
      activeTab={currentPath}
      themeColor={themeColor}
      setThemeColor={setThemeColor}
      themeOptions={themeOptions}
    >
      {children}
    </MainLayout>
  );
};

function App() {
  const [themeColor, setThemeColor] = useState('bg-sky-500');

  const themeOptions = [
    { name: 'Medical Blue', bg: 'bg-sky-500', text: 'text-sky-600', hover: 'hover:bg-sky-50' },
    { name: 'Care Mint', bg: 'bg-emerald-400', text: 'text-emerald-600', hover: 'hover:bg-emerald-50' },
    { name: 'Soft Teal', bg: 'bg-teal-400', text: 'text-teal-600', hover: 'hover:bg-teal-50' },
    { name: 'Calm Cyan', bg: 'bg-cyan-400', text: 'text-cyan-600', hover: 'hover:bg-cyan-50' },
    { name: 'Healing Lavender', bg: 'bg-violet-300', text: 'text-violet-500', hover: 'hover:bg-violet-50' }
  ];

  return (
    <Router>
      <LayoutWrapper 
        themeColor={themeColor} 
        setThemeColor={setThemeColor} 
        themeOptions={themeOptions}
      >
        <Routes>
          {/* Base Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard & Management */}
          <Route path="/dashboard" element={<Dashboard currentColor={themeColor} />} />
          <Route path="/person" element={<PersonPage activeColor={themeColor} />} />
          <Route path="/status" element={<StatusPage activeColor={themeColor} />} />
          <Route path="/office" element={<OfficePage activeColor={themeColor} />} />
          <Route path="/appointment-rules" element={<AppointmentRules activeColor={themeColor} />} />
          <Route path="/positive-analysis" element={<PositiveAnalysis />} />
          
          {/* PATH FOR LIBRARY DOCUMENTS */}
          <Route path="/library" element={<LibraryPage />} />

          {/* Testing Section */}
          <Route path="/treatment" element={<TreatmentPage />} />
          <Route path="/-pt-mapping" element={<PTMapping />} /> 
          <Route path="/testing-result" element={<TestingResult />} /> {/* ✅ NEW ROUTE ADDED HERE */}
          
          {/* Bio Section */}
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/-treatment" element={<Treatment />} />
          
          {/* User Management */}
          <Route path="/menus" element={<MenusPage activeColor={themeColor} />} />
          <Route path="/roles" element={<RolesPage activeColor={themeColor} />} />
          <Route path="/org-roles" element={<OrgRoles activeColor={themeColor} />} />
          <Route path="/create-user" element={<CreateUser activeColor={themeColor} />} />
          <Route path="/authentication" element={<Authentication activeColor={themeColor} />} />
          
          {/* Inventory Section */}
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/category" element={<Category activeColor={themeColor} />} />
          
          {/* Injection Container Section */}
          <Route path="/inj-container" element={<InjPrep activeColor={themeColor} />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          
          {/* Skin Testing Section */}
          <Route path="/skin-testing" element={<SkinTesting />} />
          
          {/* Settings Section */}
          <Route path="/dose-rules" element={<DoseRulesPage />} /> 
          <Route path="/injection-composition" element={<InjComposition />} />
          
          {/* EXACT PATH FOR TEST RULES */}
          <Route path="/-test-rules" element={<TestRules />} />

          {/* PATH FOR BIO MANAGEMENT */}
          <Route path="/bio-management" element={<BioManagement />} />

          {/* 404 / Fallback */}
          <Route path="*" element={
            <div className="m-6 flex items-center justify-center h-64 text-slate-400 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
              <p className="font-bold uppercase tracking-widest text-xs">Screen is Under Construction 804: {window.location.pathname}</p>
            </div>
          } />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;