import {Component, OnInit} from '@angular/core';
import {Recipe} from '../models/mock/recipe';
import {GenerateMealsService} from '../services/generate-meals.service';
import * as _ from 'lodash';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  breakfasts: Recipe[] = [];
  lunches: Recipe[] = [];
  dinners: Recipe[] = [];

  allowDuplicateBreakfasts: boolean = true;
  allowDuplicateLunches: boolean = true;
  allowDuplicateDinners: boolean = false;

  disableBreakfastToggle: boolean = false;
  disableLunchToggle: boolean = false;
  disableDinnerToggle: boolean = false;

  constructor(
    private toastr: ToastrService,
    private generateMealsService: GenerateMealsService
  ) {
  }

  ngOnInit(): void {
    if (this.generateMealsService.getNumBreakfasts() <= 7) {
      this.allowDuplicateBreakfasts = true;
      this.disableBreakfastToggle = true;
    }
    if (this.generateMealsService.getNumLunches() <= 7) {
      this.allowDuplicateLunches = true;
      this.disableLunchToggle = true;
    }
    if (this.generateMealsService.getNumDinners() <= 7) {
      this.allowDuplicateDinners = true;
      this.disableDinnerToggle = true;
    }
  }

  onClickGenerateMeals() {
    this.breakfasts = this.generateMealsService.generateBreakfasts();
    this.lunches = this.generateMealsService.generateLunches();
    this.dinners = this.generateMealsService.generateDinners();
  }

  onClickGenerateGroceryList() {
    let recipes: Recipe[] = [];
    recipes = recipes.concat(this.breakfasts);
    recipes = recipes.concat(this.lunches);
    recipes = recipes.concat(this.dinners);
    let ingredientsString: string = this.generateMealsService.copyIngredientsToClipboard(recipes);

    navigator.clipboard.writeText(ingredientsString);
    this.toastr.success('Copied ingredients to clipboard!', undefined, { closeButton: true, timeOut: 1500 });
  }

  // TODO: Refactor to reduce duplicate code. Maybe using an enum for the meal?

  onClickGenerateBreakfasts() {
    this.breakfasts = this.generateMealsService.generateBreakfasts(this.allowDuplicateBreakfasts);
  }

  onClickGenerateLunches() {
    this.lunches = this.generateMealsService.generateLunches(this.allowDuplicateLunches);
  }

  onClickGenerateDinners() {
    this.dinners = this.generateMealsService.generateDinners(this.allowDuplicateDinners);
  }

  onClickDeleteAllBreakfasts() {
    this.breakfasts = [];
  }

  onClickDeleteAllLunches() {
    this.lunches = [];
  }

  onClickDeleteAllDinners() {
    this.dinners = [];
  }

  deleteBreakfast(index: number) {
    this.breakfasts.splice(index, 1);
  }

  deleteLunch(index: number) {
    this.lunches.splice(index, 1);
  }

  deleteDinner(index: number) {
    this.dinners.splice(index, 1);
  }

  replaceBreakfast(index: number) {
    let breakfast = this.generateMealsService.getRandomBreakfast();
    while (!this.allowDuplicateBreakfasts && _.includes(this.breakfasts, breakfast)) {
      breakfast = this.generateMealsService.getRandomBreakfast();
    }
    this.breakfasts.splice(index, 1, breakfast);
  }

  replaceLunch(index: number) {
    let lunch = this.generateMealsService.getRandomLunch();
    while (!this.allowDuplicateBreakfasts && _.includes(this.lunches, lunch)) {
      lunch = this.generateMealsService.getRandomBreakfast();
    }
    this.lunches.splice(index, 1, lunch);
  }

  replaceDinner(index: number) {
    let dinner = this.generateMealsService.getRandomDinner();
    while (!this.allowDuplicateDinners && _.includes(this.dinners, dinner)) {
      dinner = this.generateMealsService.getRandomDinner();
    }
    this.dinners.splice(index, 1, dinner);
  }

  addBreakfast() {
    let breakfast = this.generateMealsService.getRandomBreakfast();
    while (!this.allowDuplicateBreakfasts && _.includes(this.breakfasts, breakfast)) {
      breakfast = this.generateMealsService.getRandomBreakfast();
    }
    this.breakfasts.push(breakfast);
  }

  addLunch() {
    let lunch = this.generateMealsService.getRandomLunch();
    while (!this.allowDuplicateLunches && _.includes(this.lunches, lunch)) {
      lunch = this.generateMealsService.getRandomLunch();
    }
    this.lunches.push(lunch);
  }

  addDinner() {
    let dinner = this.generateMealsService.getRandomDinner();
    while (!this.allowDuplicateBreakfasts && _.includes(this.breakfasts, dinner)) {
      dinner = this.generateMealsService.getRandomDinner();
    }
    this.dinners.push(dinner);
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
