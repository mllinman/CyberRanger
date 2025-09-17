import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { session_id } = req.query

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'Session ID is required' })
  }

  try {
    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription', 'customer']
    })

    if (!session.subscription) {
      return res.status(400).json({ error: 'No subscription found for this session' })
    }

    const subscription = session.subscription as Stripe.Subscription
    const customer = session.customer as Stripe.Customer

    // Get price details
    const priceId = subscription.items.data[0].price.id
    const price = await stripe.prices.retrieve(priceId, {
      expand: ['product']
    })

    const product = price.product as Stripe.Product

    const subscriptionDetails = {
      planName: product.name,
      amount: price.unit_amount ? price.unit_amount / 100 : 0,
      currency: price.currency,
      interval: price.recurring?.interval || 'month',
      customerEmail: customer.email,
      subscriptionId: subscription.id,
      status: subscription.status
    }

    res.json(subscriptionDetails)
  } catch (error: any) {
    console.error('Error retrieving subscription details:', error)
    res.status(500).json({ 
      error: 'Failed to retrieve subscription details',
      message: error.message 
    })
  }
}