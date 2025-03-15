"use client"

import { useEffect } from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Brain, Trophy, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import MemoryGame from "../memory-game"

interface Player {
  id: string
  name: string
  score: number
}

export default function GamePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const playerName = searchParams.get("name") || "Player"

  const [gameState, setGameState] = useState<"waiting" | "playing" | "finished">("waiting")
  const [player, setPlayer] = useState<Player>({ id: "player", name: playerName, score: 0 })
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const [round, setRound] = useState(0)

  // Start game timer
  useEffect(() => {
    if (gameState !== "playing") return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setGameState("finished")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState])

  // Handle player score update
  const handleScore = (points: number) => {
    setPlayer((prev) => ({
      ...prev,
      score: prev.score + points,
    }))
    setRound((prev) => prev + 1)
  }

  // Start game
  const handleStartGame = () => {
    setGameState("playing")
    setTimeLeft(180)
    setRound(1)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-6" onClick={() => router.push("/play/duel")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Memory Challenge
              </CardTitle>
            </div>
            <CardDescription>Complete memory sequences to earn points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {/* Game Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{player.name}</span>
                  <span className="text-lg font-bold">{player.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="font-medium">Best Score: 1,234</span>
                </div>
              </div>

              {/* Timer */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Time Remaining</span>
                  <span>{formatTime(timeLeft)}</span>
                </div>
                <Progress value={(timeLeft / 180) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>

        {gameState === "waiting" ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-6 p-6">
              <Brain className="h-12 w-12 text-primary" />
              <div className="text-center">
                <h2 className="text-2xl font-bold">Ready to Start?</h2>
                <p className="text-muted-foreground mt-2">
                  Test your memory skills! The grid will get larger as you progress.
                </p>
              </div>
              <Button size="lg" onClick={handleStartGame}>
                Start Game
              </Button>
            </CardContent>
          </Card>
        ) : (
          <MemoryGame player={player} onScore={handleScore} timeLeft={timeLeft} round={round} />
        )}

        {gameState === "finished" && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Game Over!</CardTitle>
              <CardDescription>You scored {player.score} points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button onClick={() => router.push("/play/duel")}>Back to Menu</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setGameState("waiting")
                    setPlayer((prev) => ({ ...prev, score: 0 }))
                    setRound(0)
                  }}
                >
                  Play Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

