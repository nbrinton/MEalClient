import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {add, replace} from "lodash";
import {generate} from "rxjs";
import {Ingredient} from '../../models/ingredient';
import * as _ from 'lodash';

@Component({
  selector: 'app-plan-meal',
  templateUrl: './plan-meal.component.html',
  styleUrls: ['./plan-meal.component.scss']
})
export class PlanMealComponent implements OnInit {

  @Input() name: string = 'MEAL NAME';
  @Input() recipes: Recipe[] = [];

  @Input() disableToggle: boolean = false;
  @Input() allowDuplicateRecipes: boolean = true;

  @Output() toggleAllowDuplicateRecipesEvent = new EventEmitter<boolean>();
  @Output() generateRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteAllRecipesEvent = new EventEmitter<boolean>();
  @Output() deleteRecipeEvent = new EventEmitter<number>();
  @Output() replaceRecipeEvent = new EventEmitter<number>();
  @Output() addRecipeEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  copyIngredientsToClipboard() {
    let ingredientsString = '';
    let ingredients: Ingredient[] = [];

    this.recipes.forEach(r => {
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
    }).forEach(i => {
      ingredientsString += `- ${i.name} (${i.quantity} ${i.units})\n`;
    });

    navigator.clipboard.writeText(ingredientsString).then(
      // TODO: Create toast message
    );
  }

  /**
   * Check the ingredient list to see if it already contains the given ingredient. If it does, then if the units match,
   * update the quantity. If not, then add the ingredient to the list.
   * @param ingredients
   * @param ingredient
   */
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

  generate() {
    this.generateRecipesEvent.emit(true);
  }

  deleteAll() {
    this.deleteAllRecipesEvent.emit(true);
  }

  delete(index: number) {
    this.deleteRecipeEvent.emit(index);
  }

  replace(index: number) {
    this.replaceRecipeEvent.emit(index);
  }

  add() {
    this.addRecipeEvent.emit(true);
  }

  toggleAllowDuplicateRecipes() {
    this.allowDuplicateRecipes = !this.allowDuplicateRecipes;
    this.toggleAllowDuplicateRecipesEvent.emit(this.allowDuplicateRecipes);
  }

}
