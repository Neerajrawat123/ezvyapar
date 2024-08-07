"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/tokenContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEventHandler, useContext, useState } from "react";

function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext); // Get the context object

  const { token = null, setToken = () => {} } = authContext || {};    const router = useRouter()

  async function submit(e: FormEvent<HTMLFormElement>) {
    console.log("working");

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
        username,
        password,
      });


      if (res.status === 201) {
        setToken(res?.data?.token)
        router.push('/')
        setLoading(false)
      }
    } catch (error:any) {
      setError(error.response.data.message)

      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="w-screen h-screen bg-purple-500">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[29rem] h-[35rem] bg-gray-100 rounded-2xl px-8">
          <div className="flex justify-center py-5">
            <h2 className="font-bold text-3xl">Register</h2>
          </div>
          <div className="flex flex-col gap-6 justify-center pt-6  ">
            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="password">password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex justify-center py-6">
            <Button size="full" onClick={(e:any) => submit(e)}>
              Register
            </Button>
          </div>
          <div>
            {error && (<h4 className="text-red-700 text-center">{error}</h4>)}
          </div>
          <div className="flex gap-2 text-xl items-center">
            <h3 className="">Do not have a account</h3>
            <Link
              className="text-blue-700 underline text-2xl font-medium"
              href={"/login"}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
