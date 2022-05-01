import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/mock/recipe';
import { GenerateMealsService } from '../services/generate-meals.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddRecipeComponent } from '../forms/add-recipe/add-recipe.component';

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
    // private modalService: NgbModal,
    private generateMealsService: GenerateMealsService
  ) {
  }

  ngOnInit(): void {
    this.breakfasts = this.generateMealsService.getAllBreakfasts();
    this.lunches = this.generateMealsService.getAllLunches();
    this.dinners = this.generateMealsService.getAllDinners();
  }

  // onClickAddRecipe() {
  //   const modalRef = this.modalService.open(AddRecipeComponent);
  //   modalRef.componentInstance.name = 'World';
  // }

}
