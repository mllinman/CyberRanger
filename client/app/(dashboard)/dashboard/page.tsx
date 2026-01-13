'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Wifi, Bluetooth, Network, AlertTriangle, Activity, RefreshCw, Search, Shield, Bug, Code, Globe } from 'lucide-react'
import Link from 'next/link'
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
        {isScanning ? (
          <>
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
          </>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Wi-Fi Networks</CardTitle>
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Ready</div>
                  <p className="text-xs text-muted-foreground">Scanner initialized</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bluetooth Devices</CardTitle>
                  <Bluetooth className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Ready</div>
                  <p className="text-xs text-muted-foreground">Scanner initialized</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Hosts</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Ready</div>
                  <p className="text-xs text-muted-foreground">ARP/Ping active</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <Shield className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Secure</div>
                  <p className="text-xs text-muted-foreground">Monitoring active</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Real-time security events and scan results.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <p className="text-sm font-medium leading-none">System initialized</p>
                      <div className="ml-auto font-mono text-xs text-muted-foreground">Just now</div>
                    </div>
                    <div className="flex items-center">
                      <span className="flex h-2 w-2 mr-2 rounded-full bg-blue-500"></span>
                      <p className="text-sm font-medium leading-none">Scanner modules loaded</p>
                      <div className="ml-auto font-mono text-xs text-muted-foreground">1m ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Launch security tools.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/dashboard/network">
                    <Button className="w-full justify-start" variant="outline">
                      <Activity className="mr-2 h-4 w-4" />
                      Run Network Scan
                    </Button>
                  </Link>
                  <Link href="/dashboard/wifi">
                    <Button className="w-full justify-start" variant="outline">
                      <Wifi className="mr-2 h-4 w-4" />
                      Scan Wi-Fi
                    </Button>
                  </Link>
                  <Link href="/dashboard/bluetooth">
                    <Button className="w-full justify-start" variant="outline">
                      <Bluetooth className="mr-2 h-4 w-4" />
                      Scan Bluetooth
                    </Button>
                  </Link>
                  <Link href="/dashboard/recon">
                    <Button className="w-full justify-start" variant="outline">
                      <Globe className="mr-2 h-4 w-4" />
                      Reconnaissance
                    </Button>
                  </Link>
                  <Link href="/dashboard/exploit">
                    <Button className="w-full justify-start" variant="outline">
                      <Bug className="mr-2 h-4 w-4" />
                      Exploitation Tools
                    </Button>
                  </Link>
                  <Link href="/dashboard/payloads">
                    <Button className="w-full justify-start" variant="outline">
                      <Code className="mr-2 h-4 w-4" />
                      Payload Generator
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )}

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
