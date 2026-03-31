import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

// 🔥 Decode JWT to get userId
const token = localStorage.getItem("token");

if (token) {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const userId = payload.id;

  socket.emit("join", userId);
}

export default socket;