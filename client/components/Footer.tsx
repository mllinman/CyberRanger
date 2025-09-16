import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CS</span>
              </div>
              <span className="text-xl font-bold text-white">CyberStore</span>
            </div>
            <p className="text-gray-400">
              Your trusted destination for premium products with secure payments and exceptional service.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary-400">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary-400">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/products" className="block hover:text-primary-400">Products</Link>
              <Link href="/categories" className="block hover:text-primary-400">Categories</Link>
              <Link href="/deals" className="block hover:text-primary-400">Special Deals</Link>
              <Link href="/about" className="block hover:text-primary-400">About Us</Link>
              <Link href="/contact" className="block hover:text-primary-400">Contact</Link>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/help" className="block hover:text-primary-400">Help Center</Link>
              <Link href="/shipping" className="block hover:text-primary-400">Shipping Info</Link>
              <Link href="/returns" className="block hover:text-primary-400">Returns</Link>
              <Link href="/size-guide" className="block hover:text-primary-400">Size Guide</Link>
              <Link href="/track-order" className="block hover:text-primary-400">Track Order</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span>support@cyberstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span>1-800-CYBER-STORE</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span>123 Tech Street, Digital City</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                />
                <button className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-r-md text-white font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2023 CyberStore. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-primary-400">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary-400">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}