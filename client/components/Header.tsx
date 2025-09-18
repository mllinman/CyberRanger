import { ShoppingCart, User, Search, Menu, X, Shield, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useCartStore } from '../lib/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const cartItems = useCartStore((state) => state.items)
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

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
            {session && (
              <Link href="/dashboard" className="text-gray-300 hover:text-white font-medium transition-colors hover:bg-purple-600/20 px-3 py-2 rounded-lg">
                🛡️ Dashboard
              </Link>
            )}
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
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-purple-600/20 transition-colors"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user?.name || 'User'}
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="hidden sm:block text-sm font-medium">
                    {session.user?.firstName || session.user?.name}
                  </span>
                  {session.user?.subscriptionTier && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      session.user.subscriptionTier === 'free' 
                        ? 'bg-gray-500/20 text-gray-400'
                        : session.user.subscriptionTier === 'indy'
                        ? 'bg-blue-500/20 text-blue-400'  
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {session.user.subscriptionTier.toUpperCase()}
                    </span>
                  )}
                </button>
                
                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 py-2">
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/account" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      Account Settings
                    </Link>
                    <Link 
                      href="/pricing" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      Subscription
                    </Link>
                    <hr className="my-2 border-slate-600" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-purple-600/20 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  href="/pricing" 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}

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
            {session && (
              <Link href="/dashboard" className="block text-gray-300 hover:text-white font-medium py-2">
                🛡️ Dashboard
              </Link>
            )}
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
            
            {/* Mobile Auth Actions */}
            <div className="pt-4 space-y-2">
              {session ? (
                <>
                  <div className="text-gray-300 text-sm">
                    Signed in as {session.user?.firstName || session.user?.name}
                    {session.user?.subscriptionTier && (
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        session.user.subscriptionTier === 'free' 
                          ? 'bg-gray-500/20 text-gray-400'
                          : session.user.subscriptionTier === 'indy'
                          ? 'bg-blue-500/20 text-blue-400'  
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {session.user.subscriptionTier.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <Link href="/account" className="block text-gray-300 hover:text-white py-2">
                    Account Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-gray-300 hover:text-white py-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="block bg-slate-700 hover:bg-slate-600 text-white text-center px-4 py-2 rounded-lg font-medium">
                    Sign In
                  </Link>
                  <Link href="/pricing" className="block bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-center px-4 py-2 rounded-lg font-semibold">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}