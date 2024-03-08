import "@/styles/globals.css";
import "@/styles/common.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/context/appContext";
import { UserProvider } from "@/context/userContext";
import { CartProvider } from "@/context/cartContext";
import { WishlistProvider } from "@/context/wishlistContext";
import { CategoryProvider } from "@/context/categoryContext";
import { ProductProvider } from "@/context/productContext";
import NextProgress from "next-progress";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <AppProvider>
      <UserProvider>
        <CategoryProvider>
          <ProductProvider>
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
          </ProductProvider>
        </CategoryProvider>
      </UserProvider>
    </AppProvider>
  )
}
