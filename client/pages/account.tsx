import { useState, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { User, Shield, CreditCard, Settings, CheckCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Account() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Fetch user profile data
    fetchProfile()
  }, [session, status])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUserProfile(data.user)
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    }
  }

  const getTierDetails = (tier: string) => {
    switch (tier) {
      case 'free':
        return {
          name: 'Free',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          scanLimit: '3 scans per day',
          features: ['Basic Wi-Fi Scanner', 'Community Support']
        }
      case 'indy':
        return {
          name: 'Indy',
          color: 'text-blue-400',
          bgColor: 'bg-blue-500/20',
          scanLimit: '50 scans per day',
          features: ['Advanced Wi-Fi Scanner', 'Bluetooth Discovery', 'API Access', 'Email Support']
        }
      case 'pro':
        return {
          name: 'Pro',
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20',
          scanLimit: 'Unlimited scans',
          features: ['All Indy features', 'Advanced Analysis', 'Priority Support', 'Full API Access']
        }
      default:
        return {
          name: 'Unknown',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          scanLimit: 'Unknown',
          features: []
        }
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect in useEffect
  }

  const tierInfo = getTierDetails(session.user?.subscriptionTier || 'free')

  return (
    <>
      <Head>
        <title>Account - CyberRecon Suite</title>
        <meta name="description" content="Manage your CyberRecon Suite account and subscription" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <div className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="mx-auto h-16 w-16 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <User className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Account Settings</h1>
              <p className="text-gray-400">Manage your profile and subscription</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user?.name || 'User'}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {session.user?.firstName ? 
                        `${session.user.firstName} ${session.user?.lastName}` : 
                        session.user?.name
                      }
                    </h2>
                    <p className="text-gray-400">{session.user?.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Account Type
                    </label>
                    <p className="text-white">{session.user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Member Since
                    </label>
                    <p className="text-white">
                      {userProfile?.createdAt ? 
                        new Date(userProfile.createdAt).toLocaleDateString() : 
                        'N/A'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscription Information */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Subscription</h2>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${tierInfo.bgColor} ${tierInfo.color}`}>
                        {tierInfo.name}
                      </span>
                      {session.user?.subscriptionStatus === 'active' && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Status
                    </label>
                    <p className="text-white capitalize">
                      {session.user?.subscriptionStatus || 'active'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Scan Limit
                    </label>
                    <p className="text-white">{tierInfo.scanLimit}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Included Features
                    </label>
                    <ul className="space-y-1">
                      {tierInfo.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {session.user?.subscriptionTier !== 'pro' && (
                    <div className="pt-4">
                      <Link 
                        href="/pricing"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Upgrade Plan</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Usage Stats (placeholder for future implementation) */}
            <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-6">Usage Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">0</div>
                  <div className="text-sm text-gray-400">Scans This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">0</div>
                  <div className="text-sm text-gray-400">Reports Generated</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">0</div>
                  <div className="text-sm text-gray-400">API Calls</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  )
}