"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/Navbar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [token, setToken] = useState<string | null>(null)
   const [hasToken, setHasToken] = useState(false)

 useEffect(() => {
  const t = localStorage.getItem("token");
  setToken(t);
  setHasToken(!!t);
}, []);

console.log("token",token)
  return (
    <>
      {hasToken && <Navbar />}
      {children}
    </>
  )
}
