'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Code, Copy, Zap, Shield } from 'lucide-react'
import { toast } from 'sonner'

export default function PayloadsPage() {
    const [loading, setLoading] = useState(false)

    // Payload Generation
    const [payloadType, setPayloadType] = useState('reverse_shell')
    const [lhost, setLhost] = useState('')
    const [lport, setLport] = useState('4444')
    const [payloads, setPayloads] = useState<any[]>([])

    // Encoding
    const [encodePayload, setEncodePayload] = useState('')
    const [encodings, setEncodings] = useState<any>(null)

    const generatePayloads = async () => {
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/exploit/payload-generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: payloadType,
                    options: { lhost, lport }
                })
            })
            const data = await res.json()
            if (data.success) {
                setPayloads(data.generated || [])
                toast.success(`Generated ${data.generated.length} payloads`)
            } else {
                toast.error(data.error || 'Payload generation failed')
            }
        } catch (e) {
            toast.error('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const encodePayloadFunc = async () => {
        if (!encodePayload) {
            toast.error('Please enter a payload to encode')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:8000/api/exploit/payload-encode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payload: encodePayload })
            })
            const data = await res.json()
            if (data.success) {
                setEncodings(data.encodings)
                toast.success('Payload encoded successfully')
            } else {
                toast.error(data.error || 'Encoding failed')
            }
        } catch (e) {
            toast.error('Failed to connect to server')
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast.success('Copied to clipboard')
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payload Tools</h1>
                    <p className="text-muted-foreground">Generate and encode exploitation payloads</p>
                </div>
                <Code className="h-12 w-12 text-primary" />
            </div>

            <Tabs defaultValue="generate" className="space-y-4">
                <TabsList className="grid grid-cols-2 w-full max-w-md">
                    <TabsTrigger value="generate">Generate Payloads</TabsTrigger>
                    <TabsTrigger value="encode">Encode Payloads</TabsTrigger>
                </TabsList>

                {/* Payload Generation */}
                <TabsContent value="generate" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-5 w-5" />
                                Payload Generator
                            </CardTitle>
                            <CardDescription>
                                Generate exploitation payloads for various attack vectors
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="payload-type">Payload Type</Label>
                                    <Select value={payloadType} onValueChange={setPayloadType}>
                                        <SelectTrigger id="payload-type">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="reverse_shell">Reverse Shell</SelectItem>
                                            <SelectItem value="sql_injection">SQL Injection</SelectItem>
                                            <SelectItem value="xss">Cross-Site Scripting (XSS)</SelectItem>
                                            <SelectItem value="command_injection">Command Injection</SelectItem>
                                            <SelectItem value="file_upload">File Upload Bypass</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {payloadType === 'reverse_shell' && (
                                    <>
                                        <div className="space-y-2">
                                            <Label htmlFor="lhost">Listener IP (LHOST)</Label>
                                            <Input
                                                id="lhost"
                                                placeholder="10.0.0.1"
                                                value={lhost}
                                                onChange={(e) => setLhost(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <Label htmlFor="lport">Listener Port (LPORT)</Label>
                                            <Input
                                                id="lport"
                                                placeholder="4444"
                                                value={lport}
                                                onChange={(e) => setLport(e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <Button onClick={generatePayloads} disabled={loading} className="w-full">
                                <Zap className="mr-2 h-4 w-4" />
                                Generate Payloads
                            </Button>

                            {payloads.length > 0 && (
                                <div className="mt-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Generated Payloads ({payloads.length})</h3>
                                    <div className="space-y-4">
                                        {payloads.map((payload, idx) => (
                                            <Card key={idx}>
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <CardTitle className="text-sm">{payload.name}</CardTitle>
                                                            {payload.language && (
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    Language: {payload.language}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => copyToClipboard(payload.payload)}
                                                        >
                                                            <Copy className="h-4 w-4 mr-1" />
                                                            Copy
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <pre className="text-xs bg-muted p-3 rounded overflow-auto font-mono">
                                                        {payload.payload}
                                                    </pre>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Payload Encoding */}
                <TabsContent value="encode" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Payload Encoder
                            </CardTitle>
                            <CardDescription>
                                Encode payloads to evade detection and filtering
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="encode-payload">Payload to Encode</Label>
                                <Textarea
                                    id="encode-payload"
                                    placeholder='<script>alert("XSS")</script>'
                                    value={encodePayload}
                                    onChange={(e) => setEncodePayload(e.target.value)}
                                    className="font-mono min-h-[100px]"
                                />
                            </div>

                            <Button onClick={encodePayloadFunc} disabled={loading} className="w-full">
                                <Code className="mr-2 h-4 w-4" />
                                Encode Payload
                            </Button>

                            {encodings && (
                                <div className="mt-6 space-y-4">
                                    <h3 className="font-semibold text-lg">Encoded Versions</h3>
                                    <div className="space-y-4">
                                        {Object.entries(encodings).map(([type, encoded]: any) => (
                                            <Card key={type}>
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-sm capitalize">
                                                            {type.replace(/([A-Z])/g, ' $1').trim()}
                                                        </CardTitle>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => copyToClipboard(encoded)}
                                                        >
                                                            <Copy className="h-4 w-4 mr-1" />
                                                            Copy
                                                        </Button>
                                                    </div>
                                                </CardHeader>
                                                <CardContent>
                                                    <pre className="text-xs bg-muted p-3 rounded overflow-auto font-mono break-all">
                                                        {encoded}
                                                    </pre>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Common Encoding Reference */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Encoding Types Reference</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-semibold">Base64:</span> Standard encoding for binary data
                                </div>
                                <div>
                                    <span className="font-semibold">URL Encoding:</span> Encode special characters for URLs
                                </div>
                                <div>
                                    <span className="font-semibold">Double URL:</span> Double-encode to bypass simple filters
                                </div>
                                <div>
                                    <span className="font-semibold">Hex:</span> Hexadecimal representation
                                </div>
                                <div>
                                    <span className="font-semibold">HTML Entity:</span> HTML character entities
                                </div>
                                <div>
                                    <span className="font-semibold">Unicode:</span> Unicode escape sequences
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Usage Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm">Usage Guide</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 text-sm">
                        <div>
                            <span className="font-semibold">Reverse Shells:</span> Set up a listener first:
                            <code className="block mt-1 p-2 bg-muted rounded font-mono text-xs">
                                nc -lvnp 4444
                            </code>
                        </div>
                        <div>
                            <span className="font-semibold">SQL Injection:</span> Test on vulnerable parameters
                        </div>
                        <div>
                            <span className="font-semibold">XSS:</span> Inject into reflection points
                        </div>
                        <div>
                            <span className="font-semibold">Command Injection:</span> Chain with existing commands
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Warning Notice */}
            <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                    <CardTitle className="text-sm text-destructive">
                        ⚠️ Authorized Use Only
                    </CardTitle>
                    <CardDescription className="text-xs">
                        These payloads are for educational and authorized security testing only. Deploying payloads against
                        systems without explicit permission is illegal. Always obtain written authorization before testing.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
