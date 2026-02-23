"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-t-8 border-t-primary">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Enter your credentials to access BilisPermit
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-10"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary py-6 text-lg"
                disabled={loading}
              >
                {loading ? "Authenticating..." : "Login"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-bold hover:underline"
              >
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}