"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/global/Sidebar";
import Header from "@/components/global/Header";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main className="flex w-screen h-screen overflow-x-hidden overflow-y-auto bg-slate-100 justify-end">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={(params) => {
            setSidebarOpen(params);
          }}
        />
        <div className="bg-slate-100 w-full lg:w-4/5 relative">
          <Header
            setSidebarOpen={(params) => {
              setSidebarOpen(params);
            }}
          />
          {children}
        </div>
      </main>
    </>
  );
}
