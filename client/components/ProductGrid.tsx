import { useState } from 'react'
import { Wifi, Bluetooth, Network, Shield, Terminal, Zap, Eye, Lock, AlertTriangle } from 'lucide-react'

interface Feature {
  id: string
  name: string
  description: string
  icon: any
  category: string
  capabilities: string[]
  warning: string
}

// CyberRecon features data
const cyberReconFeatures: Feature[] = [
  {
    id: 'wifi-scanner',
    name: 'Wi-Fi Network Scanner',
    description: 'Advanced wireless network discovery and analysis with encryption detection',
    icon: Wifi,
    category: 'Network Analysis',
    capabilities: ['WEP/WPA/WPA2/WPA3 Detection', 'Signal Strength Analysis', 'Hidden Network Discovery', 'Channel Mapping'],
    warning: 'Only scan networks you own or have permission to test'
  },
  {
    id: 'bluetooth-recon',
    name: 'Bluetooth Reconnaissance', 
    description: 'Comprehensive Bluetooth device discovery and vulnerability assessment',
    icon: Bluetooth,
    category: 'Device Discovery',
    capabilities: ['Device Enumeration', 'Service Discovery', 'Vulnerability Scanning', 'Pairing Analysis'],
    warning: 'Authorized testing only - respect privacy laws'
  },
  {
    id: 'network-topology',
    name: 'Network Topology Mapper',
    description: 'Real-time network structure analysis and host discovery',
    icon: Network,
    category: 'Infrastructure',
    capabilities: ['Host Discovery', 'Port Scanning', 'Service Detection', 'OS Fingerprinting'],
    warning: 'Use only on networks you have explicit permission to test'
  },
  {
    id: 'vuln-scanner',
    name: 'Vulnerability Scanner',
    description: 'Automated security vulnerability detection and assessment',
    icon: Shield,
    category: 'Security Assessment',
    capabilities: ['CVE Database Lookup', 'Exploit Detection', 'Risk Assessment', 'Report Generation'],
    warning: 'Ethical hacking and authorized penetration testing only'
  },
  {
    id: 'packet-analyzer',
    name: 'Packet Analyzer',
    description: 'Deep packet inspection and network traffic analysis',
    icon: Eye,
    category: 'Traffic Analysis', 
    capabilities: ['Protocol Analysis', 'Traffic Monitoring', 'Anomaly Detection', 'Data Extraction'],
    warning: 'Monitor only your own network traffic legally'
  },
  {
    id: 'security-audit',
    name: 'Security Auditing Suite',
    description: 'Comprehensive security posture assessment and compliance checking',
    icon: Lock,
    category: 'Compliance',
    capabilities: ['Policy Validation', 'Configuration Review', 'Compliance Reporting', 'Risk Scoring'],
    warning: 'Audit only systems you own or are authorized to assess'
  }
]

export default function FeaturesGrid() {
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...new Set(cyberReconFeatures.map(f => f.category.toLowerCase().replace(/\s+/g, '-')))]
  
  const filteredFeatures = filter === 'all' 
    ? cyberReconFeatures 
    : cyberReconFeatures.filter(f => f.category.toLowerCase().replace(/\s+/g, '-') === filter)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-sm font-medium text-white mb-6">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Authorized Security Testing Only
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Professional Security
            <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Analysis Tools
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced penetration testing and network reconnaissance capabilities for authorized security professionals
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg scale-105'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Tools' : category.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature) => {
            const IconComponent = feature.icon
            return (
              <div key={feature.id} className="group relative">
                <div className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 h-full">
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                      {feature.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {feature.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Capabilities */}
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-semibold text-cyan-400">Key Capabilities:</h4>
                    <ul className="space-y-1">
                      {feature.capabilities.map((capability, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></div>
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Warning */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6">
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-red-300 leading-tight">{feature.warning}</p>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-purple-600 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg">
                    Learn More
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tools found in this category.</p>
          </div>
        )}
        
        {/* Legal Disclaimer */}
        <div className="mt-16 p-8 bg-slate-700/30 rounded-2xl border border-red-500/20">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Legal Notice & Ethical Use Policy</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                CyberRecon Suite is designed exclusively for authorized penetration testing, security research, and network administration. 
                Users must only test networks and systems they own or have explicit written permission to assess. Unauthorized access to 
                computer systems is illegal and unethical. By using these tools, you agree to comply with all applicable laws and assume 
                full responsibility for your actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}