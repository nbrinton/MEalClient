import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { GenerateMealsService } from '../services/generate-meals.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {


  breakfasts: Recipe[] = [];
  lunches: Recipe[] = [];
  dinners: Recipe[] = [];

  constructor(
    private generateMealsService: GenerateMealsService
  ) { }

  ngOnInit(): void {
    this.breakfasts = this.generateMealsService.getAllBreakfasts();
    this.lunches = this.generateMealsService.getAllLunches();
    this.dinners = this.generateMealsService.getAllDinners();
  }

  onClickAddRecipe() {

  }

}
