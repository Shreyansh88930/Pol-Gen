"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Search, Filter, Download, Eye, Clock, Target, TrendingUp, Mail, Calendar, Award } from "lucide-react"

interface Participant {
  id: string
  name: string
  email: string
  accuracy: number
  avgTime: number
  pollsAttempted: number
  joinedAt: string
  status: "active" | "inactive"
  lastActive: string
}

const Participants: React.FC = () => {
  const [participants] = useState<Participant[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      accuracy: 92,
      avgTime: 2.3,
      pollsAttempted: 15,
      joinedAt: "2024-01-15",
      status: "active",
      lastActive: "2 minutes ago",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      accuracy: 87,
      avgTime: 3.1,
      pollsAttempted: 12,
      joinedAt: "2024-01-14",
      status: "active",
      lastActive: "5 minutes ago",
    },
    {
      id: "3",
      name: "Carol Davis",
      email: "carol@example.com",
      accuracy: 95,
      avgTime: 1.8,
      pollsAttempted: 18,
      joinedAt: "2024-01-13",
      status: "inactive",
      lastActive: "1 hour ago",
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david@example.com",
      accuracy: 78,
      avgTime: 4.2,
      pollsAttempted: 8,
      joinedAt: "2024-01-16",
      status: "active",
      lastActive: "1 minute ago",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "accuracy" | "avgTime" | "pollsAttempted">("accuracy")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const filteredParticipants = participants
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aVal = a[sortBy]
      const bVal = b[sortBy]
      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

  const handleExportReport = (participant: Participant) => {
    // Export logic here
    console.log("Exporting report for:", participant.name)
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "text-green-400 bg-green-500/20" : "text-gray-400 bg-gray-500/20"
  }

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 90) return "text-green-400"
    if (accuracy >= 80) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Participants</h1>
          <p className="text-gray-400 mt-1">Manage and monitor participant performance</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            Filter
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export All
          </motion.button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Participants",
            value: participants.length,
            icon: Users,
            color: "from-purple-500 to-blue-500",
          },
          {
            label: "Active Now",
            value: participants.filter((p) => p.status === "active").length,
            icon: TrendingUp,
            color: "from-blue-500 to-teal-500",
          },
          {
            label: "Avg Accuracy",
            value: `${Math.round(participants.reduce((acc, p) => acc + p.accuracy, 0) / participants.length)}%`,
            icon: Target,
            color: "from-teal-500 to-green-500",
          },
          {
            label: "Avg Response Time",
            value: `${(participants.reduce((acc, p) => acc + p.avgTime, 0) / participants.length).toFixed(1)}s`,
            icon: Clock,
            color: "from-green-500 to-yellow-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search and Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "accuracy" | "avgTime" | "pollsAttempted")}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="accuracy">Sort by Accuracy</option>
              <option value="avgTime">Sort by Avg Time</option>
              <option value="pollsAttempted">Sort by Polls</option>
              <option value="name">Sort by Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Participants Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Participant</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Accuracy</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Avg Time</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Polls</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Last Active</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredParticipants.map((participant, index) => (
                <motion.tr
                  key={participant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">{participant.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{participant.name}</p>
                        <p className="text-gray-400 text-sm">{participant.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(participant.status)}`}
                    >
                      {participant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getAccuracyColor(participant.accuracy)}`}>
                        {participant.accuracy}%
                      </span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            participant.accuracy >= 90
                              ? "bg-green-500"
                              : participant.accuracy >= 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${participant.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{participant.avgTime}s</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{participant.pollsAttempted}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{participant.lastActive}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => setSelectedParticipant(participant)}
                        className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleExportReport(participant)}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Participant Detail Modal */}
      <AnimatePresence>
        {selectedParticipant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedParticipant(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Participant Details</h2>
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <span className="text-gray-400 text-xl">×</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">{selectedParticipant.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedParticipant.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{selectedParticipant.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">Joined {selectedParticipant.joinedAt}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-400">Accuracy</span>
                    </div>
                    <span className={`text-2xl font-bold ${getAccuracyColor(selectedParticipant.accuracy)}`}>
                      {selectedParticipant.accuracy}%
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-400">Avg Time</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{selectedParticipant.avgTime}s</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-teal-400" />
                      <span className="text-gray-400">Polls</span>
                    </div>
                    <span className="text-2xl font-bold text-white">{selectedParticipant.pollsAttempted}</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {[
                      { action: 'Completed poll: "Machine Learning Basics"', time: "2 minutes ago", accuracy: 95 },
                      { action: 'Completed poll: "Data Structures"', time: "15 minutes ago", accuracy: 87 },
                      { action: 'Completed poll: "Algorithms"', time: "1 hour ago", accuracy: 92 },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                        <span className={`text-sm font-medium ${getAccuracyColor(activity.accuracy)}`}>
                          {activity.accuracy}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                  <motion.button
                    onClick={() => handleExportReport(selectedParticipant)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Export Report
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Participants
