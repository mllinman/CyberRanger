import { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency = 'usd' } = req.body

    if (!amount || amount < 50) {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be at least $0.50'
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        source: 'cyberstore-nextjs'
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
}