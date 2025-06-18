"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Check, X, Clock, Settings, Filter, Play, Edit3, Trash2, Plus } from "lucide-react"

interface Question {
  id: string
  text: string
  options: string[]
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  confidence: number
  status: "pending" | "approved" | "rejected"
  autoLaunch: boolean
  timer: number
}

const AIQuestionFeed: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "What is the primary purpose of machine learning?",
      options: ["Data storage", "Pattern recognition", "Web development", "Database management"],
      difficulty: "Medium",
      category: "Machine Learning",
      confidence: 92,
      status: "pending",
      autoLaunch: false,
      timer: 30,
    },
    {
      id: "2",
      text: "Which algorithm is commonly used for classification tasks?",
      options: ["Linear Regression", "Decision Tree", "K-means", "PCA"],
      difficulty: "Hard",
      category: "Algorithms",
      confidence: 87,
      status: "pending",
      autoLaunch: true,
      timer: 45,
    },
    {
      id: "3",
      text: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Automated Process Integration",
        "Application Process Interface",
      ],
      difficulty: "Easy",
      category: "Programming",
      confidence: 95,
      status: "approved",
      autoLaunch: false,
      timer: 20,
    },
  ])

  const [filters, setFilters] = useState({
    difficulty: "All",
    category: "All",
    status: "All",
  })

  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)

  const handleApprove = (id: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status: "approved" as const } : q)))
  }

  const handleReject = (id: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, status: "rejected" as const } : q)))
  }

  const handleLaunch = (id: string) => {
    // Launch poll logic here
    console.log("Launching poll:", id)
  }

  const handleToggleAutoLaunch = (id: string) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, autoLaunch: !q.autoLaunch } : q)))
  }

  const filteredQuestions = questions.filter((q) => {
    if (filters.difficulty !== "All" && q.difficulty !== filters.difficulty) return false
    if (filters.category !== "All" && q.category !== filters.category) return false
    if (filters.status !== "All" && q.status !== filters.status) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "rejected":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-500/20"
      case "Medium":
        return "text-yellow-400 bg-yellow-500/20"
      case "Hard":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Question Feed</h1>
          <p className="text-gray-400 mt-1">Review and manage AI-generated questions</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4 inline mr-2" />
            Filters
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Question
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">AI Filter Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters((prev) => ({ ...prev, difficulty: e.target.value }))}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Categories</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Algorithms">Algorithms</option>
              <option value="Programming">Programming</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Question Queue */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(question.status)}`}
                      >
                        {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                      >
                        {question.difficulty}
                      </span>
                      <span className="text-xs text-gray-400">{question.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">AI Confidence:</span>
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                          style={{ width: `${question.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs text-white">{question.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {question.status === "pending" && (
                    <>
                      <motion.button
                        onClick={() => handleApprove(question.id)}
                        className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleReject(question.id)}
                        className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    onClick={() => setEditingQuestion(editingQuestion === question.id ? null : question.id)}
                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  {question.status === "approved" && (
                    <motion.button
                      onClick={() => handleLaunch(question.id)}
                      className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Question Content */}
              <div className="mb-4">
                <h4 className="text-lg font-medium text-white mb-3">{question.text}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-300">
                      <span className="text-purple-400 font-medium mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                      {option}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Settings */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Timer:</span>
                    <span className="text-white text-sm">{question.timer}s</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={question.autoLaunch}
                      onChange={() => handleToggleAutoLaunch(question.id)}
                      className="w-4 h-4 text-purple-500 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                    />
                    <span className="text-gray-400 text-sm">Auto-launch</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Edit Mode */}
              <AnimatePresence>
                {editingQuestion === question.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Question Text</label>
                        <textarea
                          defaultValue={question.text}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2">Answer Options</label>
                        <div className="space-y-2">
                          {question.options.map((option, index) => (
                            <input
                              key={index}
                              defaultValue={option}
                              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder={`Option ${String.fromCharCode(65 + index)}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <motion.button
                          onClick={() => setEditingQuestion(null)}
                          className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Save Changes
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredQuestions.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <Brain className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Questions Found</h3>
          <p className="text-gray-500">Try adjusting your filters or generate new questions</p>
        </motion.div>
      )}
    </div>
  )
}

export default AIQuestionFeed
