"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/tokenContext";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useContext, useState } from "react";

function Register() {

const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [loading, setLoading] = useState(true)
const authContext = useContext(AuthContext); // Get the context object

const { token = null, setToken = () => {} } = authContext || {};  

async function submit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
        username,
        password,
      });

      
      if (res.status === 201) {
        let token = res?.data?.token;
        setToken(token)
        redirect("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  return (
    <div className="w-screen h-screen bg-purple-500">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[29rem] h-[35rem] bg-gray-100 rounded-2xl px-8">
          <div className="flex justify-center py-5">
            <h2 className="font-bold text-3xl">Login</h2>
          </div>
          <div className="flex flex-col gap-6 justify-center pt-6  ">
            

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="username"  value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>

            <div className="grid w-full max-w-sm items-center gap-2">
              <Label htmlFor="password">password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
          </div>
          <div className="flex justify-center py-6">
            <Button size="full" onClick={(e:any) => submit(e)}>
              Login
            </Button>
          </div>
          <div className="flex gap-2 text-xl items-center">
            <h3 className="">Do not have a account 
            </h3>
              <Link className="text-blue-700 underline text-2xl font-medium" href={'/register'}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
