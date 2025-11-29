import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { discussions } from '@/db/schema';
import { eq, desc, isNull, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bookId = searchParams.get('bookId');
    const parentIdParam = searchParams.get('parentId');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate required bookId parameter
    if (!bookId || isNaN(parseInt(bookId))) {
      return NextResponse.json(
        { 
          error: 'Valid bookId is required',
          code: 'INVALID_BOOK_ID' 
        },
        { status: 400 }
      );
    }

    const bookIdInt = parseInt(bookId);

    // Build query with bookId filter
    let whereConditions = [eq(discussions.bookId, bookIdInt)];

    // Handle parentId filtering
    if (parentIdParam !== null) {
      if (parentIdParam === 'null') {
        // Filter for top-level discussions only (parentId IS NULL)
        whereConditions.push(isNull(discussions.parentId));
      } else if (!isNaN(parseInt(parentIdParam))) {
        // Filter for specific parentId
        whereConditions.push(eq(discussions.parentId, parseInt(parentIdParam)));
      }
    }

    const results = await db.select()
      .from(discussions)
      .where(and(...whereConditions))
      .orderBy(desc(discussions.createdAt))
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
    const { userId, bookId, content, parentId } = body;

    // Validate required fields
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { 
          error: 'userId is required and must be non-empty text',
          code: 'MISSING_USER_ID' 
        },
        { status: 400 }
      );
    }

    if (!bookId || isNaN(parseInt(bookId.toString()))) {
      return NextResponse.json(
        { 
          error: 'Valid bookId is required',
          code: 'INVALID_BOOK_ID' 
        },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json(
        { 
          error: 'content is required and must be non-empty text',
          code: 'MISSING_CONTENT' 
        },
        { status: 400 }
      );
    }

    // Validate parentId if provided
    if (parentId !== undefined && parentId !== null && isNaN(parseInt(parentId.toString()))) {
      return NextResponse.json(
        { 
          error: 'parentId must be a valid integer',
          code: 'INVALID_PARENT_ID' 
        },
        { status: 400 }
      );
    }

    // Prepare insert data
    const insertData: {
      userId: string;
      bookId: number;
      content: string;
      parentId?: number | null;
      createdAt: string;
      updatedAt: string;
    } = {
      userId: userId.trim(),
      bookId: parseInt(bookId.toString()),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Only include parentId if it's provided and valid
    if (parentId !== undefined && parentId !== null) {
      insertData.parentId = parseInt(parentId.toString());
    } else {
      insertData.parentId = null;
    }

    const newDiscussion = await db.insert(discussions)
      .values(insertData)
      .returning();

    return NextResponse.json(newDiscussion[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}