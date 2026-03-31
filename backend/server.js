import http from "http";
import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { initSocket } from "./src/sockets/socket.js";

dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const server = http.createServer(app);

initSocket(server);
connectDB();

server.listen(5000, () => {
  console.log("Server running on port 5000");
});