"use client"

import type React from "react"
import { motion } from "framer-motion"

const OrbitalLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Central orbital system */}
      <div className="relative">
        {/* Central core */}
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-2xl shadow-purple-500/50"
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Orbital rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 border border-purple-400/30 rounded-full"
            style={{
              width: `${80 + ring * 40}px`,
              height: `${80 + ring * 40}px`,
              left: `${-ring * 20}px`,
              top: `${-ring * 20}px`,
            }}
            animate={{
              rotate: ring % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 4 + ring,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* Orbital particles */}
            <motion.div
              className="absolute w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50"
              style={{
                top: -6,
                left: "50%",
                marginLeft: -6,
              }}
            />
            <motion.div
              className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
              style={{
                bottom: -4,
                right: "25%",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Poll Generation System</h2>
        <motion.div
          className="text-purple-300"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          Initializing AI Engine...
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OrbitalLoader
