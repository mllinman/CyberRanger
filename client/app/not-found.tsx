import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <Shield className="h-16 w-16 text-muted-foreground mx-auto" />
        <div>
          <h1 className="text-4xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button variant="outline">Go Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
