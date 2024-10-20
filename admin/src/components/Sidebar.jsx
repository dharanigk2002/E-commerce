import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

function Sidebar() {
  return (
    <aside className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center border border-r-0 gap-3 px-3 rounded-l py-2 border-gray-300"
          to="/add"
        >
          <img
            className="w-5 aspect-square"
            src={assets.add_icon}
            alt="add-icon"
          />
          <p className="hidden md:block">Add items</p>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center border border-r-0 gap-3 px-3 rounded-l py-2 border-gray-300"
          to="/list"
        >
          <img
            className="w-5 aspect-square"
            src={assets.order_icon}
            alt="add-icon"
          />
          <p className="hidden md:block">List items</p>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center border border-r-0 gap-3 px-3 rounded-l py-2 border-gray-300"
          to="/orders"
        >
          <img
            className="w-5 aspect-square"
            src={assets.order_icon}
            alt="add-icon"
          />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
