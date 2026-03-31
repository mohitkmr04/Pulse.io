import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

function App() {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>

      {/* ✅ Show Navbar only when logged in */}
      {token && <Navbar />}

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            token ? (
              role === "admin"
                ? <Admin />
                : <div className="p-6 text-red-500">Access Denied ❌</div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;