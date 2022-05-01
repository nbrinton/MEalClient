import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Recipe } from '../../models/interfaces/recipe';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})
export class ViewRecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  breakfasts: Recipe[] = [];
  lunches: Recipe[] = [];
  dinners: Recipe[] = [];

  constructor(
    private api: ApiService
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

}
