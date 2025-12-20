import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "The Adventures of Billy Lionheart - Fantasy Book Series by Janice Wee",
  description: "Join Billy Lionheart and his lion guardian Leonard on epic fantasy adventures! A heartwarming book series featuring courage, friendship, and magical creatures. Read reviews, join discussions, and connect with fellow fans.",
  icons: {
    icon: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/favicon-1764594353195.ico",
    shortcut: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/favicon-1764594353195.ico",
    apple: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/favicon-1764594353195.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="02ce17dc-4254-446e-825d-651a5175099d"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d7ac502f-a5d9-4a7f-a06d-e5326aab6b31"
          strategy="afterInteractive"
        />
        {children}
        <Toaster />
        <VisualEditsMessenger />
      </body>
    </html>
  );
}