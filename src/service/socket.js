import io from "socket.io-client";

const SOCKET_URL = "http://127.0.0.1:8123/";
export const socket = io(SOCKET_URL);