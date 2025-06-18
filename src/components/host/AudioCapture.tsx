"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, Play, Pause, Square, Volume2, Settings, Activity, Zap } from "lucide-react"

const AudioCapture: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcription, setTranscription] = useState("")
  const [accuracy, setAccuracy] = useState(94)
  const [selectedMic, setSelectedMic] = useState("Default Microphone")

  // Simulate recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording, isPaused])

  // Simulate real-time transcription
  useEffect(() => {
    if (isRecording && !isPaused) {
      const sampleTexts = [
        "Today we're going to discuss the fundamentals of machine learning...",
        "Machine learning is a subset of artificial intelligence that focuses on...",
        "There are three main types of machine learning: supervised, unsupervised, and reinforcement learning...",
        "Supervised learning uses labeled data to train models that can make predictions...",
        "Neural networks are inspired by the structure and function of the human brain...",
      ]

      const interval = setInterval(() => {
        const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
        setTranscription((prev) => prev + " " + randomText)
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isRecording, isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setIsPaused(false)
    setTranscription("")
    setRecordingTime(0)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
  }

  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  // Generate waveform data
  const waveformData = Array.from({ length: 50 }, () => Math.random() * 100)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Audio Capture</h1>
          <p className="text-gray-400 mt-1">Record and transcribe audio in real-time</p>
        </div>
        <motion.button
          className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4 h-4 inline mr-2" />
          Audio Settings
        </motion.button>
      </div>

      {/* Recording Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Recording Controls</h3>

          {/* Recording Button */}
          <div className="text-center mb-6">
            <motion.button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl ${
                isRecording
                  ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-red-500/50"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 shadow-purple-500/50"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={isRecording ? { scale: [1, 1.05, 1] } : {}}
              transition={isRecording ? { duration: 1, repeat: Number.POSITIVE_INFINITY } : {}}
            >
              {isRecording ? <Square className="w-8 h-8 text-white" /> : <Mic className="w-8 h-8 text-white" />}
            </motion.button>
            <p className="text-white mt-2 font-medium">{isRecording ? "Stop Recording" : "Start Recording"}</p>
          </div>

          {/* Secondary Controls */}
          {isRecording && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center space-x-4">
              <motion.button
                onClick={handlePauseResume}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPaused ? <Play className="w-5 h-5 text-white" /> : <Pause className="w-5 h-5 text-white" />}
              </motion.button>
            </motion.div>
          )}

          {/* Recording Info */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Duration:</span>
              <span className="text-white font-mono">{formatTime(recordingTime)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-medium ${
                  isRecording ? (isPaused ? "text-yellow-400" : "text-green-400") : "text-gray-400"
                }`}
              >
                {isRecording ? (isPaused ? "Paused" : "Recording") : "Stopped"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Waveform Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Audio Waveform</h3>

          <div className="h-32 flex items-end justify-center space-x-1">
            {waveformData.map((height, index) => (
              <motion.div
                key={index}
                className={`w-2 bg-gradient-to-t rounded-full ${
                  isRecording && !isPaused ? "from-purple-500 to-blue-500" : "from-gray-600 to-gray-500"
                }`}
                style={{ height: `${height}%` }}
                animate={
                  isRecording && !isPaused
                    ? {
                        height: [`${height}%`, `${Math.random() * 100}%`, `${height}%`],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: isRecording && !isPaused ? Number.POSITIVE_INFINITY : 0,
                  delay: index * 0.05,
                }}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-center space-x-2">
            <Volume2 className="w-4 h-4 text-gray-400" />
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                style={{ width: `${isRecording ? 75 : 0}%` }}
                animate={{ width: isRecording ? ["0%", "75%"] : "0%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Accuracy & Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Audio Quality</h3>

          {/* Accuracy Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Accuracy</span>
              <span className="text-white font-semibold">{accuracy}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                style={{ width: `${accuracy}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${accuracy}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>

          {/* Microphone Selector */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Microphone</label>
            <select
              value={selectedMic}
              onChange={(e) => setSelectedMic(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Default Microphone">Default Microphone</option>
              <option value="USB Microphone">USB Microphone</option>
              <option value="Bluetooth Headset">Bluetooth Headset</option>
            </select>
          </div>

          {/* Quick Stats */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">Signal</span>
              </div>
              <span className="text-green-400 font-medium">Strong</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Processing</span>
              </div>
              <span className="text-blue-400 font-medium">Real-time</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Transcription */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Real-time Transcription</h3>

        <div className="bg-black/20 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
          {transcription ? (
            <motion.p className="text-gray-300 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {transcription}
              {isRecording && !isPaused && (
                <motion.span
                  className="inline-block w-2 h-5 bg-purple-400 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                />
              )}
            </motion.p>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-gray-500 text-center">
                {isRecording ? "Listening for audio..." : "Start recording to see transcription"}
              </p>
            </div>
          )}
        </div>

        {transcription && (
          <div className="mt-4 flex justify-end space-x-3">
            <motion.button
              className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Copy Text
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Export Transcript
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default AudioCapture
