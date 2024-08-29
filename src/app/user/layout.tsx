"use client";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/global/Sidebar";
import Header from "@/components/global/header/Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setUser } from "@/store/slices/userSlice";
import { getUser } from "@/services/api/user";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const profile = await getUser();
        dispatch(setUser(profile));
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <main className="flex bg-slate-100 justify-end">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={(params) => {
            setSidebarOpen(params);
          }}
        />
        <div className="bg-slate-100 w-full xl:w-4/5 relative h-screen overflow-auto">
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
