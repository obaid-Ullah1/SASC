import { 
  LayoutDashboard, Users, UserCog, Database, Box, 
  Library, Info, Syringe, Settings, TestTube, Fingerprint, Calendar 
} from 'lucide-react';

export const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { 
    title: "Management", 
    icon: Users, 
    hasDropdown: true,
    subItems: ["Person", "Status","Office", "Appointment Rules" ] 
  },
  { 
    title: "User Management", 
    icon: UserCog, 
    hasDropdown: true,
    subItems: ["Menus", "Roles", "Authentication", "Org Roles", "Create User"] 
  },
  { 
    title: "Inventory", 
    icon: Box, 
    hasDropdown: true, 
    isOpen: true, // Default open for example
    subItems: ["Category", "Inventory"] 
  },
  
  { title: "Injection Preparation", 
    icon: Syringe,
     hasDropdown: true,
    isOpen: true,
    subItems: ["INJ Container", "Skin Testing"," OCR"]

 },

  { title: "Setting", 
    icon: Settings,
    hasDropdown: true,
    isOpen: true,
    subItems: ["Dose Rules", "Injection Composition"," Test Rules", "Bio Management"]
 },

  { title: "Testing", icon: TestTube,
     hasDropdown: true,
    isOpen: true,
    subItems: ["Treatment", "Testing Result"," PT Mapping", "Positive Analysis"]
   },


  { title: "Bio", icon: Fingerprint,
     hasDropdown: true,
    isOpen: true,
    subItems: ["Diagnosis", "DX Summary"," Treatment"]
   },
  { title: "Appointment", icon: Calendar },
  { title: "Library", icon: Library },
  { title: "About", icon: Info },
];