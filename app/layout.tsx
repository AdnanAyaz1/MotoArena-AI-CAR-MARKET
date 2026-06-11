import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Sora, JetBrains_Mono } from "next/font/google";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, Bounce } from "react-toastify";
import SplashScreen from "@/components/SplashScreen";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const sora = Sora({
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-sora",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Motoverse",
    description:
      "Motoverse - Your premier marketplace for buying and selling automobiles. Find your perfect vehicle or list your car for sale in our trusted automotive community.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${jakarta.variable} ${sora.variable} ${jetbrainsMono.variable} antialiased`}
        >
          <SplashScreen />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </body>
      </SessionProvider>
    </html>
  );
}
