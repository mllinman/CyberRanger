import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Lock, CreditCard, User, MapPin } from 'lucide-react'
import { useCartStore } from '../lib/store'
import Header from '../components/Header'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  postalCode: string
  country: string
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  })
  
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [mounted, setMounted] = useState(false)
  
  const total = getTotal()
  const shipping = total > 100 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Create payment intent when component mounts
    if (items.length > 0 && mounted) {
      createPaymentIntent()
    } else if (mounted && items.length === 0) {
      router.push('/cart')
    }
  }, [items, mounted])

  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(finalTotal * 100), // Convert to cents
          currency: 'usd'
        })
      })
      
      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
    } catch (error) {
      toast.error('Failed to initialize payment')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements || !clientSecret) {
      return
    }

    setLoading(true)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setLoading(false)
      return
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
              country: formData.country
            }
          }
        }
      })

      if (error) {
        toast.error(error.message || 'Payment failed')
      } else if (paymentIntent?.status === 'succeeded') {
        toast.success('Payment successful!')
        clearCart()
        router.push('/order-success')
      }
    } catch (error) {
      toast.error('An error occurred during payment')
    } finally {
      setLoading(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
    },
  }

  if (!mounted) {
    return null
  }

  if (items.length === 0) {
    return null
  }

  return (
    <>
      <Head>
        <title>Checkout - CyberStore</title>
      </Head>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Secure Checkout</h1>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <User className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-semibold">Customer Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="card p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-semibold">Shipping Address</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="input-field"
                      />
                    </div>
                    
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="card p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                  </div>
                  
                  <div className="p-4 border border-gray-300 rounded-lg">
                    <CardElement options={cardElementOptions} />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="card p-6 sticky top-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t pt-2">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="btn-primary w-full mt-6 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {loading ? 'Processing...' : `Pay $${finalTotal.toFixed(2)}`}
                    </span>
                  </button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default function Checkout() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}