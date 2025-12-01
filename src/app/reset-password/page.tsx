import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ResetPasswordForm } from "@/components/ResetPasswordForm";
import { Card, CardContent } from "@/components/ui/card";

// Force dynamic rendering to prevent prerender errors
export const dynamic = 'force-dynamic';

export default function ResetPasswordPage() {
  return (
    <>
      <Toaster />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">Loading...</div>
            </CardContent>
          </Card>
        </div>
      }>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
}