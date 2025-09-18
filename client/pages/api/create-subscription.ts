import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { priceId, tier, successUrl, cancelUrl } = req.body

    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' })
    }

    // Create Stripe Checkout Session for subscription
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${req.headers.origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${req.headers.origin}/pricing`,
      automatic_tax: { enabled: true },
      customer_creation: 'always',
      metadata: {
        source: 'cyberrecon-suite',
        tier: tier || 'unknown'
      },
      subscription_data: {
        metadata: {
          source: 'cyberrecon-suite',
          plan: priceId,
          tier: tier || 'unknown'
        }
      }
    })

    res.json({ 
      sessionId: session.id,
      sessionUrl: session.url 
    })
  } catch (error: any) {
    console.error('Error creating subscription session:', error)
    res.status(500).json({ 
      error: 'Failed to create subscription session',
      message: error.message 
    })
  }
}