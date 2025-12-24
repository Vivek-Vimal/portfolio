import type { Metadata } from "next";
import "./globals.css";
import {  Roboto } from "next/font/google";
import { ReactNode } from "react";
import { ReduxProvider } from "@/store/Provider";
import Main from "./main";
import AlertNotification from "@/components/AlertNotification";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme";
import LoadingScreen from "@/components/LoadingScreen";
import AlertDialog from "@/components/DailogBox";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// export const metadata: Metadata = {
//   title: "Vivek Co.",
//   description: "Portfolio Frontend Developer",
// };

export const metadata: Metadata = {
  title: "Vivek Co.",
  description: "React & Next.js Developer Portfolio",
  openGraph: {
    title: "Vivek Vimal | Portfolio",
    description: "React, Next.js, TypeScript Developer",
    url: "https://vivekco.netlify.app",
    siteName: "Vivek Portfolio",
    images: [
      {
        url: "https://vivekco.netlify.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <ReduxProvider>
            <ThemeProvider theme={theme}>
              <LoadingScreen />
              <AlertNotification />
              <AlertDialog />
              <Main>{children}</Main>
            </ThemeProvider>
          </ReduxProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
