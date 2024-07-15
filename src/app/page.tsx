"use client";
import Card from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";
import { AuthContext } from "@/context/tokenContext";

export default function Home() {
  const { token , setToken } = useContext(AuthContext)
  
  const router = useRouter();
  if (!token) {
    router.push("/login");
  }

  const notificatiosQueue: [string] | [] = [];
  const { toast } = useToast();

  const [users, setUsers] = useState([]);
  const [myId, setMyId] = useState<string | undefined>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    
 
      let socketInstance = io("http://localhost:4000", {
        autoConnect: false,
        auth:{token}
  });
      socketInstance.connect();
      setSocket(socketInstance);

      socketInstance.on("connect", (socket) => {
        console.log("socket is connected using", socketInstance.id);
      });

      socketInstance.on("users", (usersData) => {
        let users = usersData.filter((usr) => usr[1] !== socketInstance.id);
        let myId = usersData.filter((id) => id[1] === socketInstance.id)
        console.log(user, myId)

        setUsers(users);
        setMyId(myId[0])
      });

      socketInstance.on("ping", (from: string) => {
        notificatiosQueue.push(from);
        toast({
          title: "Toast Notification",
          description: `${from} send you ping`,
        });
        // alert(`Ping from ${from}`);
      });

    return () => {
      socketInstance.close();
      socketInstance.off("ping");
    };
  
  }, [token]);

  function sendNotification() {
    socket?.emit("sendToall", myId);
  }

  return (
    <div className="w-screen px-16 py-12 h-screen ">
      {users.length < 1 && (
        <h1 className="text-4xl font-bold text-center">No other user</h1>
      )}
      <div className="flex flex-wrap gap-3 h-4/5">
        {users.length > 0 &&
          users.map((user, index) => (
            <Card key={index} userid={user[1]} username={user[0]} id={myId} socket={socket} />
          ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={sendNotification}
          className=" border text-red-600 bg-white border-red-800 text-4xl px-16 py-8 rounded-lg"
        >
          Send notifications to all
        </button>

        <Toaster />
      </div>
    </div>
  );
}
