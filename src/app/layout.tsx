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
  openGraph: {
    title: "hopital de fsdm",
    description: "Il s'agit d'une application créée pour aider les professionnels de la santé à communiquer facilement avec les clients",
    type: "website",
    locale: "fr_FR",
    url: "https://www.fsdm-hospital.me",
    siteName: "Gestion Des Soins",
    images: [
      {
        url: "https://img.freepik.com/photos-gratuite/portrait-medecin-videoconference-clinique_23-2148728382.jpg?t=st=1721588306~exp=1721591906~hmac=422b55dda9886d25c9bbf28d7f5866c580a50fa8f9c1b17d2add8f3f86abd26b&w=740",
        width: 800,
        height: 600,
        alt: "Gestion Des Soins",
      },
      {
        url: "https://img.freepik.com/photos-gratuite/docteur-verifiant-ses-patients_23-2149017270.jpg?uid=R35211599&ga=GA1.1.2001347315.1721587973&semt=sph",
        width: 800,
        height: 600,
        alt: "Gestion Des Soins",
      },
      {
        url: "https://img.freepik.com/vecteurs-libre/chirurgiens-faisant-illustration-concept-chirurgie_114360-15650.jpg?t=st=1721588698~exp=1721592298~hmac=b958ce62ca82c9d4e8c9ebde0f0a5e9f108fb7831ad7db0e427c97e45f6c4459&w=740",
        width: 800,
        height: 600,
        alt: "Gestion Des Soins",
      },

    ],
  }
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
