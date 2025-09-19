export type Recipe = {
  id: string;
  recipeName: string;
  ingredients: string[];
  instructions: string;
  healthNote: string;
  suitable: boolean;
  reason?: string;
};
