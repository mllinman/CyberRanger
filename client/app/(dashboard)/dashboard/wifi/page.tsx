'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wifi, RefreshCw, Lock, Unlock, Signal } from 'lucide-react'
import { toast } from 'sonner'

type Network = {
    ssid: string
    bssid: string[]
    signal: string
    security?: string
}

export default function WifiScanner() {
    const [scanning, setScanning] = useState(false)
    const [networks, setNetworks] = useState<Network[]>([])

    const scanWifi = async () => {
        setScanning(true)
        try {
            // In production, valid URL would be needed. Assuming proxy or direct call.
            // Since it's a "local" scan tool, we assume Next.js rewrites or same host.
            // But Next.js app is on 3000, server on 8000.
            const res = await fetch('http://localhost:8000/api/scan/wifi')
            const data = await res.json()

            if (data.success) {
                setNetworks(data.networks)
                toast.success(`Found ${data.networks.length} networks`)
            } else {
                toast.error('Scan failed: ' + data.error)
            }
        } catch (e) {
            toast.error('Failed to connect to scanner service')
        } finally {
            setScanning(false)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Wi-Fi Scanner</h1>
                    <p className="text-muted-foreground">Detect and analyze wireless networks in range.</p>
                </div>
                <Button onClick={scanWifi} disabled={scanning}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
                    {scanning ? 'Scanning...' : 'Start Scan'}
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {networks.map((net, i) => (
                    <Card key={i + net.ssid}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {net.ssid || 'Hidden Network'}
                            </CardTitle>
                            <Wifi className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{net.signal}</div>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground gap-2">
                                {net.security ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                                {net.security || 'Open'}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {networks.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">SSID</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Signal</th>
                                        <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Security</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {networks.map((net, i) => (
                                        <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">{net.ssid}</td>
                                            <td className="p-4 align-middle">{net.signal}</td>
                                            <td className="p-4 align-middle">{net.security}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
