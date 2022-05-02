import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api/api.service';
import { Recipe } from '../models/interfaces/recipe';
import { GenerateMealPlanService } from '../services/generate-meal-plan/generate-meal-plan.service';
import { UtilService } from '../services/util/util.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  recipes: Recipe[] = [];
  breakfasts: Recipe[] = [];
  lunches: Recipe[] = [];
  dinners: Recipe[] = [];

  planBreakfasts: Recipe[] = [];
  planLunches: Recipe[] = [];
  planDinners: Recipe[] = [];

  allowDuplicateBreakfasts: boolean = true;
  allowDuplicateLunches: boolean = true;
  allowDuplicateDinners: boolean = false;

  disableBreakfastToggle: boolean = false;
  disableLunchToggle: boolean = false;
  disableDinnerToggle: boolean = false;

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private gmp: GenerateMealPlanService,
    private util: UtilService
  ) {
  }

  ngOnInit(): void {
    this.api.getRecipes().subscribe(result => {
      this.recipes = result;
      this.breakfasts = this.recipes.filter(r => r.meal.name === 'Breakfast');
      this.lunches = this.recipes.filter(r => r.meal.name === 'Lunch');
      this.dinners = this.recipes.filter(r => r.meal.name === 'Dinner');

      if (this.breakfasts.length <= 7) {
        this.allowDuplicateBreakfasts = true;
        this.disableBreakfastToggle = true;
      }

      if (this.lunches.length <= 7) {
        this.allowDuplicateLunches = true;
        this.disableLunchToggle = true;
      }

      if (this.dinners.length <= 7) {
        this.allowDuplicateDinners = true;
        this.disableDinnerToggle = true;
      }
    }, error => console.error(error));
  }

  onClickGenerateMeals() {
    this.planBreakfasts = this.gmp.generateMealPlan(this.breakfasts, this.allowDuplicateBreakfasts);
    this.planLunches = this.gmp.generateMealPlan(this.lunches, this.allowDuplicateLunches);
    this.planDinners = this.gmp.generateMealPlan(this.dinners, this.allowDuplicateBreakfasts);
  }

  onClickGenerateGroceryList() {
    let recipes: Recipe[] = [];
    recipes = recipes.concat(this.planBreakfasts);
    recipes = recipes.concat(this.planLunches);
    recipes = recipes.concat(this.planDinners);
    let ingredientsString: string = this.gmp.copyIngredientsToClipboard(recipes);

    navigator.clipboard.writeText(ingredientsString);
    this.toastr.success('Copied ingredients to clipboard!', undefined, {closeButton: true, timeOut: 1500});
  }

  onClickGenerateBreakfasts() {
    this.planBreakfasts = this.gmp.generateMealPlan(this.breakfasts, this.allowDuplicateBreakfasts);
  }

  onClickGenerateLunches() {
    this.planLunches = this.gmp.generateMealPlan(this.lunches, this.allowDuplicateLunches);
  }

  onClickGenerateDinners() {
    this.planDinners = this.gmp.generateMealPlan(this.dinners, this.allowDuplicateDinners);
  }

  onClickDeleteAllBreakfasts() {
    this.planBreakfasts = [];
  }

  onClickDeleteAllLunches() {
    this.planLunches = [];
  }

  onClickDeleteAllDinners() {
    this.planDinners = [];
  }

  deleteBreakfast(index: number) {
    this.planBreakfasts.splice(index, 1);
  }

  deleteLunch(index: number) {
    this.planLunches.splice(index, 1);
  }

  deleteDinner(index: number) {
    this.planDinners.splice(index, 1);
  }

  replaceBreakfast(index: number) {
    this.gmp.replaceMeal(this.planBreakfasts, index, this.breakfasts, this.allowDuplicateBreakfasts);
  }

  replaceLunch(index: number) {
    this.gmp.replaceMeal(this.planLunches, index, this.lunches, this.allowDuplicateLunches);
  }

  replaceDinner(index: number) {
    this.gmp.replaceMeal(this.planDinners, index, this.dinners, this.allowDuplicateDinners);
  }

  addBreakfast() {
    this.planBreakfasts.push(this.util.getRandomEntry(this.breakfasts));
  }

  addLunch() {
    this.planLunches.push(this.util.getRandomEntry(this.lunches));
  }

  addDinner() {
    this.planDinners.push(this.util.getRandomEntry(this.dinners));
  }

  toggleDuplicateBreakfasts() {
    this.allowDuplicateBreakfasts = !this.allowDuplicateBreakfasts;
  }

  toggleDuplicateLunches() {
    this.allowDuplicateLunches = !this.allowDuplicateLunches;
  }

  toggleDuplicateDinners() {
    this.allowDuplicateDinners = !this.allowDuplicateDinners;
  }

}
