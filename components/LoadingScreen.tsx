"use client"; // Needed for client components

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Spinner from "./Spinner";

const Loader = () => {
  const pathname = usePathname(); // Get current path
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate loading time

    return () => clearTimeout(timer); // Cleanup
  }, [pathname]); // Run effect when pathname changes

  

  if (!loading) return null;

  return <Spinner />;
};

export default Loader;
