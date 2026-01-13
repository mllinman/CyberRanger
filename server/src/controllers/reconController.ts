import { Request, Response } from 'express'
import { exec } from 'child_process'
import util from 'util'
import dns from 'dns'
import net from 'net'
import axios from 'axios'

const execPromise = util.promisify(exec)
const dnsResolve = util.promisify(dns.resolve)
const dnsResolve4 = util.promisify(dns.resolve4)
const dnsResolve6 = util.promisify(dns.resolve6)
const dnsResolveMx = util.promisify(dns.resolveMx)
const dnsResolveTxt = util.promisify(dns.resolveTxt)
const dnsResolveNs = util.promisify(dns.resolveNs)
const dnsResolveCname = util.promisify(dns.resolveCname)

/**
 * DNS Enumeration - Comprehensive DNS reconnaissance
 */
export const dnsEnumeration = async (req: Request, res: Response) => {
    try {
        const domain = req.body.domain || req.query.domain
        
        // Enhanced domain validation - stricter regex and length check
        if (!domain || 
            typeof domain !== 'string' ||
            domain.length > 253 ||
            !/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(domain)) {
            return res.status(400).json({ error: 'Invalid domain name format' })
        }

        // Prevent localhost and private IP lookups
        const lowerDomain = domain.toLowerCase()
        if (lowerDomain.includes('localhost') || 
            lowerDomain.includes('127.0.0') ||
            lowerDomain.includes('169.254') ||
            lowerDomain.includes('10.') ||
            lowerDomain.includes('192.168') ||
            lowerDomain.includes('172.16')) {
            return res.status(403).json({ error: 'Testing internal/private addresses is not allowed' })
        }

        const results: any = {
            domain,
            timestamp: new Date().toISOString(),
            records: {}
        }

        // A Records (IPv4)
        try {
            results.records.A = await dnsResolve4(domain)
        } catch (e) {
            results.records.A = []
        }

        // AAAA Records (IPv6)
        try {
            results.records.AAAA = await dnsResolve6(domain)
        } catch (e) {
            results.records.AAAA = []
        }

        // MX Records
        try {
            results.records.MX = await dnsResolveMx(domain)
        } catch (e) {
            results.records.MX = []
        }

        // TXT Records
        try {
            results.records.TXT = await dnsResolveTxt(domain)
        } catch (e) {
            results.records.TXT = []
        }

        // NS Records
        try {
            results.records.NS = await dnsResolveNs(domain)
        } catch (e) {
            results.records.NS = []
        }

        // CNAME Records
        try {
            results.records.CNAME = await dnsResolveCname(domain)
        } catch (e) {
            results.records.CNAME = []
        }

        // Zone Transfer attempt (typically will fail on modern servers)
        results.zoneTransfer = 'Not attempted - requires dig/nslookup'

        res.json({ success: true, ...results })
    } catch (error: any) {
        console.error('DNS Enumeration Error:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

/**
 * Subdomain Discovery - Brute force common subdomains
 */
export const subdomainDiscovery = async (req: Request, res: Response) => {
    try {
        const domain = req.body.domain || req.query.domain
        
        if (!domain || !/^[a-zA-Z0-9][a-zA-Z0-9-_.]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain)) {
            return res.status(400).json({ error: 'Invalid domain name' })
        }

        // Common subdomains to check
        const commonSubdomains = [
            'www', 'mail', 'ftp', 'smtp', 'pop', 'imap',
            'webmail', 'admin', 'blog', 'dev', 'staging',
            'test', 'api', 'm', 'mobile', 'shop', 'store',
            'vpn', 'remote', 'login', 'auth', 'portal',
            'support', 'help', 'docs', 'status', 'cdn',
            'static', 'assets', 'img', 'images', 'video',
            'ns1', 'ns2', 'dns', 'mx', 'smtp1', 'smtp2'
        ]

        const discovered: any[] = []

        // Check each subdomain
        const checks = commonSubdomains.map(async (sub) => {
            const hostname = `${sub}.${domain}`
            try {
                const ips = await dnsResolve4(hostname)
                if (ips && ips.length > 0) {
                    discovered.push({
                        subdomain: sub,
                        hostname,
                        ips,
                        type: 'A'
                    })
                }
            } catch (e) {
                // Subdomain doesn't exist or no A record
            }
        })

        await Promise.all(checks)

        res.json({
            success: true,
            domain,
            totalChecked: commonSubdomains.length,
            discovered: discovered.length,
            subdomains: discovered
        })
    } catch (error: any) {
        console.error('Subdomain Discovery Error:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

/**
 * WHOIS Lookup - Domain registration information
 */
export const whoisLookup = async (req: Request, res: Response) => {
    try {
        const target = req.body.target || req.query.target
        
        if (!target) {
            return res.status(400).json({ error: 'Target domain or IP required' })
        }

        // Simple WHOIS implementation
        // In production, you'd use a dedicated WHOIS library or service
        const whoisData = {
            target,
            timestamp: new Date().toISOString(),
            note: 'WHOIS data requires external service or native whois command',
            // Simulated data structure
            registrar: 'N/A',
            registrationDate: 'N/A',
            expirationDate: 'N/A',
            nameServers: [],
            status: 'Query requires whois binary or external API'
        }

        res.json({ success: true, ...whoisData })
    } catch (error: any) {
        console.error('WHOIS Lookup Error:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

/**
 * Service Banner Grabbing - Identify services running on open ports
 */
export const bannerGrabbing = async (req: Request, res: Response) => {
    try {
        const target = req.body.target
        const port = parseInt(req.body.port)
        const timeout = parseInt(req.body.timeout) || 3000

        if (!target || !port || port < 1 || port > 65535) {
            return res.status(400).json({ error: 'Valid target and port required' })
        }

        const result: any = {
            target,
            port,
            timestamp: new Date().toISOString()
        }

        try {
            const banner = await grabBanner(target, port, timeout)
            result.success = true
            result.banner = banner
            result.service = identifyService(port, banner)
        } catch (error: any) {
            result.success = false
            result.error = error.message
        }

        res.json(result)
    } catch (error: any) {
        console.error('Banner Grabbing Error:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

/**
 * HTTP Header Analysis - Analyze web server headers for security info
 */
export const httpHeaderAnalysis = async (req: Request, res: Response) => {
    try {
        const url = req.body.url || req.query.url
        
        if (!url) {
            return res.status(400).json({ error: 'URL required' })
        }

        // Validate URL format
        let targetUrl: URL
        try {
            targetUrl = new URL(url.startsWith('http') ? url : `http://${url}`)
        } catch (e) {
            return res.status(400).json({ error: 'Invalid URL format' })
        }

        // Prevent testing internal/private addresses
        const hostname = targetUrl.hostname.toLowerCase()
        if (hostname === 'localhost' ||
            hostname.includes('127.0.0') ||
            hostname.includes('169.254') ||
            hostname.includes('10.') ||
            hostname.includes('192.168') ||
            hostname.includes('172.16') ||
            hostname.includes('.local')) {
            return res.status(403).json({ error: 'Testing internal/private addresses is not allowed' })
        }

        const response = await axios.get(targetUrl.toString(), {
            timeout: 10000,
            maxRedirects: 5,
            validateStatus: () => true, // Accept any status code
            maxContentLength: 5 * 1024 * 1024 // Limit response to 5MB
        })

        const analysis: any = {
            url: targetUrl.toString(),
            statusCode: response.status,
            headers: response.headers,
            securityHeaders: {},
            vulnerabilities: []
        }

        // Analyze security headers
        const securityHeaderChecks = {
            'x-frame-options': { present: !!response.headers['x-frame-options'], importance: 'High' },
            'x-content-type-options': { present: !!response.headers['x-content-type-options'], importance: 'Medium' },
            'x-xss-protection': { present: !!response.headers['x-xss-protection'], importance: 'Medium' },
            'strict-transport-security': { present: !!response.headers['strict-transport-security'], importance: 'High' },
            'content-security-policy': { present: !!response.headers['content-security-policy'], importance: 'High' },
            'referrer-policy': { present: !!response.headers['referrer-policy'], importance: 'Low' }
        }

        analysis.securityHeaders = securityHeaderChecks

        // Check for information disclosure
        if (response.headers['server']) {
            analysis.serverInfo = response.headers['server']
        }
        if (response.headers['x-powered-by']) {
            analysis.poweredBy = response.headers['x-powered-by']
            analysis.vulnerabilities.push('X-Powered-By header reveals technology stack')
        }

        // Check for missing security headers
        Object.entries(securityHeaderChecks).forEach(([header, check]: any) => {
            if (!check.present && check.importance === 'High') {
                analysis.vulnerabilities.push(`Missing security header: ${header}`)
            }
        })

        res.json({ success: true, analysis })
    } catch (error: any) {
        console.error('HTTP Header Analysis Error:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

/**
 * Technology Stack Detection - Identify technologies used by target
 */
export const techStackDetection = async (req: Request, res: Response) => {
    try {
        const url = req.body.url || req.query.url
        
        if (!url) {
            return res.status(400).json({ error: 'URL required' })
        }

        let targetUrl: URL
        try {
            targetUrl = new URL(url.startsWith('http') ? url : `http://${url}`)
        } catch (e) {
            return res.status(400).json({ error: 'Invalid URL format' })
        }

        const response = await axios.get(targetUrl.toString(), {
            timeout: 10000,
            maxRedirects: 5,
            validateStatus: () => true,
            maxContentLength: 5 * 1024 * 1024 // Limit response to 5MB
        })

        const technologies: any = {
            url: targetUrl.toString(),
            detected: []
        }

        // Server identification
        if (response.headers['server']) {
            technologies.detected.push({
                category: 'Web Server',
                name: response.headers['server'],
                confidence: 'High'
            })
        }

        // Framework detection from headers
        if (response.headers['x-powered-by']) {
            technologies.detected.push({
                category: 'Framework',
                name: response.headers['x-powered-by'],
                confidence: 'High'
            })
        }

        // Content analysis - limit to first 100KB for efficiency
        const htmlData = response.data.toString()
        const html = htmlData.substring(0, 100000)
        
        // React detection
        if (html.includes('__NEXT_DATA__') || html.includes('_next/')) {
            technologies.detected.push({
                category: 'Framework',
                name: 'Next.js',
                confidence: 'High'
            })
        } else if (html.includes('react') || html.includes('ReactDOM')) {
            technologies.detected.push({
                category: 'Framework',
                name: 'React',
                confidence: 'Medium'
            })
        }

        // WordPress detection
        if (html.includes('wp-content') || html.includes('wp-includes')) {
            technologies.detected.push({
                category: 'CMS',
                name: 'WordPress',
                confidence: 'High'
            })
        }

        // jQuery detection
        if (html.includes('jquery')) {
            technologies.detected.push({
                category: 'JavaScript Library',
                name: 'jQuery',
                confidence: 'High'
            })
        }

        // Bootstrap detection
        if (html.includes('bootstrap')) {
            technologies.detected.push({
                category: 'CSS Framework',
                name: 'Bootstrap',
                confidence: 'High'
            })
        }

        res.json({ success: true, ...technologies })
    } catch (error: any) {
        console.error('Tech Stack Detection Error:', error)
        res.status(500).json({ success: false, error: error.message })
    }
}

// Helper function to grab banner from a port
function grabBanner(host: string, port: number, timeout: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const socket = new net.Socket()
        let banner = ''

        socket.setTimeout(timeout)

        socket.on('connect', () => {
            // Send HTTP request for web services
            if (port === 80 || port === 8080 || port === 8000) {
                socket.write('GET / HTTP/1.0\r\n\r\n')
            }
        })

        socket.on('data', (data) => {
            banner += data.toString()
            socket.destroy()
            resolve(banner)
        })

        socket.on('timeout', () => {
            socket.destroy()
            resolve(banner || 'No banner received (timeout)')
        })

        socket.on('error', (err) => {
            reject(err)
        })

        socket.connect(port, host)
    })
}

// Helper function to identify service from port and banner
function identifyService(port: number, banner: string): string {
    const commonServices: { [key: number]: string } = {
        21: 'FTP',
        22: 'SSH',
        23: 'Telnet',
        25: 'SMTP',
        53: 'DNS',
        80: 'HTTP',
        110: 'POP3',
        143: 'IMAP',
        443: 'HTTPS',
        445: 'SMB',
        3306: 'MySQL',
        3389: 'RDP',
        5432: 'PostgreSQL',
        5900: 'VNC',
        6379: 'Redis',
        8080: 'HTTP-Alt',
        27017: 'MongoDB'
    }

    let service = commonServices[port] || 'Unknown'

    // Refine based on banner
    if (banner) {
        if (banner.toLowerCase().includes('ssh')) service = 'SSH'
        else if (banner.toLowerCase().includes('ftp')) service = 'FTP'
        else if (banner.toLowerCase().includes('smtp')) service = 'SMTP'
        else if (banner.toLowerCase().includes('http')) service = 'HTTP'
        else if (banner.toLowerCase().includes('mysql')) service = 'MySQL'
        else if (banner.toLowerCase().includes('redis')) service = 'Redis'
    }

    return service
}
