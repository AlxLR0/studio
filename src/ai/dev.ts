import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe-from-ingredients.ts';
import '@/ai/flows/handle-recipe-generation-limitations.ts';