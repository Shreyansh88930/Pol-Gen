"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, CheckCircle, AlertCircle, LogOut, User, Trophy, Target } from "lucide-react"

interface User {
  name: string
  // Add other user properties here as needed
}

interface StudentDashboardProps {
  user: User
  onLogout: () => void
}

interface Question {
  id: string
  text: string
  options: string[]
  timeLimit: number
  correctAnswer?: number
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [stats] = useState({
    totalAnswered: 12,
    accuracy: 87,
    avgTime: 2.3,
    rank: 5,
  })

  // Sample question (moved outside component to avoid useEffect dependency warning)
  const sampleQuestion: Question = {
    id: "1",
    text: "What is the primary purpose of machine learning?",
    options: [
      "Data storage and management",
      "Pattern recognition and prediction",
      "Web development and design",
      "Database administration",
    ],
    timeLimit: 30,
    correctAnswer: 1,
  }

  useEffect(() => {
    // Simulate receiving a new question
    const timer = setTimeout(() => {
      setCurrentQuestion(sampleQuestion)
      setTimeLeft(sampleQuestion.timeLimit)
      setIsAnswered(false)
      setShowResult(false)
      setSelectedAnswer(null)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && currentQuestion && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentQuestion && !isAnswered) {
      handleSubmit()
    }
  }, [timeLeft, currentQuestion, isAnswered])

  const handleAnswerSelect = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (currentQuestion) {
      setIsAnswered(true)
      setTimeout(() => {
        setShowResult(true)
      }, 500)
    }
  }

  const getProgressColor = () => {
    const percentage = (timeLeft / (currentQuestion?.timeLimit || 1)) * 100
    if (percentage > 60) return "bg-green-500"
    if (percentage > 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome, {user.name}</h1>
            <p className="text-gray-400">Student Dashboard</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Questions Answered",
            value: stats.totalAnswered,
            icon: CheckCircle,
            color: "from-blue-500 to-teal-500",
          },
          { label: "Accuracy Rate", value: `${stats.accuracy}%`, icon: Target, color: "from-teal-500 to-green-500" },
          {
            label: "Avg Response Time",
            value: `${stats.avgTime}s`,
            icon: Clock,
            color: "from-green-500 to-yellow-500",
          },
          { label: "Current Rank", value: `#${stats.rank}`, icon: Trophy, color: "from-yellow-500 to-orange-500" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!currentQuestion ? (
            <motion.div
              key="waiting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Waiting for Next Question</h2>
              <p className="text-gray-400">Your instructor will launch the next poll shortly...</p>

              {/* Animated dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8"
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              {/* Timer */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Time Remaining</span>
                  <span className="text-white font-mono text-lg">{timeLeft}s</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div
                    className={`h-full rounded-full transition-all duration-1000 ${getProgressColor()}`}
                    style={{ width: `${(timeLeft / currentQuestion.timeLimit) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6">{currentQuestion.text}</h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedAnswer === index
                          ? showResult
                            ? index === currentQuestion.correctAnswer
                              ? "border-green-500 bg-green-500/20 text-green-300"
                              : "border-red-500 bg-red-500/20 text-red-300"
                            : "border-purple-500 bg-purple-500/20 text-white"
                          : showResult && index === currentQuestion.correctAnswer
                            ? "border-green-500 bg-green-500/20 text-green-300"
                            : "border-white/20 bg-white/5 text-gray-300 hover:border-purple-400 hover:bg-purple-500/10"
                      } ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
                      whileHover={!isAnswered ? { scale: 1.02 } : {}}
                      whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswer === index
                              ? showResult
                                ? index === currentQuestion.correctAnswer
                                  ? "border-green-500 bg-green-500"
                                  : "border-red-500 bg-red-500"
                                : "border-purple-500 bg-purple-500"
                              : showResult && index === currentQuestion.correctAnswer
                                ? "border-green-500 bg-green-500"
                                : "border-gray-400"
                          }`}
                        >
                          <span className="text-white font-semibold">{String.fromCharCode(65 + index)}</span>
                        </div>
                        <span className="flex-1">{option}</span>
                        {showResult && (
                          <div>
                            {index === currentQuestion.correctAnswer ? (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : selectedAnswer === index ? (
                              <AlertCircle className="w-6 h-6 text-red-400" />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              {!isAnswered && selectedAnswer !== null && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                  <motion.button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Answer
                  </motion.button>
                </motion.div>
              )}

              {/* Result */}
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span className="text-green-400 font-semibold">Correct!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-400" />
                        <span className="text-red-400 font-semibold">Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-300 text-center">
                    {selectedAnswer === currentQuestion.correctAnswer
                      ? "Great job! You got it right."
                      : `The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswer!]}`}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg p-3 max-w-sm"
      >
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <p className="text-xs text-gray-300">
            Security monitoring active. Screenshots and copy/paste are disabled during polls.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default StudentDashboard
