import { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nexora - Premium Electronics & Lifestyle Store</title>
        <meta name="description" content="Discover premium electronics, smartphones, gaming accessories, and lifestyle products at Nexora. Shop the latest tech trends with competitive prices and fast delivery across India." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Welcome to Nexora
          </h1>
          <p className="text-center text-lg mb-8">
            Premium Electronics & Lifestyle Store
          </p>
          <div className="text-center">
            <p className="text-gray-600">
              Your one-stop destination for premium electronics and lifestyle products.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home 