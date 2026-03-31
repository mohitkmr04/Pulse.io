import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await API.get("/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (userId, role) => {
    await API.put("/auth/role", { userId, role });
    fetchUsers();
  };

  const getRoleStyle = (role) => {
    if (role === "admin") return "bg-red-100 text-red-600";
    if (role === "editor") return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      
      <div className="w-full max-w-3xl">
        
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Admin Panel 👨‍💻
        </h2>

        <div className="space-y-4">
          {users.map((u) => (
            
            <div
              key={u._id}
              className="bg-white p-4 rounded-xl shadow-md flex items-center justify-between hover:shadow-lg transition"
            >
              
              {/* Left Section */}
              <div>
                <p className="font-medium text-gray-800">{u.email}</p>
                
                <span
                  className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${getRoleStyle(u.role)}`}
                >
                  {u.role}
                </span>
              </div>

              {/* Right Section */}
              <select
                value={u.role}
                onChange={(e) => updateRole(u._id, e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 
                           transition cursor-pointer"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}