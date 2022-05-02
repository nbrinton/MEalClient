import { Injectable } from '@angular/core';
import { Recipe } from '../../models/interfaces/recipe';
import { RecipeIngredient } from '../../models/interfaces/recipe-ingredient';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  getRandomEntry(list: any[]): any {
    return list[this.getRandomInt(list.length)];
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  recipeSortFunction(a: Recipe, b: Recipe): number {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  recipeIngredientSortFunction(a: RecipeIngredient, b: RecipeIngredient): number {
    if (a.ingredient.section.name < b.ingredient.section.name) {
      return -1;
    } else if (a.ingredient.section.name === b.ingredient.section.name) {
      if (a.ingredient.name[0] < b.ingredient.name[0]) {
        return -1;
      } else if (a.ingredient.name[0] > b.ingredient.name[0]) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  }
}
