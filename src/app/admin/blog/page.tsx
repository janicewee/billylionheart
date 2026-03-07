'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash2, Plus, LogOut, Eye, EyeOff } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  youtubeUrl: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

const emptyForm = { title: '', content: '', youtubeUrl: '', published: false };

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  async function fetchPosts() {
    const res = await fetch('/api/blog?all=true');
    if (res.status === 401) { router.push('/admin/login'); return; }
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  function startNew() {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
    setShowForm(true);
  }

  function startEdit(post: BlogPost) {
    setForm({
      title: post.title,
      content: post.content,
      youtubeUrl: post.youtubeUrl || '',
      published: post.published,
    });
    setEditingId(post.id);
    setError('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const body = {
      title: form.title,
      content: form.content,
      youtubeUrl: form.youtubeUrl || null,
      published: form.published,
    };

    const res = editingId
      ? await fetch(`/api/blog/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      : await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

    setSaving(false);

    if (res.ok) {
      cancelForm();
      fetchPosts();
    } else {
      const d = await res.json();
      setError(d.error || 'Something went wrong.');
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    fetchPosts();
  }

  async function togglePublished(post: BlogPost) {
    await fetch(`/api/blog/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    fetchPosts();
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container py-10 max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Manager</h1>
          <div className="flex gap-2">
            {!showForm && (
              <Button onClick={startNew} className="gap-2">
                <Plus className="h-4 w-4" /> New Post
              </Button>
            )}
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <Card>
            <CardContent className="p-8 space-y-5">
              <h2 className="text-xl font-semibold">{editingId ? 'Edit Post' : 'New Post'}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Post title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube URL (optional)</Label>
                  <Input
                    id="youtubeUrl"
                    value={form.youtubeUrl}
                    onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                    placeholder="https://youtu.be/... or https://www.youtube.com/watch?v=..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Write your post here…"
                    rows={10}
                    required
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="published"
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="published" className="cursor-pointer">Publish immediately</Label>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex gap-3">
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving…' : editingId ? 'Update Post' : 'Create Post'}
                  </Button>
                  <Button type="button" variant="outline" onClick={cancelForm}>Cancel</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Posts list */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Posts</h2>
          {loading && <p className="text-muted-foreground">Loading…</p>}
          {!loading && posts.length === 0 && (
            <p className="text-muted-foreground">No posts yet. Create your first post above.</p>
          )}
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-5 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold truncate">{post.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${post.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.content}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="icon" variant="ghost" title={post.published ? 'Unpublish' : 'Publish'} onClick={() => togglePublished(post)}>
                    {post.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => startEdit(post)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
