import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";

export default function Book3KitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12 max-w-4xl">
        <Link href="/book-club">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Book Club
          </Button>
        </Link>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Book Club Kit: Secret Hero & His Flying Lion</h1>
          <p className="text-lg text-muted-foreground mb-8">The Adventures of Billy Lionheart, Book 3 by Janice Wee</p>

          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <p>This kit provides resources for reading and discussing <em>Secret Hero & His Flying Lion</em>, an exciting installment in The Adventures of Billy Lionheart series, perfect for readers who enjoy fantasy, action, and stories about unconventional family bonds.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">1. Synopsis</h2>
            <p><em>Secret Hero & His Flying Lion</em> is the third book in the continuing adventures of Billy Lionheart, a young human boy with extraordinary gifts, including super strength and the ability to speak all animal languages. Raised by his adoptive father, Leonard Lion, Billy navigates the world of St. Lydia's Academy alongside his childhood friend, Bluma. As Billy's unique abilities and his heroic destiny become clearer, he faces new challenges that test the limits of his loyalty and the powerful, loving relationship he shares with Leonard. This book delves into what it means to be a hero.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">2. Who's Who: Character Spotlight</h2>
            <ul className="space-y-3">
              <li>
                <strong>Billy (Lionheart):</strong> The titular hero. A first-year student at St. Lydia's Academy with the gifts of super strength and omnilinguality (speaking all animal languages). He is Leonard Lion's adopted "human cub."
              </li>
              <li>
                <strong>Leonard Lion:</strong> A large, loving lion who serves as Billy's dedicated father and babysitter. Their bond is central to the series.
              </li>
              <li>
                <strong>Bluma:</strong> Billy's human childhood friend and classmate. She is constantly involved in Billy's adventures, often getting into trouble, like the incident with Professor Abel's toupee.
              </li>
              <li>
                <strong>Professor Abel:</strong> The headmaster of St. Lydia's Academy. He harbors a grudge against Billy and Bluma, painting him as a humorous, antagonistic force in their lives.
              </li>
              <li>
                <strong>Samson:</strong> Billy's gym coach. He plays a protective, guiding role for Billy.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">3. Discussion Questions</h2>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">Character and Motivation</h3>
            <ul className="space-y-3">
              <li>The core relationship in the book is between Billy, a human, and Leonard Lion, his adoptive father. How does the author use this unusual pairing to explore traditional themes of family, adoption, and parental love?</li>
              <li>Billy has "super strength" and is "omnilingual." Which of these two abilities do you think makes him a more effective hero, and why?</li>
              <li>Professor Abel seems determined to catch Billy and Bluma doing something wrong. Do you think he's a true villain, or is he simply a comedic obstacle? How does his character affect the tone of the academy setting?</li>
              <li>What role does Samson play in Billy's life?</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Themes and Conflict</h3>
            <ul className="space-y-3">
              <li><em>Secret Hero & His Flying Lion</em> explores themes of <strong>loyalty</strong> and <strong>rebellion</strong>. In what ways does Billy demonstrate loyalty to his friends and family, and when is it necessary for him to rebel against authority (like the Academy rules)?</li>
              <li>The story blends a typical school setting (St. Lydia's Academy) with high fantasy elements (immortals, talking lions, super strength). How does this blending of the mundane and the magical enhance the reading experience?</li>
              <li>The book is the third in a series. What elements did the author include to make the story accessible to new readers, and what threads do you think continue from the previous books (<em>Billy The Lion Boy</em> and <em>Billy & Bluma: Double Trouble</em>)?</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 mb-3">World Building</h3>
            <ul className="space-y-3">
              <li>If you could have one of Billy's powers—super strength or speaking all animal languages—which would you choose and what would be the first thing you'd do with it?</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">4. Beyond the Book: Activities and Extensions</h2>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">A. Creative Writing Prompt</h3>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>A Day at St. Lydia's:</strong> Write a short scene (200 words) from the perspective of Professor Abel. Describe what he <em>thinks</em> is going on with Billy and Bluma when they break one of his rules.
            </div>

            <h3 className="text-2xl font-semibold mt-6 mb-3">B. Lion-Hearted Challenge</h3>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>Animal Communication:</strong> Choose a common household or local animal (a pet, a bird, an insect). Spend five minutes observing it silently. Try to imagine what its "language" is like and what it would tell you if you had Billy's omnilingual gift.
            </div>

            <h3 className="text-2xl font-semibold mt-6 mb-3">C. Related Reading</h3>
            <ul className="space-y-2">
              <li>If your club enjoyed the blending of fantasy and school life in this book, try reading other titles that share this theme, such as <em>The Chronicles of Narnia</em>.</li>
              <li>Explore other works by Janice Wee, such as the <em>Emunah Chronicles</em> or her <em>Tales From Singapore</em> series.</li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              For more resources, visit the <Link href="/book-club" className="text-primary underline">Book Club page</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
