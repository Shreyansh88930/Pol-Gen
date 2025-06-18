"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { Home, Mic, Brain, BarChart3, Users, Trophy, Download, Settings, LogOut, Menu, X } from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  onLogout: () => void
  user: { name: string; email: string }
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, onLogout, user }) => {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Mic, label: "Audio Capture", path: "/audio-capture" },
    { icon: Brain, label: "AI Questions", path: "/ai-questions" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Participants", path: "/participants" },
    { icon: Trophy, label: "Leaderboard", path: "/leaderboard" },
    { icon: Download, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ]

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full backdrop-blur-xl bg-white/10 border-r border-white/20 z-50 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-white font-semibold">Poll System</h2>
                <p className="text-xs text-gray-400">Host Panel</p>
              </div>
            </motion.div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={`flex items-center space-x-3 p-2.5 mx-1 rounded-lg transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="mt-auto p-4 border-t border-white/20">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">{user.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user.name}</p>
                <p className="text-gray-400 text-xs truncate">{user.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        <button
          onClick={onLogout}
          className={`flex items-center space-x-3 p-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  )
}

export default Sidebar
