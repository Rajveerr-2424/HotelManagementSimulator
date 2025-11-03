import { type NextRequest, NextResponse } from "next/server"

interface Guest {
  name: string
  duration: number
  payment: number
  roomsRequested: number
  roomType: string
}

interface SimulationParams {
  totalRooms: number
  simulationDays: number
  algorithm: string
  guests: Guest[]
  roomTypeMultipliers: Record<string, number>
}

function greedyAlgorithm(guests: Guest[], totalRoomNights: number, roomTypeMultipliers: Record<string, number>) {
  const guestsWithRatio = guests.map((g) => ({
    ...g,
    roomNights: g.roomsRequested * g.duration,
    profitRatio: g.payment / (g.roomsRequested * g.duration),
  }))

  guestsWithRatio.sort((a, b) => b.profitRatio - a.profitRatio)

  const accepted = []
  const rejected = []
  let usedRoomNights = 0

  for (const guest of guestsWithRatio) {
    if (usedRoomNights + guest.roomNights <= totalRoomNights) {
      accepted.push(guest)
      usedRoomNights += guest.roomNights
    } else {
      rejected.push(guest)
    }
  }

  const totalRevenue = accepted.reduce((sum, g) => sum + g.payment, 0)
  const occupancyRate = (usedRoomNights / totalRoomNights) * 100

  return {
    acceptedGuests: accepted,
    rejectedGuests: rejected,
    totalRevenue,
    usedRoomNights,
    totalRoomNights,
    occupancyRate,
  }
}

function knapsackAlgorithm(guests: Guest[], totalRoomNights: number, roomTypeMultipliers: Record<string, number>) {
  const guestsWithRatio = guests.map((g) => ({
    ...g,
    roomNights: g.roomsRequested * g.duration,
    profitRatio: g.payment / (g.roomsRequested * g.duration),
  }))

  const n = guestsWithRatio.length
  const dp: number[][] = Array(n + 1)
    .fill(null)
    .map(() => Array(totalRoomNights + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= totalRoomNights; w++) {
      const guest = guestsWithRatio[i - 1]
      if (guest.roomNights <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - guest.roomNights] + guest.payment)
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }

  const accepted = []
  let w = totalRoomNights
  for (let i = n; i > 0 && w > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      accepted.push(guestsWithRatio[i - 1])
      w -= guestsWithRatio[i - 1].roomNights
    }
  }

  const rejected = guestsWithRatio.filter((g) => !accepted.includes(g))
  const totalRevenue = accepted.reduce((sum, g) => sum + g.payment, 0)
  const usedRoomNights = accepted.reduce((sum, g) => sum + g.roomNights, 0)
  const occupancyRate = (usedRoomNights / totalRoomNights) * 100

  return {
    acceptedGuests: accepted,
    rejectedGuests: rejected,
    totalRevenue,
    usedRoomNights,
    totalRoomNights,
    occupancyRate,
  }
}

export async function POST(request: NextRequest) {
  try {
    const params: SimulationParams = await request.json()
    const totalRoomNights = params.totalRooms * params.simulationDays

    const result: any = {}

    if (params.algorithm === "greedy" || params.algorithm === "both") {
      result.greedy = greedyAlgorithm(params.guests, totalRoomNights, params.roomTypeMultipliers)
    }

    if (params.algorithm === "knapsack" || params.algorithm === "both") {
      result.knapsack = knapsackAlgorithm(params.guests, totalRoomNights, params.roomTypeMultipliers)
    }

    if (params.algorithm === "greedy") {
      result.knapsack = result.greedy
    } else if (params.algorithm === "knapsack") {
      result.greedy = result.knapsack
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Simulation error:", error)
    return NextResponse.json({ error: "Simulation failed" }, { status: 500 })
  }
}
