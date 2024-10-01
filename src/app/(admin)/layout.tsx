"use client";
import { refreshAccessToken } from "@/lib/refreshToken";
import { startTokenRefresh } from "@/lib/tokenService";
import store from "@/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    refreshAccessToken()
      .then(() => {
        startTokenRefresh();
      })
      .catch(() => {
        console.error("failed to refresh token");
      });
  }, []);
  return (
    <Provider store={store}>
      {children}
      <ToastContainer />
    </Provider>
  );
}
