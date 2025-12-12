import { db } from '../src/db';
import { reviews, discussions, userPoints } from '../src/db/schema';
import { eq, sql } from 'drizzle-orm';

async function backfillUserPoints() {
  console.log('Starting user points backfill...');

  try {
    // Get all unique users from reviews
    const allReviews = await db.select().from(reviews);
    const allDiscussions = await db.select().from(discussions);

    // Group by userId
    const userStats = new Map<string, { reviewsCount: number; discussionsCount: number }>();

    // Count reviews per user
    for (const review of allReviews) {
      const stats = userStats.get(review.userId) || { reviewsCount: 0, discussionsCount: 0 };
      stats.reviewsCount += 1;
      userStats.set(review.userId, stats);
    }

    // Count discussions per user
    for (const discussion of allDiscussions) {
      const stats = userStats.get(discussion.userId) || { reviewsCount: 0, discussionsCount: 0 };
      stats.discussionsCount += 1;
      userStats.set(discussion.userId, stats);
    }

    console.log(`Found ${userStats.size} unique users`);

    // Update or insert user points
    const timestamp = new Date().toISOString();
    
    for (const [userId, stats] of userStats.entries()) {
      const totalPoints = (stats.reviewsCount * 10) + (stats.discussionsCount * 5);
      
      console.log(`Processing ${userId}: ${stats.reviewsCount} reviews, ${stats.discussionsCount} discussions = ${totalPoints} points`);

      // Check if user exists in userPoints
      const existing = await db.select()
        .from(userPoints)
        .where(eq(userPoints.userId, userId))
        .limit(1);

      if (existing.length > 0) {
        // Update existing
        await db.update(userPoints)
          .set({
            totalPoints,
            reviewsCount: stats.reviewsCount,
            discussionsCount: stats.discussionsCount,
            updatedAt: timestamp,
          })
          .where(eq(userPoints.userId, userId));
        console.log(`  Updated existing record`);
      } else {
        // Insert new
        await db.insert(userPoints)
          .values({
            userId,
            totalPoints,
            reviewsCount: stats.reviewsCount,
            discussionsCount: stats.discussionsCount,
            updatedAt: timestamp,
          });
        console.log(`  Created new record`);
      }
    }

    console.log('\nBackfill complete!');
  } catch (error) {
    console.error('Error during backfill:', error);
    throw error;
  }
}

backfillUserPoints();
