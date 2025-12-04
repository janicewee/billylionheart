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

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">1. About the Book</h2>
            <p>In this thrilling third installment of The Adventures of Billy Lionheart, our hero begins his first year at St. Lydia's Academy, navigating school life, bullies, mysteries—and his lion guardian Leonard's hilarious and heartfelt attempts to fit into human society. An international school trip to Celestial City reveals history, faith, danger, and divine intervention. When Leonard is suddenly poisoned, Billy, Bluma, and their friends must uncover the truth before it's too late.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">2. Themes</h2>
            <ul className="space-y-2">
              <li><strong>Faith and Divine Protection</strong></li>
              <li><strong>Friendship and Loyalty</strong></li>
              <li><strong>Courage and Sacrifice</strong></li>
              <li><strong>Identity & Purpose</strong></li>
              <li><strong>Justice and Mercy</strong></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">3. Discussion Questions</h2>
            <ol className="space-y-4 list-decimal pl-6">
              <li>How does Leonard balance being both a lion and a guardian?</li>
              <li>Bluma makes a serious mistake when she accuses Joseph. What does this teach about justice and responsibility?</li>
              <li>Which scene in Celestial City impacted you most, and why?</li>
              <li>What does the story reveal about forgiveness—both giving it and receiving it?</li>
              <li>How do Billy and his friends demonstrate courage?</li>
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="text-3xl font-bold mb-4">4. Activities</h2>
            
            <h3 className="text-2xl font-semibold mt-6 mb-3">Character Exploration Activities</h3>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>Character Map:</strong> Choose Billy, Bluma, Leonard, or Joseph. Create a chart of strengths, flaws, motivations, and growth.
            </div>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>Debate Activity:</strong> Should Billy have told his friends about his powers earlier?
            </div>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Creative Writing Prompt</h3>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              Write a scene from Leonard's point of view during the school trip.
            </div>

            <h3 className="text-2xl font-semibold mt-6 mb-3">Fun Extras for Book Clubs</h3>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>Draw Your Own Flying Lion:</strong> Imagine Leonard in full flight using his gadget gloves.
            </div>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>Make a Chaperone Pass:</strong> Design a humorous ID card for Leonard posing as a human chaperone.
            </div>
            <div className="bg-primary/5 p-4 rounded-lg mb-4">
              <strong>Group Discussion:</strong> What would YOU do if you discovered your classmate had super strength?
            </div>
          </section>

          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-xl font-semibold mb-4">Enjoy your journey with Billy & Leonard!</p>
            <p className="text-muted-foreground">
              For more resources, visit the <Link href="/book-club" className="text-primary underline">Book Club page</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}