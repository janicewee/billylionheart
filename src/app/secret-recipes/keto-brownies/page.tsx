import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Clock, Flame } from "lucide-react";

export default function KetoBrowniesPage() {
  const ingredients = [
    "1/2 cup plus 2 TBS. organic Coconut oil",
    "1/4 cup cocoa powder",
    "3 large eggs",
    "1/2 cup plus 2 TBS. agave nectar OR honey - I used 2 tbsp monk fruit sweetener",
    "1 tsp. pure vanilla extract",
    "1/2 cup minus 1 TBS. (50 g) coconut flour",
    "1/2 tsp. kosher salt",
    "1/3 cup chopped raw walnuts",
    "1/3 cup mini chocolate chips (use gluten free ones to keep recipe gluten free)"
  ];

  const instructions = [
    {
      step: 1,
      text: "Preheat oven to 150°C. Line an 8\"x8\" glass baking pan with parchment so two edges hang over the side of the pan (for easy removal and cutting). Spray lightly with cooking spray."
    },
    {
      step: 2,
      text: "In glass measuring cup, melt coconut oil in microwave. In a large bowl, combine the cocoa powder and the melted coconut oil, and eggs with an electric mixer until combined. Add in the agave (or honey) and vanilla extract. Mix again until combined. Add in the coconut flour and salt and mix again until the batter is thoroughly combined."
    },
    {
      step: 3,
      text: "Fold in the nuts and chocolate chips. Spread into prepared pan evenly."
    },
    {
      step: 4,
      text: "Bake for 30-40 minutes or until a toothpick inserted into center comes out clean. Cool on wire rack and once cooled to room temperature, remove from pan and cut into 16 squares. You can either refrigerate the brownies or leave them at room temperature in an airtight container."
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
            Keto Brownies
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delicious gluten-free, keto-friendly brownies that are rich, fudgy, and perfect for any occasion.
          </p>
        </div>

        {/* Recipe Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Prep + Bake Time</p>
                <p className="text-lg font-semibold">45-55 minutes</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-6">
              <Flame className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Servings</p>
                <p className="text-lg font-semibold">16 squares</p>
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
            <p>• These brownies are naturally gluten-free when using gluten-free chocolate chips.</p>
            <p>• Store in an airtight container at room temperature for up to 5 days, or refrigerate for up to 2 weeks.</p>
            <p>• For a more intense chocolate flavor, add an extra tablespoon of cocoa powder.</p>
            <p>• The brownies will be fudgy when warm and will firm up as they cool.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
