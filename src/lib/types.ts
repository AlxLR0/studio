export type Recipe = {
  id: string;
  recipeName: string;
  ingredients: string[];
  instructions: string;
  prepTime: string;
  difficulty: string;
  healthNote: string;
  suitable: boolean;
  reason?: string;
};
