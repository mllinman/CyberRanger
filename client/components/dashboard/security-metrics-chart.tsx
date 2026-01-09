'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { time: '10:00', networks: 8, alerts: 1 },
  { time: '10:15', networks: 10, alerts: 2 },
  { time: '10:30', networks: 12, alerts: 3 },
  { time: '10:45', networks: 11, alerts: 2 },
  { time: '11:00', networks: 12, alerts: 3 },
  { time: '11:15', networks: 14, alerts: 4 },
]

export function SecurityMetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Activity Trend</CardTitle>
        <CardDescription>Networks and alerts over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="time" 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="networks" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Networks"
            />
            <Line 
              type="monotone" 
              dataKey="alerts" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="Alerts"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
