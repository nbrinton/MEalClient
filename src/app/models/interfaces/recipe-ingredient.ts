import { Ingredient } from './ingredient';

export interface RecipeIngredient {
  id: bigint;
  units: string;
  quantity: number;
  isStaple: boolean;
  ingredient: Ingredient;
}
