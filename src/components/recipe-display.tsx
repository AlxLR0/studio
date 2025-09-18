'use client';

import { Heart } from 'lucide-react';

import type { Recipe } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type RecipeDisplayProps = {
  recipe: Recipe;
};

export function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isRecipeFavorite = isFavorite(recipe.id);

  const handleFavoriteToggle = () => {
    if (isRecipeFavorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Card className="w-full animate-in fade-in-50 duration-500">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="font-headline text-3xl">{recipe.recipeName}</CardTitle>
            <CardDescription className="mt-2">A unique recipe generated just for you.</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            aria-label={isRecipeFavorite ? 'Remove from favorites' : 'Save to favorites'}
            className="shrink-0"
          >
            <Heart className={isRecipeFavorite ? 'fill-red-500 text-red-500' : 'text-muted-foreground'} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-headline text-xl font-semibold">Ingredients</h3>
          <Separator className="my-2" />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-primary">&#x2713;</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-xl font-semibold">Instructions</h3>
          <Separator className="my-2" />
          <div className="prose prose-p:my-2 prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5 space-y-2 text-foreground/90">
            {recipe.instructions.split('\n').map((step, index) => (
                step.trim() && <p key={index}>{step}</p>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
