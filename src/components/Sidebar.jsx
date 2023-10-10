import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { cn } from "../utils";

const links = [
  {
    name: "Games",
    href: "/dashboard/games",
    icon: "/icons/game-icon.png",
  },
  {
    name: "Swap",
    href: "/dashboard/swap",
    icon: "/icons/swap-icon.png",
  },
  {
    name: "Lottery",
    href: "/dashboard/lottery",
    icon: "/icons/lottery-icon.png",
  },
  {
    name: "Paco Earn",
    href: "#",
    icon: "/icons/earn-icon.png",
    subItems: [
      {
        name: "$Paco Staking",
        href: "/dashboard/paco-staking",
        icon: "/icons/staking-icon.png",
      },
      {
        name: "About Staking",
        href: "/dashboard/about-staking",
        icon: "/icons/about-icon.png",
      },
    ],
  },
];

function Sidebar() {
  const [isCollapse, setIsCollapse] = useState(false);
  const [currentOpen, setCurrentOpen] = useState(true);
  const [isSubItemOpen, setIsSubItemOpen] = useState(false);

  function handleCurrentOpen(name) {
    setCurrentOpen(name);
    setIsSubItemOpen(!isSubItemOpen);
  }

  return (
    <div
      className={cn(
        "hidden md:flex w-64 bg-[#3f2b62] py-6 rounded-[2rem] h-[80vh] flex-col",
        isCollapse && "w-20"
      )}
    >
      <button className={cn("self-end px-4", isCollapse && "self-center")}>
        <img
          src={isCollapse ? "/icons/expand-icon.svg" : "/icons/shrink-icon.svg"}
          alt=""
          className="h-10 mb-4"
          onClick={() => setIsCollapse(!isCollapse)}
        />
      </button>
      <div className="py-2 px-4 flex flex-col gap-0">
        {links.map((item, i) => (
          <div
            key={i}
            className={`${
              isSubItemOpen &&
              currentOpen === item.name &&
              item.subItems?.length &&
              "bg-[#423566] rounded-2xl py-4"
            } px-2 hover:bg-[#423566] py-2 rounded-2xl`}
          >
            <NavLink
              to={item.href}
              className="flex items-center gap-6 text-white uppercase font-extrabold"
              onClick={() => handleCurrentOpen(item.name)}
            >
              <img src={item.icon} alt="" className="h-9" />
              {!isCollapse && <span className="flex-1">{item.name}</span>}
              {!isCollapse && item.subItems?.length && (
                <div className="flex justify-end pr-1">
                  {isSubItemOpen && currentOpen === item.name ? (
                    <BsChevronUp />
                  ) : (
                    <BsChevronDown />
                  )}
                </div>
              )}
            </NavLink>
            {/* SubLinks */}
            {!isCollapse &&
              isSubItemOpen &&
              currentOpen === item.name &&
              item.subItems?.length && (
                <div className="flex flex-col gap-4 mt-4">
                  {item.subItems?.map((subItem, i) => (
                    <NavLink
                      to={subItem.href}
                      key={i}
                      className="flex items-center gap-6 text-white uppercase font-extrabold"
                    >
                      <img src={subItem.icon} alt="" className="h-9" />
                      <span>{subItem.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
