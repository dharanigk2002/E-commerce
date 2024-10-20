import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Login() {
  const [currentState, setCurrentState] = useState("Login");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { token, setToken } = useShop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      if (currentState === "Sign up") {
        const response = await axios.post(BACKEND_URL + "/api/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) toast.success(response.data.message);
      } else {
        const response = await axios.post(BACKEND_URL + "/api/user/login", {
          email,
          password,
        });
        console.log(response.data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
          setEmail("");
          setPassword("");
          setName("");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  if (token) return <Navigate to="/" replace={false} />;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] max-w-96 m-auto gap-4 mt-14 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none w-8 h-[1.5px] bg-gray-800" />
      </div>
      {currentState === "Sign up" && (
        <input
          type="text"
          className="border w-full px-3 py-2 border-gray-800"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        className="border px-3 w-full py-2 border-gray-800"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="border px-3 w-full py-2 border-gray-800"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="flex w-full text-sm justify-between mt-[-8px]">
        <p className="cursor-pointer select-none">Forgot password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign in" : "Sign up"}
      </button>
    </form>
  );
}

export default Login;
