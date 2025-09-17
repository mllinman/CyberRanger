import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Check, Shield, Zap, Crown, AlertTriangle } from 'lucide-react'
import { useState } from 'react'

interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  yearlyPrice: number
  features: string[]
  limitations: string[]
  popular?: boolean
  icon: any
  stripePriceId: string
  stripeYearlyPriceId: string
}

const pricingTiers: PricingTier[] = [
  {
    id: 'basic',
    name: 'Security Researcher',
    description: 'Perfect for individual security researchers and ethical hackers',
    price: 29,
    yearlyPrice: 290,
    stripePriceId: 'price_basic_monthly',
    stripeYearlyPriceId: 'price_basic_yearly',
    icon: Shield,
    features: [
      'Wi-Fi Network Scanner',
      'Basic Bluetooth Discovery',
      'Network Topology Mapping',
      'Basic Vulnerability Scanning',
      'Community Support',
      'Documentation Access',
      'Legal Compliance Guidelines'
    ],
    limitations: [
      'Limited to 10 scans per day',
      'Basic reporting features',
      'Community support only'
    ]
  },
  {
    id: 'professional',
    name: 'Security Professional',
    description: 'Comprehensive tools for security professionals and consultants',
    price: 99,
    yearlyPrice: 990,
    stripePriceId: 'price_professional_monthly',
    stripeYearlyPriceId: 'price_professional_yearly',
    icon: Zap,
    popular: true,
    features: [
      'All Basic features',
      'Advanced Bluetooth Reconnaissance',
      'Deep Packet Analysis',
      'Advanced Vulnerability Assessment',
      'Custom Report Generation',
      'API Access',
      'Priority Email Support',
      'Training Resources',
      'Compliance Templates'
    ],
    limitations: [
      'Limited to 100 scans per day',
      'Email support only'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Security',
    description: 'Full-featured suite for security teams and organizations',
    price: 299,
    yearlyPrice: 2990,
    stripePriceId: 'price_enterprise_monthly',
    stripeYearlyPriceId: 'price_enterprise_yearly',
    icon: Crown,
    features: [
      'All Professional features',
      'Unlimited Scans',
      'Multi-user Team Management',
      'Advanced Analytics Dashboard',
      'Custom Integration Support',
      'White-label Reporting',
      'Dedicated Account Manager',
      '24/7 Phone & Email Support',
      'On-premise Deployment Option',
      'Custom Training Programs'
    ],
    limitations: []
  }
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)
  const [loading, setLoading] = useState('')

  const handleSubscribe = async (tier: PricingTier) => {
    setLoading(tier.id)
    
    try {
      const priceId = isYearly ? tier.stripeYearlyPriceId : tier.stripePriceId
      
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          successUrl: window.location.origin + '/subscription-success',
          cancelUrl: window.location.origin + '/pricing',
        }),
      })
      
      const { sessionUrl } = await response.json()
      window.location.href = sessionUrl
    } catch (error) {
      console.error('Error creating subscription:', error)
      alert('Failed to start subscription process. Please try again.')
    } finally {
      setLoading('')
    }
  }

  return (
    <>
      <Head>
        <title>Pricing - CyberRecon Suite</title>
        <meta name="description" content="Choose the perfect CyberRecon Suite plan for your security testing needs." />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-sm font-medium text-white mb-6">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Authorized Security Testing Only
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                Professional Security
                <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Subscription Plans
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Choose the perfect plan for your security research and penetration testing needs
              </p>
              
              {/* Billing Toggle */}
              <div className="flex items-center justify-center space-x-4">
                <span className={`font-medium ${!isYearly ? 'text-white' : 'text-gray-400'}`}>
                  Monthly
                </span>
                <button
                  onClick={() => setIsYearly(!isYearly)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isYearly ? 'bg-gradient-to-r from-purple-600 to-cyan-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isYearly ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`font-medium ${isYearly ? 'text-white' : 'text-gray-400'}`}>
                  Yearly
                  <span className="ml-2 text-sm bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    Save 17%
                  </span>
                </span>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {pricingTiers.map((tier) => {
                const IconComponent = tier.icon
                const currentPrice = isYearly ? tier.yearlyPrice : tier.price
                const billingPeriod = isYearly ? 'year' : 'month'
                
                return (
                  <div
                    key={tier.id}
                    className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border ${
                      tier.popular
                        ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20 scale-105'
                        : 'border-slate-600/50'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex p-3 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl mb-4">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                      <p className="text-gray-400 text-sm">{tier.description}</p>
                      
                      <div className="mt-6">
                        <div className="text-4xl font-black text-white">
                          ${currentPrice}
                          <span className="text-lg font-normal text-gray-400">/{billingPeriod}</span>
                        </div>
                        {isYearly && (
                          <div className="text-sm text-green-400">
                            Save ${(tier.price * 12) - tier.yearlyPrice}/year
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      <h4 className="font-semibold text-white">Included Features:</h4>
                      <ul className="space-y-3">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {tier.limitations.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-gray-400 text-sm mb-2">Limitations:</h4>
                          <ul className="space-y-2">
                            {tier.limitations.map((limitation, index) => (
                              <li key={index} className="text-gray-500 text-xs">
                                • {limitation}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    {/* CTA Button */}
                    <button
                      onClick={() => handleSubscribe(tier)}
                      disabled={loading === tier.id}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        tier.popular
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-purple-500/25'
                          : 'bg-slate-700 hover:bg-slate-600 text-white'
                      } ${loading === tier.id ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      {loading === tier.id ? 'Processing...' : 'Start Subscription'}
                    </button>
                  </div>
                )
              })}
            </div>
            
            {/* Legal Disclaimer */}
            <div className="max-w-4xl mx-auto p-8 bg-slate-700/30 rounded-2xl border border-red-500/20">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Legal Notice & Terms of Service</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>
                      By subscribing to CyberRecon Suite, you agree to use these tools exclusively for authorized penetration testing, 
                      security research, and network administration on systems you own or have explicit written permission to test.
                    </p>
                    <p>
                      <strong>Prohibited uses include:</strong> Unauthorized network scanning, illegal access attempts, 
                      malicious activities, or any use that violates local, state, or federal laws.
                    </p>
                    <p>
                      <strong>Subscription terms:</strong> All subscriptions automatically renew. You may cancel at any time. 
                      No refunds for partial periods. Fair use policy applies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}