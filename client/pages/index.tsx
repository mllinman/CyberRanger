import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>CyberStore - Modern E-commerce</title>
        <meta name="description" content="Modern e-commerce website with secure payments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Hero />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </>
  )
}