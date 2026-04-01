import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Empty by default (dynamic input)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    // ✅ basic validation
    if (!email || !password) {
      return toast.warning("Please enter email and password");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email,
        password
      });
      console.log(res.data);

      const { token, role } = res.data;

      dispatch(setAuth({
        token,
        role,
        user: null
      }));

      toast.success(res.data.message || "Login successful ✅");

      navigate("/");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Login failed ❌"
      );
    } finally {
      setLoading(false);
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

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="p-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-xs text-center text-gray-400">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}