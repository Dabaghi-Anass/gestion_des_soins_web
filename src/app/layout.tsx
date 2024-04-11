import NavBar from "@/components/navbar";
import SideNav from "@/components/side-nav";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/lib/storeProvider";
import "@/styles/index.css";
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
      <body className={inter.className}>
        <StoreProvider>
          <SideNav />
          <Toaster />
          <div className="flex flex-col w-full h-full">
            <NavBar />
            <main className="main-content p-2 bg-secondary">
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
