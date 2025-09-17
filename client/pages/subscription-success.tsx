import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { CheckCircle, Shield, Download, Book, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

interface SubscriptionDetails {
  planName: string
  amount: number
  currency: string
  interval: string
  customerEmail: string
  subscriptionId: string
}

export default function SubscriptionSuccess() {
  const router = useRouter()
  const { session_id } = router.query
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (session_id) {
      fetchSubscriptionDetails()
    }
  }, [session_id])

  const fetchSubscriptionDetails = async () => {
    try {
      const response = await fetch(`/api/subscription-details?session_id=${session_id}`)
      const data = await response.json()
      
      if (response.ok) {
        setSubscriptionDetails(data)
      } else {
        setError(data.error || 'Failed to fetch subscription details')
      }
    } catch (err) {
      setError('Failed to load subscription details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading subscription details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Header />
        <main className="py-24">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Subscription Error</h1>
              <p className="text-gray-400 mb-6">{error}</p>
              <Link href="/pricing" className="btn-primary bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold">
                Back to Pricing
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Subscription Successful - CyberRecon Suite</title>
        <meta name="description" content="Your CyberRecon Suite subscription has been activated successfully." />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <main className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Success Header */}
            <div className="text-center mb-12">
              <div className="inline-flex p-4 bg-green-500/20 rounded-full mb-6">
                <CheckCircle className="w-16 h-16 text-green-400" />
              </div>
              
              <h1 className="text-4xl font-black text-white mb-4">
                Subscription Activated!
              </h1>
              
              <p className="text-xl text-gray-400">
                Welcome to CyberRecon Suite. Your security testing tools are now active.
              </p>
            </div>

            {/* Subscription Details */}
            {subscriptionDetails && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-purple-400" />
                  Subscription Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Plan</h3>
                    <p className="text-lg font-semibold text-white">{subscriptionDetails.planName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Amount</h3>
                    <p className="text-lg font-semibold text-white">
                      ${subscriptionDetails.amount} {subscriptionDetails.currency.toUpperCase()}/{subscriptionDetails.interval}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Email</h3>
                    <p className="text-lg text-gray-300">{subscriptionDetails.customerEmail}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">Subscription ID</h3>
                    <p className="text-sm font-mono text-gray-400 bg-slate-700 px-3 py-1 rounded">
                      {subscriptionDetails.subscriptionId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 text-center">
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl mb-4">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Download Tools</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Access your CyberRecon Suite tools and get started with security testing.
                </p>
                <Link href="/dashboard" className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-purple-700 hover:to-cyan-700 transition-colors">
                  Go to Dashboard
                </Link>
              </div>
              
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 text-center">
                <div className="inline-flex p-3 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl mb-4">
                  <Book className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Read Documentation</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Learn how to use CyberRecon Suite effectively and ethically.
                </p>
                <Link href="/documentation" className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  View Docs
                </Link>
              </div>
              
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-600/30 text-center">
                <div className="inline-flex p-3 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl mb-4">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Legal Guidelines</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Review ethical hacking guidelines and legal compliance requirements.
                </p>
                <Link href="/legal" className="inline-block bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                  Legal Info
                </Link>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-slate-700/30 rounded-2xl p-8 border border-orange-500/20">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <AlertTriangle className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Important: Ethical Use Reminder</h3>
                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>
                      Your subscription grants you access to powerful security testing tools. Please ensure you:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Only test networks and systems you own or have explicit permission to test</li>
                      <li>Follow all applicable laws and regulations in your jurisdiction</li>
                      <li>Respect privacy and confidentiality requirements</li>
                      <li>Report vulnerabilities responsibly through proper channels</li>
                    </ul>
                    <p className="mt-4 font-medium">
                      Violation of these guidelines may result in immediate account termination and legal consequences.
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