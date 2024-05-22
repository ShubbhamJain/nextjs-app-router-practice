import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "@/components/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UpVote Me",
  description: "UpVote Me is a app for upvoting and commenting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* @ts-expect-error Server Component */}
        <Header />
        {children}
      </body>
    </html>
  );
}
