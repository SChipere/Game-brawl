import Link from "next/link"
import { ArrowRight, Brain, Crown, Trophy, Users, Zap, Timer, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SideBannerAd } from "@/components/ads/side-banner-ad"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SideBannerAd position="left" />
      <SideBannerAd position="right" />

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-background/80 px-4 py-24">
        <div className="container relative z-10 mx-auto flex flex-col items-center text-center">
          <h1 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">Mind</span> <span className="text-secondary">Brawl</span>
            <br />
            <span className="text-foreground">dominate minds</span>
          </h1>
          <p className="mb-8 max-w-[600px] text-muted-foreground md:text-xl">
            Challenge your mind with exciting brain games. Compete with friends and climb the global rankings.
          </p>
          <div className="flex flex-col w-full gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/play">
                Play Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/auth/signup">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-center text-3xl font-bold">Game Modes</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/play/duel">
            <Card className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <CardTitle>Duel Mode</CardTitle>
                <CardDescription>Quick 1v1 battles testing memory and logic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>1,234 playing</span>
                  <Badge variant="outline">Ranked</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/play/tournament">
            <Card className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <Badge>Active</Badge>
                </div>
                <CardTitle>Tournament</CardTitle>
                <CardDescription>Compete in elimination brackets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Next in 2h 15m</span>
                  <Badge variant="outline">16 Players</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/play/league">
            <Card className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Crown className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">Season 1</Badge>
                </div>
                <CardTitle>League</CardTitle>
                <CardDescription>Climb divisions and compete for rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Week 3/12</span>
                  <Badge variant="outline">Divisions</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/play/reaction">
            <Card className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Timer className="h-6 w-6" />
                  </div>
                  <Badge>New</Badge>
                </div>
                <CardTitle>Reaction</CardTitle>
                <CardDescription>Test your reaction speed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Best: 215ms</span>
                  <Badge variant="outline">Speed</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/play/logic">
            <Card className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Brain className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">Training</Badge>
                </div>
                <CardTitle>Logic</CardTitle>
                <CardDescription>Solve challenging puzzles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Daily Challenge</span>
                  <Badge variant="outline">Puzzle</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/play/royale">
            <Card className="transition-all hover:border-primary/50">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Zap className="h-6 w-6" />
                  </div>
                  <Badge>Beta</Badge>
                </div>
                <CardTitle>Memory Royale</CardTitle>
                <CardDescription>100+ player survival challenge</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Coming Soon</span>
                  <Badge variant="outline">Battle Royale</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Rankings */}
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold">Global Rankings</h2>
            <p className="text-muted-foreground">Top players this season</p>
          </div>

          <div className="grid gap-4">
            {topPlayers.map((player, index) => (
              <Card key={player.id} className="transition-all hover:bg-muted/50">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{player.rank}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">{player.trophies.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Trophies</p>
                    </div>
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/rankings">View Full Rankings</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

const topPlayers = [
  {
    id: 1,
    name: "MindMaster",
    rank: "Grandmaster",
    trophies: 15420,
  },
  {
    id: 2,
    name: "BrainLord",
    rank: "Diamond I",
    trophies: 14380,
  },
  {
    id: 3,
    name: "NeuroNinja",
    rank: "Diamond II",
    trophies: 13950,
  },
  {
    id: 4,
    name: "LogicKing",
    rank: "Diamond III",
    trophies: 13245,
  },
  {
    id: 5,
    name: "MemoryQueen",
    rank: "Platinum I",
    trophies: 12890,
  },
]

