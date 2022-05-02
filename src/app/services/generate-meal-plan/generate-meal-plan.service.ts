import { Injectable, OnInit } from '@angular/core';
import { Recipe } from '../../models/interfaces/recipe';
import { ApiService } from '../api/api.service';
import { UtilService } from '../util/util.service';
import { RecipeIngredient } from '../../models/interfaces/recipe-ingredient';
import * as _ from 'lodash';
import { Section } from '../../models/interfaces/section';

@Injectable({
  providedIn: 'root'
})
export class GenerateMealPlanService implements OnInit {

  recipes : Recipe[] = [];
  breakfasts: Recipe[] = [];
  lunches: Recipe[] = [];
  dinners: Recipe[] = [];

  constructor(
    private api: ApiService,
    private util: UtilService
  ) {
  }

  ngOnInit(): void {
    this.api.getRecipes().subscribe(result => {
      this.recipes = result;
      this.breakfasts = this.recipes.filter(r => r.meal.name === 'Breakfast');
      this.lunches = this.recipes.filter(r => r.meal.name === 'Lunch');
      this.dinners = this.recipes.filter(r => r.meal.name === 'Dinner');
    }, error => console.error(error));
  }

  generateMealPlan(recipes: Recipe[], allowDuplicates: boolean = true): Recipe[] {
    let plan: any = [];
    for (let i = 0; i < 7; i++) {
      let recipe = this.util.getRandomEntry(recipes);

      while (!allowDuplicates && plan.includes(recipe)) {
        recipe = this.util.getRandomEntry(recipes);
      }
      plan.push(recipe);
    }
    return plan;
  }

  replaceMeal(planRecipes: Recipe[], index: number, allRecipes: Recipe[], allowDuplicates: boolean): void {
    let meal: Recipe = this.util.getRandomEntry(allRecipes);
    while (!allowDuplicates && _.includes(planRecipes, meal)) {
      meal = this.util.getRandomEntry(allRecipes);
    }
    planRecipes.splice(index, 1, meal);
  }

  // TODO: Fix bug that is happening in this function due to adding the else case happening more often than it should
  checkIngredientsAndUpdateQuantity(recipeIngredients: RecipeIngredient[], recipeIngredient: RecipeIngredient): void {
    for (let ri of recipeIngredients) {
      if (ri.ingredient.id === recipeIngredient.ingredient.id) {
        if (ri.units === recipeIngredient.units) {
          ri.quantity += recipeIngredient.quantity;
          return;
        } else {
          recipeIngredients.push(_.cloneDeep(recipeIngredient));
          return;
        }
      }
    }

    recipeIngredients.push(_.cloneDeep(recipeIngredient));
  }

  copyIngredientsToClipboard(recipes: Recipe[]): string {
    let ingredientsString = '';
    let allIngredients: RecipeIngredient[] = [];

    recipes.forEach(r => {
      if (r.recipeIngredients) {
        r.recipeIngredients.forEach(ri => {
          this.checkIngredientsAndUpdateQuantity(allIngredients, ri);
        });
      }
    });

    allIngredients.sort(this.util.recipeIngredientSortFunction);
    allIngredients = allIngredients.filter(i => !i.isStaple);

    let previousSection: string = '';
    allIngredients.forEach((i, index) => {
      if (i.ingredient.section.name !== previousSection) {
        ingredientsString += `\n${i.ingredient.section.name}\n--------------------\n`;
        previousSection = i.ingredient.section.name;
      }

      let quantity = i.quantity % 1 == 0 ? i.quantity.toString() : i.quantity.toFixed(2);
      ingredientsString += `- ${i.ingredient.name} (${quantity} ${i.units})\n`;
    });

    return ingredientsString;
  }


}
