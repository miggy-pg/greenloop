import io from "socket.io-client";
import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  return socket;
};
