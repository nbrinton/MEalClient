import { RecipeIngredient } from './recipe-ingredient';
import { RecipeStep } from './recipe-step';
import { Meal } from './meal';

export interface Recipe {
  id: bigint;
  meal: Meal;
  name: string;
  prepTime: number;
  cookTime: number;
  recipeIngredients: RecipeIngredient[];
  recipeSteps: RecipeStep[];
}
