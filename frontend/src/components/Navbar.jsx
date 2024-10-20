import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { toast } from "react-toastify";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { dispatch, getCartCount, token, setToken } = useShop();
  const location = useLocation();
  const navigate = useNavigate();

  function logout() {
    if (token) {
      setToken("");
      localStorage.removeItem("token");
      navigate("/login", { replace: false });
      dispatch({ type: "reset" });
    } else toast.error("You ar'nt logged in");
  }

  function onClose() {
    setVisible((vis) => !vis);
  }

  return (
    <nav className="flex justify-between items-center py-5 font-medium">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="w-36 cursor-pointer" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex uppercase flex-col items-center">
          <p>Home</p>
          <hr className="hidden w-1/2 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex uppercase flex-col items-center"
        >
          <p>Collection</p>
          <hr className="hidden w-1/2 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/about" className="flex uppercase flex-col items-center">
          <p>About</p>
          <hr className="hidden w-1/2 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
        <NavLink to="/contact" className="flex uppercase flex-col items-center">
          <p>Contact</p>
          <hr className="hidden w-1/2 border-none h-[1.5px] bg-gray-700" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        {location.pathname === "/collection" && (
          <img
            className="w-5 cursor-pointer"
            src={assets.search_icon}
            alt="search"
            onClick={() => dispatch({ type: "search/visibility" })}
          />
        )}
        <div className="group relative">
          <Link to="/login">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-5 cursor-pointer"
            />
          </Link>
          <div className="group-hover:block hidden absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 rounded bg-slate-100 text-gray-500">
              <p className="cursor-pointer hover:text-black transition-colors">
                My profile
              </p>
              <Link to="/orders">
                <p className="cursor-pointer transition-colors hover:text-black">
                  Orders
                </p>
              </Link>
              <p
                onClick={() => logout()}
                className="cursor-pointer transition-colors hover:text-black"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 aspect-square text-[8px] rounded-full bg-black text-white">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu-icon"
          onClick={onClose}
          className="sm:hidden w-5 cursor-pointer"
        />
      </div>
      {/* Sidebar menu for small menu */}
      <div
        className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-4 p-3 cursor-pointer"
            onClick={onClose}
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown"
              className="h-4 rotate-180"
            />
            <p className="hover:text-black">Back</p>
          </div>
          <NavLink onClick={onClose} className="py-2 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink
            onClick={onClose}
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink onClick={onClose} className="py-2 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={onClose} className="py-2 pl-6 border" to="/contact">
            CONTACT
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
