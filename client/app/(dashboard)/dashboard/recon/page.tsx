'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Globe, Shield, Server, Activity, Eye } from 'lucide-react'
import { toast } from 'sonner'

export default function ReconPage() {
    const [loading, setLoading] = useState(false)
    
    // DNS Enumeration
    const [dnsDomain, setDnsDomain] = useState('')
    const [dnsResults, setDnsResults] = useState<any>(null)

    // Subdomain Discovery
    const [subDomain, setSubDomain] = useState('')
    const [subdomains, setSubdomains] = useState<any[]>([])

    // HTTP Header Analysis
    const [headerUrl, setHeaderUrl] = useState('')
    const [headerResults, setHeaderResults] = useState<any>(null)

    // Tech Stack Detection
    const [techUrl, setTechUrl] = useState('')
    const [technologies, setTechnologies] = useState<any[]>([])

    const runDnsEnum = async () => {
        if (!dnsDomain) {
            toast.error('Please enter a domain')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/recon/dns-enum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: dnsDomain })
            })
            const data = await res.json()
            if (data.success) {
                setDnsResults(data)
                toast.success('DNS enumeration complete')
            } else {
                toast.error(data.error || 'DNS enumeration failed')
            }
        } catch (e) {
            toast.error('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const runSubdomainDiscovery = async () => {
        if (!subDomain) {
            toast.error('Please enter a domain')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/recon/subdomain-discovery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain: subDomain })
            })
            const data = await res.json()
            if (data.success) {
                setSubdomains(data.subdomains || [])
                toast.success(`Found ${data.discovered} subdomains`)
            } else {
                toast.error(data.error || 'Subdomain discovery failed')
            }
        } catch (e) {
            toast.error('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const runHttpHeaderAnalysis = async () => {
        if (!headerUrl) {
            toast.error('Please enter a URL')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/recon/http-headers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: headerUrl })
            })
            const data = await res.json()
            if (data.success) {
                setHeaderResults(data.analysis)
                toast.success('Header analysis complete')
            } else {
                toast.error(data.error || 'Header analysis failed')
            }
        } catch (e) {
            toast.error('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const runTechStackDetection = async () => {
        if (!techUrl) {
            toast.error('Please enter a URL')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/recon/tech-stack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: techUrl })
            })
            const data = await res.json()
            if (data.success) {
                setTechnologies(data.detected || [])
                toast.success(`Detected ${data.detected.length} technologies`)
            } else {
                toast.error(data.error || 'Tech detection failed')
            }
        } catch (e) {
            toast.error('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reconnaissance Tools</h1>
                    <p className="text-muted-foreground">Advanced information gathering and target analysis</p>
                </div>
                <Shield className="h-12 w-12 text-primary" />
            </div>

            <Tabs defaultValue="dns" className="space-y-4">
                <TabsList className="grid grid-cols-4 w-full max-w-3xl">
                    <TabsTrigger value="dns">DNS Enum</TabsTrigger>
                    <TabsTrigger value="subdomains">Subdomains</TabsTrigger>
                    <TabsTrigger value="headers">HTTP Headers</TabsTrigger>
                    <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                </TabsList>

                {/* DNS Enumeration */}
                <TabsContent value="dns" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Globe className="h-5 w-5" />
                                DNS Enumeration
                            </CardTitle>
                            <CardDescription>
                                Enumerate DNS records for a target domain (A, AAAA, MX, TXT, NS, CNAME)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="dns-domain">Target Domain</Label>
                                    <Input
                                        id="dns-domain"
                                        placeholder="example.com"
                                        value={dnsDomain}
                                        onChange={(e) => setDnsDomain(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button onClick={runDnsEnum} disabled={loading}>
                                        <Search className="mr-2 h-4 w-4" />
                                        Enumerate
                                    </Button>
                                </div>
                            </div>

                            {dnsResults && (
                                <div className="mt-6 space-y-4">
                                    <h3 className="font-semibold text-lg">DNS Records</h3>
                                    {Object.entries(dnsResults.records).map(([type, records]: any) => (
                                        records.length > 0 && (
                                            <Card key={type}>
                                                <CardHeader className="pb-3">
                                                    <CardTitle className="text-sm">{type} Records</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                                                        {JSON.stringify(records, null, 2)}
                                                    </pre>
                                                </CardContent>
                                            </Card>
                                        )
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Subdomain Discovery */}
                <TabsContent value="subdomains" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Server className="h-5 w-5" />
                                Subdomain Discovery
                            </CardTitle>
                            <CardDescription>
                                Discover subdomains using common wordlist and DNS queries
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="sub-domain">Target Domain</Label>
                                    <Input
                                        id="sub-domain"
                                        placeholder="example.com"
                                        value={subDomain}
                                        onChange={(e) => setSubDomain(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button onClick={runSubdomainDiscovery} disabled={loading}>
                                        <Search className="mr-2 h-4 w-4" />
                                        Discover
                                    </Button>
                                </div>
                            </div>

                            {subdomains.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-lg mb-3">Discovered Subdomains ({subdomains.length})</h3>
                                    <div className="space-y-2">
                                        {subdomains.map((sub, idx) => (
                                            <Card key={idx}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-mono font-semibold">{sub.hostname}</p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {sub.ips.join(', ')}
                                                            </p>
                                                        </div>
                                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                                            {sub.type}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* HTTP Header Analysis */}
                <TabsContent value="headers" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5" />
                                HTTP Header Analysis
                            </CardTitle>
                            <CardDescription>
                                Analyze HTTP security headers and identify potential vulnerabilities
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="header-url">Target URL</Label>
                                    <Input
                                        id="header-url"
                                        placeholder="https://example.com"
                                        value={headerUrl}
                                        onChange={(e) => setHeaderUrl(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button onClick={runHttpHeaderAnalysis} disabled={loading}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Analyze
                                    </Button>
                                </div>
                            </div>

                            {headerResults && (
                                <div className="mt-6 space-y-4">
                                    <div className="grid gap-4">
                                        <Card className={headerResults.vulnerabilities?.length > 0 ? 'border-destructive' : ''}>
                                            <CardHeader>
                                                <CardTitle className="text-sm">Security Assessment</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <p className="text-sm">
                                                        <span className="font-semibold">Status Code:</span> {headerResults.statusCode}
                                                    </p>
                                                    {headerResults.serverInfo && (
                                                        <p className="text-sm">
                                                            <span className="font-semibold">Server:</span> {headerResults.serverInfo}
                                                        </p>
                                                    )}
                                                    {headerResults.vulnerabilities?.length > 0 && (
                                                        <div className="mt-4">
                                                            <p className="font-semibold text-destructive mb-2">Vulnerabilities Found:</p>
                                                            <ul className="list-disc list-inside space-y-1">
                                                                {headerResults.vulnerabilities.map((vuln: string, idx: number) => (
                                                                    <li key={idx} className="text-sm text-destructive">{vuln}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="text-sm">Security Headers</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    {Object.entries(headerResults.securityHeaders || {}).map(([header, info]: any) => (
                                                        <div key={header} className="flex justify-between items-center">
                                                            <span className="text-sm font-mono">{header}</span>
                                                            <span className={`text-xs px-2 py-1 rounded ${info.present ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                                {info.present ? '✓ Present' : '✗ Missing'}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tech Stack Detection */}
                <TabsContent value="tech" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Server className="h-5 w-5" />
                                Technology Stack Detection
                            </CardTitle>
                            <CardDescription>
                                Identify web technologies, frameworks, and libraries used by target
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="tech-url">Target URL</Label>
                                    <Input
                                        id="tech-url"
                                        placeholder="https://example.com"
                                        value={techUrl}
                                        onChange={(e) => setTechUrl(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <Button onClick={runTechStackDetection} disabled={loading}>
                                        <Search className="mr-2 h-4 w-4" />
                                        Detect
                                    </Button>
                                </div>
                            </div>

                            {technologies.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-lg mb-3">Detected Technologies ({technologies.length})</h3>
                                    <div className="grid gap-3">
                                        {technologies.map((tech, idx) => (
                                            <Card key={idx}>
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold">{tech.name}</p>
                                                            <p className="text-sm text-muted-foreground">{tech.category}</p>
                                                        </div>
                                                        <span className={`text-xs px-2 py-1 rounded ${
                                                            tech.confidence === 'High' ? 'bg-green-500/10 text-green-500' :
                                                            tech.confidence === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-blue-500/10 text-blue-500'
                                                        }`}>
                                                            {tech.confidence} Confidence
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Legal Notice */}
            <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-sm text-destructive">
                        ⚖️ Authorized Use Only
                    </CardTitle>
                    <CardDescription className="text-xs">
                        These reconnaissance tools should only be used on systems you own or have explicit written permission to test.
                        Unauthorized reconnaissance may be illegal in your jurisdiction.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
