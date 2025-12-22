import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, Clock, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SecretRecipesPage() {
    const recipes = [
      {
        title: "Strawberry Chocolate Chip Scones",
        slug: "strawberry-chocolate-chip-scones",
        description: "Delightful scones with ground almonds, strawberries, and chocolate chips. Perfect for breakfast or a snack.",
        prepTime: "20 minutes",
        servings: "12-16 scones",
        difficulty: "Easy",
        tags: ["Breakfast", "Scones", "Treat"],
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-20-at-8.46.28-PM-1766234806076.png?width=8000&height=8000&resize=contain"
      },
      {
        title: "Keto Brownies",
        slug: "keto-brownies",
        description: "Delicious gluten-free, keto-friendly brownies that are rich, fudgy, and perfect for any occasion.",
        prepTime: "45-55 minutes",
        servings: "16 squares",
        difficulty: "Easy",
        tags: ["Keto", "Gluten-Free", "Dessert"],
        image: null
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
            <Card key={recipe.slug} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              {recipe.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              )}
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <ChefHat className="h-10 w-10 text-primary" />
                  <div className="flex flex-wrap gap-1 justify-end">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-2xl">{recipe.title}</CardTitle>
                <CardDescription className="text-base line-clamp-2">
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
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChefHat, Clock, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SecretRecipesPage() {
    const recipes = [
      {
        title: "Strawberry Chocolate Chip Scones",
        slug: "strawberry-chocolate-chip-scones",
        description: "Delightful scones with ground almonds, strawberries, and chocolate chips. Perfect for breakfast or a snack.",
        prepTime: "20 minutes",
        servings: "12-16 scones",
        difficulty: "Easy",
        tags: ["Breakfast", "Scones", "Treat"],
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-20-at-8.46.28-PM-1766234806076.png?width=800&height=800&resize=contain"
      },
      {
        title: "Keto Brownies",
        slug: "keto-brownies",
        description: "Delicious gluten-free, keto-friendly brownies that are rich, fudgy, and perfect for any occasion.",
        prepTime: "45-55 minutes",
        servings: "16 squares",
        difficulty: "Easy",
        tags: ["Keto", "Gluten-Free", "Dessert"],
        image: null
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
            <Card key={recipe.slug} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              {recipe.image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
              )}
              <CardHeader className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <ChefHat className="h-10 w-10 text-primary" />
                  <div className="flex flex-wrap gap-1 justify-end">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardTitle className="text-2xl">{recipe.title}</CardTitle>
                <CardDescription className="text-base line-clamp-2">
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
