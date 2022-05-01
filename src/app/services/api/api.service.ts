import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Section } from '../../models/interfaces/section';
import { Ingredient } from '../../models/interfaces/ingredient';
import { Recipe } from '../../models/interfaces/recipe';
import { RecipeIngredient } from '../../models/interfaces/recipe-ingredient';
import { RecipeStep } from '../../models/interfaces/recipe-step';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getSections() {
    return this.http.get<Section[]>('/api/Sections');
  }

  getSection(id: number) {
    return this.http.get<Section>(`/api/Sections/${id}`);
  }

  getIngredients() {
    return this.http.get<Ingredient[]>('/api/Ingredients');
  }

  getIngredient(id: number) {
    return this.http.get<Ingredient>(`/api/Ingredients/${id}`);
  }

  getRecipeIngredients() {
    return this.http.get<RecipeIngredient[]>('/api/RecipeIngredients');
  }

  getRecipeIngredient(id: number) {
    return this.http.get<RecipeIngredient>(`/api/RecipeIngredients/${id}`);
  }

  getRecipeSteps() {
    return this.http.get<RecipeStep[]>('/api/RecipeSteps');
  }

  getRecipeStep(id: number) {
    return this.http.get<RecipeStep>(`/api/RecipeSteps/${id}`);
  }

  getRecipes() {
    return this.http.get<Recipe[]>('/api/Recipes');
  }

  getRecipe(id: number) {
    return this.http.get<Recipe>(`/api/Recipes/${id}`);
  }
}
