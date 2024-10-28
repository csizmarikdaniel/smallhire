import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NavBar from "@/app/_components/navbar";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "SmallHire",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} bg-sky-200`}
      data-theme="light"
    >
      <body>
        <TRPCReactProvider>
          <NavBar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
