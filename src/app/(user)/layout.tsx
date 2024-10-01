"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { refreshAccessToken } from "@/lib/refreshToken";
import { startTokenRefresh } from "@/lib/tokenService";

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
