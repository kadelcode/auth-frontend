"use client";

//import { getBaseUrl } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
}

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post('/api/login', { email, password }, {
        withCredentials: true, // Send & receive cookies
      });
      toast.success("Login successful!");
      // Redirect to the dashboard or home page
      router.push("/dashboard");
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
      <form onSubmit={handleLogin} className="w-[346px] text-white mx-auto p-6 border border-gray-700 rounded-2xl shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-zinc-400">Login</h2>
        {error && <p className="mb-4 font-bold text-red-500">{error}</p>}
        <div className="mb-4">
          <Label htmlFor="email" className="text-base">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-8 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <Button type="submit" className="cursor-pointer w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded">
            {loading ? (
                <Loader2 className="animate-spin" />
            ) : (
                "Login"
            )}
        </Button>

        <p className="mt-4 text-sm text-center text-zinc-400">
          Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
                Register
            </a>
        </p>
      </form>
    </div>
  );
}