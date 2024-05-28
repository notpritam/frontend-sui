"use client";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import Queryprovider from "@/components/providers/queryprovider";
import Header from "@/components/common/Header";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Queryprovider>
          <div className="flex flex-col w-full h-full">
            <Header />
            {children}
          </div>
        </Queryprovider>
        <Toaster />
      </body>
    </html>
  );
}
