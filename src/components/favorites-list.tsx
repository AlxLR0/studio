'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Inbox } from 'lucide-react';
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

export function FavoritesList() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();

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
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
        <Inbox className="h-16 w-16 text-muted-foreground" />
        <h2 className="mt-6 font-headline text-2xl font-semibold">No Favorites Yet</h2>
        <p className="mt-2 text-muted-foreground">Your saved recipes will appear here. Start by generating a recipe!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {favorites.map((recipe) => (
        <Card key={recipe.id} className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">{recipe.recipeName}</CardTitle>
            <CardDescription>{recipe.ingredients.slice(0, 3).join(', ')}...</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="line-clamp-4 text-sm text-muted-foreground">{recipe.instructions}</p>
          </CardContent>
          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove &quot;{recipe.recipeName}&quot; from your favorites.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => removeFavorite(recipe.id)}>
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
