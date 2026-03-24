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

const Category = () => {
  const [activeTab, setActiveTab] = useState('Category');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  // State to control form visibility
  const [showAddForm, setShowAddForm] = useState(false);

  const tabs = [
    { name: 'Category', icon: List },
    { name: 'Sub Category', icon: GitBranch },
    { name: 'Type', icon: Tag },
    { name: 'Ingredients', icon: Beaker },
    { name: 'Base Type', icon: Database },
    { name: 'Assessment Label', icon: ClipboardCheck },
    { name: 'Map Assessment Type', icon: Map },
  ];

  const allData = {
    'Category': [
      { id: 1, name: 'Allergen' }, { id: 3, name: 'Bio Logical' }, 
      { id: 4, name: 'Preservative' }, { id: 5083, name: 'Chemicals' }
    ],
    'Sub Category': [
      { title: "Allergen", items: [{ id: 7, name: "Pollens" }, { id: 8, name: "Indoor Allergens" }, { id: 9, name: "Insect Venoms" }, { id: 10, name: "Food Allergens" }, { id: 11, name: "Regional / Environmental Allergens" }, { id: 4056, name: "Animal" }] },
      { title: "Bio Logical", items: [{ id: 4040, name: "Genentech / Novartis" }, { id: 4041, name: "Sanofi / Regeneron" }, { id: 4042, name: "GlaxoSmithKline (GSK)" }, { id: 4043, name: "AstraZeneca" }, { id: 4044, name: "Teva Pharmaceuticals" }, { id: 4045, name: "Amgen / AstraZeneca" }] },
      { title: "Preservative", items: [{ id: 4052, name: "test" }] },
      { title: "Chemicals", items: [{ id: 5084, name: "Personal Care Chemicals" }, { id: 5085, name: "Fragrance Chemicals" }] }
    ],
    'Type': [
      { title: "Pollens", items: [{ id: 36, name: "Grass", label: "G" }, { id: 37, name: "Tree", label: "T" }, { id: 38, name: "Weed", label: "W" }] },
      { title: "Indoor Allergens", items: [{ id: 39, name: "Mite", label: "D" }, { id: 40, name: "Fungus/Mold", label: "M" }] },
      { title: "Animal", items: [{ id: 41, name: "Animal dander", label: "A" }, { id: 4057, name: "Epithelia", label: "E" }] },
      { title: "Insect Venoms", items: [{ id: 42, name: "Bee", label: "" }, { id: 43, name: "Wasp", label: "" }, { id: 44, name: "Hornet", label: "" }, { id: 45, name: "Yellow jacket", label: "" }, { id: 46, name: "Fire ant", label: "" }] },
      { title: "Regional / Environmental Allergens", items: [{ id: 54, name: "Cockroach", label: "" }, { id: 55, name: "Fungal spores", label: "" }, { id: 56, name: "Local pollens (varies by country)", label: "" }] },
      { title: "Food Allergens", items: [{ id: 3034, name: "Animal Proteins", label: "" }, { id: 3035, name: "Eggs", label: "" }, { id: 3037, name: "Tree Nuts", label: "" }, { id: 3038, name: "Legumes & Nuts", label: "" }, { id: 3039, name: "Fish", label: "" }, { id: 3043, name: "Seed", label: "" }, { id: 3044, name: "Fruit", label: "" }, { id: 3045, name: "Vegetables", label: "" }, { id: 3046, name: "Spice", label: "" }, { id: 4058, name: "Drink/Flavor", label: "" }, { id: 4059, name: "Seafood", label: "" }, { id: 4073, name: "Chocolate", label: "" }, { id: 4077, name: "Meat", label: "" }, { id: 4079, name: "Cereals / Grains", label: "" }] },
      { title: "Genentech / Novartis", items: [{ id: 4046, name: "Xolair® (Omalizumab)", label: "Allergic asthma, chronic urticaria, nasal polyps" }] },
      { title: "Sanofi / Regeneron", items: [{ id: 4047, name: "Dupixent® (Dupilumab)", label: "Atopic dermatitis, asthma, nasal polyps" }] },
      { title: "GlaxoSmithKline (GSK)", items: [{ id: 4048, name: "Nucala® (Mepolizumab)", label: "Severe eosinophilic asthma" }] },
      { title: "AstraZeneca", items: [{ id: 4049, name: "Fasenra® (Benralizumab)", label: "Severe eosinophilic asthma" }] },
      { title: "Teva Pharmaceuticals", items: [{ id: 4050, name: "Cinqair® (U.S.) / Cinqaero® (EU) (Reslizumab)", label: "Severe eosinophilic asthma" }] },
      { title: "Amgen / AstraZeneca", items: [{ id: 4051, name: "Tezspire® (Tezepelumab)", label: "Severe asthma (broad, TSLP inhibitor)" }] },
      { title: "Personal Care Chemicals", items: [{ id: 5089, name: "Cosmetic/Hygiene/Skin Care", label: "" }] },
      { title: "Fragrance Chemicals", items: [{ id: 5090, name: "Fragrance", label: "" }] },
      { title: "Industrial Chemicals", items: [{ id: 5091, name: "Industrial/Miscellaneous", label: "" }] },
      { title: "Pharmaceutical Chemicals", items: [{ id: 5092, name: "Medicinal", label: "" }] },
      { title: "Metal Compounds", items: [{ id: 5093, name: "Metal", label: "" }] }
    ],
    'Ingredients': [
      {
        title: "Grass",
        items: [
          { id: 160, name: "Cultivated Oat", scientific: "" }, { id: 158, name: "Cultivated Corn", scientific: "" },
          { id: 28, name: "Allermed Bermuda", scientific: "" }, { id: 29, name: "Johnson Grass", scientific: "" },
          { id: 30, name: "Orchard", scientific: "" }, { id: 31, name: "Rye, Cultivated", scientific: "" },
          { id: 149, name: "Meadow Fescue", scientific: "" }, { id: 150, name: "Timothy", scientific: "" },
          { id: 151, name: "Perennial Rye", scientific: "" }, { id: 152, name: "Kentucky Blue", scientific: "" }
        ]
      },
      {
        title: "Tree",
        items: [
          { id: 153, name: "Alder, Red", scientific: "Alder Rubra" }, { id: 154, name: "Elm, American", scientific: "Ulmus Americana" }, { id: 155, name: "Control", scientific: "" }, { id: 156, name: "Histamine", scientific: "" }, { id: 157, name: "Poplar", scientific: "" }, { id: 134, name: "Pepper, Black", scientific: "" }, { id: 85, name: "Walnut, English", scientific: "" }, { id: 1, name: "HISTATROL POS ID 0.1MG/ML", scientific: "" }, { id: 2, name: "Acacia", scientific: "Acacia Dealbata" }, { id: 3, name: "Maple, Red", scientific: "" }, { id: 4, name: "Ash, White", scientific: "Fraxinus Americana" }, { id: 5, name: "Beech, American", scientific: "Fagus Grandifolia" }, { id: 6, name: "Gs Birch Mix", scientific: "Betula Lenta, Populifolia, Nigra" }, { id: 7, name: "Box Elder", scientific: "Acer Negunda" }, { id: 8, name: "Cedar, Mountain", scientific: "Juniperus Ashei" }, { id: 9, name: "Cottonwood", scientific: "Populus Deltoides" }, { id: 10, name: "Cypress Arizona", scientific: "Callitropsis Arizonica" }, { id: 11, name: "Mesquite", scientific: "" }, { id: 12, name: "Mulberry, Red", scientific: "" }, { id: 13, name: "Gs Eastern Oak Mix", scientific: "" }, { id: 14, name: "Olive", scientific: "" }, { id: 15, name: "Pine, Ponderosa", scientific: "" }, { id: 16, name: "Privet, Common", scientific: "" }, { id: 17, name: "Sycamore, Eastern", scientific: "" }, { id: 18, name: "Walnut, Black", scientific: "" }, { id: 19, name: "Willow, Black", scientific: "" }, { id: 20, name: "Aspen", scientific: "" }, { id: 21, name: "Eucalyptus", scientific: "" }, { id: 22, name: "Juniper, western", scientific: "" }, { id: 23, name: "Palm, Queen", scientific: "" }, { id: 24, name: "Pecan", scientific: "" }, { id: 25, name: "Pepper, Green", scientific: "" }, { id: 27, name: "Sweet Gum", scientific: "" }
        ]
      },
      {
        title: "Weed",
        items: [
          { id: 32, name: "Cocklebur", scientific: "" }, { id: 33, name: "Firebush/Kochia", scientific: "" }, { id: 34, name: "Lamb's Quarter", scientific: "" }, { id: 35, name: "Nettle", scientific: "" }, { id: 36, name: "Pigweed, Rough", scientific: "" }, { id: 37, name: "Plantain, English", scientific: "" }, { id: 38, name: "Russian Thistle", scientific: "" }, { id: 39, name: "Sagebrush, Common", scientific: "" }, { id: 40, name: "Sheep Sorrel", scientific: "" }, { id: 41, name: "Ragweed, Western", scientific: "" }, { id: 42, name: "Alfafla", scientific: "" }, { id: 43, name: "Dog Fennel", scientific: "" }, { id: 44, name: "Ragweed, false", scientific: "" }, { id: 45, name: "Goldenrod", scientific: "" }, { id: 46, name: "Marsh Elder, Burweed", scientific: "" }, { id: 47, name: "Mugwort, Common", scientific: "" }, { id: 48, name: "Palmer's Amaranth", scientific: "" }, { id: 49, name: "Saltbush, Annual", scientific: "" }, { id: 50, name: "Gs Scale/Atriplex", scientific: "" }, { id: 51, name: "Dock, Yellow", scientific: "" }
        ]
      },
      { title: "Mite", items: [{ id: 62, name: "D. Farinae", scientific: "" }, { id: 63, name: "D. Pteronyssinus", scientific: "" }] },
      { title: "Fungus/Mold", items: [{ id: 52, name: "Alternaria Alternata", scientific: "" }, { id: 53, name: "Aspergillus Fumigatus", scientific: "" }, { id: 54, name: "CLADOSPORIUM SPHAERO.", scientific: "" }, { id: 55, name: "Gs Penicillium Mix", scientific: "" }, { id: 56, name: "Candida Albicans", scientific: "" }, { id: 57, name: "Fusarium", scientific: "" }, { id: 58, name: "Neurospora", scientific: "" }, { id: 59, name: "Phoma Betae", scientific: "" }, { id: 60, name: "Saccharomyc", scientific: "" }, { id: 61, name: "T. MENTAGROPHYTES", scientific: "" }, { id: 161, name: "Hormodendrum", scientific: "" }, { id: 162, name: "Trichophyton", scientific: "" }, { id: 167, name: "Yeast", scientific: "" }] },
      { title: "Animal dander", items: [{ id: 164, name: "Cattle", scientific: "" }, { id: 165, name: "Hamster", scientific: "" }, { id: 64, name: "STANDARDIZED CAT HAIR", scientific: "" }, { id: 67, name: "Gs Mixed Feather", scientific: "" }] },
      { title: "Cockroach", items: [{ id: 66, name: "Cockroach Mix", scientific: "" }] },
      { title: "Food Allergens", items: [{ id: 70, name: "Cow’s Milk", scientific: "" }, { id: 71, name: "Egg White", scientific: "" }, { id: 147, name: "Tuna", scientific: "" }, { id: 139, name: "Shrimp", scientific: "" }] },
      { title: "Metal", items: [{ id: 242, name: "Aluminum hydroxide", scientific: "" }, { id: 243, name: "Cobalt (II) chloride hexahydrate", scientific: "" }, { id: 244, name: "Copper sulfate pentahydrate", scientific: "" }, { id: 245, name: "Gold sodium thiosulfate", scientific: "" }, { id: 246, name: "Iridium (III) chloride", scientific: "" }, { id: 247, name: "Nickel sulfate hexahydrate", scientific: "" }, { id: 248, name: "Palladium chloride", scientific: "" }, { id: 249, name: "Silver nitrate", scientific: "" }, { id: 250, name: "Titanium", scientific: "" }, { id: 251, name: "Zirconium", scientific: "" }] }
    ],
    'Base Type': [
      { id: 1, name: 'Recipe Based' },
      { id: 2, name: 'Custom Based' }
    ],
    'Assessment Label': [
      { id: 1, name: 'Coughing', sortOrder: 1, active: true },
      { id: 2, name: 'Wheezing', sortOrder: 2, active: true },
      { id: 3, name: 'Tightness in chest', sortOrder: 3, active: true },
      { id: 4, name: 'Sneezing', sortOrder: 4, active: true },
      { id: 5, name: 'Itching', sortOrder: 5, active: true },
      { id: 6, name: 'Runny Nose', sortOrder: 6, active: true },
      { id: 7, name: 'Watery Eyes', sortOrder: 7, active: true },
      { id: 8, name: 'Ithchi Eyes', sortOrder: 8, active: true },
      { id: 9, name: 'Hives', sortOrder: 9, active: true },
      { id: 10, name: 'Antihistamir', sortOrder: 10, active: true },
      { id: 11, name: 'New Medication', sortOrder: 11, active: true },
      { id: 1006, name: 'None', sortOrder: 14, active: true },
      { id: 2002, name: 'Left Before Time', sortOrder: 13, active: true }
    ],
    'Map Assessment Type': [
      { id: 1, type: 'Pre', name: 'Antihistamir', sortOrder: 10, active: true },
      { id: 2, type: 'Pre', name: 'Coughing', sortOrder: 1, active: true },
      { id: 3, type: 'Pre', name: 'Hives', sortOrder: 9, active: true },
      { id: 4, type: 'Pre', name: 'Itching', sortOrder: 5, active: true },
      { id: 13, type: 'Post', name: 'Antihistamir', sortOrder: 10, active: true },
      { id: 14, type: 'Post', name: 'Coughing', sortOrder: 1, active: true }
    ],
  };

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedCategories([]);
    setSearchTerm("");
    setShowAddForm(false); // Reset form when tab changes
  };

  const handleCategoryToggle = (category) => {
    if (category === 'CLEAR_ALL') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category) 
          : [...prev, category]
      );
    }
  };

  const renderContent = () => {
    const rawData = allData[activeTab] || [];
    
    const disableFilterTabs = ['Assessment Label', 'Category', 'Base Type', 'Map Assessment Type'];
    const visibleGroups = (disableFilterTabs.includes(activeTab) || selectedCategories.length === 0)
      ? rawData 
      : rawData.filter(group => selectedCategories.includes(group.title || group.name));

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
    }).filter(group => {
      if (group.items) return group.items.length > 0;
      return group.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    if (activeTab === 'Ingredients') {
      return searchFilteredGroups.map((group, index) => (
        <IngredientTable key={`${group.title}-${index}`} title={group.title} items={group.items} />
      ));
    }

    if (activeTab === 'Sub Category' || activeTab === 'Type') {
      return searchFilteredGroups.map((group, index) => (
        <GroupedTable 
          key={`${group.title}-${index}`} 
          title={group.title} 
          data={group.items} 
          isTypeView={activeTab === 'Type'} 
        />
      ));
    }

    if (activeTab === 'Assessment Label') {
      return <AssessmentTable data={searchFilteredGroups} />;
    }

    if (activeTab === 'Map Assessment Type') {
      return <MapAssessmentTable data={searchFilteredGroups} />;
    }

    return <StandardTable title={activeTab} data={searchFilteredGroups} />;
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#f8fafc] p-6 overflow-hidden">
      
      {/* Navigation Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 shrink-0 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 w-fit mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabChange(tab.name)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 ${
              activeTab === tab.name 
                ? 'bg-[#00A3FF] text-white shadow-lg shadow-blue-100 scale-105' 
                : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#00A3FF]'
            }`}
          >
            <tab.icon size={16} strokeWidth={activeTab === tab.name ? 3 : 2} />
            <span className={`text-[12px] font-black uppercase tracking-wider ${activeTab === tab.name ? 'opacity-100' : 'opacity-70'}`}>
              {tab.name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <TableHeader 
          title={
            activeTab === 'Ingredients' ? "Ingredients List" : 
            activeTab === 'Type' ? "Sub Category Types" : 
            activeTab === 'Assessment Label' ? "Assessment Labels" :
            activeTab === 'Base Type' ? "Base Types" :
            activeTab === 'Map Assessment Type' ? "Assessment Label Types" :
            `${activeTab} List`
          } 
          icon={tabs.find(t => t.name === activeTab)?.icon}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={() => setShowAddForm(true)} 
          availableCategories={['Assessment Label', 'Category', 'Base Type', 'Map Assessment Type'].includes(activeTab) ? [] : (allData[activeTab]?.map(g => g.title || g.name).filter(Boolean) || [])}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/30">
          
          {/* Conditional rendering of Add Forms */}
          {showAddForm && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-400 mb-8">
              {activeTab === 'Category' && (
                <AddCategoryForm 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}
              
              {activeTab === 'Sub Category' && (
                <AddSubCategoryForm 
                  categories={allData['Category']} 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}

              {activeTab === 'Type' && (
                <TypeForm 
                  subCategories={allData['Sub Category']} 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}

              {activeTab === 'Ingredients' && (
                <AddIngredientForm 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}

              {activeTab === 'Base Type' && (
                <BaseTypeForm 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}

              {/* Assessment Label Form Navigation */}
              {activeTab === 'Assessment Label' && (
                <AddLable 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}

              {/* Map Assessment Type Form Navigation */}
              {activeTab === 'Map Assessment Type' && (
                <MapAssessment 
                  onClose={() => setShowAddForm(false)} 
                  onAdd={(data) => { console.log(data); setShowAddForm(false); }}
                />
              )}
            </div>
          )}
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Category;