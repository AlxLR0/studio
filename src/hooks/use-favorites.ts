'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '@/lib/types';

const FAVORITES_KEY = 'cookify-ai-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        setFavorites(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = useCallback((recipe: Recipe) => {
    setFavorites((prev) => [...prev, recipe]);
  }, []);

  const removeFavorite = useCallback((recipeId: string) => {
    setFavorites((prev) => prev.filter((r) => r.id !== recipeId));
  }, []);

  const isFavorite = useCallback(
    (recipeId: string) => {
      return favorites.some((r) => r.id === recipeId);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}
