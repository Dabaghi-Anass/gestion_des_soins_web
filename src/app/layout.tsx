import NavBar from "@/components/navbar";
import SideNav from "@/components/side-nav";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/query-client-provider";
import StoreProvider from "@/lib/storeProvider";
import "@/styles/index.css";
import {
  QueryClient
} from '@tanstack/react-query';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Gestion Des Soins",
  description: "application de gestion des soins",
};
const queryClient = new QueryClient()

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
            <div className="flex flex-col w-full h-full">
              <NavBar />
              <main className="main-content bg-secondary">
                {children}
              </main>
            </div>
          </body>
        </StoreProvider>
      </QueryProvider>
    </html >
  );
}
