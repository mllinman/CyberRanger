import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import FeaturesGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>CyberRecon Suite - Professional Security Tools</title>
        <meta name="description" content="Professional penetration testing and network security analysis tools for authorized security research." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main>
          <Hero />
          <FeaturesGrid />
        </main>
        <Footer />
      </div>
    </>
  )
}