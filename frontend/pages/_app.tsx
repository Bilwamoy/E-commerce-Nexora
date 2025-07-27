import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { CartProvider } from '../components/CartContext'
import { LanguageProvider } from '../components/LanguageContext'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <CartProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </CartProvider>
    </LanguageProvider>
  )
} 