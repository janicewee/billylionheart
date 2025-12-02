"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function BookClubPage() {
  const [isOpening, setIsOpening] = useState<number | null>(null);

  const handleOpenPDF = async (bookId: number, bookTitle: string) => {
    setIsOpening(bookId);
    
    try {
      // Fetch the book club kit from the API
      const response = await fetch(`/api/book-club-kits?bookId=${bookId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch book club kit');
      }
      
      const kits = await response.json();
      
      if (!kits || kits.length === 0) {
        toast.error('Book club kit not found');
        return;
      }
      
      const kit = kits[0];
      
      // Convert relative URL to absolute URL
      const absoluteUrl = `${window.location.origin}${kit.pdfUrl}`;
      
      // Open PDF in new tab
      const isInIframe = window.self !== window.top;
      
      if (isInIframe) {
        // If in iframe, try to open in parent window
        window.parent.postMessage({ 
          type: "OPEN_EXTERNAL_URL", 
          data: { url: absoluteUrl } 
        }, "*");
        toast.success('Opening PDF in new tab...');
      } else {
        // Open in new tab normally
        window.open(absoluteUrl, '_blank', 'noopener,noreferrer');
        toast.success('PDF opened in new tab');
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
                    Secret Hero & His Flying Lion is the third book in the continuing adventures of Billy Lionheart, a young human boy with extraordinary gifts, including super strength and the ability to speak all animal languages. Raised by his adoptive father, Leonard Lion, Billy navigates the world of St. Lydia's Academy alongside his childhood friend, Bluma. This book delves into what it means to be a hero.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Kit Includes:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Character Spotlight (Billy, Leonard Lion, Bluma, Professor Abel, Samson)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Discussion Questions on themes of loyalty, rebellion, and heroism</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Exploration of the blend between school setting and high fantasy elements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>World Building discussion: Which superpower would you choose?</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Creative Writing Prompts (Professor Abel's perspective)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Lion-Hearted Challenge: Animal Communication activity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Related Reading suggestions</span>
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