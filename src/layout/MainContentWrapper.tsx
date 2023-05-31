import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "./MainContent";

const MainContentWrapper = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(() => true);

  return (
    <div className="container">
      {sidebarIsOpen && <Sidebar onClose={() => setSidebarIsOpen(false)} />}
      <MainContent />
    </div>
  );
};

export default MainContentWrapper;
