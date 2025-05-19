"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { Button } from "@/components/ui/button"


type User = {
    id: number;
    name: string;
    email: string;
    roles: string[]
}

export default function AdminPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('/api/admin', {
                    withCredentials: true,
                })

                console.log(res.data)

                if (!res.data.roles.includes("admin")) {
                    toast.error("Access denied: Admins only")
                    router.push("/")
                } else {
                    setUser(res.data)
                }
            } catch (error) {
                console.log(error)
                toast.error("Sorry, you don't have access to this page!")
                router.push("/")
            }
        }

        fetchUser()
    }, [router])

    return (
        <div className="p-6 bg-black h-screen text-white">
            {user ? (
                <div className="mt-4">
                    <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
                    <p className="mt-6 mb-3">This is the admin dashboard</p>
                    <Button
                      className="bg-zinc-900 hover:bg-zinc-800"
                      onClick={() => {
                        axios.post('api/logout', {}, { withCredentials: true })
                        router.push("/login")
                        toast.success("Logged out")
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