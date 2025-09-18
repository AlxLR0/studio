'use server';

import { generateRecipeFromIngredients } from '@/ai/flows/generate-recipe-from-ingredients';
import { z } from 'zod';
import type { Recipe } from '@/lib/types';

const inputSchema = z.string().min(3, 'Por favor, introduce al menos un ingrediente.');

export async function getRecipe(ingredients: string): Promise<{
  recipe: (Recipe & { id: string }) | null;
  error: string | null;
}> {
  const validation = inputSchema.safeParse(ingredients);

  if (!validation.success) {
    return { recipe: null, error: validation.error.errors[0].message };
  }

  try {
    const recipeData = await generateRecipeFromIngredients({ ingredients: validation.data });
    
    if (!recipeData.suitable) {
        return { 
            recipe: { ...recipeData, id: crypto.randomUUID() }, 
            error: null 
        };
    }

    return { 
        recipe: { ...recipeData, id: crypto.randomUUID() }, 
        error: null 
    };

  } catch (e) {
    console.error(e);
    return { recipe: null, error: 'No se pudo generar la receta. El chef de IA podría estar ocupado. Por favor, inténtalo de nuevo más tarde.' };
  }
}
