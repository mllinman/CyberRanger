import Head from 'next/head'
import Link from 'next/link'
import { CheckCircle, Package, Truck } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function OrderSuccess() {
  return (
    <>
      <Head>
        <title>Order Successful - CyberStore</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Successful!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="card p-6 text-center">
                <Package className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Order Confirmed</h3>
                <p className="text-sm text-gray-600">
                  Your order has been received and is being prepared
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <Truck className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-sm text-gray-600">
                  Your items will be shipped within 1-2 business days
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <CheckCircle className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Confirmation</h3>
                <p className="text-sm text-gray-600">
                  A confirmation email has been sent to you
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Order number: <span className="font-semibold">#CS{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/account/orders" className="btn-primary">
                  Track Your Order
                </Link>
                <Link href="/products" className="btn-secondary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}