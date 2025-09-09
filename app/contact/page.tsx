"use client";
import React from "react";
import dynamic from "next/dynamic";

const MainComponent = dynamic(() => import("./Components"), { ssr: false });

const page = () => {
  return <MainComponent />;
};

export default page;
