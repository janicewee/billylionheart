import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { bookClubKits } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get('bookId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate limit and offset
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { 
          error: 'Invalid limit parameter',
          code: 'INVALID_LIMIT'
        },
        { status: 400 }
      );
    }

    if (isNaN(offset) || offset < 0) {
      return NextResponse.json(
        { 
          error: 'Invalid offset parameter',
          code: 'INVALID_OFFSET'
        },
        { status: 400 }
      );
    }

    let query = db.select().from(bookClubKits);

    // Filter by bookId if provided
    if (bookId) {
      const parsedBookId = parseInt(bookId);
      
      if (isNaN(parsedBookId)) {
        return NextResponse.json(
          { 
            error: 'Invalid bookId parameter. Must be a valid integer.',
            code: 'INVALID_BOOK_ID'
          },
          { status: 400 }
        );
      }

      query = query.where(eq(bookClubKits.bookId, parsedBookId));
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error'),
        code: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}