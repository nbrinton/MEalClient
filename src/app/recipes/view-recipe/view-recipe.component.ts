import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { Recipe } from '../../models/interfaces/recipe';

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

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.api.getRecipe(id).subscribe(result => {
      this.recipe = result;
    }, error => console.error(error));
  }

}
