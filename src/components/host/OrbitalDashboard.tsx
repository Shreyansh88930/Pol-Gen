"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Mic, BarChart3, FileText, Download, KeyRound, Zap, Users, X, Play, Pause } from "lucide-react"

interface OrbitalNode {
  id: string
  title: string
  icon: React.ElementType
  color: string
  glowColor: string
  angle: number
  radius: number
  description: string
  component?: React.ReactNode
}

interface OrbitalDashboardProps {
  user: any
}

const OrbitalDashboard: React.FC<OrbitalDashboardProps> = ({ user }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [rotation, setRotation] = useState(0)

  // Define orbital nodes
  const orbitalNodes: OrbitalNode[] = [
    {
      id: "ai-questions",
      title: "AI Question Feed",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      glowColor: "purple-500",
      angle: 0,
      radius: 200,
      description: "Generate intelligent questions using AI",
      component: <AIQuestionPanel />,
    },
    {
      id: "create-room",
      title: "Create Room",
      icon: KeyRound,
      color: "from-blue-500 to-cyan-500",
      glowColor: "blue-500",
      angle: 60,
      radius: 200,
      description: "Create poll rooms and share codes",
      component: <CreateRoomPanel />,
    },
    {
      id: "audio-polls",
      title: "Audio Polls",
      icon: Mic,
      color: "from-green-500 to-teal-500",
      glowColor: "green-500",
      angle: 120,
      radius: 200,
      description: "Enable voice-based polling",
      component: <AudioPollPanel />,
    },
    {
      id: "analytics",
      title: "Live Analytics",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      glowColor: "orange-500",
      angle: 180,
      radius: 200,
      description: "Real-time poll analytics",
      component: <AnalyticsPanel />,
    },
    {
      id: "manual-questions",
      title: "Manual Questions",
      icon: FileText,
      color: "from-yellow-500 to-orange-500",
      glowColor: "yellow-500",
      angle: 240,
      radius: 200,
      description: "Add custom questions manually",
      component: <ManualQuestionPanel />,
    },
    {
      id: "export-results",
      title: "Export Results",
      icon: Download,
      color: "from-indigo-500 to-purple-500",
      glowColor: "indigo-500",
      angle: 300,
      radius: 200,
      description: "Download poll results and reports",
      component: <ExportPanel />,
    },
  ]

  // Animation loop for orbital rotation
  useEffect(() => {
    if (!isAnimating) return

    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)

    return () => clearInterval(interval)
  }, [isAnimating])

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId)
    setIsAnimating(false)
  }

  const handleCloseModal = () => {
    setSelectedNode(null)
    setIsAnimating(true)
  }

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
  }

  const getNodePosition = (angle: number, radius: number) => {
    const radian = ((angle + rotation) * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    }
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Control Panel */}
      <div className="absolute top-6 right-6 z-50">
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleAnimation}
              className={`p-2 rounded-lg transition-all ${
                isAnimating
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </motion.button>
            <span className="text-white text-sm">{isAnimating ? "Orbiting" : "Paused"}</span>
          </div>
        </motion.div>
      </div>

      {/* User Info */}
      <div className="absolute top-6 left-6 z-50">
        <motion.div
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">{user?.name || "Host"}</h3>
              <p className="text-gray-400 text-sm">Command Center</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Central Hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          animate={{ rotate: isAnimating ? rotation * 0.1 : 0 }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          {/* Orbital Rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${ring * 140}px`,
                height: `${ring * 140}px`,
                left: `${-ring * 70}px`,
                top: `${-ring * 70}px`,
              }}
              animate={{
                rotate: isAnimating ? (ring % 2 === 0 ? rotation * 0.3 : -rotation * 0.2) : 0,
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          ))}

          {/* Central Command Hub */}
          <motion.div
            className="relative w-32 h-32 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-full flex items-center justify-center shadow-2xl"
            animate={{
              boxShadow: [
                "0 0 30px rgba(147, 51, 234, 0.5)",
                "0 0 50px rgba(59, 130, 246, 0.7)",
                "0 0 30px rgba(147, 51, 234, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-center">
              <Zap className="w-8 h-8 text-white mx-auto mb-1" />
              <span className="text-white text-xs font-bold">HOST</span>
              <br />
              <span className="text-white text-xs">COMMAND</span>
            </div>
          </motion.div>

          {/* Orbital Nodes */}
          {orbitalNodes.map((node) => {
            const position = getNodePosition(node.angle, node.radius)
            const IconComponent = node.icon

            return (
              <motion.div
                key={node.id}
                className="absolute"
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  transform: "translate(-50%, -50%)",
                }}
                whileHover={{ scale: 1.2, z: 10 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNodeClick(node.id)}
              >
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-r ${node.color} rounded-full flex items-center justify-center cursor-pointer shadow-lg border-2 border-white/20`}
                  animate={{
                    boxShadow: [
                      `0 0 20px rgba(147, 51, 234, 0.3)`,
                      `0 0 30px var(--tw-gradient-from, rgba(147, 51, 234, 0.6))`,
                      `0 0 20px rgba(147, 51, 234, 0.3)`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: node.angle / 60 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>

                {/* Node Label */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                    {node.title}
                  </span>
                </motion.div>

                {/* Connection Line to Center */}
                <motion.div
                  className="absolute w-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  style={{
                    height: `${node.radius}px`,
                    left: "50%",
                    top: "50%",
                    transformOrigin: "top center",
                    transform: `translate(-50%, -100%) rotate(${-node.angle - rotation}deg)`,
                  }}
                  animate={{
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: node.angle / 120 }}
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {(() => {
                    const node = orbitalNodes.find((n) => n.id === selectedNode)
                    const IconComponent = node?.icon || Brain
                    return (
                      <>
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${node?.color} rounded-xl flex items-center justify-center`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">{node?.title}</h2>
                          <p className="text-gray-400">{node?.description}</p>
                        </div>
                      </>
                    )
                  })()}
                </div>
                <motion.button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Feature Content */}
              <div className="text-white">{orbitalNodes.find((n) => n.id === selectedNode)?.component}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Feature Panel Components
const AIQuestionPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Generate Questions</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter topic or subject..."
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <motion.button
            className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Generate AI Questions
          </motion.button>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Questions</h3>
        <div className="space-y-2">
          {["What is machine learning?", "Explain neural networks", "Define AI ethics"].map((q, i) => (
            <div key={i} className="p-2 bg-white/5 rounded-lg text-sm">
              {q}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const CreateRoomPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Room Details</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Room name..."
            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">742193</div>
            <p className="text-sm text-gray-400">Room Code</p>
          </div>
          <motion.button
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Create Room
          </motion.button>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Invite Participants</h3>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
            <p className="text-gray-400">Drop CSV file here</p>
          </div>
          <motion.button
            className="w-full p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Invitations
          </motion.button>
        </div>
      </div>
    </div>
  </div>
)

const AudioPollPanel = () => (
  <div className="space-y-6">
    <div className="text-center">
      <motion.div
        className="w-32 h-32 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <Mic className="w-16 h-16 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-4">Audio Poll Control</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          className="p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          Start Recording
        </motion.button>
        <motion.button
          className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          Pause Recording
        </motion.button>
        <motion.button
          className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          Stop Recording
        </motion.button>
      </div>
    </div>
  </div>
)

const AnalyticsPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Active Polls", value: "12", color: "from-purple-500 to-pink-500" },
        { label: "Participants", value: "156", color: "from-blue-500 to-cyan-500" },
        { label: "Response Rate", value: "87%", color: "from-green-500 to-teal-500" },
      ].map((stat, i) => (
        <div key={i} className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center">
          <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
            {stat.value}
          </div>
          <p className="text-gray-400">{stat.label}</p>
        </div>
      ))}
    </div>
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Live Chart</h3>
      <div className="h-48 flex items-end justify-between space-x-2">
        {[65, 78, 82, 71, 89, 94, 87, 92].map((height, i) => (
          <motion.div
            key={i}
            className="bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg flex-1"
            style={{ height: `${height}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  </div>
)

const ManualQuestionPanel = () => (
  <div className="space-y-6">
    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Add Custom Question</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Question title..."
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Question description..."
          rows={4}
          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Option A"
            className="p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Option B"
            className="p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Option C"
            className="p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Option D"
            className="p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
          />
        </div>
        <motion.button
          className="w-full p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add Question
        </motion.button>
      </div>
    </div>
  </div>
)

const ExportPanel = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Export Options</h3>
        <div className="space-y-3">
          {["PDF Report", "Excel Spreadsheet", "JSON Data", "CSV Results"].map((option, i) => (
            <motion.button
              key={i}
              className="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-left transition-all"
              whileHover={{ scale: 1.02 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Exports</h3>
        <div className="space-y-2">
          {["Poll_Results_2024.pdf", "Analytics_Report.xlsx", "Session_Data.json"].map((file, i) => (
            <div key={i} className="p-2 bg-white/5 rounded-lg text-sm flex justify-between items-center">
              <span>{file}</span>
              <Download className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default OrbitalDashboard
