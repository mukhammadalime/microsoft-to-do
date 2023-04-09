import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const MainContent = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(() => true);

  return (
    <div className="app">
      {sidebarIsOpen && <Sidebar onClose={() => setSidebarIsOpen(false)} />}
    </div>
  );
};

export default MainContent;
