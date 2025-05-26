'use client';

import { User } from "next-auth"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  ClipboardList,
  UserCheck,
  BarChart
} from "lucide-react"

interface DashboardSidebarProps {
  user: User
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname()

  const navigationItems = {
    EMPLOYEE: [
      { name: "Overview", href: "/dashboard", icon: Home },
      { name: "My Leave Requests", href: "/dashboard/leave-requests", icon: FileText },
      { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    SUPERVISOR: [
      { name: "Overview", href: "/dashboard", icon: Home },
      { name: "Team Leave Requests", href: "/dashboard/team-requests", icon: ClipboardList },
      { name: "My Team", href: "/dashboard/team", icon: Users },
      { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    HR: [
      { name: "Overview", href: "/dashboard", icon: Home },
      { name: "All Leave Requests", href: "/dashboard/all-requests", icon: ClipboardList },
      { name: "Employees", href: "/dashboard/employees", icon: Users },
      { name: "Reports", href: "/dashboard/reports", icon: BarChart },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
    ADMIN: [
      { name: "Overview", href: "/dashboard", icon: Home },
      { name: "All Leave Requests", href: "/dashboard/all-requests", icon: ClipboardList },
      { name: "Employees", href: "/dashboard/employees", icon: Users },
      { name: "Approvals", href: "/dashboard/approvals", icon: UserCheck },
      { name: "Reports", href: "/dashboard/reports", icon: BarChart },
      { name: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  }

  const items = navigationItems[user.role as keyof typeof navigationItems] || navigationItems.EMPLOYEE

  return (
    <div className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
} 