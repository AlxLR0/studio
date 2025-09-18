export type Recipe = {
  id: string;
  recipeName: string;
  ingredients: string[];
  instructions: string;
  suitable: boolean;
  reason?: string;
};
