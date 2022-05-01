import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { Recipe } from '../../models/interfaces/recipe';
import { RecipeTime } from '../../models/interfaces/recipe-time';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  // TODO: Figure out how to not need this first assignment and just have page wait to load from the API
  recipe: Recipe = {
    id: BigInt(0),
    meal: {
      id: 0,
      name: 'Breakfast'
    },
    name: 'foo',
    prepTime: 0,
    cookTime: 0,
    recipeIngredients: [],
    recipeSteps: []
  };

  prepTime: RecipeTime = {
    hours: 0,
    minutes: 0
  };

  cookTime: RecipeTime = {
    hours: 0,
    minutes: 0
  };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getRecipe(id).subscribe(result => {
      this.recipe = result;

      // Convert from seconds to RecipeTime objects
      this.prepTime = this.secondsToRecipeTime(this.recipe.prepTime);
      this.cookTime = this.secondsToRecipeTime(this.recipe.cookTime);

      // Make sure that the steps are in order
      this.recipe.recipeSteps.sort((a, b) => {
        if (a.order < b.order) {
          return -1;
        } else if (a.order > b.order) {
          return 1;
        } else {
          return 0;
        }
      });
    }, error => console.error(error));
  }

  /**
   * Convert a number of seconds (how the database Recipe model tracks prep and
   * cook times) to a RecipeTime object which tracks hours and minutes.
   * @param seconds
   */
  secondsToRecipeTime(seconds: number): RecipeTime {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor(seconds % 3600 / 60);

    let recipeTime: RecipeTime = {
      hours: hours,
      minutes: minutes
    };

    return recipeTime;
  }

}
