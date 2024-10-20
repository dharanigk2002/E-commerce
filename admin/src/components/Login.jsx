import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/admin`, {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        navigate("/add");
      } else {
        toast.error(response.data.message);
      }
    } catch ({ message }) {
      console.error(message);
      toast.error(message);
    }
    setEmail("");
    setPassword("");
  }
  return (
    <div className="min-h-screen items-center justify-center flex w-full">
      <div className="bg-white shadow-md px-8 py-6 max-w-md rounded-lg">
        <h1 className="font-bold text-2xl mb-4">Admin panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <label
              className="text-sm font-medium text-gray-700 mb-2"
              htmlFor="email"
            >
              E-mail address
            </label>
            <input
              className="rounded-md px-3 py-2 border-gray-300 w-full outline-none border"
              type="email"
              placeholder="example@email.com"
              name="email"
              value={email}
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="min-w-72 mb-3">
            <label
              className="text-sm font-medium text-gray-700 mb-2"
              htmlFor="pwd"
            >
              E-mail address
            </label>
            <input
              className="rounded-md px-3 py-2 border-gray-300 w-full outline-none border"
              type="password"
              placeholder="Enter your password"
              name="password"
              id="pwd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full mt-2 py-2 px-4 rounded-md text-white bg-black">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
