"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/lib/auth-client";
import { Star, MessageSquare, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Review {
  id: number;
  userId: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

interface Discussion {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
  parentId?: number;
}

export default function ReviewSection({ bookId, bookTitle }: { bookId: number; bookTitle: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [discussionText, setDiscussionText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
    fetchDiscussions();
  }, [bookId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?bookId=${bookId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const fetchDiscussions = async () => {
    try {
      const response = await fetch(`/api/discussions?bookId=${bookId}&parentId=null`);
      const data = await response.json();
      setDiscussions(data);
    } catch (error) {
      console.error("Failed to fetch discussions:", error);
    }
  };

  const handleSubmitReview = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          bookId,
          rating,
          reviewText,
        }),
      });

      if (response.ok) {
        toast.success("Review submitted successfully! +10 points");
        setRating(0);
        setReviewText("");
        fetchReviews();
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDiscussion = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!discussionText.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: session.user.id,
          bookId,
          content: discussionText,
        }),
      });

      if (response.ok) {
        toast.success("Discussion posted! +5 points");
        setDiscussionText("");
        fetchDiscussions();
      } else {
        toast.error("Failed to post discussion");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Write Review */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Write a Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session?.user ? (
            <>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Your Rating</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Textarea
                  placeholder="Share your thoughts about this book..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSubmitReview} disabled={loading}>
                Submit Review
              </Button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">
                Please log in to write a review
              </p>
              <Button onClick={() => router.push("/login")}>Login</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews List */}
      {reviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Reviews ({reviews.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.reviewText && (
                  <p className="text-sm">{review.reviewText}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Discussions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Discussions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session?.user ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Start a discussion..."
                value={discussionText}
                onChange={(e) => setDiscussionText(e.target.value)}
                rows={3}
              />
              <Button onClick={handleSubmitDiscussion} disabled={loading} className="gap-2">
                <Send className="h-4 w-4" />
                Post Discussion
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground mb-4">
                Please log in to join the discussion
              </p>
              <Button onClick={() => router.push("/login")}>Login</Button>
            </div>
          )}

          {discussions.length > 0 ? (
            <div className="space-y-4 mt-6">
              <h3 className="font-semibold">Recent Discussions</h3>
              {discussions.map((discussion) => (
                <div key={discussion.id} className="border-l-2 border-primary pl-4">
                  <p className="text-sm mb-2">{discussion.content}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(discussion.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No discussions yet. Be the first to start one!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}