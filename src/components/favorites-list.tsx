'use client';

import { useState } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Inbox, Eye } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RecipeDisplay } from './recipe-display';
import type { Recipe } from '@/lib/types';

export function FavoritesList() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-3/4 rounded bg-muted"></div>
              <div className="mt-2 h-4 w-1/2 rounded bg-muted"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 rounded bg-muted"></div>
            </CardContent>
            <CardFooter>
              <div className="h-10 w-24 rounded bg-muted"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center">
        <Inbox className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 font-headline text-2xl font-semibold">Aún no hay favoritos</h2>
        <p className="mt-2 text-muted-foreground">Tus recetas guardadas aparecerán aquí. ¡Empieza por generar una receta!</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((recipe) => (
           <Dialog key={recipe.id} onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}>
            <Card className="flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <DialogTrigger asChild onClick={() => setSelectedRecipe(recipe)} className="flex-grow text-left cursor-pointer">
                <div>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{recipe.recipeName}</CardTitle>
                    <CardDescription>{recipe.ingredients.slice(0, 3).join(', ')}...</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="line-clamp-4 text-sm text-muted-foreground">{recipe.instructions}</p>
                  </CardContent>
                </div>
              </DialogTrigger>
              <CardFooter className="justify-between">
                <DialogTrigger asChild>
                   <Button variant="outline" size="sm" onClick={() => setSelectedRecipe(recipe)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Receta
                    </Button>
                </DialogTrigger>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esto eliminará permanentemente &quot;{recipe.recipeName}&quot; de tus favoritos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeFavorite(recipe.id)}>
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
           </Dialog>
        ))}
      </div>
      {selectedRecipe && (
        <Dialog open={!!selectedRecipe} onOpenChange={(isOpen) => !isOpen && setSelectedRecipe(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <RecipeDisplay recipe={selectedRecipe} />
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
