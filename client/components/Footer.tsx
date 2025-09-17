import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, Shield, AlertTriangle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-black text-white">CyberRecon</div>
                <div className="text-xs text-purple-400 -mt-1">Security Suite</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Professional penetration testing and network security analysis tools for authorized security research and ethical hacking.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Tools & Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Security Tools</h3>
            <div className="space-y-2">
              <Link href="/wifi-scanner" className="block hover:text-purple-400 text-sm transition-colors">Wi-Fi Scanner</Link>
              <Link href="/bluetooth-recon" className="block hover:text-purple-400 text-sm transition-colors">Bluetooth Recon</Link>
              <Link href="/network-mapper" className="block hover:text-purple-400 text-sm transition-colors">Network Mapper</Link>
              <Link href="/vulnerability-scanner" className="block hover:text-purple-400 text-sm transition-colors">Vuln Scanner</Link>
              <Link href="/packet-analyzer" className="block hover:text-purple-400 text-sm transition-colors">Packet Analyzer</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <Link href="/documentation" className="block hover:text-cyan-400 text-sm transition-colors">Documentation</Link>
              <Link href="/tutorials" className="block hover:text-cyan-400 text-sm transition-colors">Tutorials</Link>
              <Link href="/ethical-guidelines" className="block hover:text-cyan-400 text-sm transition-colors">Ethical Guidelines</Link>
              <Link href="/legal-compliance" className="block hover:text-cyan-400 text-sm transition-colors">Legal Compliance</Link>
              <Link href="/support" className="block hover:text-cyan-400 text-sm transition-colors">Support</Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact & Legal</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">security@cyberrecon.com</span>
              </div>
            </div>
            
            {/* Important Notice */}
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-medium text-sm mb-1">Legal Notice</h4>
                  <p className="text-red-300 text-xs leading-tight">
                    Authorized use only. These tools are for ethical security testing on systems you own or have permission to test.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CyberRecon Suite. Professional security tools for authorized use only.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                Terms of Use
              </Link>
              <Link href="/responsible-disclosure" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Responsible Disclosure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}