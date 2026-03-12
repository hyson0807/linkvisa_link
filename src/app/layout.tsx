import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import StoreProvider from "@/store/StoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkVisa Link - 비자 서류 수집 플랫폼",
  description: "외국인 비자 서류를 쉽고 빠르게 수집하고 AI로 검수하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} antialiased bg-[#F8F9FA]`}>
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
