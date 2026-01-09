'use client'

import { AlertTriangle, Wifi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          {icon || <Wifi className="h-6 w-6 text-muted-foreground" />}
        </div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground text-center max-w-sm mb-4">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick}>{action.label}</Button>
        )}
      </CardContent>
    </Card>
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error
  reset?: () => void
}

export function ErrorState({ 
  title = 'Something went wrong',
  description = 'An error occurred while loading this content.',
  error,
  reset 
}: ErrorStateProps) {
  return (
    <Card className="border-destructive bg-destructive/5">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-5 w-5" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription className="text-destructive-foreground/80">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <pre className="text-xs bg-muted p-4 rounded overflow-x-auto">
            {error.message}
          </pre>
        )}
        {reset && (
          <Button variant="outline" onClick={reset}>
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
