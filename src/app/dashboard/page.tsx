"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getBaseUrl } from "@/lib/api"
import { Loader } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"

type User = {
    id: number;
    name: string;
    email: string;
}

export default function DashboardPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            router.push('/login')
        } else {
            axios.get(`${getBaseUrl()}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => setUser(res.data))
              .catch(() => router.push('/login'))
        }
    }, [])

    return (
        <div className="p-6 bg-black h-screen text-white">
            {user ? (
                <div className="mt-4">
                    <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
                    <p className="mt-6 mb-3">
                        This is the dashboard test page
                    </p>
                    <Button
                      className="bg-zinc-900 hover:bg-zinc-800"
                      onClick={() => {
                        localStorage.removeItem('token')
                        router.push('/login')
                      }}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <Loader className="h-6 w-6 animate-spin text-gray-700" />
                </div>
            )}
        </div>
    )
}