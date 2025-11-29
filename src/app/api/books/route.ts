import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { books } from '@/db/schema';
import { eq, like, or, asc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single book by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: 'Valid ID is required',
            code: 'INVALID_ID' 
          },
          { status: 400 }
        );
      }

      const book = await db.select()
        .from(books)
        .where(eq(books.id, parseInt(id)))
        .limit(1);

      if (book.length === 0) {
        return NextResponse.json(
          { error: 'Book not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(book[0], { status: 200 });
    }

    // List books with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(books);

    if (search) {
      query = query.where(
        or(
          like(books.title, `%${search}%`),
          like(books.summary, `%${search}%`)
        )
      );
    }

    const results = await query
      .orderBy(asc(books.bookNumber))
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