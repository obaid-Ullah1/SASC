import React, { useState, useRef } from "react";
import DataGrid, {
  Column,
  Paging,
  Pager,
  FilterRow,
  HeaderFilter,
  GroupPanel,
  SearchPanel,
  Scrolling,
  StateStoring,
} from "devextreme-react/data-grid";
import { Users, RotateCw, UserPlus, Filter } from "lucide-react";

// Calling the component from components/TableHeader
import TableHeader from "../TableHeader";

const PersonGrid = ({ data, onAddClick, onEditClick }) => {
  const dataGridRef = useRef(null);
  const storageKey = "person-grid-state";

  // --- NEW STATE: For search functionality ---
  const [searchText, setSearchText] = useState("");

  // --- FUNCTIONALITY: Hard reset (Reloads page/Clear LocalStorage) ---
  const handleResetLayout = () => {
    localStorage.removeItem(storageKey);
    window.location.reload();
  };

  // --- FUNCTIONALITY: Soft reset (Clear Search and Grid Filters) ---
  const handleResetFilters = () => {
    setSearchText(""); // Clear search bar
    if (dataGridRef.current) {
      dataGridRef.current.instance.clearFilter(); // Clears all column filters and sorting
    }
  };

  // --- FUNCTIONALITY: Handle search input changes ---
  const handleSearch = (value) => {
    setSearchText(value);
  };

  return (
    <div className="w-full h-full bg-white border border-gray-300 rounded-sm shadow-sm overflow-hidden flex flex-col">
      
      {/* ===== REPLACED HEADER WITH TABLEHEADER COMPONENT ===== */}
      <TableHeader 
        title="Person Records" 
        icon={Users} 
        onAddClick={onAddClick} 
        onResetLayout={handleResetFilters} // Wired to the Reset Filter logic
        searchValue={searchText}          // Passing search state
        onSearchChange={handleSearch}      // Passing search handler
        onHardReset={handleResetLayout}    // Optional: for the Rotate icon
      />

      {/* ===== GRID SECTION ===== */}
      <div className="flex-1 min-h-0 overflow-hidden relative">
        <DataGrid
          ref={dataGridRef} // Attached ref to control the grid
          dataSource={data}
          keyExpr="id"
          showBorders={true}
          showRowLines={true}
          showColumnLines={true}
          rowAlternationEnabled={true}
          
          /* RESPONSIVE LOGIC: */
          columnAutoWidth={true} 
          columnMinWidth={100} 
          height="100%" 
          width="100%"
          
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnResizingMode="widget"
          hoverStateEnabled={true}
          className="person-grid-with-borders"
        >
          <StateStoring enabled={true} type="localStorage" storageKey={storageKey} />
          
          <GroupPanel 
            visible={true} 
            emptyPanelText="Drag a column header here to group" 
          />
          
          <FilterRow visible={true} />
          <HeaderFilter visible={true} />
          
          {/* SEARCH PANEL: Linked to the header state */}
          <SearchPanel 
            visible={true} 
            highlightSearchText={true} 
            text={searchText} // Bound to our custom state
            placeholder="Search..." 
            width="auto" 
          />
          
          <Scrolling mode="standard" useNative={true} showScrollbar="always" />
          
          <Paging defaultPageSize={10} enabled={true} />

          <Pager
            visible={true}
            showPageSizeSelector={true}
            allowedPageSizes={[10, 20, 50, 100]}
            showInfo={true}
            infoText="Page {0} of {1} ({2} items)"
            showNavigationButtons={true}
            displayMode="full"
          />

          <Column dataField="id" caption="ID" width={50} alignment="center" />
          <Column dataField="firstName" caption="First Name" minWidth={120} />
          <Column dataField="lastName" caption="Last Name" minWidth={120} />
          <Column
            caption="Full Name"
            minWidth={150}
            calculateCellValue={(row) => `${row.lastName}, ${row.firstName}`}
          />
          <Column dataField="dob" caption="DOB" dataType="date" alignment="center" width={100} />
          <Column dataField="gender" caption="Gender" alignment="center" width={80} />
          <Column dataField="cnic" caption="CNIC / NIC" alignment="center" minWidth={130} />
          <Column dataField="personType" caption="Type" alignment="center" width={100} />

          <Column
            caption="Actions"
            width={70}
            fixed={window.innerWidth > 768} 
            fixedPosition="right"
            alignment="center"
            cellRender={(cellData) => (
              <div className="flex justify-center">
                <button 
                  onClick={() => onEditClick(cellData.data)} 
                  className="text-blue-500 hover:scale-120 transition-transform"
                >
                  ✏️
                </button>
              </div>
            )}
          />
        </DataGrid>
      </div>

      <style jsx global>{`
        /* Prevent text wrapping in cells so columns expand instead of squishing */
        .person-grid-with-borders .dx-datagrid-table .dx-row > td {
          white-space: nowrap !important;
          padding: 4px 8px !important;
          font-size: 12px !important;
        }

        /* Make the horizontal scrollbar more visible */
        .dx-scrollbar-horizontal {
          height: 10px !important;
        }

        @media (max-width: 640px) {
          .dx-datagrid-search-panel {
            width: 100% !important;
            margin: 5px 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PersonGrid;