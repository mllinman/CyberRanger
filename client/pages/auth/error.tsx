import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query

  const getErrorMessage = (error: string | string[] | undefined) => {
    if (!error) return 'An unknown error occurred during authentication.'
    
    const errorStr = Array.isArray(error) ? error[0] : error
    
    switch (errorStr) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Please try again later.'
      case 'AccessDenied':
        return 'Access was denied. You may not have permission to sign in with this account.'
      case 'Verification':
        return 'The verification token has expired or has already been used.'
      case 'Default':
        return 'An error occurred during authentication. Please try again.'
      case 'Signin':
        return 'There was an error signing you in. Please try again.'
      case 'OAuthSignin':
        return 'Error occurred during OAuth sign in. Please try again.'
      case 'OAuthCallback':
        return 'Error in OAuth callback. Please try again.'
      case 'OAuthCreateAccount':
        return 'Could not create OAuth account. Please try again.'
      case 'EmailCreateAccount':
        return 'Could not create account with email. Please try again.'
      case 'Callback':
        return 'Error in authentication callback. Please try again.'
      case 'OAuthAccountNotLinked':
        return 'This email is already associated with another account. Please sign in with your original method.'
      case 'EmailSignin':
        return 'Error sending email. Please check your email address.'
      case 'CredentialsSignin':
        return 'Invalid email or password. Please check your credentials.'
      case 'SessionRequired':
        return 'You must be signed in to access this page.'
      default:
        return 'An unexpected error occurred during authentication.'
    }
  }

  return (
    <>
      <Head>
        <title>Authentication Error - CyberRecon Suite</title>
        <meta name="description" content="Authentication error occurred" />
      </Head>
      
      <div className="min-h-screen bg-slate-900">
        <Header />
        
        <div className="flex items-center justify-center py-24 px-4">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Authentication Error</h2>
              <p className="text-gray-400">Something went wrong during sign in</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">
                  {getErrorMessage(error)}
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/auth/signin"
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Try Again</span>
                </Link>

                <Link
                  href="/auth/register"
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block"
                >
                  Create New Account
                </Link>

                <Link
                  href="/"
                  className="w-full text-center text-gray-400 hover:text-white transition-colors block py-2"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  )
}