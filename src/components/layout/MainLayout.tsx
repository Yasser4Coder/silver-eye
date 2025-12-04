import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="h-screen flex flex-col">
      
      {/* Navbar */}
      <div className="flex-none relative z-50">
        <Navbar />
      </div>

      {/* Page Content – scrollable */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
}


