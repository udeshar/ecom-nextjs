import "@/styles/globals.css";
import "@/styles/common.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/context/appContext";
import { UserProvider } from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AppProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AppProvider>
  )
}
