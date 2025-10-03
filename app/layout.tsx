import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AuthProvider from "./AuthProvider";
import Navbar from "@/components/Navbar";


const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Quick Cart",
  description: "A shopping website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased text-gray-700`}
        suppressHydrationWarning
      >
        <Providers>
          <AuthProvider>
           
             
             {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
