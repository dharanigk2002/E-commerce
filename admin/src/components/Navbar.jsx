import { assets } from "../assets/assets";

function Navbar({ setToken }) {
  return (
    <nav className="flex items-center justify-between py-2 px-[4%]">
      <img src={assets.logo} alt="admin logo" className="w-[max(10%,80px)]" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 px-5 py-2 text-white sm:px-7 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
