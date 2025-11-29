import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { characters } from '@/db/schema';
import { eq, like, and, or, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single character by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const character = await db.select()
        .from(characters)
        .where(eq(characters.id, parseInt(id)))
        .limit(1);

      if (character.length === 0) {
        return NextResponse.json({ 
          error: 'Character not found',
          code: "CHARACTER_NOT_FOUND" 
        }, { status: 404 });
      }

      return NextResponse.json(character[0], { status: 200 });
    }

    // List with filtering and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const book = searchParams.get('book');
    const species = searchParams.get('species');
    const type = searchParams.get('type');

    let query = db.select().from(characters);
    const conditions = [];

    // Search filter
    if (search) {
      conditions.push(
        or(
          like(characters.name, `%${search}%`),
          like(characters.description, `%${search}%`)
        )
      );
    }

    // Species filter
    if (species) {
      conditions.push(eq(characters.species, species));
    }

    // Type filter
    if (type) {
      conditions.push(eq(characters.type, type));
    }

    // Book number filter - check if book number exists in appearsInBooks JSON array
    if (book) {
      const bookNumber = parseInt(book);
      if (isNaN(bookNumber)) {
        return NextResponse.json({ 
          error: "Valid book number is required",
          code: "INVALID_BOOK_NUMBER" 
        }, { status: 400 });
      }
      
      // Use SQL to check if the book number exists in the JSON array
      conditions.push(
        sql`json_array_length(${characters.appearsInBooks}) > 0 AND EXISTS (
          SELECT 1 FROM json_each(${characters.appearsInBooks}) 
          WHERE value = ${bookNumber}
        )`
      );
    }

    // Apply conditions if any exist
    if (conditions.length > 0) {
      if (conditions.length === 1) {
        query = query.where(conditions[0]);
      } else {
        query = query.where(and(...conditions));
      }
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}