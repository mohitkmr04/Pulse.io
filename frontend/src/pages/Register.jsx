import API from "../api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    // ✅ Validation
    if (!name || !email || !password) {
      return toast.warning("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name,
        email,
        password
      });

      console.log(res.data); // debug

      const { token, user } = res.data;

      // ✅ Save to Redux
      dispatch(setAuth({
        token,
        role: user.role,
        user
      }));

      toast.success(res.data.message || "Account created successfully 🎉");

      // ✅ Redirect
      navigate("/");

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80 flex flex-col gap-5">
        
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account 🚀
        </h2>

        <p className="text-sm text-center text-gray-500">
          Register to get started
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && register()}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && register()}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && register()}
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Button */}
        <button
          onClick={register}
          disabled={loading}
          className="p-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        {/* Redirect to login */}
        <p className="text-xs text-center text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}