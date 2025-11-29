"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star, MessageSquare, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface UserPoints {
  id: number;
  userId: string;
  totalPoints: number;
  reviewsCount: number;
  discussionsCount: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<UserPoints[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard?limit=50");
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="text-lg font-semibold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500">1st Place</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400">2nd Place</Badge>;
    if (rank === 3) return <Badge className="bg-amber-700">3rd Place</Badge>;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most active community members! Earn points by writing reviews and participating in discussions.
          </p>
        </div>

        {/* Points System Explanation */}
        <Card className="max-w-3xl mx-auto mb-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              How to Earn Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Write a Review</h4>
                  <p className="text-sm text-muted-foreground">Earn 10 points for each book review</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Join Discussions</h4>
                  <p className="text-sm text-muted-foreground">Earn 5 points for each discussion post</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
            <CardDescription>
              {leaderboard.length > 0 
                ? `Showing top ${leaderboard.length} community members`
                : "No contributors yet. Be the first!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Contributors Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Be the first to join the leaderboard by writing reviews and joining discussions!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((user, index) => {
                  const rank = index + 1;
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                        rank <= 3 ? "bg-primary/5 border-2 border-primary/20" : "hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center justify-center w-12">
                        {getRankIcon(rank)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">User {user.userId.slice(0, 8)}</h4>
                          {getRankBadge(rank)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {user.reviewsCount} reviews
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {user.discussionsCount} discussions
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {user.totalPoints}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
