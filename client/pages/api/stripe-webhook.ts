import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { buffer } from 'micro'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export const config = {
  api: {
    bodyParser: false,
  },
}

// Helper function to map Stripe price IDs to tiers
const getPriceTier = (priceId: string): string => {
  // This mapping should match your actual Stripe price IDs
  const priceToTierMap: { [key: string]: string } = {
    'price_indy_monthly': 'indy',
    'price_indy_yearly': 'indy',
    'price_pro_monthly': 'pro',
    'price_pro_yearly': 'pro',
  }
  
  return priceToTierMap[priceId] || 'free'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buf = await buffer(req)
  const sig = req.headers['stripe-signature'] as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return res.status(500).json({ error: 'Webhook secret not configured' })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: 'Webhook signature verification failed' })
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleSubscriptionUpdate(event.data.object as Stripe.Subscription)
      break
    
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
      break
    
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
      break
    
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object as Stripe.Invoice)
      break
    
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.status(200).json({ received: true })
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  try {
    // This is a simplified implementation
    // In a real app, you'd need to connect this to your User model
    const customerId = subscription.customer as string
    const subscriptionId = subscription.id
    const status = subscription.status
    
    // Get the price ID to determine tier
    const priceId = subscription.items.data[0]?.price.id
    const tier = priceId ? getPriceTier(priceId) : 'free'
    
    console.log('Subscription updated:', {
      customerId,
      subscriptionId,
      status,
      tier
    })

    // TODO: Update user in database
    // const user = await User.findOneAndUpdate(
    //   { stripeCustomerId: customerId },
    //   {
    //     stripeSubscriptionId: subscriptionId,
    //     subscriptionTier: tier,
    //     subscriptionStatus: mapStripeStatusToOurStatus(status),
    //     subscriptionStartDate: new Date(subscription.created * 1000),
    //     subscriptionEndDate: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : undefined
    //   }
    // )

  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    const customerId = subscription.customer as string
    
    console.log('Subscription deleted:', {
      customerId,
      subscriptionId: subscription.id
    })

    // TODO: Update user to free tier
    // const user = await User.findOneAndUpdate(
    //   { stripeCustomerId: customerId },
    //   {
    //     stripeSubscriptionId: null,
    //     subscriptionTier: 'free',
    //     subscriptionStatus: 'cancelled',
    //     subscriptionEndDate: new Date(subscription.canceled_at! * 1000)
    //   }
    // )

  } catch (error) {
    console.error('Error handling subscription deletion:', error)
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    
    console.log('Payment succeeded:', {
      customerId,
      invoiceId: invoice.id,
      amount: invoice.amount_paid
    })

    // TODO: Update user subscription status to active
    // const user = await User.findOneAndUpdate(
    //   { stripeCustomerId: customerId },
    //   { subscriptionStatus: 'active' }
    // )

  } catch (error) {
    console.error('Error handling payment success:', error)
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string
    
    console.log('Payment failed:', {
      customerId,
      invoiceId: invoice.id,
      amount: invoice.amount_due
    })

    // TODO: Update user subscription status to past_due
    // const user = await User.findOneAndUpdate(
    //   { stripeCustomerId: customerId },
    //   { subscriptionStatus: 'past_due' }
    // )

  } catch (error) {
    console.error('Error handling payment failure:', error)
  }
}

function mapStripeStatusToOurStatus(stripeStatus: string): string {
  const statusMap: { [key: string]: string } = {
    'active': 'active',
    'canceled': 'cancelled',
    'incomplete': 'inactive',
    'incomplete_expired': 'cancelled',
    'past_due': 'past_due',
    'trialing': 'active',
    'unpaid': 'past_due'
  }
  
  return statusMap[stripeStatus] || 'inactive'
}