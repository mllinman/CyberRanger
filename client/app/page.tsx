import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Wifi, Bluetooth, Network, Activity } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">CyberRanger Pro</span>
          </div>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
          Professional Network Security Scanner
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Real-time network security scanning with live monitoring capabilities. 
          Authorized penetration testing and security research only.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="gap-2">
            <Activity className="h-5 w-5" />
            Launch Dashboard
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Wifi className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Wi-Fi Analysis</CardTitle>
              <CardDescription>
                Discover and analyze wireless networks with encryption detection and signal strength measurement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Bluetooth className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Bluetooth Discovery</CardTitle>
              <CardDescription>
                Identify Bluetooth-enabled devices with device type classification and proximity estimation
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Network className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Network Mapping</CardTitle>
              <CardDescription>
                Map network infrastructure with host discovery, port scanning, and OS fingerprinting
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">⚖️ Legal Notice & Authorized Use Only</CardTitle>
            <CardDescription className="text-destructive-foreground/80">
              This tool is designed for authorized penetration testing and security research only. 
              Users must only scan networks and systems they own or have explicit permission to test. 
              Unauthorized network scanning may violate local and federal laws.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 CyberRanger Pro. Made with ❤️ by the CyberRanger Security Community</p>
          <p className="mt-2">Empowering ethical hackers, one scan at a time</p>
        </div>
      </footer>
    </div>
  )
}
