import { useState, useEffect, useRef } from 'react'
import { Wifi, Bluetooth, Network, Shield, Terminal, Activity, AlertTriangle, CheckCircle, RefreshCw, Eye } from 'lucide-react'

interface ScanResult {
  timestamp: string
  type: 'wifi' | 'bluetooth' | 'network'
  data: any
}

interface WifiNetwork {
  ssid: string
  bssid: string
  security: string
  signal: number
  channel: number
  frequency: string
}

interface BluetoothDevice {
  name: string
  address: string
  deviceClass: string
  rssi: string
}

interface NetworkHost {
  ip: string
  hostname: string
  mac: string
  openPorts: string[]
  os: string
  status: string
}

export default function RealTimeDashboard() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResults, setScanResults] = useState<ScanResult[]>([])
  const [wifiNetworks, setWifiNetworks] = useState<WifiNetwork[]>([])
  const [bluetoothDevices, setBluetoothDevices] = useState<BluetoothDevice[]>([])
  const [networkHosts, setNetworkHosts] = useState<NetworkHost[]>([])
  const [lastScan, setLastScan] = useState<Date | null>(null)
  const [alertCount, setAlertCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simulated real-time scanning
  useEffect(() => {
    if (isScanning) {
      // Start continuous scanning
      performScan()
      intervalRef.current = setInterval(() => {
        performScan()
      }, 5000) // Scan every 5 seconds
    } else {
      // Stop scanning
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isScanning])

  const performScan = async () => {
    try {
      // In a real implementation, this would call actual scanning APIs
      // For now, simulate real-time scanning results with varying data
      
      // Simulate Wi-Fi scan
      const wifiData = generateWifiData()
      setWifiNetworks(wifiData)
      
      // Simulate Bluetooth scan  
      const bluetoothData = generateBluetoothData()
      setBluetoothDevices(bluetoothData)
      
      // Simulate Network scan
      const networkData = generateNetworkData()
      setNetworkHosts(networkData)
      
      // Add scan result to history
      const result: ScanResult = {
        timestamp: new Date().toISOString(),
        type: 'wifi',
        data: { 
          wifi: wifiData.length, 
          bluetooth: bluetoothData.length, 
          network: networkData.length 
        }
      }
      
      setScanResults(prev => [result, ...prev.slice(0, 49)]) // Keep last 50 results
      setLastScan(new Date())
      
      // Count security alerts
      const alerts = wifiData.filter(network => 
        network.security === 'Open' || network.security === 'WEP'
      ).length
      setAlertCount(alerts)
      
    } catch (error) {
      console.error('Scan error:', error)
    }
  }

  const generateWifiData = (): WifiNetwork[] => {
    const networks = [
      { ssid: 'MyWiFi_5G', bssid: '00:1A:2B:3C:4D:5E', security: 'WPA2', signal: -45, channel: 36, frequency: '5.180 GHz' },
      { ssid: 'Office_Network', bssid: 'AA:BB:CC:DD:EE:FF', security: 'WPA3', signal: -52, channel: 6, frequency: '2.437 GHz' },
      { ssid: 'Guest_WiFi', bssid: '11:22:33:44:55:66', security: 'Open', signal: -67, channel: 11, frequency: '2.462 GHz' },
      { ssid: 'NETGEAR_2.4G', bssid: '99:88:77:66:55:44', security: 'WPA2', signal: -58, channel: 1, frequency: '2.412 GHz' },
      { ssid: 'TP-Link_5G', bssid: 'BB:CC:DD:EE:FF:00', security: 'WPA3', signal: -61, channel: 149, frequency: '5.745 GHz' },
    ]
    
    // Add some randomization to signal strength to simulate real-time changes
    return networks.map(network => ({
      ...network,
      signal: network.signal + Math.floor(Math.random() * 10 - 5)
    })).filter(() => Math.random() > 0.2) // Sometimes networks disappear/reappear
  }

  const generateBluetoothData = (): BluetoothDevice[] => {
    const devices = [
      { name: 'iPhone 13', address: '12:34:56:78:90:AB', deviceClass: 'Phone', rssi: '-65 dBm' },
      { name: 'Wireless Mouse', address: 'CD:EF:01:23:45:67', deviceClass: 'Input Device', rssi: '-45 dBm' },
      { name: 'AirPods Pro', address: 'AB:CD:EF:12:34:56', deviceClass: 'Audio', rssi: '-58 dBm' },
      { name: 'Smart Watch', address: '12:AB:CD:34:56:EF', deviceClass: 'Wearable', rssi: '-72 dBm' },
    ]
    
    return devices.filter(() => Math.random() > 0.3) // Devices come and go
  }

  const generateNetworkData = (): NetworkHost[] => {
    const hosts = [
      { ip: '192.168.1.1', hostname: 'router.local', mac: 'AA:BB:CC:DD:EE:FF', openPorts: ['80', '443', '22'], os: 'Linux', status: 'Up' },
      { ip: '192.168.1.100', hostname: 'desktop-pc', mac: '11:22:33:44:55:66', openPorts: ['22', '3389'], os: 'Windows', status: 'Up' },
      { ip: '192.168.1.101', hostname: 'laptop', mac: '99:88:77:66:55:44', openPorts: ['22', '80'], os: 'Linux', status: 'Up' },
      { ip: '192.168.1.150', hostname: 'printer', mac: 'AA:CC:EE:11:33:55', openPorts: ['631', '80'], os: 'Embedded', status: 'Up' },
      { ip: '192.168.1.200', hostname: 'nas-server', mac: 'DD:EE:FF:00:11:22', openPorts: ['22', '80', '443', '445'], os: 'Linux', status: 'Up' },
    ]
    
    return hosts.filter(() => Math.random() > 0.1) // Most hosts stay online
  }

  const toggleScanning = () => {
    setIsScanning(!isScanning)
  }

  const clearResults = () => {
    setScanResults([])
    setWifiNetworks([])
    setBluetoothDevices([])
    setNetworkHosts([])
    setLastScan(null)
    setAlertCount(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🛡️ CyberRanger Pro - Real-Time Dashboard
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            Professional network security scanning with live monitoring capabilities
          </p>
          
          {/* Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={toggleScanning}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isScanning 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Stop Scanning</span>
                </>
              ) : (
                <>
                  <Activity className="w-5 h-5" />
                  <span>Start Live Scan</span>
                </>
              )}
            </button>
            
            <button
              onClick={clearResults}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300"
            >
              <Terminal className="w-5 h-5" />
              <span>Clear Results</span>
            </button>
          </div>

          {/* Status */}
          {lastScan && (
            <div className="text-sm text-gray-400 mb-6">
              Last scan: {lastScan.toLocaleTimeString()} | 
              Status: {isScanning ? '🟢 Active' : '🔴 Stopped'}
            </div>
          )}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Wi-Fi Networks"
            value={wifiNetworks.length}
            icon={<Wifi className="w-8 h-8" />}
            color="text-blue-400"
            bgColor="bg-blue-500/20"
            borderColor="border-blue-500/30"
          />
          <MetricCard
            title="Bluetooth Devices"
            value={bluetoothDevices.length}
            icon={<Bluetooth className="w-8 h-8" />}
            color="text-purple-400"
            bgColor="bg-purple-500/20"
            borderColor="border-purple-500/30"
          />
          <MetricCard
            title="Network Hosts"
            value={networkHosts.length}
            icon={<Network className="w-8 h-8" />}
            color="text-green-400"
            bgColor="bg-green-500/20"
            borderColor="border-green-500/30"
          />
          <MetricCard
            title="Security Alerts"
            value={alertCount}
            icon={alertCount > 0 ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
            color={alertCount > 0 ? "text-red-400" : "text-green-400"}
            bgColor={alertCount > 0 ? "bg-red-500/20" : "bg-green-500/20"}
            borderColor={alertCount > 0 ? "border-red-500/30" : "border-green-500/30"}
          />
        </div>

        {/* Data Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Wi-Fi Networks */}
          <DataTable
            title="📡 Wi-Fi Networks"
            headers={['SSID', 'Security', 'Signal']}
            data={wifiNetworks.map(network => ({
              id: network.bssid,
              cells: [network.ssid, network.security, `${network.signal} dBm`],
              alert: network.security === 'Open' || network.security === 'WEP'
            }))}
          />

          {/* Bluetooth Devices */}
          <DataTable
            title="📱 Bluetooth Devices"
            headers={['Device', 'Type', 'Signal']}
            data={bluetoothDevices.map(device => ({
              id: device.address,
              cells: [device.name, device.deviceClass, device.rssi],
              alert: false
            }))}
          />

          {/* Network Hosts */}
          <DataTable
            title="🌐 Network Hosts"
            headers={['IP Address', 'Hostname', 'Ports']}
            data={networkHosts.map(host => ({
              id: host.ip,
              cells: [host.ip, host.hostname, host.openPorts.slice(0, 2).join(', ')],
              alert: host.openPorts.length > 3
            }))}
          />
        </div>

        {/* Real-time Activity Log */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Terminal className="w-6 h-6 text-cyan-400" />
            <span>Live Scanning Activity</span>
            {isScanning && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
          </h3>
          
          <div className="max-h-60 overflow-y-auto space-y-2">
            {scanResults.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                No scan results yet. Click "Start Live Scan" to begin monitoring.
              </div>
            ) : (
              scanResults.map((result, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <span className="text-gray-500">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-cyan-400">•</span>
                  <span>
                    Scan completed: {result.data.wifi} Wi-Fi, {result.data.bluetooth} Bluetooth, {result.data.network} hosts
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Legal Notice */}
        <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-400 mb-2">⚖️ Legal Notice & Authorized Use Only</h3>
              <p className="text-red-300 text-sm">
                This tool is designed for authorized penetration testing and security research only. 
                Users must only scan networks and systems they own or have explicit permission to test. 
                Unauthorized network scanning may violate local and federal laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
}

function MetricCard({ title, value, icon, color, bgColor, borderColor }: MetricCardProps) {
  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105`}>
      <div className={`${color} mb-3 flex justify-center`}>
        {icon}
      </div>
      <div className="text-3xl font-black text-white mb-2">{value}</div>
      <div className="text-gray-300 text-sm font-medium">{title}</div>
    </div>
  )
}

interface DataTableProps {
  title: string
  headers: string[]
  data: Array<{
    id: string
    cells: string[]
    alert: boolean
  }>
}

function DataTable({ title, headers, data }: DataTableProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-purple-500/20 p-6">
      <h3 className="text-lg font-bold mb-4 text-white">{title}</h3>
      
      <div className="overflow-hidden rounded-lg border border-slate-600">
        <table className="w-full">
          <thead className="bg-slate-700">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="text-left p-3 text-sm font-semibold text-gray-300">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="p-6 text-center text-gray-400">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-slate-700/50 transition-colors ${
                    row.alert ? 'bg-red-500/10 border-l-4 border-red-500' : ''
                  }`}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-3 text-sm text-gray-300">
                      {cell}
                      {cellIndex === 0 && row.alert && (
                        <AlertTriangle className="w-4 h-4 text-red-400 inline ml-2" />
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}