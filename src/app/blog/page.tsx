'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  youtubeUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

function getYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname === 'youtu.be') {
      videoId = u.pathname.slice(1);
    } else if (u.hostname.includes('youtube.com')) {
      videoId = u.searchParams.get('v');
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId.split('?')[0]}`;
    }
  } catch {
    // invalid URL
  }
  return null;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then((r) => r.json())
      .then((data) => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      <div className="container py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>

        {loading && (
          <p className="text-center text-muted-foreground">Loading posts…</p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
        )}

        <div className="space-y-10">
          {posts.map((post) => {
            const embedUrl = post.youtubeUrl ? getYoutubeEmbedUrl(post.youtubeUrl) : null;
            return (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{post.title}</h2>
                    <p className="text-xs text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>

                  {embedUrl && (
                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl}
                        title={post.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
