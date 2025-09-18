// use server'

/**
 * @fileOverview Handles the scenario where a recipe cannot be generated from the provided ingredients.
 *
 * - handleRecipeGenerationLimitations - A function that attempts to generate a recipe and returns an error message if it fails.
 * - HandleRecipeGenerationLimitationsInput - The input type for the handleRecipeGenerationLimitations function.
 * - HandleRecipeGenerationLimitationsOutput - The return type for the handleRecipeGenerationLimitations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HandleRecipeGenerationLimitationsInputSchema = z.object({
  ingredients: z
    .string()
    .describe("A comma-separated list of ingredients the user wants to use in a recipe."),
});
export type HandleRecipeGenerationLimitationsInput = z.infer<typeof HandleRecipeGenerationLimitationsInputSchema>;

const HandleRecipeGenerationLimitationsOutputSchema = z.object({
  recipe: z.string().optional().describe("The generated recipe, if possible."),
  errorMessage: z.string().optional().describe("An error message explaining why a recipe could not be generated and suggesting alternatives."),
});
export type HandleRecipeGenerationLimitationsOutput = z.infer<typeof HandleRecipeGenerationLimitationsOutputSchema>;

export async function handleRecipeGenerationLimitations(input: HandleRecipeGenerationLimitationsInput): Promise<HandleRecipeGenerationLimitationsOutput> {
  return handleRecipeGenerationLimitationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'handleRecipeGenerationLimitationsPrompt',
  input: {schema: HandleRecipeGenerationLimitationsInputSchema},
  output: {schema: HandleRecipeGenerationLimitationsOutputSchema},
  prompt: `You are a recipe generating expert. Given a list of ingredients, you will attempt to create a cohesive recipe.

  If you are unable to create a recipe, return an errorMessage explaining why and suggesting alternative ingredients or combinations.
  If you are able to make a recipe, return it in the recipe field. Make sure the recipe has a title, ingredients list, and instructions.

  Ingredients: {{{ingredients}}}
  `,
});

const handleRecipeGenerationLimitationsFlow = ai.defineFlow(
  {
    name: 'handleRecipeGenerationLimitationsFlow',
    inputSchema: HandleRecipeGenerationLimitationsInputSchema,
    outputSchema: HandleRecipeGenerationLimitationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
