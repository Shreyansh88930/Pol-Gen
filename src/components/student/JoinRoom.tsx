"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { Mail, Globe, Key, AlertCircle, CheckCircle, Loader } from "lucide-react"
import { validateEmail, validateMeetingLink } from "../../utils/validators"

interface RoomData {
  email: string
  roomCode: string
  meetingLink: string
}

interface JoinRoomProps {
  onJoinSuccess: (roomData: RoomData) => void
}

const JoinRoom: React.FC<JoinRoomProps> = ({ onJoinSuccess }) => {
  const { roomCode: urlRoomCode } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    meetingLink: "",
    roomCode: urlRoomCode || "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isValidating, setIsValidating] = useState(false)
  const [validationStep, setValidationStep] = useState<"form" | "validating" | "success" | "denied">("form")
  const [denialReason, setDenialReason] = useState("")

  useEffect(() => {
    if (urlRoomCode) {
      setFormData((prev) => ({ ...prev, roomCode: urlRoomCode }))
    }
  }, [urlRoomCode])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.meetingLink) {
      newErrors.meetingLink = "Meeting link is required"
    } else if (!validateMeetingLink(formData.meetingLink)) {
      newErrors.meetingLink = "Please enter a valid Google Meet, Zoom, or Teams link"
    }

    if (!formData.roomCode) {
      newErrors.roomCode = "Room code is required"
    } else if (formData.roomCode.length !== 6 || !/^\d{6}$/.test(formData.roomCode)) {
      newErrors.roomCode = "Room code must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsValidating(true)
    setValidationStep("validating")

    // Simulate validation process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate validation logic
    const isEmailValid = formData.email.includes("@student.edu") // Mock validation
    const isRoomCodeValid = formData.roomCode === "742193" // Mock room code
    const isMeetingLinkValid = validateMeetingLink(formData.meetingLink)

    if (!isEmailValid) {
      setDenialReason("Email not found in participant list")
      setValidationStep("denied")
    } else if (!isRoomCodeValid) {
      setDenialReason("Invalid room code")
      setValidationStep("denied")
    } else if (!isMeetingLinkValid) {
      setDenialReason("Invalid meeting link format")
      setValidationStep("denied")
    } else {
      setValidationStep("success")
      setTimeout(() => {
        onJoinSuccess({
          email: formData.email,
          roomCode: formData.roomCode,
          meetingLink: formData.meetingLink,
        })
      }, 1500)
    }

    setIsValidating(false)
  }

  const handleRetry = () => {
    setValidationStep("form")
    setErrors({})
    setDenialReason("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {validationStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(147, 51, 234, 0.5)",
                      "0 0 30px rgba(147, 51, 234, 0.8)",
                      "0 0 20px rgba(147, 51, 234, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Key className="w-8 h-8 text-white" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white mb-2">Join PollPulse</h1>
                <p className="text-gray-300">Enter your details to access the poll session</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-purple-500"
                      }`}
                      placeholder="your.email@student.edu"
                      autoFocus
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Meeting Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Google Meet Link</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        errors.meetingLink
                          ? "border-red-500 focus:ring-red-500"
                          : "border-white/20 focus:ring-purple-500"
                      }`}
                      placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    />
                  </div>
                  {errors.meetingLink && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.meetingLink}
                    </motion.p>
                  )}
                </div>

                {/* Room Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Room Code</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.roomCode}
                      onChange={(e) =>
                        setFormData({ ...formData, roomCode: e.target.value.replace(/\D/g, "").slice(0, 6) })
                      }
                      className={`w-full pl-10 pr-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all font-mono text-center text-lg tracking-widest ${
                        errors.roomCode ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-purple-500"
                      }`}
                      placeholder="000000"
                      maxLength={6}
                    />
                  </div>
                  {errors.roomCode && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.roomCode}
                    </motion.p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isValidating}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isValidating ? "Validating..." : "Join Session"}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">Need help? Contact your instructor</p>
              </div>
            </motion.div>
          )}

          {validationStep === "validating" && (
            <motion.div
              key="validating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Loader className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">Validating Access</h2>
              <div className="space-y-2 text-gray-300">
                <p>✓ Checking email registration</p>
                <p>✓ Verifying room code</p>
                <p>✓ Validating meeting link</p>
              </div>
            </motion.div>
          )}

          {validationStep === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                    "0 0 40px rgba(34, 197, 94, 0.8)",
                    "0 0 20px rgba(34, 197, 94, 0.5)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">Access Granted!</h2>
              <p className="text-gray-300 mb-6">Welcome to the poll session. Redirecting...</p>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {validationStep === "denied" && (
            <motion.div
              key="denied"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl text-center"
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 3,
                }}
              >
                <AlertCircle className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
              <p className="text-gray-300 mb-6">{denialReason}</p>
              <div className="space-y-3">
                <motion.button
                  onClick={handleRetry}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default JoinRoom
