"use client";
import Header from "@/components/merchant/Header";
import Sidebar from "@/components/global/Sidebar";
import { refreshAdminAccessToken } from "@/lib/utils/refreshToken";
import { adminNavigation } from "@/lib/statics";
import { startTokenRefresh } from "@/lib/utils/tokenService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    refreshAdminAccessToken()
      .then(() => {
        startTokenRefresh("admin");
      })
      .catch(() => {
        console.error("failed to refresh access token");
        toast.error("Please Login To Access This Page");
        router.push("/admin/auth/login");
      });
  }, [router]);

  return (
    <main className="flex bg-slate-100 justify-end">
      <Sidebar
        navigations={adminNavigation}
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
  );
}
