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
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();
 const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    // if (!res.ok) return alert(result.error);
    // alert("Registered successfully! Please login.");
     if(!res.ok)
    {
        setError(result.error);
    }
    router.push("/login");
  };

  return (
    // <div className="flex justify-center items-center h-screen">
    //   <form onSubmit={handleSubmit(onSubmit)} className="p-6 border rounded shadow-md w-80">
    //     <h2 className="text-2xl font-bold mb-4">Register</h2>
    //     <input
    //       {...register("name")}
    //       placeholder="Name"
    //       className="border p-2 mb-3 w-full rounded"
    //     />
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
    //     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
    //       Register
    //     </button>
    //   </form>
    //   <p>Registered alread? <a href="/login" className="text-blue-500 underline">Login here</a></p>
    // </div>
     <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
            </div>

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
              Register
            </Button>
          </form>

          <p className="text-sm text-center mt-4">
            Already registered?{" "}
            <Link href="/login" className="text-primary underline">
              Login here
            </Link>
          </p>

          <p className="text-sm text-center mt-4 text-red-500">{error}</p>
        </CardContent>
      </Card>
    </div>
  );
}
