import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
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
        <NavBar />
        <Toaster />
        {children}
      </body>
    </html>
  );
}
