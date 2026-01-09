'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Shield, LayoutDashboard, Wifi, Bluetooth, Network, Settings } from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Wi-Fi Scanner',
    href: '/dashboard/wifi',
    icon: Wifi,
  },
  {
    title: 'Bluetooth Scanner',
    href: '/dashboard/bluetooth',
    icon: Bluetooth,
  },
  {
    title: 'Network Scanner',
    href: '/dashboard/network',
    icon: Network,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-muted/30 flex flex-col">
        {/* Logo */}
        <div className="h-14 border-b border-border flex items-center px-4 gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">CyberRanger Pro</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
