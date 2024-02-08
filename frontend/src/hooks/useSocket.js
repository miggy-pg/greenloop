import io from "socket.io-client";
import { useMemo, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useMemo(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  return socket;
};
