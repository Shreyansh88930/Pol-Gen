"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ForgotPassword from "./components/auth/ForgotPassword"
import HostDashboard from "./components/host/HostDashboard"
import StudentDashboard from "./components/student/StudentDashboard"

import OrbitalLoader from "./components/ui/OrbitalLoader"
import "./App.css"

interface User {
  id: string
  name: string
  email: string
  role: "host" | "student"
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showOrbital, setShowOrbital] = useState(true)

  useEffect(() => {
    // Simulate initial load
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowOrbital(false), 2000)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }



  if (isLoading || showOrbital) {
    return <OrbitalLoader />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            

            {!user ? (
              <>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                {user.role === "host" ? (
                  <Route path="/*" element={<HostDashboard user={user} onLogout={handleLogout} />} />
                ) : (
                  <Route path="/*" element={<StudentDashboard user={user} onLogout={handleLogout} />} />
                )}
              </>
            )}
          </Routes>
        </AnimatePresence>
      </Router>
    </div>
  )
}

export default App
