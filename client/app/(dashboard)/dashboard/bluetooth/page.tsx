'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bluetooth, RefreshCw, Smartphone } from 'lucide-react'
import { toast } from 'sonner'

type Device = {
    name: string
    address: string
    rssi: number
    type: string
}

export default function BluetoothScanner() {
    const [scanning, setScanning] = useState(false)
    const [devices, setDevices] = useState<Device[]>([])

    const scanBluetooth = async () => {
        setScanning(true)
        try {
            const res = await fetch('http://localhost:8000/api/scan/bluetooth')
            const data = await res.json()

            if (data.success) {
                setDevices(data.devices)
                toast.success(`Found ${data.devices.length} devices`)
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
                    <h1 className="text-3xl font-bold tracking-tight">Bluetooth Scanner</h1>
                    <p className="text-muted-foreground">Discover Bluetooth Low Energy and Classic devices.</p>
                </div>
                <Button onClick={scanBluetooth} disabled={scanning}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${scanning ? 'animate-spin' : ''}`} />
                    {scanning ? 'Scanning...' : 'Start Scan'}
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {devices.map((dev, i) => (
                    <Card key={i + dev.address}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {dev.name || 'Unknown Device'}
                            </CardTitle>
                            <Bluetooth className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{dev.rssi} dBm</div>
                            <p className="text-xs text-muted-foreground mt-1">{dev.address}</p>
                            <div className="mt-2 text-xs badge bg-secondary text-secondary-foreground px-2 py-1 rounded inline-block">
                                {dev.type}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
