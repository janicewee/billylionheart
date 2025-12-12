import { NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews, userPoints } from '@/db/schema';

export async function GET() {
  try {
    const allReviews = await db.select().from(reviews);
    const allUserPoints = await db.select().from(userPoints);
    
    // Group reviews by user
    const reviewsByUser = new Map<string, number>();
    for (const review of allReviews) {
      reviewsByUser.set(review.userId, (reviewsByUser.get(review.userId) || 0) + 1);
    }
    
    return NextResponse.json({
      totalReviews: allReviews.length,
      reviewsByUser: Object.fromEntries(reviewsByUser),
      userPointsRecords: allUserPoints,
      allReviews
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
