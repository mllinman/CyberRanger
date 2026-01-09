'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Wifi, Bluetooth, Network, AlertTriangle, Activity, RefreshCw, Search } from 'lucide-react'
import { NetworkScansTable } from '@/components/dashboard/network-scans-table'
import { SecurityMetricsChart } from '@/components/dashboard/security-metrics-chart'
import { LiveActivityFeed } from '@/components/dashboard/live-activity-feed'

export default function DashboardPage() {
  const [isScanning, setIsScanning] = useState(false)

  const handleToggleScan = () => {
    setIsScanning(!isScanning)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="h-14 border-b border-border bg-card px-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Security Dashboard</h1>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search networks, devices..." 
              className="pl-8 h-9"
            />
          </div>
          <Button
            onClick={handleToggleScan}
            variant={isScanning ? "destructive" : "default"}
            className="gap-2"
          >
            {isScanning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Stop Scanning
              </>
            ) : (
              <>
                <Activity className="h-4 w-4" />
                Start Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Wi-Fi Networks
              </CardTitle>
              <Wifi className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                +3 from last scan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Bluetooth Devices
              </CardTitle>
              <Bluetooth className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                -2 from last scan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Network Hosts
              </CardTitle>
              <Network className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                +5 from last scan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Security Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Open networks detected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Network Scans Table (2/3 width) */}
          <div className="col-span-2">
            <NetworkScansTable />
          </div>

          {/* Live Activity Feed (1/3 width) */}
          <div>
            <LiveActivityFeed isScanning={isScanning} />
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6">
          <SecurityMetricsChart />
          
          <Card>
            <CardHeader>
              <CardTitle>Network Distribution</CardTitle>
              <CardDescription>
                Distribution by security type
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - will be implemented with Recharts
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-sm text-destructive">
              ⚖️ Authorized Use Only
            </CardTitle>
            <CardDescription className="text-xs">
              This tool is for authorized penetration testing only. 
              Scan only networks you own or have permission to test.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
