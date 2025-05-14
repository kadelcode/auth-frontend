"use client";

import { getBaseUrl } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";


export default function RegisterPage() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
        }
        try {
        const response = await axios.post(`${getBaseUrl()}/register`, {name, username, email, password });
        if (response.status === 201) {
            // Redirect to the login page
            router.push("/login");
        }
        } catch (error) {
        console.error("Registration failed:", error);
        if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
            setError("Bad request. Please check your input.");
        } else if (axios.isAxiosError(error) && error.response && error.response.status === 409) {
            setError("Email already exists. Please use a different email.");
        } else if (axios.isAxiosError(error) && error.response && error.response.status === 500) {
            setError("Server error. Please try again later.");
        } else {
            setError("An error occurred. Please try again later.");
        }
        } finally {
        setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-black">
            <form onSubmit={handleRegister} className="w-[346px] text-white mx-auto p-6 border border-zinc-700 rounded-2xl shadow-md">
                <h2 className="mb-4 text-2xl font-bold text-zinc-400">Register</h2>
                {error && <p className="mb-4 font-bold text-red-500">{error}</p>}
                <div className="mb-4">
                    <Label htmlFor="name" className="text-base">Name</Label>
                    <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1"
                    />
                </div>
                <div className="mb-4">
                    <Label htmlFor="username" className="text-base">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1"
                    />  
                </div>
                <div className="mb-4">
                    <Label htmlFor="email" className="text-base">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1"
                    />
                </div>
                <div className="mb-4 relative">
                    <Label htmlFor="password" className="text-base">Password</Label>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1"
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-9 text-gray-500"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <div className="mb-4 relative">
                    <Label htmlFor="confirmPassword" className="text-base">Confirm Password</Label>
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="mt-1"
                    />
                    <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-2 top-9 text-gray-500"
                    >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
                <Button type="submit" disabled={loading} className={`w-full bg-zinc-900 ${loading ? "opacity-50" : ""}`}>
                    {loading ? <Loader2 className="animate-spin mr-2" /> : "Register"}
                </Button>

                <p className="mt-4 text-sm text-zinc-400 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};