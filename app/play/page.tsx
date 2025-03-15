import Link from "next/link"
import { Brain, Trophy, Medal, Zap, Crown, Timer, Users, Sparkles, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GameModes() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Game Modes</h1>
          <p className="text-muted-foreground">Choose your challenge and start training your brain</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Duel Mode */}
          <Link href="/play/duel">
            <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <CardTitle>Duel Mode</CardTitle>
                <CardDescription>Quick 1v1 battles testing memory, logic, and speed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">60-90 sec</Badge>
                  <Badge variant="outline">Real-time</Badge>
                  <Badge variant="outline">Ranked</Badge>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>1,234 playing</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>Win XP & Trophies</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Tournament Mode */}
          <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Trophy className="h-6 w-6" />
                </div>
                <Badge>Coming Soon</Badge>
              </div>
              <CardTitle>Tournament Mode</CardTitle>
              <CardDescription>Compete in bracket-style tournaments for glory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">16-64 Players</Badge>
                <Badge variant="outline">Brackets</Badge>
                <Badge variant="outline">Prizes</Badge>
              </div>
              <Button className="mt-4 w-full" disabled>
                <Lock className="mr-2 h-4 w-4" />
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* League Mode */}
          <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Medal className="h-6 w-6" />
                </div>
                <Badge variant="secondary">Season 1</Badge>
              </div>
              <CardTitle>League Mode</CardTitle>
              <CardDescription>Climb divisions and compete for seasonal rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Ranked</Badge>
                <Badge variant="outline">30 Days</Badge>
                <Badge variant="outline">Divisions</Badge>
              </div>
              <Button className="mt-4 w-full" variant="secondary">
                <Crown className="mr-2 h-4 w-4" />
                Join Season
              </Button>
            </CardContent>
          </Card>

          {/* AI Training */}
          <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Brain className="h-6 w-6" />
                </div>
                <Badge variant="secondary">Premium</Badge>
              </div>
              <CardTitle>AI Training</CardTitle>
              <CardDescription>Personalized cognitive workouts adapted to you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Adaptive</Badge>
                <Badge variant="outline">Personal</Badge>
                <Badge variant="outline">Analytics</Badge>
              </div>
              <Button className="mt-4 w-full" variant="secondary">
                <Sparkles className="mr-2 h-4 w-4" />
                Try Free
              </Button>
            </CardContent>
          </Card>

          {/* Memory Royale */}
          <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <Badge>Beta</Badge>
              </div>
              <CardTitle>Memory Royale</CardTitle>
              <CardDescription>100+ player survival memory challenge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Battle Royale</Badge>
                <Badge variant="outline">Survival</Badge>
                <Badge variant="outline">Mass</Badge>
              </div>
              <Button className="mt-4 w-full" variant="secondary">
                Join Beta
              </Button>
            </CardContent>
          </Card>

          {/* Speed Brawl */}
          <Card className="group relative overflow-hidden transition-all hover:border-primary/50">
            <CardHeader>
              <div className="mb-2 flex items-center justify-between">
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <Timer className="h-6 w-6" />
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
              <CardTitle>Speed Brawl</CardTitle>
              <CardDescription>Rapid-fire challenges against the clock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">2 Minutes</Badge>
                <Badge variant="outline">Fast</Badge>
                <Badge variant="outline">Score</Badge>
              </div>
              <Button className="mt-4 w-full" variant="secondary">
                Quick Play
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

