"use client"

import type React from "react"
import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import AudioCapture from "./AudioCapture"
import AIQuestionFeed from "./AIQuestionFeed"
import Participants from "./Participants"
import Leaderboard from "./Leaderboard"
import Settings from "./Settings"
import OrbitalDashboard from "./OrbitalDashboard"

interface User {
  id: string
  name: string
  email: string
  // Add other user properties as needed
}

interface HostDashboardProps {
  user: User
  onLogout: () => void
}

const HostDashboard: React.FC<HostDashboardProps> = ({ user, onLogout }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={onLogout}
        user={user}
      />

      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <Routes>
          <Route path="/" element={<OrbitalDashboard user={user} />} />
          <Route path="/dashboard" element={<OrbitalDashboard user={user} />} />
          <Route path="/audio-capture" element={<AudioCapture />} />
          <Route path="/ai-questions" element={<AIQuestionFeed />} />
          <Route path="/participants" element={<Participants />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default HostDashboard
