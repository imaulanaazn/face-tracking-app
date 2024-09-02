"use client";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@/store";
import { useEffect } from "react";
import { startTokenRefresh } from "@/lib/tokenService";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    async function triggerRefreshToken() {
      await startTokenRefresh();
    }
    triggerRefreshToken();
  }, []);
  return (
    <html lang="en">
      <body className="w-screen overflow-x-hidden">
        <Provider store={store}>
          {children}
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
