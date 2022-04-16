import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { GenerateMealsService } from '../../services/generate-meals.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {

  recipe: Recipe | undefined;

  constructor(
    private gms: GenerateMealsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.gms.allRecipes.find(r => r.id === id);
  }

}
