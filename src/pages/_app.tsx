import "@/styles/globals.css";
import "@/styles/common.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/context/appContext";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import { WishlistProvider } from "@/context/wishlistContext";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AppProvider>
      <UserProvider>
        <CartProvider>
          <WishlistProvider>
            <Component {...pageProps} />
          </WishlistProvider>
        </CartProvider>
      </UserProvider>
    </AppProvider>
  )
}
