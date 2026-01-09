'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from 'lucide-react'

interface ActivityItem {
  id: string
  message: string
  timestamp: Date
  type: 'scan' | 'alert' | 'info'
}

export function LiveActivityFeed({ isScanning }: { isScanning: boolean }) {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      message: 'System initialized',
      timestamp: new Date(),
      type: 'info',
    },
  ])

  useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      const messages = [
        'Wi-Fi scan completed: 12 networks found',
        'Bluetooth scan completed: 8 devices found',
        'Network scan in progress...',
        'New device detected: iPhone 13',
        'Security alert: Open network detected',
      ]

      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        message: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date(),
        type: Math.random() > 0.7 ? 'alert' : 'scan',
      }

      setActivities((prev) => [newActivity, ...prev].slice(0, 20))
    }, 3000)

    return () => clearInterval(interval)
  }, [isScanning])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Live Activity
          {isScanning && (
            <span className="ml-auto h-2 w-2 rounded-full bg-success animate-pulse" />
          )}
        </CardTitle>
        <CardDescription>Real-time scanning events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No activity yet. Start scanning to see events.
            </div>
          ) : (
            activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 text-sm border-l-2 border-border pl-3 py-1"
              >
                <div className="flex-1 space-y-1">
                  <p className={activity.type === 'alert' ? 'text-destructive' : ''}>
                    {activity.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
