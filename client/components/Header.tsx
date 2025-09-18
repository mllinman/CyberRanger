import { ShoppingCart, User, Search, Menu, X, Shield } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '../lib/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItems = useCartStore((state) => state.items)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white">CyberRecon</span>
              <span className="text-xs text-purple-400 font-medium -mt-1">Security Suite</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
              🛡️ Dashboard
            </Link>
            <Link href="/features" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
              Pricing
            </Link>
            <Link href="/documentation" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
              Docs
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/account" className="text-gray-300 hover:text-white p-2 rounded-lg hover:bg-purple-600/20 transition-colors">
              <User className="w-5 h-5" />
            </Link>
            
            <Link href="/pricing" className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105">
              Subscribe
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-purple-500/20">
            <Link href="/" className="block text-gray-300 hover:text-white font-medium py-2">
              Home
            </Link>
            <Link href="/dashboard" className="block text-gray-300 hover:text-white font-medium py-2">
              🛡️ Dashboard
            </Link>
            <Link href="/features" className="block text-gray-300 hover:text-white font-medium py-2">
              Features
            </Link>
            <Link href="/pricing" className="block text-gray-300 hover:text-white font-medium py-2">
              Pricing
            </Link>
            <Link href="/documentation" className="block text-gray-300 hover:text-white font-medium py-2">
              Documentation
            </Link>
            <Link href="/about" className="block text-gray-300 hover:text-white font-medium py-2">
              About
            </Link>
            <div className="pt-4">
              <Link href="/pricing" className="block bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center px-4 py-2 rounded-lg font-semibold">
                Subscribe
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}