"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password"
      });

      if (error) {
        toast.error("Failed to send reset email. Please try again.");
        return;
      }

      setEmailSent(true);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <Link href="/" className="flex items-center gap-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Billy Lionheart</span>
              </Link>
            </div>
            <CardTitle className="text-2xl text-center">Forgot Password</CardTitle>
            <CardDescription className="text-center">
              {emailSent
                ? "Check your email for a password reset link"
                : "Enter your email address and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    The link will expire in 15 minutes.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  Send to Different Email
                </Button>
              </div>
            )}
            <div className="mt-6 text-center text-sm space-y-2">
              <div>
                Remember your password?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Back to Login
                </Link>
              </div>
              <div>
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
