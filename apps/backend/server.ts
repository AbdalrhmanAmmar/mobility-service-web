import "dotenv/config";
import app from "./app";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Make io accessible in controllers
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket Client connected:", socket.id);
  
  socket.on("disconnect", () => {
    console.log("Socket Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📁 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log("=".repeat(50));
  console.log(`🔑 JWT Secret Loaded: ${process.env.JWT_SECRET ? "YES ✅" : "NO ❌"}`);
});
