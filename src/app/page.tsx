'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AlertCircle, LoaderCircle } from 'lucide-react';

import type { Recipe } from '@/lib/types';
import { getRecipe } from '@/app/actions';
import { RecipeDisplay } from '@/components/recipe-display';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PreferencesForm, RecipePreferences } from '@/components/preferences-form';

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const heroImage = PlaceHolderImages.find(img => img.id === 'homepage-hero');

  const onGenerate = async (ingredients: string, preferences: RecipePreferences) => {
    setLoading(true);
    setError(null);
    setRecipe(null);
    setShowWelcome(false);

    const result = await getRecipe(ingredients, preferences);
    
    if (result.error) {
      setError(result.error);
    } else if (result.recipe) {
      if (result.recipe.suitable) {
        setRecipe(result.recipe);
      } else {
        setError(result.recipe.reason || 'Estos ingredientes no son adecuados para una receta. Por favor, intenta con otros.');
      }
    } else {
      setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-in fade-in-50 duration-1000">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
          ¿Qué tienes en tu despensa?
        </h1>
        <p className="mt-4 text-lg text-foreground/80">
          Introduce los ingredientes que tienes a mano y deja que Cookify AI cree una receta única para ti.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-8">
        <PreferencesForm onSubmit={onGenerate} loading={loading} />
      </div>

      <div className="mx-auto mt-8 max-w-4xl">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
            <p className="font-headline text-xl text-primary">Creando tu receta personalizada...</p>
            <p className="text-foreground/70">Nuestro chef de IA está adaptando la receta a tus gustos y necesidades.</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mx-auto max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Falló la Generación</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {recipe && <RecipeDisplay recipe={recipe} />}

        {showWelcome && !loading && !error && !recipe && heroImage && (
          <div className="mt-12 overflow-hidden rounded-lg border bg-card shadow-lg transition-all duration-300 hover:shadow-2xl">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h2 className="font-headline text-2xl font-bold text-white md:text-4xl">Bienvenido a Cookify</h2>
                <p className="mt-2 max-w-2xl text-lg text-white/90">Tu chef personal con IA, listo para convertir tus ingredientes en una obra maestra culinaria.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
