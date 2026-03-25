import React, { useState, useEffect } from 'react';
import { 
  X, 
  PlusCircle, 
  RefreshCw, 
  LayoutGrid, 
  Link2, 
  Palette, 
  Hash, 
  Image as ImageIcon,
  ToggleRight,
  FolderTree,
  Save,
  Plus
} from 'lucide-react';
import { Switch } from 'devextreme-react';

// ✅ Changed 'onClose' to 'onCancel' to match your MenusPage props
const AddMenuForm = ({ activeTab, onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    parentId: '',
    subMenu: '',
    menuName: '',
    url: '',
    icon: '',
    color: '',
    sort: 16,
    status: true,
  });

  const parentMenus = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Management' },
    { id: 3, name: 'Setting' }
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        parentId: initialData.parentId || '',
        subMenu: initialData.subMenu || '',
        menuName: initialData.menuName || '',
        url: initialData.url || '',
        icon: initialData.icon || '',
        color: initialData.color || '',
        sort: initialData.sort || 16,
        status: initialData.status === 'Active',
      });
    } else {
      setFormData({
        parentId: '',
        subMenu: '',
        menuName: '',
        url: '',
        icon: '',
        color: '',
        sort: 16,
        status: true,
      });
    }
  }, [initialData, activeTab]);

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      url: formData.url,
      icon: formData.icon,
      color: formData.color,
      status: formData.status ? 'Active' : 'Inactive',
    };

    if (activeTab === 'Menu') {
      submitData.menuName = formData.menuName;
      submitData.sort = formData.sort;
    } else {
      submitData.parentId = parseInt(formData.parentId);
      submitData.subMenu = formData.subMenu;
      const parent = parentMenus.find(p => p.id === parseInt(formData.parentId));
      if (parent) submitData.menu = parent.name;
    }

    onSave(submitData);
  };

  const inputClasses = "w-full h-[38px] px-3 bg-white border-2 border-slate-200 rounded-lg text-[13px] text-slate-700 transition-all focus:outline-none focus:border-[#00A3FF] focus:ring-4 focus:ring-[#00A3FF]/10 placeholder:text-slate-400 placeholder:italic font-medium";

  return (
    <div className="w-full bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-[#00A3FF]/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#00A3FF]/10 border-b border-[#00A3FF]/20">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#00A3FF] rounded-md shadow-md shadow-[#00A3FF]/30">
            {initialData ? <RefreshCw size={16} className="text-white" /> : <PlusCircle size={16} className="text-white" />}
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-slate-800 tracking-tight leading-none">
              {initialData ? `Update ${activeTab}` : `Add New ${activeTab}`}
            </h3>
            <p className="text-[10px] text-[#00A3FF] font-bold uppercase tracking-wider mt-0.5">
              {initialData ? 'Modification Module' : 'Entry Module'}
            </p>
          </div>
        </div>
        
        {/* ✅ WIRED UP onCancel HERE */}
        <button 
          type="button"
          onClick={onCancel}
          className="p-1.5 bg-slate-100 text-slate-500 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* FORM BODY */}
      <form onSubmit={handleSubmit} className="flex flex-col bg-gradient-to-b from-white to-slate-50/30">
        
        {/* Fields Container */}
        <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          
          {/* ======================= MENU TAB FIELDS ======================= */}
          {activeTab === 'Menu' && (
            <>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <LayoutGrid size={13} className="text-[#00A3FF]" />
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Menu Name</label>
                </div>
                <input
                  type="text"
                  value={formData.menuName}
                  onChange={(e) => handleFieldChange('menuName', e.target.value)}
                  placeholder="e.g. Dashboard"
                  className={inputClasses}
                  required
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Link2 size={13} className="text-[#00A3FF]" />
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Menu URL</label>
                </div>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => handleFieldChange('url', e.target.value)}
                  placeholder="e.g. /dashboard"
                  className={inputClasses}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Hash size={13} className="text-[#00A3FF]" />
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Sort Order</label>
                </div>
                <input
                  type="number"
                  value={formData.sort}
                  onChange={(e) => handleFieldChange('sort', e.target.value)}
                  placeholder="e.g. 1"
                  className={inputClasses}
                />
              </div>
            </>
          )}

          {/* ======================= SUB-MENU TAB FIELDS ======================= */}
          {activeTab === 'Sub-Menu' && (
            <>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <FolderTree size={13} className="text-[#00A3FF]" />
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Parent Menu</label>
                </div>
                <select
                  value={formData.parentId}
                  onChange={(e) => handleFieldChange('parentId', e.target.value)}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                  required
                  autoFocus
                >
                  <option value="" disabled>Select Parent Menu</option>
                  {parentMenus.map(menu => (
                    <option key={menu.id} value={menu.id}>{menu.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <LayoutGrid size={13} className="text-[#00A3FF]" />
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Sub Menu Name</label>
                </div>
                <input
                  type="text"
                  value={formData.subMenu}
                  onChange={(e) => handleFieldChange('subMenu', e.target.value)}
                  placeholder="e.g. Settings"
                  className={inputClasses}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <Link2 size={13} className="text-[#00A3FF]" />
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">URL</label>
                </div>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => handleFieldChange('url', e.target.value)}
                  placeholder="e.g. /settings"
                  className={inputClasses}
                />
              </div>
            </>
          )}

          {/* ======================= SHARED FIELDS ======================= */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <ImageIcon size={13} className="text-[#00A3FF]" />
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Icon Name</label>
            </div>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => handleFieldChange('icon', e.target.value)}
              placeholder="e.g. user, settings"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <Palette size={13} className="text-[#00A3FF]" />
              <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Icon Color</label>
            </div>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleFieldChange('color', e.target.value)}
              placeholder="e.g. #1D68F1"
              className={inputClasses}
            />
          </div>

          {/* ======================= STATUS & SUBMIT ACTION (Combined) ======================= */}
          <div className="flex items-end gap-5 h-full">
            
            {/* Simple Status Switch */}
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center gap-1.5">
                <ToggleRight size={13} className="text-[#00A3FF]" />
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Status</label>
              </div>
              <div className="h-[38px] flex items-center gap-3">
                <Switch 
                  value={formData.status} 
                  onValueChange={(v) => handleFieldChange('status', v)} 
                />
                <span className={`text-[12px] font-black uppercase tracking-wider ${formData.status ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {formData.status ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="h-[38px] px-6 bg-[#00A3FF] hover:bg-[#008bdb] text-white text-[13px] font-bold rounded-lg transition-all shadow-[0_4px_10px_rgba(0,163,255,0.2)] hover:shadow-[0_6px_15px_rgba(0,163,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center justify-center gap-2"
            >
              {initialData ? <Save size={16} strokeWidth={2.5} /> : <Plus size={16} strokeWidth={3} />}
              {initialData ? 'Update' : 'Add'}
            </button>
          </div>

        </div>
      </form>
      
      <style jsx global>{`
        /* Keep DevExtreme Switch Theme Consistent */
        .dx-switch-on-handle { background-color: #00A3FF !important; }
      `}</style>
    </div>
  );
};

export default AddMenuForm;