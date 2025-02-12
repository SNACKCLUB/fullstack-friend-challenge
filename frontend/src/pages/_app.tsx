import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { ToastContainer } from "react-toastify";

import theme from "@/styles/themeConfig";
import { useAuthStore } from "@/store/auth/authStore";
import { Header } from "@/components/Header";

import "@/styles/global.scss";
import { Footer } from "@/components/Footer";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      logout();
      router.push("/");
    }
  }, [isHydrated, isAuthenticated, logout, router]);

  return (
    <ConfigProvider theme={theme}>
      <ToastContainer />
      {router.pathname !== "/" && <Header />}
      <div className="containerApp">
        <Component {...pageProps} />
        {/* <Footer /> */}
      </div>
    </ConfigProvider>
  );
};

export default App;
