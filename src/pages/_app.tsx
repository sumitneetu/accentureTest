import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // let cartData = { products: [], cartTotal: 0 }
    // window.localStorage.setItem('cart', JSON.stringify(cartData))
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
