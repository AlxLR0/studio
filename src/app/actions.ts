'use server';

import { generateRecipeFromIngredients, GenerateRecipeFromIngredientsInput } from '@/ai/flows/generate-recipe-from-ingredients';
import { z } from 'zod';
import type { Recipe } from '@/lib/types';

const ingredientsSchema = z.string().min(3, 'Por favor, introduce al menos un ingrediente.');

const preferencesSchema = z.object({
  restrictions: z.array(z.string()),
  style: z.string(),
  specialConditions: z.string(),
  flavor: z.string(),
});

export type RecipePreferences = z.infer<typeof preferencesSchema>;

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

  const preferencesValidation = preferencesSchema.safeParse(preferences);
  if (!preferencesValidation.success) {
    return { recipe: null, error: 'Las preferencias seleccionadas no son válidas.' };
  }

  const input: GenerateRecipeFromIngredientsInput = {
    ingredients: validation.data,
    ...preferencesValidation.data
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
