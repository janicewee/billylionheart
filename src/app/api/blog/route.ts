import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { desc } from 'drizzle-orm';

function isAdmin(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get('admin_session')?.value === 'authenticated';
}

// GET - list all published posts (or all posts if admin)
export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const admin = isAdmin(cookieStore);
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';

  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));

  if (admin && all) {
    return NextResponse.json(posts);
  }

  return NextResponse.json(posts.filter((p) => p.published));
}

// POST - create new post (admin only)
export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  if (!isAdmin(cookieStore)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content, youtubeUrl, published } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const [post] = await db.insert(blogPosts).values({
    title,
    content,
    youtubeUrl: youtubeUrl || null,
    published: published ?? false,
    createdAt: now,
    updatedAt: now,
  }).returning();

  return NextResponse.json(post, { status: 201 });
}
