import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";

function AppLayout() {
  return (
    <div className="flex flex-col bg-[url('/main-bg.svg')] w-screen min-h-screen relative">
      <Header />

      <div className="flex gap-10 lg:px-8 py-2">
        <Sidebar />
        <MobileNavbar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
