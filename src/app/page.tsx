"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-400">Welcome to Auth Test App</h1>
      <p className="mb-8 text-center max-w-md text-gray-600">
        This is a simple frontend built with Next.js 13+, TailwindCSS, and ShadCN to test an authentication backend system
  
      </p>
      <div className="flex gap-4">
        <Button
          className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer" 
          onClick={() => router.push('/login')}
        >
          Login
        </Button>

        <Button 
          className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
          onClick={() => router.push('/register')}
        >
          Register
        </Button>

        <Button 
          className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          Dashboard
        </Button>

        <Button 
          className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer"
          onClick={() => router.push('/admin')}
        >
          Admin
        </Button>
      </div>
    </main>
  )
}