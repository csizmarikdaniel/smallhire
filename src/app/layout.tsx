import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { Suspense } from "react";
import Loading from "./_components/loading";

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
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
