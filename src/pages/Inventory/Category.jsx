import React, { useState } from 'react';
import { 
  List, GitBranch, Tag, Beaker, Database, ClipboardCheck, Map 
} from 'lucide-react';

// Importing components
import TableHeader from '../../components/TableHeader'; 
import StandardTable from '../../components/inventory/StandardTable';
import GroupedTable from '../../components/inventory/GroupedTable';
import IngredientTable from '../../components/inventory/IngredientTable';
import AssessmentTable from '../../components/inventory/AssessmentTable';
import MapAssessmentTable from '../../components/inventory/MapAssessmentTable';

// Import the Add Forms
import AddCategoryForm from '../../components/inventory/AddForms/AddCategoryForm';
import AddSubCategoryForm from '../../components/inventory/AddForms/AddSubCategoryForm';
import TypeForm from '../../components/inventory/AddForms/TypeForm';
import AddIngredientForm from '../../components/inventory/AddForms/AddIngredientForm';
import BaseTypeForm from '../../components/inventory/AddForms/BaseType';
import AddLable from '../../components/inventory/AddForms/AddLable';
import MapAssessment from '../../components/inventory/AddForms/MapAssessment';
import SynonymForm from '../../components/inventory/AddForms/SynonymForm'; // ✅ Added

// Global Components
import SuccessPopup from '../../components/global/SuccessPopup';

const Category = () => {
  const [activeTab, setActiveTab] = useState('Category');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSynonymForm, setShowSynonymForm] = useState(false); // ✅ Added
  const [editingItem, setEditingItem] = useState(null); 
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [allData, setAllData] = useState({
    'Category': [
      { id: 1, name: 'Allergen' }, { id: 3, name: 'Bio Logical' }, 
      { id: 4, name: 'Preservative' }, { id: 5083, name: 'Chemicals' }
    ],
    'Sub Category': [
      { title: "Allergen", items: [{ id: 7, name: "Pollens" }, { id: 8, name: "Indoor Allergens" }] },
      { title: "Bio Logical", items: [{ id: 4040, name: "Genentech / Novartis" }] }
    ],
    'Type': [
      { title: "Pollens", items: [{ id: 36, name: "Grass", label: "G" }, { id: 37, name: "Tree", label: "T" }] }
    ],
    'Ingredients': [
      { title: "Grass", items: [{ id: 160, name: "Cultivated Oat", scientific: "Avena sativa", synonyms: [] }] }
    ],
    'Base Type': [{ id: 1, name: 'Recipe Based' }, { id: 2, name: 'Custom Based' }],
    'Assessment Label': [
      { id: 1, name: 'Coughing', sortOrder: 1, active: true },
      { id: 2, name: 'Wheezing', sortOrder: 2, active: true }
    ],
    'Map Assessment Type': [
      { id: 1, type: 'Pre', name: 'Antihistamir', sortOrder: 10, active: true }
    ],
  });

  const tabs = [
    { name: 'Category', icon: List },
    { name: 'Sub Category', icon: GitBranch },
    { name: 'Type', icon: Tag },
    { name: 'Ingredients', icon: Beaker },
    { name: 'Base Type', icon: Database },
    { name: 'Assessment Label', icon: ClipboardCheck },
    { name: 'Map Assessment Type', icon: Map },
  ];

  // --- PERSISTENCE LOGIC ---
  const handleAddNewData = (newData) => {
    setAllData(prev => {
      let currentTabData = [...prev[activeTab]];
      if (editingItem) {
        if (['Sub Category', 'Type', 'Ingredients'].includes(activeTab)) {
          currentTabData = currentTabData.map(group => ({
            ...group,
            items: group.items.map(item => item.id === editingItem.id ? { ...item, ...newData } : item)
          }));
        } else {
          currentTabData = currentTabData.map(item => item.id === editingItem.id ? { ...item, ...newData } : item);
        }
        setSuccessMsg("Record updated successfully!");
      } else {
        const newId = Date.now();
        if (newData.parentCategory || newData.parentSubCategory) {
          const parentTitle = newData.parentCategory || newData.parentSubCategory;
          const groupIndex = currentTabData.findIndex(g => g.title === parentTitle);
          if (groupIndex > -1) {
            currentTabData[groupIndex].items.push({ id: newId, ...newData });
          } else {
            currentTabData.push({ title: parentTitle, items: [{ id: newId, ...newData }] });
          }
        } else {
          currentTabData.push({
            id: currentTabData.length > 0 ? Math.max(...currentTabData.map(i => i.id || 0)) + 1 : 1,
            ...newData
          });
        }
        setSuccessMsg("Record added successfully!");
      }
      return { ...prev, [activeTab]: currentTabData };
    });
    setShowSuccess(true);
    setShowAddForm(false);
    setEditingItem(null);
  };

  // ✅ SPECIALIZED LOGIC: SAVE SYNONYMS
  const handleSaveSynonyms = (ingredientId, updatedSynonyms) => {
    setAllData(prev => ({
      ...prev,
      'Ingredients': prev['Ingredients'].map(group => ({
        ...group,
        items: group.items.map(item => 
          item.id === ingredientId ? { ...item, synonyms: updatedSynonyms } : item
        )
      }))
    }));
    setSuccessMsg("Synonyms updated successfully!");
    setShowSuccess(true);
    setShowSynonymForm(false);
  };

  const handleDeleteItem = (id) => {
    setAllData(prev => {
      const currentTabData = prev[activeTab];
      let updatedData;
      if (['Sub Category', 'Type', 'Ingredients'].includes(activeTab)) {
        updatedData = currentTabData.map(group => ({
          ...group,
          items: group.items.filter(item => item.id !== id)
        })).filter(group => group.items.length > 0);
      } else {
        updatedData = currentTabData.filter(item => item.id !== id);
      }
      return { ...prev, [activeTab]: updatedData };
    });
    setSuccessMsg("Record deleted successfully.");
    setShowSuccess(true);
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
    setShowSynonymForm(false); // Close synonym form if open
  };

  const handleManageSynonyms = (item) => {
    setEditingItem(item);
    setShowSynonymForm(true);
    setShowAddForm(false); // Close add form if open
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedCategories([]);
    setSearchTerm("");
    setShowAddForm(false);
    setShowSynonymForm(false);
    setEditingItem(null);
  };

  const handleCategoryToggle = (category) => {
    if (category === 'CLEAR_ALL') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
      );
    }
  };

  const renderContent = () => {
    const rawData = allData[activeTab] || [];
    const disableFilterTabs = ['Assessment Label', 'Category', 'Base Type', 'Map Assessment Type'];
    const visibleGroups = (disableFilterTabs.includes(activeTab) || selectedCategories.length === 0)
      ? rawData : rawData.filter(group => selectedCategories.includes(group.title || group.name));

    const searchFilteredGroups = visibleGroups.map(group => {
      if (group.items) {
        return {
          ...group,
          items: group.items.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.scientific && item.scientific.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        };
      }
      return group;
    }).filter(group => group.items ? group.items.length > 0 : group.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const tableProps = { onDelete: handleDeleteItem, onEdit: handleEditClick };

    switch (activeTab) {
      case 'Ingredients':
        return searchFilteredGroups.map((group, index) => (
          <IngredientTable 
            key={index} 
            title={group.title} 
            items={group.items} 
            {...tableProps} 
            onManageSynonyms={handleManageSynonyms} // ✅ Added
          />
        ));
      case 'Sub Category':
      case 'Type':
        return searchFilteredGroups.map((group, index) => <GroupedTable key={index} title={group.title} data={group.items} isTypeView={activeTab === 'Type'} {...tableProps} />);
      case 'Assessment Label':
        return <AssessmentTable data={searchFilteredGroups} {...tableProps} />;
      case 'Map Assessment Type':
        return <MapAssessmentTable data={searchFilteredGroups} {...tableProps} />;
      default:
        return <StandardTable title={activeTab} data={searchFilteredGroups} {...tableProps} />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#f1f5f9] p-2 md:p-3 overflow-hidden">
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-4 shrink-0 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-300 w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabChange(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              activeTab === tab.name 
                ? 'bg-[#00A3FF] text-white shadow-lg scale-105' 
                : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
            }`}
          >
            <tab.icon size={15} strokeWidth={activeTab === tab.name ? 3 : 2} />
            <span className="text-[11px] font-black uppercase tracking-wider">{tab.name}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-slate-300 overflow-hidden">
        <TableHeader 
          title={`${activeTab} List`} 
          icon={tabs.find(t => t.name === activeTab)?.icon}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => {setEditingItem(null); setShowAddForm(true); setShowSynonymForm(false);}} 
          availableCategories={['Assessment Label', 'Category', 'Base Type', 'Map Assessment Type'].includes(activeTab) ? [] : (allData[activeTab]?.map(g => g.title || g.name).filter(Boolean) || [])}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar bg-slate-50/30">
          
          {/* ✅ SYNONYM FORM (MANAGEMENT) */}
          {showSynonymForm && editingItem && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-400 mb-4">
              <SynonymForm 
                initialData={editingItem} 
                onClose={() => {setShowSynonymForm(false); setEditingItem(null);}} 
                onSave={handleSaveSynonyms} 
              />
            </div>
          )}

          {/* ADD / EDIT FORMS */}
          {showAddForm && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-400 mb-4">
              {activeTab === 'Category' && <AddCategoryForm initialData={editingItem} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
              {activeTab === 'Sub Category' && <AddSubCategoryForm initialData={editingItem} categories={allData['Category']} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
              {activeTab === 'Type' && <TypeForm initialData={editingItem} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
              {activeTab === 'Ingredients' && <AddIngredientForm initialData={editingItem} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
              {activeTab === 'Base Type' && <BaseTypeForm initialData={editingItem} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
              {activeTab === 'Assessment Label' && <AddLable initialData={editingItem} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
              {activeTab === 'Map Assessment Type' && <MapAssessment initialData={editingItem} onClose={() => setShowAddForm(false)} onAdd={handleAddNewData} />}
            </div>
          )}
          {renderContent()}
        </div>
      </div>

      <SuccessPopup isOpen={showSuccess} onClose={() => setShowSuccess(false)} message={successMsg} />
    </div>
  );
};

export default Category;