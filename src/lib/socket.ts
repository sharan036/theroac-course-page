import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (socket && socket.connected) return socket;

  const token = Cookies.get("auth_token");

  socket = io(process.env.NEXT_PUBLIC_API_SOCKETURL || "https://api.theroac.com", {
    auth: { token },
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("[Socket] Connected:", socket?.id);
  });
  socket.on("connect_error", (err) => {
    console.warn("[Socket] Connection error:", err.message);
  });
  socket.on("disconnect", (reason) => {
    console.log("[Socket] Disconnected:", reason);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}