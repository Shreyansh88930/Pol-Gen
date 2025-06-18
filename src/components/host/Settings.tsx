"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { SettingsIcon, Moon, Sun, Clock, Play, Shield, Mic, Palette, Save, RotateCcw } from "lucide-react"

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    defaultTimer: 30,
    autoLaunch: true,
    screenshotDetection: true,
    audioInput: "Default Microphone",
    theme: "purple",
    notifications: true,
    autoSave: true,
    language: "English",
  })

  type SettingKey = keyof typeof settings
  type SettingValue = boolean | number | string

  const handleSettingChange = (key: SettingKey, value: SettingValue) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved:", settings)
  }

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      darkMode: true,
      defaultTimer: 30,
      autoLaunch: true,
      screenshotDetection: true,
      audioInput: "Default Microphone",
      theme: "purple",
      notifications: true,
      autoSave: true,
      language: "English",
    })
  }

  const themeColors = [
    { name: "purple", color: "from-purple-500 to-blue-500" },
    { name: "blue", color: "from-blue-500 to-teal-500" },
    { name: "teal", color: "from-teal-500 to-green-500" },
    { name: "green", color: "from-green-500 to-emerald-500" },
    { name: "orange", color: "from-orange-500 to-red-500" },
    { name: "pink", color: "from-pink-500 to-purple-500" },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Customize your polling experience</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            onClick={handleReset}
            className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reset
          </motion.button>
          <motion.button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-purple-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save className="w-4 h-4 inline mr-2" />
            Save Changes
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2" />
            General Settings
          </h3>

          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {settings.darkMode ? (
                  <Moon className="w-5 h-5 text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-400" />
                )}
                <div>
                  <label className="text-white font-medium">Dark Mode</label>
                  <p className="text-gray-400 text-sm">Toggle dark/light theme</p>
                </div>
              </div>
              <motion.button
                onClick={() => handleSettingChange("darkMode", !settings.darkMode)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  settings.darkMode ? "bg-purple-500" : "bg-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.darkMode ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Default Timer */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <label className="text-white font-medium">Default Timer</label>
                  <p className="text-gray-400 text-sm">Default time limit for polls</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="10"
                  max="120"
                  value={settings.defaultTimer}
                  onChange={(e) => handleSettingChange("defaultTimer", Number.parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-white font-medium w-12">{settings.defaultTimer}s</span>
              </div>
            </div>

            {/* Auto Launch */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Play className="w-5 h-5 text-green-400" />
                <div>
                  <label className="text-white font-medium">Enable Auto-Launch</label>
                  <p className="text-gray-400 text-sm">Automatically launch approved polls</p>
                </div>
              </div>
              <motion.button
                onClick={() => handleSettingChange("autoLaunch", !settings.autoLaunch)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  settings.autoLaunch ? "bg-green-500" : "bg-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.autoLaunch ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Language */}
            <div>
              <label className="block text-white font-medium mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange("language", e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Settings
          </h3>

          <div className="space-y-6">
            {/* Screenshot Detection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-red-400" />
                <div>
                  <label className="text-white font-medium">Screenshot Detection</label>
                  <p className="text-gray-400 text-sm">Detect and prevent screenshots</p>
                </div>
              </div>
              <motion.button
                onClick={() => handleSettingChange("screenshotDetection", !settings.screenshotDetection)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  settings.screenshotDetection ? "bg-red-500" : "bg-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.screenshotDetection ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Audio Input Selector */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Mic className="w-5 h-5 text-teal-400" />
                <div>
                  <label className="text-white font-medium">Audio Input Device</label>
                  <p className="text-gray-400 text-sm">Select microphone for recording</p>
                </div>
              </div>
              <select
                value={settings.audioInput}
                onChange={(e) => handleSettingChange("audioInput", e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Default Microphone">Default Microphone</option>
                <option value="USB Microphone">USB Microphone</option>
                <option value="Bluetooth Headset">Bluetooth Headset</option>
                <option value="Built-in Microphone">Built-in Microphone</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Push Notifications</label>
                <p className="text-gray-400 text-sm">Receive notifications for events</p>
              </div>
              <motion.button
                onClick={() => handleSettingChange("notifications", !settings.notifications)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  settings.notifications ? "bg-blue-500" : "bg-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.notifications ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>

            {/* Auto Save */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-white font-medium">Auto Save</label>
                <p className="text-gray-400 text-sm">Automatically save changes</p>
              </div>
              <motion.button
                onClick={() => handleSettingChange("autoSave", !settings.autoSave)}
                className={`relative w-12 h-6 rounded-full transition-all ${
                  settings.autoSave ? "bg-green-500" : "bg-gray-600"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                  animate={{ x: settings.autoSave ? 24 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Theme Customizer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Theme Customizer
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {themeColors.map((theme) => (
            <motion.button
              key={theme.name}
              onClick={() => handleSettingChange("theme", theme.name)}
              className={`relative p-4 rounded-xl bg-gradient-to-r ${theme.color} transition-all ${
                settings.theme === theme.name ? "ring-2 ring-white ring-offset-2 ring-offset-gray-900" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-8 rounded-lg bg-white/20" />
              <p className="text-white text-sm font-medium mt-2 capitalize">{theme.name}</p>
              {settings.theme === theme.name && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                >
                  <span className="text-gray-900 text-sm">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Advanced Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Advanced Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              min="5"
              max="120"
              defaultValue="30"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Max Participants</label>
            <input
              type="number"
              min="1"
              max="1000"
              defaultValue="100"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Data Retention (days)</label>
            <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
              <option value="365">1 year</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Export Format</label>
            <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="csv">CSV</option>
              <option value="xlsx">Excel</option>
              <option value="json">JSON</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Settings
