import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import Login from "./components/Login";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [token, setToken] = useState(() => {
    const storedToken = window.localStorage.getItem("token");
    return storedToken || "";
  });

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <main className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="text-base w-[70%] mx-auto my-8 ml-[max(5vw,25px)] text-gray-600">
              <Routes>
                <Route path="/" element={<Navigate to="/add" />} />
                <Route path="/add" index element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
