import Link from 'next/link'
import { Terminal, Shield, Zap, Eye, Wifi, Bluetooth } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-medium">
                <Terminal className="w-4 h-4 mr-2" />
                Professional Security Suite
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                CyberRecon
                <span className="block text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">Suite</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Professional penetration testing and network security analysis tools. 
                <span className="block mt-2 text-cyan-300">Authorized security research only.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="group btn-primary inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25">
                <Terminal className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Launch Live Dashboard</span>
              </Link>
              <Link href="/pricing" className="btn-secondary bg-transparent border-2 border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                View Pricing
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300">
                  <Wifi className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Wi-Fi Analysis</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                  <Bluetooth className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Bluetooth Recon</span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg group-hover:shadow-lg group-hover:shadow-pink-500/30 transition-all duration-300">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">Network Scanning</span>
              </div>
            </div>
          </div>

          {/* Interactive Terminal Visual */}
          <div className="relative">
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center mb-6 pb-4 border-b border-gray-600">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-gray-400 text-sm font-mono">CyberRecon Terminal</span>
                </div>
              </div>
              
              {/* Terminal Content */}
              <div className="space-y-3 font-mono text-sm">
                <div className="text-green-400">$ cyberrecon --scan wifi --interface wlan0</div>
                <div className="text-gray-400">Scanning wireless networks...</div>
                <div className="text-cyan-400">Found 12 networks | 3 WEP | 8 WPA2 | 1 Open</div>
                <div className="text-green-400">$ cyberrecon --bluetooth --discover</div>
                <div className="text-gray-400">Discovering Bluetooth devices...</div>
                <div className="text-purple-400">Found 5 devices | 2 phones | 1 laptop | 2 headphones</div>
                <div className="text-green-400">$ cyberrecon --network --topology</div>
                <div className="text-gray-400">Mapping network topology...</div>
                <div className="animate-pulse">
                  <span className="text-yellow-400">█</span>
                  <span className="text-gray-500"> Scanning in progress...</span>
                </div>
              </div>
            </div>
            
            {/* Floating Security Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce shadow-lg">
              ⚠️ Authorized Use Only
            </div>
            
            {/* Glowing orb effects */}
            <div className="absolute -z-10 top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}