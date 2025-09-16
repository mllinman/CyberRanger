import Head from 'next/head'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import Footer from '../components/Footer'

export default function Products() {
  return (
    <>
      <Head>
        <title>Products - CyberStore</title>
        <meta name="description" content="Browse our extensive collection of premium products" />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          {/* Page Header */}
          <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
              <p className="text-gray-600">
                Discover our complete collection of premium products with secure checkout and fast shipping.
              </p>
            </div>
          </section>
          
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </>
  )
}