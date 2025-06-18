"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Award, Target, Clock, TrendingUp, Users } from "lucide-react"

interface LeaderboardEntry {
  id: string
  name: string
  pollsAttempted: number
  accuracy: number
  avgTime: number
  totalPoints: number
  rank: number
  badge: "gold" | "silver" | "bronze" | null
}

const Leaderboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<"global" | "meeting">("global")

  const leaderboardData: LeaderboardEntry[] = [
    {
      id: "1",
      name: "Carol Davis",
      pollsAttempted: 18,
      accuracy: 95,
      avgTime: 1.8,
      totalPoints: 1710,
      rank: 1,
      badge: "gold",
    },
    {
      id: "2",
      name: "Alice Johnson",
      pollsAttempted: 15,
      accuracy: 92,
      avgTime: 2.3,
      totalPoints: 1380,
      rank: 2,
      badge: "silver",
    },
    {
      id: "3",
      name: "Bob Smith",
      pollsAttempted: 12,
      accuracy: 87,
      avgTime: 3.1,
      totalPoints: 1044,
      rank: 3,
      badge: "bronze",
    },
    {
      id: "4",
      name: "David Wilson",
      pollsAttempted: 8,
      accuracy: 78,
      avgTime: 4.2,
      totalPoints: 624,
      rank: 4,
      badge: null,
    },
    {
      id: "5",
      name: "Emma Brown",
      pollsAttempted: 10,
      accuracy: 85,
      avgTime: 2.9,
      totalPoints: 850,
      rank: 5,
      badge: null,
    },
  ]

  const getBadgeIcon = (badge: string | null) => {
    switch (badge) {
      case "gold":
        return <Trophy className="w-6 h-6 text-yellow-400" />
      case "silver":
        return <Medal className="w-6 h-6 text-gray-300" />
      case "bronze":
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <div className="w-6 h-6" />
    }
  }

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case "gold":
        return "from-yellow-400 to-yellow-600"
      case "silver":
        return "from-gray-300 to-gray-500"
      case "bronze":
        return "from-amber-600 to-amber-800"
      default:
        return "from-purple-500 to-blue-500"
    }
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
          <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          <p className="text-gray-400 mt-1">Top performing participants</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-white/10 border border-white/20 rounded-lg p-1">
            <button
              onClick={() => setViewMode("global")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === "global"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setViewMode("meeting")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                viewMode === "meeting"
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              This Meeting
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Participants",
            value: leaderboardData.length,
            icon: Users,
            color: "from-purple-500 to-blue-500",
          },
          {
            label: "Highest Accuracy",
            value: `${Math.max(...leaderboardData.map((p) => p.accuracy))}%`,
            icon: Target,
            color: "from-blue-500 to-teal-500",
          },
          {
            label: "Fastest Response",
            value: `${Math.min(...leaderboardData.map((p) => p.avgTime))}s`,
            icon: Clock,
            color: "from-teal-500 to-green-500",
          },
          {
            label: "Total Polls",
            value: leaderboardData.reduce((acc, p) => acc + p.pollsAttempted, 0),
            icon: TrendingUp,
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

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8"
      >
        <h3 className="text-xl font-semibold text-white mb-6 text-center">Top Performers</h3>

        <div className="flex items-end justify-center space-x-8">
          {/* Second Place */}
          {leaderboardData[1] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-gray-300/50">
                  <span className="text-white text-2xl font-bold">{leaderboardData[1].name.charAt(0)}</span>
                </div>
                <div className="absolute -top-2 -right-2">
                  <Medal className="w-8 h-8 text-gray-300" />
                </div>
              </div>
              <div className="bg-gradient-to-t from-gray-300/20 to-gray-300/10 rounded-lg p-4 h-24 flex flex-col justify-end">
                <h4 className="text-white font-semibold">{leaderboardData[1].name}</h4>
                <p className="text-gray-300 text-sm">{leaderboardData[1].totalPoints} pts</p>
                <div className="text-xs text-gray-400 mt-1">
                  {leaderboardData[1].accuracy}% • {leaderboardData[1].avgTime}s
                </div>
              </div>
            </motion.div>
          )}

          {/* First Place */}
          {leaderboardData[0] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-yellow-400/50">
                  <span className="text-white text-3xl font-bold">{leaderboardData[0].name.charAt(0)}</span>
                </div>
                <div className="absolute -top-3 -right-3">
                  <Trophy className="w-10 h-10 text-yellow-400" />
                </div>
              </div>
              <div className="bg-gradient-to-t from-yellow-400/20 to-yellow-400/10 rounded-lg p-4 h-32 flex flex-col justify-end">
                <h4 className="text-white font-semibold text-lg">{leaderboardData[0].name}</h4>
                <p className="text-yellow-300 text-base font-medium">{leaderboardData[0].totalPoints} pts</p>
                <div className="text-sm text-gray-300 mt-1">
                  {leaderboardData[0].accuracy}% • {leaderboardData[0].avgTime}s
                </div>
              </div>
            </motion.div>
          )}

          {/* Third Place */}
          {leaderboardData[2] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="relative mb-4">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-amber-600/50">
                  <span className="text-white text-2xl font-bold">{leaderboardData[2].name.charAt(0)}</span>
                </div>
                <div className="absolute -top-2 -right-2">
                  <Award className="w-8 h-8 text-amber-600" />
                </div>
              </div>
              <div className="bg-gradient-to-t from-amber-600/20 to-amber-600/10 rounded-lg p-4 h-20 flex flex-col justify-end">
                <h4 className="text-white font-semibold">{leaderboardData[2].name}</h4>
                <p className="text-amber-300 text-sm">{leaderboardData[2].totalPoints} pts</p>
                <div className="text-xs text-gray-400 mt-1">
                  {leaderboardData[2].accuracy}% • {leaderboardData[2].avgTime}s
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Full Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-semibold text-white">Complete Rankings</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Participant</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Points</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Polls Attempted</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Accuracy</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Avg Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {leaderboardData.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-all"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold text-lg">#{entry.rank}</span>
                      {getBadgeIcon(entry.badge)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${getBadgeColor(entry.badge)} rounded-full flex items-center justify-center`}
                      >
                        <span className="text-white text-sm font-semibold">{entry.name.charAt(0)}</span>
                      </div>
                      <span className="text-white font-medium">{entry.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold text-lg">{entry.totalPoints}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{entry.pollsAttempted}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getAccuracyColor(entry.accuracy)}`}>{entry.accuracy}%</span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${
                            entry.accuracy >= 90
                              ? "bg-green-500"
                              : entry.accuracy >= 80
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${entry.accuracy}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{entry.avgTime}s</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Achievement Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Speed Demon",
              description: "Fastest average response time",
              user: "Carol Davis",
              icon: Clock,
              color: "from-blue-500 to-teal-500",
            },
            {
              title: "Accuracy Master",
              description: "Highest accuracy rate",
              user: "Carol Davis",
              icon: Target,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Poll Champion",
              description: "Most polls completed",
              user: "Carol Davis",
              icon: Trophy,
              color: "from-yellow-500 to-orange-500",
            },
          ].map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center`}
                >
                  <achievement.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{achievement.title}</h4>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </div>
              </div>
              <p className="text-purple-400 text-sm font-medium">{achievement.user}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Leaderboard
