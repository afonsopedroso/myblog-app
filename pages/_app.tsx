import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import Link from "next/link";
import PageTransition from "@/components/PageStransition";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isActive = (path: string): string =>
    router.pathname === path ? "text-white  font-bold underline" : "text-white";

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return <div className="bg-slate-600 min-h-screen">{loading && <LoadingSpinner />}
      <div className="md:px-[5rem] px-[1.2rem] text-2xl pt-5 pb-5">
        <Link className={`pr-2  active:text-green-400 ${isActive("/")}`} href="/">Home</Link>
        <Link className={`active:text-green-400 ${isActive("/about")}`}  href="/about">About</Link>´
      </div>
      <PageTransition key={router.route}>
    <Component {...pageProps} />;
    </PageTransition>
  </div>

}
