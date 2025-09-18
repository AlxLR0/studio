'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AlertCircle, LoaderCircle, Sparkles } from 'lucide-react';

import type { Recipe } from '@/lib/types';
import { getRecipe } from '@/app/actions';
import { IngredientForm } from '@/components/ingredient-form';
import { RecipeDisplay } from '@/components/recipe-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const heroImage = PlaceHolderImages.find(img => img.id === 'homepage-hero');

  const onGenerate = async (ingredients: string) => {
    setLoading(true);
    setError(null);
    setRecipe(null);
    setShowWelcome(false);

    const result = await getRecipe(ingredients);
    
    if (result.error) {
      setError(result.error);
    } else if (result.recipe) {
      if (result.recipe.suitable) {
        setRecipe(result.recipe);
      } else {
        setError(result.recipe.reason || 'These ingredients are not suitable for a recipe. Please try others.');
      }
    } else {
      setError('An unexpected error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl">
          What&apos;s in your pantry?
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Enter the ingredients you have on hand, and let Herbology AI craft a unique recipe for you.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-2xl">
        <IngredientForm onSubmit={onGenerate} loading={loading} />
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            <p className="font-headline text-xl text-primary">Crafting your recipe...</p>
            <p className="text-foreground/70">Please wait while our AI chef gets to work.</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mx-auto max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Generation Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recipe && <RecipeDisplay recipe={recipe} />}

        {showWelcome && !loading && !error && !recipe && heroImage && (
          <div className="mt-12 overflow-hidden rounded-lg border bg-card shadow-sm">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">Welcome to Herbology</h2>
                <p className="mt-2 max-w-2xl text-lg text-white/90">Your personal AI-powered sous-chef, ready to turn your ingredients into a culinary masterpiece.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
