import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { menuItems } from '../../data/menuConfig';

const Sidebar = ({ activeColor }) => {
  const [openMenuTitle, setOpenMenuTitle] = useState(null); 
  const location = useLocation();

  // Helper function to convert menu titles to URL paths
  const getPath = (title) => {
    if (title === 'Dashboard') return '/dashboard';
    // Matches the route path we set in App.jsx
    return `/${title.toLowerCase().replace(/\s+/g, '-')}`;
  };

  // AUTO-OPEN LOGIC: Opens the dropdown containing the active link 
  useEffect(() => {
    menuItems.forEach(item => {
      if (item.hasDropdown) {
        const isActive = item.subItems.some(sub => getPath(sub) === location.pathname);
        if (isActive) setOpenMenuTitle(item.title);
      }
    });
  }, [location.pathname]);

  const toggleMenu = (title) => {
    setOpenMenuTitle(openMenuTitle === title ? null : title);
  };

  return (
    <aside className="w-64 bg-slate-50 h-screen border-r border-gray-200 flex flex-col overflow-y-auto sticky top-0 shrink-0">
      
      {/* Logo Section */}
      <div className="p-4 flex justify-center border-b bg-white shadow-sm">
        <img 
          src="/download.png" 
          alt="SAASC Logo" 
          className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <nav className="flex-1 mt-4 px-2 space-y-1">
        {menuItems.map((item) => {
          const isOpen = openMenuTitle === item.title;
          const itemPath = getPath(item.title);

          return (
            <div key={item.title}>
              {item.hasDropdown ? (
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group 
                    ${isOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className={isOpen ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} />
                    <span>{item.title}</span>
                  </div>
                  <div className={isOpen ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}>
                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                </button>
              ) : (
                <NavLink
                  to={itemPath}
                  className={({ isActive }) => `
                    w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                    ${isActive 
                      ? `${activeColor} text-white shadow-md` 
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </div>
                </NavLink>
              )}

              {item.hasDropdown && isOpen && (
                <div className="ml-9 mt-1 space-y-1 border-l-2 border-blue-400 animate-in slide-in-from-top-1 duration-200">
                  {item.subItems.map((sub) => {
                    const subPath = getPath(sub);
                    return (
                      <NavLink 
                        key={sub} 
                        to={subPath}
                        className={({ isActive }) => `
                          block w-full text-left px-3 py-2 text-xs font-medium transition-all rounded-r-md
                          ${isActive 
                            ? "text-blue-600 bg-blue-100/50 font-bold border-l-2 border-blue-600 -ml-[2px]" 
                            : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"}
                        `}
                      >
                        {sub}
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;