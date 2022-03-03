import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { GenerateMealsService } from '../services/generate-meals.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  breakfasts: Recipe[] = [];
  lunches: Recipe[] = [];
  dinners: Recipe[] = [];

  constructor(
    private generateMealsService: GenerateMealsService
  ) { }

  ngOnInit(): void { }

  onClickGenerate() {
    this.breakfasts = this.generateMealsService.generateBreakfasts();
    this.lunches = this.generateMealsService.generateLunches();
    this.dinners = this.generateMealsService.generateDinners();
  }

  onClickGenerateBreakfasts() {
    this.breakfasts = this.generateMealsService.generateBreakfasts();
  }

  onClickGenerateLunches() {
    this.lunches = this.generateMealsService.generateLunches();
  }

  onClickGenerateDinners() {
    this.dinners = this.generateMealsService.generateDinners();
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
    while (breakfast.id === this.breakfasts[index].id) {
      breakfast = this.generateMealsService.getRandomBreakfast();
    }
    this.breakfasts.splice(index, 1, breakfast);
  }

  replaceLunch(index: number) {
    let lunch = this.generateMealsService.getRandomLunch();
    while (lunch.id === this.lunches[index].id) {
      lunch = this.generateMealsService.getRandomLunch();
    }
    this.lunches.splice(index, 1, lunch);
  }

  replaceDinner(index: number) {
    let dinner = this.generateMealsService.getRandomDinner();
    while (dinner.id === this.dinners[index].id) {
      dinner = this.generateMealsService.getRandomDinner();
    }
    this.dinners.splice(index, 1, dinner);
  }

  addBreakfast() {
    let breakfast = this.generateMealsService.getRandomBreakfast();
    this.breakfasts.push(breakfast);
  }

  addLunch() {
    let lunch = this.generateMealsService.getRandomLunch();
    this.lunches.push(lunch);
  }

  addDinner() {
    let dinner = this.generateMealsService.getRandomDinner();
    this.dinners.push(dinner);
  }

}
