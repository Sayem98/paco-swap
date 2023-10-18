import { AiOutlineHome, AiOutlineBell } from "react-icons/ai";
import { TbCategory } from "react-icons/tb";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";

function MobileNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="block md:hidden fixed left-0 bottom-1 w-full z-[9999] ">
      <div className="flex justify-between bg-[#432663] px-6 py-2 m-2 text-white font-bold rounded-3xl shadow-md shadow-[#432663]">
        <NavLink
          to="/dashboard"
          className="hover:bg-[#423566] px-4 py-2 rounded-md"
        >
          <AiOutlineHome size={26} />
        </NavLink>

        <NavLink
          to="/dashboard/games"
          className="hover:bg-[#423566] px-4 py-2 rounded-md"
        >
          <IoGameControllerOutline size={26} />
        </NavLink>

        <NavLink
          to="/dashboard/earn"
          className="hover:bg-[#423566] px-4 py-2 rounded-md"
        >
          <BsCurrencyDollar size={26} />
        </NavLink>

        <NavLink className="hover:bg-[#423566] px-4 py-2 rounded-md">
          <TbCategory
            size={26}
            onClick={() => setShowSidebar((show) => !show)}
          />
        </NavLink>

        <NavLink className="hover:bg-[#423566] px-4 py-2 rounded-md">
          <AiOutlineBell size={26} />
        </NavLink>
      </div>

      <MobileSidebar show={showSidebar} setShow={setShowSidebar} />
    </div>
  );
}

export default MobileNavbar;
