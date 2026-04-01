import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ added
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

// ✅ Toast import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Protected Route
const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

// ✅ Admin Route
const AdminRoute = ({ children }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) return <Navigate to="/login" />;

  if (role !== "admin") {
    return (
      <div className="p-6 text-red-500 text-center">
        Access Denied ❌
      </div>
    );
  }

  return children;
};

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>

      {/* ✅ Navbar (only when logged in) */}
      {token && <Navbar />}

      {/* ✅ Toast Container (NEW) */}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>

        {/* ✅ Login */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        {/* ✅ Register (NEW) */}
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        {/* ✅ Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        {/* ✅ 404 Page (recommended) */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-gray-500">
              Page Not Found 🚫
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;