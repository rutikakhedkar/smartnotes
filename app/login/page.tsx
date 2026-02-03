"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    // if (!res.ok) return alert(result.error);
    console.log(result.error);
    if(!res.ok)
    {
        setError(result.error);
    }
  
    // Save token
    localStorage.setItem("token", result.token);
    

    localStorage.setItem("user", JSON.stringify(result.user));
    router.push("/dashboard");
  };

  return (
    // <div className="flex justify-center items-center h-screen">
    //   <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded shadow-md w-80">
    //     <h2 className="text-2xl font-bold mb-4">Login</h2>
    //     <input
    //       {...register("email")}
    //       placeholder="Email"
    //       type="email"
    //       className="border p-2 mb-3 w-full rounded"
    //     />
    //     <input
    //       {...register("password")}
    //       placeholder="Password"
    //       type="password"
    //       className="border p-2 mb-4 w-full rounded"
    //     />
    //     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
    //       Login
    //     </button>
        
    //   </form>
    //   <p>Don't have login? <a href="/register" className="text-blue-500 underline">Register now</a></p>
    // </div>
     <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary underline">
              Register now
            </Link>
          </p>

             <p className="text-sm text-center mt-4 text-red-500">{error}</p>
        </CardContent>
      </Card>

   
    </div>
  );
}
