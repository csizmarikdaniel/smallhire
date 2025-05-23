import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Suspense } from "react";
import Loading from "./_components/loading";
import Navbar from "./_components/navbar";

export const metadata: Metadata = {
  title: "SmallHire",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} data-theme="light">
      <body>
        <TRPCReactProvider>
          <Suspense fallback={<Loading />}>
            <Navbar />
            {children}
          </Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
