"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";

export default function BookClubPage() {
  const [isOpening, setIsOpening] = useState<number | null>(null);

  const handleOpenPDF = async (bookId: number, bookTitle: string) => {
    setIsOpening(bookId);
    
    try {
      // Map book IDs to their public PDF paths (with version params for cache busting)
      const pdfPaths: Record<number, string> = {
        4: '/book-club-kits/Billy_The_Lion_Boy_Book_Club_Kit_UPDATED.pdf',
        5: '/book-club-kits/Billy_And_Bluma_Double_Trouble_Book_Club_Kit.pdf',
        6: '/book-club-kits/Secret_Hero_His_Flying_Lion_Book_Club_Kit.pdf?v=' + Date.now()
      };

      const pdfPath = pdfPaths[bookId];
      
      if (!pdfPath) {
        toast.error('Book club kit not found');
        return;
      }

      // Use direct path without complex encoding
      const fullUrl = `${window.location.origin}${pdfPath}`;
      
      console.log('Opening PDF:', fullUrl);
      
      // Check if we're in an iframe first
      const isInIframe = window.self !== window.top;
      
      if (isInIframe) {
        // In iframe: use postMessage to open in parent
        window.parent.postMessage({ 
          type: "OPEN_EXTERNAL_URL", 
          data: { url: fullUrl } 
        }, "*");
        toast.success('Opening PDF in new tab...');
      } else {
        // Not in iframe: try normal popup
        const newWindow = window.open(fullUrl, '_blank', 'noopener,noreferrer');
        
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Popup was blocked
          toast.error('Popup blocked. Please allow popups and try again.');
        } else {
          toast.success('PDF opened in new tab');
        }
      }
    } catch (error) {
      console.error('Error opening PDF:', error);
      toast.error('Failed to open book club kit. Please try again.');
    } finally {
      setIsOpening(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Club Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download comprehensive book club kits for each book in the series. Perfect for group discussions, classroom activities, and deeper exploration of the stories.
          </p>
        </div>

        <Tabs defaultValue="book1" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book1">Book 1</TabsTrigger>
            <TabsTrigger value="book2">Book 2</TabsTrigger>
            <TabsTrigger value="book3">Book 3</TabsTrigger>
          </TabsList>

          {/* Book 1 Kit */}
          <TabsContent value="book1" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Billy the Lion Boy</CardTitle>
                    <CardDescription>Book Club Kit - Book 1</CardDescription>
                  </div>
                  <Badge>Book 1</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <h3 className="font-semibold text-lg mb-3">About the Book</h3>
                  <p className="text-muted-foreground">
                    Billy the Lion Boy follows the heartfelt, wild, and humorous journey of Billy Lionheart — a mortal boy raised by a lion named Leonard, sentenced to babysit him as community service. Billy longs to reunite with his immortal parents, befriends animals, forms a lion family, and gets entangled in daring rescues and a circus showdown. A story of identity, love, loyalty, and destiny.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Kit Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Character Profiles (Billy, Leonard, Lina, Foster Parents)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>10 Discussion Questions exploring themes of family, identity, courage, and faith</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Key Quotes for Reflection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Activities for Adults and Kids (mapping Billy's journey, circus roleplay, crafts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Setting Guide (Jayden's Kingdom, Kangaroo Land, Celestial City)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Themed Snacks & Crafts Ideas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>4-Week Reading Group Schedule</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={() => handleOpenPDF(4, 'billy-the-lion-boy')}
                    disabled={isOpening === 4}
                  >
                    <ExternalLink className="h-5 w-5" />
                    {isOpening === 4 ? 'Opening PDF...' : 'View Book 1 Club Kit (PDF)'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Opens in new tab • Save from PDF viewer
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Book 2 Kit */}
          <TabsContent value="book2" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Billy & Bluma: Double Trouble</CardTitle>
                    <CardDescription>Book Club Kit - Book 2</CardDescription>
                  </div>
                  <Badge>Book 2</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <h3 className="font-semibold text-lg mb-3">About the Book</h3>
                  <p className="text-muted-foreground">
                    Billy & Bluma: Double Trouble follows mischievous best friends Billy and Bluma and Billy's talking lion guardian, Leonard. A mysterious gold coin and map set them on a perilous quest. They face storms, bears, cult-like compounds, kidnappers, and a hunting island for abducted animals. Their journey leads them to their beloved nanny Mathilda—now resurrected as an immortal queen.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Kit Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Character Spotlight (Billy, Bluma, Leonard, Mathilda, Junta, Cha Cha)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Exploration of Themes: Friendship & Forgiveness, Courage vs. Recklessness, Justice vs. Evil</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>7 Discussion Questions about character growth and moral choices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Activities: Compare Billy & Bluma's strengths, act out key scenes, map the journey</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Faith Reflection questions on forgiveness and prayer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Creative Projects: Design the treasure map, draw a new cover</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Vocabulary building exercises</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={() => handleOpenPDF(5, 'billy-bluma-double-trouble')}
                    disabled={isOpening === 5}
                  >
                    <ExternalLink className="h-5 w-5" />
                    {isOpening === 5 ? 'Opening PDF...' : 'View Book 2 Club Kit (PDF)'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Opens in new tab • Save from PDF viewer
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Book 3 Kit */}
          <TabsContent value="book3" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">Secret Hero & His Flying Lion</CardTitle>
                    <CardDescription>Book Club Kit - Book 3</CardDescription>
                  </div>
                  <Badge>Book 3</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-sm max-w-none">
                  <h3 className="font-semibold text-lg mb-3">About the Book</h3>
                  <p className="text-muted-foreground">
                    In this thrilling third installment of The Adventures of Billy Lionheart, our hero begins his first year at St. Lydia's Academy, navigating school life, bullies, mysteries—and his lion guardian Leonard's hilarious and heartfelt attempts to fit into human society. An international school trip to Celestial City reveals history, faith, danger, and divine intervention. When Leonard is suddenly poisoned, Billy, Bluma, and their friends must uncover the truth before it's too late.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Themes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Faith and Divine Protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Friendship and Loyalty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Courage and Sacrifice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Identity & Purpose</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Justice and Mercy</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Kit Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>5 Discussion Questions on themes of faith, forgiveness, courage, and justice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Character Exploration Activities (Character Map, Debate Activity)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Creative Writing Prompt: Write from Leonard's perspective during the school trip</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Fun Extras: Draw Your Own Flying Lion, Make a Chaperone Pass</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Group Discussion: What would YOU do if you discovered your classmate had super strength?</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full gap-2" 
                    size="lg"
                    onClick={() => handleOpenPDF(6, 'secret-hero-flying-lion')}
                    disabled={isOpening === 6}
                  >
                    <ExternalLink className="h-5 w-5" />
                    {isOpening === 6 ? 'Opening PDF...' : 'View Book 3 Club Kit (PDF)'}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Opens in new tab • Save from PDF viewer
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="mt-12 max-w-5xl mx-auto bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Tips for Your Book Club
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">For Adult Groups</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Focus on themes of faith, family, and redemption</li>
                  <li>• Explore character motivations and moral choices</li>
                  <li>• Discuss world-building and storytelling techniques</li>
                  <li>• Share personal connections to the themes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">For Kids & Family Groups</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Try the hands-on activities and crafts</li>
                  <li>• Act out favorite scenes together</li>
                  <li>• Create character artwork and maps</li>
                  <li>• Discuss what makes a good friend or hero</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}