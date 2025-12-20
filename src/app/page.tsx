import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { BookOpen, ExternalLink } from "lucide-react";
import { db } from "@/db";
import { books } from "@/db/schema";
import { asc } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const booksList = await db.select().from(books).orderBy(asc(books.bookNumber)).catch(() => []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            The Adventures of Billy Lionheart
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            A fantasy adventure series by Janice Wee
          </p>
          <div className="prose prose-lg mx-auto text-left max-w-3xl space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              🦁 Billy Lionheart was born during the chaotic era. Billy's parents and their entire community were slaughtered by Beast's men. Billy who was a toddler then, survived because he hid in a pipe. Rescue pilots who had arrived too late to evacuate the village found him and raised him in their community of misfits.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              🐾 Mei befriended Barry and his very pregnant wife Mary, who were seeking shelter from persecution in the city. Billy was helping Mary's midwife, Mathilda when Bluma was born. Billy was the first thing baby Bluma saw.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Like a baby duckling following the first moving thing it sees, Bluma fixated on Billy and as soon as she could crawl, she followed him everywhere, annoying the little boy. 🐾
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              As the only children in the community, Billy and Bluma bonded, with the older boy taking care of the little girl in dangerous situations. After the Battle of Armageddon, the survivors move to different kingdoms to start afresh in the new Utopian world.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              🦁 Bluma goes with her parents Barry and Mary, while Billy follows his foster parents into Jayden's kingdom.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Billy is a naughty but extremely adorable boy who is spoiled by his foster parents, Boris and his wife Ava, Mei and her husband Leo. Mei encourages his love for learning new things and even teaches him to fly her plane which is built for her petite frame.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              🐾 So begins The Adventures of Billy Lionheart. 🦁
            </p>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="container py-16 bg-background/50 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          The Book Series
        </h2>
        {booksList && booksList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {booksList.map((book) => (
              <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/books/${book.id}`} className="block">
                  <div className="relative aspect-[3/4] w-full bg-muted cursor-pointer hover:opacity-90 transition-opacity">
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
                </Link>
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
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">No books available at the moment.</p>
            {!errorMessage && (
              <p className="text-sm text-muted-foreground">
                (Database connected but no records found)
              </p>
            )}
          </div>
        )}
      </section>

      {/* What Happens Next Section */}
      <section className="container py-16">
        <Card className="max-w-3xl mx-auto bg-primary/5">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">What happens after The Adventures of Billy Lionheart?</h2>
            <p className="text-muted-foreground">
              Fast forward to adulthood. <strong>Dragon Unbound</strong> by Janice Wee continues their story after graduation when Billy proposes to Bluma. The epic fantasy novel Dragon Unbound is for grown ups only because of mature themes.
            </p>
            <a 
              href="https://www.janicewee.com/books/dragon-unbound" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                Learn More About Dragon Unbound
                <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container py-16 text-center space-y-6">
        <h2 className="text-3xl font-bold">Join the Community</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Register an account to rate and review the books, participate in discussions, and earn points to climb the leaderboard!
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/characters">
            <Button size="lg" variant="outline">Explore Characters</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}