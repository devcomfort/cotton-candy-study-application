import { useEffect } from "react";
import io from "socket.io-client";

const Create = () => {
  const socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  useEffect(() => {
    socket.connect();
  });

  return <div></div>;
};

export default Create;
