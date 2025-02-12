import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner";
import Link from "next/link";
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
 router.events.on("routeChangeStart", () => console.log("Route changing..."));
  router.events.on("routeChangeComplete", () => console.log("Route change complete"));
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return <div className="bg-purple-800">{loading && <LoadingSpinner />}
  <div className="md:px-[5rem] px-[2.9rem] py-5 font-bold  text-blue-600">
  <Link className="pr-2 active:text-green-400" href="/">Home</Link><Link className="active:text-green-400"  href="/about">About</Link></div>
  <Component {...pageProps} />;</div>
}
