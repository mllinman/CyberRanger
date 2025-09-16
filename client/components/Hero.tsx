import Link from 'next/link'
import { ShoppingBag, Zap, Shield, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Modern E-commerce
                <span className="block text-blue-100">Made Simple</span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Discover premium products with secure payments, fast shipping, and exceptional customer service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="btn-primary inline-flex items-center justify-center space-x-2 bg-white text-primary-600 hover:bg-gray-50">
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Now</span>
              </Link>
              <Link href="/about" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-blue-200" />
                <span className="text-blue-100">Fast Delivery</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-200" />
                <span className="text-blue-100">Secure Payments</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-blue-200" />
                <span className="text-blue-100">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 h-24"></div>
                  <div className="bg-white bg-opacity-15 rounded-lg p-4 h-16"></div>
                  <div className="bg-white bg-opacity-25 rounded-lg p-4 h-20"></div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="bg-white bg-opacity-15 rounded-lg p-4 h-16"></div>
                  <div className="bg-white bg-opacity-30 rounded-lg p-4 h-24"></div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 h-20"></div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-semibold text-sm animate-bounce">
              Free Shipping!
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}