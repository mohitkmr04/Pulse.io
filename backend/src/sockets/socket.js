import { Server } from "socket.io";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  global.io = io;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // ✅ JOIN USER-SPECIFIC ROOM
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });

    // ❌ Cleanup on disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};