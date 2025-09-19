'use server';
/**
 * @fileOverview Generates a recipe from a list of ingredients and user preferences.
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
  restrictions: z.array(z.string()).optional().describe('Food restrictions like "sin picante", "sin aceites", "sin frituras", "bajo en carbohidratos", "sin lácteos", "sin gluten".'),
  style: z.string().optional().describe('Recipe style: "casera", "gourmet", "saludable/fit", "rápida y sencilla".'),
  specialConditions: z.string().optional().describe('Special conditions: "gastritis", "diabetes", "hipertensión", "aumentar masa muscular", "bajar de peso", "apta para niños".'),
  flavor: z.string().optional().describe('Flavor preferences: "más especias", "más suave", "con aderezos", "sin condimentos".'),
});
export type GenerateRecipeFromIngredientsInput = z.infer<typeof GenerateRecipeFromIngredientsInputSchema>;

const GenerateRecipeFromIngredientsOutputSchema = z.object({
  recipeName: z.string().describe('The name of the generated recipe. Should be creative and appealing.'),
  ingredients: z.array(z.string()).describe('The list of ingredients used in the recipe, with approximate quantities.'),
  instructions: z.string().describe('Step-by-step instructions for cooking the recipe, formatted as a single string with newline characters.'),
  healthNote: z.string().describe('A positive and encouraging nutritional or health note related to the recipe and user preferences.'),
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
  prompt: `Eres un asistente culinario inteligente en español. Tu misión es generar recetas personalizadas, saludables y deliciosas.

  **Contexto del Usuario:**
  - **Ingredientes base:** {{{ingredients}}}
  {{#if restrictions.length}}
  - **Restricciones:** {{#each restrictions}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}. Debes respetarlas estrictamente. Propón sustituciones saludables si es necesario (ej. hornear en lugar de freír, usar yogur en vez de crema).
  {{/if}}
  {{#if style}}
  - **Estilo de receta deseado:** {{{style}}}. Adapta el nombre y la complejidad de la receta a este estilo.
  {{/if}}
  {{#if specialConditions}}
  - **Condición especial:** {{{specialConditions}}}. La receta DEBE ser adecuada para esta condición.
  {{/if}}
  {{#if flavor}}
  - **Preferencia de sabor:** {{{flavor}}}. Ajusta los condimentos según esta preferencia.
  {{/if}}

  **Tu Tarea:**
  1.  **Analiza los ingredientes y preferencias.** Si no es posible crear una receta coherente, establece 'suitable' en 'false' y explica el motivo en 'reason'.
  2.  **Genera una receta única.** No uses ingredientes que el usuario no tiene, a menos que sea una sustitución lógica y saludable que expliques.
  3.  **Crea un nombre de receta atractivo.** Si el estilo es 'gourmet', que sea elaborado. Si es 'casera', que sea simple y familiar.
  4.  **Lista los ingredientes** con cantidades aproximadas. Aclara cualquier sustitución.
  5.  **Escribe las instrucciones paso a paso,** numeradas y claras, en un solo bloque de texto separado por saltos de línea (\n). Usa verbos de acción. Si el estilo es 'rápida y sencilla', simplifica los pasos.
  6.  **Añade una 'healthNote' (nota de salud)** al final. Debe ser una frase positiva y relevante para la condición especial o el estilo de la receta (ej. "Esta receta es ligera y fácil de digerir, ideal si sufres gastritis.").

  **Formato de Respuesta Obligatorio:**
  Responde únicamente con el objeto JSON definido en el esquema de salida. No incluyas texto adicional fuera del JSON.
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
