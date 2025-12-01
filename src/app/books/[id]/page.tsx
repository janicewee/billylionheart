import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ExternalLink, BookOpen, Users, MessageSquare, Star, Video } from "lucide-react";
import ReviewSection from "@/components/ReviewSection";
import { db } from "@/db";
import { books, characters } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getBook(id: string) {
  try {
    const bookId = parseInt(id);
    if (isNaN(bookId)) return null;
    
    const result = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

async function getBookCharacters(bookNumber: number) {
  try {
    // Get all characters and filter by appearsInBooks JSON array
    const allCharacters = await db.select().from(characters);
    return allCharacters.filter(character => {
      if (!character.appearsInBooks) return false;
      const booksArray = Array.isArray(character.appearsInBooks) 
        ? character.appearsInBooks 
        : [];
      return booksArray.includes(bookNumber);
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(id);
  
  if (!book) {
    notFound();
  }

  const bookCharacters = await getBookCharacters(book.bookNumber);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        {/* Book Header */}
        <div className="grid md:grid-cols-[300px,1fr] gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src={book.coverImageUrl}
                alt={book.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="space-y-2">
              {book.hooplaLink && (
                <a href={book.hooplaLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Hoopla
                  </Button>
                </a>
              )}
              {book.fableLink && (
                <a href={book.fableLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Fable Book Clubs
                  </Button>
                </a>
              )}
              {book.buyLink && (
                <a href={book.buyLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full gap-2">
                    <BookOpen className="h-4 w-4" />
                    Buy Online
                  </Button>
                </a>
              )}
              {book.barnesNobleLink && (
                <a href={book.barnesNobleLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Barnes & Noble
                  </Button>
                </a>
              )}
              {book.authorWebsiteLink && (
                <a href={book.authorWebsiteLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" className="w-full gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Author Website
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-2">Book {book.bookNumber}</Badge>
              <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
              <p className="text-lg text-muted-foreground">by Janice Wee</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Setting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{book.setting}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{book.summary}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* YouTube Videos Section */}
        {book.youtubeVideos && Array.isArray(book.youtubeVideos) && book.youtubeVideos.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Related Videos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {book.youtubeVideos.map((video: { videoId: string; title: string }, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <p className="text-sm font-medium text-center">{video.title}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Characters Section */}
        {bookCharacters.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Characters in this Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookCharacters.map((character) => (
                  <Link
                    key={character.id}
                    href={`/characters/${character.id}`}
                    className="p-4 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <h3 className="font-semibold mb-1">{character.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {character.species} • {character.type}
                    </p>
                    <p className="text-sm line-clamp-2">{character.description}</p>
                  </Link>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/characters">
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    View All Characters
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Reviews and Discussions */}
        <ReviewSection bookId={book.id} bookTitle={book.title} />
      </div>
    </div>
  );
}