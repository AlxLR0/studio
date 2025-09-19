'use server';

import { generateRecipeFromIngredients, GenerateRecipeFromIngredientsInput } from '@/ai/flows/generate-recipe-from-ingredients';
import { z } from 'zod';
import type { Recipe } from '@/lib/types';
import type { RecipePreferences } from '@/components/preferences-form';

const ingredientsSchema = z.string().min(3, 'Por favor, introduce al menos un ingrediente.');

// This validation is now happening in the form component
const preferencesSchema = z.any();

export async function getRecipe(
  ingredients: string,
  preferences: RecipePreferences
): Promise<{
  recipe: Recipe | null;
  error: string | null;
}> {
  const validation = ingredientsSchema.safeParse(ingredients);

  if (!validation.success) {
    return { recipe: null, error: validation.error.errors[0].message };
  }

  const input: GenerateRecipeFromIngredientsInput = {
    ingredients: validation.data,
    ...preferences
  };

  try {
    const recipeData = await generateRecipeFromIngredients(input);
    
    return { 
        recipe: { ...recipeData, id: crypto.randomUUID() }, 
        error: null 
    };

  } catch (e) {
    console.error(e);
    return { recipe: null, error: 'No se pudo generar la receta. El chef de IA podría estar ocupado. Por favor, inténtalo de nuevo más tarde.' };
  }
}
