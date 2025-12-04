import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { reviews, userPoints } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get('bookId');

    if (!bookId || isNaN(parseInt(bookId))) {
      return NextResponse.json(
        { 
          error: 'Valid bookId is required',
          code: 'INVALID_BOOK_ID' 
        },
        { status: 400 }
      );
    }

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    const results = await db
      .select()
      .from(reviews)
      .where(eq(reviews.bookId, parseInt(bookId)))
      .orderBy(desc(reviews.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, bookId, rating, reviewText } = body;

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { 
          error: 'userId is required and must be a non-empty string',
          code: 'MISSING_USER_ID' 
        },
        { status: 400 }
      );
    }

    if (!bookId || isNaN(parseInt(bookId))) {
      return NextResponse.json(
        { 
          error: 'Valid bookId is required',
          code: 'INVALID_BOOK_ID' 
        },
        { status: 400 }
      );
    }

    if (!rating || typeof rating !== 'number' || !Number.isInteger(rating)) {
      return NextResponse.json(
        { 
          error: 'rating is required and must be an integer',
          code: 'MISSING_RATING' 
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { 
          error: 'rating must be between 1 and 5',
          code: 'INVALID_RATING_RANGE' 
        },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const trimmedUserId = userId.trim();

    const newReview = await db
      .insert(reviews)
      .values({
        userId: trimmedUserId,
        bookId: parseInt(bookId),
        rating,
        reviewText: reviewText ? reviewText.trim() : null,
        createdAt: timestamp,
        updatedAt: timestamp,
      })
      .returning();

    // Update user points - add 10 points for review
    try {
      const existingPoints = await db.select()
        .from(userPoints)
        .where(eq(userPoints.userId, trimmedUserId))
        .limit(1);

      if (existingPoints.length > 0) {
        // Update existing record
        await db.update(userPoints)
          .set({
            totalPoints: existingPoints[0].totalPoints + 10,
            reviewsCount: existingPoints[0].reviewsCount + 1,
            updatedAt: timestamp,
          })
          .where(eq(userPoints.userId, trimmedUserId));
      } else {
        // Create new record
        await db.insert(userPoints)
          .values({
            userId: trimmedUserId,
            totalPoints: 10,
            reviewsCount: 1,
            discussionsCount: 0,
            updatedAt: timestamp,
          });
      }
    } catch (pointsError) {
      console.error('Error updating user points:', pointsError);
      // Don't fail the review creation if points update fails
    }

    return NextResponse.json(newReview[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}