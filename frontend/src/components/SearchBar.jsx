import { useLocation } from "react-router-dom";
import { assets } from "../assets/assets";
import { useShop } from "../context/ShopContext";

function SearchBar() {
  const { search, showSearch, dispatch } = useShop();
  const { pathname } = useLocation();
  if (!showSearch || pathname !== "/collection") return null;
  return (
    <div className="text-center border-t border-b bg-gray-50">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="search"
          placeholder="search"
          className="text-sm bg-inherit flex-1 outline-none"
          value={search}
          onChange={(e) =>
            dispatch({ type: "search/input", payload: e.target.value })
          }
        />
        <img src={assets.search_icon} className="w-4" alt="search" />
      </div>
      <img
        src={assets.cross_icon}
        className="inline w-3 cursor-pointer"
        onClick={() => dispatch({ type: "search/visibility" })}
        alt="cross-icon"
      />
    </div>
  );
}

export default SearchBar;
