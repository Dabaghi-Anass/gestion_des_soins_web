import NavBar from "@/components/navbar";
import SideNav from "@/components/side-nav";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/lib/auth-provider";
import QueryProvider from "@/lib/query-client-provider";
import StoreProvider from "@/lib/storeProvider";
import "@/styles/index.css";
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Gestion Des Soins",
  description: "application de gestion des soins",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <StoreProvider>
          <body className={inter.className}>
            <SideNav />
            <Toaster />
            <div className="flex flex-col w-full h-screen">
              <NavBar />
              <main className="main-content bg-secondary">
                <AuthProvider>
                  {children}
                </AuthProvider>
              </main>
            </div>
            <Analytics />
          </body>
        </StoreProvider>
      </QueryProvider>
    </html >
  );
}
