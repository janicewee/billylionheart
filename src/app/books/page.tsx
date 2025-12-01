import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { BookOpen } from "lucide-react";
import { db } from "@/db";
import { books } from "@/db/schema";
import { asc } from "drizzle-orm";

export default async function BooksPage() {
  let booksList;
  try {
    booksList = await db.select().from(books).orderBy(asc(books.bookNumber));
  } catch (error) {
    console.error("Error loading books:", error);
    booksList = [];
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Book Series
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore all three books in The Adventures of Billy Lionheart series by Janice Wee
          </p>
        </div>

        {booksList && booksList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {booksList.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[3/4] w-full bg-muted">
                  <Image
                    src={book.coverImageUrl}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                    className="object-cover"
                    priority={book.bookNumber <= 1}
                    unoptimized
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Book {book.bookNumber}</p>
                    <h3 className="text-xl font-bold">{book.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.summary}
                  </p>
                  <Link href={`/books/${book.id}`}>
                    <Button className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No books available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
