"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, FlameIcon as Fire, Timer, User, Star, TrendingUp, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface Player {
  id: string
  name: string
  score: number
}

interface MemoryGameProps {
  player: Player
  onScore: (points: number) => void
  timeLeft: number
  round: number
}

// Constants
const INITIAL_DISPLAY_TIME = 3000 // 3 seconds
const MIN_DISPLAY_TIME = 500 // 0.5 seconds minimum
const TOUCH_FEEDBACK_DURATION = 200 // ms
const SPEED_BONUS_THRESHOLD = 1500 // Time in ms under which speed bonus applies

// Get grid size based on current level
const getGridSize = (round: number): number => {
  // Start with 3x3, increase every 3 successful rounds, cap at 7x7
  return Math.min(3 + Math.floor(round / 3), 7)
}

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Generate sequence
const generateSequence = (gridSize: number): number[] => {
  const totalTiles = gridSize * gridSize
  // Sequence length scales with grid size
  const baseLength = Math.floor(gridSize * 1.5)
  const length = Math.min(baseLength, totalTiles)
  const numbers = Array.from({ length: totalTiles }, (_, i) => i + 1)
  return shuffleArray(numbers).slice(0, length)
}

export default function MemoryGame({ player, onScore, timeLeft, round }: MemoryGameProps) {
  const [gameStatus, setGameStatus] = useState<"waiting" | "showing" | "input" | "correct" | "wrong">("waiting")
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [isShowingSequence, setIsShowingSequence] = useState(false)
  const [streak, setStreak] = useState(0)
  const [showEmoji, setShowEmoji] = useState<string | null>(null)
  const [displayTime, setDisplayTime] = useState(INITIAL_DISPLAY_TIME)
  const [gridNumbers, setGridNumbers] = useState<number[]>([])
  const [touchFeedback, setTouchFeedback] = useState<number | null>(null)
  const [sequenceStartTime, setSequenceStartTime] = useState(0)
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false)
  const [lastScoreUpdate, setLastScoreUpdate] = useState<{
    base: number
    streak: number
    grid: number
    sequence: number
    speed: number
    total: number
  } | null>(null)

  const gridSize = getGridSize(round)
  const [level, setLevel] = useState(1)

  // Start a new round
  const startRound = useCallback(() => {
    setGameStatus("showing")
    setPlayerSequence([])
    setShowScoreBreakdown(false)

    const newSequence = generateSequence(gridSize)
    setSequence(newSequence)
    const numbers = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1)
    setGridNumbers(shuffleArray(numbers))
    setIsShowingSequence(true)

    setTimeout(() => {
      setIsShowingSequence(false)
      setGameStatus("input")
      setSequenceStartTime(Date.now())
    }, displayTime)
  }, [displayTime, gridSize])

  // Handle tile click
  const handleTileClick = useCallback(
    (number: number) => {
      if (gameStatus !== "input") return
      if (playerSequence.includes(number)) return

      setTouchFeedback(number)
      setTimeout(() => setTouchFeedback(null), TOUCH_FEEDBACK_DURATION)

      const newPlayerSequence = [...playerSequence, number]
      setPlayerSequence(newPlayerSequence)

      const targetSet = new Set(sequence)
      const playerSet = new Set(newPlayerSequence)

      const isValidTile = targetSet.has(number)

      if (!isValidTile) {
        setGameStatus("wrong")
        setStreak(1)
        setShowEmoji("❌")

        setTimeout(() => {
          setShowEmoji(null)
          startRound()
        }, 1500)
        return
      }

      setGridNumbers((prev) => shuffleArray([...prev]))

      if (newPlayerSequence.length === sequence.length) {
        const allCorrect = [...playerSet].every((num) => targetSet.has(num))

        if (allCorrect) {
          const newStreak = streak + 1
          setStreak(newStreak)

          const currentTime = Date.now()
          const timeToComplete = currentTime - sequenceStartTime

          // Calculate score components
          const basePoints = 10
          const streakMultiplier = 1 + (newStreak - 1) * 0.5
          const pointsWithStreak = Math.floor(basePoints * streakMultiplier)
          // Update gridSizeBonus calculation
          const gridSizeBonus = Math.floor(basePoints * (Math.pow(gridSize - 2, 2) * 0.1))
          const sequenceLengthPoints = Math.max(0, (sequence.length - 3) * 2)
          const speedPoints =
            timeToComplete < SPEED_BONUS_THRESHOLD
              ? Math.floor((1 - timeToComplete / SPEED_BONUS_THRESHOLD) * 5 * sequence.length)
              : 0

          let totalPoints = Math.floor(pointsWithStreak + gridSizeBonus + sequenceLengthPoints + speedPoints)
          totalPoints = Math.round(totalPoints / 5) * 5

          setLastScoreUpdate({
            base: basePoints,
            streak: pointsWithStreak - basePoints,
            grid: gridSizeBonus,
            sequence: sequenceLengthPoints,
            speed: speedPoints,
            total: totalPoints,
          })

          setShowScoreBreakdown(true)
          setGameStatus("correct")
          setShowEmoji("🎯")
          onScore(totalPoints)

          setTimeout(() => {
            setShowEmoji(null)
            setShowScoreBreakdown(false)
            setLevel((prev) => prev + 1)
            setDisplayTime(Math.max(MIN_DISPLAY_TIME, INITIAL_DISPLAY_TIME * Math.pow(0.85, round + 1)))
            startRound()
          }, 2000)
        }
      }
    },
    [gameStatus, playerSequence, sequence, streak, onScore, startRound, gridSize, sequenceStartTime, round],
  )

  // Initialize game
  useEffect(() => {
    startRound()
  }, [startRound])

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 p-4">
      {/* Players and Timer */}
      <div className="w-full max-w-2xl px-2 sm:px-4">
        <div className="flex items-center justify-between mb-2 sm:mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">{player.name}</span>
            <span className="text-lg sm:text-xl font-bold">{player.score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Game Status */}
      <AnimatePresence mode="wait">
        <motion.div
          key={gameStatus}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={cn(
            "text-center px-4",
            "min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem]",
            "flex flex-col items-center justify-center",
          )}
        >
          {gameStatus === "showing" && (
            <div className="text-sm sm:text-base md:text-lg font-medium text-primary">
              Remember {sequence.length} tiles...
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 mt-1">
                <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap px-1.5 py-0.5">
                  Time: {(displayTime / 1000).toFixed(2)}s
                </Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap px-1.5 py-0.5">
                  Level {round}
                </Badge>
                <Badge variant="secondary" className="text-xs sm:text-sm whitespace-nowrap px-1.5 py-0.5">
                  {gridSize}x{gridSize}
                </Badge>
                {displayTime < INITIAL_DISPLAY_TIME && (
                  <Badge
                    variant="destructive"
                    className="text-xs sm:text-sm animate-pulse whitespace-nowrap px-1.5 py-0.5"
                  >
                    Speed +{((INITIAL_DISPLAY_TIME - displayTime) / 1000).toFixed(2)}s
                  </Badge>
                )}
              </div>
            </div>
          )}
          {gameStatus === "input" && (
            <div className="text-lg sm:text-xl font-medium">
              Repeat the sequence! ({playerSequence.length}/{sequence.length})
            </div>
          )}
          {gameStatus === "correct" && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-lg sm:text-xl font-medium text-green-500">
                <Check className="h-5 w-5 sm:h-6 sm:w-6" />
                Perfect! 🎯
              </div>

              {/* Score Breakdown */}
              {showScoreBreakdown && lastScoreUpdate && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-wrap justify-center gap-2 mt-1"
                >
                  <Badge variant="outline" className="text-xs">
                    Base: +{lastScoreUpdate.base}
                  </Badge>

                  {lastScoreUpdate.streak > 0 && (
                    <Badge variant="outline" className="text-xs bg-orange-500/10">
                      <Fire className="h-3 w-3 mr-1 text-orange-500" />
                      Streak: +{lastScoreUpdate.streak}
                    </Badge>
                  )}

                  {lastScoreUpdate.grid > 0 && (
                    <Badge variant="outline" className="text-xs bg-blue-500/10">
                      <TrendingUp className="h-3 w-3 mr-1 text-blue-500" />
                      Grid: +{lastScoreUpdate.grid}
                    </Badge>
                  )}

                  {lastScoreUpdate.sequence > 0 && (
                    <Badge variant="outline" className="text-xs bg-purple-500/10">
                      <Award className="h-3 w-3 mr-1 text-purple-500" />
                      Length: +{lastScoreUpdate.sequence}
                    </Badge>
                  )}

                  {lastScoreUpdate.speed > 0 && (
                    <Badge variant="outline" className="text-xs bg-green-500/10">
                      <Star className="h-3 w-3 mr-1 text-green-500" />
                      Speed: +{lastScoreUpdate.speed}
                    </Badge>
                  )}

                  <Badge variant="secondary" className="text-xs font-bold">
                    Total: +{lastScoreUpdate.total}
                  </Badge>
                </motion.div>
              )}
            </div>
          )}
          {gameStatus === "wrong" && (
            <div className="flex items-center gap-2 text-lg sm:text-xl font-medium text-red-500">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
              Wrong tile! ❌
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Game Grid */}
      <div
        className="grid mx-auto w-full aspect-square"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: "0.5rem",
          maxWidth: "min(calc(100vw - 2rem), calc(100vh - 16rem))",
        }}
      >
        <AnimatePresence mode="popLayout">
          {gridNumbers.map((number) => (
            <motion.div
              key={number}
              layout
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Button
                variant="outline"
                className={cn(
                  "h-full w-full transition-all select-none touch-manipulation",
                  "flex items-center justify-center",
                  isShowingSequence && sequence.includes(number) && "bg-primary text-primary-foreground",
                  gameStatus === "input" && "hover:bg-primary/10 active:bg-primary/20",
                  playerSequence.includes(number) &&
                    sequence.includes(number) &&
                    "bg-secondary text-secondary-foreground",
                  playerSequence.includes(number) &&
                    !sequence.includes(number) &&
                    "bg-destructive text-destructive-foreground",
                  touchFeedback === number && "scale-95 bg-primary/5",
                  "active:scale-95",
                )}
                style={{
                  fontSize: "1rem",
                  minHeight: "2.75rem",
                  minWidth: "2.75rem",
                  padding: "0.5rem",
                  WebkitTouchCallout: "none",
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                }}
                onClick={() => handleTileClick(number)}
                disabled={gameStatus !== "input"}
              >
                {number}
              </Button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Game Info */}
      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-1.5 text-xs sm:text-sm"
          >
            <Fire className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500" />
            <span className="font-medium">Streak: {streak}</span>
            {streak >= 2 && <span className="text-primary font-bold">({(1 + (streak - 1) * 0.5).toFixed(1)}x)</span>}
          </motion.div>
        )}
      </div>
    </div>
  )
}

