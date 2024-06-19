import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/_header/Header";

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
        <div className="flex flex-col min-h-screen min-w-[350px]">
          <Header />
          <main className="min-h-page py-2.5 px-2.5 md:px-5 md:py-5">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
