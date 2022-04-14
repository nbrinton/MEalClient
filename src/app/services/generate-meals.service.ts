import {Injectable} from '@angular/core';
import breakfasts from './mock-data/breakfasts.json';
import lunches from './mock-data/lunches.json';
import dinners from './mock-data/dinners.json';
import {Recipe} from '../models/recipe';
import * as _ from 'lodash';
import {Ingredient} from '../models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class GenerateMealsService {

  constructor() {
  }

  getAllBreakfasts(): Recipe[] {
    return breakfasts;
  }

  getNumBreakfasts(): number {
    return breakfasts.length;
  }

  getNumLunches(): number {
    return lunches.length;
  }

  getNumDinners(): number {
    return dinners.length;
  }

  getAllLunches(): Recipe[] {
    return lunches;
  }

  getAllDinners(): Recipe[] {
    return dinners;
  }

  generateBreakfasts(allowDuplicates: boolean = true): Recipe[] {
    let chosenBreakfasts: any = [];
    for (let i = 0; i < 7; i++) {
      let breakfast = this.getRandomEntry(breakfasts);

      while (!allowDuplicates && chosenBreakfasts.includes(breakfast)) {
        breakfast = this.getRandomEntry(breakfasts);
      }
      chosenBreakfasts.push(breakfast);
    }

    return chosenBreakfasts;
  }

  generateLunches(allowDuplicates: boolean = true): Recipe[] {
    let chosenLunches: any = [];
    for (let i = 0; i < 7; i++) {
      let lunch = this.getRandomEntry(lunches);

      while (!allowDuplicates && chosenLunches.includes(lunch)) {
        lunch = this.getRandomEntry(lunches);
      }
      chosenLunches.push(lunch);
    }

    return chosenLunches;
  }

  generateDinners(allowDuplicates: boolean = false): Recipe[] {
    let chosenDinners: any = [];
    for (let i = 0; i < 7; i++) {
      let dinner = this.getRandomEntry(dinners);

      while (!allowDuplicates && _.includes(chosenDinners, dinner)) {
        dinner = this.getRandomEntry(dinners);
      }
      chosenDinners.push(dinner);
    }

    return chosenDinners;
  }

  getRandomBreakfast(): Recipe {
    return this.getRandomEntry(breakfasts);
  }

  getRandomLunch(): Recipe {
    return this.getRandomEntry(lunches);
  }

  getRandomDinner(): Recipe {
    return this.getRandomEntry(dinners);
  }

  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomEntry(list: any[]): any {
    return list[this.getRandomInt(list.length)];
  }

  // TODO: Fix bug where some ingredients are incorrectly incremented every time you click the copy button
  checkIngredientsAndUpdateQuantity(ingredients: Ingredient[], ingredient: Ingredient) {
    for (let i of ingredients) {
      if (i.name === ingredient.name) {
        if (i.units === ingredient.units) {
          i.quantity += ingredient.quantity;
          return;
        } else {
          ingredients.push(ingredient);
          return;
        }
      }
    }

    ingredients.push(ingredient);
  }

  copyIngredientsToClipboard(recipes: Recipe[]): string {
    let ingredientsString = '';
    let ingredients: Ingredient[] = [];

    recipes.forEach(r => {
      if (r.ingredients) {
        r.ingredients.forEach(i => {
          this.checkIngredientsAndUpdateQuantity(ingredients, i);
        });
      }
    });

    // Sort the ingredients by their section then by their name
    ingredients.sort((a: Ingredient, b: Ingredient) => {
      if (a.section < b.section) {
        return -1;
      } else if (a.section === b.section) {
        if (a.name[0] < b.name[0]) {
          return -1;
        } else if (a.name[0] > b.name[0]) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    });
    let nextSection = ingredients[1].section;
    ingredients.forEach(i => {
      if (i.section !== nextSection) {
        ingredientsString += `\n${i.section}\n--------------------\n`;
        nextSection = i.section;
      }
      ingredientsString += `- ${i.name} (${i.quantity} ${i.units})\n`;
    });

    return ingredientsString;
  }

}
