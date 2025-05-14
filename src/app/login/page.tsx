"use client";

import { getBaseUrl } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${getBaseUrl()}/login`, { email, password });
      if (response.status === 200) {
        // Redirect to the dashboard or home page
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // setError("Invalid email or password");
      // Optionally, you can handle specific error messages based on the response status
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else if (axios.isAxiosError(error) && error.response && error.response.status === 500) {
        setError("Server error. Please try again later.");
      } else if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
        setError("Bad request. Please check your input.");
      } else if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        setError("User not found. Please check your email.");
      } else if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        setError("Access denied. You do not have permission to access this resource.");
      }
       else {
        setError("An error occurred. Please try again later.");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form onSubmit={handleLogin} className="w-[346px] text-white mx-auto p-6 border rounded-2xl shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        {error && <p className="mb-4 font-bold text-red-500">{error}</p>}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="cursor-pointer w-full">
            {loading ? (
                <Loader2 className="animate-spin" />
            ) : (
                "Login"
            )}
        </Button>
      </form>
    </div>
  );
}