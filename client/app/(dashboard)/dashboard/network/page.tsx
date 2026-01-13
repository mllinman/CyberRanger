'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Network, RefreshCw, Server, Activity } from 'lucide-react'
import { toast } from 'sonner'

type Host = {
    ip: string
    mac: string
    type: string
    status: string
}

export default function NetworkScanner() {
    const [scanning, setScanning] = useState(false)
    const [hosts, setHosts] = useState<Host[]>([])

    // Port scan state
    const [targetIP, setTargetIP] = useState('127.0.0.1')
    const [portScanning, setPortScanning] = useState(false)
    const [openPorts, setOpenPorts] = useState<any[]>([])

    const scanNetwork = async () => {
        setScanning(true)
        try {
            const res = await fetch('http://localhost:8000/api/scan/network')
            const data = await res.json()

            if (data.success) {
                setHosts(data.hosts)
                toast.success(`Found ${data.hosts.length} hosts`)
            } else {
                toast.error('Scan failed: ' + data.error)
            }
        } catch (e) {
            toast.error('Failed to connect to scanner service')
        } finally {
            setScanning(false)
        }
    }

    const scanPorts = async () => {
        setPortScanning(true)
        setOpenPorts([])
        try {
            const res = await fetch('http://localhost:8000/api/scan/ports', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target: targetIP, startPort: 1, endPort: 100 }) // Demo range
            })
            const data = await res.json()
            if (data.success) {
                setOpenPorts(data.results || [])
                toast.success(`Found ${data.openPorts} open ports`)
            } else {
                toast.error(data.error || 'Port scan failed')
            }
        } catch (e) {
            toast.error('Failed to connect')
        } finally {
            setPortScanning(false)
        }
    }

    return (
        <div className="p-6 space-y-8">
            {/* Network Discovery Section */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Network Scanner</h1>
                        <p className="text-muted-foreground">Discover devices on your local network (ARP/Ping).</p>
                    </div>
                    <Button onClick={scanNetwork} disabled={scanning}>
                        <RefreshCw className={`mr-2 h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
                        {scanning ? 'Scanning...' : 'Scan Network'}
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">IP Address</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">MAC Address</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Device Type</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {hosts.length === 0 && !scanning && (
                                        <tr>
                                            <td colSpan={4} className="p-4 text-center text-muted-foreground">No hosts found. Start a scan.</td>
                                        </tr>
                                    )}
                                    {hosts.map((host, i) => (
                                        <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">{host.ip}</td>
                                            <td className="p-4 align-middle font-mono text-xs">{host.mac}</td>
                                            <td className="p-4 align-middle">
                                                <span className="text-sm">{host.deviceType || host.type}</span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-500/15 text-green-500">
                                                    {host.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Port Scanner Section */}
            <section className="space-y-4 pt-8 border-t border-border">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Port Scanner</h2>
                    <p className="text-muted-foreground">Check for open ports on a specific target.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Target Configuration</CardTitle>
                        <CardDescription>Enter an IP address to scan for open ports (1-100).</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 items-end">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="target">Target IP</Label>
                                <Input
                                    type="text"
                                    id="target"
                                    value={targetIP}
                                    onChange={(e) => setTargetIP(e.target.value)}
                                    placeholder="127.0.0.1"
                                />
                            </div>
                            <Button onClick={scanPorts} disabled={portScanning}>
                                <Activity className={`mr-2 h-4 w-4 ${portScanning ? 'animate-spin' : ''}`} />
                                {portScanning ? 'Scanning Ports...' : 'Scan Ports'}
                            </Button>
                        </div>

                        {openPorts.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-medium mb-2">Open Ports Found: {openPorts.length}</h3>
                                <div className="space-y-2">
                                    {openPorts.map((result: any) => (
                                        <div key={result.port} className="flex items-center gap-3 bg-secondary px-4 py-3 rounded-md">
                                            <Server className="h-4 w-4 text-primary" />
                                            <div className="flex-1">
                                                <span className="font-mono font-semibold">Port {result.port}</span>
                                                <span className="mx-2 text-muted-foreground">•</span>
                                                <span className="text-sm">{result.service}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                                                    {result.status}
                                                </span>
                                                {result.responseTime && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {result.responseTime}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </section>
        </div>
    )
}
