import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      firstName?: string
      lastName?: string
      role?: string
      subscriptionTier?: string
      subscriptionStatus?: string
      image?: string
    }
    accessToken?: string
  }

  interface User {
    id: string
    email: string
    name?: string
    firstName?: string
    lastName?: string
    role?: string
    subscriptionTier?: string
    subscriptionStatus?: string
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string
    role?: string
    subscriptionTier?: string
    subscriptionStatus?: string
    firstName?: string
    lastName?: string
    accessToken?: string
  }
}