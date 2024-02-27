import "@/styles/globals.css";
import "@/styles/common.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/context/appContext";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import { WishlistProvider } from "@/context/wishlistContext";
import NextProgress from "next-progress";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AppProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <NextProgress
              color="#29D"
              height={3}
              options={{
                showSpinner: false
              }}
            />
            <Component {...pageProps} />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </AppProvider>
  )
}
