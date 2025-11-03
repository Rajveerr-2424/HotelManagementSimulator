"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import type { SimulationResult } from "@/types"

export default function Home() {
  const [results, setResults] = useState<SimulationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [learningMode, setLearningMode] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRunSimulation = async (params: any) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      })

      if (!response.ok) {
        throw new Error("Simulation failed")
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Simulation error:", error)
      setError("Failed to run simulation. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <Sidebar onRunSimulation={handleRunSimulation} loading={loading} />
      <Dashboard results={results} loading={loading} learningMode={learningMode} setLearningMode={setLearningMode} />
    </div>
  )
}
