'use client'

import { useEffect } from 'react'
import { ErrorState } from '@/components/dashboard/empty-state'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Dashboard error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center h-full p-6">
      <div className="max-w-2xl w-full">
        <ErrorState 
          title="Dashboard Error"
          description="Failed to load the dashboard. Please try again."
          error={error}
          reset={reset}
        />
      </div>
    </div>
  )
}
