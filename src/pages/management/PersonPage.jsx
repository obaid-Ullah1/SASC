import React, { useState } from "react";
import PersonGrid from "../../components/management/PersonTable";
import AddPersonForm from "../../components/management/AddForms/AddPersonForm";

const PersonPage = ({ activeColor }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingData, setEditingData] = useState(null); // Track which person is being edited

  const [peopleData, setPeopleData] = useState([
    { id: 1, firstName: "Angel", lastName: "Castillo", dob: "1997-09-11", gender: "Male", cnic: "42101-1234567-1", classification: "Staff Member" },
    { id: 2, firstName: "Emily", lastName: "Napoli", dob: "1960-06-09", gender: "Female", cnic: "42101-7654321-2", classification: "External Client" },
    { id: 3, firstName: "Lanaya", lastName: "Pruitt Freeman", dob: "2019-08-20" },
    { id: 4, firstName: "Test", lastName: "Zzzz", dob: "1995-06-12" },
    { id: 5, firstName: "Leope", lastName: "Test", dob: "2001-01-01" },
    { id: 6, firstName: "Rajeev", lastName: "Sharma", dob: "1974-09-05" },
    { id: 7, firstName: "Jenny", lastName: "Toste", dob: "1981-11-22" },
    { id: 8, firstName: "Teresa", lastName: "Torres", dob: "1952-04-06" },
    { id: 9, firstName: "Test", lastName: "Test", dob: "1997-12-15" },
    { id: 10, firstName: "Antonio", lastName: "Edwards", dob: "2008-03-30" },
    { id: 11, firstName: "Angel", lastName: "Castillo", dob: "1997-09-11" },
    { id: 12, firstName: "Emily", lastName: "Napoli", dob: "1960-06-09" },
    { id: 13, firstName: "Lanaya", lastName: "Pruitt Freeman", dob: "2019-08-20" },
    { id: 14, firstName: "Test", lastName: "Zzzz", dob: "1995-06-12" },
    { id: 15, firstName: "Leope", lastName: "Test", dob: "2001-01-01" },
    { id: 16, firstName: "Rajeev", lastName: "Sharma", dob: "1974-09-05" },
    { id: 17, firstName: "Jenny", lastName: "Toste", dob: "1981-11-22" },
    { id: 18, firstName: "Teresa", lastName: "Torres", dob: "1952-04-06" },
    { id: 19, firstName: "Test", lastName: "Test", dob: "1997-12-15" },
    { id: 20, firstName: "Antonio", lastName: "Edwards", dob: "2008-03-30" },
  ]);

  // Handle both New Add and Update
  const handleSavePerson = (formData) => {
    if (editingData) {
      // UPDATE LOGIC: Map through data and replace the edited row
      setPeopleData(prev => prev.map(person => 
        person.id === editingData.id ? { ...formData, id: person.id } : person
      ));
    } else {
      // ADD LOGIC: Create new entry
      const personWithId = { ...formData, id: Date.now() };
      setPeopleData([personWithId, ...peopleData]);
    }
    
    // Cleanup
    setShowAddForm(false);
    setEditingData(null);
  };

  const handleEditClick = (person) => {
    setEditingData(person); // Load the row data into state
    setShowAddForm(true);   // Open the form
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingData(null);
  };

  return (
    /* Changed px-6 pt-4 pb-4 to p-2 md:p-3 for a thinner, cleaner layout */
    <div className={`h-full w-full flex flex-col p-2 md:p-0 gap-3 ${showAddForm ? "overflow-auto" : "overflow-hidden"}`}>
      
      {showAddForm && (
        <div className="w-full shrink-0">
          <AddPersonForm 
            onCancel={handleCancel} 
            onAdd={handleSavePerson}
            initialData={editingData} // Pass the person being edited to the form
          />
        </div>
      )}

      <div className="flex-1 min-h-0 bg-white rounded-2xl shadow-xl border border-slate-300 overflow-hidden">
        <PersonGrid
          data={peopleData}
          onAddClick={() => { setEditingData(null); setShowAddForm(true); }}
          onEditClick={handleEditClick} 
        />
      </div>

    </div>
  );
};

export default PersonPage;