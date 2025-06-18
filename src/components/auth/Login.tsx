"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { Link } from "react-router-dom"

interface User {
  id: string
  name: string
  email: string
  role: "host" | "student"
}

interface LoginProps {
  onLogin: (user: User) => void
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student" as "host" | "student",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: "1",
        name: "John Doe",
        email: formData.email,
        role: formData.role,
      })
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
              <div className="grid grid-cols-2 gap-3">
                {["student", "host"].map((role) => (
                  <motion.button
                    key={role}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: role as "host" | "student" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === role
                        ? "border-purple-500 bg-purple-500/20 text-white"
                        : "border-white/20 bg-white/5 text-gray-300 hover:border-purple-400"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-2">
            <Link to="/forgot-password" className="text-purple-400 hover:text-purple-300 text-sm">
              Forgot your password?
            </Link>
            <div className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-purple-400 hover:text-purple-300">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
