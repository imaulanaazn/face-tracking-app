"use client";
import "../globals.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMerchant } from "@/store/slices/merchantSlice";
import { getMyMerchant } from "@/services/api/merchant";
import { startTokenRefresh } from "@/lib/tokenService";
import { refreshAccessToken } from "@/lib/refreshToken";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/merchant/Sidebar";
import LoadingAnimation from "@/components/global/LoadingAnimation";
import Header from "@/components/merchant/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchMerchantData = async () => {
      try {
        setIsLoading(true);
        const response = await getMyMerchant();
        dispatch(setMerchant(response.data));
        setIsLoading(false);
      } catch (error: any) {
        toast.error("Please login with valid credential");
        router.push("/auth/login");
      }
    };

    fetchMerchantData();
    // refreshAccessToken()
    //   .then(() => {
    //     startTokenRefresh();
    //   })
    //   .catch(() => {
    //     toast.error("Sesi anda berakhir, silahkan login");
    //     router.push("/auth/login");
    //   });
  }, [dispatch, router]);

  if (loading) {
    return <Loading />;
  }

  return (
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
  );
}

function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <div className="w-40">
        <LoadingAnimation />
      </div>
    </div>
  );
}
