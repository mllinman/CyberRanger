import express from 'express'
import Stripe from 'stripe'
import { authenticateToken } from '../middleware/auth'

interface AuthRequest extends express.Request {
  user?: any
}

const router = express.Router()

// Initialize Stripe only if the secret key is available
let stripe: Stripe | null = null
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16'
  })
}

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Payment service unavailable',
        message: 'Stripe is not configured'
      })
    }

    const { amount, currency = 'usd' } = req.body

    if (!amount || amount < 50) { // Minimum charge amount
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be at least $0.50'
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        source: 'cyberstore'
      }
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Payment intent creation failed:', error)
    res.status(500).json({
      error: 'Payment initialization failed',
      message: 'Unable to create payment intent'
    })
  }
})

// Confirm payment
router.post('/confirm-payment', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Payment service unavailable',
        message: 'Stripe is not configured'
      })
    }

    const { paymentIntentId } = req.body

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status === 'succeeded') {
      // Payment successful, you can process the order here
      res.json({
        success: true,
        paymentStatus: paymentIntent.status,
        amount: paymentIntent.amount
      })
    } else {
      res.status(400).json({
        error: 'Payment not completed',
        paymentStatus: paymentIntent.status
      })
    }
  } catch (error) {
    console.error('Payment confirmation failed:', error)
    res.status(500).json({
      error: 'Payment confirmation failed',
      message: 'Unable to confirm payment status'
    })
  }
})

// Webhook endpoint for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment service unavailable' })
  }

  const sig = req.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    return res.status(500).json({ error: 'Webhook secret not configured' })
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('Payment succeeded:', paymentIntent.id)
        // Handle successful payment
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent
        console.log('Payment failed:', failedPayment.id)
        // Handle failed payment
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(400).json({ error: 'Webhook signature verification failed' })
  }
})

// Get payment methods for a customer
router.get('/payment-methods', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Payment service unavailable'
      })
    }

    const customerId = req.body.customerId

    if (!customerId) {
      return res.status(400).json({
        error: 'Customer ID required'
      })
    }

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    })

    res.json({
      paymentMethods: paymentMethods.data
    })
  } catch (error) {
    console.error('Failed to fetch payment methods:', error)
    res.status(500).json({
      error: 'Failed to fetch payment methods'
    })
  }
})

// Create a refund
router.post('/refund', authenticateToken, async (req: AuthRequest, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Payment service unavailable'
      })
    }

    const { paymentIntentId, amount, reason = 'requested_by_customer' } = req.body

    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount,
      reason
    })

    res.json({
      success: true,
      refund: {
        id: refund.id,
        amount: refund.amount,
        status: refund.status
      }
    })
  } catch (error) {
    console.error('Refund creation failed:', error)
    res.status(500).json({
      error: 'Refund failed',
      message: 'Unable to process refund'
    })
  }
})

export default router