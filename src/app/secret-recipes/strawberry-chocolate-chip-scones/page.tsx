import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Clock, Flame } from "lucide-react";
import Image from "next/image";

export default function StrawberrySconesPage() {
  const ingredients = [
    "2 cups ground almonds",
    "1/3 cup white chocolate chips",
    "1/3 cup baking chocolate chips",
    "1/3 cup chopped dried strawberries",
    "A pinch of baking soda",
    "A pinch of salt",
    "2 large eggs (or 3 regular eggs)",
    "1 tablespoon honey",
    "1 teaspoon vanilla extract"
  ];

  const instructions = [
    {
      step: 1,
      text: "Line a baking sheet with baking paper and preheat the oven to 190°C."
    },
    {
      step: 2,
      text: "Mix all the dry ingredients together in a large bowl: ground almonds, chocolate chips, dried strawberries, baking soda, and salt."
    },
    {
      step: 3,
      text: "In a separate bowl, beat the wet ingredients together: eggs, honey, and vanilla extract."
    },
    {
      step: 4,
      text: "Stir the wet mixture into the dry mixture until you get a lump of dough."
    },
    {
      step: 5,
      text: "Make little balls of dough (1 teaspoon to 1 tablespoon per ball, depending on whether you prefer regular or mini scones) and place them on the lined baking sheet."
    },
    {
      step: 6,
      text: "Bake for 11 minutes."
    },
    {
      step: 7,
      text: "Remove from the oven and let cool for at least 5 minutes before serving."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <ChefHat className="h-4 w-4" />
            Secret Recipe
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Strawberry Chocolate Chip Scones
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delightful scones with ground almonds, strawberries, and chocolate chips. Perfect for breakfast or a snack.
          </p>
          <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl mt-8">
            <Image
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-20-at-8.46.28-PM-1766234806076.png?width=8000&height=8000&resize=contain"
              alt="Strawberry Chocolate Chip Scones"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Recipe Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Prep + Bake Time</p>
                <p className="text-lg font-semibold">20 minutes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Flame className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Servings</p>
                <p className="text-lg font-semibold">12-16 scones</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <ChefHat className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <p className="text-lg font-semibold">Easy</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-2xl">Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {instructions.map((instruction) => (
                  <div key={instruction.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {instruction.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-muted-foreground leading-relaxed">
                        {instruction.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Tips & Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-muted-foreground">
            <p>• You can freeze the leftover scones to reheat them whenever you want, for a snack or a quick and easy breakfast.</p>
            <p>• Ground almonds provide a wonderful texture and make these naturally gluten-free.</p>
            <p>• Use high-quality chocolate chips for the best results.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
