'use server';
/**
 * @fileOverview Generates a recipe from a list of ingredients.
 *
 * - generateRecipeFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipeFromIngredientsInput - The input type for the generateRecipeFromIngredients function.
 * - GenerateRecipeFromIngredientsOutput - The return type for the generateRecipeFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeFromIngredientsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients to use in the recipe.'),
});
export type GenerateRecipeFromIngredientsInput = z.infer<typeof GenerateRecipeFromIngredientsInputSchema>;

const GenerateRecipeFromIngredientsOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe.'),
  ingredients: z.array(z.string()).describe('The list of ingredients used in the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for cooking the recipe.'),
  suitable: z.boolean().describe('Whether the ingredients provided were suitable to generate a recipe.'),
  reason: z.string().optional().describe('If not suitable, the reason why a recipe could not be generated.'),
});
export type GenerateRecipeFromIngredientsOutput = z.infer<typeof GenerateRecipeFromIngredientsOutputSchema>;

export async function generateRecipeFromIngredients(input: GenerateRecipeFromIngredientsInput): Promise<GenerateRecipeFromIngredientsOutput> {
  return generateRecipeFromIngredientsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeFromIngredientsPrompt',
  input: {schema: GenerateRecipeFromIngredientsInputSchema},
  output: {schema: GenerateRecipeFromIngredientsOutputSchema},
  prompt: `You are a world-class chef specializing in creating unique and delicious recipes based on a given list of ingredients.

  Instructions: Use the provided ingredients to generate a recipe. Provide a suitable recipe name, a list of ingredients, and step-by-step cooking instructions. If there are specific cooking times, add it to the instructions.
  If the ingredients are not suitable to create a recipe, set suitable to false and explain why in the reason field.
  Ingredients: {{{ingredients}}}
  `,
});

const generateRecipeFromIngredientsFlow = ai.defineFlow(
  {
    name: 'generateRecipeFromIngredientsFlow',
    inputSchema: GenerateRecipeFromIngredientsInputSchema,
    outputSchema: GenerateRecipeFromIngredientsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
