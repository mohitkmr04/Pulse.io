import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/authSlice";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("mohit@test.com");
  const [password, setPassword] = useState("123456");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      dispatch(setAuth({
        token: res.data.token,
        role: res.data.role
      }));

      alert("Login successful ✅");

    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-5">
        
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-sm text-center text-gray-500">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <button
          onClick={login}
          className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:scale-105 hover:shadow-lg transition-transform duration-200"
        >
          Login
        </button>

        <p className="text-xs text-center text-gray-400">
          Forgot password?
        </p>

      </div>
    </div>
  );
}