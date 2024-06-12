import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEB MARKET CLIENT",
  description: "포트폴리오용 웹 마켓 클라이언트 사이트입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen px-5">
          <Header />
          <main className="grow bg-indigo-400">{children}</main>
        </div>
      </body>
    </html>
  );
}
