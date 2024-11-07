// src/pages/_app.tsx
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" forcedTheme="system">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
