"use client";
//import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "../home/page";

const Main = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAnimationTime, setIsAnimationTime] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ✅ Ensures component runs only on the client

    if (typeof window !== "undefined") {
      const hasPlayed = sessionStorage.getItem("hasPlayedSplash") === "true";

      if (!hasPlayed) {
        setIsAnimationTime(true);
        setTimeout(() => {
          sessionStorage.setItem("hasPlayedSplash", "true");
          setIsAnimationTime(false);
          router.push("/dashboard"); // ✅ Redirect after splash screen
        }, 8000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient) return null; // Prevents hydration mismatch

  return (
    <>
      {isAnimationTime ? (
        <SplashScreen />
      ) : (
        <>
          {/* <Navbar /> */}
          {children}
        </>
      )}
    </>
  );
};

export default Main;
