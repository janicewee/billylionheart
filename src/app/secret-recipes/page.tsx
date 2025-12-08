import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, Clock, Flame } from "lucide-react";
import Link from "next/link";

export default function SecretRecipesPage() {
  const recipes = [
    {
      title: "Keto Brownies",
      slug: "keto-brownies",
      description: "Delicious gluten-free, keto-friendly brownies that are rich, fudgy, and perfect for any occasion.",
      prepTime: "45-55 minutes",
      servings: "16 squares",
      difficulty: "Easy",
      tags: ["Keto", "Gluten-Free", "Dessert"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container py-16">
        {/* Header */}
        <div className="text-center space-y-4 mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ChefHat className="h-4 w-4" />
            Exclusive Collection
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Secret Recipes
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover delicious recipes from Janice Wee's personal collection. Each recipe has been carefully crafted and tested to perfection.
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {recipes.map((recipe) => (
            <Card key={recipe.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <ChefHat className="h-10 w-10 text-primary" />
                  <div className="flex gap-1">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-2xl">{recipe.title}</CardTitle>
                <CardDescription className="text-base">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recipe Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Flame className="h-4 w-4" />
                    <span>{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ChefHat className="h-4 w-4" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
                
                {/* View Recipe Button */}
                <Link href={`/secret-recipes/${recipe.slug}`} className="block">
                  <Button className="w-full">
                    View Recipe
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <Card className="mt-12 max-w-2xl mx-auto bg-muted/50">
          <CardContent className="p-8 text-center space-y-4">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-bold">More Recipes Coming Soon</h3>
            <p className="text-muted-foreground">
              We're constantly adding new recipes to our collection. Check back soon for more delicious treats!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
