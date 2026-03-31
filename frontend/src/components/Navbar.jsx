import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();

  return (
    <div className="p-4 bg-gray-800 text-white flex justify-between items-center">

      {/* Left side */}
      <div className="flex gap-4">
        <Link to="/">Dashboard</Link>

        {role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}
      </div>

      {/* Right side */}
      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 px-3 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
}