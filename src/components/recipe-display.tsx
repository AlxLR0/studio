'use client';

import { Heart, Apple, ListChecks, Flame } from 'lucide-react';

import type { Recipe } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    <Card className="w-full animate-in fade-in-50 duration-500 overflow-hidden border-primary/20 shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader className="bg-primary/5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="font-headline text-3xl text-primary">{recipe.recipeName}</CardTitle>
            <CardDescription className="mt-2">Una receta única generada especialmente para ti.</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            aria-label={isRecipeFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            className="shrink-0 text-muted-foreground hover:text-red-500"
          >
            <Heart className={isRecipeFavorite ? 'fill-red-500 text-red-500' : ''} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        <div>
          <h3 className="flex items-center gap-2 font-headline text-xl font-semibold">
            <ListChecks className="text-primary" />
            ✨ Ingredientes ✨
          </h3>
          <Separator className="my-3" />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary pt-1">&#x2713;</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center gap-2 font-headline text-xl font-semibold">
            <Flame className="text-primary" />
            🍲 Preparación 🍲
          </h3>
          <Separator className="my-3" />
          <div className="prose prose-p:my-2 prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-5 space-y-3 text-foreground/90 dark:prose-invert">
            {recipe.instructions.split('\n').filter(step => step.trim()).map((step, index) => (
                <p key={index} className="flex items-start gap-3">
                  <span className="font-bold text-primary">{index + 1}.</span>
                  <span>{step.replace(/^\d+\.\s*/, '')}</span>
                </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 font-headline text-xl font-semibold">
            <Apple className="text-primary" />
            💚 Nota de Salud 💚
          </h3>
          <Separator className="my-3" />
          <p className="italic text-foreground/80">{recipe.healthNote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
