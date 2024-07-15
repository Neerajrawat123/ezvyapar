import React from "react";

interface CardProps {
  socket: any; // You can replace 'any' with a more specific type if available
  id: string | undefined;
  userid: string;
  username: string;
}

const Card = ({ socket, id, userid, username }: CardProps) => {
  const sendPing = (id: string | undefined, user: string) => {
    if (id) {
      console.log("working");
      socket.emit("ping", user, id );
    }
  };

  return (
    <div className="border border-green-700 w-[30%] h-48 rounded-lg py-2 px-4">
      <div className="h-3/4 flex justify-center items-center ">
        <h1 className="text-green-700 text-3xl">{username}</h1>
      </div>
      <button
        className="px-2 py-1 bg-red-800 rounded-md float-end  text-white text-lg"
        onClick={() => sendPing(id, userid)}
      >
        Send Ping
      </button>
    </div>
  );
};

export default Card;
