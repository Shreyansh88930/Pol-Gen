"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Users, Target, Activity, TrendingUp, Clock, Brain, Mic, BarChart3 } from "lucide-react"

const Dashboard: React.FC = () => {
  const stats = [
    { label: "Total Polls", value: "24", icon: Brain, color: "from-purple-500 to-blue-500", change: "+12%" },
    { label: "Accuracy Rate", value: "87%", icon: Target, color: "from-blue-500 to-teal-500", change: "+5%" },
    { label: "Active Participants", value: "156", icon: Users, color: "from-teal-500 to-green-500", change: "+23%" },
    { label: "Avg Response Time", value: "2.3s", icon: Clock, color: "from-green-500 to-yellow-500", change: "-0.5s" },
  ]

  const recentActivity = [
    { action: "New poll created", time: "2 minutes ago", type: "poll" },
    { action: "Student joined session", time: "5 minutes ago", type: "user" },
    { action: "Audio transcription completed", time: "8 minutes ago", type: "audio" },
    { action: "Question approved", time: "12 minutes ago", type: "question" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="w-4 h-4 inline mr-2" />
            Start Recording
          </motion.button>
          <motion.button
            className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            View Reports
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Participation Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Participation Trends</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 82, 71, 89, 94, 87, 92, 85, 96, 88, 91].map((height, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg flex-1"
                style={{ height: `${height}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === "poll"
                      ? "bg-purple-500/20 text-purple-400"
                      : activity.type === "user"
                        ? "bg-blue-500/20 text-blue-400"
                        : activity.type === "audio"
                          ? "bg-teal-500/20 text-teal-400"
                          : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {activity.type === "poll" && <Brain className="w-4 h-4" />}
                  {activity.type === "user" && <Users className="w-4 h-4" />}
                  {activity.type === "audio" && <Mic className="w-4 h-4" />}
                  {activity.type === "question" && <Activity className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-xl text-left hover:bg-purple-500/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mic className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white font-medium">Start Audio Capture</h4>
            <p className="text-gray-400 text-sm">Begin recording and transcription</p>
          </motion.button>

          <motion.button
            className="p-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-500/30 rounded-xl text-left hover:bg-blue-500/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Brain className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-white font-medium">Review AI Questions</h4>
            <p className="text-gray-400 text-sm">Approve pending questions</p>
          </motion.button>

          <motion.button
            className="p-4 bg-gradient-to-r from-teal-500/20 to-green-500/20 border border-teal-500/30 rounded-xl text-left hover:bg-teal-500/30 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-8 h-8 text-teal-400 mb-2" />
            <h4 className="text-white font-medium">View Analytics</h4>
            <p className="text-gray-400 text-sm">Check performance metrics</p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
